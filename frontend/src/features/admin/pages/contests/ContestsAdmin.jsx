import React, { useCallback, useEffect, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { getContests } from "../../../contests/api/contest.api";
import AdminLayout from "../../components/AdminLayout";
import AdminPageHeader from "../../components/AdminPageHeader";

export default function ContestsAdmin() {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getContests();
            setContests(Array.isArray(response?.data) ? response.data : []);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load upcoming contests.");
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => { load(); }, [load]);

    return <AdminLayout><div className="px-4 py-5 sm:px-5 lg:px-7">
        <AdminPageHeader title="Contests" description="Live upcoming contests from Codeforces, CodeChef, AtCoder, and LeetCode." action={load} actionLabel="Refresh" />
        {error && <div role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error} <button type="button" onClick={load} className="ml-2 underline">Retry</button></div>}
        <section className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#080D14]">
            {loading ? <p className="p-10 text-center text-sm text-[#7F8B9C]">Loading contests…</p> : contests.length ? <div className="divide-y divide-[#1C2734]/60">{contests.map((contest) => <article key={`${contest.platform}-${contest.name}-${contest.startTime}`} className="flex flex-wrap items-center gap-3 p-4 sm:px-5">
                <div className="min-w-0 flex-1"><h2 className="font-medium text-[#DCE4ED]">{contest.name}</h2><p className="mt-1 text-sm text-[#7F8B9C]">{contest.platform} · {contest.category}</p></div>
                <time className="text-sm text-[#AEB9C7]" dateTime={new Date(contest.startTime).toISOString()}>{new Date(contest.startTime).toLocaleString()}</time>
                {contest.externalLink && <a href={contest.externalLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#1C2734] px-3 py-2 text-sm text-[#AEB9C7] hover:border-[#4AFFC4]/40 hover:text-[#4AFFC4]">Open contest <ExternalLink size={14} /></a>}
            </article>)}</div> : <div className="p-12 text-center text-sm text-[#7F8B9C]">No upcoming contests found.</div>}
        </section>
        <p className="mt-3 text-xs text-[#7F8B9C]">Contest schedules are supplied by the platform integrations and cannot be edited here.</p>
    </div></AdminLayout>;
}
