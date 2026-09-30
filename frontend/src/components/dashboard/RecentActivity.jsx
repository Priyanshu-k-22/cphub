import React from "react";
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
    <section className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-4">
        <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Recent Activity</h2>
            <Link to="/problems/history" className="font-mono text-sm text-[#4AFFC4] hover:text-white">Daily history →</Link>
        </div>

        {loading ? (
            <div className="mt-3 space-y-2" aria-label="Loading recent activity">
                {[1, 2, 3].map((key) => <div key={key} className="h-10 animate-pulse rounded bg-[#111923]" />)}
            </div>
        ) : error ? (
            <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>
        ) : activity.length === 0 ? (
            <p className="mt-3 rounded-lg bg-[#080D14] px-3 py-4 text-sm text-[#6B7788]">Your completed problems will appear here.</p>
        ) : (
            <div className="mt-2 divide-y divide-[#1C2734]">
                {activity.map((item) => (
                    <Link key={item.id} to={item.href || "/dashboard"} className="flex items-center justify-between gap-3 py-3 hover:text-[#4AFFC4]">
                        <div className="flex min-w-0 items-center gap-2.5">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4AFFC4]/10 text-xs font-semibold text-[#4AFFC4]">✓</span>
                            <div className="min-w-0">
                                <p className="truncate text-sm text-[#AEB9C7]">{item.title}</p>
                                <p className="truncate text-xs text-[#6B7788]">{item.detail}</p>
                            </div>
                        </div>
                        <time dateTime={item.occurredAt} className="shrink-0 font-mono text-xs text-[#6B7788]">{formatRelativeTime(item.occurredAt)}</time>
                    </Link>
                ))}
            </div>
        )}
    </section>
);

export default RecentActivity;
