import React from "react";
import { Link } from "react-router-dom";

const actions = [
    {
        label: "Daily Problems",
        path: "/problems",
    },
    {
        label: "CP Sheet",
        path: "/cp/sheet",
    },
    {
        label: "Contests",
        path: "/contests",
    },
    {
        label: "Problem History",
        path: "/problems/history",
    },
];

const QuickActions = () => {
    return (
        <div className="rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#556275]">
                shortcuts
            </p>

            <h2 className="mt-2 text-xl font-semibold">
                Quick Actions
            </h2>

            <div className="mt-5 grid gap-2">
                {actions.map((action) => (
                    <Link
                        key={action.path}
                        to={action.path}
                        className="group flex items-center justify-between rounded-lg border border-transparent px-3 py-3 text-sm text-[#AEB9C7] transition hover:border-[#1C2734] hover:bg-[#111923] hover:text-white"
                    >
                        <span>{action.label}</span>

                        <span className="font-mono text-[#556275] transition group-hover:translate-x-1 group-hover:text-[#4AFFC4]">
                            →
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;