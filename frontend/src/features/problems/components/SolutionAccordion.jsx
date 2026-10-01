import React, { useState } from "react";

import CodeBlock from "./CodeBlock";

const SolutionAccordion = ({
    number,
    title,
    solution,
    defaultOpen = false
}) => {
    const [open, setOpen] = useState(defaultOpen);

    if (!solution) {
        return null;
    }

    return (
        <div className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#0A1018]">

            <button
                type="button"
                onClick={() => setOpen((previous) => !previous)}
                className="flex w-full items-center justify-between px-5 py-5 text-left transition hover:bg-[#0C131C]"
            >

                <div className="flex items-center gap-4">

                    <span className="font-mono text-xs text-[#556275]">
                        {number}
                    </span>

                    <span className="font-semibold text-[#EDF2F7]">
                        {title}
                    </span>

                </div>

                <span
                    className={`text-lg text-[#4AFFC4] transition-transform ${
                        open ? "rotate-90" : ""
                    }`}
                >
                    →
                </span>

            </button>


            {open && (
                <div className="border-t border-[#1C2734] p-6">

                    {solution.intuition && (
                        <SolutionText
                            label="intuition"
                            value={solution.intuition}
                        />
                    )}


                    {solution.approach && (
                        <SolutionText
                            label="approach"
                            value={solution.approach}
                        />
                    )}


                    {solution.code && (
                        <div className="mt-6">

                            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[#556275]">
                                implementation
                            </p>

                            <CodeBlock
                                code={solution.code}
                                language="cpp"
                            />

                        </div>
                    )}


                    {(solution.timeComplexity ||
                        solution.spaceComplexity) && (
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">

                            {solution.timeComplexity && (
                                <ComplexityCard
                                    label="time"
                                    value={solution.timeComplexity}
                                />
                            )}

                            {solution.spaceComplexity && (
                                <ComplexityCard
                                    label="space"
                                    value={solution.spaceComplexity}
                                />
                            )}

                        </div>
                    )}

                </div>
            )}

        </div>
    );
};


const SolutionText = ({
    label,
    value
}) => {
    return (
        <div className="mb-6">

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


export default SolutionAccordion;