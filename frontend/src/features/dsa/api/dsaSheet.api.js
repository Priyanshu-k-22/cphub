import api from "../../../shared/api/client";

export const getDSASheets = async () => (await api.get("/dsa-sheet")).data;
export const createDSASheet = async (data) => (await api.post("/dsa-sheet", data)).data;
export const updateDSASheet = async (id, data) => (await api.put(`/dsa-sheet/${id}`, data)).data;
export const deleteDSASheet = async (id) => (await api.delete(`/dsa-sheet/${id}`)).data;

export const getDSATopics = async () => (await api.get("/dsa-sheet/topics")).data;
export const getDSATopicProblems = async (slug, { page = 1, limit = 20 } = {}) => (await api.get(`/dsa-sheet/topics/${encodeURIComponent(slug)}/problems`, { params: { page, limit } })).data;
export const createDSATopic = async (data) => (await api.post("/dsa-sheet/admin/topics", data)).data;
export const updateDSATopic = async (id, data) => (await api.put(`/dsa-sheet/admin/topics/${id}`, data)).data;
export const deleteDSATopic = async (id) => (await api.delete(`/dsa-sheet/admin/topics/${id}`)).data;
export const getAdminDSAProblems = async (topicId, { page = 1, limit = 20 } = {}) => (await api.get("/dsa-sheet/admin/problems", { params: { topicId, page, limit } })).data;
export const createDSAProblem = async (data) => (await api.post("/dsa-sheet/admin/problems", data)).data;
export const updateDSAProblem = async (id, data) => (await api.put(`/dsa-sheet/admin/problems/${id}`, data)).data;
export const deleteDSAProblem = async (id) => (await api.delete(`/dsa-sheet/admin/problems/${id}`)).data;
export const markDSAProblemComplete = async (id) => (await api.patch(`/dsa-sheet/problems/${id}/complete`)).data;
export const markDSAProblemIncomplete = async (id) => (await api.patch(`/dsa-sheet/problems/${id}/incomplete`)).data;
