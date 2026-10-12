import React, { useCallback, useEffect, useState } from "react";
import { BookOpen, ExternalLink, Pencil, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import AdminPageHeader from "../../components/AdminPageHeader";
import AdminSearch from "../../components/AdminSearch";
import AdminFeedback from "../../components/AdminFeedback";
import ConfirmDialog from "../../components/ConfirmDialog";
import { createDSASheet, deleteDSASheet, getDSASheets, updateDSASheet } from "../../../dsa/api/dsaSheet.api";

const emptyForm = { title: "", description: "", source: "", url: "", order: 0 };
const fieldClass = "mt-2 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3.5 py-3 text-sm text-[var(--theme-text)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]/50 focus:ring-2 focus:ring-[var(--theme-accent)]/10";

export default function DSASheetAdmin() {
    const [sheets, setSheets] = useState([]);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [pendingDelete, setPendingDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getDSASheets();
            setSheets(Array.isArray(response?.data) ? response.data : []);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load DSA sheets.");
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => { load(); }, [load]);

    const openCreate = () => { setEditingId(""); setForm(emptyForm); setError(""); setFormOpen(true); };
    const openEdit = (sheet) => {
        setEditingId(sheet._id);
        setForm({ title: sheet.title || "", description: sheet.description || "", source: sheet.source || "", url: sheet.url || "", order: sheet.order ?? 0 });
        setError("");
        setFormOpen(true);
    };
    const change = (key, value) => setForm((current) => ({ ...current, [key]: value }));
    const save = async (event) => {
        event.preventDefault();
        setSaving(true); setError(""); setNotice("");
        try {
            const payload = { ...form, title: form.title.trim(), description: form.description.trim(), source: form.source.trim(), url: form.url.trim(), order: Number(form.order) };
            if (editingId) await updateDSASheet(editingId, payload);
            else await createDSASheet(payload);
            setFormOpen(false); setNotice(editingId ? "DSA sheet updated." : "DSA sheet created.");
            await load();
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not save this DSA sheet.");
        } finally { setSaving(false); }
    };
    const remove = async (sheet) => {
        setError(""); setNotice("");
        setDeleting(true);
        try {
            await deleteDSASheet(sheet._id);
            setSheets((current) => current.filter((item) => item._id !== sheet._id));
            setNotice("DSA sheet deleted.");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not delete this DSA sheet.");
        } finally {
            setDeleting(false);
            setPendingDelete(null);
        }
    };
    const visibleSheets = sheets.filter((sheet) => `${sheet.title} ${sheet.source} ${sheet.description}`.toLowerCase().includes(search.toLowerCase()));

    return <AdminLayout><div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        <AdminPageHeader title="DSA Sheet" description="Manage the DSA sheet resources shown to students." action={openCreate} actionLabel="Add Sheet" />
        {error && <AdminFeedback onDismiss={() => setError("")}>{error}</AdminFeedback>}
        {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}>{notice}</AdminFeedback>}
        {formOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-3 py-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) setFormOpen(false); }}><form onSubmit={save} className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--theme-border)] px-5 py-4 sm:px-7"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500"><BookOpen size={20} /></span><div><h2 className="text-lg font-bold text-[var(--theme-text)]">{editingId ? "Edit DSA resource" : "Add DSA resource"}</h2><p className="mt-1 text-sm text-[var(--theme-text-muted)]">Publish a curated sheet for students to follow.</p></div></div><button type="button" disabled={saving} onClick={() => setFormOpen(false)} aria-label="Close form" className="rounded-xl p-2 text-[var(--theme-text-muted)] hover:bg-[var(--theme-surface-high)] disabled:opacity-50"><X size={17} /></button></div>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-7">{error && <AdminFeedback className="mb-0" onDismiss={() => setError("")}>{error}</AdminFeedback>}<section className="rounded-2xl border border-[var(--theme-border)] p-4 sm:p-5"><div className="mb-4"><h3 className="text-sm font-bold text-[var(--theme-text)]">Resource details</h3><p className="mt-1 text-xs text-[var(--theme-text-muted)]">Add the title, source, destination, and optional notes.</p></div><div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Title *<input required maxLength={160} value={form.title} onChange={(event) => change("title", event.target.value)} className={fieldClass} placeholder="DSA practice sheet" /></label>
                <label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Source *<input required maxLength={100} value={form.source} onChange={(event) => change("source", event.target.value)} placeholder="e.g. Striver" className={fieldClass} /></label>
                <label className="text-sm font-semibold text-[var(--theme-text-secondary)] sm:col-span-2">Sheet URL *<input required type="url" maxLength={500} value={form.url} onChange={(event) => change("url", event.target.value)} placeholder="https://" className={fieldClass} /></label>
                <label className="text-sm font-semibold text-[var(--theme-text-secondary)] sm:col-span-2">Description<textarea maxLength={2000} rows={3} value={form.description} onChange={(event) => change("description", event.target.value)} className={`${fieldClass} resize-y`} placeholder="A short description of the resource" /></label>
                <label className="text-sm font-semibold text-[var(--theme-text-secondary)] sm:col-span-2">Display order<input required type="number" min="0" step="1" value={form.order} onChange={(event) => change("order", event.target.value)} className={fieldClass} /></label>
            </div></section></div>
            <div className="flex shrink-0 justify-end gap-2 border-t border-[var(--theme-border)] px-5 py-3 sm:px-7"><button type="button" disabled={saving} onClick={() => setFormOpen(false)} className="min-h-10 rounded-xl border border-[var(--theme-border)] px-4 text-sm font-semibold text-[var(--theme-text-secondary)]">Cancel</button><button type="submit" disabled={saving} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-lime-300 px-5 text-sm font-bold text-emerald-950 disabled:opacity-50">{saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}{saving ? "Saving…" : editingId ? "Save changes" : "Add resource"}</button></div>
        </form></div>}
        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500"><BookOpen size={18} /></span><div><p className="text-sm font-bold text-[var(--theme-text)]">Resource library</p><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">{visibleSheets.length} {visibleSheets.length === 1 ? "sheet" : "sheets"}</p></div></div><div className="flex gap-2"><div className="w-full sm:w-72"><AdminSearch value={search} onChange={setSearch} placeholder="Search DSA sheets…" /></div><button type="button" onClick={load} disabled={loading} aria-label="Refresh DSA sheets" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /></button></div></div>
        <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
            {loading ? <p className="p-10 text-center text-sm text-[var(--theme-text-muted)]">Loading DSA sheets…</p> : visibleSheets.length ? visibleSheets.map((sheet) => <article key={sheet._id} className="group flex flex-wrap items-center gap-3 border-b border-[var(--theme-border)] px-4 py-3.5 last:border-0 transition-colors hover:bg-[var(--theme-hover)] sm:px-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500"><BookOpen size={17} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-[var(--theme-text)]">{sheet.title}</h3><span className="rounded-full bg-[var(--theme-accent-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--theme-accent)]">{sheet.source}</span></div><p className="mt-1 text-xs text-[var(--theme-text-muted)]">Order {sheet.order ?? 0}{sheet.description ? ` · ${sheet.description}` : ""}</p></div>
                <div className="flex shrink-0 items-center gap-1"><button type="button" onClick={() => openEdit(sheet)} aria-label={`Edit ${sheet.title}`} title="Edit" className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--theme-text-muted)] hover:bg-[var(--theme-accent-soft)] hover:text-[var(--theme-accent)]"><Pencil size={15} /></button><button type="button" onClick={() => setPendingDelete(sheet)} aria-label={`Delete ${sheet.title}`} title="Delete" className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--theme-text-muted)] hover:bg-red-500/10 hover:text-red-400"><Trash2 size={15} /></button><a href={sheet.url} target="_blank" rel="noreferrer" aria-label={`Open ${sheet.title}`} title="Open resource" className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--theme-text-muted)] hover:bg-[var(--theme-surface-high)] hover:text-[var(--theme-accent)]"><ExternalLink size={15} /></a></div>
            </article>) : <div className="p-12 text-center"><p className="text-sm font-medium text-[var(--theme-text)]">{error ? "DSA sheets could not be loaded" : search ? "No matching sheets" : "No DSA sheets yet"}</p><p className="mt-1 text-xs text-[var(--theme-text-muted)]">{error ? "Check the connection and retry." : search ? "Try another search phrase." : "Add a sheet to publish it on the student page."}</p>{error ? <button type="button" onClick={load} className="mt-4 rounded-lg border border-[var(--theme-border)] px-4 py-2 text-sm text-[var(--theme-text-secondary)]">Retry</button> : <button type="button" onClick={openCreate} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--theme-accent)] px-4 py-2 text-sm font-semibold text-[#06120D]"><Plus size={15} />Add sheet</button>}</div>}
        </section>
        <ConfirmDialog isOpen={Boolean(pendingDelete)} title="Delete DSA sheet?" description={pendingDelete ? `Delete “${pendingDelete.title}”? Students will no longer see this resource.` : "This action cannot be undone."} loading={deleting} onClose={() => !deleting && setPendingDelete(null)} onConfirm={() => pendingDelete && remove(pendingDelete)} />
    </div></AdminLayout>;
}
