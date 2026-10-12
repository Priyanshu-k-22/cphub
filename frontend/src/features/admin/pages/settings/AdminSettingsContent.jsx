import React from "react";
import { Layers3 } from "lucide-react";
import SettingsPageLayout from "./SettingsPageLayout";

const AdminSettingsContent = () => (
    <SettingsPageLayout
        title="Content"
        description="CP, DSA, Daily Problems and learning resources."
        icon={Layers3}
    >
        <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Layers3 size={19} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-bold text-[var(--theme-text)]">Content controls</h2><span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--theme-text-muted)]">Unavailable</span></div><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)]">There are no content visibility controls available in this settings section. Manage published resources from their respective admin pages.</p></div></div>
        </section>
    </SettingsPageLayout>
);

export default AdminSettingsContent;
