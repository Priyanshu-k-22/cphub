import React from "react";
import { Link } from "react-router-dom";

const DSAProgress = () => {
    return (
        <div className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-4">

            <div className="flex items-center justify-between">

                <h2 className="text-sm font-semibold">
                    DSA Progress
                </h2>

                <Link
                    to="/problems"
                    className="font-mono text-[9px] text-[#4AFFC4] hover:text-white"
                >
                    continue →
                </Link>

            </div>


            <div className="mt-4 grid grid-cols-2 gap-4">

                <div>
                    <p className="font-mono text-[9px] uppercase text-[#556275]">
                        solved
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                        115
                    </p>
                </div>

                <div>
                    <p className="font-mono text-[9px] uppercase text-[#556275]">
                        progress
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                        72%
                    </p>
                </div>

            </div>


            <div className="mt-4 flex items-center justify-between">

                <span className="font-mono text-[9px] text-[#556275]">
                    Current: Dynamic Programming
                </span>

                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#111923]">

                    <div
                        className="h-full rounded-full bg-[#4AFFC4]"
                        style={{ width: "72%" }}
                    />

                </div>

            </div>

        </div>
    );
};

export default DSAProgress;