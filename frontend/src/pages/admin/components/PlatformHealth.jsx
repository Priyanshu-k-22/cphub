import React from "react";

import {
    Server,
    Database,
    Code2,
    ShieldCheck
} from "lucide-react";

const serviceDefinitions = [
    { key: "api", label: "Backend API", icon: Server },
    { key: "database", label: "Database", icon: Database },
    { key: "codeforces", label: "Codeforces API", icon: Code2 },
    { key: "authentication", label: "Admin Session", icon: ShieldCheck }
];

const statusStyles = {
    operational: "text-[#4AFFC4]",
    degraded: "text-yellow-400",
    unavailable: "text-red-400",
    unknown: "text-[#7F8B9C]"
};

const PlatformHealth = ({ health, loading = false }) => {
    const values = serviceDefinitions.map(({ key }) => health?.[key] || "unknown");
    const allOperational = values.every((status) => status === "operational");
    const hasUnavailable = values.includes("unavailable");
    const summary = loading
        ? "CHECKING SERVICES"
        : !health
            ? "STATUS UNAVAILABLE"
            : allOperational
            ? "ALL CHECKS OPERATIONAL"
            : hasUnavailable
                ? "SERVICE UNAVAILABLE"
                : "SERVICE STATUS DEGRADED";

    return (
        <section className="rounded-xl border border-[#1C2734] bg-[#080D14] px-4 py-3">
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <h2 className="text-xs font-semibold text-[#DCE4ED]">Platform Health</h2>
                    <p className="mt-0.5 text-[9px] text-[#556275]">Latest backend health checks</p>
                </div>
                <span className={`rounded-full bg-[#0D151F] px-2 py-1 font-mono text-[8px] ${allOperational && !loading ? "text-[#4AFFC4]" : "text-yellow-400"}`}>
                    {summary}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {serviceDefinitions.map(({ key, label, icon: Icon }) => {
                    const status = loading ? "checking" : (health?.[key] || "unknown");
                    const dotClass = status === "operational"
                        ? "bg-[#4AFFC4]"
                        : status === "unavailable"
                            ? "bg-red-400"
                            : status === "degraded"
                                ? "bg-yellow-400"
                                : "bg-[#556275]";

                    return (
                        <div key={key} className="flex items-center gap-2.5 rounded-lg border border-[#1C2734] bg-[#070B11] px-3 py-2.5">
                            <Icon size={14} className="text-[#556275]" />
                            <span className="flex-1 text-[9px] text-[#7F8B9C]">{label}</span>
                            <span className={`font-mono text-[8px] capitalize ${statusStyles[status] || statusStyles.unknown}`}>{status}</span>
                            <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default PlatformHealth;
