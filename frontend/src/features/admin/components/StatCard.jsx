import React from "react";

const StatCard = ({ label, value, description, icon: Icon, accent = "emerald" }) => {
    const accents = {
        emerald: "bg-emerald-500/10 text-emerald-500",
        blue: "bg-blue-500/10 text-blue-500",
        violet: "bg-violet-500/10 text-violet-500",
        amber: "bg-amber-500/10 text-amber-500"
    };

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--theme-accent)]/35 hover:shadow-lg sm:p-5">
            <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[var(--theme-accent)]/5 blur-2xl transition group-hover:bg-[var(--theme-accent)]/10" />
            <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs font-semibold text-[var(--theme-text-muted)] sm:text-sm">{label}</p>
                    <p className="mt-3 text-3xl font-black tracking-tight text-[var(--theme-text)] sm:text-4xl">{value}</p>
                    <p className="mt-1.5 text-xs text-[var(--theme-text-secondary)]">{description}</p>
                </div>
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accents[accent] || accents.emerald}`}><Icon size={20} strokeWidth={1.8} /></span>
            </div>
        </article>
    );
};

export default StatCard;
