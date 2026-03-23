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

/** Generate UTC month prefixes for date range (YYYY/MM format). */
function generateMonthPrefixesUTC(fromDateUtcIso, toDateUtcIso) {
    const prefixes = [];
    const start = new Date(fromDateUtcIso);
    const end = new Date(toDateUtcIso);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return prefixes;
    const current = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));

    while (current <= end) {
        const year = current.getUTCFullYear();
        const month = String(current.getUTCMonth() + 1).padStart(2, "0");
        prefixes.push(`${year}/${month}`);
        current.setUTCMonth(current.getUTCMonth() + 1);
    }

    return prefixes;
}

function parseUtcDateBounds(event) {
    const dateFromUtc = event.queryStringParameters?.dateFromUtc;
    const dateToUtc = event.queryStringParameters?.dateToUtc;
    const from = dateFromUtc ? new Date(dateFromUtc) : null;
    const to = dateToUtc ? new Date(dateToUtc) : null;
    const hasValidFrom = from && !Number.isNaN(from.getTime());
    const hasValidTo = to && !Number.isNaN(to.getTime());
    return {
        from: hasValidFrom ? from : null,
        to: hasValidTo ? to : null,
        valid: hasValidFrom || hasValidTo,
    };
}

function getSubmissionReceivedAt(submission) {
    const d = new Date(submission?.receivedAt);
    if (Number.isNaN(d.getTime())) return null;
    return d;
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
        const utcRange = parseUtcDateBounds(event);

        let keysToFetch = [];
        let isTruncated = false;
        let nextContinuationToken = null;

        // Server-side date filtering: list specific month folders if date range specified
        if (utcRange.valid && utcRange.from) {
            const rangeEnd = utcRange.to || new Date();
            const monthPrefixes = generateMonthPrefixesUTC(utcRange.from.toISOString(), rangeEnd.toISOString());
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
                            (obj) => obj.Key && obj.Key.endsWith(".json")
                        );
                        keysToFetch.push(...filtered);
                    }
                } catch (err) {
                    console.error(`Failed to list month ${monthPrefix}:`, err.message);
                }
            }
            // Sort by LastModified descending
            keysToFetch.sort((a, b) => (b.LastModified || 0) - (a.LastModified || 0));
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
                        const lastModified = obj?.LastModified
                            ? new Date(obj.LastModified).toISOString()
                            : null;
                        return { key, lastModified, ...data };
                    } catch (err) {
                        console.error("Failed to fetch object:", key, err.message);
                        return null;
                    }
                })
            );
            submissions.push(...batchResults.filter(Boolean));
        }

        // Apply accurate UTC bounds filtering using receivedAt.
        if (utcRange.valid) {
            keysToFetch = submissions.filter((sub) => {
                const d = getSubmissionReceivedAt(sub);
                if (!d) return false;
                if (utcRange.from && d < utcRange.from) return false;
                if (utcRange.to && d > utcRange.to) return false;
                return true;
            });
        } else {
            keysToFetch = submissions;
        }

        const limitedSubmissions = keysToFetch.slice(0, limit);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                submissions: limitedSubmissions,
                count: limitedSubmissions.length,
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
