import React from "react";
import { CheckCircle2, ListChecks } from "lucide-react";
import ProblemRow from "./ProblemRow";

const ProblemList = ({ problems = [], loading, onProgressUpdate }) => {
    if (loading) return <div className="space-y-3" aria-label="Loading CP problems">{[1, 2, 3, 4, 5].map((item) => <div key={item} className="h-[76px] animate-pulse rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]" />)}</div>;
    if (!problems.length) return <div className="rounded-2xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface)] px-6 py-14 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><ListChecks size={22} /></span><h2 className="mt-4 font-bold text-[var(--theme-text)]">No problems in this track yet</h2><p className="mt-1 text-sm text-[var(--theme-text-muted)]">Try another rating level or check back later.</p></div>;

    const solvedCount = problems.filter((problem) => problem.solved).length;
    return <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--theme-border)] px-4 py-4 sm:px-5">
            <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><ListChecks size={17} /></span><div><h2 className="font-bold text-[var(--theme-text)]">Your practice queue</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Open a problem, then mark it complete here.</p></div></div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-text-secondary)]"><CheckCircle2 size={14} className="text-[var(--theme-accent)]" />{solvedCount} of {problems.length} complete</span>
        </div>
        <div className="grid grid-cols-[30px_minmax(0,1fr)_42px_42px] items-center gap-2 border-b border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-2.5 font-mono text-[9px] uppercase tracking-wider text-[var(--theme-text-muted)] sm:grid-cols-[48px_minmax(0,1fr)_76px_72px] sm:gap-3 sm:px-5">
            <span>#</span><span>Problem</span><span className="text-center">Hint</span><span className="text-right sm:text-center">Done</span>
        </div>
        <div>{problems.map((problem, index) => <ProblemRow key={problem._id || problem.id || problem.problemId} problem={problem} index={index} onProgressUpdate={onProgressUpdate} />)}</div>
    </section>;
};

export default ProblemList;
