import api from "./api";

export const getLeaderboard = async ({ type, period = "all-time", page = 1, limit = 50 } = {}) => {
    const response = await api.get("/leaderboard", { params: { type, period, page, limit } });
    return response.data;
};
