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

    // Prefer ASSURE_* env vars (explicit project convention), then fall back to standard AWS vars.
    const region =
        process.env.ASSURE_AWS_REGION || process.env.AWS_REGION || "ap-southeast-2";
    const accessKeyId =
        process.env.ASSURE_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey =
        process.env.ASSURE_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

    const missing = [
        !bucket ? "S3_BUCKET_NAME" : null,
        !accessKeyId
            ? "ASSURE_AWS_ACCESS_KEY_ID (or AWS_ACCESS_KEY_ID)"
            : null,
        !secretAccessKey
            ? "ASSURE_AWS_SECRET_ACCESS_KEY (or AWS_SECRET_ACCESS_KEY)"
            : null,
    ].filter(Boolean);

    if (missing.length) {
        console.warn("📦 S3 upload skipped: missing environment variables:", missing);
        return { status: "skipped", reason: "missing_env", missing };
    }

    const endpoint = process.env.S3_ENDPOINT || undefined;

    async function attemptUpload(attemptRegion) {
        const client = new S3Client({
            region: attemptRegion,
            ...(endpoint && { endpoint }),
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
    }

    try {
        return await attemptUpload(region);
    } catch (err) {
        // If we hit the wrong regional endpoint, S3 often replies with a redirect and includes the correct region.
        // We'll retry once with the hinted region if present.
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
                `⚠️ S3 endpoint redirect detected. Retrying with bucket region "${hintedRegion}" (was "${region}").`
            );
            try {
                return await attemptUpload(hintedRegion);
            } catch (retryErr) {
                err = retryErr;
            }
        }

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
            hintedRegion:
                err?.BucketRegion ||
                err?.$response?.headers?.["x-amz-bucket-region"] ||
                err?.$response?.headers?.["X-Amz-Bucket-Region"] ||
                null,
        };
        console.error("❌ S3 upload failed:", details);
        if (err?.stack) console.error(err.stack);
        return { status: "failed", error: err?.message || "Unknown S3 error", details };
    }
}
