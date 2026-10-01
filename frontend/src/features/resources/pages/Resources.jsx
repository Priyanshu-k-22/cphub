import React from "react";
import { ArrowRight, BookOpen, Code2, Globe } from "lucide-react";

import Footer from "../../../shared/components/layout/Footer.jsx";

const resourceCategories = [
    {
        title: "DSA Resources",
        description:
            "Curated resources to learn and strengthen Data Structures and Algorithms.",
        icon: BookOpen,
        link: "/resources/dsa",
    },
    {
        title: "CP Resources",
        description:
            "Useful competitive programming platforms, algorithms and problem-solving resources.",
        icon: Code2,
        link: "/resources/cp",
    },
    {
        title: "Web Development",
        description:
            "Useful learning resources and tutorials for frontend and backend web development.",
        icon: Globe,
        link: "/resources/web-development",
    },
];

const Resources = () => {
    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7] antialiased">

            <main className="mx-auto max-w-6xl px-5 py-20">

                {/* Header */}
                <section className="max-w-3xl">

                    <p className="font-mono text-sm text-[#4AFFC4]">
                        cp/cphub/resources
                    </p>

                    <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
                        Resources
                    </h1>

                    <p className="mt-5 text-base leading-7 text-[#AEB9C7] md:text-lg">
                        A collection of useful learning resources for
                        DSA, Competitive Programming and Web Development.
                    </p>

                </section>


                {/* Resource Categories */}
                <section className="mt-14 grid gap-6 md:grid-cols-3">

                    {resourceCategories.map((resource) => {

                        const Icon = resource.icon;

                        return (
                            <a
                                key={resource.title}
                                href={resource.link}
                                className="group flex flex-col rounded-2xl border border-[#1C2734] bg-[#0A1018] p-7 transition duration-200 hover:-translate-y-1 hover:border-[#4AFFC4]/40"
                            >

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5">
                                    <Icon
                                        size={22}
                                        className="text-[#4AFFC4]"
                                    />
                                </div>

                                <h2 className="mt-7 text-2xl font-semibold group-hover:text-[#4AFFC4]">
                                    {resource.title}
                                </h2>

                                <p className="mt-3 flex-1 text-sm leading-6 text-[#778396]">
                                    {resource.description}
                                </p>

                                <div className="mt-7 inline-flex items-center gap-2 font-mono text-sm text-[#AEB9C7] group-hover:text-[#4AFFC4]">
                                    Explore
                                    <ArrowRight
                                        size={17}
                                        className="transition group-hover:translate-x-1"
                                    />
                                </div>

                            </a>
                        );
                    })}

                </section>

            </main>

            <Footer />

        </div>
    );
};

export default Resources;
