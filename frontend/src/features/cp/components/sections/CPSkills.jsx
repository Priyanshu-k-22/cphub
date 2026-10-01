import React from "react";


const CPSkills = () => {

    const skills = [
        [
            "Problem Decomposition",
            "Break a large-looking problem into smaller pieces."
        ],
        [
            "Logical Thinking",
            "Understand conditions, relationships and constraints."
        ],
        [
            "Algorithmic Thinking",
            "Move from a brute-force idea toward a suitable approach."
        ],
        [
            "Complexity Awareness",
            "Understand why one solution works within the given limits and another does not."
        ],
        [
            "Implementation",
            "Turn an idea into correct and reliable code."
        ],
        [
            "Debugging",
            "Find mistakes in logic and implementation."
        ]
    ];


    return (
        <Page
            label="cp / skills"
            title="Skills You Build"
            subtitle="The useful part of CP is not only the number of problems you solve."
        >

            <div className="grid gap-4 md:grid-cols-2">

                {skills.map(([title, text]) => (

                    <div
                        key={title}
                        className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-6"
                    >

                        <h3 className="text-lg font-semibold">
                            {title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#AEB9C7]">
                            {text}
                        </p>

                    </div>

                ))}

            </div>


            <div className="mt-8 rounded-2xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 p-6">

                <h2 className="text-xl font-semibold">
                    The real training loop
                </h2>

                <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-sm">

                    <Step text="Understand" />

                    <Arrow />

                    <Step text="Think" />

                    <Arrow />

                    <Step text="Implement" />

                    <Arrow />

                    <Step text="Test" />

                    <Arrow />

                    <Step text="Learn" />

                </div>

            </div>

        </Page>
    );
};


const Step = ({ text }) => (
    <span className="rounded-lg border border-[#4AFFC4]/20 bg-[#0A1018] px-3 py-2 text-[#4AFFC4]">
        {text}
    </span>
);


const Arrow = () => (
    <span className="text-[#556275]">
        →
    </span>
);


const Page = ({
    label,
    title,
    subtitle,
    children
}) => (
    <section className="mx-auto max-w-5xl">

        <p className="font-mono text-xs text-[#4AFFC4]">
            {label}
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            {title}
        </h1>

        <p className="mt-4 max-w-3xl text-[#AEB9C7]">
            {subtitle}
        </p>

        <div className="mt-10">
            {children}
        </div>

    </section>
);


export default CPSkills;