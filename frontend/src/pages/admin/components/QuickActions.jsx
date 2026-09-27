import React from "react";
import { Link } from "react-router-dom";

import {
    CalendarPlus,
    Code2,
    Brain,
    Trophy
} from "lucide-react";


const actions = [
    {
        label: "Daily Problem",
        description: "Add today's problem",
        icon: CalendarPlus,
        path: "/admin/daily-problems"
    },
    {
        label: "CP Problem",
        description: "Add to CP Sheet",
        icon: Code2,
        path: "/admin/cp-sheet"
    },
    {
        label: "DSA Problem",
        description: "Add to DSA Sheet",
        icon: Brain,
        path: "/admin/dsa-sheet"
    },
    {
        label: "Contest",
        description: "Manage contests",
        icon: Trophy,
        path: "/admin/contests"
    }
];


const QuickActions = () => {

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

            <div
                className="
                    border-b
                    border-[#1C2734]
                    px-4
                    py-3
                "
            >

                <h2
                    className="
                        text-xs
                        font-semibold
                        text-[#DCE4ED]
                    "
                >
                    Quick Actions
                </h2>

                <p
                    className="
                        mt-0.5
                        text-[9px]
                        text-[#556275]
                    "
                >
                    Common management tasks
                </p>

            </div>


            <div
                className="
                    grid
                    grid-cols-2
                    gap-2
                    p-3
                "
            >

                {actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <Link
                            key={action.label}
                            href={action.path}
                            className="
                                group
                                rounded-lg
                                border
                                border-[#1C2734]
                                bg-[#070B11]
                                p-3
                                transition
                                hover:border-[#4AFFC4]/20
                                hover:bg-[#0C1518]
                            "
                        >

                            <Icon
                                size={15}
                                className="
                                    mb-2
                                    text-[#4AFFC4]
                                "
                            />

                            <p
                                className="
                                    text-[10px]
                                    font-medium
                                    text-[#DCE4ED]
                                "
                            >
                                {action.label}
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    text-[8px]
                                    text-[#556275]
                                "
                            >
                                {action.description}
                            </p>

                        </Link>

                    );

                })}

            </div>

        </section>
    );
};


export default QuickActions;
