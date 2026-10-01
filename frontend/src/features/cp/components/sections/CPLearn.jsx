import React from "react";


const CPLearn = () => {

    const topics = [
        {
            title: "Language Fundamentals",
            items: [
                "Variables and data types",
                "Input and output",
                "Operators",
                "Conditions",
                "Loops",
                "Functions"
            ]
        },
        {
            title: "Core Programming",
            items: [
                "Arrays",
                "Strings",
                "References",
                "Basic recursion",
                "Sorting",
                "Searching"
            ]
        },
        {
            title: "C++ for CP",
            items: [
                "vector",
                "string",
                "pair",
                "set",
                "map",
                "stack / queue",
                "priority_queue"
            ]
        }
    ];


    return (
        <Page
            label="cp / learn"
            title="Learn Your Language"
            subtitle="Before solving difficult CP problems, become comfortable writing programs quickly and correctly."
        >

            <div className="grid gap-5 md:grid-cols-3">

                {topics.map((topic) => (

                    <div
                        key={topic.title}
                        className="rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6"
                    >

                        <h2 className="font-semibold">
                            {topic.title}
                        </h2>

                        <ul className="mt-4 space-y-2">

                            {topic.items.map((item) => (

                                <li
                                    key={item}
                                    className="flex gap-2 text-sm text-[#AEB9C7]"
                                >

                                    <span className="text-[#4AFFC4]">
                                        •
                                    </span>

                                    {item}

                                </li>

                            ))}

                        </ul>

                    </div>

                ))}

            </div>


            <div className="mt-8 rounded-xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 p-6">

                <h3 className="font-semibold">
                    The goal
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#AEB9C7]">
                    You should be able to read a problem and focus
                    on solving it rather than constantly struggling
                    with the programming language itself.
                </p>

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


export default CPLearn;