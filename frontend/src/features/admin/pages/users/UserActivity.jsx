import React, { useCallback, useEffect, useState } from "react";
import { Activity, RefreshCw } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import AdminPageHeader from "../../components/AdminPageHeader";
import { getAdminDashboard } from "../../api/adminDashboard.api";

const formatDate = (value) => value ? new Date(value).toLocaleString() : "—";

const UserActivity = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getAdminDashboard();
            setItems(response?.data?.activity || []);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load recent activity.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    return <AdminLayout>
        <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
            <AdminPageHeader title="User Activity" description="Recent registrations, content changes, and CP sheet completions." action={load} actionLabel="Refresh activity" actionIcon={RefreshCw} />
            {error && <div role="alert" className="mb-4 flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"><span>{error}</span><button type="button" onClick={load} className="inline-flex items-center gap-1 underline"><RefreshCw size={13} /> Retry</button></div>}
            <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
                {loading ? <p className="p-10 text-center text-sm text-[var(--theme-text-muted)]">Loading activity…</p> : items.length ? items.map((item) => <article key={item.id} className="group flex items-start gap-3.5 border-b border-[var(--theme-border)] px-4 py-4 last:border-0 transition-colors hover:bg-[var(--theme-hover)] sm:items-center sm:px-5">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Activity size={17} /></span>
                    <div className="min-w-0 flex-1"><p className="text-sm font-bold text-[var(--theme-text)]">{item.title}</p><p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--theme-text-muted)]">{item.detail}</p></div>
                    <time className="shrink-0 rounded-lg bg-[var(--theme-surface-raised)] px-2.5 py-1.5 text-right text-xs font-medium text-[var(--theme-text-muted)]">{formatDate(item.occurredAt)}</time>
                </article>) : <div className="p-12 text-center text-sm text-[var(--theme-text-muted)]">No recent recorded activity.</div>}
            </section>
        </div>
    </AdminLayout>;
};

export default UserActivity;
