import React from "react";
import { ArrowUpRight, Globe } from "lucide-react";

import Footer from "../components/Footer.jsx";

const webResources = [
    {
        title: "CODE WITH HARRY",
        description:
            "Complete web development playlist covering the fundamentals of web development.",
        link: "https://www.youtube.com/watch?v=tVzUXW6siu0&list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w&index=1",
    },
    {
        title: "CODE-HELP BY BABBAR",
        description:
            "Web development learning playlist by Code-Help.",
        link: "https://www.youtube.com/watch?v=Vi9bxu-M-ag&list=PLDzeHZWIZsTo0wSBcg4-NMIbC0L8evLrD",
    },
    {
        title: "APNA COLLEGE",
        description:
            "Web development playlist covering the fundamentals and practical development.",
        link: "https://www.youtube.com/watch?v=HcOc7P5BMi4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i",
    },
    {
        title: "CODE STEP BY STEP (BACKEND)",
        description:
            "Backend development learning resource.",
        link: "https://www.youtube.com/watch?v=Eafgk0GbEUg&t=1038s",
    },
    {
        title: "CHAI OUR CODE (BACKEND)",
        description:
            "Backend development learning resource.",
        link: "https://www.youtube.com/watch?v=7fjOw8ApZ1I&t=1759s",
    },
];

const ResourcesWeb = () => {
    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7] antialiased">

            <main className="mx-auto max-w-6xl px-5 py-20">

                {/* Header */}
                <section className="max-w-3xl">

                    <p className="font-mono text-sm text-[#4AFFC4]">
                        cp/dsa_club/resources/web-development
                    </p>

                    <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
                        Web Development Resources
                    </h1>

                    <p className="mt-5 text-base leading-7 text-[#AEB9C7] md:text-lg">
                        Curated resources for learning frontend and
                        backend web development.
                    </p>

                </section>


                {/* Resource Cards */}
                <section className="mt-14 grid gap-6 md:grid-cols-3">

                    {webResources.map((resource) => (

                        <a
                            key={resource.title}
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-2xl border border-[#1C2734] bg-[#0A1018] p-7 transition duration-200 hover:-translate-y-1 hover:border-[#4AFFC4]/40"
                        >

                            <div className="flex items-start justify-between">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5">
                                    <Globe
                                        size={22}
                                        className="text-[#4AFFC4]"
                                    />
                                </div>

                                <ArrowUpRight
                                    size={20}
                                    className="text-[#556275] transition group-hover:text-[#4AFFC4]"
                                />

                            </div>


                            <h2 className="mt-7 text-xl font-semibold leading-7 group-hover:text-[#4AFFC4]">
                                {resource.title}
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#778396]">
                                {resource.description}
                            </p>


                            <div className="mt-7 font-mono text-sm text-[#AEB9C7] group-hover:text-[#4AFFC4]">
                                Open Resource →
                            </div>

                        </a>

                    ))}

                </section>

            </main>

            <Footer />

        </div>
    );
};

export default ResourcesWeb;