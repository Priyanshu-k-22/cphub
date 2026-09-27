import React from "react";

import {
    CheckCircle2,
    UserPlus,
    Code2,
    CalendarDays
} from "lucide-react";

const activityIcons = {
    solve: CheckCircle2,
    user: UserPlus,
    cpProblem: Code2,
    dailyProblem: CalendarDays
};

const formatRelativeTime = (value) => {
    const timestamp = new Date(value).getTime();
    if (!Number.isFinite(timestamp)) return "Unknown time";

    const seconds = Math.round((timestamp - Date.now()) / 1000);
    const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
    if (Math.abs(seconds) < 60) return "just now";
    if (Math.abs(seconds) < 3600) return formatter.format(Math.round(seconds / 60), "minute");
    if (Math.abs(seconds) < 86400) return formatter.format(Math.round(seconds / 3600), "hour");
    if (Math.abs(seconds) < 604800) return formatter.format(Math.round(seconds / 86400), "day");
    return new Date(value).toLocaleDateString();
};

const RecentActivity = ({ events = [], loading = false }) => (
    <section className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#080D14]">
        <div className="border-b border-[#1C2734] px-4 py-3">
            <h2 className="text-xs font-semibold text-[#DCE4ED]">Recent Activity</h2>
            <p className="mt-0.5 text-[9px] text-[#556275]">Latest recorded platform events</p>
        </div>

        {loading ? (
            <p className="px-4 py-8 text-center font-mono text-[10px] text-[#556275]">Loading activity…</p>
        ) : events.length === 0 ? (
            <p className="px-4 py-8 text-center font-mono text-[10px] text-[#556275]">No activity recorded yet.</p>
        ) : (
            <div>
                {events.map((event) => {
                    const Icon = activityIcons[event.type] || Code2;
                    return (
                        <div key={event.id} className="flex items-center gap-3 border-b border-[#1C2734]/60 px-4 py-3 last:border-b-0">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0D151F] text-[#4AFFC4]">
                                <Icon size={13} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-[11px] text-[#B7C0CC]">{event.title}</p>
                                <p className="mt-0.5 truncate font-mono text-[8px] text-[#556275]">{event.detail}</p>
                            </div>
                            <time className="shrink-0 font-mono text-[8px] text-[#465364]" dateTime={event.occurredAt}>
                                {formatRelativeTime(event.occurredAt)}
                            </time>
                        </div>
                    );
                })}
            </div>
        )}
    </section>
);

export default RecentActivity;
