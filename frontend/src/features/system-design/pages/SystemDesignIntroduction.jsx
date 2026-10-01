import React from "react";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const SystemDesignIntroduction = () => {
    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7]">

            <main className="mx-auto max-w-5xl px-5 py-20">

                {/* HEADER */}

                <section className="max-w-3xl">

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

                    <p className="mt-10 font-mono text-sm text-[#4AFFC4]">
                        01 / introduction
                    </p>

                    <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                        Introduction to System Design
                    </h1>

                    <p className="mt-5 text-base leading-7 text-[#AEB9C7] md:text-lg">
                        Understand the fundamentals of System Design and
                        how large software systems are structured.
                    </p>

                </section>


                {/* CONTENT */}

                <section className="mt-14 space-y-8">

                    {/* WHAT IS SYSTEM DESIGN */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[#1C2734]
                            bg-[#0A1018]
                            p-7
                            md:p-9
                        "
                    >

                        <div className="flex items-center gap-3">

                            <BookOpen
                                size={22}
                                className="text-[#4AFFC4]"
                            />

                            <h2 className="text-2xl font-semibold">
                                What is System Design?
                            </h2>

                        </div>

                        <p className="mt-5 leading-7 text-[#AEB9C7]">
                            System Design is the process of designing the
                            architecture, components and interactions of a
                            software system so that it can meet specific
                            requirements.
                        </p>

                        <p className="mt-4 leading-7 text-[#AEB9C7]">
                            When building a small application, a simple
                            architecture may be enough. As the number of
                            users, requests and data increases, the system
                            needs a carefully planned architecture.
                        </p>

                    </div>


                    {/* WHAT WE STUDY */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[#1C2734]
                            bg-[#0A1018]
                            p-7
                            md:p-9
                        "
                    >

                        <h2 className="text-2xl font-semibold">
                            What do we study in System Design?
                        </h2>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">

                            {[
                                "System Architecture",
                                "Scalability",
                                "Databases",
                                "Caching",
                                "Load Balancing",
                                "APIs",
                                "Message Queues",
                                "Distributed Systems",
                            ].map((topic) => (

                                <div
                                    key={topic}
                                    className="
                                        rounded-xl
                                        border
                                        border-[#1C2734]
                                        bg-[#080D14]
                                        px-5
                                        py-4
                                        text-sm
                                        text-[#AEB9C7]
                                        transition
                                        hover:border-[#4AFFC4]/30
                                        hover:text-[#4AFFC4]
                                    "
                                >
                                    {topic}
                                </div>

                            ))}

                        </div>

                    </div>

                </section>


                {/* NEXT */}

                <div className="mt-12 flex justify-end">

                    <Link
                        to="/system-design/why-system-design"
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
                        Why System Design
                        <ArrowRight size={16} />
                    </Link>

                </div>

            </main>

        </div>
    );
};

export default SystemDesignIntroduction;