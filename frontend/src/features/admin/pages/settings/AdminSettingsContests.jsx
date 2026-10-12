import React from "react";
import { Trophy } from "lucide-react";
import SettingsPageLayout from "./SettingsPageLayout";

const AdminSettingsContests = () => (
    <SettingsPageLayout
        title="Contests & Codeforces"
        description="Integrations, contest visibility and synchronization."
        icon={Trophy}
    >
        <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500"><Trophy size={19} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-bold text-[var(--theme-text)]">Contest integrations</h2><span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--theme-text-muted)]">Unavailable</span></div><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)]">Contest schedules and Codeforces syncing are managed through the Contests and All Users pages. This section currently has no separate configuration controls.</p></div></div>
        </section>
    </SettingsPageLayout>
);

export default AdminSettingsContests;
