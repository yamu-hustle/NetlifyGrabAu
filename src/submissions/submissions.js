const STORAGE_KEY = "submissionsAuth";
const API_URL = "/.netlify/functions/s3-submissions";

let allSubmissions = [];
let hasMore = false;
let nextToken = null;
let isLoading = false;
let selectedLeadSources = new Set();
let allLeadSources = [];

function getAuthData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            if (data.password && data.expires && Date.now() < data.expires) {
                return data;
            }
        }
    } catch (_) { }
    return null;
}

function getStoredPassword() {
    const auth = getAuthData();
    return auth ? auth.password : null;
}

async function fetchSubmissions(password, append = false) {
    if (isLoading) return [];
    isLoading = true;

    const params = new URLSearchParams();
    if (nextToken && append) params.append("continuationToken", nextToken);

    // Pass date filters to server for server-side filtering
    const dateFrom = document.getElementById("date-from")?.value;
    const dateTo = document.getElementById("date-to")?.value;
    if (dateFrom) params.append("dateFrom", dateFrom);
    if (dateTo) params.append("dateTo", dateTo);

    const url = `${API_URL}?${params}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "X-Submissions-Password": password,
        },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        isLoading = false;
        if (res.status === 401) {
            throw new Error("Invalid password");
        }
        throw new Error(data.message || data.error || "Failed to load submissions");
    }

    hasMore = data.hasMore || false;
    nextToken = data.nextToken || null;
    isLoading = false;

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

/** Capitalize lead source for display (title case). */
function capitalizeLeadSource(s) {
    if (s == null || !String(s).trim()) return "";
    return String(s).trim().replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
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

/** Get unique Lead Source values from submissions, sorted. */
function getUniqueLeadSources() {
    const set = new Set();
    allSubmissions.forEach((sub) => {
        const v = (sub.payload || {})["Lead Source"];
        if (v != null && String(v).trim()) set.add(String(v).trim());
    });
    return Array.from(set).sort();
}

/** Render selected lead source tags. */
function renderLeadSourceTags() {
    const tagsContainer = document.getElementById("lead-source-tags");
    if (!tagsContainer) return;
    tagsContainer.innerHTML = "";
    
    selectedLeadSources.forEach((source) => {
        const tag = document.createElement("span");
        tag.className = "inline-flex items-center gap-1 px-2 py-0.5 bg-sky-100 text-sky-800 text-xs font-medium rounded";
        tag.innerHTML = `
            ${escapeHtml(capitalizeLeadSource(source))}
            <button type="button" class="hover:text-sky-900" data-remove="${escapeHtml(source)}">×</button>
        `;
        tag.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            toggleLeadSource(source);
        });
        tagsContainer.appendChild(tag);
    });
}

/** Filter and render lead source options based on search. */
function filterLeadSourceOptions(searchTerm = "") {
    const optionsContainer = document.getElementById("lead-source-options");
    if (!optionsContainer) return;
    
    const term = searchTerm.toLowerCase();
    const filtered = allLeadSources.filter((source) => 
        capitalizeLeadSource(source).toLowerCase().includes(term)
    );
    
    optionsContainer.innerHTML = "";
    
    if (filtered.length === 0) {
        optionsContainer.innerHTML = '<div class="px-3 py-2 text-sm text-gray-500">No matches</div>';
        return;
    }
    
    filtered.forEach((source) => {
        const option = document.createElement("label");
        option.className = "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = source;
        checkbox.checked = selectedLeadSources.has(source);
        checkbox.className = "rounded border-gray-300 text-sky-600 focus:ring-sky-500";
        checkbox.addEventListener("change", () => toggleLeadSource(source));
        
        option.appendChild(checkbox);
        option.appendChild(document.createTextNode(capitalizeLeadSource(source)));
        option.addEventListener("click", (e) => {
            if (e.target !== checkbox) checkbox.click();
        });
        optionsContainer.appendChild(option);
    });
}

/** Toggle lead source selection. */
function toggleLeadSource(source) {
    if (selectedLeadSources.has(source)) {
        selectedLeadSources.delete(source);
    } else {
        selectedLeadSources.add(source);
    }
    renderLeadSourceTags();
    filterLeadSourceOptions(document.getElementById("lead-source-search")?.value || "");
    applyFilters();
}

/** Populate Lead Source filter from current submissions. */
function populateLeadSourceFilter() {
    allLeadSources = getUniqueLeadSources();
    filterLeadSourceOptions();
}

/** Get selected lead sources as array. */
function getSelectedLeadSources() {
    return Array.from(selectedLeadSources);
}

/** Apply date range, search, and lead source filters, then render. */
function applyFilters() {
    const searchEl = document.getElementById("search-input");
    const dateFromEl = document.getElementById("date-from");
    const dateToEl = document.getElementById("date-to");
    const search = searchEl?.value ?? "";
    const fromStr = dateFromEl?.value;
    const toStr = dateToEl?.value;
    const selectedLeadSourcesArray = getSelectedLeadSources();

    const fromDate = fromStr ? new Date(fromStr + "T00:00:00") : null;
    const toDate = toStr ? new Date(toStr + "T23:59:59") : null;
    const filterByLeadSource = selectedLeadSourcesArray.length > 0;

    const filtered = allSubmissions.filter((sub) => {
        if (!matchesSearch(sub, search)) return false;
        if (filterByLeadSource) {
            const ls = (sub.payload || {})["Lead Source"];
            const value = ls != null ? String(ls).trim() : "";
            if (!selectedLeadSourcesArray.includes(value)) return false;
        }
        const d = getSubmissionDate(sub);
        if (d) {
            if (fromDate && d < fromDate) return false;
            if (toDate && d > toDate) return false;
        }
        return true;
    });

    renderSubmissions(filtered);
    updateSubmissionCount(filtered.length);
}

function updateSubmissionCount(filteredCount) {
    const countEl = document.getElementById("submission-count");
    if (!countEl) return;
    if (filteredCount < allSubmissions.length) {
        countEl.textContent = `Showing ${filteredCount} of ${allSubmissions.length} submissions (filtered)`;
    } else {
        countEl.textContent = `Showing ${allSubmissions.length} submission${allSubmissions.length !== 1 ? 's' : ''}${hasMore ? ' (load more to see all)' : ''}`;
    }
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
        const leadSource = escapeHtml(capitalizeLeadSource(payload["Lead Source"]) || "—");
        const meta = [phone, state, prefTime].join(" · ");
        const comments = payload["Comments or Questions"];
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow overflow-hidden";
        card.innerHTML = `
            <div class="px-4 py-2.5 flex flex-wrap justify-between items-center gap-2 border-b border-gray-100">
                <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 min-w-0">
                    <span class="font-semibold text-gray-800">${escapeHtml(payload["First Name"] || "")} ${escapeHtml(payload["Last Name"] || "")}</span>
                    <span class="text-gray-500 text-sm truncate">${escapeHtml(payload["Email"] || "")}</span>
                    <span class="bg-sky-600 text-white text-xs font-medium px-2.5 py-0.5 rounded">${leadSource}</span>
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

async function loadAndRender(append = false) {
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const list = document.getElementById("submissions-list");
    const filters = document.getElementById("filters");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const loadMoreWrap = document.getElementById("load-more-wrap");

    if (!append) {
        loading.classList.remove("hidden");
        error.classList.add("hidden");
        list.innerHTML = "";
        if (filters) filters.classList.add("hidden");
        if (loadMoreWrap) loadMoreWrap.classList.add("hidden");
        allSubmissions = [];
        nextToken = null;
    } else {
        if (loadMoreBtn) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = "Loading...";
        }
    }

    const password = getStoredPassword();
    if (!password) {
        if (typeof window.submissionsLogout === "function") {
            window.submissionsLogout();
        }
        return;
    }

    try {
        const newSubmissions = await fetchSubmissions(password, append);
        if (append) {
            allSubmissions.push(...newSubmissions);
        } else {
            allSubmissions = newSubmissions;
        }
        loading.classList.add("hidden");
        if (filters) filters.classList.remove("hidden");
        populateLeadSourceFilter();
        applyFilters();

        // Update load more button
        if (loadMoreBtn && loadMoreWrap) {
            loadMoreBtn.textContent = "Load More";
            loadMoreBtn.disabled = false;
            if (hasMore) {
                loadMoreWrap.classList.remove("hidden");
            } else {
                loadMoreWrap.classList.add("hidden");
            }
        }
    } catch (err) {
        loading.classList.add("hidden");
        error.textContent = err.message;
        error.classList.remove("hidden");
        if (loadMoreBtn) {
            loadMoreBtn.textContent = "Load More";
            loadMoreBtn.disabled = false;
        }
    }
}

function clearFilters() {
    const searchEl = document.getElementById("search-input");
    const dateFromEl = document.getElementById("date-from");
    const dateToEl = document.getElementById("date-to");
    const leadSourceSearch = document.getElementById("lead-source-search");
    if (searchEl) searchEl.value = "";
    if (dateFromEl) dateFromEl.value = "";
    if (dateToEl) dateToEl.value = "";
    if (leadSourceSearch) leadSourceSearch.value = "";
    selectedLeadSources.clear();
    renderLeadSourceTags();
    filterLeadSourceOptions();
    // When clearing filters, reload from scratch (date filters affect server-side fetch)
    loadAndRender();
}

function init() {
    const refreshBtn = document.getElementById("refresh-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const searchEl = document.getElementById("search-input");
    const dateFromEl = document.getElementById("date-from");
    const dateToEl = document.getElementById("date-to");
    const clearFiltersBtn = document.getElementById("clear-filters-btn");
    const loadMoreBtn = document.getElementById("load-more-btn");
    
    // Lead source multi-select elements
    const leadSourceInput = document.getElementById("lead-source-filter-input");
    const leadSourceSearch = document.getElementById("lead-source-search");
    const leadSourceDropdown = document.getElementById("lead-source-dropdown");

    loadAndRender();

    refreshBtn?.addEventListener("click", () => loadAndRender());

    logoutBtn?.addEventListener("click", () => {
        if (typeof window.submissionsLogout === "function") {
            window.submissionsLogout();
        }
    });

    const onFilterChange = () => applyFilters();
    searchEl?.addEventListener("input", onFilterChange);
    // Date filters affect server-side, so reload when changed
    dateFromEl?.addEventListener("change", () => loadAndRender());
    dateToEl?.addEventListener("change", () => loadAndRender());

    clearFiltersBtn?.addEventListener("click", clearFilters);
    loadMoreBtn?.addEventListener("click", () => loadAndRender(true));

    // Lead source multi-select dropdown behavior
    if (leadSourceInput && leadSourceSearch && leadSourceDropdown) {
        // Open dropdown on click
        leadSourceInput.addEventListener("click", () => {
            leadSourceDropdown.classList.remove("hidden");
            leadSourceSearch.focus();
        });

        // Search filtering
        leadSourceSearch.addEventListener("input", (e) => {
            filterLeadSourceOptions(e.target.value);
        });

        // Close on click outside
        document.addEventListener("click", (e) => {
            if (!leadSourceInput.contains(e.target) && !leadSourceDropdown.contains(e.target)) {
                leadSourceDropdown.classList.add("hidden");
                leadSourceSearch.value = "";
                filterLeadSourceOptions();
            }
        });

        // Prevent dropdown close when clicking inside
        leadSourceDropdown.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }
}

init();
