import React from "react";
import { BrainCircuit, CalendarCheck, Code2, Sparkles } from "lucide-react";

const ProgressRow = ({ icon: Icon, label, solved, total, loading }) => {
    const percent = total > 0 ? Math.min(100, (solved / total) * 100) : 0;
    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--theme-text-secondary)]"><Icon size={15} className="text-[var(--theme-accent)]" />{label}</span>
                <span className="font-mono text-sm font-semibold text-[var(--theme-text)]" aria-live="polite">
                    {loading ? "Loading…" : total === undefined ? `${solved} solved` : `${solved} / ${total}`}
                </span>
            </div>
            {total !== undefined && (
                <div
                    className="h-1.5 overflow-hidden rounded-full bg-[var(--theme-surface-high)]"
                    role="progressbar"
                    aria-label={`${label} solved today`}
                    aria-valuemin={0}
                    aria-valuemax={total}
                    aria-valuenow={solved}
                >
                    <div className="h-full rounded-full bg-gradient-to-r from-[#25C997] to-[#4AFFC4] transition-[width] duration-500" style={{ width: `${percent}%` }} />
                </div>
            )}
        </div>
    );
};

const TodayProgress = ({ progress, loading }) => {
    const values = {
        cp: Number(progress?.cp?.solved) || 0,
        dsa: Number(progress?.dsa?.solved) || 0,
        daily: { solved: Number(progress?.daily?.solved) || 0, total: Number(progress?.daily?.total) || 0 },
    };
    const solvedTotal = values.cp + values.dsa + values.daily.solved;

    return (
        <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5" aria-labelledby="today-progress-title">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-500"><Sparkles size={19} /></span>
                    <div><p className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Daily activity</p><h2 id="today-progress-title" className="text-base font-bold text-[var(--theme-text)]">Today</h2></div>
                </div>
                <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 font-mono text-sm font-bold text-[var(--theme-accent)]" aria-live="polite">
                    {loading ? "…" : `${solvedTotal} solved`}
                </span>
            </div>

            <div className="mt-5 space-y-4">
                <ProgressRow icon={Code2} label="CP Sheet" solved={values.cp} loading={loading} />
                <ProgressRow icon={BrainCircuit} label="DSA Sheet" solved={values.dsa} loading={loading} />
                <ProgressRow icon={CalendarCheck} label="Daily Problems" solved={values.daily.solved} total={values.daily.total} loading={loading} />
            </div>
        </section>
    );
};

export default TodayProgress;
