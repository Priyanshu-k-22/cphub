import React from "react";
import { Link } from "react-router-dom";

const DSAProgress = ({ progress, loading }) => {
    const solved = Number(progress?.solved) || 0;
    const total = Number(progress?.total) || 0;
    const percentage = total ? Math.min(100, Number(progress?.percentage) || 0) : 0;

    return (
        <section className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">DSA Progress</h2>
                <Link to="/dsa-sheet" className="font-mono text-sm text-[#4AFFC4] hover:text-white">Continue →</Link>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs uppercase text-[#556275]">Solved</p>
                    <p className="mt-1 text-lg font-semibold" aria-live="polite">{loading ? "…" : `${solved}/${total}`}</p>
                </div>
                <div>
                    <p className="text-xs uppercase text-[#556275]">Completion</p>
                    <p className="mt-1 text-lg font-semibold">{loading ? "…" : `${percentage}%`}</p>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <span className="truncate text-sm text-[#AEB9C7]">{progress?.currentTopic ? `Next: ${progress.currentTopic}` : total ? "All topics complete" : "No topics available"}</span>
                <div className="h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-[#111923]" role="progressbar" aria-label="DSA Sheet completion" aria-valuemin={0} aria-valuemax={total} aria-valuenow={solved}>
                    <div className="h-full rounded-full bg-[#4AFFC4] transition-[width]" style={{ width: `${percentage}%` }} />
                </div>
            </div>
        </section>
    );
};

export default DSAProgress;
