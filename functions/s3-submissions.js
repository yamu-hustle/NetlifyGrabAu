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
    const region = process.env.ASSURE_AWS_REGION || "ap-southeast-2";

    if (!bucket || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                error: "S3 not configured",
                message: "S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY must be set",
            }),
        };
    }

    try {
        const endpoint = process.env.S3_ENDPOINT || undefined;
        const client = new S3Client({
            region,
            ...(endpoint && { endpoint }),
        });
        const prefix = "FormSubmissions/";
        const maxKeys = parseInt(event.queryStringParameters?.limit || "100", 10) || 100;

        const listResult = await client.send(
            new ListObjectsV2Command({
                Bucket: bucket,
                Prefix: prefix,
                MaxKeys: Math.min(maxKeys, 500),
            })
        );

        const keys = (listResult.Contents || [])
            .filter((obj) => obj.Key && obj.Key.endsWith(".json"))
            .sort((a, b) => (b.LastModified || 0) - (a.LastModified || 0))
            .slice(0, 100)
            .map((obj) => obj.Key);

        const submissions = [];
        for (const key of keys) {
            try {
                const getResult = await client.send(
                    new GetObjectCommand({ Bucket: bucket, Key: key })
                );
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
