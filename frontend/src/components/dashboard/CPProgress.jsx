import React from "react";
import { Link } from "react-router-dom";

const CPProgress = ({ codeforces, progress, loading }) => {
    const rating = codeforces?.rating > 0 ? codeforces.rating : codeforces ? "Unrated" : "—";
    const solved = Number(progress?.solved) || 0;
    const total = Number(progress?.total) || 0;
    const percentage = total ? Math.min(100, Number(progress?.percentage) || 0) : 0;

    return (
        <section className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">CP Progress</h2>
                <Link to="/cp-sheet" className="font-mono text-sm text-[#4AFFC4] transition hover:text-white">Continue →</Link>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs uppercase text-[#556275]">Codeforces rating</p>
                    <p className="mt-1 text-lg font-semibold">{loading && !codeforces ? "…" : rating}</p>
                </div>
                <div>
                    <p className="text-xs uppercase text-[#556275]">Sheet solved</p>
                    <p className="mt-1 text-lg font-semibold" aria-live="polite">{loading ? "…" : `${solved}/${total}`}</p>
                </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#111923]" role="progressbar" aria-label="CP Sheet completion" aria-valuemin={0} aria-valuemax={total} aria-valuenow={solved}>
                <div className="h-full rounded-full bg-[#4AFFC4] transition-[width]" style={{ width: `${percentage}%` }} />
            </div>
        </section>
    );
};

export default CPProgress;
