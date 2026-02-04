export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Method not allowed" }),
        };
    }

    try {
        const { password } = JSON.parse(event.body || "{}");
        const SUBMISSIONS_PASSWORD = process.env.SUBMISSIONS_PASSWORD;

        if (!SUBMISSIONS_PASSWORD) {
            console.error("SUBMISSIONS_PASSWORD environment variable is not set");
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "Server configuration error" }),
            };
        }

        if (password === SUBMISSIONS_PASSWORD) {
            const sessionToken = Buffer.from(
                `${Date.now()}-${Math.random().toString(36)}`
            ).toString("base64");

            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    success: true,
                    token: sessionToken,
                    expiresIn: 24 * 60 * 60 * 1000,
                }),
            };
        }

        return {
            statusCode: 401,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ success: false, error: "Invalid password" }),
        };
    } catch (error) {
        console.error("Error processing request:", error);
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Invalid request" }),
        };
    }
};
