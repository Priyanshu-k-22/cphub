import api from "./api";

export const getAdminSettings = async () => (await api.get("/settings/admin")).data;
export const updateAdminSettings = async (settings) => (await api.put("/settings/admin", settings)).data;
export const getPublicSettings = async () => (await api.get("/settings/public")).data;
