import React, { useState } from "react";

const ProblemTags = ({ tags = [], topics = [] }) => {
    const [open, setOpen] = useState(false);

    if (!tags.length && !topics.length) {
        return null;
    }

    return (
        <section className="mt-8">

            <button
                type="button"
                onClick={() => setOpen((previous) => !previous)}
                className="flex w-full items-center justify-between rounded-xl border border-[#1C2734] bg-[#0A1018] px-5 py-4 text-left transition hover:border-[#4AFFC4]/30"
            >
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#556275]">
                        metadata
                    </p>

                    <p className="mt-1 font-medium text-[#EDF2F7]">
                        Tags & Topics
                    </p>
                </div>

                <span
                    className={`text-xl text-[#4AFFC4] transition-transform ${
                        open ? "rotate-90" : ""
                    }`}
                >
                    →
                </span>
            </button>


            {open && (
                <div className="mt-3 rounded-xl border border-[#1C2734] bg-[#0A1018] p-5">

                    {tags.length > 0 && (
                        <div>
                            <p className="mb-3 font-mono text-xs text-[#556275]">
                                tags
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-md bg-[#111923] px-3 py-1.5 font-mono text-xs text-[#AEB9C7]"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}


                    {topics.length > 0 && (
                        <div className="mt-6">
                            <p className="mb-3 font-mono text-xs text-[#556275]">
                                topics
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {topics.map((topic) => (
                                    <span
                                        key={topic}
                                        className="rounded-md border border-[#1C2734] px-3 py-1.5 text-sm text-[#AEB9C7]"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            )}

        </section>
    );
};

export default ProblemTags;