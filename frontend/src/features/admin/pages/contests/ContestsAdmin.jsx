import React, { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, ExternalLink, RefreshCw, Trophy } from "lucide-react";
import { getContests } from "../../../contests/api/contest.api";
import AdminLayout from "../../components/AdminLayout";
import AdminPageHeader from "../../components/AdminPageHeader";

export default function ContestsAdmin() {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getContests();
            setContests(Array.isArray(response?.data) ? response.data : []);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load upcoming contests.");
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => { load(); }, [load]);

    return <AdminLayout><div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        <AdminPageHeader title="Contests" description="Live upcoming contests from Codeforces, CodeChef, AtCoder, and LeetCode." action={load} actionLabel="Refresh contests" actionIcon={RefreshCw} />
        {error && <div role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error} <button type="button" onClick={load} className="ml-2 underline">Retry</button></div>}
        <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--theme-border)] px-4 py-3 sm:px-5"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500"><Trophy size={17} /></span><div><h2 className="text-sm font-bold text-[var(--theme-text)]">Upcoming contests</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">{loading ? "Checking contest calendars…" : `${contests.length} upcoming ${contests.length === 1 ? "event" : "events"}`}</p></div></div></div>
            {loading ? <p className="p-10 text-center text-sm text-[var(--theme-text-muted)]">Loading contests…</p> : contests.length ? <div className="divide-y divide-[var(--theme-border)]">{contests.map((contest) => { const starts = new Date(contest.startTime); const validStart = !Number.isNaN(starts.getTime()); return <article key={`${contest.platform}-${contest.name}-${contest.startTime}`} className="group flex flex-wrap items-center gap-3 px-4 py-4 transition-colors hover:bg-[var(--theme-hover)] sm:px-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><CalendarDays size={18} /></span>
                <div className="min-w-0 flex-1"><h2 className="truncate text-sm font-bold text-[var(--theme-text)]">{contest.name}</h2><div className="mt-1.5 flex flex-wrap items-center gap-2"><span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-2.5 py-1 text-[11px] font-semibold text-[var(--theme-text-secondary)]">{contest.platform}</span><span className="text-xs text-[var(--theme-text-muted)]">{contest.category}</span></div></div>
                <time className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--theme-surface-raised)] px-3 py-2 text-xs font-medium text-[var(--theme-text-secondary)]" dateTime={validStart ? starts.toISOString() : undefined}>{validStart ? starts.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Schedule unavailable"}</time>
                {contest.externalLink && <a href={contest.externalLink} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-xl border border-[var(--theme-border)] px-3 text-xs font-semibold text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-accent)]/40 hover:text-[var(--theme-accent)]">Open<ArrowUpRight size={14} /></a>}
            </article>; })}</div> : <div className="p-12 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-surface-raised)] text-[var(--theme-text-muted)]"><Trophy size={20} /></span><p className="mt-3 text-sm font-bold text-[var(--theme-text)]">No upcoming contests found</p><p className="mt-1 text-xs text-[var(--theme-text-muted)]">Refresh the contest feeds to check again.</p></div>}
        </section>
        <p className="mt-3 text-xs text-[var(--theme-text-muted)]">Contest schedules are supplied by the platform integrations and cannot be edited here.</p>
    </div></AdminLayout>;
}
