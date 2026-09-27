import React from "react";

import {
    Users,
    Code2,
    CalendarDays,
    CheckCircle2
} from "lucide-react";

import StatCard from "./StatCard";

const StatsGrid = ({ stats, loading }) => {
    const cards = [
        {
            label: "Total Users",
            value: stats?.totalUsers,
            description: "registered accounts",
            icon: Users
        },
        {
            label: "Active CP Problems",
            value: stats?.activeCPProblems,
            description: "in the CP sheet",
            icon: Code2
        },
        {
            label: "Daily Problems",
            value: stats?.totalDailyProblems,
            description: "published and draft",
            icon: CalendarDays
        },
        {
            label: "CP Problems Solved",
            value: stats?.solvedCPProblems,
            description: "tracked completions",
            icon: CheckCircle2
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {cards.map((card) => (
                <StatCard
                    key={card.label}
                    {...card}
                    value={loading ? "…" : card.value == null ? "—" : Number(card.value).toLocaleString()}
                />
            ))}
        </div>
    );
};

export default StatsGrid;
