import React from "react";
import { Code2, Database, Server, ShieldCheck, Activity } from "lucide-react";

const services = [
    { key: "api", label: "Backend API", icon: Server },
    { key: "database", label: "Database", icon: Database },
    { key: "codeforces", label: "Codeforces API", icon: Code2 },
    { key: "authentication", label: "Admin session", icon: ShieldCheck }
];

const statusTokens = {
    operational: { label: "Operational", tone: "text-emerald-500 bg-emerald-500/10", dot: "bg-emerald-500" },
    degraded: { label: "Degraded", tone: "text-amber-500 bg-amber-500/10", dot: "bg-amber-500" },
    unavailable: { label: "Unavailable", tone: "text-red-500 bg-red-500/10", dot: "bg-red-500" },
    unknown: { label: "Unknown", tone: "text-[var(--theme-text-muted)] bg-[var(--theme-surface-high)]", dot: "bg-[var(--theme-text-muted)]" },
    checking: { label: "Checking", tone: "text-blue-500 bg-blue-500/10", dot: "bg-blue-500 animate-pulse" }
};

const PlatformHealth = ({ health, loading = false }) => {
    const statuses = services.map(({ key }) => loading ? "checking" : health?.[key] || "unknown");
    const operationalCount = statuses.filter((status) => status === "operational").length;
    const summary = loading ? "Checking services" : !health ? "Status unavailable" : operationalCount === services.length ? "All systems operational" : `${operationalCount} of ${services.length} systems operational`;
    const summaryTone = loading ? "text-blue-500 bg-blue-500/10" : operationalCount === services.length ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10";

    return <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5" aria-labelledby="admin-health-title">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Activity size={18} /></span><div><h2 id="admin-health-title" className="text-base font-bold text-[var(--theme-text)]">Platform health</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Service checks from the latest dashboard sync</p></div></div>
            <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${summaryTone}`}><span className={`h-1.5 w-1.5 rounded-full ${loading ? "bg-blue-500 animate-pulse" : operationalCount === services.length ? "bg-emerald-500" : "bg-amber-500"}`} />{summary}</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {services.map(({ key, label, icon: Icon }) => {
                const status = loading ? "checking" : health?.[key] || "unknown";
                const token = statusTokens[status] || statusTokens.unknown;
                return <div key={key} className="flex items-center gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3.5 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--theme-surface-high)] text-[var(--theme-text-secondary)]"><Icon size={17} /></span>
                    <span className="min-w-0 flex-1 text-sm font-semibold text-[var(--theme-text)]">{label}</span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold ${token.tone}`}><span className={`h-1.5 w-1.5 rounded-full ${token.dot}`} />{token.label}</span>
                </div>;
            })}
        </div>
    </section>;
};

export default PlatformHealth;
