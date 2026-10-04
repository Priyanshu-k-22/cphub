import React from "react";
import { Bell } from "lucide-react";
import SettingsPageLayout from "./SettingsPageLayout";

const AdminSettingsNotifications = () => (
    <SettingsPageLayout
        title="Notifications"
        description="Announcements, reminders and student alerts."
        icon={Bell}
    >
        <section className="rounded-2xl border border-[#1C2734] bg-[#080D14] p-5">
            <h2 className="text-sm font-semibold text-[#DCE4ED]">
                Notification controls
            </h2>

            <p className="mt-2 text-xs leading-5 text-[#667384]">
                Notification controls will be configured here.
            </p>
        </section>
    </SettingsPageLayout>
);

export default AdminSettingsNotifications;