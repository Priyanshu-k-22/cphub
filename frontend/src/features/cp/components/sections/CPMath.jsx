import React from "react";


const CPMath = () => {

    const topics = [
        {
            title: "Factors",
            text: "Understand divisors and how to efficiently find them."
        },
        {
            title: "Prime Numbers",
            text: "Learn how to identify primes and understand their properties."
        },
        {
            title: "GCD",
            text: "Greatest Common Divisor and its common applications."
        },
        {
            title: "LCM",
            text: "Least Common Multiple and its relationship with GCD."
        },
        {
            title: "Divisibility",
            text: "Understand remainders and common divisibility properties."
        },
        {
            title: "Modular Arithmetic",
            text: "Learn how remainders behave during arithmetic operations."
        }
    ];


    return (
        <Page
            label="cp / mathematics"
            title="Basic Mathematics"
            subtitle="You don't need advanced mathematics to start CP. Build the small set of mathematical ideas that appear repeatedly."
        >

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                {topics.map((topic) => (

                    <div
                        key={topic.title}
                        className="rounded-xl border border-[#1C2734] bg-[#0A1018] p-5"
                    >

                        <h3 className="font-semibold">
                            {topic.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#AEB9C7]">
                            {topic.text}
                        </p>

                    </div>

                ))}

            </div>


            <div className="mt-8 rounded-2xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 p-6">

                <h2 className="text-xl font-semibold">
                    Learn mathematics through problems
                </h2>

                <p className="mt-2 text-sm leading-7 text-[#AEB9C7]">
                    Don't try to memorize a huge mathematics syllabus.
                    Learn a concept and immediately solve problems
                    that use it.
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


export default CPMath;