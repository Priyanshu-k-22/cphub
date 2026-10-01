import React, { useLayoutEffect, useRef, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

// Admin screens each own an AdminLayout; preserve the drawer while routes swap.
let adminSidebarOpen = false;
let adminSidebarScrollTop = 0;

export default function AdminLayout({ children }) {
    const [mobileOpen, setMobileOpenState] = useState(() => adminSidebarOpen);
    const sidebarNavRef = useRef(null);
    const setMobileOpen = (next) => {
        setMobileOpenState((current) => {
            const value = typeof next === "function" ? next(current) : next;
            adminSidebarOpen = value;
            return value;
        });
    };
    useLayoutEffect(() => {
        if (sidebarNavRef.current) {
            sidebarNavRef.current.scrollTop = adminSidebarScrollTop;
        }
    }, []);
    return <div className="admin-ui min-h-screen bg-[#060A0F] text-white">
        <div className="flex min-h-screen">
            <AdminSidebar
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                navRef={sidebarNavRef}
                onNavScroll={(event) => { adminSidebarScrollTop = event.currentTarget.scrollTop; }}
            />
            <div className="flex min-w-0 flex-1 flex-col">
                <AdminTopbar mobileOpen={mobileOpen} onOpenMenu={() => setMobileOpen(true)} />
                <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
            </div>
        </div>
    </div>;
}
