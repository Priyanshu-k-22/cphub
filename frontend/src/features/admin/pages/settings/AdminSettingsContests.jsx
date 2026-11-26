import React, { useCallback, useEffect, useState } from "react";
import { Activity, CalendarDays, Check, Code2, ExternalLink, RefreshCw, Save, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminFeedback from "../../components/AdminFeedback";
import SettingsPageLayout from "./SettingsPageLayout";
import { getContestSettings, updateContestSettings } from "../../api/adminSettings.api";

const defaults = {
    calendarEnabled: true,
    codeforcesSyncEnabled: true,
    sources: { codeforces: true, codechef: true, atcoder: true, leetcode: true },
};
const sources = [
    { key: "codeforces", name: "Codeforces", detail: "Upcoming contests and profile synchronization." },
    { key: "codechef", name: "CodeChef", detail: "Generated Starters and Monday Munch schedules." },
    { key: "atcoder", name: "AtCoder", detail: "Generated AtCoder Beginner Contest schedules." },
    { key: "leetcode", name: "LeetCode", detail: "Generated weekly and biweekly contest schedules." },
];

const normalize = (value = {}) => ({
    calendarEnabled: typeof value.calendarEnabled === "boolean" ? value.calendarEnabled : true,
    codeforcesSyncEnabled: typeof value.codeforcesSyncEnabled === "boolean" ? value.codeforcesSyncEnabled : true,
    sources: Object.fromEntries(Object.keys(defaults.sources).map((key) => [
        key,
        typeof value.sources?.[key] === "boolean" ? value.sources[key] : true,
    ])),
});

const AdminSettingsContests = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(defaults);
    const [saved, setSaved] = useState(defaults);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const dirty = settings.calendarEnabled !== saved.calendarEnabled
        || settings.codeforcesSyncEnabled !== saved.codeforcesSyncEnabled
        || sources.some(({ key }) => settings.sources[key] !== saved.sources[key]);

    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getContestSettings();
            const value = normalize(response?.data);
            setSettings(value);
            setSaved(value);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load contest settings.");
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
            const response = await updateContestSettings(settings);
            const value = normalize(response?.data);
            setSettings(value);
            setSaved(value);
            window.dispatchEvent(new CustomEvent("cphub-contestsettingschange", { detail: value }));
            setNotice("Contest and Codeforces settings saved.");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not save contest settings.");
        } finally {
            setSaving(false);
        }
    };

    const switchControl = (checked, label, onChange) => <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={loading || saving} onClick={onChange} className={`relative h-7 w-12 shrink-0 rounded-full transition disabled:cursor-wait disabled:opacity-50 ${checked ? "bg-[var(--theme-accent)]" : "bg-[var(--theme-surface-high)]"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${checked ? "left-6" : "left-1"}`} /></button>;

    return <SettingsPageLayout title="Contests & Codeforces" description="Choose which contest feeds students see and control Codeforces profile syncing." icon={Trophy}>
        {error && <AdminFeedback onDismiss={() => setError("")}>{error}<button type="button" onClick={load} className="ml-3 font-semibold underline">Retry</button></AdminFeedback>}
        {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}>{notice}</AdminFeedback>}

        <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
            <div className="flex items-center gap-3 border-b border-[var(--theme-border)] px-5 py-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500"><CalendarDays size={18} /></span><div><h2 className="text-base font-bold text-[var(--theme-text)]">Contest calendar</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Control the calendar, dashboard preview, and available contest sources.</p></div></div>
            <div className="flex items-center gap-4 px-4 py-4 sm:px-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Trophy size={18} /></span><div className="min-w-0 flex-1"><h3 className="text-sm font-bold text-[var(--theme-text)]">Show contests to students</h3><p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">When disabled, the calendar page and dashboard contest panel are hidden.</p></div>{switchControl(settings.calendarEnabled, "Show contests to students", () => setSettings((current) => ({ ...current, calendarEnabled: !current.calendarEnabled })))}</div>
            <div className={`border-t border-[var(--theme-border)] transition-opacity ${settings.calendarEnabled ? "" : "opacity-50"}`}>
                <div className="px-4 pb-2 pt-4 sm:px-5"><h3 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">Contest sources</h3></div>
                <div className="divide-y divide-[var(--theme-border)]">
                    {sources.map(({ key, name, detail }) => <div key={key} className="flex items-center gap-3 px-4 py-3 sm:px-5"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--theme-surface-raised)] text-[var(--theme-text-secondary)]"><Code2 size={16} /></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-[var(--theme-text)]">{name}</p><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">{detail}</p></div>{switchControl(settings.sources[key], `Enable ${name} contests`, () => setSettings((current) => ({ ...current, sources: { ...current.sources, [key]: !current.sources[key] } })))}</div>)}
                </div>
            </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
            <div className="flex items-center gap-3 border-b border-[var(--theme-border)] px-5 py-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"><Activity size={18} /></span><div><h2 className="text-base font-bold text-[var(--theme-text)]">Codeforces profile sync</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Sync reads each user’s public Codeforces profile and saves its latest rating and solved-problem data.</p></div></div>
            <div className="flex items-center gap-4 px-4 py-4 sm:px-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"><RefreshCw size={17} /></span><div className="min-w-0 flex-1"><h3 className="text-sm font-bold text-[var(--theme-text)]">Allow Codeforces syncing</h3><p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">Disabling blocks student refresh and prevents starting an admin sync for all users. Saved profile data stays visible.</p></div>{switchControl(settings.codeforcesSyncEnabled, "Allow Codeforces syncing", () => setSettings((current) => ({ ...current, codeforcesSyncEnabled: !current.codeforcesSyncEnabled })))}</div>
            <div className="border-t border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-4 py-3 sm:px-5"><button type="button" onClick={() => navigate("/admin/users")} className="inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-[var(--theme-accent)] hover:underline">Manage users and bulk sync <ExternalLink size={13} /></button></div>
        </section>

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"><p className="text-xs text-[var(--theme-text-muted)]">Changes take effect for new contest requests and sync actions immediately.</p><div className="flex justify-end gap-2"><button type="button" disabled={loading || saving || !dirty} onClick={() => setSettings(saved)} className="min-h-10 rounded-xl border border-[var(--theme-border)] px-4 text-sm font-semibold text-[var(--theme-text-secondary)] disabled:opacity-40">Discard</button><button type="button" disabled={loading || saving || !dirty} onClick={save} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-lime-300 px-4 text-sm font-bold text-emerald-950 disabled:opacity-50">{saving ? <RefreshCw size={15} className="animate-spin" /> : notice && !dirty ? <Check size={15} /> : <Save size={15} />}{saving ? "Saving…" : "Save changes"}</button></div></div>
    </SettingsPageLayout>;
};

export default AdminSettingsContests;
