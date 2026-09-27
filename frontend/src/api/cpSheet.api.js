import api from "./api";


/*
|--------------------------------------------------------------------------
| Get CP Sheet
|--------------------------------------------------------------------------
*/

export const getCPSheet = (rating) => {

    return api.get(
        "/cp-sheet",
        {
            params: {
                rating
            }
        }
    );

};


/*
|--------------------------------------------------------------------------
| Mark Problem Complete
|--------------------------------------------------------------------------
*/

export const markProblemComplete = (
    problemId
) => {

    return api.patch(
        `/cp-sheet/${problemId}/complete`
    );

};


/*
|--------------------------------------------------------------------------
| Mark Problem Incomplete
|--------------------------------------------------------------------------
*/

export const markProblemIncomplete = (
    problemId
) => {

    return api.patch(
        `/cp-sheet/${problemId}/incomplete`
    );

};