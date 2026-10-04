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
            <div className="max-w-4xl px-4 py-5 sm:px-5 lg:px-7">
                <button
                    type="button"
                    onClick={() => navigate("/admin/settings")}
                    className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-[#7F8B9C] transition hover:bg-[#0D151F] hover:text-[#4AFFC4]"
                >
                    <ArrowLeft size={14} />
                    Settings
                </button>

                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1C2734] bg-[#0B1119] text-[#4AFFC4]">
                        <Icon size={18} />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-[#E8EEF5]">
                            {title}
                        </h1>

                        <p className="mt-0.5 text-xs text-[#667384]">
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