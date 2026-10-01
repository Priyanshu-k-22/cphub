import { Code2, Edit3, ExternalLink, Lightbulb, ListChecks, Trash2 } from "lucide-react";

const CPSheetProblemTable = ({ loading, problems = [], rating, onEdit, onDelete }) => (
    <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]" aria-label={`Codeforces problems rated ${rating}`}>
        <div className="flex items-center justify-between gap-3 border-b border-[var(--theme-border)] px-4 py-4 sm:px-5">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><ListChecks size={18} /></span><div><h2 className="text-sm font-bold text-[var(--theme-text)]">Rating {rating} problem set</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Curated Codeforces practice for this track</p></div></div>
            <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-bold tabular-nums text-[var(--theme-text-secondary)]">{problems.length} <span className="font-medium text-[var(--theme-text-muted)]">/ 50</span></span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left">
                <thead><tr className="border-b border-[var(--theme-border)] bg-[var(--theme-surface-raised)]">{["Order", "Problem", "Codeforces ID", "Rating", "Hint", "Actions"].map((label) => <th key={label} className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] ${label === "Actions" ? "text-right" : ""}`}>{label}</th>)}</tr></thead>
                <tbody>
                    {loading ? Array.from({ length: 5 }, (_, index) => <tr key={`skeleton-${index}`} className="border-b border-[var(--theme-border)] last:border-0">{[0, 1, 2, 3, 4, 5].map((cell) => <td key={cell} className="px-4 py-4"><div className={`h-8 animate-pulse rounded-lg bg-[var(--theme-surface-high)] ${cell === 1 ? "w-52" : "w-16"}`} /></td>)}</tr>)
                        : problems.length === 0 ? <tr><td colSpan={6} className="px-6 py-16 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-surface-raised)] text-[var(--theme-text-muted)]"><Code2 size={20} /></span><p className="mt-4 text-sm font-bold text-[var(--theme-text)]">This rating track is ready for problems</p><p className="mt-1 text-xs text-[var(--theme-text-muted)]">Add the first Codeforces challenge to start this set.</p></td></tr>
                            : problems.map((problem, index) => {
                                const [, contestId, problemIndex] = String(problem.codeforcesId || "").match(/^(\d+)\/?([A-Z]\d*)$/) || [];
                                return <tr key={problem._id} className="group border-b border-[var(--theme-border)] last:border-0 transition-colors hover:bg-[var(--theme-hover)]">
                                <td className="w-20 px-4 py-4"><span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--theme-surface-high)] text-xs font-bold tabular-nums text-[var(--theme-text-muted)]">{String(problem.order || index + 1).padStart(2, "0")}</span></td>
                                <td className="max-w-[330px] px-4 py-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Code2 size={17} /></span><span className="truncate text-sm font-bold text-[var(--theme-text)]">{problem.title}</span></div></td>
                                <td className="px-4 py-4">{contestId && problemIndex ? <a href={`https://codeforces.com/problemset/problem/${contestId}/${problemIndex}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-2.5 py-1.5 font-mono text-xs font-semibold text-[var(--theme-accent)] transition hover:border-[var(--theme-accent)]/35">{problem.codeforcesId}<ExternalLink size={12} /></a> : <span className="font-mono text-xs text-[var(--theme-text-secondary)]">{problem.codeforcesId || "—"}</span>}</td>
                                <td className="px-4 py-4"><span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs font-bold tabular-nums text-violet-500">{problem.rating}</span></td>
                                <td className="max-w-[230px] px-4 py-4">{problem.hint ? <span title={problem.hint} className="inline-flex max-w-full items-center gap-2 text-xs text-[var(--theme-text-secondary)]"><Lightbulb size={14} className="shrink-0 text-amber-500" /><span className="truncate">{problem.hint}</span></span> : <span className="text-xs text-[var(--theme-text-muted)]">No hint</span>}</td>
                                <td className="px-4 py-4"><div className="flex justify-end gap-1.5"><button type="button" onClick={() => onEdit(problem)} aria-label={`Edit ${problem.title}`} title="Edit problem" className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--theme-text-muted)] transition hover:border-[var(--theme-accent)]/25 hover:bg-[var(--theme-accent-soft)] hover:text-[var(--theme-accent)]"><Edit3 size={15} /></button><button type="button" onClick={() => onDelete(problem)} aria-label={`Delete ${problem.title}`} title="Delete problem" className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--theme-text-muted)] transition hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-500"><Trash2 size={15} /></button></div></td>
                                </tr>;
                            })}
                </tbody>
            </table>
        </div>
    </section>
);

export default CPSheetProblemTable;
