import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DashboardHeader from "../components/DashboardHeader";
import StatsGrid from "../components/StatsGrid";
import RecentActivity from "../components/RecentActivity";
import QuickActions from "../components/QuickActions";
import PlatformHealth from "../components/PlatformHealth";
import { getAdminDashboard } from "../api/adminDashboard.api";
import { useAuth } from "../../auth/context/AuthContext";

const AdminDashboard = () => {
    const { user } = useAuth();
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const initialLoadStarted = useRef(false);

    const loadDashboard = useCallback(async ({ initial = false } = {}) => {
        if (initial) setLoading(true);
        else setRefreshing(true);
        setError("");
        try {
            const response = await getAdminDashboard();
            setDashboard(response?.data || null);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not refresh dashboard data. Please try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        if (initialLoadStarted.current) return;
        initialLoadStarted.current = true;
        loadDashboard({ initial: true });
    }, [loadDashboard]);

    return (
        <AdminLayout>
            <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
                <DashboardHeader user={user} generatedAt={dashboard?.generatedAt} loading={loading} refreshing={refreshing} onRefresh={() => loadDashboard()} />

                {error && (
                    <div role="status" className="mb-5 flex flex-col gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-[var(--theme-text-secondary)] sm:flex-row sm:items-center sm:justify-between">
                        <span>{error}{dashboard && " Showing the last saved dashboard data."}</span>
                        <button type="button" onClick={() => loadDashboard()} className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/25 px-4 font-semibold text-amber-500 transition hover:bg-amber-500/10">Try again</button>
                    </div>
                )}

                <StatsGrid stats={dashboard?.stats} loading={loading} />

                <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
                    <RecentActivity events={dashboard?.activity} loading={loading} />
                    <QuickActions />
                </div>

                <div className="mt-5"><PlatformHealth health={dashboard?.health} loading={loading} /></div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
