import React from "react";


const CPWhy = () => {
    return (
        <Section
            label="cp / why"
            title="Why Competitive Programming?"
            subtitle="You don't need to become a professional competitive programmer to benefit from CP."
        >

            <div className="grid gap-5 md:grid-cols-2">

                <InfoCard
                    title="Learn to think before coding"
                    text="CP forces you to understand a problem, identify what matters, and design an approach before immediately writing code."
                />

                <InfoCard
                    title="Get comfortable with unfamiliar problems"
                    text="In CP, you regularly face problems you have never seen before. The goal is to develop a process for breaking them down."
                />

                <InfoCard
                    title="Turn ideas into code"
                    text="A solution is useful only when you can implement it correctly. CP gives repeated practice at converting reasoning into working programs."
                />

                <InfoCard
                    title="Practice under constraints"
                    text="Time limits and large inputs encourage you to think about efficiency, complexity, implementation details, and edge cases."
                />

            </div>


            <div className="mt-8 rounded-2xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 p-6">

                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4AFFC4]">
                    the bigger picture
                </p>

                <h2 className="mt-3 text-2xl font-semibold">
                    CP is a training ground for problem solving.
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#AEB9C7]">
                    You are not learning CP only to solve contest
                    problems. You are repeatedly training yourself
                    to understand unfamiliar problems, reason about
                    constraints, develop solutions, implement them,
                    and learn from mistakes.
                </p>

            </div>

        </Section>
    );
};


const InfoCard = ({ title, text }) => (
    <div className="rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6">

        <h3 className="text-lg font-semibold text-white">
            {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#AEB9C7]">
            {text}
        </p>

    </div>
);


const Section = ({
    label,
    title,
    subtitle,
    children
}) => (
    <section className="mx-auto max-w-5xl">

        <p className="font-mono text-xs text-[#4AFFC4]">
            {label}
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {title}
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-[#AEB9C7]">
            {subtitle}
        </p>

        <div className="mt-10">
            {children}
        </div>

    </section>
);


export default CPWhy;