import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Shield, User } from "lucide-react";

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
                    <p className="font-mono text-[9px] text-[#556275]">
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

                <div className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#080D14]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[680px] text-left">
                            <thead>
                                <tr className="border-b border-[#1C2734] font-mono text-[8px] uppercase text-[#556275]">
                                    <th className="px-4 py-3">User</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">Joined</th>
                                    <th className="px-4 py-3 text-right">Profile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="px-4 py-12 text-center font-mono text-[10px] text-[#556275]">Loading accounts…</td></tr>
                                ) : users.length === 0 ? (
                                    <tr><td colSpan="5" className="px-4 py-12 text-center font-mono text-[10px] text-[#556275]">{error ? "Users could not be loaded." : "No users match this search."}</td></tr>
                                ) : users.map((user) => (
                                    <tr key={user._id} className="border-b border-[#1C2734]/60 last:border-0 hover:bg-[#0B1119]">
                                        <td className="px-4 py-3">
                                            <Link to={`/admin/users/${user._id}`} className="flex items-center gap-2.5">
                                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0D151F]">
                                                    {user.role === "admin"
                                                        ? <Shield size={12} className="text-[#4AFFC4]" />
                                                        : <User size={12} className="text-[#556275]" />}
                                                </span>
                                                <span className="text-[10px] text-[#DCE4ED] hover:text-[#4AFFC4]">{user.username}</span>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-[9px] text-[#687587]">{user.email}</td>
                                        <td className="px-4 py-3 font-mono text-[9px] text-[#7F8B9C]">{user.role || "student"}</td>
                                        <td className="px-4 py-3 font-mono text-[9px] text-[#556275]">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Link to={`/admin/users/${user._id}`} aria-label={`Open ${user.username} profile`} className="inline-flex rounded p-1.5 text-[#556275] hover:bg-[#0D151F] hover:text-[#4AFFC4]">
                                                <Eye size={13} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <p className="font-mono text-[9px] text-[#556275]">
                        {loading ? "" : `Showing ${rangeStart}–${rangeEnd} of ${total}`}
                    </p>
                    <div className="flex gap-2">
                        <button type="button" disabled={loading || page <= 1} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 font-mono text-[9px] text-[#AEB9C7] hover:text-white disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                        <button type="button" disabled={loading || page >= totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 font-mono text-[9px] text-[#AEB9C7] hover:text-white disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UsersAdmin;
