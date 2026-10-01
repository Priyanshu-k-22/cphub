import api from "../../../shared/api/client";

export const getContests = async ({
    category = ""
} = {}) => {
    const params = {};

    if (category) {
        params.category = category;
    }

    const response = await api.get(
        "/contests",
        { params }
    );

    return response.data;
};