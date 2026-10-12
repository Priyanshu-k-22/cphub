import React, { useCallback, useEffect, useState } from "react";
import { Activity, Code2, RefreshCw, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import AdminPageHeader from "../../components/AdminPageHeader";
import { getAdminUserProgress } from "../../api/adminUsers.api";

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
        <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
            <AdminPageHeader title="User Progress" description="CP sheet completion and synced Codeforces stats for registered users." action={load} actionLabel="Refresh progress" actionIcon={RefreshCw} />
            {error && <div role="alert" className="mb-4 flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"><span>{error}</span><button type="button" onClick={load} className="inline-flex items-center gap-1 underline"><RefreshCw size={13} /> Retry</button></div>}
            {loading ? <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-12 text-center text-sm text-[var(--theme-text-muted)]">Loading user progress…</div> : users.length ? <><div className="grid gap-4 xl:grid-cols-2">
                {users.map((user) => <article key={user.id} className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 shadow-sm transition hover:border-[var(--theme-accent)]/25 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--theme-accent-soft)] text-sm font-bold text-[var(--theme-accent)]">{user.username?.slice(0, 1)?.toUpperCase() || "?"}</span><div><Link to={`/admin/users/${user.id}`} className="font-bold text-[var(--theme-text)] hover:text-[var(--theme-accent)]">{user.username}</Link><p className="mt-0.5 text-xs capitalize text-[var(--theme-text-muted)]">{user.role}</p></div></div><span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-2.5 py-1.5 text-xs font-semibold text-[var(--theme-text-secondary)]"><Trophy size={13} className="text-amber-500" />{user.contestCount ?? "—"} contests</span></div>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-[var(--theme-surface-raised)] p-3.5"><p className="flex items-center gap-2 text-xs font-semibold text-[var(--theme-text-secondary)]"><Code2 size={14} className="text-[var(--theme-accent)]" />CP Sheet</p><p className="mt-2 text-xl font-black text-[var(--theme-text)]">{user.cpSolved} <span className="text-sm font-medium text-[var(--theme-text-muted)]">/ {user.cpTotal}</span></p><div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--theme-border)]"><div className="h-full rounded-full bg-[var(--theme-accent)] transition-all" style={{ width: `${user.cpPercent}%` }} /></div><p className="mt-1.5 text-right text-xs text-[var(--theme-text-muted)]">{user.cpPercent}% complete</p></div>
                        <div className="rounded-xl bg-[var(--theme-surface-raised)] p-3.5"><p className="flex items-center gap-2 text-xs font-semibold text-[var(--theme-text-secondary)]"><Activity size={14} className="text-blue-500" />Codeforces</p><p className="mt-2 text-xl font-black text-[var(--theme-text)]">{user.codeforcesRating ?? "—"}</p><p className="mt-1 truncate text-xs text-[var(--theme-text-muted)]">{user.codeforcesRank || "No current rank"} · {user.codeforcesSolved ?? "—"} solved</p></div>
                    </div>
                </article>)}
            </div><div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 text-sm text-[var(--theme-text-muted)]"><span>{pagination.total ? `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, pagination.total)} of ${pagination.total} users` : "No users"}</span><div className="flex gap-2"><button type="button" disabled={loading || page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-[var(--theme-border)] px-3 py-2 disabled:opacity-40">Previous</button><span className="px-2 py-2">{page} / {Math.max(1, pagination.totalPages)}</span><button type="button" disabled={loading || page >= pagination.totalPages} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-[var(--theme-border)] px-3 py-2 disabled:opacity-40">Next</button></div></div></> : <div className="rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface)] p-12 text-center text-sm text-[var(--theme-text-muted)]">No registered users yet.</div>}
        </div>
    </AdminLayout>;
};

export default UserProgress;
