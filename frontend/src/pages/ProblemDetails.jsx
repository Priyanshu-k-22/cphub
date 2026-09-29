import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, RefreshCw } from "lucide-react";

import {
    getProblemById,
    getDailyProblemProgress,
    markDailyProblemComplete,
    markDailyProblemIncomplete,
} from "../api/problem.api";
import { useAuth } from "../context/AuthContext.jsx";

import ProblemSection from "../components/problems/ProblemSection";
import ProblemExamples from "../components/problems/ProblemExamples";
import ProblemConstraints from "../components/problems/ProblemConstraints";
import ProblemTags from "../components/problems/ProblemTags";
import DSASolutions from "../components/problems/DSASolutions";
import CPSolution from "../components/problems/CPSolution";


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


/* ============================================================
   HEADER
============================================================ */

const ProblemHeader = ({ problem }) => {

    return (
        <header className="mt-6">

            <div className="flex flex-wrap items-center gap-2">

                {/* Category */}

                <span
                    className={`rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                        problem.category === "CP"
                            ? "border-blue-400/20 bg-blue-400/10 text-blue-400"
                            : "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                    }`}
                >
                    {problem.category}
                </span>


                {/* Platform */}

                {problem.platform && (
                    <span className="rounded-md border border-[#263445] bg-[#0A1018] px-2.5 py-1 font-mono text-[10px] text-[#AEB9C7]">
                        {problem.platform}
                    </span>
                )}

            </div>


            <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight md:text-4xl">
                {problem.title}
            </h1>

        </header>
    );
};


/* ============================================================
   PROBLEM INFO SIDEBAR
============================================================ */

const ProblemInfo = ({ problem }) => {
    const [showDetails, setShowDetails] =
        useState(false);

    const topics = Array.isArray(problem.topics)
        ? problem.topics
        : [];

    const tags = Array.isArray(problem.tags)
        ? problem.tags
        : [];

    return (
        <div className="rounded-xl border border-[#1C2734] bg-[#0A1018]">

            {/* Header */}

            <div className="border-b border-[#1C2734] px-5 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#556275]">
                    problem_info
                </p>
            </div>


            <div className="p-5">

                {/* Platform */}

                <InfoItem label="Platform">
                    <span className="text-sm font-medium text-[#EDF2F7]">
                        {problem.platform || "—"}
                    </span>
                </InfoItem>


                {/* Category */}

                <div className="mt-5">
                    <InfoItem label="Category">
                        <span
                            className={`text-sm font-medium ${
                                problem.category === "CP"
                                    ? "text-blue-400"
                                    : "text-emerald-400"
                            }`}
                        >
                            {problem.category || "—"}
                        </span>
                    </InfoItem>
                </div>


                {/* DSA Difficulty */}

                {problem.category === "DSA" &&
                    problem.difficulty && (
                        <div className="mt-5">
                            <InfoItem label="Difficulty">
                                <DifficultyBadge
                                    difficulty={
                                        problem.difficulty
                                    }
                                />
                            </InfoItem>
                        </div>
                    )}


                {/* CP Rating */}

                {problem.category === "CP" &&
                    problem.rating !== undefined &&
                    problem.rating !== null && (
                        <div className="mt-5">
                            <InfoItem label="Rating">
                                <span className="text-sm font-medium text-blue-400">
                                    {problem.rating}
                                </span>
                            </InfoItem>
                        </div>
                    )}


                {/* Topics + Tags Toggle */}

                {(topics.length > 0 ||
                    tags.length > 0) && (
                    <div className="mt-5 border-t border-[#1C2734] pt-4">

                        <button
                            type="button"
                            onClick={() =>
                                setShowDetails(
                                    !showDetails
                                )
                            }
                            className="flex w-full items-center justify-between text-left"
                        >
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-wider text-[#556275]">
                                    Topics & Tags
                                </p>

                                {!showDetails && (
                                    <p className="mt-1 text-xs text-[#556275]">
                                        {topics.length +
                                            tags.length}{" "}
                                        items
                                    </p>
                                )}
                            </div>

                            <span
                                className={`text-[#718096] transition-transform duration-200 ${
                                    showDetails
                                        ? "rotate-180"
                                        : ""
                                }`}
                            >
                                ↓
                            </span>
                        </button>


                        {/* Expandable Content */}

                        {showDetails && (
                            <div className="mt-4 space-y-4">

                                {/* Topics */}

                                {topics.length > 0 && (
                                    <div>
                                        <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-[#556275]">
                                            Topics
                                        </p>

                                        <div className="flex flex-wrap gap-1.5">

                                            {topics.map(
                                                (topic) => (
                                                    <span
                                                        key={
                                                            topic
                                                        }
                                                        className="rounded-md bg-[#111923] px-2 py-1 text-[10px] text-[#AEB9C7]"
                                                    >
                                                        {
                                                            topic
                                                        }
                                                    </span>
                                                )
                                            )}

                                        </div>
                                    </div>
                                )}


                                {/* Tags */}

                                {tags.length > 0 && (
                                    <div>
                                        <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-[#556275]">
                                            Tags
                                        </p>

                                        <div className="flex flex-wrap gap-1.5">

                                            {tags.map(
                                                (tag) => (
                                                    <span
                                                        key={
                                                            tag
                                                        }
                                                        className="rounded-md border border-[#1C2734] px-2 py-1 font-mono text-[10px] text-[#718096]"
                                                    >
                                                        #
                                                        {tag}
                                                    </span>
                                                )
                                            )}

                                        </div>
                                    </div>
                                )}

                            </div>
                        )}

                    </div>
                )}


                {/* External Link */}

                {problem.externalLink && (
                    <div className="mt-5 border-t border-[#1C2734] pt-5">

                        <a
                            href={
                                problem.externalLink
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center rounded-lg border border-[#4AFFC4]/30 bg-[#4AFFC4]/5 px-4 py-2.5 font-mono text-xs text-[#4AFFC4] transition hover:border-[#4AFFC4] hover:bg-[#4AFFC4]/10"
                        >
                            Open on{" "}
                            {problem.platform} ↗
                        </a>

                    </div>
                )}

            </div>
        </div>
    );
};


/* ============================================================
   INFO ITEM
============================================================ */

const InfoItem = ({
    label,
    children,
}) => {

    return (
        <div>

            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-[#556275]">
                {label}
            </p>

            {children}

        </div>
    );
};


/* ============================================================
   DIFFICULTY
============================================================ */

const DifficultyBadge = ({
    difficulty,
}) => {

    const styles = {
        Easy: "bg-emerald-400/10 text-emerald-400",
        Medium:
            "bg-yellow-400/10 text-yellow-400",
        Hard: "bg-red-400/10 text-red-400",
    };

    return (
        <span
            className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${
                styles[difficulty] ||
                "bg-[#111923] text-[#AEB9C7]"
            }`}
        >
            {difficulty}
        </span>
    );
};


/* ============================================================
   LOADING
============================================================ */

const LoadingState = () => {

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#060A10] text-[#EDF2F7]">

            <div className="flex items-center gap-3">

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#4AFFC4] border-t-transparent" />

                <span className="font-mono text-sm text-[#AEB9C7]">
                    loading_problem...
                </span>

            </div>

        </div>
    );
};


/* ============================================================
   ERROR
============================================================ */

const ErrorState = ({
    message,
}) => {

    return (
        <div className="min-h-screen bg-[#060A10] px-4 py-20 text-[#EDF2F7] md:px-6">

            <div className="mx-auto max-w-7xl">

                <Link
                    to="/problems"
                    className="font-mono text-xs text-[#4AFFC4] transition hover:text-white"
                >
                    ← back_to_problems
                </Link>


                <div className="mt-6 max-w-2xl rounded-xl border border-red-500/30 bg-red-500/5 p-5">

                    <p className="font-mono text-sm text-red-400">
                        error: {message}
                    </p>

                </div>

            </div>

        </div>
    );
};


export default ProblemDetails;
