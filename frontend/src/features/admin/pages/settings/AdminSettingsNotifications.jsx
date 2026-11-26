import React, { useCallback, useEffect, useState } from "react";
import { Bell, Check, Info, Megaphone, RefreshCw, Save, TriangleAlert } from "lucide-react";
import AdminFeedback from "../../components/AdminFeedback";
import SettingsPageLayout from "./SettingsPageLayout";
import { getNotificationSettings, updateNotificationSettings } from "../../api/adminSettings.api";

const defaults = { announcementEnabled: false, announcementMessage: "", announcementType: "info" };
const tones = {
    info: { label: "Information", icon: Info, preview: "border-sky-500/25 bg-sky-500/10 text-sky-800 dark:text-sky-200" },
    success: { label: "Success", icon: Check, preview: "border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200" },
    warning: { label: "Important", icon: TriangleAlert, preview: "border-amber-500/25 bg-amber-500/10 text-amber-800 dark:text-amber-200" },
};
const normalize = (value = {}) => ({
    announcementEnabled: typeof value.announcementEnabled === "boolean" ? value.announcementEnabled : false,
    announcementMessage: typeof value.announcementMessage === "string" ? value.announcementMessage : "",
    announcementType: Object.hasOwn(tones, value.announcementType) ? value.announcementType : "info",
});

const AdminSettingsNotifications = () => {
    const [settings, setSettings] = useState(defaults);
    const [saved, setSaved] = useState(defaults);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const dirty = settings.announcementEnabled !== saved.announcementEnabled
        || settings.announcementMessage !== saved.announcementMessage
        || settings.announcementType !== saved.announcementType;

    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getNotificationSettings();
            const value = normalize(response?.data);
            setSettings(value);
            setSaved(value);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load notification settings.");
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
            const response = await updateNotificationSettings(settings);
            const value = normalize(response?.data);
            setSettings(value);
            setSaved(value);
            window.dispatchEvent(new CustomEvent("cphub-notificationschange", { detail: value }));
            setNotice(value.announcementEnabled ? "Announcement published." : "Notification settings saved.");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not save notification settings.");
        } finally {
            setSaving(false);
        }
    };

    const { icon: ToneIcon, preview: previewClass } = tones[settings.announcementType];
    const switchButton = <button type="button" role="switch" aria-checked={settings.announcementEnabled} aria-label="Publish announcement" disabled={loading || saving} onClick={() => setSettings((current) => ({ ...current, announcementEnabled: !current.announcementEnabled }))} className={`relative h-7 w-12 shrink-0 rounded-full transition disabled:opacity-50 ${settings.announcementEnabled ? "bg-[var(--theme-accent)]" : "bg-[var(--theme-surface-high)]"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${settings.announcementEnabled ? "left-6" : "left-1"}`} /></button>;

    return <SettingsPageLayout title="Notifications" description="Publish a short platform-wide announcement students can see across CpHub." icon={Bell}>
        {error && <AdminFeedback onDismiss={() => setError("")}>{error}<button type="button" onClick={load} className="ml-3 font-semibold underline">Retry</button></AdminFeedback>}
        {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}>{notice}</AdminFeedback>}

        <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
            <div className="flex items-center gap-3 border-b border-[var(--theme-border)] px-5 py-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"><Megaphone size={18} /></span><div><h2 className="text-base font-bold text-[var(--theme-text)]">Student announcement</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">One concise notice displayed above the main navigation.</p></div></div>
            <div className="flex items-center gap-4 px-4 py-4 sm:px-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Bell size={18} /></span><div className="min-w-0 flex-1"><h3 className="text-sm font-bold text-[var(--theme-text)]">Publish announcement</h3><p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">Students will see this on public and signed-in pages. Admin pages stay clear.</p></div><div className="flex flex-col items-end gap-1"><span className={`text-[10px] font-bold uppercase tracking-wide ${settings.announcementEnabled ? "text-emerald-600 dark:text-emerald-300" : "text-[var(--theme-text-muted)]"}`}>{settings.announcementEnabled ? "Published" : "Hidden"}</span>{switchButton}</div></div>
            <div className="space-y-4 border-t border-[var(--theme-border)] px-4 py-4 sm:px-5">
                <label className="block"><span className="mb-1.5 block text-xs font-bold text-[var(--theme-text-secondary)]">Announcement text</span><textarea value={settings.announcementMessage} onChange={(event) => setSettings((current) => ({ ...current, announcementMessage: event.target.value.slice(0, 240) }))} maxLength={240} rows={3} disabled={loading || saving} placeholder="Share a maintenance notice, upcoming event, or important update…" className="w-full resize-y rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3.5 py-3 text-sm leading-6 text-[var(--theme-text)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)] disabled:opacity-60"/><span className="mt-1 block text-right text-[11px] text-[var(--theme-text-muted)]">{settings.announcementMessage.length}/240</span></label>
                <label className="block max-w-sm"><span className="mb-1.5 block text-xs font-bold text-[var(--theme-text-secondary)]">Style</span><select value={settings.announcementType} onChange={(event) => setSettings((current) => ({ ...current, announcementType: event.target.value }))} disabled={loading || saving} className="min-h-11 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 text-sm text-[var(--theme-text)] outline-none focus:border-[var(--theme-accent)] disabled:opacity-60">{Object.entries(tones).map(([value, tone]) => <option key={value} value={value}>{tone.label}</option>)}</select></label>
                <div><p className="mb-1.5 text-xs font-bold text-[var(--theme-text-secondary)]">Preview</p><div className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${previewClass}`}><ToneIcon size={17} className="mt-0.5 shrink-0"/><p className="text-sm leading-6">{settings.announcementMessage.trim() || "Your announcement will appear here."}</p></div></div>
            </div>
        </section>

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"><p className="text-xs text-[var(--theme-text-muted)]">Turning publishing off hides the notice but keeps its text for later.</p><div className="flex justify-end gap-2"><button type="button" disabled={loading || saving || !dirty} onClick={() => setSettings(saved)} className="min-h-10 rounded-xl border border-[var(--theme-border)] px-4 text-sm font-semibold text-[var(--theme-text-secondary)] disabled:opacity-40">Discard</button><button type="button" disabled={loading || saving || !dirty || (settings.announcementEnabled && !settings.announcementMessage.trim())} onClick={save} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-lime-300 px-4 text-sm font-bold text-emerald-950 disabled:opacity-50">{saving ? <RefreshCw size={15} className="animate-spin" /> : notice && !dirty ? <Check size={15} /> : <Save size={15} />}{saving ? "Saving…" : settings.announcementEnabled ? "Publish changes" : "Save changes"}</button></div></div>
    </SettingsPageLayout>;
};

export default AdminSettingsNotifications;
