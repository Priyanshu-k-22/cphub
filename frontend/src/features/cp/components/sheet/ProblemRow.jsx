import React, { useState } from "react";
import { Check, Circle, ExternalLink, Lightbulb, LoaderCircle } from "lucide-react";
import { markProblemComplete, markProblemIncomplete } from "../../api/cpSheet.api";

const ProblemRow = ({ problem, index, onProgressUpdate }) => {
    const [solved, setSolved] = useState(Boolean(problem.solved));
    const [updating, setUpdating] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [error, setError] = useState("");
    const problemId = problem._id || problem.id || problem.problemId;

    const handleToggle = async () => {
        if (updating) return;
        setUpdating(true);
        setError("");
        const nextSolved = !solved;
        try {
            if (nextSolved) await markProblemComplete(problemId);
            else await markProblemIncomplete(problemId);
            setSolved(nextSolved);
            onProgressUpdate?.({ solvedDelta: nextSolved ? 1 : -1 });
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not update progress. Try again.");
        } finally {
            setUpdating(false);
        }
    };

    return <article className="border-b border-[var(--theme-border)] last:border-0">
        <div className="grid grid-cols-[30px_minmax(0,1fr)_42px_42px] items-center gap-2 px-3 py-3 transition-colors hover:bg-[var(--theme-hover)] sm:grid-cols-[48px_minmax(0,1fr)_76px_72px] sm:gap-3 sm:px-5 sm:py-4">
            <span className="font-mono text-xs font-semibold text-[var(--theme-text-muted)]">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
                <a href={problem.url} target="_blank" rel="noopener noreferrer" className="group inline-flex max-w-full items-center gap-1.5 truncate text-sm font-semibold text-[var(--theme-text)] transition-colors hover:text-[var(--theme-accent)]">
                    <span className="truncate">{problem.title}</span><ExternalLink size={13} className="shrink-0 opacity-60 transition group-hover:opacity-100" />
                </a>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-[var(--theme-text-muted)]">
                    <span className="rounded-md bg-[var(--theme-surface-high)] px-1.5 py-0.5">Codeforces</span>
                    {problem.rating && <span className="font-mono">{problem.rating} rating</span>}
                </div>
                {error && <p role="alert" className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
            <div className="flex justify-center">
                <button type="button" onClick={() => setShowHint((current) => !current)} disabled={!problem.hint} title={problem.hint ? (showHint ? "Hide hint" : "Show hint") : "No hint available"} aria-label={problem.hint ? (showHint ? "Hide hint" : "Show hint") : "No hint available"} aria-expanded={Boolean(problem.hint && showHint)} className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${!problem.hint ? "cursor-not-allowed border-[var(--theme-border)] text-[var(--theme-text-muted)] opacity-40" : showHint ? "border-amber-400/40 bg-amber-400/10 text-amber-500" : "border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-text-muted)] hover:border-amber-400/40 hover:text-amber-500"}`}><Lightbulb size={16} /></button>
            </div>
            <div className="flex justify-end sm:justify-center">
                <button type="button" disabled={updating} onClick={handleToggle} aria-pressed={solved} aria-label={solved ? "Mark incomplete" : "Mark complete"} title={solved ? "Mark incomplete" : "Mark complete"} className={`flex h-9 w-9 items-center justify-center rounded-xl border transition disabled:cursor-wait disabled:opacity-60 ${solved ? "border-[var(--theme-accent)]/30 bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]" : "border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-text-muted)] hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)]"}`}>{updating ? <LoaderCircle size={16} className="animate-spin" /> : solved ? <Check size={17} /> : <Circle size={16} />}</button>
            </div>
        </div>
        {showHint && problem.hint && <div className="px-3 pb-4 sm:px-5"><div className="ml-8 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 sm:ml-12"><p className="text-xs leading-relaxed text-[var(--theme-text-secondary)]"><span className="mr-2 font-bold text-amber-500">Hint</span>{problem.hint}</p></div></div>}
    </article>;
};

export default ProblemRow;
