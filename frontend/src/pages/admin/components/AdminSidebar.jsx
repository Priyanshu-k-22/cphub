import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    CalendarDays,
    Code2,
    Brain,
    Trophy,
    Users,
    Activity,
    Settings,
    Shield,
    FileText,
    ExternalLink,
    LogOut,
    BookOpen,
    Network,
    Lightbulb,
    BriefcaseBusiness,
    ChevronRight
} from "lucide-react";


const AdminSidebar = () => {

    const navigate = useNavigate();


    const sections = [

        {
            title: null,
            items: [
                {
                    label: "Overview",
                    icon: LayoutDashboard,
                    path: "/admin/dashboard"
                }
            ]
        },


        {
            title: "Content",
            items: [
                {
                    label: "Daily Problems",
                    icon: CalendarDays,
                    path: "/admin/daily-problems"
                },
                {
                    label: "CP Sheet",
                    icon: Code2,
                    path: "/admin/cp-sheet"
                },
                {
                    label: "DSA Sheet",
                    icon: Brain,
                    path: "/admin/dsa-sheet"
                }
            ]
        },


        {
            title: "Learning",
            items: [
                {
                    label: "CTC / Must Know",
                    icon: BriefcaseBusiness,
                    path: "/admin/ctc"
                },
                {
                    label: "Interview Blogs",
                    icon: BookOpen,
                    path: "/admin/interview"
                },
                {
                    label: "System Design",
                    icon: Network,
                    path: "/admin/system-design"
                },
                {
                    label: "Miscellaneous",
                    icon: Lightbulb,
                    path: "/admin/miscellaneous"
                }
            ]
        },


        {
            title: "Platform",
            items: [
                {
                    label: "Contests",
                    icon: Trophy,
                    path: "/admin/contests"
                }
            ]
        },


        {
            title: "Users",
            items: [
                {
                    label: "All Users",
                    icon: Users,
                    path: "/admin/users"
                },
                {
                    label: "Activity",
                    icon: Activity,
                    path: "/admin/activity"
                },
                {
                    label: "Progress",
                    icon: Activity,
                    path: "/admin/progress"
                }
            ]
        },


        {
            title: "System",
            items: [
                {
                    label: "Settings",
                    icon: Settings,
                    path: "/admin/settings"
                },
                {
                    label: "Admins",
                    icon: Shield,
                    path: "/admin/admins"
                },
                {
                    label: "Logs",
                    icon: FileText,
                    path: "/admin/logs"
                }
            ]
        }

    ];


    const handleLogout = () => {

        navigate("/login");

    };


    return (

        <aside
            className="
                hidden
                h-screen
                w-[225px]
                shrink-0
                border-r
                border-[#1C2734]
                bg-[#070B11]
                lg:block
            "
        >

            <div
                className="
                    sticky
                    top-0
                    flex
                    h-screen
                    flex-col
                "
            >

                {/* LOGO */}

                <div
                    className="
                        flex
                        h-[60px]
                        shrink-0
                        items-center
                        border-b
                        border-[#1C2734]
                        px-5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2.5
                        "
                    >

                        <div
                            className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-md
                                bg-[#4AFFC4]
                                font-bold
                                text-[#06100C]
                            "
                        >
                            C
                        </div>

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-[#E8EEF5]
                                "
                            >
                                CpHub
                            </p>

                            <p
                                className="
                                    font-mono
                                    text-[8px]
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#556275]
                                "
                            >
                                Admin Panel
                            </p>

                        </div>

                    </div>

                </div>


                {/* NAVIGATION */}

                <nav
                    className="
                        flex-1
                        overflow-y-auto
                        px-3
                        py-4
                    "
                >

                    {sections.map(
                        (section, sectionIndex) => (

                            <div
                                key={sectionIndex}
                                className={
                                    sectionIndex > 0
                                        ? "mt-6"
                                        : ""
                                }
                            >

                                {section.title && (

                                    <p
                                        className="
                                            mb-2
                                            px-3
                                            font-mono
                                            text-[8px]
                                            uppercase
                                            tracking-[0.18em]
                                            text-[#394656]
                                        "
                                    >
                                        {section.title}
                                    </p>

                                )}


                                <div className="space-y-0.5">

                                    {section.items.map(
                                        (item) => {

                                            const Icon =
                                                item.icon;

                                            return (

                                                <NavLink
                                                    key={
                                                        item.path
                                                    }
                                                    to={
                                                        item.path
                                                    }
                                                    className={({
                                                        isActive
                                                    }) => `
                                                        group
                                                        flex
                                                        items-center
                                                        gap-2.5
                                                        rounded-lg
                                                        px-3
                                                        py-2
                                                        text-xs
                                                        transition
                                                        ${
                                                            isActive
                                                                ? `
                                                                    bg-[#10201B]
                                                                    text-[#4AFFC4]
                                                                  `
                                                                : `
                                                                    text-[#687587]
                                                                    hover:bg-[#0D151F]
                                                                    hover:text-[#E8EEF5]
                                                                  `
                                                        }
                                                    `}
                                                >

                                                    <Icon
                                                        size={14}
                                                        strokeWidth={
                                                            1.8
                                                        }
                                                    />

                                                    <span className="flex-1">
                                                        {
                                                            item.label
                                                        }
                                                    </span>


                                                    <ChevronRight
                                                        size={11}
                                                        className="
                                                            opacity-0
                                                            transition
                                                            group-hover:opacity-50
                                                        "
                                                    />

                                                </NavLink>

                                            );

                                        }
                                    )}

                                </div>

                            </div>

                        )
                    )}

                </nav>


                {/* BOTTOM */}

                <div
                    className="
                        shrink-0
                        border-t
                        border-[#1C2734]
                        p-3
                    "
                >

                    <NavLink
                        to="/"
                        className="
                            flex
                            items-center
                            gap-2.5
                            rounded-lg
                            px-3
                            py-2
                            text-xs
                            text-[#687587]
                            transition
                            hover:bg-[#0D151F]
                            hover:text-[#E8EEF5]
                        "
                    >

                        <ExternalLink size={14} />

                        Student Site

                    </NavLink>


                    <button
                        onClick={handleLogout}
                        className="
                            mt-1
                            flex
                            w-full
                            items-center
                            gap-2.5
                            rounded-lg
                            px-3
                            py-2
                            text-xs
                            text-[#687587]
                            transition
                            hover:bg-red-500/5
                            hover:text-red-400
                        "
                    >

                        <LogOut size={14} />

                        Logout

                    </button>

                </div>

            </div>

        </aside>

    );
};


export default AdminSidebar;