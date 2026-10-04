import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    Check,
    LockKeyhole,
    RefreshCw,
    Save,
} from "lucide-react";

import SettingsPageLayout from "./SettingsPageLayout";

import {
    getAuthenticationSettings,
    updateAuthenticationSettings,
} from "../../api/adminSettings.api";

const AdminSettingsAuthentication = () => {
    const [
        registrationsEnabled,
        setRegistrationsEnabled,
    ] = useState(true);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [notice, setNotice] =
        useState("");

    /*
     * ========================================
     * LOAD SETTINGS
     * ========================================
     */

    const loadSettings = useCallback(async () => {
        setLoading(true);
        setError("");
        setNotice("");

        try {
            const response =
                await getAuthenticationSettings();

            /*
             * Backend response:
             *
             * {
             *   success: true,
             *   data: {
             *      registrationsEnabled: true
             *   }
             * }
             */

            setRegistrationsEnabled(
                response?.data
                    ?.registrationsEnabled ?? true
            );
        } catch (requestError) {
            setError(
                requestError?.response?.data
                    ?.message ||
                    "Could not load authentication settings."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    /*
     * Load when page opens
     */

    useEffect(() => {
        loadSettings();
    }, [loadSettings]);

    /*
     * ========================================
     * SAVE SETTINGS
     * ========================================
     */

    const saveSettings = async () => {
        setSaving(true);
        setError("");
        setNotice("");

        try {
            const response =
                await updateAuthenticationSettings({
                    registrationsEnabled,
                });

            /*
             * Use the value returned by backend.
             */

            setRegistrationsEnabled(
                response?.data
                    ?.registrationsEnabled ??
                    registrationsEnabled
            );

            setNotice(
                "Authentication settings saved."
            );
        } catch (requestError) {
            setError(
                requestError?.response?.data
                    ?.message ||
                    "Could not save authentication settings."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <SettingsPageLayout
            title="Authentication"
            description="Registration, verification and session controls."
            icon={LockKeyhole}
        >
            {/* Error */}
            {error && (
                <div
                    role="alert"
                    className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                >
                    {error}
                </div>
            )}

            {/* Success */}
            {notice && (
                <div
                    role="status"
                    className="mb-4 flex items-center gap-2 rounded-xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/[0.06] px-4 py-3 text-sm text-[#4AFFC4]"
                >
                    <Check size={15} />
                    {notice}
                </div>
            )}

            <section className="overflow-hidden rounded-2xl border border-[#1C2734] bg-[#080D14]">

                {/* Header */}
                <div className="border-b border-[#1C2734] px-5 py-4">
                    <h2 className="text-sm font-semibold text-[#DCE4ED]">
                        Registration
                    </h2>

                    <p className="mt-1 text-xs text-[#667384]">
                        Controls whether new students can create
                        accounts.
                    </p>
                </div>

                {/* Setting */}
                <div className="flex items-center justify-between gap-4 px-5 py-5">

                    <div>
                        <h3 className="text-sm font-semibold text-[#DCE4ED]">
                            Student registrations
                        </h3>

                        <p className="mt-1 max-w-xl text-xs leading-5 text-[#667384]">
                            When disabled, new accounts are blocked
                            on both the registration page and API.
                        </p>
                    </div>

                    <button
                        type="button"
                        role="switch"
                        aria-checked={
                            registrationsEnabled
                        }
                        aria-label="Allow new student registrations"
                        disabled={
                            loading || saving
                        }
                        onClick={() =>
                            setRegistrationsEnabled(
                                (current) => !current
                            )
                        }
                        className={`relative h-7 w-12 shrink-0 rounded-full transition disabled:opacity-50 ${
                            registrationsEnabled
                                ? "bg-[#4AFFC4]"
                                : "bg-[#26313E]"
                        }`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                                registrationsEnabled
                                    ? "left-6"
                                    : "left-1"
                            }`}
                        />
                    </button>
                </div>

                {/* Status + Save */}
                <div className="flex items-center justify-between border-t border-[#1C2734] px-5 py-4">

                    <span
                        className={`text-xs font-medium ${
                            loading
                                ? "text-[#667384]"
                                : registrationsEnabled
                                  ? "text-[#4AFFC4]"
                                  : "text-[#F5C542]"
                        }`}
                    >
                        {loading
                            ? "Loading…"
                            : registrationsEnabled
                              ? "Registrations open"
                              : "Registrations closed"}
                    </span>

                    <button
                        type="button"
                        disabled={
                            loading || saving
                        }
                        onClick={saveSettings}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2.5 text-sm font-semibold text-[#06120D] transition hover:brightness-105 disabled:opacity-50"
                    >
                        {saving ? (
                            <RefreshCw
                                size={14}
                                className="animate-spin"
                            />
                        ) : (
                            <Save size={14} />
                        )}

                        {saving
                            ? "Saving…"
                            : "Save setting"}
                    </button>
                </div>
            </section>
        </SettingsPageLayout>
    );
};

export default AdminSettingsAuthentication;