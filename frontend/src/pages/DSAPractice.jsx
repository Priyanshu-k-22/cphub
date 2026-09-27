import React from "react";
import { ArrowUpRight, Code2 } from "lucide-react";

import Footer from "../components/Footer.jsx";
import { dsaTopics } from "../data/dsaTopics.js";

const DSAPractice = () => {
    return (
        <div className="min-h-screen bg-[#060A10] text-[#EDF2F7]">

      

            <main className="mx-auto max-w-6xl px-5 py-20">

                {/* Header */}
                <section className="max-w-3xl">

                    <p className="font-mono text-sm text-[#4AFFC4]">
                        cp/dsa/practice
                    </p>

                    <h1 className="mt-4 font-display text-4xl font-bold md:text-6xl">
                        Practice Problems
                    </h1>

                    <p className="mt-5 text-base leading-7 text-[#AEB9C7] md:text-lg">
                        Choose a DSA topic and practice curated problems
                        directly on LeetCode.
                    </p>

                </section>


                {/* Topics */}
                <section className="mt-14">

                    <div className="mb-6 flex items-center justify-between">

                        <div>
                            <h2 className="text-2xl font-semibold">
                                Topics
                            </h2>

                            <p className="mt-1 text-sm text-[#778396]">
                                Select a topic to start practicing.
                            </p>
                        </div>

                        <span className="font-mono text-sm text-[#556275]">
                            {dsaTopics.length} topics
                        </span>

                    </div>


                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {dsaTopics.map((topic) => (

                            <article
                                key={topic.id}
                                className="group flex flex-col rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#4AFFC4]/40 hover:bg-[#0C131C]"
                            >

                                <div className="flex items-start justify-between">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5">
                                        <Code2
                                            size={20}
                                            className="text-[#4AFFC4]"
                                        />
                                    </div>

                                    <span className="rounded-full border border-[#1C2734] px-3 py-1 font-mono text-xs text-[#778396]">
                                        {topic.difficulty}
                                    </span>

                                </div>


                                <h3 className="mt-6 text-xl font-semibold transition group-hover:text-[#4AFFC4]">
                                    {topic.name}
                                </h3>


                                <p className="mt-3 flex-1 text-sm leading-6 text-[#778396]">
                                    {topic.description}
                                </p>


                                <a
                                    href={topic.leetcodeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 flex items-center justify-between rounded-lg border border-[#1C2734] bg-[#060A10] px-4 py-3 font-mono text-sm text-[#AEB9C7] transition hover:border-[#4AFFC4]/40 hover:text-[#4AFFC4]"
                                >
                                    <span>Practice on LeetCode</span>

                                    <ArrowUpRight size={17} />
                                </a>

                            </article>

                        ))}

                    </div>

                </section>

            </main>

            <Footer />

        </div>
    );
};

export default DSAPractice;