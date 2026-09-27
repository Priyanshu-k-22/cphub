import React from "react";

import {
    CheckCircle2,
    UserPlus,
    LogIn,
    Trophy,
    Code2
} from "lucide-react";

import AdminLayout
    from "../components/AdminLayout";

import AdminPageHeader
    from "../components/AdminPageHeader";


const activities = [
    {
        user: "student01",
        action: "Solved Watermelon",
        type: "Problem",
        time: "2 min ago",
        icon: CheckCircle2
    },
    {
        user: "student02",
        action: "Registered",
        type: "User",
        time: "7 min ago",
        icon: UserPlus
    },
    {
        user: "student03",
        action: "Logged in",
        type: "Auth",
        time: "10 min ago",
        icon: LogIn
    },
    {
        user: "student04",
        action: "Joined contest",
        type: "Contest",
        time: "14 min ago",
        icon: Trophy
    },
    {
        user: "student05",
        action: "Completed CP Sheet problem",
        type: "CP",
        time: "18 min ago",
        icon: Code2
    }
];


const UserActivity = () => {

    return (

        <AdminLayout>

            <div className="px-4 py-5 sm:px-5 lg:px-7">

                <AdminPageHeader
                    title="User Activity"
                    description="Monitor recent activity across CpHub."
                />


                <div
                    className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#1C2734]
                        bg-[#080D14]
                    "
                >

                    {activities.map(
                        (activity, index) => {

                            const Icon =
                                activity.icon;

                            return (

                                <div
                                    key={index}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        border-b
                                        border-[#1C2734]/60
                                        px-4
                                        py-3
                                        last:border-0
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-8
                                            w-8
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-[#0D151F]
                                            text-[#4AFFC4]
                                        "
                                    >

                                        <Icon size={14} />

                                    </div>


                                    <div className="flex-1">

                                        <p
                                            className="
                                                text-[10px]
                                                text-[#DCE4ED]
                                            "
                                        >
                                            <span className="text-[#4AFFC4]">
                                                {activity.user}
                                            </span>

                                            {" "}
                                            {activity.action}

                                        </p>

                                        <p
                                            className="
                                                mt-0.5
                                                font-mono
                                                text-[8px]
                                                text-[#556275]
                                            "
                                        >
                                            {activity.type}
                                        </p>

                                    </div>


                                    <span
                                        className="
                                            font-mono
                                            text-[8px]
                                            text-[#465364]
                                        "
                                    >
                                        {activity.time}
                                    </span>

                                </div>

                            );

                        }
                    )}

                </div>

            </div>

        </AdminLayout>

    );
};


export default UserActivity;