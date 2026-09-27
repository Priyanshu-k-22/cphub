import React from "react";

const activities = [
    ["Solved Domino piling", "2h ago"],
    ["Completed CP Sheet — 800", "Yesterday"],
    ["Participated in Codeforces Round", "2d ago"],
];

const RecentActivity = () => {
    return (
        <div className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-4">

            <div className="flex items-center justify-between">

                <h2 className="text-sm font-semibold">
                    Recent Activity
                </h2>

                <span className="font-mono text-[9px] text-[#4AFFC4]">
                    history →
                </span>

            </div>


            <div className="mt-2 divide-y divide-[#1C2734]">

                {activities.map(([text, time]) => (
                    <div
                        key={text}
                        className="flex items-center justify-between gap-3 py-2.5"
                    >

                        <div className="flex min-w-0 items-center gap-2">

                            <span className="text-[10px] text-[#4AFFC4]">
                                ✓
                            </span>

                            <p className="truncate text-xs text-[#AEB9C7]">
                                {text}
                            </p>

                        </div>

                        <span className="shrink-0 font-mono text-[9px] text-[#556275]">
                            {time}
                        </span>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default RecentActivity;