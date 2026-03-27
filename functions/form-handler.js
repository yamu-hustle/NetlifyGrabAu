import { uploadSubmissionToS3 } from "./lib/s3-upload.js";

export const handler = async (event) => {
    console.log("🚀 Function triggered with method:", event.httpMethod);
    console.log("📝 Event body:", event.body);

    // Health check endpoint
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({
                message: "Form handler function is running and healthy",
                timestamp: new Date().toISOString(),
                version: "4.0"
            })
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({ message: "Method Not Allowed" })
        };
    }

    try {
        // Parse the request body
        let requestData;
        try {
            requestData = JSON.parse(event.body);
        } catch (parseError) {
            console.error("❌ Failed to parse JSON:", parseError);
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify({
                    message: "Invalid JSON in request body",
                    error: parseError.message
                })
            };
        }

        console.log("🔍 Parsed form data:", requestData);

        // Extract form data
        const data = requestData.payload?.data;
        if (!data) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify({
                    message: "Form data is missing",
                    received: requestData
                })
            };
        }

        // Build Salesforce payload
        const payload = {
            "First Name": data.firstname || "",
            "Last Name": data.lastname || "",
            "Email": data.email || "",
            "Mobile": data.phone || "",
            "State": data.state || "",
            "Comments or Questions": data.comment_or_question || "",
            "Preferred Time to Call": data.time || "",
            "Lead Source": data.leadSource || "Website Form"
        };

        if (data.gclid && data.gclid !== '') {
            payload['Gclid'] = data.gclid;
        }

        if (data.utm_content && String(data.utm_content).trim() !== '') {
            payload['utm_content'] = String(data.utm_content).trim();
        }

        console.log("🚀 Payload for Salesforce:", payload);

        // Upload to S3 for backup (runs in parallel; we will block success if it fails)
        const submissionForS3 = {
            receivedAt: new Date().toISOString(),
            payload,
            rawData: data,
        };
        const s3UploadPromise = uploadSubmissionToS3(submissionForS3);

        // Call Salesforce API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

        try {
            // Run S3 upload and Salesforce in parallel
            console.log("🌐 Calling Salesforce API...");
            const [s3Result, response] = await Promise.all([
                s3UploadPromise,
                fetch("https://business-ruby-13192.my.salesforce-sites.com/services/apexrest/CreateLeadAssure", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "Netlify-Function/1.0"
                    },
                    body: JSON.stringify(payload),
                    signal: controller.signal
                })
            ]);

            clearTimeout(timeoutId);

            const responseText = await response.text();
            console.log("📡 Salesforce response status:", response.status);
            console.log("📡 Salesforce response text:", responseText);

            // If S3 is configured but upload fails, return a non-2xx so the frontend won't redirect.
            if (s3Result?.status === "failed") {
                console.error("🛑 Blocking success due to S3 upload failure:", s3Result);
                return {
                    statusCode: 502,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type'
                    },
                    body: JSON.stringify({
                        message: "Submission received but S3 backup failed. Please try again.",
                        error: "S3_UPLOAD_FAILED",
                        s3: s3Result,
                        timestamp: new Date().toISOString(),
                    })
                };
            }

            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch {
                responseData = responseText;
            }

            if (!response.ok) {
                throw new Error(`Salesforce API Error (${response.status}): ${JSON.stringify(responseData)}`);
            }

            console.log("✅ Salesforce API call successful:", responseData);
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify({
                    message: "Lead submitted successfully!",
                    response: responseData,
                    s3: s3Result || { status: "unknown" },
                    timestamp: new Date().toISOString()
                })
            };

        } catch (fetchError) {
            clearTimeout(timeoutId);
            if (fetchError.name === 'AbortError') {
                throw new Error('Salesforce API request timed out after 15 seconds');
            }
            throw new Error(`Salesforce API call failed: ${fetchError.message}`);
        }

    } catch (error) {
        console.error("❌ Function error:", error.message);
        console.error("❌ Error stack:", error.stack);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({
                message: "Error processing form submission",
                error: error.message,
                timestamp: new Date().toISOString()
            })
        };
    }
};
