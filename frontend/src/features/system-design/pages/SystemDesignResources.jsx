import React from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const SystemDesignResources = () => {

    const resources = [
        {
            number: "01",
            title: "Resource Coming Soon",
            description:
                "A curated System Design resource will be added here.",
            link: "",
        },
        {
            number: "02",
            title: "Resource Coming Soon",
            description:
                "More System Design learning material will be added here.",
            link: "",
        },
        {
            number: "03",
            title: "Resource Coming Soon",
            description:
                "Useful System Design references will be added here.",
            link: "",
        },
    ];

    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7]">

            <main className="mx-auto max-w-6xl px-5 py-20">

                {/* BACK */}

                <Link
                    to="/system-design"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        font-mono
                        text-sm
                        text-[#778396]
                        transition
                        hover:text-[#4AFFC4]
                    "
                >
                    <ArrowLeft size={16} />
                    system_design
                </Link>


                {/* HEADER */}

                <section className="mt-10 max-w-3xl">

                    <p className="font-mono text-sm text-[#4AFFC4]">
                        03 / resources
                    </p>

                    <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                        System Design Resources
                    </h1>

                    <p className="mt-5 text-base leading-7 text-[#AEB9C7] md:text-lg">
                        Curated resources to help you learn System Design
                        from fundamentals to advanced concepts.
                    </p>

                </section>


                {/* RESOURCE CARDS */}

                <section className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {resources.map((resource) => (

                        <div
                            key={resource.number}
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
                                hover:border-[#4AFFC4]/30
                                hover:bg-[#0C131C]
                            "
                        >

                            {/* NUMBER */}

                            <div className="flex items-center justify-between">

                                <span
                                    className="
                                        font-mono
                                        text-sm
                                        font-bold
                                        text-[#4AFFC4]
                                    "
                                >
                                    {resource.number}
                                </span>

                                <ExternalLink
                                    size={18}
                                    className="text-[#556275]"
                                />

                            </div>


                            {/* TITLE */}

                            <h2
                                className="
                                    mt-8
                                    text-xl
                                    font-semibold
                                    group-hover:text-[#4AFFC4]
                                "
                            >
                                {resource.title}
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
                                {resource.description}
                            </p>


                            {/* LINK */}

                            {resource.link ? (

                                <a
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        mt-6
                                        inline-flex
                                        items-center
                                        gap-2
                                        font-mono
                                        text-sm
                                        text-[#4AFFC4]
                                        transition
                                        hover:underline
                                    "
                                >
                                    Open Resource
                                    <ExternalLink size={15} />
                                </a>

                            ) : (

                                <span
                                    className="
                                        mt-6
                                        inline-block
                                        font-mono
                                        text-xs
                                        text-[#556275]
                                    "
                                >
                                    link_pending
                                </span>

                            )}

                        </div>

                    ))}

                </section>

            </main>

        </div>
    );
};

export default SystemDesignResources;