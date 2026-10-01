import api from "../../../shared/api/client";


/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/

export const registerUser = async ({
    username,
    email,
    password,
}) => {

    const response = await api.post(
        "/auth/register",
        {
            username,
            email,
            password,
        }
    );

    return response.data;
};


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

export const loginUser = async ({
    email,
    password,
}) => {

    const response = await api.post(
        "/auth/login",
        {
            email,
            password,
        }
    );

    return response.data;
};


/*
|--------------------------------------------------------------------------
| CURRENT USER
|--------------------------------------------------------------------------
*/

export const getCurrentUser = async () => {

    const response = await api.get(
        "/auth/me"
    );

    return response.data;
};


/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

export const logoutUser = async () => {

    const response = await api.post(
        "/auth/logout"
    );

    return response.data;
};