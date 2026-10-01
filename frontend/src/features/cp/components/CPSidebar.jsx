import React, { useState } from "react";
import { Award, BookOpen, BriefcaseBusiness, Check, ChevronDown, Code2, Compass, Gauge, Lightbulb, Menu, MessagesSquare, Sigma, Sparkles, Trophy, X } from "lucide-react";

const sections = [
    { group: "Understand CP", items: [
        { id: "why", label: "Why CP?", icon: Lightbulb },
        { id: "career", label: "CP & Career", icon: BriefcaseBusiness },
        { id: "interviews", label: "CP & Interviews", icon: MessagesSquare },
        { id: "skills", label: "Skills You Build", icon: Award },
    ] },
    { group: "Start Learning", items: [
        { id: "start", label: "Start Here", icon: Compass },
        { id: "learn", label: "Learn Your Language", icon: Code2 },
        { id: "practice", label: "Basic Practice", icon: BookOpen },
        { id: "math", label: "Basic Mathematics", icon: Sigma },
    ] },
    { group: "Start CP", items: [
        { id: "codeforces", label: "Start Codeforces", icon: Code2 },
        { id: "contests", label: "Contests", icon: Trophy },
        { id: "rating", label: "Rating & Rankings", icon: Gauge },
    ] },
    { group: "Explore", items: [
        { id: "stories", label: "Real Stories", icon: Sparkles },
        { id: "resources", label: "Resources", icon: BookOpen },
    ] },
];

const CPSidebar = ({ activeSection, setActiveSection }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const activeItem = sections.flatMap((group) => group.items).find((item) => item.id === activeSection);
    const ActiveIcon = activeItem?.icon || Compass;
    const choose = (id) => {
        setActiveSection(id);
        setMobileOpen(false);
    };

    return <>
        <div className="sticky top-16 z-40 border-b border-[var(--theme-border)] bg-[var(--theme-surface)] lg:hidden">
            <button type="button" aria-expanded={mobileOpen} aria-controls="cp-mobile-sections" onClick={() => setMobileOpen((open) => !open)} className="flex min-h-[68px] w-full items-center justify-between gap-3 px-4 py-2 text-left">
                <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]">{mobileOpen ? <X size={18} /> : <ActiveIcon size={18} />}</span>
                    <span className="min-w-0"><span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--theme-text-muted)]">Competitive programming guide</span><span className="block truncate text-sm font-bold text-[var(--theme-text)]">{activeItem?.label || "Why CP?"}</span></span>
                </span>
                <ChevronDown size={18} className={`shrink-0 text-[var(--theme-text-muted)] transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileOpen && <nav id="cp-mobile-sections" aria-label="CP guide sections" className="absolute left-0 right-0 top-full max-h-[calc(100dvh-8rem)] overflow-y-auto border-b border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 pb-5 shadow-xl">
                {sections.map((group) => <section key={group.group} className="pt-4" aria-label={group.group}>
                    <h2 className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--theme-text-muted)]">{group.group}</h2>
                    <div className="grid grid-cols-2 gap-2">{group.items.map(({ id, label, icon: Icon }) => {
                        const active = activeSection === id;
                        return <button key={id} type="button" aria-current={active ? "page" : undefined} onClick={() => choose(id)} className={`flex min-h-12 items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${active ? "border-[var(--theme-accent)]/35 bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]" : "border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-accent)]/30"}`}><Icon size={15} className="shrink-0" /><span className="min-w-0 flex-1">{label}</span>{active && <Check size={14} className="shrink-0" />}</button>;
                    })}</div>
                </section>)}
            </nav>}
        </div>

        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-[286px] shrink-0 flex-col overflow-y-auto border-r border-[var(--theme-border)] bg-[var(--theme-page)] py-6 lg:flex">
            <div className="mx-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4">
                <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Code2 size={20} /></span><span><span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--theme-text-muted)]">CpHub learning path</span><span className="mt-0.5 block text-lg font-black tracking-tight text-[var(--theme-text)]">CP Guide</span></span></div>
                <p className="mt-3 text-xs leading-5 text-[var(--theme-text-secondary)]">Build your fundamentals, then use contests and upsolving to grow.</p>
            </div>

            <nav className="mt-6 flex-1 px-3" aria-label="CP guide navigation">
                {sections.map((group) => <section key={group.group} className="mb-5">
                    <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--theme-text-muted)]">{group.group}</p>
                    <div className="space-y-1">{group.items.map(({ id, label, icon: Icon }) => {
                        const active = activeSection === id;
                        return <button key={id} type="button" aria-current={active ? "page" : undefined} onClick={() => choose(id)} className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${active ? "bg-[var(--theme-accent-soft)] font-bold text-[var(--theme-accent)]" : "text-[var(--theme-text-secondary)] hover:bg-[var(--theme-hover)] hover:text-[var(--theme-text)]"}`}>
                            {active && <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-[var(--theme-accent)]" />}
                            <Icon size={16} className={`shrink-0 ${active ? "text-[var(--theme-accent)]" : "text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)]"}`} /><span className="min-w-0 flex-1">{label}</span>{active && <Check size={14} className="shrink-0" />}
                        </button>;
                    })}</div>
                </section>)}
            </nav>

            <div className="mx-4 mt-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--theme-text-muted)]">The loop</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-[var(--theme-text-secondary)]">Learn <span className="text-[var(--theme-accent)]">→</span> Practice <span className="text-[var(--theme-accent)]">→</span> Contest <span className="text-[var(--theme-accent)]">→</span> Upsolve</p>
            </div>
        </aside>
    </>;
};

export default CPSidebar;
