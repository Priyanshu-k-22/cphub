import api from "../../../shared/api/client";

export const getAdminContent = async (kind) => (await api.get(`/admin/content/${kind}`)).data;
export const createAdminContent = async (kind, data) => (await api.post(`/admin/content/${kind}`, data)).data;
export const updateAdminContent = async (kind, id, data) => (await api.put(`/admin/content/${kind}/${id}`, data)).data;
export const deleteAdminContent = async (kind, id) => (await api.delete(`/admin/content/${kind}/${id}`)).data;
