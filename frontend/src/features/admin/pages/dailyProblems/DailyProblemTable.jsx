import { CalendarDays, CircleDashed, ListChecks } from "lucide-react";
import DailyProblemRow from "./DailyProblemRow.jsx";

const columns = ["#", "Problem", "Category", "Difficulty", "Platform", "Daily date", "Status", "Actions"];

const DailyProblemTable = ({ filteredProblems = [], loading, page, pageSize, onEdit, onDelete }) => (
    <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]" aria-label="Daily problems">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--theme-border)] px-4 py-4 sm:px-5">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><ListChecks size={18} /></span><div><h2 className="text-sm font-bold text-[var(--theme-text)]">Problem library</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Edit details, update status, or remove a challenge</p></div></div>
            {!loading && <span className="hidden rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-text-secondary)] sm:inline-flex">{filteredProblems.length} on this page</span>}
        </div>
        <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left">
                <thead><tr className="border-b border-[var(--theme-border)] bg-[var(--theme-surface-raised)]">{columns.map((column) => <th key={column} className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] ${column === "Actions" ? "text-right" : ""}`}>{column}</th>)}</tr></thead>
                <tbody>
                    {loading ? Array.from({ length: 5 }, (_, index) => <tr key={`skeleton-${index}`} className="border-b border-[var(--theme-border)] last:border-0">{columns.map((column, cell) => <td key={column} className="px-4 py-4"><div className={`h-8 animate-pulse rounded-lg bg-[var(--theme-surface-high)] ${cell === 1 ? "w-56" : "w-16"}`} /></td>)}</tr>)
                        : filteredProblems.length === 0 ? <tr><td colSpan={columns.length} className="px-6 py-16 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-surface-raised)] text-[var(--theme-text-muted)]"><CalendarDays size={20} /></span><p className="mt-4 text-sm font-bold text-[var(--theme-text)]">No daily problems found</p><p className="mt-1 text-xs text-[var(--theme-text-muted)]">Try another category or add a new challenge.</p></td></tr>
                            : filteredProblems.map((problem, index) => <DailyProblemRow key={problem._id} problem={problem} index={index} page={page} pageSize={pageSize} onEdit={onEdit} onDelete={onDelete} />)}
                </tbody>
            </table>
        </div>
        {!loading && filteredProblems.length > 0 && <div className="flex items-center gap-2 border-t border-[var(--theme-border)] px-4 py-3 text-xs text-[var(--theme-text-muted)] sm:px-5"><CircleDashed size={13} className="text-[var(--theme-accent)]" />Select a row action to update this challenge</div>}
    </section>
);

export default DailyProblemTable;
