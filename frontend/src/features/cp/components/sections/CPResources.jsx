import React from "react";


const CPResources = () => {

    const resources = [
        {
            title: "Learn",
            description:
                "Use tutorials, courses, documentation and books to learn concepts you currently need.",
            items: [
                "Programming fundamentals",
                "C++ / STL",
                "Algorithms",
                "Mathematics"
            ]
        },
        {
            title: "Practice",
            description:
                "Practice problems matched to your current level instead of randomly solving difficult problems.",
            items: [
                "Codeforces problem sets",
                "Topic-based problems",
                "Contest archives",
                "Virtual contests"
            ]
        },
        {
            title: "Learn From Solutions",
            description:
                "Editorials and accepted solutions become learning material when you cannot solve a problem yourself.",
            items: [
                "Official editorials",
                "Community explanations",
                "Contest blogs",
                "Accepted solutions"
            ]
        }
    ];


    return (
        <Page
            label="cp / resources"
            title="CP Resources"
            subtitle="Use resources when you need them. Don't collect resources just for the sake of collecting them."
        >

            <div className="grid gap-5 md:grid-cols-3">

                {resources.map((resource) => (

                    <div
                        key={resource.title}
                        className="rounded-2xl border border-[#1C2734] bg-[#0A1018] p-6"
                    >

                        <h2 className="text-xl font-semibold">
                            {resource.title}
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#AEB9C7]">
                            {resource.description}
                        </p>


                        <div className="mt-5 space-y-2">

                            {resource.items.map((item) => (

                                <div
                                    key={item}
                                    className="rounded-lg bg-[#111923] px-3 py-2 text-xs text-[#AEB9C7]"
                                >
                                    {item}
                                </div>

                            ))}

                        </div>

                    </div>

                ))}

            </div>


            <div className="mt-8 rounded-2xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 p-6">

                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4AFFC4]">
                    remember
                </p>

                <h2 className="mt-3 text-xl font-semibold">
                    Don't become a resource collector.
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#AEB9C7]">
                    One good tutorial followed by actual practice is
                    more useful than saving dozens of tutorials without
                    solving problems.
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


export default CPResources;