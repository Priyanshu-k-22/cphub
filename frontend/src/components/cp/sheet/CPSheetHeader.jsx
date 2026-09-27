import React from "react";


const CPSheetHeader = () => {

    return (

        <section
            className="
                mb-8
            "
        >

            <div
                className="
                    mb-3
                    flex
                    items-center
                    gap-3
                "
            >

                <span
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-[#4AFFC4]
                        shadow-[0_0_10px_#4AFFC4]
                    "
                />

                <span
                    className="
                        font-mono
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-[#556275]
                    "
                >
                    Competitive Programming
                </span>

            </div>


            <h1
                className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-white
                    md:text-4xl
                "
            >
                CP Sheet
            </h1>


            <p
                className="
                    mt-3
                    max-w-2xl
                    text-sm
                    leading-6
                    text-[#7F8B9C]
                    md:text-base
                "
            >
                Practice curated Codeforces problems
                organized by rating and build your
                competitive programming fundamentals
                step by step.
            </p>

        </section>

    );
};


export default CPSheetHeader;