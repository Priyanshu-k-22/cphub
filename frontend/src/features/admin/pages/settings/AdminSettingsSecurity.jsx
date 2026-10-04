import React from "react";
import { ShieldCheck } from "lucide-react";
import SettingsPageLayout from "./SettingsPageLayout";

const AdminSettingsSecurity = () => (
    <SettingsPageLayout
        title="Security & Admin"
        description="Sessions, audit logs and sensitive administrative actions."
        icon={ShieldCheck}
    >
        <section className="rounded-2xl border border-[#1C2734] bg-[#080D14] p-5">
            <h2 className="text-sm font-semibold text-[#DCE4ED]">
                Security controls
            </h2>

            <p className="mt-2 text-xs leading-5 text-[#667384]">
                Administrative security controls will be configured here.
            </p>
        </section>
    </SettingsPageLayout>
);

export default AdminSettingsSecurity;