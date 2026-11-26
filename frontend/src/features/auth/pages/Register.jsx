import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    ArrowRight,
} from "lucide-react";

import {
    registerUser,
} from "../api/auth.api";

import AuthLayout from "../components/AuthLayout";
import AuthTextField from "../components/AuthTextField";
import AuthFeedback from "../components/AuthFeedback";
import AuthPasswordField from "../components/AuthPasswordField";
import { getPublicSettings } from "../../admin/api/adminSettings.api";


const Register = () => {

    const navigate = useNavigate();


    /*
    |--------------------------------------------------------------------------
    | FORM STATE
    |--------------------------------------------------------------------------
    */

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });


    /*
    |--------------------------------------------------------------------------
    | UI STATE
    |--------------------------------------------------------------------------
    */

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [registrationsEnabled, setRegistrationsEnabled] = useState(true);
    const [settingsLoading, setSettingsLoading] = useState(true);
    const [settingsError, setSettingsError] = useState("");

    const refreshRegistrationSettings = useCallback(async () => {
        setSettingsLoading(true);
        setSettingsError("");
        try {
            const response = await getPublicSettings();
            setRegistrationsEnabled(response?.data?.authentication?.registrationsEnabled ?? response?.data?.registrationsEnabled ?? true);
        } catch {
            // Fail closed in the UI; the backend independently enforces the registration setting.
            setRegistrationsEnabled(false);
            setSettingsError("We couldn’t check whether registration is open. Retry before creating an account.");
        } finally {
            setSettingsLoading(false);
        }
    }, []);

    useEffect(() => { refreshRegistrationSettings(); }, [refreshRegistrationSettings]);


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


        setError("");
    };


    /*
    |--------------------------------------------------------------------------
    | REGISTER
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (loading || settingsLoading) {

            return;

        }

        if (!registrationsEnabled) {
            setError("New registrations are currently closed.");
            return;
        }

        setError("");

        setSuccess("");

        setLoading(true);


        try {

            /*
            |--------------------------------------------------------------------------
            | REGISTER REQUEST
            |--------------------------------------------------------------------------
            */

            const response =
                await registerUser({
                    username:
                        formData.username.trim(),

                    email:
                        formData.email.trim(),

                    password:
                        formData.password,
                });


            console.log(
                "Registration successful:",
                response
            );


            /*
            |--------------------------------------------------------------------------
            | REGISTRATION SUCCESS
            |--------------------------------------------------------------------------
            |
            | Backend registration does NOT create
            | the accessToken cookie.
            |
            | Therefore we don't call login().
            |
            */

            setSuccess(
                "Account created successfully. Redirecting to login..."
            );


            /*
            |--------------------------------------------------------------------------
            | REDIRECT
            |--------------------------------------------------------------------------
            */

            setTimeout(() => {

                navigate("/login");

            }, 1000);


        } catch (error) {

            console.error(
                "Registration failed:",
                error.response?.data || error
            );


            /*
            |--------------------------------------------------------------------------
            | ERROR MESSAGE
            |--------------------------------------------------------------------------
            */

            const backendMessage =
                error.response?.data?.message;


            const validationErrors =
                error.response?.data?.errors;


            if (backendMessage) {

                setError(
                    backendMessage
                );

            } else if (
                Array.isArray(validationErrors)
            ) {

                setError(
                    validationErrors
                        .map(
                            (item) =>
                                item.message
                        )
                        .join(", ")
                );

            } else {

                setError(
                    "Unable to create account."
                );
            }


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

                {/* =====================================================
                    CARD
                ===================================================== */}

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

                    {/* =================================================
                        HEADER
                    ================================================= */}

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
                                create_account
                            </span>

                        </div>


                        <h1 className="
                            text-2xl
                            font-semibold
                            tracking-tight
                            text-[#EDF2F7]
                        ">
                            Join CpHub
                        </h1>


                        <p className="
                            mt-2
                            text-sm
                            leading-6
                            text-[#7F8B9C]
                        ">
                            Create your account and start competing.
                        </p>

                    </div>


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <AuthFeedback>{error}</AuthFeedback>

                    )}


                    {/* =================================================
                        SUCCESS
                    ================================================= */}

                    {success && (

                        <AuthFeedback variant="success">{success}</AuthFeedback>

                    )}


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {settingsError && <AuthFeedback>{settingsError} <button type="button" onClick={refreshRegistrationSettings} className="ml-2 underline underline-offset-2">Retry</button></AuthFeedback>}
                        {!settingsLoading && !settingsError && !registrationsEnabled && <div role="status" className="rounded-md border border-amber-500/20 bg-amber-500/5 px-4 py-3"><p className="font-mono text-xs leading-5 text-amber-300">New registrations are temporarily paused. Existing members can still sign in below.</p></div>}

                        <AuthTextField label="username" id="username" name="username" type="text" value={formData.username} onChange={handleChange} placeholder="your_username" minLength={3} maxLength={30} autoComplete="username" disabled={loading || settingsLoading || !registrationsEnabled} required />

                        <AuthTextField label="email" id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" disabled={loading || settingsLoading || !registrationsEnabled} required />

                        <AuthPasswordField id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" minLength={8} maxLength={100} autoComplete="new-password" disabled={loading || settingsLoading || !registrationsEnabled} required visible={showPassword} onToggle={() => setShowPassword((previous) => !previous)} />

                        {/* SUBMIT */}

                        <button
                            type="submit"
                            disabled={loading || settingsLoading || !registrationsEnabled || Boolean(settingsError)}
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
                                active:scale-[0.99]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            {settingsLoading
                                ? "Checking registration…"
                                : settingsError
                                    ? "Status unavailable"
                                    : !registrationsEnabled
                                    ? "Registration paused"
                                    : loading
                                        ? "Creating account…"
                                        : "Create account"
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


                    {/* =================================================
                        LOGIN LINK
                    ================================================= */}

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
                            Already have an account?
                        </p>


                        <Link
                            to="/login"
                            className="
                                mt-2
                                inline-flex
                                items-center
                                gap-1
                                font-mono
                                text-xs
                                text-[#4AFFC4]
                                transition
                                hover:text-[#72FFD2]
                            "
                        >
                            sign_in

                            <ArrowRight
                                size={12}
                            />

                        </Link>

                    </div>

                </div>

            </div>

        </AuthLayout>
    );
};


export default Register;
