import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";

const SettingsPageLayout = ({
    title,
    description,
    icon: Icon,
    children,
}) => {
    const navigate = useNavigate();

    return (
        <AdminLayout>
            <div className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
                <button
                    type="button"
                    onClick={() => navigate("/admin/settings")}
                    className="mb-4 inline-flex min-h-10 items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 text-sm font-semibold text-[var(--theme-text-secondary)] transition hover:text-[var(--theme-accent)]"
                >
                    <ArrowLeft size={14} />
                    Settings
                </button>

                <div className="relative mb-5 flex items-center gap-4 overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm sm:p-6">
                    <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-20 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]">
                        <Icon size={18} />
                    </div>

                    <div className="relative">
                        <h1 className="text-xl font-black text-[var(--theme-text)] sm:text-2xl">
                            {title}
                        </h1>

                        <p className="mt-1 text-sm text-[var(--theme-text-muted)]">
                            {description}
                        </p>
                    </div>
                </div>

                {children}
            </div>
        </AdminLayout>
    );
};

export default SettingsPageLayout;
