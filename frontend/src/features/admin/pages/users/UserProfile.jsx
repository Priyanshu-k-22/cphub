import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Activity, ArrowLeft, Building2, Clock3, Code2, ExternalLink, GraduationCap, Shield, Trophy, UserRound, Users } from "lucide-react";

import AdminLayout from "../../components/AdminLayout";
import AdminPageHeader from "../../components/AdminPageHeader";
import { getAdminUserProfile } from "../../api/adminUsers.api";

const formatDate = (value) => value ? new Date(value).toLocaleString() : "—";

const Metric = ({ label, value, hint, icon: Icon }) => (
    <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold text-[var(--theme-text-secondary)]">{label}</p><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Icon size={17} /></span></div>
        <p className="mt-3 text-2xl font-black tabular-nums text-[var(--theme-text)]">{value}</p>
        {hint && <p className="mt-1 text-xs text-[var(--theme-text-muted)]">{hint}</p>}
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
            <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
                <Link to="/admin/users" className="mb-4 inline-flex min-h-10 items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 text-sm font-semibold text-[var(--theme-text-secondary)] transition hover:text-[var(--theme-accent)]">
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
                    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-12 text-center font-mono text-[10px] text-[var(--theme-text-muted)]">Loading profile…</div>
                ) : user ? (
                    <>
                        <section className="relative mb-4 flex flex-wrap items-center gap-4 overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm sm:p-6">
                            <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
                            {user.profile?.avatar ? (
                                <img src={user.profile.avatar} alt="" className="h-16 w-16 rounded-full border-2 border-[var(--theme-border)] object-cover sm:h-20 sm:w-20" />
                            ) : (
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] sm:h-20 sm:w-20">
                                    {user.role === "admin" ? <Shield size={28} /> : <UserRound size={28} />}
                                </div>
                            )}
                            <div className="relative min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-xl font-black text-[var(--theme-text)] sm:text-2xl">{user.username}</h2>
                                    <span className="rounded-full border border-[var(--theme-accent)]/20 bg-[var(--theme-accent-soft)] px-2.5 py-1 text-xs font-bold capitalize text-[var(--theme-accent)]">{user.role || "student"}</span>
                                </div>
                                <p className="mt-1.5 text-sm text-[var(--theme-text-secondary)]">{user.email}</p>
                                <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--theme-text-muted)]"><span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--theme-surface-raised)] px-2.5 py-1"><Users size={13} />CpHub member</span>{user.profile?.department && <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--theme-surface-raised)] px-2.5 py-1"><Building2 size={13} />{user.profile.department}</span>}{user.profile?.currentSemester && <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--theme-surface-raised)] px-2.5 py-1"><GraduationCap size={13} />Semester {user.profile.currentSemester}</span>}</div>
                            </div>
                            <div className="relative rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-2.5 sm:text-right">
                                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--theme-text-muted)]"><Clock3 size={13} />Joined</p>
                                <p className="mt-1 text-sm font-semibold text-[var(--theme-text-secondary)]">{formatDate(user.createdAt)}</p>
                            </div>
                        </section>

                        <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            <Metric icon={Code2} label="CP Sheet solved" value={`${cpProgress?.solved ?? 0} / ${cpProgress?.total ?? 0}`} hint={`${cpProgress?.percentage ?? 0}% of active problems`} />
                            <Metric icon={Activity} label="Codeforces rating" value={codeforces?.rating ?? "—"} hint={codeforces?.rank || "No synced profile"} />
                            <Metric icon={Trophy} label="Personal best" value={codeforces?.maxRating ?? "—"} hint={codeforces?.maxRank || "Codeforces data unavailable"} />
                            <Metric icon={Code2} label="CF problems solved" value={codeforces?.solvedProblems ?? "—"} hint={codeforces ? `${codeforces.contestCount || 0} contests` : "No synced profile"} />
                        </div>

                        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                            <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm">
                                <h2 className="text-base font-bold text-[var(--theme-text)]">Profile information</h2>
                                <dl className="mt-5 space-y-4">
                                    <div>
                                        <dt className="text-xs font-semibold text-[var(--theme-text-muted)]">College</dt>
                                        <dd className="mt-1.5 text-sm text-[var(--theme-text-secondary)]">{user.profile?.college || "Not provided"}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-semibold text-[var(--theme-text-muted)]">Bio</dt>
                                        <dd className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-[var(--theme-text-secondary)]">{user.profile?.bio || "Not provided"}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-semibold text-[var(--theme-text-muted)]">Last Codeforces sync</dt>
                                        <dd className="mt-1.5 text-sm text-[var(--theme-text-secondary)]">{formatDate(codeforces?.lastSyncedAt)}</dd>
                                    </div>
                                    {codeforces?.lastContest?.contestName && (
                                        <div>
                                            <dt className="text-xs font-semibold text-[var(--theme-text-muted)]">Last contest</dt>
                                            <dd className="mt-1.5 text-sm text-[var(--theme-text-secondary)]">{codeforces.lastContest.contestName}</dd>
                                        </div>
                                    )}
                                </dl>
                            </section>

                            <section className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
                                <div className="border-b border-[var(--theme-border)] px-4 py-3">
                                    <h2 className="text-base font-bold text-[var(--theme-text)]">Recent CP sheet completions</h2>
                                    <p className="mt-1 text-xs text-[var(--theme-text-muted)]">DSA and contest participation are not tracked in the current data model.</p>
                                </div>
                                {!profile.recentSolved?.length ? (
                                    <p className="px-4 py-8 text-center text-sm text-[var(--theme-text-muted)]">No CP problems completed yet.</p>
                                ) : profile.recentSolved.map((entry) => (
                                    <div key={entry.id} className="flex items-center justify-between gap-3 border-b border-[var(--theme-border)]/60 px-4 py-3 last:border-0">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-[var(--theme-text)]">{entry.problem.title}</p>
                                            <p className="mt-1 text-xs text-[var(--theme-text-muted)]">Rating {entry.problem.rating} · {formatDate(entry.solvedAt)}</p>
                                        </div>
                                        {entry.problem.url && (
                                            <a href={entry.problem.url} target="_blank" rel="noreferrer" aria-label={`Open ${entry.problem.title} on Codeforces`} className="shrink-0 rounded p-1.5 text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)]">
                                                <ExternalLink size={13} />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </section>
                        </div>
                    </>
                ) : !error ? (
                    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-12 text-center font-mono text-[10px] text-[var(--theme-text-muted)]">User not found.</div>
                ) : null}
            </div>
        </AdminLayout>
    );
};

export default UserProfile;
