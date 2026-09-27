import React from "react";

const ProgressRow = ({ label, value, total }) => {

    const percentage = (value / total) * 100;

    return (
        <div>

            <div className="mb-1 flex justify-between">

                <span className="font-mono text-[10px] text-[#AEB9C7]">
                    {label}
                </span>

                <span className="font-mono text-[9px] text-[#556275]">
                    {value}/{total}
                </span>

            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-[#111923]">

                <div
                    className="h-full rounded-full bg-[#4AFFC4]"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

        </div>
    );
};


const TodayProgress = () => {

    return (
        <div className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-4">

            <div className="flex items-center justify-between">

                <h2 className="text-sm font-semibold">
                    Today
                </h2>

                <span className="font-mono text-[9px] text-[#4AFFC4]">
                    7 / 10
                </span>

            </div>


            <div className="mt-4 space-y-3">

                <ProgressRow
                    label="CP"
                    value={4}
                    total={5}
                />

                <ProgressRow
                    label="DSA"
                    value={3}
                    total={5}
                />

            </div>


            <p className="mt-3 font-mono text-[9px] text-[#556275]">
                3 problems remaining
            </p>

        </div>
    );
};

export default TodayProgress;