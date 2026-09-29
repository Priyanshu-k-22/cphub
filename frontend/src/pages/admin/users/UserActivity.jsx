import React, { useCallback, useEffect, useState } from "react";
import { Activity, RefreshCw } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import AdminPageHeader from "../components/AdminPageHeader";
import { getAdminDashboard } from "../../../api/adminDashboard.api";

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
        <div className="px-4 py-5 sm:px-5 lg:px-7">
            <AdminPageHeader title="User Activity" description="Recent registrations, content changes, and CP sheet completions." action={load} actionLabel="Refresh" />
            {error && <div role="alert" className="mb-4 flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"><span>{error}</span><button type="button" onClick={load} className="inline-flex items-center gap-1 underline"><RefreshCw size={13} /> Retry</button></div>}
            <section className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#080D14]">
                {loading ? <p className="p-10 text-center text-sm text-[#7F8B9C]">Loading activity…</p> : items.length ? items.map((item) => <article key={item.id} className="flex items-start gap-3 border-b border-[#1C2734]/60 px-4 py-4 last:border-0 sm:px-5">
                    <span className="mt-0.5 rounded-lg bg-[#0D151F] p-2 text-[#4AFFC4]"><Activity size={15} /></span>
                    <div className="min-w-0 flex-1"><p className="text-sm font-medium text-[#DCE4ED]">{item.title}</p><p className="mt-1 truncate text-xs text-[#7F8B9C]">{item.detail}</p></div>
                    <time className="shrink-0 text-right text-xs text-[#687587]">{formatDate(item.occurredAt)}</time>
                </article>) : <div className="p-12 text-center text-sm text-[#7F8B9C]">No recent recorded activity.</div>}
            </section>
        </div>
    </AdminLayout>;
};

export default UserActivity;
