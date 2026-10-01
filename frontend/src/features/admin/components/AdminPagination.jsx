import { ArrowLeft, ArrowRight } from "lucide-react";

const AdminPagination = ({ page, pageSize, total, totalPages, loading, onPageChange, noun = "items" }) => (
    <nav aria-label={`${noun} pagination`} className="mt-4 flex flex-col gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <span className="text-xs text-[var(--theme-text-muted)]">{total ? <><strong className="font-bold text-[var(--theme-text)]">{(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)}</strong> of {Number(total).toLocaleString()} {noun}</> : `No ${noun}`}</span>
        <div className="flex items-center justify-between gap-2 sm:justify-end">
            <button type="button" disabled={loading || page <= 1} onClick={() => onPageChange(page - 1)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 text-xs font-semibold text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-accent)]/35 hover:text-[var(--theme-accent)] disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={14} /><span>Previous</span></button>
            <span className="min-w-16 text-center text-xs font-semibold tabular-nums text-[var(--theme-text-muted)]">{page} / {Math.max(1, totalPages)}</span>
            <button type="button" disabled={loading || page >= totalPages} onClick={() => onPageChange(page + 1)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 text-xs font-semibold text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-accent)]/35 hover:text-[var(--theme-accent)] disabled:cursor-not-allowed disabled:opacity-40"><span>Next</span><ArrowRight size={14} /></button>
        </div>
    </nav>
);

export default AdminPagination;
