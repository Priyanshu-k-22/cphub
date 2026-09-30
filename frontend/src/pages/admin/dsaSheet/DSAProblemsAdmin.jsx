import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, ExternalLink, Pencil, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import AdminPageHeader from "../components/AdminPageHeader";
import { createDSAProblem, createDSATopic, deleteDSAProblem, deleteDSATopic, getAdminDSAProblems, getDSATopics, updateDSAProblem, updateDSATopic } from "../../../api/dsaSheet.api";

const topicBlank = { name: "", description: "", order: 0 };
const problemBlank = { title: "", url: "", platform: "LeetCode", difficulty: "Easy", order: 1, hint: "" };
const inputClass = "mt-1.5 w-full rounded-lg border border-[#1C2734] bg-[#070B11] px-3 py-2.5 text-sm text-[#DCE4ED] outline-none focus:border-[#4AFFC4]/60";

export default function DSAProblemsAdmin() {
    const PAGE_SIZE = 20;
    const [topics, setTopics] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState("");
    const [problems, setProblems] = useState([]);
    const [problemPage, setProblemPage] = useState(1);
    const [problemPagination, setProblemPagination] = useState({ total: 0, totalPages: 0 });
    const [loadingTopics, setLoadingTopics] = useState(true);
    const [loadingProblems, setLoadingProblems] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [topicEditor, setTopicEditor] = useState(null);
    const [topicForm, setTopicForm] = useState(topicBlank);
    const [problemEditor, setProblemEditor] = useState(null);
    const [problemForm, setProblemForm] = useState({ ...problemBlank, topicId: "" });

    const selectedTopic = useMemo(() => topics.find((topic) => topic._id === selectedTopicId) || null, [topics, selectedTopicId]);
    const loadTopics = useCallback(async () => {
        setLoadingTopics(true);
        setError("");
        try {
            const response = await getDSATopics();
            const rows = Array.isArray(response?.data) ? response.data : [];
            setTopics(rows);
            setSelectedTopicId((current) => rows.some((topic) => topic._id === current) ? current : rows[0]?._id || "");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load DSA topics.");
        } finally {
            setLoadingTopics(false);
        }
    }, []);
    const loadProblems = useCallback(async () => {
        if (!selectedTopicId) { setProblems([]); return; }
        setLoadingProblems(true);
        setError("");
        try {
            const response = await getAdminDSAProblems(selectedTopicId, { page: problemPage, limit: PAGE_SIZE });
            setProblems(Array.isArray(response?.data?.problems) ? response.data.problems : []);
            setProblemPagination(response?.data?.pagination || { total: 0, totalPages: 0 });
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load problems for this topic.");
        } finally {
            setLoadingProblems(false);
        }
    }, [selectedTopicId, problemPage]);

    useEffect(() => { loadTopics(); }, [loadTopics]);
    useEffect(() => { loadProblems(); }, [loadProblems]);

    const openTopicCreate = () => { setTopicEditor("new"); setTopicForm(topicBlank); setError(""); };
    const openTopicEdit = (topic) => { setTopicEditor(topic._id); setTopicForm({ name: topic.name, description: topic.description || "", order: topic.order ?? 0 }); setError(""); };
    const saveTopic = async (event) => {
        event.preventDefault(); setSaving(true); setError(""); setNotice("");
        try {
            const payload = { ...topicForm, name: topicForm.name.trim(), description: topicForm.description.trim(), order: Number(topicForm.order) };
            if (topicEditor === "new") {
                const response = await createDSATopic(payload);
                setNotice("Topic created.");
                setTopicEditor(null);
                await loadTopics();
                if (response?.data?._id) setSelectedTopicId(response.data._id);
            } else {
                await updateDSATopic(topicEditor, payload);
                setNotice("Topic updated."); setTopicEditor(null); await loadTopics();
            }
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not save this topic.");
        } finally { setSaving(false); }
    };
    const removeTopic = async (topic) => {
        if (!window.confirm(`Delete topic “${topic.name}”? Topics with problems cannot be deleted.`)) return;
        setError(""); setNotice("");
        try {
            await deleteDSATopic(topic._id);
            const remaining = topics.filter((item) => item._id !== topic._id);
            setTopics(remaining); setSelectedTopicId(remaining[0]?._id || ""); setNotice("Topic deleted.");
        } catch (requestError) { setError(requestError?.response?.data?.message || "Could not delete this topic."); }
    };
    const openProblemCreate = () => {
        setProblemEditor("new");
        setProblemForm({ ...problemBlank, topicId: selectedTopicId, order: (selectedTopic?.total || 0) + 1 });
        setError("");
    };
    const openProblemEdit = (problem) => {
        setProblemEditor(problem._id);
        setProblemForm({ title: problem.title, url: problem.url, platform: problem.platform, difficulty: problem.difficulty, order: problem.order, hint: problem.hint || "", topicId: String(problem.topic) });
        setError("");
    };
    const saveProblem = async (event) => {
        event.preventDefault();
        if (!selectedTopicId) return;
        setSaving(true); setError(""); setNotice("");
        try {
            const payload = { ...problemForm, topicId: problemForm.topicId || selectedTopicId, title: problemForm.title.trim(), url: problemForm.url.trim(), platform: problemForm.platform.trim(), order: Number(problemForm.order), hint: problemForm.hint.trim() };
            if (problemEditor === "new") await createDSAProblem(payload);
            else await updateDSAProblem(problemEditor, payload);
            setProblemEditor(null); setNotice(problemEditor === "new" ? "Problem added." : "Problem updated.");
            if (problemEditor === "new" && problemPage !== 1) setProblemPage(1);
            else await loadProblems();
            await loadTopics();
        } catch (requestError) { setError(requestError?.response?.data?.message || "Could not save this problem."); }
        finally { setSaving(false); }
    };
    const removeProblem = async (problem) => {
        if (!window.confirm(`Delete “${problem.title}”? Its saved progress will also be removed.`)) return;
        setError(""); setNotice("");
        try { await deleteDSAProblem(problem._id); setNotice("Problem deleted.");
            if (problems.length === 1 && problemPage > 1) setProblemPage((current) => current - 1);
            else await loadProblems();
            await loadTopics(); }
        catch (requestError) { setError(requestError?.response?.data?.message || "Could not delete this problem."); }
    };

    return <AdminLayout><div className="px-4 py-5 sm:px-5 lg:px-7">
        <AdminPageHeader title="DSA Sheet Problems" description="Organize practice problems by topic and manage their order, difficulty, hints, and links." action={openTopicCreate} actionLabel="Add Topic" />
        {error && <div role="alert" className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"><span>{error}</span><button type="button" onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button></div>}
        {notice && <div role="status" className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">{notice}</div>}

        {topicEditor && <form onSubmit={saveTopic} className="mb-5 rounded-xl border border-[#1C2734] bg-[#080D14] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-[#DCE4ED]">{topicEditor === "new" ? "Add topic" : "Edit topic"}</h2><button type="button" onClick={() => setTopicEditor(null)} aria-label="Close topic editor" className="rounded-lg p-2 text-[#AEB9C7] hover:bg-[#111923]"><X size={17} /></button></div>
            <div className="grid gap-4 sm:grid-cols-3"><label className="text-xs text-[#AEB9C7]">Topic name *<input required maxLength={80} value={topicForm.name} onChange={(event) => setTopicForm((current) => ({ ...current, name: event.target.value }))} className={inputClass} placeholder="Arrays" /></label><label className="text-xs text-[#AEB9C7]">Display order<input required type="number" min="0" step="1" value={topicForm.order} onChange={(event) => setTopicForm((current) => ({ ...current, order: event.target.value }))} className={inputClass} /></label><label className="text-xs text-[#AEB9C7] sm:col-span-3">Description<textarea maxLength={1000} rows={2} value={topicForm.description} onChange={(event) => setTopicForm((current) => ({ ...current, description: event.target.value }))} className={inputClass} /></label></div>
            <div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setTopicEditor(null)} className="rounded-lg border border-[#1C2734] px-4 py-2 text-sm text-[#AEB9C7]">Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2 text-sm font-semibold text-[#06120D] disabled:opacity-50"><Save size={14} />{saving ? "Saving…" : "Save topic"}</button></div>
        </form>}

        <section className="mb-5 rounded-xl border border-[#1C2734] bg-[#080D14] p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-semibold text-[#DCE4ED]">Topics</h2><p className="mt-1 text-sm text-[#7F8B9C]">Select a topic to manage its problems. Topics with problems are protected from deletion.</p></div><button type="button" onClick={loadTopics} disabled={loadingTopics} aria-label="Refresh topics" className="rounded-lg border border-[#1C2734] p-2 text-[#AEB9C7] hover:text-[#4AFFC4] disabled:opacity-50"><RefreshCw size={15} className={loadingTopics ? "animate-spin" : ""} /></button></div>
            {loadingTopics ? <p className="py-6 text-sm text-[#7F8B9C]">Loading topics…</p> : topics.length ? <div className="flex flex-wrap gap-2">{topics.map((topic) => <div key={topic._id} className={`flex items-center gap-1 rounded-lg border px-2 py-1.5 ${selectedTopicId === topic._id ? "border-[#4AFFC4]/40 bg-[#4AFFC4]/10" : "border-[#1C2734] bg-[#070B11]"}`}><button type="button" onClick={() => { setSelectedTopicId(topic._id); setProblemPage(1); setProblemEditor(null); }} className={`rounded px-2 py-1 text-sm ${selectedTopicId === topic._id ? "text-[#4AFFC4]" : "text-[#AEB9C7] hover:text-white"}`}>{topic.name}<span className="ml-2 text-xs opacity-70">{topic.total ?? 0}</span></button><button type="button" onClick={() => openTopicEdit(topic)} aria-label={`Edit ${topic.name}`} className="rounded p-1 text-[#7F8B9C] hover:text-[#4AFFC4]"><Pencil size={13} /></button><button type="button" onClick={() => removeTopic(topic)} aria-label={`Delete ${topic.name}`} className="rounded p-1 text-[#7F8B9C] hover:text-red-400"><Trash2 size={13} /></button></div>)}</div> : <div className="rounded-lg border border-dashed border-[#1C2734] p-8 text-center"><BookOpen className="mx-auto text-[#4AFFC4]" /><p className="mt-3 text-sm text-[#AEB9C7]">No topics created yet.</p><button type="button" onClick={openTopicCreate} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2 text-sm font-semibold text-[#06120D]"><Plus size={15} />Create first topic</button></div>}
        </section>

        {selectedTopic && <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-semibold text-[#DCE4ED]">{selectedTopic.name}</h2><p className="mt-1 text-sm text-[#7F8B9C]">{selectedTopic.solved ?? 0} of {selectedTopic.total ?? problems.length} solved · {selectedTopic.percentage ?? 0}%</p></div><button type="button" onClick={openProblemCreate} className="inline-flex items-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2.5 text-sm font-semibold text-[#06120D]"><Plus size={15} />Add problem</button></div>
            {problemEditor && <form onSubmit={saveProblem} className="mb-5 rounded-xl border border-[#1C2734] bg-[#080D14] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold text-[#DCE4ED]">{problemEditor === "new" ? `Add problem to ${selectedTopic.name}` : "Edit problem"}</h3><button type="button" onClick={() => setProblemEditor(null)} aria-label="Close problem editor" className="rounded-lg p-2 text-[#AEB9C7] hover:bg-[#111923]"><X size={17} /></button></div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><label className="text-xs text-[#AEB9C7]">Title *<input required maxLength={180} value={problemForm.title} onChange={(event) => setProblemForm((current) => ({ ...current, title: event.target.value }))} className={inputClass} /></label><label className="text-xs text-[#AEB9C7]">Topic<select required value={problemForm.topicId} onChange={(event) => setProblemForm((current) => ({ ...current, topicId: event.target.value }))} className={inputClass}>{topics.map((topic) => <option key={topic._id} value={topic._id}>{topic.name}</option>)}</select></label><label className="text-xs text-[#AEB9C7]">Practice URL *<input required type="url" maxLength={600} placeholder="https://…" value={problemForm.url} onChange={(event) => setProblemForm((current) => ({ ...current, url: event.target.value }))} className={inputClass} /></label><label className="text-xs text-[#AEB9C7]">Platform *<input required maxLength={60} value={problemForm.platform} onChange={(event) => setProblemForm((current) => ({ ...current, platform: event.target.value }))} className={inputClass} /></label><label className="text-xs text-[#AEB9C7]">Difficulty<select value={problemForm.difficulty} onChange={(event) => setProblemForm((current) => ({ ...current, difficulty: event.target.value }))} className={inputClass}><option>Easy</option><option>Medium</option><option>Hard</option></select></label><label className="text-xs text-[#AEB9C7]">Order<input required type="number" min="1" step="1" value={problemForm.order} onChange={(event) => setProblemForm((current) => ({ ...current, order: event.target.value }))} className={inputClass} /></label><label className="text-xs text-[#AEB9C7] sm:col-span-2 lg:col-span-3">Hint<textarea maxLength={2000} rows={2} value={problemForm.hint} onChange={(event) => setProblemForm((current) => ({ ...current, hint: event.target.value }))} className={inputClass} /></label></div>
                <div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setProblemEditor(null)} className="rounded-lg border border-[#1C2734] px-4 py-2 text-sm text-[#AEB9C7]">Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2 text-sm font-semibold text-[#06120D] disabled:opacity-50"><Save size={14} />{saving ? "Saving…" : "Save problem"}</button></div>
            </form>}
            <section className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#080D14]">
                {loadingProblems ? <p className="p-10 text-center text-sm text-[#7F8B9C]">Loading problems…</p> : problemPagination.total ? <div className="divide-y divide-[#1C2734]"><div className="hidden grid-cols-[3rem_minmax(0,1fr)_7rem_7rem_6rem] gap-3 px-4 py-3 font-mono text-xs uppercase tracking-wide text-[#7F8B9C] sm:grid"><span>#</span><span>Problem</span><span>Platform</span><span>Difficulty</span><span className="text-right">Actions</span></div>{problems.map((problem) => <article key={problem._id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:grid sm:grid-cols-[3rem_minmax(0,1fr)_7rem_7rem_6rem]"><span className="font-mono text-sm text-[#7F8B9C]">{problem.order}</span><div className="min-w-[10rem] flex-1 sm:min-w-0"><a href={problem.url} target="_blank" rel="noreferrer" className="font-medium text-[#DCE4ED] hover:text-[#4AFFC4]">{problem.title}</a>{problem.hint && <p className="mt-1 line-clamp-1 text-xs text-[#7F8B9C]">{problem.hint}</p>}</div><span className="text-sm text-[#AEB9C7]">{problem.platform}</span><span className={`rounded-full px-2 py-1 text-center text-xs ${problem.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400" : problem.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>{problem.difficulty}</span><div className="ml-auto flex items-center justify-end gap-1 sm:ml-0"><a href={problem.url} target="_blank" rel="noreferrer" aria-label={`Open ${problem.title}`} className="rounded p-2 text-[#7F8B9C] hover:text-[#4AFFC4]"><ExternalLink size={15} /></a><button type="button" onClick={() => openProblemEdit(problem)} aria-label={`Edit ${problem.title}`} className="rounded p-2 text-[#7F8B9C] hover:text-[#4AFFC4]"><Pencil size={15} /></button><button type="button" onClick={() => removeProblem(problem)} aria-label={`Delete ${problem.title}`} className="rounded p-2 text-[#7F8B9C] hover:text-red-400"><Trash2 size={15} /></button></div></article>)}</div> : <div className="p-12 text-center"><p className="font-medium text-[#DCE4ED]">No problems in {selectedTopic.name} yet.</p><p className="mt-1 text-sm text-[#7F8B9C]">Add a problem to this topic to start building the sheet.</p><button type="button" onClick={openProblemCreate} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2 text-sm font-semibold text-[#06120D]"><Plus size={15} />Add problem</button></div>}
            </section>
            {problemPagination.total > 0 && <div className="mt-4 flex items-center justify-between rounded-xl border border-[#1C2734] bg-[#080D14] px-4 py-3 text-sm text-[#7F8B9C]"><span>{(problemPage - 1) * PAGE_SIZE + 1}–{Math.min(problemPage * PAGE_SIZE, problemPagination.total)} of {problemPagination.total} problems</span><div className="flex items-center gap-2"><button type="button" disabled={loadingProblems || problemPage <= 1} onClick={() => setProblemPage((value) => value - 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 disabled:opacity-40">Previous</button><span>{problemPage} / {problemPagination.totalPages}</span><button type="button" disabled={loadingProblems || problemPage >= problemPagination.totalPages} onClick={() => setProblemPage((value) => value + 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 disabled:opacity-40">Next</button></div></div>}
        </>}
    </div></AdminLayout>;
}
