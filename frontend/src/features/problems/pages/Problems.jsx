import React, { useCallback, useEffect, useState } from "react";
import { ArrowRight, BookOpen, CalendarCheck2, Code2, Layers3, ListChecks, RefreshCw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getDailyProblems } from "../api/problem.api";
import DailyProblemCard from "../components/DailyProblemCard";
import SheetLeaderboard from "../../leaderboard/components/SheetLeaderboard.jsx";

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadProblems = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getDailyProblems();
            setProblems(Array.isArray(response?.data) ? response.data : []);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load today’s problems.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadProblems(); }, [loadProblems]);

    const dsaProblem = problems.find((problem) => problem.category === "DSA");
    const cpProblem = problems.find((problem) => problem.category === "CP");
    const stats = [
        { label: "Today’s set", value: problems.length, icon: CalendarCheck2, color: "text-[var(--theme-accent)]", note: "problems available" },
        { label: "DSA practice", value: problems.filter((problem) => problem.category === "DSA").length, icon: Layers3, color: "text-emerald-500", note: "topic focused" },
        { label: "CP practice", value: problems.filter((problem) => problem.category === "CP").length, icon: Code2, color: "text-sky-500", note: "rating focused" },
    ];

    return <main className="min-h-screen bg-[var(--theme-page)] px-4 py-6 text-[var(--theme-text)] sm:px-6 sm:py-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-[1440px]">
            <section className="relative mb-6 overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-xl shadow-black/5 sm:p-7 lg:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[var(--theme-accent)] opacity-[0.07] blur-3xl" />
                <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.65fr)] lg:items-center">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-accent)]"><Sparkles size={15} />Daily practice</div>
                        <h1 className="text-3xl font-black tracking-tight text-[var(--theme-text)] sm:text-4xl lg:text-5xl">A little progress, every day.</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)] sm:text-base">Solve today’s curated challenges, review the explanations, and build a habit that compounds.</p>
                        <div className="mt-5 flex flex-wrap gap-2"><span className="inline-flex items-center gap-2 rounded-lg bg-[var(--theme-accent-soft)] px-3 py-2 text-xs font-medium text-[var(--theme-accent)]"><Code2 size={14} />Competitive programming</span><span className="inline-flex items-center gap-2 rounded-lg bg-[var(--theme-surface-raised)] px-3 py-2 text-xs font-medium text-[var(--theme-text-secondary)]"><Layers3 size={14} />Data structures &amp; algorithms</span></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {stats.map(({ label, value, icon: Icon, color, note }) => <div key={label} className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-3 sm:p-4"><span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--theme-surface-high)] ${color}`}><Icon size={18} /></span><p className="mt-3 text-2xl font-black tracking-tight text-[var(--theme-text)]">{loading ? "—" : value}</p><p className="mt-0.5 text-[11px] font-semibold leading-4 text-[var(--theme-text-secondary)] sm:text-xs">{label}</p><p className="mt-1 hidden text-[10px] text-[var(--theme-text-muted)] sm:block">{note}</p></div>)}
                    </div>
                </div>
            </section>

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="min-w-0 space-y-6">
                    <section>
                        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                            <div><p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-accent)]">Today’s challenge</p><h2 className="text-xl font-bold tracking-tight text-[var(--theme-text)] sm:text-2xl">Pick a problem and get started</h2><p className="mt-1 text-sm text-[var(--theme-text-muted)]">Your completion is tracked toward the daily leaderboard.</p></div>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-text-secondary)]"><CalendarCheck2 size={14} className="text-[var(--theme-accent)]" />{loading ? "Loading" : `${problems.length} available`}</span>
                        </div>

                        {error && <div role="alert" className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500"><span>{error}</span><button type="button" onClick={loadProblems} className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 font-semibold transition hover:bg-red-500/10"><RefreshCw size={14} />Retry</button></div>}

                        {loading ? <div className="grid gap-4 md:grid-cols-2">{[1, 2].map((key) => <div key={key} className="h-48 animate-pulse rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]" />)}</div> : problems.length ? <div className="grid gap-4 md:grid-cols-2">{dsaProblem && <DailyProblemCard problem={dsaProblem} />} {cpProblem && <DailyProblemCard problem={cpProblem} />}</div> : !error ? <div className="rounded-2xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface)] px-6 py-14 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><BookOpen size={22} /></span><h3 className="mt-4 font-bold text-[var(--theme-text)]">No daily problems yet</h3><p className="mt-1 text-sm text-[var(--theme-text-muted)]">Check back later for the next set of challenges.</p></div> : null}
                    </section>

                    <Link to="/problems/history" className="group flex flex-col gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 transition hover:border-[var(--theme-accent)]/40 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <span className="flex items-center gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><ListChecks size={22} /></span><span><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-text-muted)]">Keep practicing</span><span className="mt-1 block text-lg font-bold text-[var(--theme-text)]">Explore the problem archive</span><span className="mt-1 block text-sm text-[var(--theme-text-secondary)]">Browse past challenges by category, difficulty, topic, and tag.</span></span></span>
                        <span className="inline-flex items-center gap-2 self-start rounded-lg border border-[var(--theme-border)] px-4 py-2.5 text-sm font-semibold text-[var(--theme-text-secondary)] transition group-hover:border-[var(--theme-accent)]/40 group-hover:text-[var(--theme-accent)] sm:self-auto">Open history <ArrowRight size={15} /></span>
                    </Link>
                </div>

                <SheetLeaderboard type="daily-problem" label="Daily" />
            </div>
        </div>
    </main>;
};

export default Problems;
