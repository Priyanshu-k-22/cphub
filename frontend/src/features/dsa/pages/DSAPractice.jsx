import React, { useEffect, useState } from "react";
import { AlertCircle, ArrowUpRight, BookOpen, Brain, Check, CheckCircle2, ChevronLeft, ChevronRight, Circle, ExternalLink, Layers3, Lightbulb, LoaderCircle, RefreshCw, Sparkles, Target, TrendingUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import SheetLeaderboard from "../../leaderboard/components/SheetLeaderboard.jsx";
import {
    getDSATopicProblems,
    getDSATopics,
    markDSAProblemComplete,
    markDSAProblemIncomplete,
} from "../api/dsaSheet.api.js";

const DSAProblemRow = ({ problem, index, onToggle, updating }) => {
    const [showHint, setShowHint] = useState(false);
    const levelStyle = problem.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-500" : problem.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500" : "bg-rose-500/10 text-rose-500";
    return <article className="border-b border-[var(--theme-border)] last:border-0">
        <div className="grid grid-cols-[28px_minmax(0,1fr)_38px_38px] items-center gap-2 px-3 py-3 transition-colors hover:bg-[var(--theme-hover)] sm:grid-cols-[48px_minmax(0,1fr)_88px_52px_52px] sm:gap-3 sm:px-5 sm:py-4">
            <span className="font-mono text-xs font-semibold text-[var(--theme-text-muted)]">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
                <a href={problem.url} target="_blank" rel="noopener noreferrer" className="group inline-flex max-w-full items-center gap-1.5 truncate text-sm font-semibold text-[var(--theme-text)] transition-colors hover:text-[var(--theme-accent)]"><span className="truncate">{problem.title}</span><ExternalLink size={13} className="shrink-0 opacity-60 group-hover:opacity-100" /></a>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-[var(--theme-text-muted)]"><span className="rounded-md bg-[var(--theme-surface-high)] px-1.5 py-0.5">{problem.platform}</span><span className="sm:hidden"><span className={`rounded-full px-2 py-0.5 ${levelStyle}`}>{problem.difficulty}</span></span></div>
                {showHint && problem.hint && <div className="mt-2 rounded-xl border border-amber-400/20 bg-amber-400/5 px-3 py-2.5 text-xs leading-relaxed text-[var(--theme-text-secondary)]"><span className="mr-2 font-bold text-amber-500">Hint</span>{problem.hint}</div>}
            </div>
            <span className={`hidden rounded-full px-2 py-1 text-center text-xs font-semibold sm:inline-block ${levelStyle}`}>{problem.difficulty}</span>
            <div className="flex justify-center"><button type="button" onClick={() => setShowHint((open) => !open)} disabled={!problem.hint} title={problem.hint ? (showHint ? "Hide hint" : "Show hint") : "No hint available"} aria-label={problem.hint ? (showHint ? "Hide hint" : "Show hint") : "No hint available"} aria-expanded={Boolean(problem.hint && showHint)} className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${!problem.hint ? "cursor-not-allowed border-[var(--theme-border)] text-[var(--theme-text-muted)] opacity-40" : showHint ? "border-amber-400/40 bg-amber-400/10 text-amber-500" : "border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-text-muted)] hover:border-amber-400/40 hover:text-amber-500"}`}><Lightbulb size={16} /></button></div>
            <div className="flex justify-end sm:justify-center"><button type="button" onClick={() => onToggle(problem)} disabled={updating} aria-label={problem.solved ? "Mark incomplete" : "Mark complete"} title={problem.solved ? "Mark incomplete" : "Mark complete"} aria-pressed={problem.solved} className={`flex h-9 w-9 items-center justify-center rounded-xl border transition disabled:cursor-wait disabled:opacity-50 ${problem.solved ? "border-[var(--theme-accent)]/30 bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]" : "border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-text-muted)] hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)]"}`}>{updating ? <LoaderCircle size={16} className="animate-spin" /> : problem.solved ? <Check size={17} /> : <Circle size={16} />}</button></div>
        </div>
    </article>;
};

export default function DSAPractice() {
    const PAGE_SIZE = 20;
    const { topicSlug } = useParams();
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [selectedSlug, setSelectedSlug] = useState(topicSlug || "");
    const [sheet, setSheet] = useState(null);
    const [page, setPage] = useState(1);
    const [topicsLoading, setTopicsLoading] = useState(true);
    const [problemsLoading, setProblemsLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState("");
    const [error, setError] = useState("");
    const [leaderboardRefreshKey, setLeaderboardRefreshKey] = useState(0);

    useEffect(() => {
        let active = true;
        getDSATopics()
            .then((response) => {
                if (!active) return;
                const rows = Array.isArray(response?.data) ? response.data : [];
                setTopics(rows);
                const initial = rows.find((topic) => topic.slug === topicSlug) || rows[0];
                setSelectedSlug(topicSlug || initial?.slug || "");
            })
            .catch((requestError) => {
                if (active) setError(requestError?.response?.data?.message || "Could not load DSA topics.");
            })
            .finally(() => { if (active) setTopicsLoading(false); });
        return () => { active = false; };
    }, []);

    useEffect(() => {
        if (topicsLoading) return;
        const routeTopic = topics.find((topic) => topic.slug === topicSlug);
        if (topicSlug && routeTopic && routeTopic.slug !== selectedSlug) { setSelectedSlug(routeTopic.slug); setPage(1); }
        else if (!topicSlug && !selectedSlug && topics.length) { setSelectedSlug(topics[0].slug); setPage(1); }
    }, [topicSlug, topics, topicsLoading, selectedSlug]);

    useEffect(() => {
        if (!selectedSlug) {
            setSheet(null);
            setProblemsLoading(false);
            return undefined;
        }
        let active = true;
        setProblemsLoading(true);
        setError("");
        getDSATopicProblems(selectedSlug, { page, limit: PAGE_SIZE })
            .then((response) => { if (active) setSheet(response?.data || null); })
            .catch((requestError) => {
                if (!active) return;
                setSheet(null);
                setError(requestError?.response?.data?.message || "Could not load problems for this topic.");
            })
            .finally(() => { if (active) setProblemsLoading(false); });
        return () => { active = false; };
    }, [selectedSlug, page]);

    const chooseTopic = (topic) => {
        setSelectedSlug(topic.slug);
        setPage(1);
        setError("");
        navigate(`/dsa-sheet/${topic.slug}`);
    };

    const toggleSolved = async (problem) => {
        if (updatingId) return;
        setUpdatingId(problem._id);
        setError("");
        try {
            if (problem.solved) await markDSAProblemIncomplete(problem._id);
            else await markDSAProblemComplete(problem._id);
            setLeaderboardRefreshKey((current) => current + 1);
            const solved = !problem.solved;
            setSheet((current) => {
                if (!current) return current;
                const problems = current.problems.map((item) => item._id === problem._id ? { ...item, solved } : item);
                const solvedCount = Math.max(0, current.progress.solved + (solved ? 1 : -1));
                const total = current.progress.total;
                return { ...current, problems, progress: { solved: solvedCount, total, percentage: total ? Math.round(solvedCount / total * 100) : 0 } };
            });
            setTopics((current) => current.map((topic) => {
                if (topic.slug !== selectedSlug) return topic;
                const solvedCount = Math.max(0, (topic.solved || 0) + (problem.solved ? -1 : 1));
                return { ...topic, solved: solvedCount, percentage: topic.total ? Math.round(solvedCount / topic.total * 100) : 0 };
            }));
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not update problem progress.");
        } finally { setUpdatingId(""); }
    };

    const retry = async () => {
        setError("");
        if (selectedSlug) {
            setProblemsLoading(true);
            try {
                const response = await getDSATopicProblems(selectedSlug, { page, limit: PAGE_SIZE });
                setSheet(response?.data || null);
            } catch (requestError) {
                setError(requestError?.response?.data?.message || "Could not load problems for this topic.");
            } finally { setProblemsLoading(false); }
            return;
        }
        setTopicsLoading(true);
        try {
            const response = await getDSATopics();
            const rows = Array.isArray(response?.data) ? response.data : [];
            setTopics(rows);
            const initial = rows.find((topic) => topic.slug === topicSlug) || rows[0];
            setSelectedSlug(topicSlug || initial?.slug || "");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load DSA topics.");
        } finally { setTopicsLoading(false); }
    };

    const selectedTopic = topics.find((topic) => topic.slug === selectedSlug) || sheet?.topic;
    const progress = sheet?.progress || { solved: 0, total: 0, percentage: 0 };

    return <main className="min-h-screen bg-[var(--theme-page)] px-4 py-6 text-[var(--theme-text)] sm:px-6 sm:py-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-[1440px]">
            <section className="relative mb-6 overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-xl shadow-black/5 sm:p-7 lg:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[var(--theme-accent)] opacity-[0.07] blur-3xl" />
                <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-accent)]"><Brain size={15} />Data structures &amp; algorithms <ArrowUpRight size={13} /></div>
                        <h1 className="text-3xl font-black tracking-tight text-[var(--theme-text)] sm:text-4xl lg:text-5xl">Think in patterns.</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)] sm:text-base">Build problem-solving fluency one topic at a time. Practice curated problems, use hints when you need a nudge, and track every solve.</p>
                        <div className="mt-5 flex flex-wrap gap-2"><span className="inline-flex items-center gap-2 rounded-lg bg-[var(--theme-accent-soft)] px-3 py-2 text-xs font-medium text-[var(--theme-accent)]"><Layers3 size={14} />{topics.length} learning topics</span><span className="inline-flex items-center gap-2 rounded-lg bg-[var(--theme-surface-raised)] px-3 py-2 text-xs font-medium text-[var(--theme-text-secondary)]"><Sparkles size={14} />Easy · Medium · Hard</span></div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-4 md:block md:p-5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] md:mb-4"><BookOpen size={23} /></span>
                        <div className="min-w-0 flex-1"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-text-muted)]">Current topic</p><p className="mt-1 truncate text-xl font-black text-[var(--theme-text)]">{topicsLoading ? "Loading topics…" : selectedTopic?.name || "Choose a topic"}</p><p className="mt-1 text-xs text-[var(--theme-text-muted)]">{progress.solved} of {progress.total} problems solved</p></div>
                        <div className="hidden h-1.5 overflow-hidden rounded-full bg-[var(--theme-surface-high)] md:block"><div className="h-full rounded-full bg-[var(--theme-accent)] transition-[width] duration-500" style={{ width: `${progress.percentage || 0}%` }} /></div>
                    </div>
                </div>
            </section>

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="min-w-0">
                    {error && <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500"><span className="inline-flex items-center gap-2"><AlertCircle size={16} />{error}</span><button type="button" onClick={retry} className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 font-semibold transition hover:bg-red-500/10"><RefreshCw size={14} />Retry</button></div>}

                    <section className="mb-5 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5">
                        <div className="mb-4 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Layers3 size={17} /></span><div><h2 className="font-bold text-[var(--theme-text)]">Choose a topic</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Your completion status is saved as you practice.</p></div></div>
                        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                            {topicsLoading ? <div className="h-14 w-full animate-pulse rounded-xl bg-[var(--theme-surface-raised)]" /> : topics.map((topic) => {
                                const active = topic.slug === selectedSlug;
                                return <button key={topic._id} type="button" onClick={() => chooseTopic(topic)} aria-pressed={active} className={`min-w-[145px] rounded-xl border px-3 py-2.5 text-left transition duration-200 hover:-translate-y-0.5 ${active ? "border-[var(--theme-accent)] bg-[var(--theme-accent-soft)]" : "border-[var(--theme-border)] bg-[var(--theme-surface-raised)] hover:border-[var(--theme-accent)]/50"}`}>
                                    <span className={`block truncate text-sm font-bold ${active ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)]"}`}>{topic.name}</span><span className="mt-1 flex items-center justify-between gap-2 text-[10px] text-[var(--theme-text-muted)]"><span>{topic.solved || 0} / {topic.total || 0} solved</span><span>{topic.percentage || 0}%</span></span>
                                </button>;
                            })}
                        </div>
                    </section>

                    {!topicsLoading && topics.length === 0 ? <div className="rounded-2xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface)] px-6 py-14 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><BookOpen size={22} /></span><h2 className="mt-4 font-bold text-[var(--theme-text)]">Your DSA path is getting ready</h2><p className="mt-1 text-sm text-[var(--theme-text-muted)]">Topics and curated problems will appear here once published.</p></div> : <>
                        {selectedTopic && <section className="mb-5 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5">
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Target size={18} /></span><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--theme-text-muted)]">Topic progress · {selectedTopic.name}</p><p className="mt-1 text-xl font-black text-[var(--theme-text)]">{progress.solved}<span className="ml-1.5 text-sm font-semibold text-[var(--theme-text-muted)]">/ {progress.total} solved</span></p></div></div><div className="flex items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-2"><TrendingUp size={15} className="text-[var(--theme-accent)]" /><span className="font-mono text-base font-bold text-[var(--theme-text)]">{progress.percentage}%</span></div></div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-[var(--theme-surface-high)]" role="progressbar" aria-label={`${selectedTopic.name} completion`} aria-valuemin={0} aria-valuemax={progress.total} aria-valuenow={progress.solved}><div className="h-full rounded-full bg-gradient-to-r from-[#25C997] to-[var(--theme-accent)] transition-all duration-500" style={{ width: `${progress.percentage || 0}%` }} /></div>
                        </section>}

                        {problemsLoading ? <div className="space-y-3" aria-label="Loading DSA problems">{[1, 2, 3, 4, 5].map((item) => <div key={item} className="h-[74px] animate-pulse rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]" />)}</div> : sheet?.problems?.length ? <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]">
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--theme-border)] px-4 py-4 sm:px-5"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><CheckCircle2 size={17} /></span><div><h2 className="font-bold text-[var(--theme-text)]">Problem set</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Work through the list in order or choose any challenge.</p></div></div><span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-text-secondary)]">{sheet.pagination?.total || 0} problems</span></div>
                            <div className="grid grid-cols-[28px_minmax(0,1fr)_40px_40px] items-center gap-2 border-b border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-2.5 font-mono text-[9px] uppercase tracking-wider text-[var(--theme-text-muted)] sm:grid-cols-[48px_minmax(0,1fr)_88px_52px_52px] sm:gap-3 sm:px-5"><span>#</span><span>Problem</span><span className="hidden text-center sm:block">Level</span><span className="text-center">Hint</span><span className="text-right sm:text-center">Done</span></div>
                            {sheet.problems.map((problem, index) => <DSAProblemRow key={problem._id} problem={problem} index={(page - 1) * PAGE_SIZE + index} onToggle={toggleSolved} updating={updatingId === problem._id} />)}
                        </section> : <div className="rounded-2xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface)] px-6 py-14 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><BookOpen size={22} /></span><h2 className="mt-4 font-bold text-[var(--theme-text)]">{error ? "Could not load this topic" : `No problems in ${selectedTopic?.name || "this topic"} yet`}</h2><p className="mt-1 text-sm text-[var(--theme-text-muted)]">{error ? "Retry the request to continue your practice." : "Try another topic or check back after new problems are added."}</p></div>}

                        {sheet?.pagination?.total > 0 && <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 text-sm text-[var(--theme-text-muted)]"><span>{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sheet.pagination.total)} of {sheet.pagination.total} problems</span><div className="flex items-center gap-2"><button type="button" disabled={problemsLoading || page <= 1} onClick={() => setPage((value) => value - 1)} className="inline-flex items-center gap-1 rounded-lg border border-[var(--theme-border)] px-3 py-2 font-medium text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={15} />Previous</button><span className="min-w-12 text-center font-mono text-xs">{page} / {sheet.pagination.totalPages}</span><button type="button" disabled={problemsLoading || page >= sheet.pagination.totalPages} onClick={() => setPage((value) => value + 1)} className="inline-flex items-center gap-1 rounded-lg border border-[var(--theme-border)] px-3 py-2 font-medium text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] disabled:cursor-not-allowed disabled:opacity-40">Next<ChevronRight size={15} /></button></div></div>}
                    </>}
                </div>

                <SheetLeaderboard type="dsa-sheet" label="DSA" refreshSignal={leaderboardRefreshKey} />
            </div>
        </div>
    </main>;
}
