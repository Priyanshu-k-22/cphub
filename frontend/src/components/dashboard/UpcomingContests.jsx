import React from "react";
import { ExternalLink } from "lucide-react";

const formatContestDate = (date) => new Date(date).toLocaleString("en-IN", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true,
});

const UpcomingContests = ({ contests = [], loading, error }) => (
    <section className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-4">
        <div className="flex items-center justify-between gap-3">
            <div>
                <h2 className="text-base font-semibold">Upcoming Contests</h2>
                <p className="mt-1 text-sm text-[#6B7788]">Your next three contests</p>
            </div>
            <span className="rounded-full bg-[#4AFFC4]/10 px-2.5 py-1 font-mono text-xs text-[#4AFFC4]">NEXT 3</span>
        </div>

        {loading ? (
            <div className="mt-4 space-y-2" aria-label="Loading upcoming contests">
                {[1, 2, 3].map((key) => <div key={key} className="h-14 animate-pulse rounded-lg bg-[#111923]" />)}
            </div>
        ) : error ? (
            <p className="mt-4 text-sm text-red-400" role="alert">{error}</p>
        ) : contests.length === 0 ? (
            <p className="mt-4 rounded-lg bg-[#080D14] px-3 py-4 text-sm text-[#6B7788]">No upcoming contests found.</p>
        ) : (
            <div className="mt-4 space-y-2">
                {contests.map((contest, index) => (
                    <a key={`${contest.name}-${contest.startTime}-${index}`} href={contest.externalLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 rounded-lg border border-[#1C2734] bg-[#080D14] px-3 py-2.5 transition hover:border-[#4AFFC4]/40 hover:bg-[#0D151F]">
                        <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#111923] font-mono text-xs text-[#6B7788]">{index + 1}</span>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-[#EDF2F7] group-hover:text-[#4AFFC4]">{contest.name}</p>
                                <p className="mt-0.5 truncate text-xs text-[#6B7788]">{contest.platform} · {contest.category}</p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            <time dateTime={contest.startTime} className="hidden font-mono text-xs text-[#6B7788] sm:block">{formatContestDate(contest.startTime)}</time>
                            <ExternalLink size={14} className="text-[#6B7788] group-hover:text-[#4AFFC4]" />
                        </div>
                    </a>
                ))}
            </div>
        )}
    </section>
);

export default UpcomingContests;
