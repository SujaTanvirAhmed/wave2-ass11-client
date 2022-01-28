export default function useLocalStorage() {

    const identifier = "app-wave2-ass11-client";
    const app = "wave2-ass11-client";
    const initialAuthStatus = {
        appName: app,
        authed: false,
        userId: "",
        userRole: ""
    };

    function initializeLocalStorage() {
        localStorage.setItem(identifier, JSON.stringify(initialAuthStatus));
    }

    function setDbUser(id, role) {
        const authStatus = {
            appName: app,
            authed: true,
            userId: id,
            userRole: role
        };
        localStorage.setItem(identifier, JSON.stringify(authStatus));
    }

    function isAuthed() {
        const as = JSON.parse(localStorage.getItem(identifier));
        if (!as) {
            return false;
        }
        return as.authed;
    }

    function getUserDbId() {
        const as = JSON.parse(localStorage.getItem(identifier));
        if (!as) {
            return "";
        }
        return as.userId;
    }

    function getUserDbRole() {
        const as = JSON.parse(localStorage.getItem(identifier));
        if (!as) {
            return "";
        }
        return as.userRole;
    }

    return (
        {
            initializeLocalStorage,
            setDbUser,
            isAuthed,
            getUserDbId,
            getUserDbRole
        }
    );
}
