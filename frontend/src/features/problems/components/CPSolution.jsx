import React, { useState } from "react";

import ProblemSection from "./ProblemSection";
import CodeBlock from "./CodeBlock";

const CPSolution = ({ problem }) => {
    const [open, setOpen] = useState(false);

    return (
        <ProblemSection title="Editorial">

            <button
                type="button"
                onClick={() => setOpen((previous) => !previous)}
                className="flex w-full items-center justify-between rounded-xl border border-[#1C2734] bg-[#0A1018] px-5 py-5 text-left transition hover:border-[#4AFFC4]/30"
            >

                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#556275]">
                        competitive programming
                    </p>

                    <p className="mt-1 font-medium text-[#EDF2F7]">
                        View Editorial
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
                <div className="mt-3 rounded-xl border border-[#1C2734] bg-[#0A1018] p-6">

                    {problem.intuition && (
                        <EditorialText
                            label="intuition"
                            value={problem.intuition}
                        />
                    )}


                    {problem.approach && (
                        <EditorialText
                            label="approach"
                            value={problem.approach}
                        />
                    )}


                    {problem.code && (
                        <div className="mt-7">

                            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[#556275]">
                                implementation
                            </p>

                            <CodeBlock
                                code={problem.code}
                                language="cpp"
                            />

                        </div>
                    )}


                    {(problem.timeComplexity ||
                        problem.spaceComplexity) && (
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">

                            {problem.timeComplexity && (
                                <ComplexityCard
                                    label="time"
                                    value={problem.timeComplexity}
                                />
                            )}

                            {problem.spaceComplexity && (
                                <ComplexityCard
                                    label="space"
                                    value={problem.spaceComplexity}
                                />
                            )}

                        </div>
                    )}

                </div>
            )}

        </ProblemSection>
    );
};


const EditorialText = ({
    label,
    value
}) => {
    return (
        <div className="mb-7">

            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[#556275]">
                {label}
            </p>

            <p className="whitespace-pre-line leading-7 text-[#AEB9C7]">
                {value}
            </p>

        </div>
    );
};


const ComplexityCard = ({
    label,
    value
}) => {
    return (
        <div className="rounded-lg border border-[#1C2734] bg-[#060A10] p-4">

            <p className="font-mono text-xs uppercase text-[#556275]">
                {label}
            </p>

            <p className="mt-1 font-mono text-sm text-[#4AFFC4]">
                {value}
            </p>

        </div>
    );
};


export default CPSolution;