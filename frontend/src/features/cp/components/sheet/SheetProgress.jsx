import React from "react";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";

const SheetProgress = ({ solved = 0, total = 0, rating = 800 }) => {
    const percentage = total > 0 ? Math.min(100, Math.round((solved / total) * 100)) : 0;
    return <section className="mb-6 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Target size={21} /></span>
                <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-text-muted)]">Track progress <span className="normal-case tracking-normal">· {rating} rating</span></p><p className="mt-1 flex items-baseline gap-1.5 text-2xl font-black tracking-tight text-[var(--theme-text)]" aria-live="polite">{solved}<span className="text-sm font-semibold text-[var(--theme-text-muted)]">/ {total} solved</span></p></div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-2"><TrendingUp size={16} className="text-[var(--theme-accent)]" /><span className="text-lg font-black text-[var(--theme-text)]">{percentage}%</span><span className="text-xs text-[var(--theme-text-muted)]">complete</span></div>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[var(--theme-surface-high)]" role="progressbar" aria-label={`${rating} rating CP Sheet completion`} aria-valuemin={0} aria-valuemax={total} aria-valuenow={solved}>
            <div className="h-full rounded-full bg-gradient-to-r from-[#25C997] to-[var(--theme-accent)] transition-[width] duration-700" style={{ width: `${percentage}%` }} />
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--theme-text-muted)]"><CheckCircle2 size={13} className="text-[var(--theme-accent)]" />Mark problems as solved to keep your sheet progress up to date.</p>
    </section>;
};

export default SheetProgress;
