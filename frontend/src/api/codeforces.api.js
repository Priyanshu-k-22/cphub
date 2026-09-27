import api from "./api";


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