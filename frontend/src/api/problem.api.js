import api from "./api";

export const createProblem = async (problemData) => {
    const response = await api.post(
        "/problems/",
        problemData
    );

    return response.data;
};


export const getDailyProblems = async (category) => {

    const params = {};

    if (category) {
        params.category = category;
    }

    const response = await api.get(
        "/problems/daily",
        {
            params
        }
    );

    return response.data;
};


export const getProblemById = async (problemId) => {

    const response = await api.get(
        `/problems/${problemId}`
    );

    return response.data;
};


export const getProblemHistory = async ({
    search,
    category,
    difficulty,
    topic,
    tag,
    sort = "newest",
    page = 1,
    limit = 20
} = {}) => {

    const params = {
        sort,
        page,
        limit
    };

    if (search) {
        params.search = search;
    }

    if (category) {
        params.category = category;
    }

    if (difficulty) {
        params.difficulty = difficulty;
    }

    if (topic) {
        params.topic = topic;
    }

    if (tag) {
        params.tag = tag;
    }

    const response = await api.get(
        "/problems/history",
        {
            params
        }
    );

    return response.data;
};

export const getDailyProblemProgress = async (problemId) => {
    const response = await api.get(`/problems/${problemId}/progress`);
    return response.data;
};

export const markDailyProblemComplete = async (problemId) => {
    const response = await api.patch(`/problems/${problemId}/complete`);
    return response.data;
};

export const markDailyProblemIncomplete = async (problemId) => {
    const response = await api.patch(`/problems/${problemId}/incomplete`);
    return response.data;
};

export const updateProblem = async (problemId, problemData) => {
    const response = await api.put(`/problems/${problemId}`, problemData);
    return response.data;
};

export const deleteProblem = async (problemId) => {
    const response = await api.delete(`/problems/${problemId}`);
    return response.data;
};

export const getAdminProblems = async ({ category, page = 1, limit = 20 } = {}) => {
    const params = { page, limit };
    if (category && category !== "ALL") params.category = category;
    const response = await api.get("/problems/admin", { params });
    return response.data;
};
