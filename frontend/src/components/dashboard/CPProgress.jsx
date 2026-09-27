import React from "react";
import { Link } from "react-router-dom";


const CPProgress = ({
    codeforces,
    loading
}) => {

    const rating =
        codeforces?.rating ?? 0;


    return (
        <div className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-4">


            {/* =========================================================
                HEADER
            ========================================================== */}

            <div className="flex items-center justify-between">

                <h2 className="text-sm font-semibold">
                    CP Progress
                </h2>

                <Link
                    to="/cp/sheet"
                    className="
                        font-mono
                        text-[9px]
                        text-[#4AFFC4]
                        transition
                        hover:text-white
                    "
                >
                    continue →
                </Link>

            </div>


            {/* =========================================================
                STATS
            ========================================================== */}

            <div className="mt-4 grid grid-cols-2 gap-4">


                {/* =====================================================
                    RATING
                ====================================================== */}

                <div>

                    <p className="font-mono text-[9px] uppercase text-[#556275]">
                        rating
                    </p>


                    {loading ? (

                        <div className="mt-2 h-6 w-14 animate-pulse rounded bg-[#1C2734]" />

                    ) : (

                        <p className="mt-1 text-lg font-semibold">
                            {rating}
                        </p>

                    )}

                </div>


                {/* =====================================================
                    SHEET
                ====================================================== */}

                <div>

                    <p className="font-mono text-[9px] uppercase text-[#556275]">
                        sheet
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                        82/100
                    </p>

                </div>

            </div>


            {/* =========================================================
                PROGRESS BAR
            ========================================================== */}

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#111923]">

                <div
                    className="
                        h-full
                        rounded-full
                        bg-[#4AFFC4]
                    "
                    style={{
                        width: "82%"
                    }}
                />

            </div>

        </div>
    );
};


export default CPProgress;