import React from "react";
import { ArrowUpRight, Code2 } from "lucide-react";

import Footer from "../../../shared/components/layout/Footer.jsx";

const cpResources = [
    {
        title: "CP FUNDAMENTAL SHEET",
        description:
            "A fundamental sheet for learning and practicing Competitive Programming.",
        link: "#",
        available: false,
    },
    {
        title: "CP ALGORITHMS",
        description:
            "A useful reference for Competitive Programming concepts and algorithms.",
        link: "https://cp-algorithms.com/index.html",
        available: true,
    },
    {
        title: "CP 31 SHEET BY TLE ELIMINATORS",
        description:
            "A structured Competitive Programming problem sheet by TLE Eliminators.",
        link: "https://www.tle-eliminators.com/cp-sheet",
        available: true,
    },
];

const ResourcesCP = () => {
    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7] antialiased">

            <main className="mx-auto max-w-6xl px-5 py-20">

                {/* Header */}
                <section className="max-w-3xl">

                    <p className="font-mono text-sm text-[#4AFFC4]">
                        cp/cphub/resources/cp
                    </p>

                    <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
                        CP Resources
                    </h1>

                    <p className="mt-5 text-base leading-7 text-[#AEB9C7] md:text-lg">
                        Curated resources to learn Competitive Programming,
                        algorithms and problem solving.
                    </p>

                </section>


                {/* Resource Cards */}
                <section className="mt-14 grid gap-6 md:grid-cols-3">

                    {cpResources.map((resource) => (

                        <a
                            key={resource.title}
                            href={resource.link}
                            target={resource.available ? "_blank" : undefined}
                            rel={
                                resource.available
                                    ? "noopener noreferrer"
                                    : undefined
                            }
                            onClick={(e) => {
                                if (!resource.available) {
                                    e.preventDefault();
                                }
                            }}
                            className={`group rounded-2xl border border-[#1C2734] bg-[#0A1018] p-7 transition duration-200 ${
                                resource.available
                                    ? "hover:-translate-y-1 hover:border-[#4AFFC4]/40"
                                    : "cursor-default"
                            }`}
                        >

                            <div className="flex items-start justify-between">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5">
                                    <Code2
                                        size={22}
                                        className="text-[#4AFFC4]"
                                    />
                                </div>

                                {resource.available && (
                                    <ArrowUpRight
                                        size={20}
                                        className="text-[#556275] transition group-hover:text-[#4AFFC4]"
                                    />
                                )}

                            </div>


                            <h2 className="mt-7 text-xl font-semibold leading-7 group-hover:text-[#4AFFC4]">
                                {resource.title}
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#778396]">
                                {resource.description}
                            </p>


                            <div className="mt-7 font-mono text-sm">
                                {resource.available ? (
                                    <span className="text-[#AEB9C7] group-hover:text-[#4AFFC4]">
                                        Open Resource →
                                    </span>
                                ) : (
                                    <span className="text-[#556275]">
                                        Link coming soon
                                    </span>
                                )}
                            </div>

                        </a>

                    ))}

                </section>

            </main>

            <Footer />

        </div>
    );
};

export default ResourcesCP;
