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
        const maxKeys = parseInt(event.queryStringParameters?.limit || "100", 10) || 100;

        let listResult;
        try {
            listResult = await send(
                client,
                new ListObjectsV2Command({
                    Bucket: bucket,
                    Prefix: prefix,
                    MaxKeys: Math.min(maxKeys, 500),
                })
            );
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
                listResult = await send(
                    client,
                    new ListObjectsV2Command({
                        Bucket: bucket,
                        Prefix: prefix,
                        MaxKeys: Math.min(maxKeys, 500),
                    })
                );
            } else {
                throw err;
            }
        }

        const keys = (listResult.Contents || [])
            .filter((obj) => obj.Key && obj.Key.endsWith(".json"))
            .sort((a, b) => (b.LastModified || 0) - (a.LastModified || 0))
            .slice(0, 100)
            .map((obj) => obj.Key);

        const submissions = [];
        for (const key of keys) {
            try {
                const getResult = await send(client, new GetObjectCommand({ Bucket: bucket, Key: key }));
                const body = await getResult.Body.transformToString();
                const data = JSON.parse(body);
                submissions.push({ key, ...data });
            } catch (err) {
                console.error("Failed to fetch object:", key, err.message);
            }
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ submissions, count: submissions.length }),
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
