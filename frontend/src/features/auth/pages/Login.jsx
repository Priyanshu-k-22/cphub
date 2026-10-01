import React, {
    useState,
} from "react";

import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    ArrowRight,
} from "lucide-react";

import {
    loginUser,
} from "../api/auth.api";

import {
    useAuth,
} from "../context/AuthContext";

import AuthLayout from "../components/AuthLayout";
import AuthTextField from "../components/AuthTextField";
import AuthFeedback from "../components/AuthFeedback";
import AuthPasswordField from "../components/AuthPasswordField";


const Login = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const {
        login,
        loading: authLoading,
    } = useAuth();


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    /*
    |--------------------------------------------------------------------------
    | INPUT CHANGE
    |--------------------------------------------------------------------------
    */

    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;


        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));


        if (error) {
            setError("");
        }
    };


    /*
    |--------------------------------------------------------------------------
    | LOGIN
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (loading) {
            return;
        }


        setError("");

        setLoading(true);


        try {

            const response =
                await loginUser({
                    email:
                        formData.email.trim(),

                    password:
                        formData.password,
                });


            console.log(
                "Login successful:",
                response
            );


            /*
            |--------------------------------------------------------------------------
            | LOGIN RESPONSE
            |--------------------------------------------------------------------------
            |
            | The backend has already:
            |
            | 1. Verified credentials
            | 2. Created JWT
            | 3. Set accessToken cookie
            | 4. Returned user
            |
            | Therefore we directly update AuthContext.
            |
            */

            const loggedInUser =
                response?.data?.user;


            if (!loggedInUser) {

                throw new Error(
                    "Login succeeded but user data was not returned."
                );
            }


            login(loggedInUser);


            /*
            |--------------------------------------------------------------------------
            | REDIRECT
            |--------------------------------------------------------------------------
            */

            const destination =
                loggedInUser.role === "admin"
                    ? "/admin/dashboard"
                    : location.state?.from?.pathname ||
                      "/dashboard";


            navigate(
                destination,
                {
                    replace: true,
                }
            );

        } catch (error) {

            console.error(
                "Login failed:",
                error?.response?.data || error
            );


            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Invalid email or password.";


            setError(message);

        } finally {

            setLoading(false);
        }
    };


    return (
        <AuthLayout>

            <div className="
                w-full
                max-w-[430px]
            ">

                <div className="
                    rounded-xl
                    border
                    border-[#1C2734]
                    bg-[#080E16]/95
                    p-6
                    shadow-2xl
                    backdrop-blur-xl
                    sm:p-8
                ">

                    {/* Header */}

                    <div className="mb-8">

                        <div className="
                            mb-4
                            flex
                            items-center
                            gap-2
                            font-mono
                            text-[10px]
                            text-[#556275]
                        ">

                            <span className="
                                text-[#4AFFC4]
                            ">
                                01
                            </span>

                            <span>·</span>

                            <span>
                                authentication
                            </span>

                        </div>


                        <h1 className="
                            text-2xl
                            font-semibold
                            tracking-tight
                            text-[#EDF2F7]
                        ">
                            Welcome back
                        </h1>


                        <p className="
                            mt-2
                            text-sm
                            leading-6
                            text-[#7F8B9C]
                        ">
                            Sign in to continue to CpHub.
                        </p>

                    </div>


                    {/* Error */}

                    {error && (

                        <AuthFeedback>{error}</AuthFeedback>
                    )}


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <AuthTextField label="email" id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required disabled={loading} />

                        <AuthPasswordField id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" autoComplete="current-password" required disabled={loading} visible={showPassword} onToggle={() => setShowPassword((previous) => !previous)} />

                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                authLoading
                            }
                            className="
                                group
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-md
                                bg-[#4AFFC4]
                                px-4
                                py-3
                                font-mono
                                text-sm
                                font-bold
                                text-[#06120D]
                                transition
                                hover:bg-[#72FFD2]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            {loading
                                ? "signing_in..."
                                : "sign_in"
                            }


                            {!loading && (
                                <ArrowRight
                                    size={15}
                                    className="
                                        transition-transform
                                        group-hover:translate-x-1
                                    "
                                />
                            )}

                        </button>

                    </form>


                    {/* Register */}

                    <div className="
                        mt-7
                        border-t
                        border-[#1C2734]
                        pt-6
                        text-center
                    ">

                        <p className="
                            text-xs
                            text-[#7F8B9C]
                        ">
                            Don't have an account?
                        </p>


                        <Link
                            to="/register"
                            className="
                                mt-2
                                inline-flex
                                items-center
                                gap-1
                                font-mono
                                text-xs
                                text-[#4AFFC4]
                                hover:text-[#72FFD2]
                            "
                        >
                            create_account

                            <ArrowRight size={12} />

                        </Link>

                    </div>

                </div>

            </div>

        </AuthLayout>
    );
};


export default Login;
