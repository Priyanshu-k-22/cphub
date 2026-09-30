import React, { useCallback, useEffect, useState } from "react";
import { Activity, Code2, RefreshCw, Trophy } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import AdminPageHeader from "../components/AdminPageHeader";
import { getAdminUserProgress } from "../../../api/adminUsers.api";

const UserProgress = () => {
    const PAGE_SIZE = 20;
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getAdminUserProgress({ page, limit: PAGE_SIZE });
            setUsers(Array.isArray(response?.data?.users) ? response.data.users : []);
            setPagination(response?.data?.pagination || { total: 0, totalPages: 0 });
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not load student progress.");
        } finally {
            setLoading(false);
        }
    }, [page]);
    useEffect(() => { load(); }, [load]);

    return <AdminLayout>
        <div className="px-4 py-5 sm:px-5 lg:px-7">
            <AdminPageHeader title="User Progress" description="CP sheet completion and synced Codeforces stats for registered users." action={load} actionLabel="Refresh" />
            {error && <div role="alert" className="mb-4 flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"><span>{error}</span><button type="button" onClick={load} className="inline-flex items-center gap-1 underline"><RefreshCw size={13} /> Retry</button></div>}
            {loading ? <div className="rounded-xl border border-[#1C2734] bg-[#080D14] p-12 text-center text-sm text-[#7F8B9C]">Loading user progress…</div> : users.length ? <><div className="grid gap-3 xl:grid-cols-2">
                {users.map((user) => <article key={user.id} className="rounded-xl border border-[#1C2734] bg-[#080D14] p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-semibold text-[#DCE4ED]">{user.username}</h2><p className="mt-1 text-xs capitalize text-[#687587]">{user.role}</p></div><span className="inline-flex items-center gap-1.5 rounded-full border border-[#1C2734] px-2.5 py-1 text-xs text-[#AEB9C7]"><Trophy size={13} className="text-[#4AFFC4]" />{user.contestCount ?? "—"} contests</span></div>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-[#0D151F] p-3"><p className="flex items-center gap-2 text-xs text-[#7F8B9C]"><Code2 size={14} />CP Sheet</p><p className="mt-2 text-lg font-semibold text-[#DCE4ED]">{user.cpSolved} <span className="text-xs font-normal text-[#687587]">/ {user.cpTotal}</span></p><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#1C2734]"><div className="h-full rounded-full bg-[#4AFFC4]" style={{ width: `${user.cpPercent}%` }} /></div><p className="mt-1 text-right text-[10px] text-[#687587]">{user.cpPercent}%</p></div>
                        <div className="rounded-lg bg-[#0D151F] p-3"><p className="flex items-center gap-2 text-xs text-[#7F8B9C]"><Activity size={14} />Codeforces</p><p className="mt-2 text-lg font-semibold text-[#DCE4ED]">{user.codeforcesRating ?? "—"}</p><p className="mt-1 truncate text-xs text-[#687587]">{user.codeforcesRank} · {user.codeforcesSolved ?? "—"} solved</p></div>
                    </div>
                </article>)}
            </div><div className="mt-4 flex items-center justify-between rounded-xl border border-[#1C2734] bg-[#080D14] px-4 py-3 text-sm text-[#7F8B9C]"><span>{pagination.total ? `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, pagination.total)} of ${pagination.total} users` : "No users"}</span><div className="flex gap-2"><button type="button" disabled={loading || page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 disabled:opacity-40">Previous</button><span className="px-2 py-2">{page} / {Math.max(1, pagination.totalPages)}</span><button type="button" disabled={loading || page >= pagination.totalPages} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 disabled:opacity-40">Next</button></div></div></> : <div className="rounded-xl border border-dashed border-[#1C2734] bg-[#080D14] p-12 text-center text-sm text-[#7F8B9C]">No registered users yet.</div>}
        </div>
    </AdminLayout>;
};

export default UserProgress;
