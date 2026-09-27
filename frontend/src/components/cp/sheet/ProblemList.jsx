import React from "react";

import ProblemRow from "./ProblemRow";


const ProblemList = ({
    problems,
    loading,
    onProgressUpdate
}) => {

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div
                className="
                    space-y-3
                "
            >

                {[1, 2, 3, 4, 5].map(
                    (item) => (

                        <div
                            key={item}
                            className="
                                h-16
                                animate-pulse
                                rounded-xl
                                border
                                border-[#1C2734]
                                bg-[#080D14]
                            "
                        />

                    )
                )}

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Empty
    |--------------------------------------------------------------------------
    */

    if (!problems.length) {

        return (

            <div
                className="
                    rounded-xl
                    border
                    border-[#1C2734]
                    bg-[#080D14]
                    px-6
                    py-12
                    text-center
                "
            >

                <p
                    className="
                        font-mono
                        text-sm
                        text-[#7F8B9C]
                    "
                >
                    No problems found for this rating.
                </p>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Problem List
    |--------------------------------------------------------------------------
    */

    return (

        <section
            className="
                overflow-hidden
                rounded-xl
                border
                border-[#1C2734]
                bg-[#080D14]
            "
        >

            {/* =========================================================
                LIST HEADER
            ========================================================== */}

            <div
                className="
                    grid
                    grid-cols-[50px_1fr_80px_70px]
                    gap-4
                    border-b
                    border-[#1C2734]
                    px-5
                    py-3
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-[#556275]
                "
            >

                <span>
                    #
                </span>


                <span>
                    Problem
                </span>


                <span
                    className="text-center"
                >
                    Hint
                </span>


                <span
                    className="text-right"
                >
                    Status
                </span>

            </div>


            {/* =========================================================
                PROBLEMS
            ========================================================== */}

            <div>

                {problems.map(
                    (problem, index) => (

                        <ProblemRow
                            key={
                                problem._id ||
                                problem.id ||
                                problem.problemId
                            }
                            problem={problem}
                            index={index}
                            onProgressUpdate={
                                onProgressUpdate
                            }
                        />

                    )
                )}

            </div>

        </section>

    );

};


export default ProblemList;