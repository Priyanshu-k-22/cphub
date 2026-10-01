import React, { useEffect, useState } from "react";
import { Activity, ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Code2, UserPlus } from "lucide-react";

const activityIcons = { solve: CheckCircle2, user: UserPlus, cpProblem: Code2, dailyProblem: CalendarDays };
const EMPTY_EVENTS = [];
const formatRelativeTime = (value) => {
    const timestamp = new Date(value).getTime();
    if (!Number.isFinite(timestamp)) return "Time unavailable";
    const seconds = Math.round((timestamp - Date.now()) / 1000);
    const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
    if (Math.abs(seconds) < 60) return "just now";
    if (Math.abs(seconds) < 3600) return formatter.format(Math.round(seconds / 60), "minute");
    if (Math.abs(seconds) < 86400) return formatter.format(Math.round(seconds / 3600), "hour");
    if (Math.abs(seconds) < 604800) return formatter.format(Math.round(seconds / 86400), "day");
    return new Date(value).toLocaleDateString();
};

const PAGE_SIZE = 3;

const RecentActivity = ({ events = EMPTY_EVENTS, loading = false }) => {
    const [page, setPage] = useState(0);
    const pageCount = Math.ceil(events.length / PAGE_SIZE);
    const pageEvents = events.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    useEffect(() => setPage(0), [events]);

    return <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]" aria-labelledby="admin-activity-title">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--theme-border)] px-4 py-4 sm:px-5">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Activity size={18} /></span>
                <div><h2 id="admin-activity-title" className="text-base font-bold text-[var(--theme-text)]">Recent activity</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Latest events across your platform</p></div>
            </div>
            {!loading && <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-2.5 py-1 text-xs font-semibold text-[var(--theme-text-secondary)]">{events.length} total</span>}
        </div>
        {loading ? <div className="space-y-3 p-5" aria-label="Loading recent activity">{[1, 2, 3].map((item) => <div key={item} className="h-[76px] animate-pulse rounded-xl bg-[var(--theme-surface-high)]" />)}</div>
            : events.length === 0 ? <div className="px-5 py-12 text-center"><span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--theme-surface-raised)] text-[var(--theme-text-muted)]"><Activity size={19} /></span><p className="mt-3 text-sm font-semibold text-[var(--theme-text)]">No activity yet</p><p className="mt-1 text-xs text-[var(--theme-text-muted)]">New platform events will show up here.</p></div>
                : <>
                    <div className="space-y-2.5 p-3 sm:p-4" aria-live="polite">
                        {pageEvents.map((event, index) => {
                            const Icon = activityIcons[event.type] || Code2;
                            const itemNumber = page * PAGE_SIZE + index + 1;
                            return <article key={event.id} className="group flex min-h-[76px] items-center gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-3 transition duration-200 hover:border-[var(--theme-accent)]/35 hover:shadow-sm sm:gap-4 sm:px-4">
                                <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--theme-surface-high)] text-xs font-bold tabular-nums text-[var(--theme-text-muted)] sm:flex">{String(itemNumber).padStart(2, "0")}</span>
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--theme-accent)]/15 bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] transition group-hover:scale-105"><Icon size={18} /></span>
                                <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[var(--theme-text)]">{event.title}</p><p className="mt-1 truncate text-xs text-[var(--theme-text-secondary)]">{event.detail}</p></div>
                                <time className="shrink-0 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] px-2 py-1 text-[10px] font-semibold text-[var(--theme-text-muted)] sm:text-xs" dateTime={event.occurredAt}>{formatRelativeTime(event.occurredAt)}</time>
                            </article>;
                        })}
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-[var(--theme-border)] px-4 py-3 sm:px-5">
                        <p className="text-xs text-[var(--theme-text-muted)]">Showing <span className="font-semibold text-[var(--theme-text-secondary)]">{page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, events.length)}</span> of {events.length}</p>
                        <div className="flex items-center gap-2">
                            <span className="mr-1 text-xs tabular-nums text-[var(--theme-text-muted)]">{page + 1} / {pageCount}</span>
                            <button type="button" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0} aria-label="Previous activity page" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-accent)]/40 hover:text-[var(--theme-accent)] disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={15} /></button>
                            <button type="button" onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))} disabled={page >= pageCount - 1} aria-label="Next activity page" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-accent)]/40 hover:text-[var(--theme-accent)] disabled:cursor-not-allowed disabled:opacity-40"><ArrowRight size={15} /></button>
                        </div>
                    </div>
                </>}
    </section>;
};

export default RecentActivity;
