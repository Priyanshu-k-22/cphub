import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    Check,
    Globe2,
    RefreshCw,
    Save,
    Settings2,
} from "lucide-react";

import SettingsPageLayout from "./SettingsPageLayout";

import {
    getGeneralSettings,
    updateGeneralSettings,
} from "../../api/adminSettings.api";

const AdminSettingsGeneral = () => {
    const [platformName, setPlatformName] =
        useState("");

    const [platformDescription, setPlatformDescription] =
        useState("");

    const [maintenanceMode, setMaintenanceMode] =
        useState(false);

    const [
        showMaintenanceMessage,
        setShowMaintenanceMessage,
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
     * LOAD GENERAL SETTINGS
     * ========================================
     */

    const loadSettings = useCallback(async () => {
        setLoading(true);
        setError("");
        setNotice("");

        try {
            const response =
                await getGeneralSettings();

            const settings =
                response?.data;

            setPlatformName(
                settings?.platformName ??
                    "CpHub"
            );

            setPlatformDescription(
                settings?.platformDescription ??
                    "Smart DSA and Competitive Programming platform."
            );

            setMaintenanceMode(
                settings?.maintenanceMode ??
                    false
            );

            setShowMaintenanceMessage(
                settings?.showMaintenanceMessage ??
                    true
            );
        } catch (requestError) {
            setError(
                requestError?.response?.data
                    ?.message ||
                    "Could not load general settings."
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
     * SAVE GENERAL SETTINGS
     * ========================================
     */

    const saveSettings = async () => {
        setSaving(true);
        setError("");
        setNotice("");

        try {
            const response =
                await updateGeneralSettings({
                    platformName,
                    platformDescription,
                    maintenanceMode,
                    showMaintenanceMessage,
                });

            const settings =
                response?.data;

            setPlatformName(
                settings?.platformName ??
                    platformName
            );

            setPlatformDescription(
                settings?.platformDescription ??
                    platformDescription
            );

            setMaintenanceMode(
                settings?.maintenanceMode ??
                    maintenanceMode
            );

            setShowMaintenanceMessage(
                settings?.showMaintenanceMessage ??
                    showMaintenanceMessage
            );

            setNotice(
                "General settings saved."
            );
        } catch (requestError) {
            setError(
                requestError?.response?.data
                    ?.message ||
                    "Could not save general settings."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <SettingsPageLayout
            title="General"
            description="Platform identity, maintenance and general controls."
            icon={Globe2}
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

            <div className="space-y-4">

                {/* =====================================
                    PLATFORM
                ====================================== */}

                <section className="overflow-hidden rounded-2xl border border-[#1C2734] bg-[#080D14]">

                    <div className="border-b border-[#1C2734] px-5 py-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1C2734] bg-[#0B1119] text-[#4AFFC4]">
                                <Globe2 size={16} />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-[#DCE4ED]">
                                    Platform
                                </h2>

                                <p className="mt-0.5 text-xs text-[#667384]">
                                    Basic information displayed across CpHub.
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="space-y-5 p-5">

                        {/* Platform Name */}

                        <div>
                            <label
                                htmlFor="platform-name"
                                className="mb-2 block text-xs font-semibold text-[#AAB5C3]"
                            >
                                Platform Name
                            </label>

                            <input
                                id="platform-name"
                                type="text"
                                value={platformName}
                                disabled={
                                    loading ||
                                    saving
                                }
                                onChange={(event) =>
                                    setPlatformName(
                                        event.target.value
                                    )
                                }
                                className="h-10 w-full rounded-xl border border-[#1C2734] bg-[#0B1119] px-3 text-sm text-[#DCE4ED] outline-none transition placeholder:text-[#4A5665] focus:border-[#4AFFC4]/40 focus:ring-1 focus:ring-[#4AFFC4]/10 disabled:opacity-50"
                                placeholder="CpHub"
                            />
                        </div>

                        {/* Description */}

                        <div>
                            <label
                                htmlFor="platform-description"
                                className="mb-2 block text-xs font-semibold text-[#AAB5C3]"
                            >
                                Platform Description
                            </label>

                            <textarea
                                id="platform-description"
                                value={platformDescription}
                                disabled={
                                    loading ||
                                    saving
                                }
                                onChange={(event) =>
                                    setPlatformDescription(
                                        event.target.value
                                    )
                                }
                                rows={3}
                                className="w-full resize-none rounded-xl border border-[#1C2734] bg-[#0B1119] px-3 py-2.5 text-sm leading-6 text-[#DCE4ED] outline-none transition placeholder:text-[#4A5665] focus:border-[#4AFFC4]/40 focus:ring-1 focus:ring-[#4AFFC4]/10 disabled:opacity-50"
                                placeholder="Describe CpHub..."
                            />

                            <p className="mt-1.5 text-[10px] text-[#4A5665]">
                                Used as the platform's short description.
                            </p>
                        </div>

                    </div>
                </section>

                {/* =====================================
                    PLATFORM CONTROLS
                ====================================== */}

                <section className="overflow-hidden rounded-2xl border border-[#1C2734] bg-[#080D14]">

                    <div className="border-b border-[#1C2734] px-5 py-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1C2734] bg-[#0B1119] text-[#4AFFC4]">
                                <Settings2 size={16} />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-[#DCE4ED]">
                                    Platform Controls
                                </h2>

                                <p className="mt-0.5 text-xs text-[#667384]">
                                    Control the availability of the student-facing platform.
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="divide-y divide-[#1C2734]">

                        {/* Maintenance Mode */}

                        <div className="flex items-center justify-between gap-4 px-5 py-4">

                            <div>
                                <h3 className="text-sm font-semibold text-[#DCE4ED]">
                                    Maintenance Mode
                                </h3>

                                <p className="mt-1 max-w-xl text-xs leading-5 text-[#667384]">
                                    Temporarily disable the student-facing platform while administrators can continue working.
                                </p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={
                                    maintenanceMode
                                }
                                disabled={
                                    loading ||
                                    saving
                                }
                                onClick={() =>
                                    setMaintenanceMode(
                                        (current) =>
                                            !current
                                    )
                                }
                                className={`relative h-6 w-11 shrink-0 rounded-full transition disabled:opacity-50 ${
                                    maintenanceMode
                                        ? "bg-[#4AFFC4]"
                                        : "bg-[#26313E]"
                                }`}
                            >
                                <span
                                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                                        maintenanceMode
                                            ? "left-6"
                                            : "left-1"
                                    }`}
                                />
                            </button>

                        </div>

                        {/* Maintenance Message */}

                        <div className="flex items-center justify-between gap-4 px-5 py-4">

                            <div>
                                <h3 className="text-sm font-semibold text-[#DCE4ED]">
                                    Show Maintenance Message
                                </h3>

                                <p className="mt-1 max-w-xl text-xs leading-5 text-[#667384]">
                                    Display a maintenance message when maintenance mode is enabled.
                                </p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={
                                    showMaintenanceMessage
                                }
                                disabled={
                                    loading ||
                                    saving
                                }
                                onClick={() =>
                                    setShowMaintenanceMessage(
                                        (current) =>
                                            !current
                                    )
                                }
                                className={`relative h-6 w-11 shrink-0 rounded-full transition disabled:opacity-50 ${
                                    showMaintenanceMessage
                                        ? "bg-[#4AFFC4]"
                                        : "bg-[#26313E]"
                                }`}
                            >
                                <span
                                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                                        showMaintenanceMessage
                                            ? "left-6"
                                            : "left-1"
                                    }`}
                                />
                            </button>

                        </div>

                    </div>
                </section>

                {/* =====================================
                    SAVE
                ====================================== */}

                <div className="flex items-center justify-end gap-3 rounded-2xl border border-[#1C2734] bg-[#080D14] p-3">

                    <button
                        type="button"
                        disabled={
                            loading ||
                            saving
                        }
                        onClick={saveSettings}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#4AFFC4] px-4 py-2.5 text-sm font-bold text-[#06120D] transition hover:brightness-105 disabled:opacity-50"
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
                            : "Save Changes"}
                    </button>

                </div>

            </div>
        </SettingsPageLayout>
    );
};

export default AdminSettingsGeneral;