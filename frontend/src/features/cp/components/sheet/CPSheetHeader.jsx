import React from "react";
import { ArrowUpRight, Code2, Layers3, Trophy } from "lucide-react";

const CPSheetHeader = ({ selectedRating = 800, solved = 0, total = 0 }) => (
    <section className="relative mb-7 overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-xl shadow-black/5 sm:p-7 lg:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[var(--theme-accent)] opacity-[0.07] blur-3xl" />
        <div className="relative grid gap-7 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
            <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-accent)]">
                    <Code2 size={15} /> Competitive programming <ArrowUpRight size={13} />
                </div>
                <h1 className="text-3xl font-black tracking-tight text-[var(--theme-text)] sm:text-4xl lg:text-5xl">Build your CP streak.</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)] sm:text-base">
                    A focused Codeforces problem path, organized by rating. Choose a level, solve consistently, and watch your progress grow.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--theme-accent-soft)] px-3 py-2 text-xs font-medium text-[var(--theme-accent)]"><Layers3 size={14} />5 rating levels</span>
                    <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--theme-surface-raised)] px-3 py-2 text-xs font-medium text-[var(--theme-text-secondary)]"><Trophy size={14} />Community leaderboard</span>
                </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-4 md:block md:p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] md:mb-4"><Code2 size={24} /></div>
                <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-text-muted)]">Selected track</p>
                    <p className="mt-1 text-2xl font-black tracking-tight text-[var(--theme-text)]">{selectedRating}<span className="ml-2 text-sm font-medium text-[var(--theme-text-muted)]">rating</span></p>
                    <p className="mt-1 text-xs text-[var(--theme-text-muted)]">{solved} of {total} solved</p>
                </div>
                <div className="hidden h-1.5 overflow-hidden rounded-full bg-[var(--theme-surface-high)] md:block">
                    <div className="h-full rounded-full bg-[var(--theme-accent)] transition-[width] duration-500" style={{ width: `${total ? Math.min(100, Math.round((solved / total) * 100)) : 0}%` }} />
                </div>
            </div>
        </div>
    </section>
);

export default CPSheetHeader;
