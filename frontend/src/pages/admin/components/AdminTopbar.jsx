import React, { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function AdminTopbar({ onOpenMenu = () => {}, mobileOpen = false }) {
    const { user } = useAuth();
    const [brightMode, setBrightMode] = useState(() => document.documentElement.dataset.theme === "light");
    useEffect(() => {
        const syncTheme = () => setBrightMode(document.documentElement.dataset.theme === "light");
        window.addEventListener("cphub-themechange", syncTheme);
        return () => window.removeEventListener("cphub-themechange", syncTheme);
    }, []);
    const name = user?.name || user?.username || "Admin";
    const avatar = user?.profile?.avatar;
    return <header className="flex h-[60px] shrink-0 items-center border-b border-[#1C2734] bg-[#070B11] px-4 sm:px-5 lg:px-7">
        <button type="button" onClick={onOpenMenu} aria-label="Open admin navigation" aria-controls="admin-navigation" aria-expanded={mobileOpen} className="rounded-lg p-2 text-[#AEB9C7] hover:bg-[#0D151F] hover:text-white lg:hidden"><Menu size={20} /></button>
        <div className="ml-auto flex items-center gap-3">
            <button type="button" onClick={() => window.dispatchEvent(new Event("cphub-themetoggle"))} aria-label={`Switch to ${brightMode ? "dark" : "light"} theme`} className="rounded-lg border border-[#1C2734] p-2 text-[#AEB9C7] transition hover:bg-[#0D151F] hover:text-[#4AFFC4]">{brightMode ? <Moon size={17} /> : <Sun size={17} />}</button>
            <div className="flex items-center gap-3 border-l border-[#1C2734] pl-3">
            {avatar ? <img src={avatar} alt="" className="h-9 w-9 rounded-full object-cover" /> : <div aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#14221E] font-mono text-sm font-semibold text-[#4AFFC4]">{name.slice(0, 1).toUpperCase()}</div>}
            <div><p className="text-sm font-medium text-[#DCE4ED]">{name}</p><p className="text-xs text-[#7F8B9C]">Administrator</p></div>
            </div>
        </div>
    </header>;
}
