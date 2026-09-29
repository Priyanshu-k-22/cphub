import api from "./api";

export const getAdminUsers = async ({ page = 1, limit = 20, search = "" } = {}) => {
    const response = await api.get("/users/admin", {
        params: { page, limit, search }
    });
    return response.data;
};

export const getAdminUserProfile = async (userId) => {
    const response = await api.get(`/users/admin/${userId}`);
    return response.data;
};

export const getAdminUserProgress = async () => {
    const response = await api.get("/users/admin/progress");
    return response.data;
};
