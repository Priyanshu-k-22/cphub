import React from "react";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";


import Footer from "../components/Footer.jsx";
import { dsaRoadmap } from "../data/dsaRoadmap.js";

const levelStyles = {
    Beginner: {
        number: "01",
        label: "foundation",
    },
    Intermediate: {
        number: "02",
        label: "development",
    },
    Advanced: {
        number: "03",
        label: "mastery",
    },
};

const DSARoadmap = () => {
    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7] antialiased">

        

            <main className="mx-auto max-w-6xl px-5 py-20">

                {/* Header */}
                <section className="max-w-3xl">
                    <p className="font-mono text-sm text-[#4AFFC4]">
                        cp/dsa_club/dsa/roadmap
                    </p>

                    <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
                        DSA Roadmap
                    </h1>

                    <p className="mt-5 text-base leading-7 text-[#AEB9C7] md:text-lg">
                        A structured path to learn Data Structures and
                        Algorithms from the fundamentals to advanced
                        problem solving.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <span className="rounded-full border border-[#1C2734] bg-[#0A1018] px-4 py-2 font-mono text-xs text-[#AEB9C7]">
                            Beginner → Advanced
                        </span>

                        <span className="rounded-full border border-[#1C2734] bg-[#0A1018] px-4 py-2 font-mono text-xs text-[#AEB9C7]">
                            Learn → Practice → Master
                        </span>
                    </div>
                </section>


                {/* Roadmap */}
                <section className="mt-16 space-y-8">

                    {dsaRoadmap.map((stage) => {

                        const style = levelStyles[stage.level];

                        return (
                            <div
                                key={stage.level}
                                className="overflow-hidden rounded-2xl border border-[#1C2734] bg-[#0A1018]"
                            >

                                {/* Stage Header */}
                                <div className="border-b border-[#1C2734] p-6 md:p-8">

                                    <div className="flex items-start gap-5">

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 font-mono text-sm font-bold text-[#4AFFC4]">
                                            {style.number}
                                        </div>

                                        <div>
                                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#556275]">
                                                {style.label}
                                            </p>

                                            <h2 className="mt-1 text-2xl font-bold">
                                                {stage.level}
                                            </h2>

                                            <p className="mt-2 text-sm leading-6 text-[#AEB9C7]">
                                                {stage.description}
                                            </p>
                                        </div>

                                    </div>
                                </div>


                                {/* Topics */}
                                <div className="grid md:grid-cols-2">

                                    {stage.topics.map((topic, index) => (
                                        <div
                                            key={topic.name}
                                            className={`group p-6 transition hover:bg-[#0C131C] ${
                                                index % 2 === 0
                                                    ? "md:border-r md:border-[#1C2734]"
                                                    : ""
                                            } ${
                                                index < stage.topics.length - 2
                                                    ? "border-b border-[#1C2734]"
                                                    : ""
                                            }`}
                                        >

                                            <div className="flex gap-4">

                                                <div className="mt-1">
                                                    <CheckCircle2
                                                        size={18}
                                                        className="text-[#556275] transition group-hover:text-[#4AFFC4]"
                                                    />
                                                </div>

                                                <div className="flex-1">

                                                    <div className="flex items-start justify-between gap-4">

                                                        <h3 className="font-semibold group-hover:text-[#4AFFC4]">
                                                            {topic.name}
                                                        </h3>

                                                        <ArrowRight
                                                            size={16}
                                                            className="shrink-0 text-[#556275] transition group-hover:translate-x-1 group-hover:text-[#4AFFC4]"
                                                        />

                                                    </div>

                                                    <p className="mt-2 text-sm leading-6 text-[#778396]">
                                                        {topic.description}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>
                        );
                    })}

                </section>


                {/* Bottom CTA */}
                <section className="mt-12 rounded-2xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 p-8 text-center">

                    <BookOpen
                        size={28}
                        className="mx-auto text-[#4AFFC4]"
                    />

                    <h2 className="mt-4 text-2xl font-semibold">
                        Ready to practice?
                    </h2>

                    <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#AEB9C7]">
                        Pick a topic from the roadmap and start solving
                        problems to strengthen your understanding.
                    </p>

                    <a
                        href="/problems"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#4AFFC4]/30 bg-[#4AFFC4]/10 px-5 py-3 font-mono text-sm text-[#4AFFC4] transition hover:border-[#4AFFC4] hover:bg-[#4AFFC4]/20"
                    >
                        practice_problems
                        <ArrowRight size={16} />
                    </a>

                </section>

            </main>

            <Footer />

        </div>
    );
};

export default DSARoadmap;