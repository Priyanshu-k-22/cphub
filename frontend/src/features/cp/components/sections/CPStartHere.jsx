import React from "react";


const CPStartHere = () => {

    const steps = [
        {
            number: "01",
            title: "Learn your programming language",
            text: "Become comfortable with variables, conditions, loops, functions, arrays, strings and the basic tools of your language."
        },
        {
            number: "02",
            title: "Solve small programming problems",
            text: "Practice simple tasks such as extracting digits, reversing numbers, palindrome checking, tables, primes, arrays and strings."
        },
        {
            number: "03",
            title: "Learn basic mathematics",
            text: "Start with factors, primes, GCD, LCM, divisibility, remainders and other frequently used mathematical ideas."
        },
        {
            number: "04",
            title: "Start Codeforces",
            text: "Begin with approachable problems around the 800 rating level. Focus on understanding observations, implementation and simple constructive ideas."
        },
        {
            number: "05",
            title: "Participate in contests",
            text: "Join contests to experience the environment. Your first contests are practice, not a final judgement of your ability."
        },
        {
            number: "06",
            title: "Upsolve",
            text: "After a contest, study the problems you could not solve, understand the ideas and try solving them again yourself."
        }
    ];


    return (
        <Page
            label="cp / start_here"
            title="New to Competitive Programming?"
            subtitle="Start from the fundamentals and gradually work your way into real competitive programming."
        >

            <div className="rounded-2xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 p-6 md:p-8">

                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4AFFC4]">
                    start here
                </p>

                <h2 className="mt-3 text-2xl font-semibold">
                    You don't need to know CP before starting CP.
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#AEB9C7]">
                    Learn enough programming to solve simple problems,
                    build your mathematical basics, then gradually
                    enter Codeforces and contests.
                </p>

            </div>


            <div className="mt-10 space-y-3">

                {steps.map((step) => (

                    <div
                        key={step.number}
                        className="flex gap-4 rounded-xl border border-[#1C2734] bg-[#0A1018] p-5 transition hover:border-[#4AFFC4]/30"
                    >

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1C2734] font-mono text-xs text-[#4AFFC4]">
                            {step.number}
                        </div>

                        <div>

                            <h3 className="font-semibold">
                                {step.title}
                            </h3>

                            <p className="mt-1.5 text-sm leading-6 text-[#AEB9C7]">
                                {step.text}
                            </p>

                        </div>

                    </div>

                ))}

            </div>


            <div className="mt-8 rounded-2xl border border-[#1C2734] bg-[#080D14] p-6">

                <h3 className="text-lg font-semibold">
                    Remember
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#AEB9C7]">
                    You do not need to finish an entire algorithm
                    syllabus before solving your first contest problem.
                    Start small and let problems introduce you to
                    new concepts.
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


export default CPStartHere;