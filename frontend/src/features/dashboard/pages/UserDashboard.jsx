import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import TodayProblems from "../components/TodayProblems";
import TodayProgress from "../components/TodayProgress";
import CPProgress from "../components/CPProgress";
import DSAProgress from "../components/DSAProgress";
import UpcomingContests from "../components/UpcomingContests";
import RecentActivity from "../components/RecentActivity";
import { getDashboard } from "../api/dashboard.api";
import { syncCodeforces } from "../../codeforces/api/codeforces.api";

const DAY_MS = 24 * 60 * 60 * 1000;

const UserDashboard = () => {
    const { user: authUser } = useAuth();
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [dashboardError, setDashboardError] = useState("");
    const [codeforcesError, setCodeforcesError] = useState("");
    const initialLoadStarted = useRef(false);
    const autoSyncStarted = useRef(false);

    const syncProfile = useCallback(async () => {
        setSyncing(true);
        setCodeforcesError("");
        try {
            const response = await syncCodeforces();
            const profile = response?.data;
            if (!profile) throw new Error("Codeforces returned no profile data.");
            setDashboard((previous) => previous ? { ...previous, codeforces: profile } : previous);
        } catch (error) {
            console.error("Codeforces sync failed:", error);
            setCodeforcesError(error?.response?.data?.message || error?.message || "Could not refresh Codeforces. Try again.");
        } finally {
            setSyncing(false);
        }
    }, []);

    const loadDashboard = useCallback(async ({ initial = false } = {}) => {
        if (initial && !dashboard) setLoading(true);
        else setRefreshing(true);
        setDashboardError("");
        try {
            const response = await getDashboard();
            const data = response?.data ?? response;
            setDashboard(data);

            const lastSyncedAt = data?.codeforces?.lastSyncedAt
                ? new Date(data.codeforces.lastSyncedAt).getTime()
                : 0;
            if (!autoSyncStarted.current && (!lastSyncedAt || Date.now() - lastSyncedAt >= DAY_MS)) {
                autoSyncStarted.current = true;
                void syncProfile();
            }
        } catch (error) {
            console.error("Dashboard fetch failed:", error);
            setDashboardError(error?.response?.data?.message || "Could not load your dashboard.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [dashboard, syncProfile]);

    useEffect(() => {
        if (initialLoadStarted.current) return;
        initialLoadStarted.current = true;
        loadDashboard({ initial: true });
    }, [loadDashboard]);

    if (loading && !dashboard) {
        return (
            <div className="student-dashboard-ui min-h-screen bg-[var(--theme-page)] px-4 py-8 text-[var(--theme-text)]">
                <main className="mx-auto max-w-7xl">
                    <div className="h-36 animate-pulse rounded-2xl bg-[var(--theme-surface)]" />
                    <div className="mt-4 grid gap-3 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((key) => <div key={key} className="h-44 animate-pulse rounded-2xl bg-[var(--theme-surface)]" />)}
                    </div>
                </main>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="student-dashboard-ui min-h-screen bg-[var(--theme-page)] px-4 py-16 text-[var(--theme-text)]">
                <main className="mx-auto max-w-xl rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 text-center">
                    <h1 className="text-xl font-semibold">Dashboard unavailable</h1>
                    <p className="mt-2 text-sm text-red-400" role="alert">{dashboardError || "We could not load your dashboard data."}</p>
                    <button type="button" onClick={() => loadDashboard({ initial: true })} disabled={refreshing} className="mt-4 rounded-lg border border-[#4AFFC4]/40 px-4 py-2 text-sm text-[#4AFFC4] disabled:opacity-50">{refreshing ? "Retrying…" : "Retry"}</button>
                </main>
            </div>
        );
    }

    const user = dashboard.user || authUser;
    const contestsError = dashboard.contestsUnavailable ? "Contest data is temporarily unavailable. Try refreshing the dashboard." : "";

    return (
        <div className="student-dashboard-ui min-h-screen bg-[var(--theme-page)] text-[var(--theme-text)]">
            <main className="mx-auto max-w-7xl px-4 py-5 md:px-5">
                <DashboardHeader user={user} onRefresh={() => loadDashboard()} refreshing={refreshing} />

                {dashboardError && (
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400" role="alert">
                        <span>{dashboardError} Showing the last loaded dashboard.</span>
                        <button type="button" onClick={() => loadDashboard()} disabled={refreshing} className="underline underline-offset-2">{refreshing ? "Refreshing…" : "Retry"}</button>
                    </div>
                )}

                <div className="space-y-3">
                    <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_390px]">
                        <DashboardStats codeforces={dashboard.codeforces} username={user?.username} loading={false} syncing={syncing} onSync={() => syncProfile()} syncError={codeforcesError} />
                        <TodayProblems problems={dashboard.todayProblems} loading={false} onRetry={() => loadDashboard()} />
                    </section>

                    <section className="grid gap-3 lg:grid-cols-3">
                        <TodayProgress progress={dashboard.todayProgress} loading={false} />
                        <CPProgress codeforces={dashboard.codeforces} progress={dashboard.cpProgress} loading={false} />
                        <DSAProgress progress={dashboard.dsaProgress} loading={false} />
                    </section>

                    <section className="grid gap-3 lg:grid-cols-2">
                        <UpcomingContests contests={dashboard.contests} loading={false} error={contestsError} />
                        <RecentActivity activity={dashboard.activity} loading={false} />
                    </section>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
