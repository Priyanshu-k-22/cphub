import React from "react";
import { Activity, CalendarDays, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";

const DashboardHeader = ({ user, generatedAt, loading, refreshing, onRefresh }) => {
    const name = user?.username || user?.name || "Admin";
    const updated = generatedAt && Number.isFinite(new Date(generatedAt).getTime())
        ? new Date(generatedAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })
        : "Awaiting first sync";
    const date = new Date().toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" });

    return (
        <header className="relative mb-5 overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.12)] sm:p-7 lg:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full bg-[var(--theme-accent)]/10 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-1/4 h-px w-2/3 bg-gradient-to-r from-transparent via-[var(--theme-accent)]/40 to-transparent" />
            <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
                <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-text-secondary)]">
                        <ShieldCheck size={14} className="text-[var(--theme-accent)]" /> CpHub control center
                    </div>
                    <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--theme-text)] sm:text-4xl">Welcome back, {name}</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)] sm:text-base">Your platform at a glance. Keep the community, learning tracks, and daily challenges running smoothly.</p>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-3 sm:flex-row sm:items-center sm:justify-between lg:min-w-[340px]">
                    <div className="flex items-center gap-3 px-1">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><CalendarDays size={19} /></span>
                        <div>
                            <p className="text-sm font-bold text-[var(--theme-text)]">{date}</p>
                            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--theme-text-muted)]"><Activity size={12} />{loading ? "Loading overview" : `Updated ${updated}`}</p>
                        </div>
                    </div>
                    <button type="button" onClick={onRefresh} disabled={loading || refreshing} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-4 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-105 hover:shadow-emerald-500/30 disabled:cursor-wait disabled:opacity-60">
                        <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
                        {refreshing ? "Refreshing" : "Refresh data"}
                    </button>
                </div>
            </div>
            <div className="relative mt-6 flex items-center gap-2 text-xs font-medium text-[var(--theme-text-muted)]"><Sparkles size={14} className="text-[var(--theme-accent)]" /> Live insights from your CpHub workspace</div>
        </header>
    );
};

export default DashboardHeader;
