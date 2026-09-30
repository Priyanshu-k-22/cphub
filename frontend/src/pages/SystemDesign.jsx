import React from "react";
import { ArrowRight, BookOpen, HelpCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const SystemDesign = () => {
    const sections = [
        {
            number: "01",
            title: "Introduction",
            description:
                "Understand what system design is and learn the basic concepts required to design software systems.",
            icon: BookOpen,
            path: "/system-design/introduction",
        },
        {
            number: "02",
            title: "Why System Design?",
            description:
                "Learn why system design is important and how it helps developers build scalable and reliable applications.",
            icon: HelpCircle,
            path: "/system-design/why-system-design",
        },
        {
            number: "03",
            title: "Resources",
            description:
                "Explore curated System Design resources, courses, playlists, articles and other learning materials.",
            icon: ExternalLink,
            path: "/system-design/resources",
        },
    ];

    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7]">

            <main className="mx-auto max-w-6xl px-5 py-20">

                {/* HEADER */}

                <section className="max-w-3xl">

                    <p className="font-mono text-sm text-[#4AFFC4]">
                        cp/dsa_club/system-design
                    </p>

                    <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                        System Design
                    </h1>

                    <p className="mt-5 text-base leading-7 text-[#AEB9C7] md:text-lg">
                        Learn how real-world software systems are designed,
                        structured and scaled to handle users, data and traffic.
                    </p>

                </section>


                {/* SECTION CARDS */}

                <section className="mt-16 grid gap-6 md:grid-cols-3">

                    {sections.map((section) => {

                        const Icon = section.icon;

                        return (
                            <Link
                                key={section.number}
                                to={section.path}
                                className="
                                    group
                                    rounded-2xl
                                    border
                                    border-[#1C2734]
                                    bg-[#0A1018]
                                    p-6
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-[#4AFFC4]/40
                                    hover:bg-[#0C131C]
                                "
                            >

                                {/* NUMBER + ICON */}

                                <div className="flex items-center justify-between">

                                    <span
                                        className="
                                            font-mono
                                            text-sm
                                            font-bold
                                            text-[#4AFFC4]
                                        "
                                    >
                                        {section.number}
                                    </span>

                                    <Icon
                                        size={22}
                                        className="
                                            text-[#556275]
                                            transition
                                            duration-300
                                            group-hover:text-[#4AFFC4]
                                        "
                                    />

                                </div>


                                {/* TITLE */}

                                <h2
                                    className="
                                        mt-8
                                        text-2xl
                                        font-semibold
                                        transition
                                        duration-200
                                        group-hover:text-[#4AFFC4]
                                    "
                                >
                                    {section.title}
                                </h2>


                                {/* DESCRIPTION */}

                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        leading-6
                                        text-[#778396]
                                    "
                                >
                                    {section.description}
                                </p>


                                {/* EXPLORE */}

                                <div
                                    className="
                                        mt-8
                                        flex
                                        items-center
                                        gap-2
                                        font-mono
                                        text-sm
                                        text-[#4AFFC4]
                                    "
                                >
                                    Explore

                                    <ArrowRight
                                        size={16}
                                        className="
                                            transition
                                            duration-200
                                            group-hover:translate-x-1
                                        "
                                    />

                                </div>

                            </Link>
                        );
                    })}

                </section>

            </main>

        </div>
    );
};

export default SystemDesign;