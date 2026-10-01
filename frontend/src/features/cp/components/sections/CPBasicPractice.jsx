import React from "react";


const CPBasicPractice = () => {

    const categories = [
        {
            title: "Numbers",
            problems: [
                "Extract digits",
                "Count digits",
                "Sum of digits",
                "Reverse a number",
                "Palindrome number",
                "Armstrong number"
            ]
        },
        {
            title: "Basic Logic",
            problems: [
                "Even / Odd",
                "Maximum / Minimum",
                "Prime checking",
                "Factors",
                "Divisibility",
                "Counting"
            ]
        },
        {
            title: "Loops & Patterns",
            problems: [
                "Multiplication tables",
                "Number patterns",
                "Character patterns",
                "Nested loops",
                "Series"
            ]
        },
        {
            title: "Arrays & Strings",
            problems: [
                "Maximum element",
                "Minimum element",
                "Reverse array",
                "Frequency counting",
                "Basic string operations"
            ]
        }
    ];


    return (
        <Page
            label="cp / practice"
            title="Basic Problem Practice"
            subtitle="Build programming fluency by solving small problems before jumping into harder contest problems."
        >

            <div className="grid gap-4 md:grid-cols-2">

                {categories.map((category) => (

                    <div
                        key={category.title}
                        className="rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6"
                    >

                        <h2 className="text-lg font-semibold">
                            {category.title}
                        </h2>

                        <div className="mt-4 space-y-2">

                            {category.problems.map((problem) => (

                                <div
                                    key={problem}
                                    className="rounded-lg bg-[#111923] px-3 py-2 text-sm text-[#AEB9C7]"
                                >
                                    {problem}
                                </div>

                            ))}

                        </div>

                    </div>

                ))}

            </div>


            <div className="mt-8 rounded-xl border border-[#1C2734] bg-[#080D14] p-6">

                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#556275]">
                    objective
                </p>

                <p className="mt-3 text-sm leading-7 text-[#AEB9C7]">
                    These problems may look simple. That is the point.
                    You are building the ability to translate an idea
                    into code quickly.
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


export default CPBasicPractice;