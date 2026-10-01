import api from "../../../shared/api/client";

export const getAdminDashboard = async () => {
    const response = await api.get("/dashboard/admin");
    return response.data;
};
