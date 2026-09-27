import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

import { getDailyProblems } from "../../api/problem.api";


const TodayProblems = () => {

    const [problems, setProblems] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | Fetch today's problems
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const fetchDailyProblems = async () => {

            try {

                setLoading(true);
                setError(null);

                const response =
                    await getDailyProblems();

                setProblems(
                    response.data || []
                );

            } catch (error) {

                console.error(
                    "Failed to fetch daily problems:",
                    error
                );

                setError(
                    "Failed to load today's problems."
                );

            } finally {

                setLoading(false);

            }
        };


        fetchDailyProblems();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <div className="
                rounded-xl
                border
                border-[#1C2734]
                bg-[#0A1018]
                p-4
            ">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-[0.12em]
                            text-[#556275]
                        ">
                            Today's Problems
                        </p>

                        <div className="
                            mt-2
                            h-4
                            w-32
                            animate-pulse
                            rounded
                            bg-[#1C2734]
                        " />
                    </div>

                </div>


                <div className="mt-4 space-y-2">

                    {[1, 2].map((item) => (

                        <div
                            key={item}
                            className="
                                h-14
                                animate-pulse
                                rounded-lg
                                bg-[#111923]
                            "
                        />

                    ))}

                </div>

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (
            <div className="
                rounded-xl
                border
                border-[#1C2734]
                bg-[#0A1018]
                p-4
            ">

                <p className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-[#556275]
                ">
                    Today's Problems
                </p>

                <p className="
                    mt-3
                    text-xs
                    text-red-400
                ">
                    {error}
                </p>

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | No problems
    |--------------------------------------------------------------------------
    */

    if (problems.length === 0) {

        return (
            <div className="
                rounded-xl
                border
                border-[#1C2734]
                bg-[#0A1018]
                p-4
            ">

                <p className="
                    text-sm font-semibold
                    uppercase
                    tracking-[0.12em]
                ">
                    Today's Problems
                </p>

                <p className="
                    mt-3
                    text-xs
                    text-[#6B7788]
                ">
                    No problems available for today.
                </p>

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Main UI
    |--------------------------------------------------------------------------
    */

    return (
        <div className="
            rounded-xl
            border
            border-[#1C2734]
            bg-[#0A1018]
            p-4
        ">

            {/* =========================================================
                HEADER
            ========================================================== */}

            <div className="
                flex
                items-center
                justify-between
            ">

                <div>

                    <p className="
                        text-sm font-semibold
                        uppercase
                        tracking-[0.12em]
                    ">
                        Today's Problems
                    </p>

                    <p className="
                        mt-1
                        text-xs
                        text-[#6B7788]
                    ">
                        Keep your daily practice going.
                    </p>

                </div>


                <span className="
                    rounded-full
                    bg-[#4AFFC4]/10
                    px-2
                    py-1
                    font-mono
                    text-[9px]
                    text-[#4AFFC4]
                ">
                    {problems.length} problems
                </span>

            </div>


            {/* =========================================================
                PROBLEMS
            ========================================================== */}

            <div className="mt-4 space-y-2">

                {problems.map((problem) => (

                    <a
                        key={problem._id}
                        href={problem.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group
                            flex
                            items-center
                            justify-between
                            gap-3
                            rounded-lg
                            border
                            border-[#1C2734]
                            bg-[#080D14]
                            px-3
                            py-2.5
                            transition
                            hover:border-[#4AFFC4]/40
                            hover:bg-[#0D151F]
                        "
                    >

                        <div className="
                            min-w-0
                            flex
                            items-center
                            gap-3
                        ">

                            {/* Category */}

                            <span className="
                                shrink-0
                                rounded
                                bg-[#4AFFC4]/10
                                px-1.5
                                py-1
                                font-mono
                                text-[8px]
                                uppercase
                                text-[#4AFFC4]
                            ">
                                {problem.category}
                            </span>


                            {/* Problem information */}

                            <div className="min-w-0">

                                <p className="
                                    truncate
                                    text-xs
                                    font-medium
                                    text-white
                                    transition
                                    group-hover:text-[#4AFFC4]
                                ">
                                    {problem.title}
                                </p>

                                <p className="
                                    mt-0.5
                                    truncate
                                    font-mono
                                    text-[9px]
                                    text-[#556275]
                                ">
                                    {problem.platform}
                                    {" · "}
                                    {problem.rating}
                                </p>

                            </div>

                        </div>


                        {/* External link */}

                        <ExternalLink
                            size={13}
                            className="
                                shrink-0
                                text-[#556275]
                                transition
                                group-hover:text-[#4AFFC4]
                            "
                        />

                    </a>

                ))}

            </div>

        </div>
    );
};


export default TodayProblems;