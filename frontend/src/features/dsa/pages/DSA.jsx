import React from "react";
import { ArrowRight, BookOpen, Code2, Map } from "lucide-react";


import Footer from "../../../shared/components/layout/Footer.jsx";

const dsaSections = [
    {
        title: "DSA Roadmap",
        description:
            "Follow a structured path from programming fundamentals to advanced data structures and algorithms.",
        icon: Map,
        link: "/dsa/roadmap",
        label: "Explore Roadmap",
    },
    {
        title: "Practice Problems",
        description:
            "Practice topic-wise DSA problems with Easy, Medium and Hard difficulty levels.",
        icon: Code2,
        link: "/dsa-sheet",
        label: "Start Practicing",
    },
    {
        title: "DSA Sheets",
        description:
            "Access curated DSA sheets from popular resources including Apna College and Striver.",
        icon: BookOpen,
        link: "/dsa/sheets",
        label: "View Sheets",
    },
];

const DSA = () => {
    return (
        <div className="min-h-screen bg-[#060A10] text-[#EDF2F7]">

          

            <main className="mx-auto max-w-6xl px-5 py-20">

                {/* Hero */}
                <section className="max-w-3xl">

                    <p className="font-mono text-sm text-[#4AFFC4]">
                        cp/cphub/dsa
                    </p>

                    <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
                        Learn. Practice. Master.
                    </h1>

                    <p className="mt-6 text-base leading-7 text-[#AEB9C7] md:text-lg">
                        Build your Data Structures and Algorithms skills
                        through a structured roadmap, topic-wise practice
                        and curated DSA sheets.
                    </p>

                </section>


                {/* Three Sections */}
                <section className="mt-14 grid gap-6 md:grid-cols-3">

                    {dsaSections.map((section) => {

                        const Icon = section.icon;

                        return (
                            <div
                                key={section.title}
                                className="group flex flex-col rounded-2xl border border-[#1C2734] bg-[#0A1018] p-7 transition duration-200 hover:-translate-y-1 hover:border-[#4AFFC4]/40"
                            >

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5">
                                    <Icon
                                        size={22}
                                        className="text-[#4AFFC4]"
                                    />
                                </div>


                                <h2 className="mt-7 text-2xl font-semibold group-hover:text-[#4AFFC4]">
                                    {section.title}
                                </h2>


                                <p className="mt-3 flex-1 text-sm leading-6 text-[#778396]">
                                    {section.description}
                                </p>


                                <a
                                    href={section.link}
                                    className="mt-7 inline-flex items-center justify-between rounded-lg border border-[#1C2734] bg-[#060A10] px-4 py-3 font-mono text-sm text-[#AEB9C7] transition hover:border-[#4AFFC4]/40 hover:text-[#4AFFC4]"
                                >
                                    <span>{section.label}</span>

                                    <ArrowRight
                                        size={17}
                                        className="transition group-hover:translate-x-1"
                                    />
                                </a>

                            </div>
                        );
                    })}

                </section>


                {/* Learning Flow */}
                <section className="mt-16 rounded-2xl border border-[#1C2734] bg-[#0A1018] p-8">

                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#556275]">
                        recommended_flow
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                        Your DSA Journey
                    </h2>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">

                        <div className="rounded-xl border border-[#1C2734] p-5">
                            <span className="font-mono text-sm text-[#4AFFC4]">
                                01
                            </span>

                            <h3 className="mt-3 font-semibold">
                                Follow the Roadmap
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#778396]">
                                Learn topics in a progression from
                                beginner to advanced.
                            </p>
                        </div>


                        <div className="rounded-xl border border-[#1C2734] p-5">
                            <span className="font-mono text-sm text-[#4AFFC4]">
                                02
                            </span>

                            <h3 className="mt-3 font-semibold">
                                Practice Problems
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#778396]">
                                Strengthen your understanding by solving
                                topic-wise problems.
                            </p>
                        </div>


                        <div className="rounded-xl border border-[#1C2734] p-5">
                            <span className="font-mono text-sm text-[#4AFFC4]">
                                03
                            </span>

                            <h3 className="mt-3 font-semibold">
                                Use DSA Sheets
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#778396]">
                                Continue structured practice using
                                curated DSA sheets.
                            </p>
                        </div>

                    </div>

                </section>

            </main>

            <Footer />

        </div>
    );
};

export default DSA;
