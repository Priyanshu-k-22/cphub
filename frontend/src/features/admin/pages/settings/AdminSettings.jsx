import React from "react";
import {
    Bell,
    ChevronRight,
    FileCog,
    Globe2,
    Layers3,
    LockKeyhole,
    ShieldCheck,
    Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";
import AdminPageHeader from "../../components/AdminPageHeader";

const settingGroups = [
    {
        id: "general",
        title: "General",
        description: "Platform identity, maintenance and general controls.",
        icon: Globe2,
        path: "/admin/settings/general",
    },
    {
        id: "authentication",
        title: "Authentication",
        description: "Registration, verification and session controls.",
        icon: LockKeyhole,
        path: "/admin/settings/authentication",
    },
    {
        id: "content",
        title: "Content",
        description: "CP, DSA, Daily Problems and learning resources.",
        icon: Layers3,
        path: "/admin/settings/content",
    },
    {
        id: "contests",
        title: "Contests & Codeforces",
        description: "Integrations, contest visibility and synchronization.",
        icon: Trophy,
        path: "/admin/settings/contests",
    },
    {
        id: "notifications",
        title: "Notifications",
        description: "Announcements, reminders and student alerts.",
        icon: Bell,
        path: "/admin/settings/notifications",
    },
    {
        id: "security",
        title: "Security & Admin",
        description: "Sessions, audit logs and sensitive admin actions.",
        icon: ShieldCheck,
        path: "/admin/settings/security",
    },
];

const AdminSettings = () => {
    const navigate = useNavigate();

    return (
        <AdminLayout>
            <div className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
                <AdminPageHeader
                    title="Settings"
                    description="Platform controls and configuration."
                />

                <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
                    <div className="border-b border-[var(--theme-border)] px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-accent)]">
                                <FileCog size={17} />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-[var(--theme-text)]">
                                    Platform configuration
                                </h2>

                                <p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">
                                    Choose a settings category to manage.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2 p-3 sm:grid-cols-2 sm:p-4 xl:grid-cols-3">
                        {settingGroups.map(
                            ({
                                id,
                                title,
                                description,
                                icon: Icon,
                                path,
                            }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => navigate(path)}
                                    className="group flex w-full items-center gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-4 py-4 text-left transition-all duration-150 hover:border-[var(--theme-accent)]/30 hover:bg-[var(--theme-hover)] hover:shadow-sm"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-text-muted)] transition-colors group-hover:border-[#4AFFC4]/20 group-hover:bg-[var(--theme-accent)]/[0.06] group-hover:text-[var(--theme-accent)]">
                                        <Icon
                                            size={17}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-semibold text-[var(--theme-text)] transition-colors group-hover:text-[var(--theme-accent)]">
                                            {title}
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">
                                            {description}
                                        </p>
                                    </div>

                                    <ChevronRight
                                        size={17}
                                        className="shrink-0 text-[var(--theme-text-muted)] transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--theme-accent)]"
                                    />
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;
