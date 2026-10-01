import React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const SystemDesignWhy = () => {

    const reasons = [
        {
            title: "Build Scalable Applications",
            description:
                "Learn how applications can handle increasing numbers of users and requests without breaking down.",
        },
        {
            title: "Understand Real-World Systems",
            description:
                "Understand how large applications are structured and how different components communicate with each other.",
        },
        {
            title: "Improve Backend Knowledge",
            description:
                "System Design helps you understand databases, APIs, caching, load balancing and other backend concepts.",
        },
        {
            title: "Prepare for Technical Interviews",
            description:
                "System Design is commonly discussed in software engineering interviews, especially for backend and experienced developer roles.",
        },
        {
            title: "Make Better Architecture Decisions",
            description:
                "Learn how to choose suitable technologies and architectural approaches based on system requirements.",
        },
        {
            title: "Think Beyond Individual Code",
            description:
                "Move from thinking only about individual functions and algorithms to thinking about complete software systems.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7]">

            <main className="mx-auto max-w-5xl px-5 py-20">

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
                        02 / why_system_design
                    </p>

                    <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                        Why System Design?
                    </h1>

                    <p className="mt-5 text-base leading-7 text-[#AEB9C7] md:text-lg">
                        System Design helps you understand how software
                        systems are planned, structured and built to work
                        reliably at scale.
                    </p>

                </section>


                {/* REASONS */}

                <section className="mt-14 grid gap-5 md:grid-cols-2">

                    {reasons.map((reason, index) => (

                        <div
                            key={reason.title}
                            className="
                                group
                                rounded-2xl
                                border
                                border-[#1C2734]
                                bg-[#0A1018]
                                p-7
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-[#4AFFC4]/30
                                hover:bg-[#0C131C]
                            "
                        >

                            <div className="flex items-start gap-4">

                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        border
                                        border-[#4AFFC4]/20
                                        bg-[#4AFFC4]/5
                                        font-mono
                                        text-xs
                                        text-[#4AFFC4]
                                    "
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div>

                                    <h2
                                        className="
                                            text-lg
                                            font-semibold
                                            transition
                                            group-hover:text-[#4AFFC4]
                                        "
                                    >
                                        {reason.title}
                                    </h2>

                                    <p
                                        className="
                                            mt-3
                                            text-sm
                                            leading-6
                                            text-[#778396]
                                        "
                                    >
                                        {reason.description}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </section>


                {/* KEY IDEA */}

                <section
                    className="
                        mt-10
                        rounded-2xl
                        border
                        border-[#4AFFC4]/20
                        bg-[#4AFFC4]/5
                        p-7
                        md:p-9
                    "
                >

                    <div className="flex items-start gap-4">

                        <CheckCircle2
                            size={24}
                            className="mt-1 shrink-0 text-[#4AFFC4]"
                        />

                        <div>

                            <h2 className="text-xl font-semibold">
                                The key idea
                            </h2>

                            <p className="mt-3 leading-7 text-[#AEB9C7]">
                                DSA teaches you how to solve problems
                                efficiently. System Design teaches you how
                                to combine those solutions and components
                                into a complete software system.
                            </p>

                        </div>

                    </div>

                </section>


                {/* NEXT */}

                <div className="mt-12 flex justify-end">

                    <Link
                        to="/system-design/resources"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-[#4AFFC4]/30
                            bg-[#4AFFC4]/5
                            px-5
                            py-3
                            font-mono
                            text-sm
                            text-[#4AFFC4]
                            transition
                            hover:border-[#4AFFC4]
                            hover:bg-[#4AFFC4]/10
                        "
                    >
                        System Design Resources
                        <ArrowRight size={16} />
                    </Link>

                </div>

            </main>

        </div>
    );
};

export default SystemDesignWhy;