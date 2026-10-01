import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, RefreshCw, Trophy } from "lucide-react";
import { getLeaderboard } from "../api/leaderboard.api.js";
import { useAuth } from "../../auth/context/AuthContext.jsx";

const placeColor = (rank) => {
    if (rank === 1) return "border-amber-400/30 bg-amber-400/10 text-amber-500";
    if (rank === 2) return "border-slate-400/30 bg-slate-400/10 text-slate-500";
    if (rank === 3) return "border-orange-500/30 bg-orange-500/10 text-orange-600";
    return "border-[var(--theme-border)] bg-[var(--theme-surface-high)] text-[var(--theme-text-muted)]";
};

const SheetLeaderboard = ({ type = "cp-sheet", label = "CP", refreshSignal = 0 }) => {
    const { user } = useAuth();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let active = true;
        setLoading(true);
        setError("");
        getLeaderboard({ type, period: "all-time", page: 1, limit: 8 })
            .then((response) => {
                if (!active) return;
                const data = response?.data?.data || response?.data || {};
                setRows(Array.isArray(data.leaderboard) ? data.leaderboard : []);
            })
            .catch((requestError) => {
                if (!active) return;
                setRows([]);
                setError(requestError?.response?.data?.message || `Could not load ${label} rankings.`);
            })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [type, label, refreshKey, refreshSignal]);

    return (
        <aside className="h-fit rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 lg:sticky lg:top-24">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2 text-[var(--theme-accent)]"><Trophy size={16} /><span className="font-mono text-[10px] uppercase tracking-[0.18em]">Community</span></div>
                    <h2 className="mt-2 text-lg font-semibold text-[var(--theme-text)]">{label} leaderboard</h2>
                    <p className="mt-1 text-xs text-[var(--theme-text-muted)]">All time · problems solved</p>
                </div>
                    <button type="button" onClick={() => setRefreshKey((value) => value + 1)} disabled={loading} aria-label={`Refresh ${label} leaderboard`} className="rounded-lg border border-[var(--theme-border)] p-2 text-[var(--theme-text-muted)] transition hover:border-[var(--theme-accent)]/40 hover:text-[var(--theme-accent)] disabled:opacity-50">
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            <div className="mt-5 space-y-2">
                {loading ? Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-xl border border-[var(--theme-border)] p-3">
                        <div className="h-8 w-8 animate-pulse rounded-lg bg-[var(--theme-surface-high)]" />
                        <div className="min-w-0 flex-1"><div className="h-3 w-2/3 animate-pulse rounded bg-[var(--theme-surface-high)]" /><div className="mt-2 h-2 w-1/3 animate-pulse rounded bg-[var(--theme-surface-high)]" /></div>
                        <div className="h-3 w-6 animate-pulse rounded bg-[#111923]" />
                    </div>
                )) : error ? (
                    <div role="alert" className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-300">
                        <p>{error}</p>
                        <button type="button" onClick={() => setRefreshKey((value) => value + 1)} className="mt-2 underline underline-offset-2">Retry</button>
                    </div>
                ) : rows.length ? rows.map((row) => (
                    <div key={row.userId} className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${String(row.userId) === String(user?._id) ? "border-[var(--theme-accent)]/25 bg-[var(--theme-accent-soft)]" : "border-[var(--theme-border)] bg-[var(--theme-surface-raised)]"}`}>
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-semibold ${placeColor(row.rank)}`}>{row.rank}</span>
                        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-high)] text-xs font-semibold text-[var(--theme-accent)]">
                            {row.username?.slice(0, 1)?.toUpperCase() || "?"}
                            {row.avatar && <img src={row.avatar} alt="" className="absolute inset-0 h-full w-full object-cover" onError={(event) => event.currentTarget.remove()} />}
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[var(--theme-text)]">{row.username || "CpHub student"}{String(row.userId) === String(user?._id) && <span className="ml-1.5 text-[10px] text-[var(--theme-accent)]">you</span>}</p>
                            <p className="mt-0.5 truncate text-[11px] text-[var(--theme-text-muted)]">{[row.department, row.currentSemester].filter(Boolean).join(" · ") || row.college || "CpHub student"}</p>
                        </div>
                        <span className="shrink-0 text-right"><span className="block font-mono text-sm font-semibold text-[var(--theme-accent)]">{row.solved}</span><span className="text-[9px] text-[var(--theme-text-muted)]">solved</span></span>
                    </div>
                )) : (
                    <p className="rounded-xl border border-dashed border-[var(--theme-border)] px-4 py-8 text-center text-xs leading-5 text-[var(--theme-text-muted)]">No {label} solves yet. Complete a sheet problem to appear here.</p>
                )}
            </div>

            <Link to={`/leaderboard?type=${type}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--theme-border)] px-3 py-2.5 text-xs font-medium text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-accent)]/40 hover:text-[var(--theme-accent)]">
                Full leaderboard <ArrowRight size={14} />
            </Link>
        </aside>
    );
};

export default SheetLeaderboard;
