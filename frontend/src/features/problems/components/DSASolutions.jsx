import React, { useState } from "react";

import SolutionAccordion from "./SolutionAccordion";
import ProblemSection from "./ProblemSection";

const DSASolutions = ({ problem }) => {
    const [open, setOpen] = useState(false);

    const hasSolutions =
        problem.brute ||
        problem.better ||
        problem.optimal;

    if (!hasSolutions) {
        return null;
    }

    return (
        <ProblemSection title="Solutions">

            {/* Main solution toggle */}
            <button
                type="button"
                onClick={() => setOpen((previous) => !previous)}
                className="flex w-full items-center justify-between rounded-xl border border-[#1C2734] bg-[#0A1018] px-5 py-5 text-left transition hover:border-[#4AFFC4]/30"
            >

                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#556275]">
                        dsa
                    </p>

                    <p className="mt-1 font-medium text-[#EDF2F7]">
                        View Solutions
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
                <div className="mt-3 space-y-3">

                    <SolutionAccordion
                        number="01"
                        title="Brute Force"
                        solution={problem.brute}
                    />

                    <SolutionAccordion
                        number="02"
                        title="Better"
                        solution={problem.better}
                    />

                    <SolutionAccordion
                        number="03"
                        title="Optimal"
                        solution={problem.optimal}
                    />

                </div>
            )}

        </ProblemSection>
    );
};

export default DSASolutions;