import api from "./api";

export const getCurrentUser = async () => {
    const response = await api.get("/users/me");

    return response.data;
};

export const updateCurrentUser = async (profile) => {
    const response = await api.put("/users/me", profile);
    return response.data;
};

export const uploadProfilePhoto = async (file) => {
    const response = await api.post("/users/me/avatar", file, {
        headers: { "Content-Type": file.type },
        timeout: 35000,
        transformRequest: [(data) => data],
    });
    return response.data;
};
