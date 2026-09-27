import api from "./api";

export const getCurrentUser = async () => {
    const response = await api.get("/users/me");

    return response.data;
};

export const updateCurrentUser = async (profile) => {
    const response = await api.put("/users/me", profile);
    return response.data;
};
