import React, { useCallback, useEffect, useState } from "react";
import { ExternalLink, Pencil, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import AdminLayout from "./AdminLayout";
import AdminPageHeader from "./AdminPageHeader";
import AdminSearch from "./AdminSearch";
import AdminFeedback from "./AdminFeedback";
import ConfirmDialog from "./ConfirmDialog";
import { createAdminContent, deleteAdminContent, getAdminContent, updateAdminContent } from "../api/adminContent.api";

const blank = { title: "", category: "", description: "", url: "", author: "", difficulty: "", status: "published" };
const fieldClass = "mt-1.5 w-full rounded-lg border border-[#1C2734] bg-[#070B11] px-3 py-2.5 text-sm text-[#DCE4ED] outline-none focus:border-[#4AFFC4]/60";

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
        <div className="px-4 py-5 sm:px-5 lg:px-7">
            <AdminPageHeader title={title} description={description} action={openCreate} actionLabel="Add item" />
            {error && <AdminFeedback onDismiss={() => setError("")}>{error}</AdminFeedback>}
            {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}>{notice}</AdminFeedback>}

            {formOpen && <form onSubmit={save} className="mb-5 rounded-xl border border-[#1C2734] bg-[#080D14] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-[#DCE4ED]">{editingId ? "Edit item" : "New item"}</h2><button type="button" onClick={() => setFormOpen(false)} aria-label="Close editor" className="rounded-lg p-1.5 text-[#7F8B9C] hover:bg-[#111923]"><X size={17} /></button></div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-xs font-medium text-[#AEB9C7]">Title *<input required maxLength={160} value={form.title} onChange={(event) => change("title", event.target.value)} className={fieldClass} /></label>
                    <label className="text-xs font-medium text-[#AEB9C7]">{categoryLabel}{categoryOptions.length ? <select value={form.category} onChange={(event) => change("category", event.target.value)} className={fieldClass}><option value="">Select…</option>{categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input maxLength={80} value={form.category} onChange={(event) => change("category", event.target.value)} className={fieldClass} />}</label>
                    {showAuthor && <label className="text-xs font-medium text-[#AEB9C7]">Author<input maxLength={100} value={form.author} onChange={(event) => change("author", event.target.value)} className={fieldClass} /></label>}
                    {showDifficulty && <label className="text-xs font-medium text-[#AEB9C7]">Difficulty<input maxLength={40} value={form.difficulty} onChange={(event) => change("difficulty", event.target.value)} className={fieldClass} /></label>}
                    <label className="text-xs font-medium text-[#AEB9C7]">Link<input type="url" maxLength={500} value={form.url} onChange={(event) => change("url", event.target.value)} placeholder="https://" className={fieldClass} /></label>
                    <label className="text-xs font-medium text-[#AEB9C7]">{statusLabel}<select value={form.status} onChange={(event) => change("status", event.target.value)} className={fieldClass}><option value="published">Published</option><option value="draft">Draft</option></select></label>
                    <label className="text-xs font-medium text-[#AEB9C7] sm:col-span-2">Description<textarea maxLength={4000} rows={3} value={form.description} onChange={(event) => change("description", event.target.value)} className={fieldClass} /></label>
                </div>
                <div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-[#1C2734] px-4 py-2.5 text-sm text-[#AEB9C7]">Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2.5 text-sm font-semibold text-[#06120D] disabled:opacity-50">{saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}{saving ? "Saving…" : "Save item"}</button></div>
            </form>}

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="w-full max-w-sm"><AdminSearch value={search} onChange={setSearch} placeholder="Search items…" /></div><button type="button" onClick={load} disabled={loading} aria-label="Refresh content" className="rounded-lg border border-[#1C2734] p-2.5 text-[#AEB9C7] hover:text-[#4AFFC4] disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /></button></div>
            <section className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#080D14]">
                {loading ? <p className="p-10 text-center text-sm text-[#7F8B9C]">Loading items…</p> : visibleItems.length ? visibleItems.map((item) => <article key={item._id} className="flex flex-wrap items-start gap-3 border-b border-[#1C2734]/60 p-4 last:border-0 sm:items-center sm:px-5">
                    <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-medium text-[#DCE4ED]">{item.title}</h3><span className={`rounded-full px-2 py-0.5 text-[10px] capitalize ${item.status === "published" ? "bg-[#4AFFC4]/10 text-[#4AFFC4]" : "bg-[#556275]/10 text-[#AEB9C7]"}`}>{item.status}</span></div><p className="mt-1 text-xs text-[#7F8B9C]">{[item.category, item.difficulty, item.author].filter(Boolean).join(" · ")}</p>{item.description && <p className="mt-2 line-clamp-2 text-sm text-[#AEB9C7]">{item.description}</p>}</div>
                    <div className="flex shrink-0 items-center gap-1"><button type="button" onClick={() => openEdit(item)} aria-label={`Edit ${item.title}`} className="rounded-lg p-2 text-[#7F8B9C] hover:bg-[#111923] hover:text-[#4AFFC4]"><Pencil size={15} /></button><button type="button" onClick={() => setPendingDelete(item)} aria-label={`Delete ${item.title}`} className="rounded-lg p-2 text-[#7F8B9C] hover:bg-red-500/10 hover:text-red-400"><Trash2 size={15} /></button>{item.url && <a href={item.url} target="_blank" rel="noreferrer" aria-label={`Open ${item.title}`} className="rounded-lg p-2 text-[#7F8B9C] hover:bg-[#111923] hover:text-[#4AFFC4]"><ExternalLink size={15} /></a>}</div>
                </article>) : <div className="p-12 text-center"><p className="text-sm font-medium text-[#DCE4ED]">{error ? "Content could not be loaded" : search ? "No matching items" : "No items added yet"}</p><p className="mt-1 text-xs text-[#7F8B9C]">{error ? "Check the connection and retry." : search ? "Try another search phrase." : "Add an item to get this collection started."}</p>{error ? <button type="button" onClick={load} className="mt-4 rounded-lg border border-[#1C2734] px-4 py-2 text-sm text-[#AEB9C7] hover:text-[#4AFFC4]">Retry</button> : <button type="button" onClick={openCreate} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2 text-sm font-semibold text-[#06120D]"><Plus size={15} />Add item</button>}</div>}
            </section>
            <ConfirmDialog isOpen={Boolean(pendingDelete)} title="Delete this item?" description={pendingDelete ? `Delete “${pendingDelete.title}”? This action cannot be undone.` : "This action cannot be undone."} loading={deleting} onClose={() => !deleting && setPendingDelete(null)} onConfirm={() => pendingDelete && remove(pendingDelete)} />
        </div>
    </AdminLayout>;
};

export default AdminContentManager;
