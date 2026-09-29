import React, { useCallback, useEffect, useState } from "react";
import { ExternalLink, Pencil, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminSearch from "../components/AdminSearch";
import { createDSASheet, deleteDSASheet, getDSASheets, updateDSASheet } from "../../../api/dsaSheet.api";

const emptyForm = { title: "", description: "", source: "", url: "", order: 0 };
const fieldClass = "mt-1.5 w-full rounded-lg border border-[#1C2734] bg-[#070B11] px-3 py-2.5 text-sm text-[#DCE4ED] outline-none focus:border-[#4AFFC4]/60";

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
        if (!window.confirm(`Delete “${sheet.title}”?`)) return;
        setError(""); setNotice("");
        try {
            await deleteDSASheet(sheet._id);
            setSheets((current) => current.filter((item) => item._id !== sheet._id));
            setNotice("DSA sheet deleted.");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not delete this DSA sheet.");
        }
    };
    const visibleSheets = sheets.filter((sheet) => `${sheet.title} ${sheet.source} ${sheet.description}`.toLowerCase().includes(search.toLowerCase()));

    return <AdminLayout><div className="px-4 py-5 sm:px-5 lg:px-7">
        <AdminPageHeader title="DSA Sheet" description="Manage the DSA sheet resources shown to students." action={openCreate} actionLabel="Add Sheet" />
        {error && <div role="alert" className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"><span>{error}</span><button type="button" onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button></div>}
        {notice && <div role="status" className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">{notice}</div>}
        {formOpen && <form onSubmit={save} className="mb-5 rounded-xl border border-[#1C2734] bg-[#080D14] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-[#DCE4ED]">{editingId ? "Edit DSA sheet" : "Add DSA sheet"}</h2><button type="button" onClick={() => setFormOpen(false)} aria-label="Close form" className="rounded-lg p-2 text-[#AEB9C7] hover:bg-[#111923]"><X size={17} /></button></div>
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs text-[#AEB9C7]">Title *<input required maxLength={160} value={form.title} onChange={(event) => change("title", event.target.value)} className={fieldClass} /></label>
                <label className="text-xs text-[#AEB9C7]">Source *<input required maxLength={100} value={form.source} onChange={(event) => change("source", event.target.value)} placeholder="e.g. Striver" className={fieldClass} /></label>
                <label className="text-xs text-[#AEB9C7]">Sheet URL *<input required type="url" maxLength={500} value={form.url} onChange={(event) => change("url", event.target.value)} placeholder="https://" className={fieldClass} /></label>
                <label className="text-xs text-[#AEB9C7]">Display order<input required type="number" min="0" step="1" value={form.order} onChange={(event) => change("order", event.target.value)} className={fieldClass} /></label>
                <label className="text-xs text-[#AEB9C7] sm:col-span-2">Description<textarea maxLength={2000} rows={3} value={form.description} onChange={(event) => change("description", event.target.value)} className={fieldClass} /></label>
            </div>
            <div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-[#1C2734] px-4 py-2.5 text-sm text-[#AEB9C7]">Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2.5 text-sm font-semibold text-[#06120D] disabled:opacity-50">{saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}{saving ? "Saving…" : "Save sheet"}</button></div>
        </form>}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="w-full max-w-sm"><AdminSearch value={search} onChange={setSearch} placeholder="Search DSA sheets…" /></div><button type="button" onClick={load} disabled={loading} aria-label="Refresh DSA sheets" className="rounded-lg border border-[#1C2734] p-2.5 text-[#AEB9C7] hover:text-[#4AFFC4] disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /></button></div>
        <section className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#080D14]">
            {loading ? <p className="p-10 text-center text-sm text-[#7F8B9C]">Loading DSA sheets…</p> : visibleSheets.length ? visibleSheets.map((sheet) => <article key={sheet._id} className="flex flex-wrap items-start gap-3 border-b border-[#1C2734]/60 p-4 last:border-0 sm:items-center sm:px-5">
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-medium text-[#DCE4ED]">{sheet.title}</h3><span className="rounded-full bg-[#4AFFC4]/10 px-2 py-0.5 text-xs text-[#4AFFC4]">{sheet.source}</span></div><p className="mt-1 text-xs text-[#7F8B9C]">Order {sheet.order ?? 0}</p>{sheet.description && <p className="mt-2 text-sm text-[#AEB9C7]">{sheet.description}</p>}</div>
                <div className="flex shrink-0 items-center gap-1"><button type="button" onClick={() => openEdit(sheet)} aria-label={`Edit ${sheet.title}`} className="rounded-lg p-2 text-[#7F8B9C] hover:bg-[#111923] hover:text-[#4AFFC4]"><Pencil size={15} /></button><button type="button" onClick={() => remove(sheet)} aria-label={`Delete ${sheet.title}`} className="rounded-lg p-2 text-[#7F8B9C] hover:bg-red-500/10 hover:text-red-400"><Trash2 size={15} /></button><a href={sheet.url} target="_blank" rel="noreferrer" aria-label={`Open ${sheet.title}`} className="rounded-lg p-2 text-[#7F8B9C] hover:bg-[#111923] hover:text-[#4AFFC4]"><ExternalLink size={15} /></a></div>
            </article>) : <div className="p-12 text-center"><p className="text-sm font-medium text-[#DCE4ED]">{error ? "DSA sheets could not be loaded" : search ? "No matching sheets" : "No DSA sheets yet"}</p><p className="mt-1 text-xs text-[#7F8B9C]">{error ? "Check the connection and retry." : search ? "Try another search phrase." : "Add a sheet to publish it on the student page."}</p>{error ? <button type="button" onClick={load} className="mt-4 rounded-lg border border-[#1C2734] px-4 py-2 text-sm text-[#AEB9C7]">Retry</button> : <button type="button" onClick={openCreate} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2 text-sm font-semibold text-[#06120D]"><Plus size={15} />Add sheet</button>}</div>}
        </section>
    </div></AdminLayout>;
}
