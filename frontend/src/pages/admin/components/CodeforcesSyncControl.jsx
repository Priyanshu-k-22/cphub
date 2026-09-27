import React, { useCallback, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, RefreshCw, Users } from "lucide-react";
import {
    getBulkCodeforcesSyncStatus,
    startBulkCodeforcesSync
} from "../../../api/codeforces.api";

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
        <section className="mb-4 rounded-xl border border-[#1C2734] bg-[#080D14] p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    <div className="rounded-lg border border-[#1C2734] bg-[#0D151F] p-2 text-[#4AFFC4]">
                        <Users size={18} />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-[#DCE4ED]">Codeforces profile sync</h2>
                        <p className="mt-1 max-w-2xl text-xs leading-5 text-[#7F8B9C]">
                            Refresh saved ratings, submissions, and profile data for every registered user.
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={startSync}
                    disabled={isActive || starting || loading}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2.5 text-xs font-semibold text-[#07110E] transition hover:bg-[#72FFD2] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isActive || starting
                        ? <LoaderCircle size={15} className="animate-spin" />
                        : <RefreshCw size={15} />}
                    {isActive ? "Syncing users…" : starting ? "Starting…" : "Sync all users"}
                </button>
            </div>

            <div className="mt-4 rounded-lg border border-[#1C2734] bg-[#070B11] p-3">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[#DCE4ED]">{statusLabel}</span>
                    <span className="font-mono text-[10px] text-[#7F8B9C]">
                        {job?.processed || 0} / {job?.total || 0} users
                    </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#1C2734]">
                    <div className="h-full rounded-full bg-[#4AFFC4] transition-[width] duration-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-[#7F8B9C]">
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
                <p className="mt-3 flex items-center gap-2 text-xs text-[#4AFFC4]">
                    <CheckCircle2 size={14} /> All user profiles were synced.
                </p>
            )}
            {!!job?.failures?.length && (
                <details className="mt-3 text-xs text-[#7F8B9C]">
                    <summary className="cursor-pointer">Recent failures ({job.failed}; showing up to {job.failures.length})</summary>
                    <ul className="mt-2 space-y-1 pl-4">
                        {job.failures.slice(-8).map((failure, index) => (
                            <li key={`${failure.username}-${index}`}>
                                <span className="text-[#DCE4ED]">{failure.username}:</span> {failure.message}
                            </li>
                        ))}
                    </ul>
                </details>
            )}
        </section>
    );
};

export default CodeforcesSyncControl;
