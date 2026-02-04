// Submissions page auth check – blocks access until logged in
(function () {
    "use strict";

    if (!window.location.pathname.includes("/submissions/") || window.location.pathname.includes("/submissions-login")) {
        return;
    }

    const STORAGE_KEY = "submissionsAuth";

    function isAuthenticated() {
        try {
            const authData = localStorage.getItem(STORAGE_KEY);
            if (!authData) return false;

            const { token, expires } = JSON.parse(authData);
            if (!token || !expires || Date.now() >= expires) {
                localStorage.removeItem(STORAGE_KEY);
                return false;
            }
            return true;
        } catch (e) {
            localStorage.removeItem(STORAGE_KEY);
            return false;
        }
    }

    function redirectToLogin() {
        sessionStorage.setItem("submissionsIntendedPath", window.location.pathname);
        window.location.href = "/submissions-login/";
    }

    if (!isAuthenticated()) {
        redirectToLogin();
    }

    window.submissionsLogout = function () {
        localStorage.removeItem(STORAGE_KEY);
        window.location.href = "/submissions-login/";
    };
})();
