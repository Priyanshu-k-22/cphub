import React from "react";

const ProblemExamples = ({ examples }) => {
    if (
        !Array.isArray(examples) ||
        examples.length === 0
    ) {
        return null;
    }

    return (
        <section className="mt-8">

            {/* Section Header */}

            <div className="mb-4">
                <h2 className="text-xl font-semibold text-[#EDF2F7]">
                    Examples
                </h2>
            </div>


            {/* Examples */}

            <div className="space-y-4">

                {examples.map((example, index) => (
                    <ExampleCard
                        key={index}
                        example={example}
                    />
                ))}

            </div>

        </section>
    );
};


/* ============================================================
   EXAMPLE CARD
============================================================ */

const ExampleCard = ({ example }) => {

    const input =
        example.input ??
        example.exampleInput ??
        "";

    const output =
        example.output ??
        example.exampleOutput ??
        "";

    const explanation =
        example.explanation ??
        example.explain ??
        "";


    return (
        <div className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#0A1018]">

            {/* Input / Output */}

            <div className="grid grid-cols-1 gap-px bg-[#1C2734] md:grid-cols-2">

                {/* INPUT */}

                <ExampleValue
                    label="Input"
                    value={input}
                />


                {/* OUTPUT */}

                <ExampleValue
                    label="Output"
                    value={output}
                />

            </div>


            {/* Explanation */}

            {explanation && (
                <div className="border-t border-[#1C2734] px-4 py-3">

                    <p className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-[#556275]">
                        Explanation
                    </p>

                    <p className="whitespace-pre-line text-sm leading-6 text-[#AEB9C7]">
                        {explanation}
                    </p>

                </div>
            )}

        </div>
    );
};


/* ============================================================
   INPUT / OUTPUT
============================================================ */

const ExampleValue = ({
    label,
    value,
}) => {

    return (
        <div className="min-w-0 bg-[#0A1018] px-4 py-3">

            <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-wider text-[#556275]">
                {label}
            </p>

            <div className="overflow-x-auto rounded-lg border border-[#17212D] bg-[#060A10]">

                <pre className="min-w-max whitespace-pre-wrap break-words px-3 py-3 font-mono text-[13px] leading-6 text-[#D5DCE5]">
                    {value || "—"}
                </pre>

            </div>

        </div>
    );
};


export default ProblemExamples;