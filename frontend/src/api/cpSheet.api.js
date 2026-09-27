import api from "./api";


/*
|--------------------------------------------------------------------------
| Get CP Sheet
|--------------------------------------------------------------------------
*/

export const getCPSheet = async (rating) => {

    const response = await api.get(
        "/cp-sheet",
        {
            params: {
                rating
            }
        }
    );

    return response.data;
};


/*
|--------------------------------------------------------------------------
| Create CP Problem
|--------------------------------------------------------------------------
*/

export const createCPProblem = async (
    problemData
) => {

    const response = await api.post(
        "/cp-sheet",
        problemData
    );

    return response.data;
};

export const updateCPProblem = async (problemId, problemData) => {
    const response = await api.put(
        `/cp-sheet/${problemId}`,
        problemData
    );

    return response.data;
};

export const deleteCPProblem = async (problemId) => {
    const response = await api.delete(`/cp-sheet/${problemId}`);
    return response.data;
};


/*
|--------------------------------------------------------------------------
| Mark Complete
|--------------------------------------------------------------------------
*/

export const markProblemComplete =
    async (problemId) => {

        const response = await api.patch(
            `/cp-sheet/${problemId}/complete`
        );

        return response.data;
    };


/*
|--------------------------------------------------------------------------
| Mark Incomplete
|--------------------------------------------------------------------------
*/

export const markProblemIncomplete =
    async (problemId) => {

        const response = await api.patch(
            `/cp-sheet/${problemId}/incomplete`
        );

        return response.data;
    };
