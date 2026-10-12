import React, { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { useAuth } from "../../auth/context/AuthContext";

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
    return <header className="flex h-[60px] shrink-0 items-center border-b border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 sm:px-5 lg:px-7">
        <button type="button" onClick={onOpenMenu} aria-label="Open admin navigation" aria-controls="admin-navigation" aria-expanded={mobileOpen} className="rounded-lg p-2 text-[var(--theme-text-secondary)] hover:bg-[var(--theme-surface-high)] hover:text-[var(--theme-text)] lg:hidden"><Menu size={20} /></button>
        <div className="ml-auto flex items-center gap-3">
            <button type="button" onClick={() => window.dispatchEvent(new Event("cphub-themetoggle"))} aria-label={`Switch to ${brightMode ? "dark" : "light"} theme`} className="rounded-lg border border-[var(--theme-border)] p-2 text-[var(--theme-text-secondary)] transition hover:bg-[var(--theme-surface-high)] hover:text-[var(--theme-accent)]">{brightMode ? <Moon size={17} /> : <Sun size={17} />}</button>
            <div className="flex items-center gap-3 border-l border-[var(--theme-border)] pl-3">
            {avatar ? <img src={avatar} alt="" className="h-9 w-9 rounded-full border border-[var(--theme-border)] object-cover" /> : <div aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--theme-accent-soft)] font-mono text-sm font-semibold text-[var(--theme-accent)]">{name.slice(0, 1).toUpperCase()}</div>}
            <div><p className="text-sm font-medium text-[var(--theme-text)]">{name}</p><p className="text-xs text-[var(--theme-text-muted)]">Administrator</p></div>
            </div>
        </div>
    </header>;
}
