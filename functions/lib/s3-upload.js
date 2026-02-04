import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Upload form submission to S3 bucket for backup/audit.
 * Fails silently - does not block the main flow if S3 is unavailable.
 *
 * @param {Object} submissionData - The submission payload to store
 * @returns {Promise<void>}
 */
export async function uploadSubmissionToS3(submissionData) {
    const bucket = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION || "ap-southeast-2";

    if (!bucket || !process.env.ASSURE_AWS_ACCESS_KEY_ID || !process.env.ASSURE_AWS_SECRET_ACCESS_KEY) {
        console.log("📦 S3 upload skipped: S3_BUCKET_NAME, ASSURE_AWS_ACCESS_KEY_ID, or ASSURE_AWS_SECRET_ACCESS_KEY not set");
        return;
    }

    try {
        const client = new S3Client({ region });
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
    } catch (err) {
        console.error("❌ S3 upload failed (non-blocking):", err.message);
    }
}
