import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, RefreshCw } from "lucide-react";
import { ProblemHeader, ProblemInfo, LoadingState, ErrorState } from "../components/ProblemDetailsSections.jsx";

import {
    getProblemById,
    getDailyProblemProgress,
    markDailyProblemComplete,
    markDailyProblemIncomplete,
} from "../api/problem.api";
import { useAuth } from "../../auth/context/AuthContext.jsx";

import ProblemSection from "../components/ProblemSection";
import ProblemExamples from "../components/ProblemExamples";
import ProblemConstraints from "../components/ProblemConstraints";
import ProblemTags from "../components/ProblemTags";
import DSASolutions from "../components/DSASolutions";
import CPSolution from "../components/CPSolution";


const ProblemDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [dailySolved, setDailySolved] = useState(false);
    const [progressLoading, setProgressLoading] = useState(false);
    const [progressUpdating, setProgressUpdating] = useState(false);
    const [progressError, setProgressError] = useState("");


    useEffect(() => {
        const fetchProblem = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getProblemById(id);

                setProblem(response.data);
            } catch (error) {
                console.error(
                    "Failed to fetch problem:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load problem"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, [id]);

    useEffect(() => {
        if (!problem?.isPublished || !user?._id) {
            setDailySolved(false);
            return undefined;
        }
        let active = true;
        setProgressLoading(true);
        setProgressError("");
        getDailyProblemProgress(id)
            .then((response) => {
                if (active) setDailySolved(Boolean(response?.data?.data?.solved ?? response?.data?.solved));
            })
            .catch((requestError) => {
                if (active) setProgressError(requestError?.response?.data?.message || "Could not load your completion status.");
            })
            .finally(() => { if (active) setProgressLoading(false); });
        return () => { active = false; };
    }, [id, problem?._id, problem?.isPublished, user?._id]);

    const toggleDailySolved = async () => {
        if (progressUpdating) return;
        setProgressUpdating(true);
        setProgressError("");
        try {
            if (dailySolved) await markDailyProblemIncomplete(id);
            else await markDailyProblemComplete(id);
            setDailySolved((solved) => !solved);
        } catch (requestError) {
            setProgressError(requestError?.response?.data?.message || "Could not update your completion status.");
        } finally {
            setProgressUpdating(false);
        }
    };


    if (loading) {
        return <LoadingState />;
    }


    if (error) {
        return <ErrorState message={error} />;
    }


    if (!problem) {
        return null;
    }


    return (
        <div className="min-h-screen bg-[#060A10] text-[#EDF2F7]">

            <main className="mx-auto max-w-7xl px-4 py-5 md:px-6">

                {/* Back */}

                <Link
                    to="/problems"
                    className="inline-flex items-center font-mono text-xs text-[#4AFFC4] transition hover:text-white"
                >
                    ← back_to_problems
                </Link>


                {/* Compact Header */}

                <ProblemHeader
                    problem={problem}
                />

                {problem.isPublished && user && (
                    <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-[#1C2734] bg-[#0A1018] px-4 py-3">
                        <button type="button" onClick={toggleDailySolved} disabled={progressLoading || progressUpdating} aria-pressed={dailySolved} className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60 ${dailySolved ? "border-[#4AFFC4]/40 bg-[#4AFFC4]/10 text-[#4AFFC4]" : "border-[#273342] text-[#AEB9C7] hover:border-[#4AFFC4]/40 hover:text-[#4AFFC4]"}`}>
                            {progressLoading || progressUpdating ? <RefreshCw size={16} className="animate-spin" /> : <Check size={16} />}
                            {dailySolved ? "Completed · Undo" : "Mark as completed"}
                        </button>
                        <span className="text-xs text-[#7F8B9C]">Your completion counts toward the Daily Problems leaderboard.</span>
                        {progressError && <p role="alert" className="w-full text-xs text-red-400">{progressError}</p>}
                    </div>
                )}


                {/* Main Layout */}

                <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">

                    {/* =========================================
                        MAIN CONTENT
                    ========================================= */}

                    <div className="min-w-0">

                        {/* Problem Statement */}

                        <ProblemSection
                            title="Problem Statement"
                        >

                            <p className="whitespace-pre-line leading-7 text-[#AEB9C7]">
                                {problem.statement}
                            </p>

                        </ProblemSection>


                        {/* Examples */}

                        <div className="mt-7">
                            <ProblemExamples
                                examples={
                                    problem.examples
                                }
                            />
                        </div>


                        {/* Constraints */}

                        <div className="mt-7">
                            <ProblemConstraints
                                constraints={
                                    problem.constraints
                                }
                            />
                        </div>


                        {/* Solutions */}

                        <div className="mt-8">

                            {problem.category ===
                            "DSA" ? (
                                <DSASolutions
                                    problem={
                                        problem
                                    }
                                />
                            ) : (
                                <CPSolution
                                    problem={
                                        problem
                                    }
                                />
                            )}

                        </div>

                    </div>


                    {/* =========================================
                        RIGHT SIDEBAR
                    ========================================= */}

                    <aside className="lg:sticky lg:top-5 lg:self-start">

                        <ProblemInfo
                            problem={problem}
                        />

                    </aside>

                </div>

            </main>

        </div>
    );
};


export default ProblemDetails;
