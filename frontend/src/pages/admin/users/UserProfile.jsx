import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Shield, UserRound } from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import AdminPageHeader from "../components/AdminPageHeader";
import { getAdminUserProfile } from "../../../api/adminUsers.api";

const formatDate = (value) => value ? new Date(value).toLocaleString() : "—";

const Metric = ({ label, value, hint }) => (
    <div className="rounded-xl border border-[#1C2734] bg-[#080D14] px-4 py-4">
        <p className="font-mono text-[9px] uppercase tracking-wider text-[#556275]">{label}</p>
        <p className="mt-2 text-xl font-semibold text-[#E8EEF5]">{value}</p>
        {hint && <p className="mt-1 text-[9px] text-[#465364]">{hint}</p>}
    </div>
);

const UserProfile = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadProfile = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getAdminUserProfile(userId);
            setProfile(response?.data || null);
        } catch (requestError) {
            setProfile(null);
            setError(requestError?.response?.data?.message || "Could not load this user profile.");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const user = profile?.user;
    const cpProgress = profile?.cpProgress;
    const codeforces = profile?.codeforces;

    return (
        <AdminLayout>
            <div className="px-4 py-5 sm:px-5 lg:px-7">
                <Link to="/admin/users" className="mb-4 inline-flex items-center gap-2 font-mono text-[9px] text-[#7F8B9C] hover:text-[#4AFFC4]">
                    <ArrowLeft size={13} /> All Users
                </Link>

                <AdminPageHeader
                    title={loading ? "User Profile" : user?.username || "User Not Found"}
                    description="Account details and progress currently stored by CpHub."
                />

                {error && (
                    <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        <span>{error}</span>
                        <button type="button" onClick={loadProfile} className="underline">Retry</button>
                    </div>
                )}

                {loading ? (
                    <div className="rounded-xl border border-[#1C2734] bg-[#080D14] px-4 py-12 text-center font-mono text-[10px] text-[#556275]">Loading profile…</div>
                ) : user ? (
                    <>
                        <section className="mb-4 flex flex-wrap items-center gap-4 rounded-xl border border-[#1C2734] bg-[#080D14] p-5">
                            {user.profile?.avatar ? (
                                <img src={user.profile.avatar} alt="" className="h-14 w-14 rounded-full object-cover" />
                            ) : (
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0D151F] text-[#4AFFC4]">
                                    {user.role === "admin" ? <Shield size={22} /> : <UserRound size={22} />}
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-base font-semibold text-[#E8EEF5]">{user.username}</h2>
                                    <span className="rounded-full bg-[#4AFFC4]/10 px-2 py-1 font-mono text-[8px] uppercase text-[#4AFFC4]">{user.role || "student"}</span>
                                </div>
                                <p className="mt-1 text-xs text-[#7F8B9C]">{user.email}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-[8px] uppercase text-[#556275]">Joined</p>
                                <p className="mt-1 text-[10px] text-[#AEB9C7]">{formatDate(user.createdAt)}</p>
                            </div>
                        </section>

                        <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            <Metric label="CP Sheet Solved" value={`${cpProgress?.solved ?? 0} / ${cpProgress?.total ?? 0}`} hint={`${cpProgress?.percentage ?? 0}% of active CP problems`} />
                            <Metric label="Codeforces Rating" value={codeforces?.rating ?? "—"} hint={codeforces?.rank || "No synced profile"} />
                            <Metric label="Max Rating" value={codeforces?.maxRating ?? "—"} hint={codeforces?.maxRank || "Codeforces data unavailable"} />
                            <Metric label="CF Problems Solved" value={codeforces?.solvedProblems ?? "—"} hint={codeforces ? `${codeforces.contestCount || 0} contests` : "No synced profile"} />
                        </div>

                        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                            <section className="rounded-xl border border-[#1C2734] bg-[#080D14] p-4">
                                <h2 className="text-xs font-semibold text-[#DCE4ED]">Profile information</h2>
                                <dl className="mt-4 space-y-3">
                                    <div>
                                        <dt className="font-mono text-[8px] uppercase text-[#556275]">College</dt>
                                        <dd className="mt-1 text-[10px] text-[#AEB9C7]">{user.profile?.college || "Not provided"}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-mono text-[8px] uppercase text-[#556275]">Bio</dt>
                                        <dd className="mt-1 whitespace-pre-wrap text-[10px] leading-relaxed text-[#AEB9C7]">{user.profile?.bio || "Not provided"}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-mono text-[8px] uppercase text-[#556275]">Last Codeforces sync</dt>
                                        <dd className="mt-1 text-[10px] text-[#AEB9C7]">{formatDate(codeforces?.lastSyncedAt)}</dd>
                                    </div>
                                    {codeforces?.lastContest?.contestName && (
                                        <div>
                                            <dt className="font-mono text-[8px] uppercase text-[#556275]">Last contest</dt>
                                            <dd className="mt-1 text-[10px] text-[#AEB9C7]">{codeforces.lastContest.contestName}</dd>
                                        </div>
                                    )}
                                </dl>
                            </section>

                            <section className="overflow-hidden rounded-xl border border-[#1C2734] bg-[#080D14]">
                                <div className="border-b border-[#1C2734] px-4 py-3">
                                    <h2 className="text-xs font-semibold text-[#DCE4ED]">Recent CP sheet completions</h2>
                                    <p className="mt-0.5 text-[9px] text-[#556275]">DSA and contest participation are not tracked in the current data model.</p>
                                </div>
                                {!profile.recentSolved?.length ? (
                                    <p className="px-4 py-8 text-center font-mono text-[9px] text-[#556275]">No CP problems completed yet.</p>
                                ) : profile.recentSolved.map((entry) => (
                                    <div key={entry.id} className="flex items-center justify-between gap-3 border-b border-[#1C2734]/60 px-4 py-3 last:border-0">
                                        <div className="min-w-0">
                                            <p className="truncate text-[10px] text-[#DCE4ED]">{entry.problem.title}</p>
                                            <p className="mt-1 font-mono text-[8px] text-[#556275]">Rating {entry.problem.rating} · {formatDate(entry.solvedAt)}</p>
                                        </div>
                                        {entry.problem.url && (
                                            <a href={entry.problem.url} target="_blank" rel="noreferrer" aria-label={`Open ${entry.problem.title} on Codeforces`} className="shrink-0 rounded p-1.5 text-[#556275] hover:text-[#4AFFC4]">
                                                <ExternalLink size={13} />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </section>
                        </div>
                    </>
                ) : !error ? (
                    <div className="rounded-xl border border-[#1C2734] bg-[#080D14] px-4 py-12 text-center font-mono text-[10px] text-[#556275]">User not found.</div>
                ) : null}
            </div>
        </AdminLayout>
    );
};

export default UserProfile;
