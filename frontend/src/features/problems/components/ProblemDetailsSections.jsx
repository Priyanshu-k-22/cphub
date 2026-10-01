import { useState } from "react";
import { Link } from "react-router-dom";

/* ============================================================
   HEADER
============================================================ */

export const ProblemHeader = ({ problem }) => {

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

export const ProblemInfo = ({ problem }) => {
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

export const InfoItem = ({
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

export const DifficultyBadge = ({
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

export const LoadingState = () => {

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

export const ErrorState = ({
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



