import React from "react";
import { Trophy } from "lucide-react";
import SettingsPageLayout from "./SettingsPageLayout";

const AdminSettingsContests = () => (
    <SettingsPageLayout
        title="Contests & Codeforces"
        description="Integrations, contest visibility and synchronization."
        icon={Trophy}
    >
        <section className="rounded-2xl border border-[#1C2734] bg-[#080D14] p-5">
            <h2 className="text-sm font-semibold text-[#DCE4ED]">
                Contest integrations
            </h2>

            <p className="mt-2 text-xs leading-5 text-[#667384]">
                Contest and Codeforces controls will be configured here.
            </p>
        </section>
    </SettingsPageLayout>
);

export default AdminSettingsContests;