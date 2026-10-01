import api from "../../../shared/api/client";

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

export const getAdminUserProgress = async ({ page = 1, limit = 20 } = {}) => {
    const response = await api.get("/users/admin/progress", { params: { page, limit } });
    return response.data;
};
