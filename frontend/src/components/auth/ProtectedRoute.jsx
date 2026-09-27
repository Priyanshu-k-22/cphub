import React from "react";

import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import {
    useAuth,
} from "../../context/AuthContext";


const ProtectedRoute = ({ requireAdmin = false }) => {

    const {
        user,
        loading,
    } = useAuth();

    const location =
        useLocation();


    /*
    |--------------------------------------------------------------------------
    | AUTH INITIALIZATION
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <div className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-[#060A10]
            ">

                <div className="
                    flex
                    flex-col
                    items-center
                    gap-3
                ">

                    <div className="
                        h-6
                        w-6
                        animate-spin
                        rounded-full
                        border-2
                        border-[#1C2734]
                        border-t-[#4AFFC4]
                    " />

                    <p className="
                        font-mono
                        text-xs
                        text-[#556275]
                    ">
                        checking_session...
                    </p>

                </div>

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | NOT LOGGED IN
    |--------------------------------------------------------------------------
    */

    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: {
                        pathname:
                            location.pathname,

                        search:
                            location.search,

                        hash:
                            location.hash,
                    },
                }}
            />
        );
    }

    if (requireAdmin && user.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }


    /*
    |--------------------------------------------------------------------------
    | LOGGED IN
    |--------------------------------------------------------------------------
    */

    return <Outlet />;
};


export default ProtectedRoute;
