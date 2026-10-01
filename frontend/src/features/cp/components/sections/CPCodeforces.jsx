import React from "react";


const CPCodeforces = () => {

    return (
        <Page
            label="cp / codeforces"
            title="Start Codeforces"
            subtitle="Once your programming basics are comfortable, Codeforces becomes your main practice ground."
        >

            <div className="rounded-2xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 p-6 md:p-8">

                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4AFFC4]">
                    beginner entry point
                </p>

                <h2 className="mt-3 text-2xl font-semibold">
                    Start around 800-rated problems
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#AEB9C7]">
                    At the beginning, focus on approachable problems
                    that test observation, implementation, basic
                    mathematics and simple constructive thinking.
                </p>

            </div>


            <div className="mt-8 grid gap-4 md:grid-cols-3">

                <Card
                    number="01"
                    title="Read"
                    text="Read the statement carefully and identify exactly what is being asked."
                />

                <Card
                    number="02"
                    title="Think"
                    text="Try to find the simplest observation before searching for complicated algorithms."
                />

                <Card
                    number="03"
                    title="Implement"
                    text="Write the solution, test edge cases and submit."
                />

            </div>


            <div className="mt-8 rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6">

                <h2 className="text-xl font-semibold">
                    Don't chase the rating immediately
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#AEB9C7]">
                    Your first objective is to become comfortable
                    solving unfamiliar problems. Rating can be useful
                    as a progress signal, but it should not become the
                    only reason you practice.
                </p>

            </div>

        </Page>
    );
};


const Card = ({
    number,
    title,
    text
}) => (
    <div className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-5">

        <span className="font-mono text-xs text-[#4AFFC4]">
            {number}
        </span>

        <h3 className="mt-3 font-semibold">
            {title}
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


export default CPCodeforces;