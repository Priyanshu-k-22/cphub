import api from "../../../shared/api/client";

export const getDashboard = async () => {
    const response = await api.get("/dashboard");
    return response.data;
};
