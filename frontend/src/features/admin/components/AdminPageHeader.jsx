import React from "react";
import { Plus } from "lucide-react";


const AdminPageHeader = ({
    eyebrow = "Admin Panel",
    title,
    description,
    action,
    actionLabel,
    actionIcon: ActionIcon = Plus,
}) => {

    return (

        <header className="relative mb-5 overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.10)] sm:p-7">
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                    <p className="mb-2 inline-flex rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--theme-accent)]">{eyebrow}</p>
                    <h1 className="text-2xl font-black tracking-tight text-[var(--theme-text)] sm:text-3xl">{title}</h1>
                    {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)]">{description}</p>}
                </div>
                {action && <button type="button" onClick={action} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-4 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-500/15 transition hover:brightness-105"><ActionIcon size={16} />{actionLabel}</button>}
            </div>
        </header>

    );
};


export default AdminPageHeader;
