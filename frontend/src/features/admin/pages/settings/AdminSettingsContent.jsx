import React, { useCallback, useEffect, useState } from "react";
import { BookOpen, CalendarDays, Check, Code2, Layers3, RefreshCw, Save } from "lucide-react";
import SettingsPageLayout from "./SettingsPageLayout";
import AdminFeedback from "../../components/AdminFeedback";
import { getContentAvailability, updateContentAvailability } from "../../api/adminSettings.api";

const defaults = { dailyProblems: true, cpSheet: true, dsaSheet: true, learningResources: true };
const modules = [
    { key: "dailyProblems", title: "Daily Problems", description: "Daily challenge pages, history, and completion tracking.", icon: CalendarDays },
    { key: "cpSheet", title: "CP Sheet", description: "Rating-wise Codeforces practice and saved progress.", icon: Code2 },
    { key: "dsaSheet", title: "DSA Sheet", description: "Topic-based DSA practice, problem tracking, and curated sheet resources.", icon: BookOpen },
    { key: "learningResources", title: "Learning Resources", description: "The student-facing resource library and its categories.", icon: Layers3 },
];

const normalize = (value = {}) => Object.fromEntries(
    Object.keys(defaults).map((key) => [key, typeof value[key] === "boolean" ? value[key] : defaults[key]])
);

const AdminSettingsContent = () => {
    const [availability, setAvailability] = useState(defaults);
    const [saved, setSaved] = useState(defaults);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const dirty = Object.keys(defaults).some((key) => availability[key] !== saved[key]);

    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getContentAvailability();
            const value = normalize(response?.data);
            setAvailability(value);
            setSaved(value);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load content availability settings.");
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
            const response = await updateContentAvailability(availability);
            const value = normalize(response?.data);
            setAvailability(value);
            setSaved(value);
            window.dispatchEvent(new CustomEvent("cphub-contentavailabilitychange", { detail: value }));
            setNotice("Content availability saved.");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not save content availability settings.");
        } finally {
            setSaving(false);
        }
    };

    return <SettingsPageLayout title="Content availability" description="Choose which learning modules students can access." icon={Layers3}>
        {error && <AdminFeedback onDismiss={() => setError("")}>{error}<button type="button" onClick={load} className="ml-3 font-semibold underline">Retry</button></AdminFeedback>}
        {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}>{notice}</AdminFeedback>}
        <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
            <div className="flex items-center gap-3 border-b border-[var(--theme-border)] px-5 py-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Layers3 size={18} /></span><div><h2 className="text-base font-bold text-[var(--theme-text)]">Student modules</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Disabled modules disappear from student navigation and their direct pages are gated.</p></div></div>
            <div className="divide-y divide-[var(--theme-border)]">
                {modules.map(({ key, title, description, icon: Icon }) => {
                    const enabled = availability[key];
                    return <div key={key} className="flex items-center gap-3 px-4 py-4 transition-colors hover:bg-[var(--theme-hover)] sm:gap-4 sm:px-5">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${enabled ? "bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]" : "bg-[var(--theme-surface-high)] text-[var(--theme-text-muted)]"}`}><Icon size={18} /></span>
                        <div className="min-w-0 flex-1"><h3 className="text-sm font-bold text-[var(--theme-text)]">{title}</h3><p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">{description}</p></div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5"><span className={`text-[10px] font-bold uppercase tracking-wide ${enabled ? "text-emerald-600 dark:text-emerald-300" : "text-[var(--theme-text-muted)]"}`}>{enabled ? "Available" : "Hidden"}</span><button type="button" role="switch" aria-checked={enabled} aria-label={`${enabled ? "Disable" : "Enable"} ${title}`} disabled={loading || saving} onClick={() => setAvailability((current) => ({ ...current, [key]: !current[key] }))} className={`relative h-7 w-12 rounded-full transition disabled:cursor-wait disabled:opacity-50 ${enabled ? "bg-[var(--theme-accent)]" : "bg-[var(--theme-surface-high)]"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${enabled ? "left-6" : "left-1"}`} /></button></div>
                    </div>;
                })}
            </div>
            <div className="flex flex-col gap-3 border-t border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"><p className="text-xs text-[var(--theme-text-muted)]">Admins keep access to the admin management pages for these modules.</p><div className="flex justify-end gap-2"><button type="button" disabled={loading || saving || !dirty} onClick={() => setAvailability(saved)} className="min-h-10 rounded-xl border border-[var(--theme-border)] px-4 text-sm font-semibold text-[var(--theme-text-secondary)] disabled:opacity-40">Discard</button><button type="button" disabled={loading || saving || !dirty} onClick={save} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-lime-300 px-4 text-sm font-bold text-emerald-950 disabled:opacity-50">{saving ? <RefreshCw size={15} className="animate-spin" /> : notice && !dirty ? <Check size={15} /> : <Save size={15} />}{saving ? "Saving…" : "Save changes"}</button></div></div>
        </section>
    </SettingsPageLayout>;
};

export default AdminSettingsContent;
