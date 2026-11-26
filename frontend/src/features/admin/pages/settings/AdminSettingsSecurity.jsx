import React, { useCallback, useEffect, useState } from "react";
import { Check, Clock3, RefreshCw, Save, Shield, ShieldCheck } from "lucide-react";
import AdminFeedback from "../../components/AdminFeedback";
import SettingsPageLayout from "./SettingsPageLayout";
import { getSecuritySettings, updateSecuritySettings } from "../../api/adminSettings.api";

const defaults = { studentSessionHours: 168, adminSessionHours: 24 };
const studentDurations = [1, 6, 12, 24, 72, 168];
const adminDurations = [1, 6, 12, 24];
const formatDuration = (hours) => hours < 24 ? `${hours} hour${hours === 1 ? "" : "s"}` : `${hours / 24} day${hours === 24 ? "" : "s"}`;
const normalize = (value = {}) => ({
    studentSessionHours: studentDurations.includes(value.studentSessionHours) ? value.studentSessionHours : defaults.studentSessionHours,
    adminSessionHours: adminDurations.includes(value.adminSessionHours) ? value.adminSessionHours : defaults.adminSessionHours,
});

const AdminSettingsSecurity = () => {
    const [settings, setSettings] = useState(defaults);
    const [saved, setSaved] = useState(defaults);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const dirty = settings.studentSessionHours !== saved.studentSessionHours || settings.adminSessionHours !== saved.adminSessionHours;

    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getSecuritySettings();
            const value = normalize(response?.data);
            setSettings(value);
            setSaved(value);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load security settings.");
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => { load(); }, [load]);

    const save = async () => {
        setSaving(true);
        setError("");
        setNotice("");
        try {
            const response = await updateSecuritySettings(settings);
            const value = normalize(response?.data);
            setSettings(value);
            setSaved(value);
            setNotice("Session policy saved. It applies to future logins.");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not save security settings.");
        } finally {
            setSaving(false);
        }
    };

    const durationField = ({ key, title, description, icon: Icon, options }) => <label key={key} className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Icon size={18}/></span><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-[var(--theme-text)]">{title}</span><span className="mt-1 block text-xs leading-5 text-[var(--theme-text-muted)]">{description}</span></span><select value={settings[key]} onChange={(event) => setSettings((current) => ({ ...current, [key]: Number(event.target.value) }))} disabled={loading || saving} aria-label={title} className="min-h-11 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 text-sm font-semibold text-[var(--theme-text)] outline-none focus:border-[var(--theme-accent)] disabled:opacity-60 sm:w-44">{options.map((hours) => <option key={hours} value={hours}>{formatDuration(hours)}</option>)}</select></label>;

    return <SettingsPageLayout title="Security & Admin" description="Set how long student and administrator sign-in sessions remain valid." icon={ShieldCheck}>
        {error && <AdminFeedback onDismiss={() => setError("")}>{error}<button type="button" onClick={load} className="ml-3 font-semibold underline">Retry</button></AdminFeedback>}
        {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}>{notice}</AdminFeedback>}

        <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
            <div className="flex items-center gap-3 border-b border-[var(--theme-border)] px-5 py-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500"><ShieldCheck size={18}/></span><div><h2 className="text-base font-bold text-[var(--theme-text)]">Session policy</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Authentication uses signed, HTTP-only session cookies.</p></div></div>
            <div className="divide-y divide-[var(--theme-border)]">
                {durationField({ key: "studentSessionHours", title: "Student session duration", description: "How long a student stays signed in before logging in again.", icon: Clock3, options: studentDurations })}
                {durationField({ key: "adminSessionHours", title: "Admin session duration", description: "Keep administrator sessions shorter; the maximum is one day.", icon: Shield, options: adminDurations })}
            </div>
            <div className="flex items-start gap-3 border-t border-violet-500/15 bg-violet-500/5 px-4 py-3 sm:px-5"><Clock3 size={15} className="mt-0.5 shrink-0 text-violet-500"/><p className="text-xs leading-5 text-[var(--theme-text-secondary)]">Policy changes apply the next time each account signs in. Existing sessions keep their current token expiry and are not revoked.</p></div>
        </section>

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"><p className="text-xs text-[var(--theme-text-muted)]">Admin sessions are capped at 24 hours for security.</p><div className="flex justify-end gap-2"><button type="button" disabled={loading || saving || !dirty} onClick={() => setSettings(saved)} className="min-h-10 rounded-xl border border-[var(--theme-border)] px-4 text-sm font-semibold text-[var(--theme-text-secondary)] disabled:opacity-40">Discard</button><button type="button" disabled={loading || saving || !dirty} onClick={save} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-lime-300 px-4 text-sm font-bold text-emerald-950 disabled:opacity-50">{saving ? <RefreshCw size={15} className="animate-spin" /> : notice && !dirty ? <Check size={15} /> : <Save size={15} />}{saving ? "Saving…" : "Save session policy"}</button></div></div>
    </SettingsPageLayout>;
};

export default AdminSettingsSecurity;
