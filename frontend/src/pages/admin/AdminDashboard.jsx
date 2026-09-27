import React, { useCallback, useEffect, useState } from "react";

import AdminLayout from "./components/AdminLayout";
import DashboardHeader from "./components/DashboardHeader";
import StatsGrid from "./components/StatsGrid";
import RecentActivity from "./components/RecentActivity";
import QuickActions from "./components/QuickActions";
import PlatformHealth from "./components/PlatformHealth";
import { getAdminDashboard } from "../../api/adminDashboard.api";


const AdminDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDashboard = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getAdminDashboard();
            setDashboard(response?.data || null);
        } catch (requestError) {
            setDashboard(null);
            setError(
                requestError?.response?.data?.message ||
                "Could not load admin dashboard data. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    return (

        <AdminLayout>

            <div
                className="
                    px-4
                    py-5
                    sm:px-5
                    lg:px-7
                "
            >

                <DashboardHeader
                    generatedAt={dashboard?.generatedAt}
                    loading={loading}
                    onRefresh={loadDashboard}
                />

                {error && (
                    <div className="mb-4 flex items-center justify-between gap-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        <span>{error}</span>
                        <button type="button" onClick={loadDashboard} className="shrink-0 underline">
                            Retry
                        </button>
                    </div>
                )}

                {/* STATS */}

                <StatsGrid stats={dashboard?.stats} loading={loading} />


                {/* ACTIVITY + ACTIONS */}

                <div
                    className="
                        mt-4
                        grid
                        gap-4
                        xl:grid-cols-[1.5fr_1fr]
                    "
                >

                    <RecentActivity events={dashboard?.activity} loading={loading} />

                    <QuickActions />

                </div>


                {/* HEALTH */}

                <div className="mt-4">

                    <PlatformHealth health={dashboard?.health} loading={loading} />

                </div>

            </div>

        </AdminLayout>
    );
};


export default AdminDashboard;
