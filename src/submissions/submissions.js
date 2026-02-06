const STORAGE_KEY = "submissionsAuth";
const API_URL = "/.netlify/functions/s3-submissions";

let allSubmissions = [];

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

/** Format UTC ISO string to local date/time string. */
function formatLocalDateTime(isoString) {
    if (!isoString) return "—";
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

/** Get submission date as Date (for filtering). Falls back to parsing key path if no receivedAt. */
function getSubmissionDate(sub) {
    if (sub.receivedAt) {
        const d = new Date(sub.receivedAt);
        if (!Number.isNaN(d.getTime())) return d;
    }
    if (sub.key) {
        const m = sub.key.match(/FormSubmissions\/(\d{4})\/(\d{2})\/(\d{4})-(\d{2})-(\d{2})_/);
        if (m) return new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[5], 10));
    }
    return null;
}

/** Check if submission matches search term (name, email, phone). */
function matchesSearch(sub, term) {
    if (!term || !term.trim()) return true;
    const t = term.trim().toLowerCase();
    const p = sub.payload || {};
    const first = (p["First Name"] || "").toLowerCase();
    const last = (p["Last Name"] || "").toLowerCase();
    const fullName = `${first} ${last}`.trim();
    const email = (p["Email"] || "").toLowerCase();
    const phone = (p["Mobile"] || "").replace(/\D/g, "");
    const phoneNorm = term.replace(/\D/g, "");
    return (
        fullName.includes(t) ||
        first.includes(t) ||
        last.includes(t) ||
        email.includes(t) ||
        (phoneNorm && phone.includes(phoneNorm)) ||
        phone.includes(t)
    );
}

/** Apply date range and search filters, then render. */
function applyFilters() {
    const searchEl = document.getElementById("search-input");
    const dateFromEl = document.getElementById("date-from");
    const dateToEl = document.getElementById("date-to");
    const search = searchEl?.value ?? "";
    const fromStr = dateFromEl?.value;
    const toStr = dateToEl?.value;

    const fromDate = fromStr ? new Date(fromStr + "T00:00:00") : null;
    const toDate = toStr ? new Date(toStr + "T23:59:59") : null;

    const filtered = allSubmissions.filter((sub) => {
        if (!matchesSearch(sub, search)) return false;
        const d = getSubmissionDate(sub);
        if (d) {
            if (fromDate && d < fromDate) return false;
            if (toDate && d > toDate) return false;
        }
        return true;
    });

    renderSubmissions(filtered);
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
        const receivedAt = formatLocalDateTime(sub.receivedAt);
        const phone = escapeHtml(payload["Mobile"] || "—");
        const state = escapeHtml(payload["State"] || "—");
        const prefTime = escapeHtml(payload["Preferred Time to Call"] || "—");
        const leadSource = escapeHtml(payload["Lead Source"] || "—");
        const meta = [phone, state, prefTime, leadSource].join(" · ");
        const comments = payload["Comments or Questions"];
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow overflow-hidden";
        card.innerHTML = `
            <div class="px-4 py-2.5 flex flex-wrap justify-between items-center gap-2 border-b border-gray-100">
                <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 min-w-0">
                    <span class="font-semibold text-gray-800">${escapeHtml(payload["First Name"] || "")} ${escapeHtml(payload["Last Name"] || "")}</span>
                    <span class="text-gray-500 text-sm truncate">${escapeHtml(payload["Email"] || "")}</span>
                </div>
                <span class="text-xs text-gray-400 whitespace-nowrap">${receivedAt}</span>
            </div>
            <div class="px-4 py-2 text-sm text-gray-600">
                <span class="text-gray-500">${meta}</span>
            </div>
            ${comments ? `<div class="px-4 py-2 pt-0 text-sm text-gray-600 border-t border-gray-50"><span class="text-gray-500">Comments:</span> ${escapeHtml(comments)}</div>` : ""}
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
    const filters = document.getElementById("filters");

    loading.classList.remove("hidden");
    error.classList.add("hidden");
    list.innerHTML = "";
    if (filters) filters.classList.add("hidden");

    const password = getStoredPassword();
    if (!password) {
        if (typeof window.submissionsLogout === "function") {
            window.submissionsLogout();
        }
        return;
    }

    try {
        allSubmissions = await fetchSubmissions(password);
        loading.classList.add("hidden");
        if (filters) filters.classList.remove("hidden");
        applyFilters();
    } catch (err) {
        loading.classList.add("hidden");
        error.textContent = err.message;
        error.classList.remove("hidden");
    }
}

function clearFilters() {
    const searchEl = document.getElementById("search-input");
    const dateFromEl = document.getElementById("date-from");
    const dateToEl = document.getElementById("date-to");
    if (searchEl) searchEl.value = "";
    if (dateFromEl) dateFromEl.value = "";
    if (dateToEl) dateToEl.value = "";
    applyFilters();
}

function init() {
    const refreshBtn = document.getElementById("refresh-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const searchEl = document.getElementById("search-input");
    const dateFromEl = document.getElementById("date-from");
    const dateToEl = document.getElementById("date-to");
    const clearFiltersBtn = document.getElementById("clear-filters-btn");

    loadAndRender();

    refreshBtn?.addEventListener("click", () => loadAndRender());

    logoutBtn?.addEventListener("click", () => {
        if (typeof window.submissionsLogout === "function") {
            window.submissionsLogout();
        }
    });

    const onFilterChange = () => applyFilters();
    searchEl?.addEventListener("input", onFilterChange);
    dateFromEl?.addEventListener("change", onFilterChange);
    dateToEl?.addEventListener("change", onFilterChange);

    clearFiltersBtn?.addEventListener("click", clearFilters);
}

init();
