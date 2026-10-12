import React, { useCallback, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, RefreshCw, Users } from "lucide-react";
import {
    getBulkCodeforcesSyncStatus,
    startBulkCodeforcesSync
} from "../../codeforces/api/codeforces.api";

const activeStatuses = new Set(["starting", "running"]);

const getJob = (response) => response?.data || null;

const CodeforcesSyncControl = () => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [starting, setStarting] = useState(false);
    const [error, setError] = useState("");

    const refreshStatus = useCallback(async () => {
        try {
            const response = await getBulkCodeforcesSyncStatus();
            setJob(getJob(response));
            setError("");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load Codeforces sync status.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshStatus();
    }, [refreshStatus]);

    useEffect(() => {
        if (!activeStatuses.has(job?.status)) return undefined;
        const timer = window.setInterval(refreshStatus, 2500);
        return () => window.clearInterval(timer);
    }, [job?.status, refreshStatus]);

    const startSync = async () => {
        setStarting(true);
        setError("");
        try {
            const response = await startBulkCodeforcesSync();
            setJob(getJob(response));
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not start the Codeforces sync.");
            await refreshStatus();
        } finally {
            setStarting(false);
        }
    };

    const isActive = activeStatuses.has(job?.status);
    const progress = job?.total ? Math.min(100, Math.round((job.processed / job.total) * 100)) : 0;
    const statusLabel = loading && !job
        ? "Checking status"
        : isActive
            ? job?.status === "starting" ? "Preparing sync" : "Sync in progress"
            : job?.status === "completed"
                ? "Sync completed"
                : job?.status === "completed_with_errors"
                    ? "Completed with errors"
                    : job?.status === "failed"
                        ? "Sync failed"
                        : "Ready to sync";

    return (
        <section className="mb-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-high)] p-2 text-[var(--theme-accent)]">
                        <Users size={18} />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-[var(--theme-text)]">Codeforces profile sync</h2>
                        <p className="mt-1 max-w-2xl text-xs leading-5 text-[var(--theme-text-muted)]">
                            Refresh saved ratings, submissions, and profile data for every registered user.
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={startSync}
                    disabled={isActive || starting || loading}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--theme-accent)] px-4 py-2.5 text-xs font-semibold text-[#07110E] transition hover:bg-[#72FFD2] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isActive || starting
                        ? <LoaderCircle size={15} className="animate-spin" />
                        : <RefreshCw size={15} />}
                    {isActive ? "Syncing users…" : starting ? "Starting…" : "Sync all users"}
                </button>
            </div>

            <div className="mt-4 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] p-3">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[var(--theme-text)]">{statusLabel}</span>
                    <span className="font-mono text-[10px] text-[var(--theme-text-muted)]">
                        {job?.processed || 0} / {job?.total || 0} users
                    </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#1C2734]">
                    <div className="h-full rounded-full bg-[var(--theme-accent)] transition-[width] duration-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-[var(--theme-text-muted)]">
                    <span>{job?.succeeded || 0} succeeded</span>
                    <span className={job?.failed ? "text-red-300" : ""}>{job?.failed || 0} failed</span>
                    {isActive && job?.currentUsername && <span>Current: {job.currentUsername}</span>}
                </div>
            </div>

            {error && (
                <div className="mt-3 flex items-start gap-2 text-xs text-red-300">
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}
            {job?.status === "completed" && (
                <p className="mt-3 flex items-center gap-2 text-xs text-[var(--theme-accent)]">
                    <CheckCircle2 size={14} /> All user profiles were synced.
                </p>
            )}
            {!!job?.failures?.length && (
                <details className="mt-3 text-xs text-[var(--theme-text-muted)]">
                    <summary className="cursor-pointer">Recent failures ({job.failed}; showing up to {job.failures.length})</summary>
                    <ul className="mt-2 space-y-1 pl-4">
                        {job.failures.slice(-8).map((failure, index) => (
                            <li key={`${failure.username}-${index}`}>
                                <span className="text-[var(--theme-text)]">{failure.username}:</span> {failure.message}
                            </li>
                        ))}
                    </ul>
                </details>
            )}
        </section>
    );
};

export default CodeforcesSyncControl;
