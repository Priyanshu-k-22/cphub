import React, { useEffect, useState } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import SheetLeaderboard from "../components/leaderboard/SheetLeaderboard.jsx";
import {
    getDSATopicProblems,
    getDSATopics,
    markDSAProblemComplete,
    markDSAProblemIncomplete,
} from "../api/dsaSheet.api.js";

const DSAProblemRow = ({ problem, index, onToggle, updating }) => {
    const [showHint, setShowHint] = useState(false);
    return <div className="border-b border-[#1C2734]/70 last:border-b-0">
        <div className="grid grid-cols-[28px_minmax(0,1fr)_42px_36px_36px] items-center gap-2 px-3 py-3 transition-colors hover:bg-[#0C131C] sm:grid-cols-[50px_minmax(0,1fr)_80px_48px_48px] sm:gap-4 sm:px-5 sm:py-4">
            <span className="font-mono text-xs text-[#556275]">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
                <a href={problem.url} target="_blank" rel="noopener noreferrer" className="block truncate text-sm font-medium text-[#DCE4ED] transition-colors hover:text-[#4AFFC4]">
                    {problem.title}<ArrowUpRight size={13} className="ml-1 inline" />
                </a>
                <span className="mt-1 block truncate text-xs text-[#7F8B9C]">{problem.platform}</span>
                {showHint && problem.hint && <div className="mt-2 rounded-lg border border-[#F5C542]/15 bg-[#F5C542]/5 px-3 py-2 text-xs leading-relaxed text-[#B7BFCA]"><span className="mr-2 font-semibold text-[#F5C542]">Hint</span>{problem.hint}</div>}
            </div>
            <div className="flex justify-center">
                <span className={`rounded-full px-2 py-1 text-center text-[10px] sm:text-xs ${problem.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400" : problem.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>{problem.difficulty}</span>
            </div>
            <div className="flex justify-center">
                <button type="button" onClick={() => setShowHint((open) => !open)} disabled={!problem.hint} title={problem.hint ? "Show hint" : "No hint available"} aria-label={showHint ? "Hide hint" : problem.hint ? "Show hint" : "No hint available"} className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200 ${!problem.hint ? "cursor-not-allowed border-[#1C2734] text-[#303B49]" : showHint ? "border-[#F5C542]/40 bg-[#F5C542]/10 text-[#F5C542]" : "border-[#1C2734] text-[#556275] hover:border-[#F5C542]/40 hover:bg-[#F5C542]/5 hover:text-[#F5C542]"}`}>💡</button>
            </div>
            <div className="flex justify-end">
                <button type="button" onClick={() => onToggle(problem)} disabled={updating} aria-label={problem.solved ? "Mark incomplete" : "Mark complete"} aria-pressed={problem.solved} className={`flex h-8 w-8 items-center justify-center rounded-lg border transition disabled:cursor-wait disabled:opacity-50 ${problem.solved ? "border-[#4AFFC4]/40 bg-[#4AFFC4]/10 text-[#4AFFC4]" : "border-[#1C2734] text-[#556275] hover:border-[#4AFFC4]/40 hover:text-[#4AFFC4]"}`}>{updating ? <RefreshCw size={13} className="animate-spin" /> : problem.solved ? "✓" : "○"}</button>
            </div>
        </div>
    </div>;
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

    return <main className="min-h-screen bg-[#060A10] px-4 py-8 text-white md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
            <section className="mb-8">
                <div className="mb-3 flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[#4AFFC4] shadow-[0_0_10px_#4AFFC4]" /><span className="font-mono text-xs uppercase tracking-[0.2em] text-[#556275]">Data Structures &amp; Algorithms</span></div>
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">DSA Sheet</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7F8B9C] md:text-base">Practice curated problems topic by topic and track your progress as you go.</p>
            </section>

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="min-w-0">
                    {error && <div role="alert" className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"><span>{error}</span><button type="button" onClick={retry} className="inline-flex shrink-0 items-center gap-2 underline"><RefreshCw size={14} />Retry</button></div>}

                    <div className="mb-6 overflow-x-auto rounded-xl border border-[#1C2734] bg-[#080D14] p-1">
                        <div className="flex min-w-max gap-1">
                            {topicsLoading ? <span className="px-5 py-2.5 text-sm text-[#7F8B9C]">Loading topics…</span> : topics.map((topic) => <button key={topic._id} type="button" onClick={() => chooseTopic(topic)} aria-pressed={topic.slug === selectedSlug} className={`rounded-lg px-4 py-2.5 text-sm transition-all duration-200 sm:px-5 ${topic.slug === selectedSlug ? "bg-[#4AFFC4] font-semibold text-[#060A10]" : "text-[#7F8B9C] hover:bg-[#111923] hover:text-white"}`}>{topic.name}</button>)}
                        </div>
                    </div>

                    {!topicsLoading && topics.length === 0 ? <div className="rounded-xl border border-dashed border-[#1C2734] bg-[#080D14] px-6 py-12 text-center"><p className="font-mono text-sm text-[#7F8B9C]">No DSA topics have been published yet.</p><p className="mt-2 text-sm text-[#556275]">Topics and problems will appear here once added by an administrator.</p></div> : <>
                        {selectedTopic && <section className="mb-8 rounded-xl border border-[#1C2734] bg-[#080D14] p-5">
                            <div className="mb-3 flex items-center justify-between"><div><p className="font-mono text-xs uppercase tracking-wider text-[#556275]">{selectedTopic.name} progress</p><p className="mt-1 text-lg font-semibold text-white">{progress.solved}<span className="text-[#556275]"> / {progress.total}</span></p></div><span className="font-mono text-sm text-[#4AFFC4]">{progress.percentage}%</span></div>
                            <div className="h-2 overflow-hidden rounded-full bg-[#141C26]"><div className="h-full rounded-full bg-[#4AFFC4] transition-all duration-500" style={{ width: `${progress.percentage}%` }} /></div>
                        </section>}

                        {problemsLoading ? <div className="space-y-3">{[1,2,3,4,5].map((item) => <div key={item} className="h-16 animate-pulse rounded-xl border border-[#1C2734] bg-[#080D14]" />)}</div> : sheet?.problems?.length ? <section className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#080D14]">
                            <div className="grid grid-cols-[28px_minmax(0,1fr)_42px_36px_36px] gap-2 border-b border-[#1C2734] px-3 py-3 font-mono text-[9px] uppercase tracking-wider text-[#556275] sm:grid-cols-[50px_minmax(0,1fr)_80px_48px_48px] sm:gap-4 sm:px-5 sm:text-[10px]"><span>#</span><span>Problem</span><span className="text-center">Level</span><span className="text-center">Hint</span><span className="text-right">Status</span></div>
                            {sheet.problems.map((problem, index) => <DSAProblemRow key={problem._id} problem={problem} index={(page - 1) * PAGE_SIZE + index} onToggle={toggleSolved} updating={updatingId === problem._id} />)}
                        </section> : <div className="rounded-xl border border-[#1C2734] bg-[#080D14] px-6 py-12 text-center"><p className="font-mono text-sm text-[#7F8B9C]">{error ? "Could not load this topic." : `No problems found for ${selectedTopic?.name || "this topic"}.`}</p></div>}
                        {sheet?.pagination?.total > 0 && <div className="mt-4 flex items-center justify-between rounded-xl border border-[#1C2734] bg-[#080D14] px-4 py-3 text-sm text-[#7F8B9C]"><span>{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sheet.pagination.total)} of {sheet.pagination.total} problems</span><div className="flex items-center gap-2"><button type="button" disabled={problemsLoading || page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 disabled:opacity-40">Previous</button><span>{page} / {sheet.pagination.totalPages}</span><button type="button" disabled={problemsLoading || page >= sheet.pagination.totalPages} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 disabled:opacity-40">Next</button></div></div>}
                    </>}
                </div>

                <SheetLeaderboard type="dsa-sheet" label="DSA" refreshSignal={leaderboardRefreshKey} />
            </div>
        </div>
    </main>;
}
