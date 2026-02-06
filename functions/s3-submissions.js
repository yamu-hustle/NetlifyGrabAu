import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";

const UNAUTHORIZED_RESPONSE = {
    statusCode: 401,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ error: "Unauthorized", message: "Invalid or missing password" }),
};

function checkAuth(event) {
    const requiredPassword = process.env.SUBMISSIONS_PASSWORD;
    if (!requiredPassword) {
        return false;
    }
    const password =
        event.headers["x-submissions-password"] ||
        event.headers["X-Submissions-Password"] ||
        (event.queryStringParameters && event.queryStringParameters.password);
    return password === requiredPassword;
}

/** Generate month prefixes for date range (YYYY/MM format). */
function generateMonthPrefixes(fromDate, toDate) {
    const prefixes = [];
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const current = new Date(start.getFullYear(), start.getMonth(), 1);

    while (current <= end) {
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, "0");
        prefixes.push(`${year}/${month}`);
        current.setMonth(current.getMonth() + 1);
    }

    return prefixes;
}

/** Check if S3 key date falls within date range. */
function isInDateRange(key, fromDate, toDate) {
    const match = key.match(/(\d{4})-(\d{2})-(\d{2})_/);
    if (!match) return false;
    const keyDate = `${match[1]}-${match[2]}-${match[3]}`;
    return keyDate >= fromDate && keyDate <= toDate;
}

export const handler = async (event) => {
    // CORS preflight
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type, X-Submissions-Password",
                "Access-Control-Max-Age": "86400",
            },
            body: "",
        };
    }

    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    if (!checkAuth(event)) {
        return UNAUTHORIZED_RESPONSE;
    }

    const bucket = process.env.S3_BUCKET_NAME;

    // Prefer ASSURE_* env vars (explicit project convention), then fall back to standard AWS vars.
    const region =
        process.env.ASSURE_AWS_REGION || process.env.AWS_REGION || "ap-southeast-2";
    const accessKeyId =
        process.env.ASSURE_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey =
        process.env.ASSURE_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

    if (!bucket || !accessKeyId || !secretAccessKey) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                error: "S3 not configured",
                message:
                    "S3_BUCKET_NAME and AWS credentials must be set (AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY or ASSURE_AWS_ACCESS_KEY_ID/ASSURE_AWS_SECRET_ACCESS_KEY)",
            }),
        };
    }

    try {
        const endpoint = process.env.S3_ENDPOINT || undefined;

        const makeClient = (attemptRegion) =>
            new S3Client({
                region: attemptRegion,
                ...(endpoint && { endpoint }),
                credentials: { accessKeyId, secretAccessKey },
            });

        const send = async (client, command) => client.send(command);

        let client = makeClient(region);
        const prefix = "FormSubmissions/";

        // Pagination and filtering parameters
        const limit = parseInt(event.queryStringParameters?.limit || "50", 10) || 50;
        const continuationToken = event.queryStringParameters?.continuationToken;
        const dateFrom = event.queryStringParameters?.dateFrom;
        const dateTo = event.queryStringParameters?.dateTo;

        let keysToFetch = [];
        let isTruncated = false;
        let nextContinuationToken = null;

        // Server-side date filtering: list specific month folders if date range specified
        if (dateFrom && dateTo) {
            const monthPrefixes = generateMonthPrefixes(dateFrom, dateTo);
            for (const monthPrefix of monthPrefixes) {
                try {
                    const monthResult = await send(
                        client,
                        new ListObjectsV2Command({
                            Bucket: bucket,
                            Prefix: `${prefix}${monthPrefix}/`,
                            MaxKeys: 1000,
                        })
                    );
                    if (monthResult.Contents) {
                        const filtered = monthResult.Contents.filter(
                            (obj) => obj.Key && obj.Key.endsWith(".json") && isInDateRange(obj.Key, dateFrom, dateTo)
                        );
                        keysToFetch.push(...filtered);
                    }
                } catch (err) {
                    console.error(`Failed to list month ${monthPrefix}:`, err.message);
                }
            }
            // Sort by LastModified descending
            keysToFetch.sort((a, b) => (b.LastModified || 0) - (a.LastModified || 0));
            // For date-filtered requests, we slice to limit but don't support pagination (would need more complex logic)
            keysToFetch = keysToFetch.slice(0, limit);
        } else {
            // Normal listing with pagination support
            let listResult;
            try {
                const listParams = {
                    Bucket: bucket,
                    Prefix: prefix,
                    MaxKeys: Math.min(limit, 1000),
                    ...(continuationToken && { ContinuationToken: continuationToken }),
                };
                listResult = await send(client, new ListObjectsV2Command(listParams));
            } catch (err) {
                const hintedRegion =
                    err?.BucketRegion ||
                    err?.$response?.headers?.["x-amz-bucket-region"] ||
                    err?.$response?.headers?.["X-Amz-Bucket-Region"];
                const code = err?.Code || err?.code || err?.name;
                const isRedirect =
                    code === "PermanentRedirect" ||
                    code === "AuthorizationHeaderMalformed" ||
                    err?.$metadata?.httpStatusCode === 301;

                if (!endpoint && isRedirect && hintedRegion && hintedRegion !== region) {
                    console.warn(
                        `⚠️ S3 endpoint redirect detected. Retrying list with bucket region "${hintedRegion}" (was "${region}").`
                    );
                    client = makeClient(hintedRegion);
                    const listParams = {
                        Bucket: bucket,
                        Prefix: prefix,
                        MaxKeys: Math.min(limit, 1000),
                        ...(continuationToken && { ContinuationToken: continuationToken }),
                    };
                    listResult = await send(client, new ListObjectsV2Command(listParams));
                } else {
                    throw err;
                }
            }

            keysToFetch = (listResult.Contents || [])
                .filter((obj) => obj.Key && obj.Key.endsWith(".json"))
                .sort((a, b) => (b.LastModified || 0) - (a.LastModified || 0));

            isTruncated = listResult.IsTruncated || false;
            nextContinuationToken = listResult.NextContinuationToken || null;
        }

        // Parallel fetch: process in batches of 10
        const submissions = [];
        const batchSize = 10;
        for (let i = 0; i < keysToFetch.length; i += batchSize) {
            const batch = keysToFetch.slice(i, i + batchSize);
            const batchResults = await Promise.all(
                batch.map(async (obj) => {
                    const key = obj.Key || obj;
                    try {
                        const getResult = await send(client, new GetObjectCommand({ Bucket: bucket, Key: key }));
                        const body = await getResult.Body.transformToString();
                        const data = JSON.parse(body);
                        return { key, ...data };
                    } catch (err) {
                        console.error("Failed to fetch object:", key, err.message);
                        return null;
                    }
                })
            );
            submissions.push(...batchResults.filter(Boolean));
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                submissions,
                count: submissions.length,
                hasMore: isTruncated,
                nextToken: nextContinuationToken,
            }),
        };
    } catch (err) {
        console.error("S3 submissions error:", err);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Failed to fetch submissions", message: err.message }),
        };
    }
};
