import React from "react";
import { ArrowRight, BrainCircuit, CalendarDays, Check, Code2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const TodayProblems = ({ problems = [], loading, error, onRetry }) => (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5" aria-labelledby="today-problems-title">
        <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-500/10 text-amber-500"><CalendarDays size={19} /></span>
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Daily practice</p>
                    <h2 id="today-problems-title" className="text-base font-bold text-[var(--theme-text)]">Today’s Problems</h2>
                </div>
            </div>
            <span className="shrink-0 rounded-full bg-[var(--theme-accent-soft)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--theme-accent)]">{problems.length} today</span>
        </div>
        <p className="mt-3 text-sm text-[var(--theme-text-muted)]">Solve in CpHub to add each problem to your progress.</p>

        {loading ? (
            <div className="mt-4 space-y-2" aria-label="Loading today’s problems">
                {[1, 2].map((key) => <div key={key} className="h-16 animate-pulse rounded-xl bg-[var(--theme-surface-high)]" />)}
            </div>
        ) : error ? (
            <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-500" role="alert">
                <p>{error}</p>
                <button type="button" onClick={onRetry} className="mt-2 font-semibold underline underline-offset-2">Retry</button>
            </div>
        ) : problems.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-4 py-5 text-center">
                <Sparkles size={18} className="mx-auto text-[var(--theme-accent)]" />
                <p className="mt-2 text-sm font-semibold text-[var(--theme-text)]">You’re all caught up</p>
                <p className="mt-1 text-xs text-[var(--theme-text-muted)]">No published problems for today yet.</p>
            </div>
        ) : (
            <div className="mt-4 space-y-2">
                {problems.map((problem) => {
                    const metadata = problem.category === "DSA"
                        ? problem.difficulty
                        : problem.rating ? `${problem.rating} rating` : problem.difficulty;
                    const TopicIcon = problem.category === "DSA" ? BrainCircuit : Code2;
                    const difficultyClass = problem.difficulty === "Easy"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : problem.difficulty === "Hard"
                            ? "bg-rose-500/10 text-rose-500"
                            : "bg-amber-500/10 text-amber-600";

                    return (
                        <Link key={problem._id} to={`/problems/${problem._id}`} className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--theme-accent)] hover:shadow-md">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${problem.category === "DSA" ? "bg-violet-500/10 text-violet-500" : "bg-blue-500/10 text-blue-500"}`} title={problem.category === "DSA" ? "DSA problem" : "CP problem"}><TopicIcon size={17} /></span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-[var(--theme-text)] group-hover:text-[var(--theme-accent)]">{problem.title}</p>
                                    <p className="mt-0.5 truncate text-xs text-[var(--theme-text-muted)]">{problem.category} · {problem.platform}</p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                                {metadata && <span className={`hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-flex ${problem.category === "DSA" ? difficultyClass : "bg-blue-500/10 text-blue-500"}`}>{metadata}</span>}
                                {problem.solved
                                    ? <span className="flex items-center gap-1 rounded-full bg-[var(--theme-accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--theme-accent)]"><Check size={14} /> Done</span>
                                    : <ArrowRight size={17} className="text-[var(--theme-text-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--theme-accent)]" />}
                            </div>
                        </Link>
                    );
                })}
            </div>
        )}
    </section>
);

export default TodayProblems;
