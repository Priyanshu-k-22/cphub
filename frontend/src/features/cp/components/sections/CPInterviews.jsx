import React from "react";


const CPInterviews = () => {
    return (
        <Page
            label="cp / interviews"
            title="CP & Technical Interviews"
            subtitle="Why competitive programming can complement interview preparation."
        >

            <div className="grid gap-5 md:grid-cols-2">

                <Card
                    title="Problem recognition"
                    text="Repeated exposure to different problems can help you become familiar with common patterns and ways of approaching unfamiliar questions."
                />

                <Card
                    title="Time-bound thinking"
                    text="Contests give you practice thinking and implementing under a fixed time constraint."
                />

                <Card
                    title="Complexity awareness"
                    text="CP frequently requires you to reason about input limits and choose an approach that fits those limits."
                />

                <Card
                    title="Implementation discipline"
                    text="A correct idea still needs careful implementation. CP gives repeated opportunities to practice that process."
                />

            </div>


            <div className="mt-8 rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6">

                <h2 className="text-xl font-semibold">
                    Companies and technical roles
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#AEB9C7]">
                    Students often prepare for technical roles at
                    companies such as Google, Microsoft, Amazon and
                    other technology companies using multiple
                    preparation methods. CP can be one component of
                    that preparation, particularly for algorithmic
                    problem solving.
                </p>

                <p className="mt-3 text-sm leading-7 text-[#AEB9C7]">
                    Interview preparation should also include the
                    topics and formats relevant to the specific role.
                </p>

            </div>

        </Page>
    );
};


const Card = ({ title, text }) => (
    <div className="rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6">

        <h3 className="text-lg font-semibold">
            {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#AEB9C7]">
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


export default CPInterviews;