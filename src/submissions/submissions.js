const STORAGE_KEY = "submissionsAuth";
const API_URL = "/.netlify/functions/s3-submissions";

function getAuthData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            if (data.password && data.expires && Date.now() < data.expires) {
                return data;
            }
        }
    } catch (_) {}
    return null;
}

function getStoredPassword() {
    const auth = getAuthData();
    return auth ? auth.password : null;
}

async function fetchSubmissions(password) {
    const res = await fetch(API_URL, {
        method: "GET",
        headers: {
            "X-Submissions-Password": password,
        },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        if (res.status === 401) {
            throw new Error("Invalid password");
        }
        throw new Error(data.message || data.error || "Failed to load submissions");
    }
    return data.submissions || [];
}

function renderSubmissions(submissions) {
    const container = document.getElementById("submissions-list");
    container.innerHTML = "";

    if (!submissions || submissions.length === 0) {
        container.innerHTML = `
            <div class="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                No submissions found.
            </div>
        `;
        return;
    }

    submissions.forEach((sub) => {
        const payload = sub.payload || {};
        const receivedAt = sub.receivedAt || "—";
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow overflow-hidden";
        card.innerHTML = `
            <div class="px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-start gap-2">
                <div>
                    <span class="font-semibold text-gray-800">${escapeHtml(payload["First Name"] || "")} ${escapeHtml(payload["Last Name"] || "")}</span>
                    <span class="text-gray-500 ml-2">${escapeHtml(payload["Email"] || "")}</span>
                </div>
                <span class="text-sm text-gray-400">${escapeHtml(receivedAt)}</span>
            </div>
            <div class="px-6 py-4 text-sm">
                <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div><dt class="text-gray-500">Phone</dt><dd>${escapeHtml(payload["Mobile"] || "—")}</dd></div>
                    <div><dt class="text-gray-500">State</dt><dd>${escapeHtml(payload["State"] || "—")}</dd></div>
                    <div><dt class="text-gray-500">Preferred Time</dt><dd>${escapeHtml(payload["Preferred Time to Call"] || "—")}</dd></div>
                    <div><dt class="text-gray-500">Lead Source</dt><dd>${escapeHtml(payload["Lead Source"] || "—")}</dd></div>
                </dl>
                ${payload["Comments or Questions"] ? `<p class="mt-3 text-gray-600"><strong>Comments:</strong> ${escapeHtml(payload["Comments or Questions"])}</p>` : ""}
            </div>
        `;
        container.appendChild(card);
    });
}

function escapeHtml(text) {
    if (text == null) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

async function loadAndRender() {
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const list = document.getElementById("submissions-list");

    loading.classList.remove("hidden");
    error.classList.add("hidden");
    list.innerHTML = "";

    const password = getStoredPassword();
    if (!password) {
        if (typeof window.submissionsLogout === "function") {
            window.submissionsLogout();
        }
        return;
    }

    try {
        const submissions = await fetchSubmissions(password);
        loading.classList.add("hidden");
        renderSubmissions(submissions);
    } catch (err) {
        loading.classList.add("hidden");
        error.textContent = err.message;
        error.classList.remove("hidden");
    }
}

function init() {
    const refreshBtn = document.getElementById("refresh-btn");
    const logoutBtn = document.getElementById("logout-btn");

    loadAndRender();

    refreshBtn?.addEventListener("click", () => loadAndRender());

    logoutBtn?.addEventListener("click", () => {
        if (typeof window.submissionsLogout === "function") {
            window.submissionsLogout();
        }
    });
}

init();
