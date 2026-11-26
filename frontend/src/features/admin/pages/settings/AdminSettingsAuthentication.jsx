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
import AdminFeedback from "../../components/AdminFeedback";

import {
    getAuthenticationSettings,
    updateAuthenticationSettings,
} from "../../api/adminSettings.api";

const AdminSettingsAuthentication = () => {
    const [
        registrationsEnabled,
        setRegistrationsEnabled,
    ] = useState(true);

    const [savedRegistrationsEnabled, setSavedRegistrationsEnabled] = useState(true);

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

            const enabled = response?.data?.registrationsEnabled ?? true;
            setRegistrationsEnabled(enabled);
            setSavedRegistrationsEnabled(enabled);
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

            const enabled = response?.data?.registrationsEnabled ?? registrationsEnabled;
            setRegistrationsEnabled(enabled);
            setSavedRegistrationsEnabled(enabled);

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
            description="Control whether new student accounts can be created. Existing users can still sign in."
            icon={LockKeyhole}
        >
            {/* Error */}
            {error && <AdminFeedback onDismiss={() => setError("")}>{error}<button type="button" onClick={loadSettings} className="ml-3 font-semibold underline">Retry</button></AdminFeedback>}

            {/* Success */}
            {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}><span className="inline-flex items-center gap-2"><Check size={15} />{notice}</span></AdminFeedback>}

            <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]">

                {/* Header */}
                <div className="border-b border-[var(--theme-border)] px-5 py-4">
                    <h2 className="text-sm font-semibold text-[var(--theme-text)]">
                        Registration
                    </h2>

                    <p className="mt-1 text-xs text-[var(--theme-text-muted)]">
                        Registration gate
                    </p>
                </div>

                {/* Setting */}
                <div className="flex items-center justify-between gap-4 px-5 py-5">

                    <div>
                        <h3 className="text-sm font-semibold text-[var(--theme-text)]">
                            Student registrations
                        </h3>

                        <p className="mt-1 max-w-xl text-xs leading-5 text-[var(--theme-text-muted)]">
                            When closed, the signup form is clearly marked unavailable and the backend rejects direct registration requests. Current accounts and sign-in are unaffected.
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
                                ? "bg-[var(--theme-accent)]"
                                : "bg-[var(--theme-surface-high)]"
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
                <div className="flex flex-col gap-3 border-t border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">

                    <span role="status"
                        className={`text-xs font-medium ${
                            loading
                                ? "text-[var(--theme-text-muted)]"
                                : registrationsEnabled
                                  ? "text-[var(--theme-accent)]"
                                  : "text-[#F5C542]"
                        }`}
                    >
                        {loading
                            ? "Loading…"
                            : registrationsEnabled
                              ? "Registrations open"
                              : "Registrations closed"}
                    </span>

                    <div className="flex justify-end gap-2">
                    <button type="button" disabled={loading || saving || registrationsEnabled === savedRegistrationsEnabled} onClick={() => setRegistrationsEnabled(savedRegistrationsEnabled)} className="min-h-10 rounded-xl border border-[var(--theme-border)] px-4 text-sm font-semibold text-[var(--theme-text-secondary)] disabled:opacity-40">Discard</button>
                    <button
                        type="button"
                        disabled={loading || saving || registrationsEnabled === savedRegistrationsEnabled}
                        onClick={saveSettings}
                        className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-lime-300 px-4 text-sm font-bold text-emerald-950 transition hover:brightness-105 disabled:opacity-50"
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
                            : "Save changes"}
                    </button>
                    </div>
                </div>
            </section>
        </SettingsPageLayout>
    );
};

export default AdminSettingsAuthentication;
