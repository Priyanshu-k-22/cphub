import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Activity, BookOpen, BriefcaseBusiness, CalendarDays, ChevronRight, Code2, ExternalLink, LayoutDashboard, Lightbulb, LogOut, Network, Settings, Trophy, Users, X } from "lucide-react";
import { useAuth } from "../../auth/context/AuthContext";

const sections = [
    { title: null, items: [{ label: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" }] },
    { title: "Content", items: [
        { label: "Daily Problems", icon: CalendarDays, path: "/admin/daily-problems" },
        { label: "CP Sheet", icon: Code2, path: "/admin/cp-sheet" },
        { label: "DSA Sheet Problems", icon: BookOpen, path: "/admin/dsa-problems" },
        { label: "DSA Sheet Resources", icon: BookOpen, path: "/admin/dsa-sheet" },
    ] },
    { title: "Learning", items: [
        { label: "CTC / Must Know", icon: BriefcaseBusiness, path: "/admin/ctc" },
        { label: "Interview Blogs", icon: BookOpen, path: "/admin/interview" },
        { label: "System Design", icon: Network, path: "/admin/system-design" },
        { label: "Miscellaneous", icon: Lightbulb, path: "/admin/miscellaneous" },
    ] },
    { title: "Platform", items: [{ label: "Contests", icon: Trophy, path: "/admin/contests" }] },
    { title: "Users", items: [
        { label: "All Users", icon: Users, path: "/admin/users" },
        { label: "Activity", icon: Activity, path: "/admin/activity" },
        { label: "Progress", icon: Activity, path: "/admin/progress" },
    ] },
    { title: "System", items: [{ label: "Settings", icon: Settings, path: "/admin/settings" }] },
];

export default function AdminSidebar({ mobileOpen = false, onClose = () => {}, navRef, onNavScroll }) {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = async () => {
        await logout();
        onClose();
        navigate("/login", { replace: true });
    };
    return <>
        {mobileOpen && <button type="button" aria-label="Close admin navigation" onClick={onClose} className="fixed inset-0 z-[65] bg-black/60 lg:hidden" />}
        <aside id="admin-navigation" aria-label="Admin navigation" className={`fixed inset-y-0 left-0 z-[70] flex h-full w-[250px] shrink-0 flex-col border-r border-[var(--theme-border)] bg-[var(--theme-surface)] transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:h-full lg:w-[225px] lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[var(--theme-border)] px-5">
                <div className="flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--theme-accent)] font-bold text-[#06100C]">C</div><div><p className="text-sm font-semibold text-[var(--theme-text)]">CpHub</p><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--theme-text-muted)]">Admin Panel</p></div></div>
                <button type="button" onClick={onClose} className="rounded-lg p-2 text-[var(--theme-text-secondary)] hover:bg-[var(--theme-surface-high)] lg:hidden" aria-label="Close navigation"><X size={18} /></button>
            </div>
            <nav ref={navRef} onScroll={onNavScroll} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4">
                {sections.map((section, index) => <section key={section.title || "overview"} className={index ? "mt-5" : ""}>
                    {section.title && <h2 className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--theme-text-muted)]">{section.title}</h2>}
                    <div className="space-y-1">{section.items.map(({ label, icon: Icon, path }) => <NavLink key={path} to={path} end={path === "/admin/dashboard"} className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] shadow-sm" : "text-[var(--theme-text-secondary)] hover:bg-[var(--theme-hover)] hover:text-[var(--theme-text)]"}`}><Icon size={17} strokeWidth={1.8} /><span className="flex-1">{label}</span><ChevronRight size={13} className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-50" /></NavLink>)}</div>
                </section>)}
            </nav>
            <div className="shrink-0 border-t border-[var(--theme-border)] p-3">
                <NavLink to="/" onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--theme-text-secondary)] hover:bg-[var(--theme-surface-high)] hover:text-[var(--theme-text)]"><ExternalLink size={16} />Student Site</NavLink>
                <button type="button" onClick={handleLogout} className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--theme-text-secondary)] hover:bg-red-500/10 hover:text-red-400"><LogOut size={16} />Logout</button>
            </div>
        </aside>
    </>;
}
