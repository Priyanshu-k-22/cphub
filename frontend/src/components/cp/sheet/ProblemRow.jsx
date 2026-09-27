import React, {
    useState
} from "react";

import {
    markProblemComplete,
    markProblemIncomplete
} from "../../../api/cpSheet.api";


const ProblemRow = ({
    problem,
    index,
    onProgressUpdate
}) => {

    /*
    |--------------------------------------------------------------------------
    | Solved state
    |--------------------------------------------------------------------------
    */

    const [solved, setSolved] =
        useState(Boolean(problem.solved));


    /*
    |--------------------------------------------------------------------------
    | Updating state
    |--------------------------------------------------------------------------
    */

    const [updating, setUpdating] =
        useState(false);


    /*
    |--------------------------------------------------------------------------
    | Hint state
    |--------------------------------------------------------------------------
    */

    const [showHint, setShowHint] =
        useState(false);


    /*
    |--------------------------------------------------------------------------
    | Problem ID
    |--------------------------------------------------------------------------
    */

    const problemId =
        problem._id ||
        problem.id ||
        problem.problemId;


    /*
    |--------------------------------------------------------------------------
    | Toggle solved
    |--------------------------------------------------------------------------
    */

    const handleToggle = async () => {

        if (updating) {
            return;
        }


        try {

            setUpdating(true);


            const nextSolved =
                !solved;


            /*
            |--------------------------------------------------------------------------
            | Mark complete
            |--------------------------------------------------------------------------
            */

            if (nextSolved) {

                await markProblemComplete(
                    problemId
                );

            }


            /*
            |--------------------------------------------------------------------------
            | Mark incomplete
            |--------------------------------------------------------------------------
            */

            else {

                await markProblemIncomplete(
                    problemId
                );

            }


            /*
            |--------------------------------------------------------------------------
            | Update local state
            |--------------------------------------------------------------------------
            */

            setSolved(nextSolved);


            /*
            |--------------------------------------------------------------------------
            | Update parent progress
            |--------------------------------------------------------------------------
            */

            if (onProgressUpdate) {

                onProgressUpdate({
                    solvedDelta:
                        nextSolved
                            ? 1
                            : -1
                });

            }


        } catch (error) {

            console.error(
                "Failed to update problem status:",
                error
            );

        } finally {

            setUpdating(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Toggle hint
    |--------------------------------------------------------------------------
    */

    const handleHintToggle = () => {

        setShowHint(
            (current) => !current
        );

    };


    return (

        <div
            className="
                border-b
                border-[#1C2734]/70
                last:border-b-0
            "
        >

            {/* =========================================================
                PROBLEM ROW
            ========================================================== */}

            <div
                className="
                    grid
                    grid-cols-[50px_1fr_80px_70px]
                    items-center
                    gap-4
                    px-5
                    py-4
                    transition-colors
                    duration-200
                    hover:bg-[#0C131C]
                "
            >

                {/* =====================================================
                    NUMBER
                ====================================================== */}

                <span
                    className="
                        font-mono
                        text-xs
                        text-[#556275]
                    "
                >
                    {String(index + 1).padStart(2, "0")}
                </span>


                {/* =====================================================
                    PROBLEM
                ====================================================== */}

                <div
                    className="
                        min-w-0
                    "
                >

                    <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            block
                            truncate
                            text-sm
                            font-medium
                            text-[#DCE4ED]
                            transition-colors
                            hover:text-[#4AFFC4]
                        "
                    >
                        {problem.title}
                    </a>

                </div>


                {/* =====================================================
                    HINT
                ====================================================== */}

                <div
                    className="
                        flex
                        justify-center
                    "
                >

                    <button
                        type="button"
                        onClick={handleHintToggle}
                        disabled={!problem.hint}
                        title={
                            problem.hint
                                ? "Show hint"
                                : "No hint available"
                        }
                        className={`
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            border
                            transition-all
                            duration-200

                            ${
                                !problem.hint
                                    ? `
                                        cursor-not-allowed
                                        border-[#1C2734]
                                        text-[#303B49]
                                      `
                                    : showHint
                                        ? `
                                            border-[#F5C542]/40
                                            bg-[#F5C542]/10
                                            text-[#F5C542]
                                          `
                                        : `
                                            border-[#1C2734]
                                            text-[#556275]
                                            hover:border-[#F5C542]/40
                                            hover:bg-[#F5C542]/5
                                            hover:text-[#F5C542]
                                          `
                            }
                        `}
                    >

                        💡

                    </button>

                </div>


                {/* =====================================================
                    STATUS
                ====================================================== */}

                <div
                    className="
                        flex
                        justify-end
                    "
                >

                    <button
                        type="button"
                        disabled={updating}
                        onClick={handleToggle}
                        className={`
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            border
                            transition-all
                            duration-200

                            ${
                                solved
                                    ? `
                                        border-[#4AFFC4]/40
                                        bg-[#4AFFC4]/10
                                        text-[#4AFFC4]
                                      `
                                    : `
                                        border-[#1C2734]
                                        text-[#556275]
                                        hover:border-[#4AFFC4]/40
                                        hover:text-[#4AFFC4]
                                      `
                            }

                            ${
                                updating
                                    ? `
                                        cursor-wait
                                        opacity-50
                                      `
                                    : ""
                            }
                        `}
                        aria-label={
                            solved
                                ? "Mark incomplete"
                                : "Mark complete"
                        }
                    >

                        {solved
                            ? "✓"
                            : "○"
                        }

                    </button>

                </div>

            </div>


            {/* =========================================================
                HINT
            ========================================================== */}

            {showHint && problem.hint && (

                <div
                    className="
                        px-5
                        pb-4
                    "
                >

                    <div
                        className="
                            ml-[50px]
                            rounded-lg
                            border
                            border-[#F5C542]/15
                            bg-[#F5C542]/5
                            px-4
                            py-3
                        "
                    >

                        <p
                            className="
                                text-[11px]
                                leading-relaxed
                                text-[#B7BFCA]
                            "
                        >
                            <span
                                className="
                                    mr-2
                                    font-semibold
                                    text-[#F5C542]
                                "
                            >
                                Hint:
                            </span>

                            {problem.hint}

                        </p>

                    </div>

                </div>

            )}

        </div>

    );

};


export default ProblemRow;