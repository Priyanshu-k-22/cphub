import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const TodayProblems = ({ problems = [], loading, error, onRetry }) => (
    <section className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-4" aria-labelledby="today-problems-title">
        <div className="flex items-center justify-between gap-3">
            <div>
                <h2 id="today-problems-title" className="text-base font-semibold">Today’s Problems</h2>
                <p className="mt-1 text-sm text-[#6B7788]">Open each problem in CpHub to track your solve.</p>
            </div>
            <span className="shrink-0 rounded-full bg-[#4AFFC4]/10 px-2.5 py-1 font-mono text-xs text-[#4AFFC4]">{problems.length} today</span>
        </div>

        {loading ? (
            <div className="mt-4 space-y-2" aria-label="Loading today’s problems">
                {[1, 2].map((key) => <div key={key} className="h-14 animate-pulse rounded-lg bg-[#111923]" />)}
            </div>
        ) : error ? (
            <div className="mt-4 rounded-lg border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-400" role="alert">
                <p>{error}</p>
                <button type="button" onClick={onRetry} className="mt-2 underline underline-offset-2">Retry</button>
            </div>
        ) : problems.length === 0 ? (
            <p className="mt-4 rounded-lg bg-[#080D14] px-3 py-4 text-sm text-[#6B7788]">No published problems for today yet.</p>
        ) : (
            <div className="mt-4 space-y-2">
                {problems.map((problem) => {
                    const metadata = problem.category === "DSA"
                        ? problem.difficulty
                        : problem.rating ? `${problem.rating} rating` : problem.difficulty;
                    return (
                        <Link
                            key={problem._id}
                            to={`/problems/${problem._id}`}
                            className="group flex items-center justify-between gap-3 rounded-lg border border-[#1C2734] bg-[#080D14] px-3 py-2.5 transition hover:border-[#4AFFC4]/40 hover:bg-[#0D151F]"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="shrink-0 rounded bg-[#4AFFC4]/10 px-2 py-1 font-mono text-xs uppercase text-[#4AFFC4]">{problem.category}</span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-[#EDF2F7] group-hover:text-[#4AFFC4]">{problem.title}</p>
                                    <p className="mt-0.5 truncate text-xs text-[#6B7788]">{problem.platform}{metadata ? ` · ${metadata}` : ""}</p>
                                </div>
                            </div>
                            {problem.solved
                                ? <span className="flex shrink-0 items-center gap-1 text-xs text-[#4AFFC4]"><Check size={15} /> Solved</span>
                                : <ArrowRight size={16} className="shrink-0 text-[#6B7788] transition group-hover:text-[#4AFFC4]" />}
                        </Link>
                    );
                })}
            </div>
        )}
    </section>
);

export default TodayProblems;
