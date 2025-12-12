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
                message: "Function is running and healthy",
                timestamp: new Date().toISOString(),
                version: "3.0"
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
            "Lead Source": data.leadSource || "Assure AU Hustle Ads"
        };

        if (data.gclid && data.gclid !== '') {
            payload['Gclid'] = data.gclid;
        }

        console.log("🚀 Payload for Salesforce:", payload);

        // Test mode - return success without calling Salesforce
        if (data.debug === 1) {
            console.log("🔧 Debug mode - returning test response");
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify({
                    message: "Test mode - form data received successfully",
                    payload: payload,
                    debug: true
                })
            };
        }

        // For now, just return success without calling Salesforce
        // This will help us test if the function loads properly
        console.log("✅ Form data received successfully, returning success response");
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({
                message: "Form data received successfully!",
                payload: payload,
                timestamp: new Date().toISOString(),
                note: "Salesforce API call temporarily disabled for testing"
            })
        };

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
