import React, {
    useEffect,
    useState,
} from "react";

import { Link } from "react-router-dom";

import { getDailyProblems } from "../api/problem.api";

import DailyProblemCard from "../components/problems/DailyProblemCard";
import SheetLeaderboard from "../components/leaderboard/SheetLeaderboard.jsx";


const Problems = () => {
    const [problems, setProblems] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {
        const fetchDailyProblems =
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const response =
                        await getDailyProblems();

                    setProblems(
                        Array.isArray(
                            response?.data
                        )
                            ? response.data
                            : []
                    );
                } catch (error) {
                    console.error(
                        "Failed to fetch daily problems:",
                        error
                    );

                    setError(
                        error?.response
                            ?.data?.message ||
                            "Failed to load problems"
                    );
                } finally {
                    setLoading(false);
                }
            };

        fetchDailyProblems();
    }, []);


    const dsaProblem =
        problems.find(
            (problem) =>
                problem.category === "DSA"
        );

    const cpProblem =
        problems.find(
            (problem) =>
                problem.category === "CP"
        );


    return (
        <div className="min-h-screen bg-[#060A10] text-[#EDF2F7]">

            <div className="mx-auto max-w-7xl px-5 py-5">

                {/* HEADER */}

                <div className="mb-12">

                    <p className="font-mono text-sm text-[#4AFFC4]">
                        cp/cphub/problems
                    </p>

                    <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                        Problems
                    </h1>

                    <p className="mt-4 max-w-2xl text-[#AEB9C7]">
                        Practice problems,
                        understand the approach,
                        and build your
                        problem-solving skills.
                    </p>

                </div>


                <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="min-w-0">
                        {/* LOADING */}
                        {loading && (
                            <div className="flex min-h-[300px] items-center justify-center">

                                <div className="flex items-center gap-3">

                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#4AFFC4] border-t-transparent" />

                                    <span className="font-mono text-sm text-[#AEB9C7]">
                                        loading_problems...
                                    </span>

                                </div>

                            </div>
                        )}


                        {/* ERROR */}

                        {!loading && error && (
                            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">

                                <p className="font-mono text-sm text-red-400">
                                    error: {error}
                                </p>

                            </div>
                        )}


                        {!loading && !error && (
                            <>

                        {/* DAILY PROBLEMS */}

                        <section>

                            <div className="mb-5">

                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#556275]">
                                    today
                                </p>

                                <h2 className="mt-2 text-2xl font-semibold">
                                    Daily Problems
                                </h2>

                            </div>


                            {/* HORIZONTAL CARDS */}

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                {dsaProblem && (
                                    <DailyProblemCard
                                        problem={
                                            dsaProblem
                                        }
                                    />
                                )}

                                {cpProblem && (
                                    <DailyProblemCard
                                        problem={
                                            cpProblem
                                        }
                                    />
                                )}

                            </div>


                            {problems.length ===
                                0 && (
                                <div className="rounded-xl border border-dashed border-[#263445] bg-[#0A1018] p-10 text-center">

                                    <p className="font-mono text-sm text-[#556275]">
                                        no_daily_problems_found
                                    </p>

                                </div>
                            )}

                        </section>


                        {/* HISTORY */}

                        <section className="mt-16">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#556275]">
                                        archive
                                    </p>

                                    <h2 className="mt-2 text-2xl font-semibold">
                                        Problem History
                                    </h2>

                                    <p className="mt-2 text-sm text-[#AEB9C7]">
                                        Explore problems from previous days.
                                    </p>

                                </div>


                                <Link
                                    to="/problems/history"
                                    className="font-mono text-sm text-[#4AFFC4] transition hover:text-white"
                                >
                                    view_all →
                                </Link>

                            </div>

                        </section>

                            </>
                        )}
                    </div>

                    <SheetLeaderboard type="daily-problem" label="Daily" />
                </div>

            </div>
        </div>
    );
};

export default Problems;
