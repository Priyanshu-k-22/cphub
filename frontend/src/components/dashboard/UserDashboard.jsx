import React, {
    useEffect,
    useState
} from "react";

import DashboardHeader
    from "./DashboardHeader";

import DashboardStats
    from "./DashboardStats";

import TodayProblems
    from "./TodayProblems";

import TodayProgress
    from "./TodayProgress";

import CPProgress
    from "./CPProgress";

import DSAProgress
    from "./DSAProgress";

import UpcomingContests
    from "./UpcomingContests";

import RecentActivity
    from "./RecentActivity";

import {
    getCodeforcesProfile,
    syncCodeforces
} from "../../api/codeforces.api";


const UserDashboard = () => {

    /*
    |--------------------------------------------------------------------------
    | Codeforces state
    |--------------------------------------------------------------------------
    */

    const [
        codeforces,
        setCodeforces
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        syncing,
        setSyncing
    ] = useState(false);


    const [
        error,
        setError
    ] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | Get stored Codeforces data
    |--------------------------------------------------------------------------
    */

    const fetchCodeforces =
        async () => {

            try {

                setLoading(true);
                setError(null);


                const response =
                    await getCodeforcesProfile();


                setCodeforces(
                    response.data
                );

            } catch (error) {

                console.error(
                    "Failed to fetch Codeforces data:",
                    error
                );

                setError(
                    "Failed to load Codeforces data"
                );

            } finally {

                setLoading(false);

            }
        };


    /*
    |--------------------------------------------------------------------------
    | Initial load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        fetchCodeforces();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Manual Codeforces sync
    |--------------------------------------------------------------------------
    */

    const handleSyncCodeforces =
        async () => {

            try {

                setSyncing(true);
                setError(null);


                /*
                |--------------------------------------------------------------------------
                | Call backend sync
                |--------------------------------------------------------------------------
                */

                await syncCodeforces();


                /*
                |--------------------------------------------------------------------------
                | Fetch freshly saved data
                |--------------------------------------------------------------------------
                */

                const response =
                    await getCodeforcesProfile();


                setCodeforces(
                    response.data
                );


            } catch (error) {

                console.error(
                    "Codeforces sync failed:",
                    error
                );


                setError(
                    error?.response?.data?.message ||
                    "Failed to sync Codeforces data"
                );

            } finally {

                setSyncing(false);

            }
        };


    return (

        <div className="min-h-screen bg-[#060A10] text-[#EDF2F7]">

            <main className="mx-auto max-w-7xl px-4 py-5 md:px-5">


                {/* =====================================================
                    HEADER
                ====================================================== */}

                <DashboardHeader />


                <div className="space-y-3">


                    {/* =================================================
                        TOP SECTION
                    ================================================== */}

                    <section className="grid gap-3 lg:grid-cols-[1fr_390px]">


                        {/* =================================================
                            STATS
                        ================================================== */}

                        <div className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-4">

                            <DashboardStats
                                codeforces={codeforces}
                                loading={loading}
                                syncing={syncing}
                                onSync={handleSyncCodeforces}
                            />


                            {/* Error */}

                            {error && (

                                <p className="mt-3 font-mono text-[9px] text-red-400">
                                    {error}
                                </p>

                            )}

                        </div>


                        {/* =================================================
                            TODAY'S PROBLEMS
                        ================================================== */}

                        <TodayProblems />

                    </section>


                    {/* =================================================
                        PROGRESS SECTION
                    ================================================== */}

                    <section className="grid gap-3 lg:grid-cols-3">


                        {/* Today's Progress */}

                        <TodayProgress />


                        {/* CP Progress */}

                        <CPProgress
                            codeforces={codeforces}
                            loading={loading}
                        />


                        {/* DSA Progress */}

                        <DSAProgress />

                    </section>


                    {/* =================================================
                        BOTTOM SECTION
                    ================================================== */}

                    <section className="grid gap-3 lg:grid-cols-2">


                        {/* Upcoming Contests */}

                        <UpcomingContests />


                        {/* Recent Activity */}

                        <RecentActivity />

                    </section>

                </div>

            </main>

        </div>
    );
};


export default UserDashboard;