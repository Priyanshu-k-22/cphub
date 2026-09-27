import React from "react";

const DashboardHeader = () => {
    const today = new Date();

    const date = today.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="mb-4 flex items-end justify-between">

            <div>

                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#556275]">
                    dashboard
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight">
                    Welcome back 👋
                </h1>

                {/* Daily Motivation */}
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-[#4AFFC4]">›</span>

                    <p className="text-xs italic text-[#4AFFC4]">
                        "Consistency beats intensity when intensity doesn't last."
                    </p>
                </div>

            </div>

            <p className="font-mono text-[10px] text-[#556275]">
                {date}
            </p>

        </div>
    );
};

export default DashboardHeader;