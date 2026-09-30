import React from "react";

const ProgressRow = ({ label, solved, total, loading }) => {
    const percent = total > 0 ? Math.min(100, (solved / total) * 100) : 0;
    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-[#AEB9C7]">{label}</span>
                <span className="font-mono text-xs text-[#EDF2F7]" aria-live="polite">
                    {loading ? "Loading…" : total === undefined ? `${solved} solved` : `${solved} / ${total}`}
                </span>
            </div>
            {total !== undefined && (
                <div
                    className="h-1.5 overflow-hidden rounded-full bg-[#111923]"
                    role="progressbar"
                    aria-label={`${label} solved today`}
                    aria-valuemin={0}
                    aria-valuemax={total}
                    aria-valuenow={solved}
                >
                    <div className="h-full rounded-full bg-[#4AFFC4] transition-[width]" style={{ width: `${percent}%` }} />
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
        <section className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-4" aria-labelledby="today-progress-title">
            <div className="flex items-center justify-between gap-3">
                <h2 id="today-progress-title" className="text-base font-semibold">Today</h2>
                <span className="font-mono text-sm font-semibold text-[#4AFFC4]" aria-live="polite">
                    {loading ? "…" : `${solvedTotal} solved`}
                </span>
            </div>

            <div className="mt-4 space-y-4">
                <ProgressRow label="CP Sheet" solved={values.cp} loading={loading} />
                <ProgressRow label="DSA Sheet" solved={values.dsa} loading={loading} />
                <ProgressRow label="Daily Problems" solved={values.daily.solved} total={values.daily.total} loading={loading} />
            </div>
        </section>
    );
};

export default TodayProgress;
