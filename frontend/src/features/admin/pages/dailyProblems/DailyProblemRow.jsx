import { CalendarDays, Code2, Edit3, ExternalLink, Trash2 } from "lucide-react";

const difficultyStyles = {
    Easy: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
    Medium: "border-amber-500/20 bg-amber-500/10 text-amber-500",
    Hard: "border-rose-500/20 bg-rose-500/10 text-rose-500"
};

const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const DailyProblemRow = ({ problem, index, page, pageSize, onEdit, onDelete }) => (
    <tr className="group border-b border-[var(--theme-border)] last:border-0 transition-colors hover:bg-[var(--theme-hover)]">
        <td className="w-14 px-4 py-4 text-center"><span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--theme-surface-high)] text-xs font-bold tabular-nums text-[var(--theme-text-muted)]">{String((page - 1) * pageSize + index + 1).padStart(2, "0")}</span></td>
        <td className="max-w-[360px] px-4 py-4">
            <div className="flex min-w-0 items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Code2 size={17} /></span>
                <div className="min-w-0"><p className="truncate text-sm font-bold text-[var(--theme-text)]">{problem.title}</p><div className="mt-1 flex items-center gap-2 text-xs text-[var(--theme-text-muted)]"><span className="truncate">{problem.slug || "Daily challenge"}</span>{problem.rating != null && <><span aria-hidden="true">·</span><span>Rating {problem.rating}</span></>}</div></div>
            </div>
        </td>
        <td className="px-4 py-4"><span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${problem.category === "CP" ? "border-violet-500/20 bg-violet-500/10 text-violet-500" : "border-blue-500/20 bg-blue-500/10 text-blue-500"}`}>{problem.category}</span></td>
        <td className="px-4 py-4"><span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${difficultyStyles[problem.difficulty] || "border-[var(--theme-border)] bg-[var(--theme-surface-high)] text-[var(--theme-text-secondary)]"}`}>{problem.difficulty || "—"}</span></td>
        <td className="px-4 py-4"><a href={problem.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-36 items-center gap-1.5 truncate text-xs font-semibold text-[var(--theme-text-secondary)] transition hover:text-[var(--theme-accent)]"><span className="truncate">{problem.platform || "—"}</span>{problem.externalLink && <ExternalLink size={12} className="shrink-0" />}</a></td>
        <td className="px-4 py-4"><span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[var(--theme-text-secondary)]"><CalendarDays size={13} className="text-[var(--theme-text-muted)]" />{formatDate(problem.dailyDate)}</span></td>
        <td className="px-4 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${problem.isPublished ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}><span className={`h-1.5 w-1.5 rounded-full ${problem.isPublished ? "bg-emerald-500" : "bg-amber-500"}`} />{problem.isPublished ? "Published" : "Draft"}</span></td>
        <td className="px-4 py-4"><div className="flex justify-end gap-1.5">
            <button type="button" onClick={() => onEdit(problem)} aria-label={`Edit ${problem.title}`} title="Edit problem" className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--theme-text-muted)] transition hover:border-[var(--theme-accent)]/25 hover:bg-[var(--theme-accent-soft)] hover:text-[var(--theme-accent)]"><Edit3 size={15} /></button>
            <button type="button" onClick={() => onDelete(problem)} aria-label={`Delete ${problem.title}`} title="Delete problem" className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--theme-text-muted)] transition hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-500"><Trash2 size={15} /></button>
        </div></td>
    </tr>
);

export default DailyProblemRow;
