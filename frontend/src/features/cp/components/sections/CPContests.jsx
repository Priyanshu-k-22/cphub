import React from "react";


const CPContests = () => {

    const platforms = [
        {
            name: "Codeforces",
            text: "A major platform for regular competitive programming contests and problem practice."
        },
        {
            name: "CodeChef",
            text: "Regular contests and a large collection of programming problems."
        },
        {
            name: "AtCoder",
            text: "Well-known for carefully designed contests and algorithmic problems."
        }
    ];


    return (
        <Page
            label="cp / contests"
            title="Your First Contests"
            subtitle="Contests are practice environments. Your first goal is to learn how they work."
        >

            <div className="rounded-2xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 p-6">

                <h2 className="text-2xl font-semibold">
                    Don't be afraid of contests.
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#AEB9C7]">
                    You may solve nothing in your first contest.
                    You may receive wrong answers. You may finish
                    below where you expected. That is part of learning.
                </p>

            </div>


            <div className="mt-8 grid gap-4 md:grid-cols-3">

                {platforms.map((platform) => (

                    <div
                        key={platform.name}
                        className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-5"
                    >

                        <h3 className="font-semibold">
                            {platform.name}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#AEB9C7]">
                            {platform.text}
                        </p>

                    </div>

                ))}

            </div>


            <div className="mt-8 rounded-2xl border border-[#1C2734] bg-[#080D14] p-6">

                <h2 className="text-xl font-semibold">
                    Contest → Upsolve
                </h2>

                <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-sm">

                    {[
                        "Contest",
                        "Review",
                        "Editorial",
                        "Re-solve",
                        "Learn"
                    ].map((item, index) => (

                        <React.Fragment key={item}>

                            <span className="rounded-lg border border-[#1C2734] bg-[#0A1018] px-3 py-2 text-[#AEB9C7]">
                                {item}
                            </span>

                            {index < 4 && (
                                <span className="text-[#556275]">
                                    →
                                </span>
                            )}

                        </React.Fragment>

                    ))}

                </div>

            </div>

        </Page>
    );
};


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


export default CPContests;