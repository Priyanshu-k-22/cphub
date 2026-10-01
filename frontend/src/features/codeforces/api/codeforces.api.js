import api from "../../../shared/api/client";


// ============================================================
// GET STORED CODEFORCES PROFILE
// ============================================================

export const getCodeforcesProfile = async () => {

    const response = await api.get(
        "/codeforces"
    );

    return response.data;
};


// ============================================================
// SYNC CODEFORCES DATA
// ============================================================

export const syncCodeforces = async () => {

    const response = await api.post(
        "/codeforces/sync"
    );

    return response.data;
};

export const startBulkCodeforcesSync = async () => {
    const response = await api.post("/codeforces/sync-all");
    return response.data;
};

export const getBulkCodeforcesSyncStatus = async () => {
    const response = await api.get("/codeforces/sync-all/status");
    return response.data;
};
