import React from "react";
import { ArrowUpRight, Brain, CalendarPlus, Code2, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
    { label: "Daily problem", description: "Publish today's challenge", icon: CalendarPlus, path: "/admin/daily-problems", tint: "text-amber-500 bg-amber-500/10" },
    { label: "CP Sheet", description: "Manage rating-wise problems", icon: Code2, path: "/admin/cp-sheet", tint: "text-blue-500 bg-blue-500/10" },
    { label: "DSA Sheet", description: "Organize topic-wise practice", icon: Brain, path: "/admin/dsa-problems", tint: "text-violet-500 bg-violet-500/10" },
    { label: "Contests", description: "Update contest listings", icon: Trophy, path: "/admin/contests", tint: "text-emerald-500 bg-emerald-500/10" }
];

const QuickActions = () => (
    <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]" aria-labelledby="admin-actions-title">
        <div className="flex items-center gap-3 border-b border-[var(--theme-border)] px-4 py-4 sm:px-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Zap size={18} /></span>
            <div><h2 id="admin-actions-title" className="text-base font-bold text-[var(--theme-text)]">Quick actions</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Jump into a common task</p></div>
        </div>
        <div className="grid gap-2.5 p-3 sm:grid-cols-2 sm:p-4">
            {actions.map(({ label, description, icon: Icon, path, tint }) => <Link key={label} to={path} className="group flex min-h-[88px] items-center gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--theme-accent)]/40 hover:shadow-md">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tint}`}><Icon size={19} /></span>
                <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-[var(--theme-text)]">{label}</span><span className="mt-1 block text-xs leading-5 text-[var(--theme-text-muted)]">{description}</span></span>
                <ArrowUpRight size={16} className="shrink-0 text-[var(--theme-text-muted)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--theme-accent)]" />
            </Link>)}
        </div>
    </section>
);

export default QuickActions;
