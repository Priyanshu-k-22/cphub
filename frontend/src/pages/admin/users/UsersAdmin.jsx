import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Eye, Shield, User } from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminSearch from "../components/AdminSearch";
import { getAdminUsers } from "../../../api/adminUsers.api";
import CodeforcesSyncControl from "../components/CodeforcesSyncControl";

const PAGE_SIZE = 20;

const UsersAdmin = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        const timeoutId = setTimeout(async () => {
            setLoading(true);
            setError("");
            try {
                const response = await getAdminUsers({ page, limit: PAGE_SIZE, search });
                if (!cancelled) {
                    setUsers(response?.data?.users || []);
                    setPagination(response?.data?.pagination || null);
                }
            } catch (requestError) {
                if (!cancelled) {
                    setError(requestError?.response?.data?.message || "Could not load users.");
                    setUsers([]);
                    setPagination(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }, 250);

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, [page, search, refreshKey]);

    const total = pagination?.total ?? 0;
    const totalPages = pagination?.totalPages ?? 0;
    const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
    const rangeEnd = Math.min(page * PAGE_SIZE, total);

    return (
        <AdminLayout>
            <div className="px-4 py-5 sm:px-5 lg:px-7">
                <AdminPageHeader
                    title="All Users"
                    description="Browse registered accounts and open a profile for stored progress and Codeforces stats."
                />

                <CodeforcesSyncControl />

                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="w-full max-w-sm">
                        <AdminSearch
                            value={search}
                            onChange={(value) => {
                                setSearch(value);
                                setPage(1);
                            }}
                            placeholder="Search username or email..."
                        />
                    </div>
                    <p className="font-mono text-xs text-[#7F8B9C]">
                        {loading ? "Loading users…" : `${total.toLocaleString()} user${total === 1 ? "" : "s"}`}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        <span>{error}</span>
                        <button type="button" onClick={() => setRefreshKey((current) => current + 1)} className="underline">
                            Retry
                        </button>
                    </div>
                )}

                <div className="overflow-hidden rounded-2xl border border-[#1C2734] bg-[#080D14] shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left">
                            <thead>
                                <tr className="border-b border-[#1C2734] bg-[#0B1119] font-mono text-[11px] uppercase tracking-wider text-[#7F8B9C]">
                                    <th className="px-5 py-4 font-medium">User</th>
                                    <th className="px-5 py-4 font-medium">Email</th>
                                    <th className="px-5 py-4 font-medium">Role</th>
                                    <th className="px-5 py-4 font-medium">Joined</th>
                                    <th className="px-5 py-4 text-right font-medium">Profile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="px-4 py-14 text-center text-sm text-[#7F8B9C]">Loading accounts…</td></tr>
                                ) : users.length === 0 ? (
                                    <tr><td colSpan="5" className="px-4 py-14 text-center text-sm text-[#7F8B9C]">{error ? "Users could not be loaded." : "No users match this search."}</td></tr>
                                ) : users.map((user) => (
                                    <tr key={user._id} className="group border-b border-[#1C2734]/70 last:border-0 transition-colors hover:bg-[#0D151F]">
                                        <td className="px-5 py-4">
                                            <Link to={`/admin/users/${user._id}`} className="flex min-w-0 items-center gap-3.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#4AFFC4]">
                                                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#4AFFC4]/20 bg-[#4AFFC4]/10 text-sm font-semibold text-[#4AFFC4]">
                                                    {(user.profile?.avatar || user.profile?.avatarUrl) && <img src={user.profile.avatar || user.profile.avatarUrl} alt="" className="absolute inset-0 h-full w-full object-cover" onError={(event) => event.currentTarget.remove()} />}
                                                    {user.username?.slice(0, 1).toUpperCase() || <User size={17} />}
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block truncate text-[15px] font-bold text-white transition-colors group-hover:text-[#4AFFC4]">{user.username || "Unnamed user"}</span>
                                                    <span className="mt-1 block text-xs text-[#687587]">CpHub member</span>
                                                </span>
                                            </Link>
                                        </td>
                                        <td className="max-w-[250px] truncate px-5 py-4 text-[13px] text-[#AEB9C7]">{user.email || "—"}</td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${user.role === "admin" ? "border-[#4AFFC4]/25 bg-[#4AFFC4]/10 text-[#4AFFC4]" : "border-[#273342] bg-[#111923] text-[#AEB9C7]"}`}>
                                                {user.role === "admin" && <Shield size={12} />}
                                                {user.role || "student"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-[13px] text-[#7F8B9C]">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—"}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <Link to={`/admin/users/${user._id}`} aria-label={`Open ${user.username} profile`} className="inline-flex items-center gap-2 rounded-lg border border-[#273342] bg-[#0B1119] px-3 py-2 text-xs font-medium text-[#AEB9C7] transition hover:border-[#4AFFC4]/40 hover:text-[#4AFFC4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4AFFC4]">
                                                <Eye size={14} /> <span>View profile</span><ArrowUpRight size={13} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <p className="font-mono text-xs text-[#7F8B9C]">
                        {loading ? "" : `Showing ${rangeStart}–${rangeEnd} of ${total}`}
                    </p>
                    <div className="flex gap-2">
                        <button type="button" disabled={loading || page <= 1} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-[#273342] px-4 py-2.5 text-xs font-medium text-[#AEB9C7] transition hover:border-[#4AFFC4]/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                        <button type="button" disabled={loading || page >= totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-[#273342] px-4 py-2.5 text-xs font-medium text-[#AEB9C7] transition hover:border-[#4AFFC4]/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UsersAdmin;
