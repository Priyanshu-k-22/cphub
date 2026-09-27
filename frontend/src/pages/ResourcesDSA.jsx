import React from "react";
import { ArrowUpRight, Youtube } from "lucide-react";

import Footer from "../components/Footer.jsx";

const dsaResources = [
    {
        title: "APNA COLLEGE DSA PLAYLIST (C++)",
        description:
            "Complete Data Structures and Algorithms playlist in C++ by Apna College.",
        link: "https://www.youtube.com/watch?v=VTLCoHnyACE&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt",
    },
    {
        title: "STRIVER DSA PLAYLIST",
        description:
            "Data Structures and Algorithms playlist by Striver.",
        link: "https://www.youtube.com/watch?v=0bHoB32fuj0&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz",
    },
    {
        title: "CODE-HELP BY BABBAR",
        description:
            "Data Structures and Algorithms playlist by Code-Help.",
        link: "https://www.youtube.com/watch?v=WQoB2z67hvY&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA",
    },
];

const ResourcesDSA = () => {
    return (
        <div className="min-h-screen bg-[#060A10] font-body text-[#EDF2F7] antialiased">

            <main className="mx-auto max-w-6xl px-5 py-20">

                {/* Header */}
                <section className="max-w-3xl">

                    <p className="font-mono text-sm text-[#4AFFC4]">
                        cp/dsa_club/resources/dsa
                    </p>

                    <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
                        DSA Resources
                    </h1>

                    <p className="mt-5 text-base leading-7 text-[#AEB9C7] md:text-lg">
                        Curated DSA playlists and learning resources
                        for our CP/DSA club members.
                    </p>

                </section>


                {/* Resource Cards */}
                <section className="mt-14 grid gap-6 md:grid-cols-3">

                    {dsaResources.map((resource) => (

                        <a
                            key={resource.title}
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-2xl border border-[#1C2734] bg-[#0A1018] p-7 transition duration-200 hover:-translate-y-1 hover:border-[#4AFFC4]/40"
                        >

                            <div className="flex items-start justify-between">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#4AFFC4]/20 bg-[#4AFFC4]/5">
                                    <Youtube
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
                                Open Playlist →
                            </div>

                        </a>

                    ))}

                </section>

            </main>

            <Footer />

        </div>
    );
};

export default ResourcesDSA;