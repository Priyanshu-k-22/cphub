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
        <aside id="admin-navigation" aria-label="Admin navigation" className={`fixed inset-y-0 left-0 z-[70] flex h-full w-[250px] shrink-0 flex-col border-r border-[#1C2734] bg-[#070B11] transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:h-full lg:w-[225px] lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#1C2734] px-5">
                <div className="flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4AFFC4] font-bold text-[#06100C]">C</div><div><p className="text-sm font-semibold text-[#E8EEF5]">CpHub</p><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#7F8B9C]">Admin Panel</p></div></div>
                <button type="button" onClick={onClose} className="rounded-lg p-2 text-[#AEB9C7] hover:bg-[#111923] lg:hidden" aria-label="Close navigation"><X size={18} /></button>
            </div>
            <nav ref={navRef} onScroll={onNavScroll} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4">
                {sections.map((section, index) => <section key={section.title || "overview"} className={index ? "mt-5" : ""}>
                    {section.title && <h2 className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#7F8B9C]">{section.title}</h2>}
                    <div className="space-y-1">{section.items.map(({ label, icon: Icon, path }) => <NavLink key={path} to={path} end={path === "/admin/dashboard"} className={({ isActive }) => `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive ? "bg-[#10201B] text-[#4AFFC4]" : "text-[#AEB9C7] hover:bg-[#0D151F] hover:text-white"}`}><Icon size={17} strokeWidth={1.8} /><span className="flex-1">{label}</span><ChevronRight size={13} className="opacity-0 group-hover:opacity-50" /></NavLink>)}</div>
                </section>)}
            </nav>
            <div className="shrink-0 border-t border-[#1C2734] p-3">
                <NavLink to="/" onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#AEB9C7] hover:bg-[#0D151F] hover:text-white"><ExternalLink size={16} />Student Site</NavLink>
                <button type="button" onClick={handleLogout} className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#AEB9C7] hover:bg-red-500/10 hover:text-red-400"><LogOut size={16} />Logout</button>
            </div>
        </aside>
    </>;
}
