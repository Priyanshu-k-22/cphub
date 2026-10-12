import React from "react";
import { Bell } from "lucide-react";
import SettingsPageLayout from "./SettingsPageLayout";

const AdminSettingsNotifications = () => (
    <SettingsPageLayout
        title="Notifications"
        description="Announcements, reminders and student alerts."
        icon={Bell}
    >
        <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"><Bell size={19} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-bold text-[var(--theme-text)]">Notification controls</h2><span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--theme-text-muted)]">Unavailable</span></div><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)]">Announcement and reminder controls are not available here yet. No notification settings have been changed.</p></div></div>
        </section>
    </SettingsPageLayout>
);

export default AdminSettingsNotifications;
