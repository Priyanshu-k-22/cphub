import React from "react";


const CPCareer = () => {
    return (
        <Page
            label="cp / career"
            title="CP & Career"
            subtitle="Competitive programming can complement broader software-engineering preparation."
        >

            <div className="rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6 md:p-8">

                <h2 className="text-2xl font-semibold">
                    Where can CP fit into a career?
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#AEB9C7]">
                    CP is one way to develop algorithmic problem-solving
                    skills. Those skills can be useful alongside
                    programming fundamentals, projects, CS concepts,
                    system knowledge, communication skills, and other
                    preparation.
                </p>

            </div>


            <div className="mt-6 grid gap-4 md:grid-cols-3">

                <CareerCard
                    role="Software Development"
                    text="Algorithmic thinking and implementation practice can complement preparation for software-development roles."
                />

                <CareerCard
                    role="Technical Interviews"
                    text="Many technical interviews involve solving unfamiliar coding and algorithmic problems."
                />

                <CareerCard
                    role="Engineering Growth"
                    text="Regular problem solving can help you become more comfortable reasoning about constraints and edge cases."
                />

            </div>


            <div className="mt-8 rounded-2xl border border-[#4AFFC4]/20 bg-[#0A1018] p-6">

                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4AFFC4]">
                    important
                </p>

                <p className="mt-3 text-sm leading-7 text-[#AEB9C7]">
                    CP should be treated as one part of your technical
                    development rather than as a guarantee of a job,
                    internship, or particular company outcome.
                </p>

            </div>

        </Page>
    );
};


const CareerCard = ({ role, text }) => (
    <div className="rounded-xl border border-[#1C2734] bg-[#080D14] p-5">

        <h3 className="font-semibold text-white">
            {role}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#AEB9C7]">
            {text}
        </p>

    </div>
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


export default CPCareer;