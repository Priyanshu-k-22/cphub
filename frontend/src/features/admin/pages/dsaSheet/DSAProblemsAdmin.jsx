import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    ChevronDown,
    ExternalLink,
    Layers3,
    Pencil,
    Plus,
    RefreshCw,
    Save,
    Sparkles,
    Trash2,
    X
} from "lucide-react";

import AdminLayout from "../../components/AdminLayout";
import AdminFeedback from "../../components/AdminFeedback";
import ConfirmDialog from "../../components/ConfirmDialog";
import { createDSAProblem, createDSATopic, deleteDSAProblem, deleteDSATopic, getAdminDSAProblems, getDSATopics, updateDSAProblem, updateDSATopic } from "../../../dsa/api/dsaSheet.api";

const PAGE_SIZE = 20;
const topicBlank = { name: "", description: "", order: 0 };
const problemBlank = { title: "", url: "", platform: "LeetCode", difficulty: "Easy", order: 1, hint: "" };
const fieldClass = "mt-2 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3.5 py-3 text-sm text-[var(--theme-text)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]/50 focus:ring-2 focus:ring-[var(--theme-accent)]/10";
const difficultyStyle = { Easy: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500", Medium: "border-amber-500/20 bg-amber-500/10 text-amber-500", Hard: "border-rose-500/20 bg-rose-500/10 text-rose-500" };

export default function DSAProblemsAdmin() {
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
    const [pendingDelete, setPendingDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [topicEditor, setTopicEditor] = useState(null);
    const [topicForm, setTopicForm] = useState(topicBlank);
    const [problemEditor, setProblemEditor] = useState(null);
    const [problemForm, setProblemForm] = useState({ ...problemBlank, topicId: "" });
    const [topicLibraryOpen, setTopicLibraryOpen] = useState(false);

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
        if (!selectedTopicId) { setProblems([]); setProblemPagination({ total: 0, totalPages: 0 }); return; }
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
                setNotice("Topic created."); setTopicEditor(null); await loadTopics();
                if (response?.data?._id) setSelectedTopicId(response.data._id);
            } else {
                await updateDSATopic(topicEditor, payload);
                setNotice("Topic updated."); setTopicEditor(null); await loadTopics();
            }
        } catch (requestError) { setError(requestError?.response?.data?.message || "Could not save this topic."); }
        finally { setSaving(false); }
    };
    const removeTopic = async (topic) => {
        setError(""); setNotice(""); setDeleting(true);
        try {
            await deleteDSATopic(topic._id);
            const remaining = topics.filter((item) => item._id !== topic._id);
            setTopics(remaining); setSelectedTopicId(remaining[0]?._id || ""); setNotice("DSA topic deleted.");
        } catch (requestError) { setError(requestError?.response?.data?.message || "Could not delete this topic."); }
        finally { setDeleting(false); setPendingDelete(null); }
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
            setProblemEditor(null); setNotice(problemEditor === "new" ? "DSA problem added." : "DSA problem updated.");
            if (problemEditor === "new" && problemPage !== 1) setProblemPage(1);
            else await loadProblems();
            await loadTopics();
        } catch (requestError) { setError(requestError?.response?.data?.message || "Could not save this problem."); }
        finally { setSaving(false); }
    };
    const removeProblem = async (problem) => {
        setError(""); setNotice(""); setDeleting(true);
        try {
            await deleteDSAProblem(problem._id); setNotice("DSA problem deleted.");
            if (problems.length === 1 && problemPage > 1) setProblemPage((current) => current - 1);
            else await loadProblems();
            await loadTopics();
        } catch (requestError) { setError(requestError?.response?.data?.message || "Could not delete this problem."); }
        finally { setDeleting(false); setPendingDelete(null); }
    };

    return <AdminLayout>
        <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
            <header className="relative mb-5 overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.12)] sm:p-7 lg:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-1/4 h-px w-2/3 bg-gradient-to-r from-transparent via-violet-400/35 to-transparent" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-text-secondary)]"><Sparkles size={14} className="text-violet-500" /> Topic-wise practice studio</div>
                        <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--theme-text)] sm:text-4xl">DSA Sheet Problems</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)]">Organize practice by topic, keep problem order intentional, and give students clear platform and difficulty cues.</p>
                    </div>
                    <div className="flex flex-col gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-3 sm:min-w-[270px] sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3 px-1"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500"><Layers3 size={19} /></span><div><p className="text-2xl font-black tabular-nums text-[var(--theme-text)]">{topics.length.toLocaleString()}</p><p className="text-xs text-[var(--theme-text-muted)]">practice topics</p></div></div>
                        <button type="button" onClick={openTopicCreate} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-4 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-105"><Plus size={17} />Add topic<ArrowUpRight size={14} /></button>
                    </div>
                </div>
            </header>

            {error && !problemEditor && <AdminFeedback onDismiss={() => setError("")}>{error}<button type="button" onClick={selectedTopicId ? loadProblems : loadTopics} className="ml-3 font-semibold underline">Retry</button></AdminFeedback>}
            {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}>{notice}</AdminFeedback>}

            {topicEditor && <form onSubmit={saveTopic} className="mb-5 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between"><div><h2 className="text-base font-bold text-[var(--theme-text)]">{topicEditor === "new" ? "Create a topic" : "Edit topic"}</h2><p className="mt-1 text-xs text-[var(--theme-text-muted)]">Topics organize the DSA practice path students browse.</p></div><button type="button" onClick={() => setTopicEditor(null)} aria-label="Close topic editor" className="rounded-xl p-2 text-[var(--theme-text-muted)] transition hover:bg-[var(--theme-surface-high)]"><X size={17} /></button></div>
                <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Topic name *<input required maxLength={80} value={topicForm.name} onChange={(event) => setTopicForm((current) => ({ ...current, name: event.target.value }))} className={fieldClass} placeholder="Arrays" /></label><label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Display order<input required type="number" min="0" step="1" value={topicForm.order} onChange={(event) => setTopicForm((current) => ({ ...current, order: event.target.value }))} className={fieldClass} /></label><label className="text-sm font-semibold text-[var(--theme-text-secondary)] sm:col-span-2">Description<textarea maxLength={1000} rows={3} value={topicForm.description} onChange={(event) => setTopicForm((current) => ({ ...current, description: event.target.value }))} className={fieldClass} placeholder="A short introduction to this topic" /></label></div>
                <div className="mt-5 flex justify-end gap-2 border-t border-[var(--theme-border)] pt-4"><button type="button" onClick={() => setTopicEditor(null)} className="min-h-10 rounded-xl border border-[var(--theme-border)] px-4 text-sm font-semibold text-[var(--theme-text-secondary)]">Cancel</button><button type="submit" disabled={saving} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-lime-300 px-4 text-sm font-bold text-emerald-950 disabled:opacity-50"><Save size={15} />{saving ? "Saving…" : "Save topic"}</button></div>
            </form>}

            <section className="mb-5 overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]">
                {/* Topic Library Header */}
                <div className="flex items-center justify-between gap-3 border-b border-[var(--theme-border)] px-4 py-3 sm:px-5">
                    <button
                        type="button"
                        onClick={() => setTopicLibraryOpen((current) => !current)}
                        aria-expanded={topicLibraryOpen}
                        className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]">
                            <BookOpen size={17} />
                        </span>

                        <span className="min-w-0">
                            <span className="flex items-center gap-2">
                                <span className="text-sm font-bold text-[var(--theme-text)]">
                                    Topic Library
                                </span>

                                <ChevronDown
                                    size={15}
                                    className={`shrink-0 text-[var(--theme-text-muted)] transition-transform duration-200 ${topicLibraryOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </span>

                            <span className="mt-0.5 block truncate text-xs text-[var(--theme-text-muted)]">
                                Choose a topic to view and manage its problems
                            </span>
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={loadTopics}
                        disabled={loadingTopics}
                        aria-label="Refresh topics"
                        title="Refresh topics"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-accent)]/35 hover:text-[var(--theme-accent)] disabled:opacity-50"
                    >
                        <RefreshCw
                            size={14}
                            className={loadingTopics ? "animate-spin" : ""}
                        />
                    </button>
                </div>

                {/* Topic Grid */}
                {loadingTopics ? (
                    <div className="grid grid-cols-1 gap-2.5 p-3 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((key) => (
                            <div
                                key={key}
                                className="h-[58px] animate-pulse rounded-xl bg-[var(--theme-surface-high)]"
                            />
                        ))}
                    </div>
                ) : topics.length ? (
                    <div className="grid grid-cols-1 gap-2.5 p-3 sm:grid-cols-2 lg:grid-cols-3">
                        {topics.map((topic, index) => {
                            const active = selectedTopicId === topic._id;

                            /*
                             * Collapsed state:
                             * - mobile   -> first topic
                             * - sm       -> first 2 topics
                             * - lg+      -> first 3 topics
                             *
                             * This keeps exactly one visible grid row.
                             */
                            const visibilityClass = topicLibraryOpen
                                ? ""
                                : index === 0
                                    ? ""
                                    : index === 1
                                        ? "hidden sm:block"
                                        : index === 2
                                            ? "hidden lg:block"
                                            : "hidden";

                            return (
                                <article
                                    key={topic._id}
                                    className={`
        ${visibilityClass}
        group relative overflow-hidden rounded-xl border
        transition-all duration-200 ease-out
        ${active
                                            ? `
                    border-[var(--theme-accent)]/50
                    bg-[var(--theme-accent-soft)]
                    shadow-[0_0_0_1px_rgba(74,255,196,0.08),0_8px_24px_rgba(74,255,196,0.06)]
                  `
                                            : `
                    border-[var(--theme-border)]
                    bg-[var(--theme-surface-raised)]
                    hover:-translate-y-[1px]
                    hover:border-[var(--theme-accent)]/25
                    hover:bg-[var(--theme-surface-high)]
                  `
                                        }
    `}
                                >
                                    {/* Active accent line */}
                                    {active && (
                                        <span className="absolute inset-y-0 left-0 w-[2px] bg-[var(--theme-accent)]" />
                                    )}

                                    <div className="p-3">
                                        {/* Topic header */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedTopicId(topic._id);
                                                setProblemPage(1);
                                                setProblemEditor(null);
                                            }}
                                            aria-pressed={active}
                                            className="flex w-full items-center justify-between gap-3 text-left"
                                        >
                                            <div className="flex min-w-0 items-center gap-2.5">
                                                {/* Topic indicator */}
                                                <span
                                                    className={`
                        flex h-7 w-7 shrink-0 items-center justify-center
                        rounded-lg border text-[10px] font-black
                        transition-colors
                        ${active
                                                            ? `
                                    border-[var(--theme-accent)]/30
                                    bg-[var(--theme-accent)]/10
                                    text-[var(--theme-accent)]
                                  `
                                                            : `
                                    border-[var(--theme-border)]
                                    bg-[var(--theme-surface)]
                                    text-[var(--theme-text-muted)]
                                    group-hover:border-[var(--theme-accent)]/20
                                    group-hover:text-[var(--theme-accent)]
                                  `
                                                        }
                    `}
                                                >
                                                    {String(topic.name || "?")
                                                        .trim()
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>

                                                {/* Topic name */}
                                                <span
                                                    className={`
                        min-w-0 truncate text-sm font-semibold
                        ${active
                                                            ? "text-[var(--theme-accent)]"
                                                            : "text-[var(--theme-text)]"
                                                        }
                    `}
                                                >
                                                    {topic.name}
                                                </span>
                                            </div>

                                            {/* Problem count */}
                                            <span
                                                className={`
                    shrink-0 rounded-md border px-1.5 py-0.5
                    text-[10px] font-bold tabular-nums
                    ${active
                                                        ? `
                                border-[var(--theme-accent)]/20
                                bg-[var(--theme-accent)]/10
                                text-[var(--theme-accent)]
                              `
                                                        : `
                                border-[var(--theme-border)]
                                bg-[var(--theme-surface)]
                                text-[var(--theme-text-muted)]
                              `
                                                    }
                `}
                                            >
                                                {topic.total ?? 0}
                                            </span>
                                        </button>

                                        {/* Bottom row */}
                                        <div
                                            className={`
                mt-2.5 flex items-center justify-between
                border-t pt-2
                ${active
                                                    ? "border-[var(--theme-accent)]/10"
                                                    : "border-[var(--theme-border)]/70"
                                                }
            `}
                                        >
                                            <span
                                                className={`
                    text-[9px] font-medium uppercase tracking-[0.12em]
                    ${active
                                                        ? "text-[var(--theme-accent)]/60"
                                                        : "text-[var(--theme-text-muted)]"
                                                    }
                `}
                                            >
                                                Topic
                                            </span>

                                            <div className="flex items-center gap-0.5">
                                                {/* Edit */}
                                                <button
                                                    type="button"
                                                    onClick={() => openTopicEdit(topic)}
                                                    aria-label={`Edit ${topic.name}`}
                                                    title="Edit topic"
                                                    className="
                        rounded-lg p-1.5
                        text-[var(--theme-text-muted)]
                        transition-all duration-150
                        hover:bg-[var(--theme-accent)]/10
                        hover:text-[var(--theme-accent)]
                    "
                                                >
                                                    <Pencil size={12} strokeWidth={2} />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPendingDelete({
                                                            type: "topic",
                                                            item: topic,
                                                        })
                                                    }
                                                    aria-label={`Delete ${topic.name}`}
                                                    title="Delete topic"
                                                    className="
                        rounded-lg p-1.5
                        text-[var(--theme-text-muted)]
                        transition-all duration-150
                        hover:bg-rose-500/10
                        hover:text-rose-400
                    "
                                                >
                                                    <Trash2 size={12} strokeWidth={2} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-10 text-center">
                        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-surface-raised)] text-[var(--theme-accent)]">
                            <BookOpen size={20} />
                        </span>

                        <p className="mt-4 text-sm font-bold text-[var(--theme-text)]">
                            No topics yet
                        </p>

                        <p className="mt-1 text-xs text-[var(--theme-text-muted)]">
                            Create a topic to start building the DSA practice path.
                        </p>

                        <button
                            type="button"
                            onClick={openTopicCreate}
                            className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-lime-300 px-4 text-sm font-bold text-emerald-950"
                        >
                            <Plus size={15} />
                            Create first topic
                        </button>
                    </div>
                )}
            </section>

            {selectedTopic && <>
                <section className="mb-4 flex flex-col gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div className="flex min-w-0 items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500"><BookOpen size={19} /></span><div className="min-w-0"><p className="text-xs font-semibold text-[var(--theme-text-muted)]">Selected topic</p><h2 className="truncate text-xl font-black text-[var(--theme-text)]">{selectedTopic.name}</h2><p className="mt-1 truncate text-xs text-[var(--theme-text-secondary)]">{selectedTopic.description || "Manage the curated problems in this topic."}</p></div></div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end"><div className="text-right"><p className="text-lg font-black tabular-nums text-[var(--theme-text)]">{problemPagination.total || selectedTopic.total || 0}</p><p className="text-xs text-[var(--theme-text-muted)]">problems</p></div><button type="button" onClick={openProblemCreate} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-4 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-105"><Plus size={17} />Add problem<ArrowUpRight size={14} /></button></div>
                </section>

                <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]">
                    <div className="flex items-center justify-between gap-3 border-b border-[var(--theme-border)] px-4 py-4 sm:px-5"><div><h3 className="text-sm font-bold text-[var(--theme-text)]">Problem library</h3><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Practice links, difficulty, and hints for {selectedTopic.name}</p></div><span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-text-secondary)]">{problemPagination.total || 0} total</span></div>
                    {loadingProblems ? (
                        <div
                            className="overflow-hidden"
                            aria-label="Loading DSA problems"
                        >
                            <div className="hidden grid-cols-[4.5rem_minmax(0,1fr)_9rem_8rem_8rem] gap-3 bg-[var(--theme-surface-raised)] px-5 py-3 sm:grid">
                                {["Order", "Problem", "Platform", "Difficulty", "Actions"].map(
                                    (label) => (
                                        <span
                                            key={label}
                                            className={`text-[10px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] ${label === "Actions" ? "text-right" : ""
                                                }`}
                                        >
                                            {label}
                                        </span>
                                    )
                                )}
                            </div>

                            <div className="divide-y divide-[var(--theme-border)]">
                                {[1, 2, 3, 4, 5].map((key) => (
                                    <div
                                        key={key}
                                        className="grid grid-cols-[4.5rem_minmax(0,1fr)_9rem_8rem_8rem] items-center gap-3 px-5 py-3.5"
                                    >
                                        <div className="h-8 w-8 animate-pulse rounded-lg bg-[var(--theme-surface-high)]" />

                                        <div className="h-5 w-48 animate-pulse rounded-lg bg-[var(--theme-surface-high)]" />

                                        <div className="h-4 w-20 animate-pulse rounded-lg bg-[var(--theme-surface-high)]" />

                                        <div className="h-6 w-16 animate-pulse rounded-full bg-[var(--theme-surface-high)]" />

                                        <div className="ml-auto h-9 w-28 animate-pulse rounded-xl bg-[var(--theme-surface-high)]" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                        : problems.length ? (
    <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
            <thead>
                <tr className="border-b border-[var(--theme-border)] bg-[var(--theme-surface-raised)]">
                    {[
                        "Order",
                        "Problem",
                        "Platform",
                        "Difficulty",
                        "Actions",
                    ].map((label) => (
                        <th
                            key={label}
                            className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] ${
                                label === "Actions" ? "text-right" : ""
                            }`}
                        >
                            {label}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {problems.map((problem) => (
                    <tr
                        key={problem._id}
                        className="group border-b border-[var(--theme-border)] last:border-0 transition-colors hover:bg-[var(--theme-hover)]"
                    >
                        {/* Order */}
                        <td className="w-20 px-4 py-3">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--theme-surface-high)] text-xs font-bold tabular-nums text-[var(--theme-text-muted)]">
                                {String(problem.order || 0).padStart(2, "0")}
                            </span>
                        </td>

                        {/* Problem */}
                        <td className="max-w-[360px] px-4 py-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]">
                                    <BookOpen size={16} />
                                </span>

                                <a
                                    href={problem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={problem.title}
                                    className="inline-flex min-w-0 items-center gap-1.5 truncate text-sm font-bold text-[var(--theme-text)] transition hover:text-[var(--theme-accent)]"
                                >
                                    <span className="truncate">
                                        {problem.title}
                                    </span>

                                    <ExternalLink
                                        size={12}
                                        className="shrink-0 opacity-60"
                                    />
                                </a>
                            </div>
                        </td>

                        {/* Platform */}
                        <td className="px-4 py-3">
                            <span className="inline-flex items-center rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-2.5 py-1.5 text-xs font-semibold text-[var(--theme-text-secondary)]">
                                {problem.platform || "—"}
                            </span>
                        </td>

                        {/* Difficulty */}
                        <td className="px-4 py-3">
                            <span
                                className={`inline-flex min-w-[64px] items-center justify-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${
                                    difficultyStyle[problem.difficulty] ||
                                    "border-[var(--theme-border)] bg-[var(--theme-surface-high)] text-[var(--theme-text-secondary)]"
                                }`}
                            >
                                {problem.difficulty || "—"}
                            </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                            <div className="flex justify-end gap-1.5">
                                {/* Open */}
                                <a
                                    href={problem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${problem.title}`}
                                    title="Open problem"
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--theme-text-muted)] transition hover:border-[var(--theme-border)] hover:bg-[var(--theme-surface-high)] hover:text-[var(--theme-accent)]"
                                >
                                    <ExternalLink size={15} />
                                </a>

                                {/* Edit */}
                                <button
                                    type="button"
                                    onClick={() => openProblemEdit(problem)}
                                    aria-label={`Edit ${problem.title}`}
                                    title="Edit problem"
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--theme-text-muted)] transition hover:border-[var(--theme-accent)]/25 hover:bg-[var(--theme-accent-soft)] hover:text-[var(--theme-accent)]"
                                >
                                    <Pencil size={15} />
                                </button>

                                {/* Delete */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPendingDelete({
                                            type: "problem",
                                            item: problem,
                                        })
                                    }
                                    aria-label={`Delete ${problem.title}`}
                                    title="Delete problem"
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--theme-text-muted)] transition hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-500"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
) : <div className="px-6 py-14 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-surface-raised)] text-[var(--theme-text-muted)]"><BookOpen size={20} /></span><p className="mt-4 text-sm font-bold text-[var(--theme-text)]">No problems in {selectedTopic.name} yet</p><p className="mt-1 text-xs text-[var(--theme-text-muted)]">Add the first challenge to start building this topic.</p><button type="button" onClick={openProblemCreate} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-lime-300 px-4 text-sm font-bold text-emerald-950"><Plus size={15} />Add problem</button></div>}
                </section>
                {problemPagination.total > 0 && <nav aria-label="DSA problem pages" className="mt-4 flex flex-col gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"><span className="text-xs text-[var(--theme-text-muted)]"><strong className="font-bold text-[var(--theme-text)]">{(problemPage - 1) * PAGE_SIZE + 1}–{Math.min(problemPage * PAGE_SIZE, problemPagination.total)}</strong> of {Number(problemPagination.total).toLocaleString()} problems</span><div className="flex items-center justify-between gap-2 sm:justify-end"><button type="button" disabled={loadingProblems || problemPage <= 1} onClick={() => setProblemPage((value) => value - 1)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 text-xs font-semibold text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] disabled:opacity-40"><ArrowLeft size={14} />Previous</button><span className="min-w-16 text-center text-xs font-semibold tabular-nums text-[var(--theme-text-muted)]">{problemPage} / {Math.max(1, problemPagination.totalPages)}</span><button type="button" disabled={loadingProblems || problemPage >= problemPagination.totalPages} onClick={() => setProblemPage((value) => value + 1)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 text-xs font-semibold text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] disabled:opacity-40">Next<ArrowRight size={14} /></button></div></nav>}
            </>}
        </div>

        {problemEditor && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-3 py-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) setProblemEditor(null); }}>
            <form onSubmit={saveProblem} className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-2xl">
                <div className="flex shrink-0 items-center justify-between border-b border-[var(--theme-border)] px-5 py-4 sm:px-7"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500"><BookOpen size={20} /></span><div><h2 className="text-lg font-bold text-[var(--theme-text)]">{problemEditor === "new" ? "Add DSA problem" : "Edit DSA problem"}</h2><p className="mt-1 text-sm text-[var(--theme-text-muted)]">{problemEditor === "new" ? `Add a practice problem to ${selectedTopic?.name || "this topic"}` : "Update the problem details students see."}</p></div></div><button type="button" disabled={saving} onClick={() => setProblemEditor(null)} aria-label="Close problem editor" className="rounded-xl p-2 text-[var(--theme-text-muted)] transition hover:bg-[var(--theme-surface-high)] disabled:opacity-50"><X size={17} /></button></div>
                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-7">
                    {error && <AdminFeedback className="mb-0" onDismiss={() => setError("")}>{error}</AdminFeedback>}
                    <section className="space-y-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5"><div><h3 className="text-sm font-bold text-[var(--theme-text)]">Problem details</h3><p className="mt-1 text-xs text-[var(--theme-text-muted)]">Choose the topic, source, difficulty, and position.</p></div>
                        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Problem title *<input required maxLength={180} value={problemForm.title} onChange={(event) => setProblemForm((current) => ({ ...current, title: event.target.value }))} className={fieldClass} placeholder="Two Sum" /></label><label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Topic<select required value={problemForm.topicId} onChange={(event) => setProblemForm((current) => ({ ...current, topicId: event.target.value }))} className={fieldClass}>{topics.map((topic) => <option key={topic._id} value={topic._id}>{topic.name}</option>)}</select></label><label className="text-sm font-semibold text-[var(--theme-text-secondary)] sm:col-span-2">Practice URL *<input required type="url" maxLength={600} placeholder="https://leetcode.com/problems/..." value={problemForm.url} onChange={(event) => setProblemForm((current) => ({ ...current, url: event.target.value }))} className={fieldClass} /></label><label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Platform *<input required maxLength={60} value={problemForm.platform} onChange={(event) => setProblemForm((current) => ({ ...current, platform: event.target.value }))} className={fieldClass} placeholder="LeetCode" /></label><label className="text-sm font-semibold text-[var(--theme-text-secondary)]">Difficulty<select value={problemForm.difficulty} onChange={(event) => setProblemForm((current) => ({ ...current, difficulty: event.target.value }))} className={fieldClass}><option>Easy</option><option>Medium</option><option>Hard</option></select></label><label className="text-sm font-semibold text-[var(--theme-text-secondary)] sm:col-span-2">Display order<input required type="number" min="1" step="1" value={problemForm.order} onChange={(event) => setProblemForm((current) => ({ ...current, order: event.target.value }))} className={fieldClass} /></label></div>
                    </section>
                    <section className="space-y-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5"><div><h3 className="text-sm font-bold text-[var(--theme-text)]">Student hint <span className="font-medium text-[var(--theme-text-muted)]">(optional)</span></h3><p className="mt-1 text-xs text-[var(--theme-text-muted)]">A short nudge that helps without giving away the solution.</p></div><textarea maxLength={2000} rows={4} value={problemForm.hint} onChange={(event) => setProblemForm((current) => ({ ...current, hint: event.target.value }))} className={`${fieldClass} resize-y`} placeholder="Think about the invariant…" /></section>
                </div>
                <div className="flex shrink-0 justify-end gap-2 border-t border-[var(--theme-border)] bg-[var(--theme-surface)] px-5 py-3 sm:px-7"><button type="button" onClick={() => setProblemEditor(null)} disabled={saving} className="min-h-10 rounded-xl border border-[var(--theme-border)] px-4 text-sm font-semibold text-[var(--theme-text-secondary)] transition hover:bg-[var(--theme-surface-high)] disabled:opacity-50">Cancel</button><button type="submit" disabled={saving} className="min-h-10 rounded-xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-5 text-sm font-bold text-emerald-950 shadow-md shadow-emerald-500/15 transition hover:brightness-105 disabled:opacity-50">{saving ? "Saving…" : problemEditor === "new" ? "Add problem" : "Save changes"}</button></div>
            </form>
        </div>}

        <ConfirmDialog isOpen={Boolean(pendingDelete)} title={pendingDelete?.type === "topic" ? "Delete topic?" : "Delete DSA problem?"} description={pendingDelete?.type === "topic" ? `Delete topic “${pendingDelete.item.name}”? Topics with problems cannot be deleted.` : pendingDelete ? `Delete “${pendingDelete.item.title}”? Saved progress for this problem will also be removed.` : "This action cannot be undone."} loading={deleting} onClose={() => !deleting && setPendingDelete(null)} onConfirm={() => pendingDelete && (pendingDelete.type === "topic" ? removeTopic(pendingDelete.item) : removeProblem(pendingDelete.item))} />
    </AdminLayout>;
}
