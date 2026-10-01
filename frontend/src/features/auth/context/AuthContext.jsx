import React, {
    createContext,
    useContext,
    useEffect,
    useCallback,
    useRef,
    useState,
} from "react";

import {
    getCurrentUser,
    logoutUser,
} from "../api/auth.api";


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const updateUser = useCallback((userData) => {
        setUser(userData);
    }, []);


    /*
    |--------------------------------------------------------------------------
    | Prevent stale authentication requests from changing state
    |--------------------------------------------------------------------------
    */

    const authRequestId = useRef(0);

    const hasCheckedAuth = useRef(false);


    /*
    |--------------------------------------------------------------------------
    | CHECK AUTH
    |--------------------------------------------------------------------------
    */

    const checkAuth = async () => {

        /*
         * Give this request a unique id.
         */
        const requestId =
            ++authRequestId.current;


        try {

            const response =
                await getCurrentUser();


            /*
             * If another auth action happened while
             * this request was running, ignore this result.
             */
            if (
                requestId !== authRequestId.current
            ) {
                return;
            }


            /*
             * Backend:
             *
             * {
             *   statusCode: 200,
             *   data: {
             *      user: {...}
             *   },
             *   message: "...",
             *   success: true
             * }
             *
             * OR
             *
             * {
             *   data: {...user}
             * }
             *
             * Handle both.
             */

            const currentUser =
                response?.data?.user ||
                response?.data?.data ||
                response?.data;


            setUser(currentUser || null);

        } catch (error) {

            /*
             * IMPORTANT:
             *
             * A stale /auth/me request must never
             * remove a user who has logged in afterwards.
             */

            if (
                requestId !== authRequestId.current
            ) {
                return;
            }


            /*
             * 401 during initial auth check simply
             * means that the user is not logged in.
             */

            setUser(null);

        } finally {

            if (
                requestId === authRequestId.current
            ) {
                setLoading(false);
            }
        }
    };


    /*
    |--------------------------------------------------------------------------
    | LOGIN
    |--------------------------------------------------------------------------
    */

    const login = (userData) => {

        /*
         * Invalidate every previous /auth/me request.
         *
         * This is the important fix.
         */

        authRequestId.current += 1;


        /*
         * Login already returned the authenticated user.
         */

        setUser(userData);

        setLoading(false);
    };


    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */

    const logout = async () => {

        /*
         * Invalidate any currently running auth request.
         */

        authRequestId.current += 1;


        try {

            await logoutUser();

        } catch (error) {

            console.error(
                "Logout failed:",
                error?.response?.data || error
            );

        } finally {

            setUser(null);

            setLoading(false);
        }
    };


    /*
    |--------------------------------------------------------------------------
    | INITIAL AUTH CHECK
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        /*
         * React StrictMode can execute effects twice
         * during development.
         *
         * We only need one initial auth check.
         */

        if (hasCheckedAuth.current) {
            return;
        }


        hasCheckedAuth.current = true;


        checkAuth();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | CONTEXT
    |--------------------------------------------------------------------------
    */

    return (
        <AuthContext.Provider
            value={{
                user,

                loading,

                isAuthenticated:
                    Boolean(user),

                login,

                logout,

                updateUser,

                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


/*
|--------------------------------------------------------------------------
| useAuth
|--------------------------------------------------------------------------
*/

export const useAuth = () => {

    const context =
        useContext(AuthContext);


    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }


    return context;
};
