import React from "react";
import { ArrowUpRight, CalendarDays, Clock3, Trophy } from "lucide-react";

const formatContestDate = (date) => new Date(date).toLocaleString("en-IN", {
    weekday: "short", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true,
});

const timeUntil = (date) => {
    const remaining = new Date(date).getTime() - Date.now();
    if (!Number.isFinite(remaining) || remaining <= 0) return "Starting soon";
    const minutes = Math.floor(remaining / 60_000);
    if (minutes < 60) return `In ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `In ${hours} hr${hours === 1 ? "" : "s"}`;
    const days = Math.floor(hours / 24);
    return `In ${days} day${days === 1 ? "" : "s"}`;
};

const ContestLink = ({ contest, featured = false }) => (
    <a href={contest.externalLink} target="_blank" rel="noopener noreferrer" className={featured
        ? "group relative block overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-[var(--theme-surface-raised)] to-[var(--theme-surface-raised)] p-4 transition hover:border-[var(--theme-accent)]"
        : "group flex items-center justify-between gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-3 transition hover:border-[var(--theme-accent)] hover:bg-[var(--theme-hover)]"}>
        {featured ? (
            <>
                <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600"><Trophy size={13} /> NEXT CONTEST</span>
                    <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--theme-accent)]">{timeUntil(contest.startTime)}</span>
                </div>
                <p className="mt-3 line-clamp-2 text-base font-bold text-[var(--theme-text)] group-hover:text-[var(--theme-accent)]">{contest.name}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--theme-text-secondary)]"><CalendarDays size={14} />{formatContestDate(contest.startTime)}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--theme-accent)]">{contest.platform} <ArrowUpRight size={14} /></span>
                </div>
            </>
        ) : (
            <>
                <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--theme-surface-high)] text-[var(--theme-text-muted)]"><Clock3 size={16} /></span>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[var(--theme-text)] group-hover:text-[var(--theme-accent)]">{contest.name}</p>
                        <p className="mt-0.5 truncate text-xs text-[var(--theme-text-muted)]">{contest.platform} · {formatContestDate(contest.startTime)}</p>
                    </div>
                </div>
                <ArrowUpRight size={16} className="shrink-0 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)]" />
            </>
        )}
    </a>
);

const UpcomingContests = ({ contests = [], loading, error }) => (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-500/10 text-amber-500"><Trophy size={19} /></span>
                <div><p className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Compete and grow</p><h2 className="text-base font-bold text-[var(--theme-text)]">Upcoming Contests</h2></div>
            </div>
            <span className="rounded-full bg-[var(--theme-accent-soft)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--theme-accent)]">{contests.length ? `NEXT ${Math.min(contests.length, 3)}` : "UPCOMING"}</span>
        </div>

        {loading ? (
            <div className="mt-4 space-y-2" aria-label="Loading upcoming contests">{[1, 2].map((key) => <div key={key} className="h-16 animate-pulse rounded-xl bg-[var(--theme-surface-high)]" />)}</div>
        ) : error ? (
            <p className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-500" role="status">{error}</p>
        ) : contests.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-4 py-5 text-center">
                <CalendarDays size={18} className="mx-auto text-[var(--theme-accent)]" />
                <p className="mt-2 text-sm font-semibold text-[var(--theme-text)]">No upcoming contests</p>
                <p className="mt-1 text-xs text-[var(--theme-text-muted)]">Check back soon for your next challenge.</p>
            </div>
        ) : (
            <div className="mt-4 space-y-2.5">
                <ContestLink contest={contests[0]} featured />
                {contests.slice(1, 3).map((contest) => <ContestLink key={`${contest.name}-${contest.startTime}`} contest={contest} />)}
            </div>
        )}
    </section>
);

export default UpcomingContests;
