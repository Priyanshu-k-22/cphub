import React, { useState } from "react";
import { Check, ChevronDown, Menu, X } from "lucide-react";


const CPSidebar = ({
    activeSection,
    setActiveSection
}) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const sections = [

        {
            group: "Understand CP",
            items: [
                {
                    id: "why",
                    label: "Why CP?"
                },
                {
                    id: "career",
                    label: "CP & Career"
                },
                {
                    id: "interviews",
                    label: "CP & Interviews"
                },
                {
                    id: "skills",
                    label: "Skills You Build"
                }
            ]
        },

        {
            group: "Start Learning",
            items: [
                {
                    id: "start",
                    label: "Start Here",
                    highlight: true
                },
                {
                    id: "learn",
                    label: "Learn Your Language"
                },
                {
                    id: "practice",
                    label: "Basic Practice"
                },
                {
                    id: "math",
                    label: "Basic Mathematics"
                }
            ]
        },

        {
            group: "Start CP",
            items: [
                {
                    id: "codeforces",
                    label: "Start Codeforces"
                },
                {
                    id: "contests",
                    label: "Contests"
                },
                {
                    id: "rating",
                    label: "Rating & Rankings"
                }
            ]
        },

        {
            group: "Explore",
            items: [
                {
                    id: "stories",
                    label: "Real Stories"
                },
                {
                    id: "resources",
                    label: "Resources"
                }
            ]
        }

    ];


    const activeItem = sections.flatMap((group) => group.items).find((item) => item.id === activeSection);

    return (
        <>
        <div className="sticky top-16 z-40 border-b border-[#1C2734] bg-[#080D14] lg:hidden">
            <button
                type="button"
                aria-expanded={mobileOpen}
                aria-controls="cp-mobile-sections"
                onClick={() => setMobileOpen((open) => !open)}
                className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-2 text-left"
            >
                <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#4AFFC4]/20 bg-[#4AFFC4]/10 text-[#4AFFC4]">
                        {mobileOpen ? <X size={17} /> : <Menu size={17} />}
                    </span>
                    <span className="min-w-0">
                        <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-[#6B7788]">CP Guide · current section</span>
                        <span className="block truncate text-sm font-semibold text-[#EDF2F7]">{activeItem?.label || "Start Here"}</span>
                    </span>
                </span>
                <ChevronDown size={17} className={`shrink-0 text-[#AEB9C7] transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
            </button>

            {mobileOpen && (
                <nav id="cp-mobile-sections" aria-label="CP guide sections" className="absolute left-0 right-0 top-full max-h-[calc(100dvh-8rem)] overflow-y-auto border-b border-[#1C2734] bg-[#080D14] px-4 pb-4 shadow-xl">
                    {sections.map((group) => (
                        <section key={group.group} className="pt-4" aria-label={group.group}>
                            <h2 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#667386]">{group.group}</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {group.items.map((item) => {
                                    const active = activeSection === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            aria-current={active ? "page" : undefined}
                                            onClick={() => {
                                                setActiveSection(item.id);
                                                setMobileOpen(false);
                                            }}
                                            className={`flex min-h-11 items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${active
                                                ? "border-[#4AFFC4]/30 bg-[#4AFFC4]/10 font-semibold text-[#4AFFC4]"
                                                : "border-[#1C2734] bg-[#0A1018] text-[#AEB9C7] hover:border-[#4AFFC4]/30 hover:text-[#EDF2F7]"
                                                }`}
                                        >
                                            <span className="min-w-0 truncate">{item.label}</span>
                                            {active && <Check size={15} className="shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </nav>
            )}
        </div>

        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[270px] shrink-0 overflow-y-auto border-r border-[#1C2734] py-8 lg:block">

            {/* Header */}

            <div className="px-6">

                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4AFFC4]">
                    competitive programming
                </p>

                <h2 className="mt-2 text-xl font-bold text-white">
                    CP Guide
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#556275]">
                    Start from the fundamentals and
                    gradually build your CP journey.
                </p>

            </div>


            {/* Navigation */}

            <nav className="mt-8 px-3">

                {sections.map((group) => (

                    <div
                        key={group.group}
                        className="mb-7"
                    >

                        <p className="mb-2 px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#465365]">
                            {group.group}
                        </p>


                        <div className="space-y-1">

                            {group.items.map((item) => {

                                const active =
                                    activeSection === item.id;


                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() =>
                                            setActiveSection(
                                                item.id
                                            )
                                        }
                                        className={`
                                            group flex w-full
                                            items-center gap-3
                                            rounded-lg
                                            px-3 py-2.5
                                            text-left text-sm
                                            transition-all
                                            duration-200

                                            ${
                                                active
                                                    ? "bg-[#4AFFC4]/10 text-[#4AFFC4]"
                                                    : "text-[#AEB9C7] hover:bg-[#111923] hover:text-white"
                                            }
                                        `}
                                    >

                                        <span
                                            className={`
                                                h-1.5 w-1.5
                                                shrink-0 rounded-full
                                                ${
                                                    active
                                                        ? "bg-[#4AFFC4]"
                                                        : "bg-[#273443] group-hover:bg-[#4AFFC4]/60"
                                                }
                                            `}
                                        />

                                        <span>
                                            {item.label}
                                        </span>

                                    </button>
                                );

                            })}

                        </div>

                    </div>

                ))}

            </nav>


            {/* Philosophy */}

            <div className="border-t border-[#1C2734] px-6 pt-6">

                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#556275]">
                    cp philosophy
                </p>

                <p className="mt-2 text-xs leading-5 text-[#556275]">
                    Learn → Practice → Contest →
                    Upsolve → Repeat
                </p>

            </div>

        </aside>
        </>
    );
};


export default CPSidebar;
