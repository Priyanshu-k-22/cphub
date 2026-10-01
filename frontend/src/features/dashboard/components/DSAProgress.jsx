import React from "react";
import { ArrowUpRight, BrainCircuit, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const DSAProgress = ({ progress, loading }) => {
    const solved = Number(progress?.solved) || 0;
    const total = Number(progress?.total) || 0;
    const percentage = total ? Math.min(100, Number(progress?.percentage) || 0) : 0;

    return (
        <section className="group rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-5">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-500"><BrainCircuit size={20} /></span>
                    <div><p className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Topics and patterns</p><h2 className="mt-0.5 text-base font-bold text-[var(--theme-text)]">DSA Sheet</h2></div>
                </div>
                <Link to="/dsa-sheet" className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-semibold text-[var(--theme-accent)] transition hover:bg-[var(--theme-hover)]">Continue <ArrowUpRight size={15} /></Link>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                    <p className="text-xs font-medium text-[var(--theme-text-muted)]">Problems solved</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-[var(--theme-text)]" aria-live="polite">{loading ? "…" : <>{solved}<span className="ml-1 text-sm font-medium text-[var(--theme-text-muted)]">/ {total}</span></>}</p>
                </div>
                <div>
                    <p className="text-xs font-medium text-[var(--theme-text-muted)]">Overall completion</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-[var(--theme-text)]">{loading ? "…" : `${percentage}%`}</p>
                </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--theme-surface-high)]" role="progressbar" aria-label="DSA Sheet completion" aria-valuemin={0} aria-valuemax={total} aria-valuenow={solved}>
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 transition-[width] duration-700" style={{ width: `${percentage}%` }} />
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--theme-surface-raised)] px-3 py-2.5">
                <CheckCircle2 size={15} className="shrink-0 text-violet-500" />
                <p className="truncate text-sm text-[var(--theme-text-secondary)]">{progress?.currentTopic ? `Up next: ${progress.currentTopic}` : total ? "All topics complete — great work!" : "No topics available yet"}</p>
                </div>
        </section>
    );
};

export default DSAProgress;
