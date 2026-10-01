import React from "react";

import ProblemSection from "./ProblemSection";

const ProblemConstraints = ({
    constraints = []
}) => {
    if (!constraints.length) {
        return null;
    }

    return (
        <ProblemSection title="Constraints">

            <div className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-5">

                <ul className="space-y-3">

                    {constraints.map(
                        (constraint, index) => (
                            <li
                                key={index}
                                className="flex gap-3 text-[#AEB9C7]"
                            >

                                <span className="font-mono text-[#4AFFC4]">
                                    $
                                </span>

                                <span>
                                    {constraint}
                                </span>

                            </li>
                        )
                    )}

                </ul>

            </div>

        </ProblemSection>
    );
};

export default ProblemConstraints;