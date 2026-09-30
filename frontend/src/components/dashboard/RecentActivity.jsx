import React from "react";
import { BrainCircuit, CalendarCheck, Code2, History } from "lucide-react";
import { Link } from "react-router-dom";

const formatRelativeTime = (value) => {
    const timestamp = new Date(value).getTime();
    if (!Number.isFinite(timestamp)) return "";
    const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60_000));
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return days === 1 ? "yesterday" : `${days}d ago`;
};

const RecentActivity = ({ activity = [], loading, error }) => (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-600"><History size={19} /></span>
                <div><p className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Your progress</p><h2 className="text-base font-bold text-[var(--theme-text)]">Recent Activity</h2></div>
            </div>
            <Link to="/problems/history" className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-semibold text-[var(--theme-accent)] transition hover:bg-[var(--theme-hover)]">Daily history <span aria-hidden="true">→</span></Link>
        </div>

        {loading ? (
            <div className="mt-3 space-y-2" aria-label="Loading recent activity">
                {[1, 2, 3].map((key) => <div key={key} className="h-14 animate-pulse rounded-xl bg-[var(--theme-surface-high)]" />)}
            </div>
        ) : error ? (
            <p className="mt-3 text-sm text-red-500" role="alert">{error}</p>
        ) : activity.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-4 py-5 text-center">
                <CalendarCheck size={18} className="mx-auto text-[var(--theme-accent)]" />
                <p className="mt-2 text-sm font-semibold text-[var(--theme-text)]">Your journey starts here</p>
                <p className="mt-1 text-xs text-[var(--theme-text-muted)]">Complete a CP, DSA, or daily problem to see activity.</p>
            </div>
        ) : (
            <div className="mt-3 divide-y divide-[var(--theme-border)]">
                {activity.map((item) => (
                    <Link key={item.id} to={item.href || "/dashboard"} className="group flex items-center justify-between gap-3 rounded-xl px-2 py-3 transition hover:bg-[var(--theme-hover)]">
                        <div className="flex min-w-0 items-center gap-2.5">
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.type === "dsa" ? "bg-violet-500/10 text-violet-500" : item.type === "daily" ? "bg-amber-500/10 text-amber-600" : "bg-blue-500/10 text-blue-500"}`}>
                                {item.type === "dsa" ? <BrainCircuit size={17} /> : item.type === "daily" ? <CalendarCheck size={17} /> : <Code2 size={17} />}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[var(--theme-text)] group-hover:text-[var(--theme-accent)]">{item.title}</p>
                                <p className="truncate text-xs text-[var(--theme-text-muted)]">{item.detail}</p>
                            </div>
                        </div>
                        <time dateTime={item.occurredAt} className="shrink-0 font-mono text-xs text-[var(--theme-text-muted)]">{formatRelativeTime(item.occurredAt)}</time>
                    </Link>
                ))}
            </div>
        )}
    </section>
);

export default RecentActivity;
