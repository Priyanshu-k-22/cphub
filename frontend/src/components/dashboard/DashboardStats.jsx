import React from "react";
import { ArrowUpRight, Award, CheckCircle2, RefreshCw, Trophy } from "lucide-react";
import { CodeforcesMark, LeetCodeMark } from "./DashboardIcons";

const StatTile = ({ icon: Icon, label, value, detail }) => (
    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-3 transition hover:-translate-y-0.5 hover:border-[var(--theme-accent)]/40">
        <div className="flex items-center gap-2 text-[var(--theme-text-muted)]">
            <Icon size={15} className="text-[var(--theme-accent)]" />
            <span className="text-xs font-medium">{label}</span>
        </div>
        <p className="mt-2 truncate text-xl font-bold tracking-tight text-[var(--theme-text)]">{value}</p>
        <p className="mt-0.5 truncate text-xs text-[var(--theme-text-muted)]">{detail}</p>
    </div>
);

const DashboardStats = ({ codeforces, username, loading, syncing, onSync, syncError }) => {
    if (loading) {
        return <div className="grid min-h-56 grid-cols-2 gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 md:grid-cols-4" aria-label="Loading Codeforces stats">
            {[1, 2, 3, 4].map((key) => <div key={key} className="animate-pulse rounded-xl bg-[var(--theme-surface-high)]" />)}
        </div>;
    }

    const hasProfile = Boolean(codeforces);
    const handle = username || "your account";
    const rating = codeforces?.rating > 0 ? codeforces.rating : hasProfile ? "Unrated" : "—";
    const maxRating = codeforces?.maxRating > 0 ? codeforces.maxRating : "—";
    const solved = codeforces?.solvedProblems ?? "—";
    const contests = codeforces?.contestCount ?? "—";
    const rank = codeforces?.rank || (hasProfile ? "Unrated" : "—");
    const codeforcesUrl = `https://codeforces.com/profile/${encodeURIComponent(handle)}`;

    return (
        <section className="relative overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 shadow-[0_18px_55px_rgba(0,0,0,0.1)] sm:p-5">
            <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <CodeforcesMark className="h-12 w-12 rounded-2xl text-sm" />
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-lg font-bold text-[var(--theme-text)]">Codeforces</h2>
                                <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-2 py-0.5 text-[11px] font-medium text-[var(--theme-text-muted)]">Competitive programming</span>
                            </div>
                            <a href={codeforcesUrl} target="_blank" rel="noopener noreferrer" className="mt-0.5 inline-flex max-w-full items-center gap-1 truncate text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)]">
                                {handle}<ArrowUpRight size={13} />
                            </a>
                        </div>
                    </div>
                    <button type="button" onClick={onSync} disabled={syncing} className="inline-flex items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-2 text-sm font-semibold text-[var(--theme-accent)] transition hover:border-[var(--theme-accent)] hover:bg-[var(--theme-hover)] disabled:cursor-not-allowed disabled:opacity-60">
                        <RefreshCw size={15} className={syncing ? "animate-spin" : ""} />
                        {syncing ? "Syncing" : syncError ? "Retry sync" : "Sync"}
                    </button>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-[1.1fr_2fr]">
                    <div className="flex min-h-28 flex-col justify-center rounded-xl border border-blue-400/15 bg-gradient-to-br from-blue-500/10 via-[var(--theme-surface-raised)] to-[var(--theme-surface-raised)] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-text-muted)]">Current rating</p>
                        <div className="mt-1 flex items-end gap-2">
                            <span className="text-4xl font-black tracking-tight text-[var(--theme-text)]">{rating}</span>
                            <span className="mb-1 rounded-md bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-500">Best {maxRating}</span>
                        </div>
                        <p className="mt-1 text-xs text-[var(--theme-text-muted)]">{codeforces?.lastSyncedAt ? `Updated ${new Date(codeforces.lastSyncedAt).toLocaleString()}` : "Sync to load your profile"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        <StatTile icon={CheckCircle2} label="Solved" value={solved} detail="accepted problems" />
                        <StatTile icon={Trophy} label="Contests" value={contests} detail="participated" />
                        <StatTile icon={Award} label="Rank" value={rank} detail="current title" />
                    </div>
                </div>

                {syncError && <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-sm text-amber-500" role="alert">{syncError}{hasProfile ? " Showing your saved stats." : ""}</div>}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--theme-border)] pt-3">
                    <p className="text-xs text-[var(--theme-text-muted)]">Keep your competitive profile and practice stats in sync.</p>
                    <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-orange-400/20 bg-orange-500/5 px-3 py-2 text-sm font-semibold text-[var(--theme-text-secondary)] transition hover:border-orange-400/50 hover:bg-orange-500/10">
                        <LeetCodeMark className="h-7 w-7 rounded-lg" />
                        Practice on LeetCode
                        <ArrowUpRight size={14} className="text-orange-500" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DashboardStats;
