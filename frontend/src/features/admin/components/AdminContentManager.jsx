import React, { useCallback, useEffect, useState } from "react";
import { ExternalLink, Pencil, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import AdminLayout from "./AdminLayout";
import AdminPageHeader from "./AdminPageHeader";
import AdminSearch from "./AdminSearch";
import AdminFeedback from "./AdminFeedback";
import ConfirmDialog from "./ConfirmDialog";
import { createAdminContent, deleteAdminContent, getAdminContent, updateAdminContent } from "../api/adminContent.api";

const blank = { title: "", category: "", description: "", url: "", author: "", difficulty: "", status: "published" };
const fieldClass = "mt-2 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3.5 py-3 text-sm text-[var(--theme-text)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]/50 focus:ring-2 focus:ring-[var(--theme-accent)]/10";

const AdminContentManager = ({ kind, title, description, categoryLabel = "Category", categoryOptions = [], showAuthor = false, showDifficulty = false, statusLabel = "Status" }) => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState(blank);
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
            const response = await getAdminContent(kind);
            setItems(Array.isArray(response?.data) ? response.data : []);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load this content.");
        } finally {
            setLoading(false);
        }
    }, [kind]);

    useEffect(() => { load(); }, [load]);

    const openCreate = () => {
        setEditingId("");
        setForm(blank);
        setFormOpen(true);
        setError("");
    };

    const openEdit = (item) => {
        setEditingId(item._id);
        setForm({ ...blank, ...item });
        setFormOpen(true);
        setError("");
    };

    const save = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        setNotice("");
        const payload = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
        try {
            if (editingId) await updateAdminContent(kind, editingId, payload);
            else await createAdminContent(kind, payload);
            setFormOpen(false);
            setNotice(editingId ? "Content updated." : "Content created.");
            await load();
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not save this item.");
        } finally {
            setSaving(false);
        }
    };

    const remove = async (item) => {
        setError("");
        setNotice("");
        setDeleting(true);
        try {
            await deleteAdminContent(kind, item._id);
            setItems((current) => current.filter((entry) => entry._id !== item._id));
            setNotice("Content deleted.");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not delete this item.");
        } finally {
            setDeleting(false);
            setPendingDelete(null);
        }
    };

    const visibleItems = items.filter((item) => `${item.title} ${item.category} ${item.description} ${item.author}`.toLowerCase().includes(search.toLowerCase()));
    const change = (key, value) => setForm((current) => ({ ...current, [key]: value }));

    return <AdminLayout>
        <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
            <AdminPageHeader title={title} description={description} action={openCreate} actionLabel="Add item" />
            {error && <AdminFeedback onDismiss={() => setError("")}>{error}</AdminFeedback>}
            {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}>{notice}</AdminFeedback>}

            {formOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-3 py-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) setFormOpen(false); }}>
                <form onSubmit={save} className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-2xl">
                    <div className="flex shrink-0 items-center justify-between border-b border-[var(--theme-border)] px-5 py-4 sm:px-7"><div><h2 className="text-lg font-bold text-[var(--theme-text)]">{editingId ? `Edit ${title}` : `Add to ${title}`}</h2><p className="mt-1 text-sm text-[var(--theme-text-muted)]">Keep this resource clear and useful for students.</p></div><button type="button" disabled={saving} onClick={() => setFormOpen(false)} aria-label="Close editor" className="rounded-xl p-2 text-[var(--theme-text-muted)] transition hover:bg-[var(--theme-surface-high)] disabled:opacity-50"><X size={17} /></button></div>
                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-7"><section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5"><div className="grid gap-4 sm:grid-cols-2">
                        <label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Title *<input required maxLength={160} value={form.title} onChange={(event) => change("title", event.target.value)} className={fieldClass} placeholder="Resource title" /></label>
                        <label className="text-sm font-semibold text-[var(--theme-text-secondary)]">{categoryLabel}{categoryOptions.length ? <select value={form.category} onChange={(event) => change("category", event.target.value)} className={fieldClass}><option value="">Select…</option>{categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input maxLength={80} value={form.category} onChange={(event) => change("category", event.target.value)} className={fieldClass} />}</label>
                        {showAuthor && <label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Author<input maxLength={100} value={form.author} onChange={(event) => change("author", event.target.value)} className={fieldClass} /></label>}
                        {showDifficulty && <label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Difficulty<input maxLength={40} value={form.difficulty} onChange={(event) => change("difficulty", event.target.value)} className={fieldClass} /></label>}
                        <label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Link<input type="url" maxLength={500} value={form.url} onChange={(event) => change("url", event.target.value)} placeholder="https://" className={fieldClass} /></label>
                        <label className="text-sm font-semibold text-[var(--theme-text-secondary)]">{statusLabel}<select value={form.status} onChange={(event) => change("status", event.target.value)} className={fieldClass}><option value="published">Published</option><option value="draft">Draft</option></select></label>
                        <label className="text-sm font-semibold text-[var(--theme-text-secondary)] sm:col-span-2">Description<textarea maxLength={4000} rows={4} value={form.description} onChange={(event) => change("description", event.target.value)} className={`${fieldClass} resize-y`} placeholder="Add helpful context for students" /></label>
                    </div></section>{error && <AdminFeedback className="mb-0" onDismiss={() => setError("")}>{error}</AdminFeedback>}</div>
                    <div className="flex shrink-0 justify-end gap-2 border-t border-[var(--theme-border)] bg-[var(--theme-surface)] px-5 py-3 sm:px-7"><button type="button" disabled={saving} onClick={() => setFormOpen(false)} className="min-h-10 rounded-xl border border-[var(--theme-border)] px-4 text-sm font-semibold text-[var(--theme-text-secondary)] transition hover:bg-[var(--theme-surface-high)]">Cancel</button><button type="submit" disabled={saving} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-5 text-sm font-bold text-emerald-950 shadow-md shadow-emerald-500/15 disabled:opacity-50">{saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}{saving ? "Saving…" : editingId ? "Save changes" : "Add item"}</button></div>
                </form>
            </div>}

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="w-full max-w-sm"><AdminSearch value={search} onChange={setSearch} placeholder={`Search ${title.toLowerCase()}…`} /></div><div className="flex items-center gap-2"><span className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 text-xs font-semibold text-[var(--theme-text-secondary)]">{visibleItems.length} {visibleItems.length === 1 ? "item" : "items"}</span><button type="button" onClick={load} disabled={loading} aria-label="Refresh content" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-accent)]/30 hover:text-[var(--theme-accent)] disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /></button></div></div>
            <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
                {loading ? <p className="p-10 text-center text-sm text-[var(--theme-text-muted)]">Loading items…</p> : visibleItems.length ? visibleItems.map((item) => <article key={item._id} className="group flex flex-wrap items-center gap-3 border-b border-[var(--theme-border)] px-4 py-3.5 last:border-0 transition-colors hover:bg-[var(--theme-hover)] sm:px-5">
                    <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] sm:flex"><ExternalLink size={16} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-[var(--theme-text)]">{item.title}</h3><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${item.status === "published" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300" : "bg-[var(--theme-surface-high)] text-[var(--theme-text-secondary)]"}`}>{item.status}</span></div><p className="mt-1 text-xs text-[var(--theme-text-muted)]">{[item.category, item.difficulty, item.author].filter(Boolean).join(" · ") || "Uncategorized"}</p>{item.description && <p className="mt-1.5 line-clamp-1 text-sm text-[var(--theme-text-secondary)]">{item.description}</p>}</div>
                    <div className="flex shrink-0 items-center gap-1"><button type="button" onClick={() => openEdit(item)} aria-label={`Edit ${item.title}`} title="Edit" className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--theme-text-muted)] transition hover:bg-[var(--theme-accent-soft)] hover:text-[var(--theme-accent)]"><Pencil size={15} /></button><button type="button" onClick={() => setPendingDelete(item)} aria-label={`Delete ${item.title}`} title="Delete" className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--theme-text-muted)] transition hover:bg-rose-500/10 hover:text-rose-500"><Trash2 size={15} /></button>{item.url && <a href={item.url} target="_blank" rel="noreferrer" aria-label={`Open ${item.title}`} title="Open" className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--theme-text-muted)] transition hover:bg-[var(--theme-surface-high)] hover:text-[var(--theme-accent)]"><ExternalLink size={15} /></a>}</div>
                </article>) : <div className="p-12 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-surface-raised)] text-[var(--theme-text-muted)]"><Plus size={20} /></span><p className="mt-4 text-sm font-bold text-[var(--theme-text)]">{error ? "Content could not be loaded" : search ? "No matching items" : "No items added yet"}</p><p className="mt-1 text-xs text-[var(--theme-text-muted)]">{error ? "Check the connection and retry." : search ? "Try another search phrase." : "Add an item to get this collection started."}</p>{error ? <button type="button" onClick={load} className="mt-4 rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm font-semibold text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)]">Retry</button> : <button type="button" onClick={openCreate} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-lime-300 px-4 text-sm font-bold text-emerald-950"><Plus size={15} />Add item</button>}</div>}
            </section>
            <ConfirmDialog isOpen={Boolean(pendingDelete)} title="Delete this item?" description={pendingDelete ? `Delete “${pendingDelete.title}”? This action cannot be undone.` : "This action cannot be undone."} loading={deleting} onClose={() => !deleting && setPendingDelete(null)} onConfirm={() => pendingDelete && remove(pendingDelete)} />
        </div>
    </AdminLayout>;
};

export default AdminContentManager;
