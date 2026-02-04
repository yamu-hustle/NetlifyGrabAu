import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Upload form submission to S3 bucket for backup/audit.
 * Returns a result object so callers can decide whether to block.
 *
 * @param {Object} submissionData - The submission payload to store
 * @returns {Promise<
 *   | { status: "uploaded", key: string }
 *   | { status: "skipped", reason: "missing_env", missing: string[] }
 *   | { status: "failed", error: string, details?: any }
 * >}
 */
export async function uploadSubmissionToS3(submissionData) {
    const bucket = process.env.S3_BUCKET_NAME;

    // Prefer standard AWS env vars, but allow legacy ASSURE_* names.
    const region =
        process.env.AWS_REGION || process.env.ASSURE_AWS_REGION || "ap-southeast-2";
    const accessKeyId =
        process.env.AWS_ACCESS_KEY_ID || process.env.ASSURE_AWS_ACCESS_KEY_ID;
    const secretAccessKey =
        process.env.AWS_SECRET_ACCESS_KEY || process.env.ASSURE_AWS_SECRET_ACCESS_KEY;

    const missing = [
        !bucket ? "S3_BUCKET_NAME" : null,
        !accessKeyId
            ? "AWS_ACCESS_KEY_ID (or ASSURE_AWS_ACCESS_KEY_ID)"
            : null,
        !secretAccessKey
            ? "AWS_SECRET_ACCESS_KEY (or ASSURE_AWS_SECRET_ACCESS_KEY)"
            : null,
    ].filter(Boolean);

    if (missing.length) {
        console.warn("📦 S3 upload skipped: missing environment variables:", missing);
        return { status: "skipped", reason: "missing_env", missing };
    }

    try {
        const endpoint = process.env.S3_ENDPOINT || undefined;
        const client = new S3Client({
            region,
            ...(endpoint && { endpoint }),
            // Ensure we work even if credentials are provided via ASSURE_* env vars.
            credentials: { accessKeyId, secretAccessKey },
        });
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        const datePath = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;
        const shortId = Math.random().toString(36).slice(2, 10);

        const firstName = String(submissionData.payload?.["First Name"] || submissionData.rawData?.firstname || "Unknown")
            .trim()
            .replace(/[^a-zA-Z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 30) || "Unknown";
        const key = `FormSubmissions/${datePath}/${dateStr}_${firstName}_${shortId}.json`;

        await client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: JSON.stringify(submissionData, null, 2),
                ContentType: "application/json",
            })
        );
        console.log("✅ Submission uploaded to S3:", key);
        return { status: "uploaded", key };
    } catch (err) {
        const details = {
            name: err?.name,
            message: err?.message,
            code: err?.code,
            Code: err?.Code,
            requestId: err?.$metadata?.requestId,
            httpStatusCode: err?.$metadata?.httpStatusCode,
            region,
            bucket,
            endpoint: process.env.S3_ENDPOINT || null,
        };
        console.error("❌ S3 upload failed:", details);
        if (err?.stack) console.error(err.stack);
        return { status: "failed", error: err?.message || "Unknown S3 error", details };
    }
}
