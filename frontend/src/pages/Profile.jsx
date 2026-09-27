import React, { useEffect, useState } from "react";
import { Camera, Save, UserRound } from "lucide-react";

import { getCurrentUser, updateCurrentUser } from "../api/user.api";
import { useAuth } from "../context/AuthContext";

const emptyForm = { college: "", bio: "", avatar: "" };

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [avatarFailed, setAvatarFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const loadProfile = async () => {
            try {
                const response = await getCurrentUser();
                const currentUser = response?.data || user;
                if (!cancelled && currentUser) {
                    updateUser(currentUser);
                    setForm({
                        college: currentUser.profile?.college || "",
                        bio: currentUser.profile?.bio || "",
                        avatar: currentUser.profile?.avatar || "",
                    });
                }
            } catch (requestError) {
                if (!cancelled) {
                    setError(requestError?.response?.data?.message || "Could not load your profile.");
                    setForm({
                        college: user?.profile?.college || "",
                        bio: user?.profile?.bio || "",
                        avatar: user?.profile?.avatar || "",
                    });
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadProfile();
        return () => { cancelled = true; };
    }, []);

    const setField = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setError("");
        setNotice("");
        if (name === "avatar") setAvatarFailed(false);
    };

    const saveProfile = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        setNotice("");

        try {
            const response = await updateCurrentUser(form);
            const updatedUser = response?.data;
            if (!updatedUser) throw new Error("The server did not return the updated profile.");
            updateUser(updatedUser);
            setForm({
                college: updatedUser.profile?.college || "",
                bio: updatedUser.profile?.bio || "",
                avatar: updatedUser.profile?.avatar || "",
            });
            setNotice("Your profile was updated.");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || requestError?.message || "Could not update your profile.");
        } finally {
            setSaving(false);
        }
    };

    const avatar = form.avatar.trim();
    const initials = user?.username?.charAt(0)?.toUpperCase() || "U";

    return (
        <main className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <header className="mb-6">
                    <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#4AFFC4]">Account</p>
                    <h1 className="text-3xl font-semibold text-[#EDF2F7]">Your profile</h1>
                    <p className="mt-2 text-sm text-[#7F8B9C]">Manage the profile details shown across CpHub.</p>
                </header>

                {error && (
                    <div role="alert" className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}
                {notice && (
                    <div role="status" className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
                        {notice}
                    </div>
                )}

                <section className="overflow-hidden rounded-2xl border border-[#1C2734] bg-[#080D14] shadow-xl">
                    <div className="flex flex-col gap-5 border-b border-[#1C2734] p-5 sm:flex-row sm:items-center sm:p-6">
                        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#1C2734] bg-[#0E1D18] font-display text-2xl font-semibold text-[#4AFFC4]">
                            {avatar && !avatarFailed ? (
                                <img src={avatar} alt={`${user?.username || "User"} profile`} className="h-full w-full object-cover" onError={() => setAvatarFailed(true)} />
                            ) : (
                                <span>{initials}</span>
                            )}
                            <span className="pointer-events-none absolute bottom-0 right-0 rounded-full border border-[#080D14] bg-[#4AFFC4] p-1 text-[#06120D]">
                                <Camera size={12} />
                            </span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h2 className="truncate text-xl font-semibold text-[#EDF2F7]">{user?.username || "CpHub user"}</h2>
                            <p className="mt-1 truncate text-sm text-[#7F8B9C]">{user?.email || ""}</p>
                            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#4AFFC4]/20 bg-[#4AFFC4]/5 px-2.5 py-1 text-xs capitalize text-[#4AFFC4]">
                                <UserRound size={12} /> {user?.role || "student"} account
                            </span>
                        </div>
                    </div>

                    <form onSubmit={saveProfile} className="space-y-5 p-5 sm:p-6">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="block text-sm font-medium text-[#AEB9C7]">
                                Username
                                <input value={user?.username || ""} readOnly className="mt-2 w-full cursor-not-allowed rounded-lg border border-[#1C2734] bg-[#0A1018] px-3 py-2.5 text-sm text-[#7F8B9C]" />
                                <span className="mt-1 block text-xs font-normal text-[#556275]">Your username is also your Codeforces handle.</span>
                            </label>
                            <label className="block text-sm font-medium text-[#AEB9C7]">
                                Email
                                <input type="email" value={user?.email || ""} readOnly className="mt-2 w-full cursor-not-allowed rounded-lg border border-[#1C2734] bg-[#0A1018] px-3 py-2.5 text-sm text-[#7F8B9C]" />
                            </label>
                        </div>

                        <label className="block text-sm font-medium text-[#AEB9C7]">
                            College or organization
                            <input name="college" value={form.college} onChange={setField} maxLength={100} disabled={loading || saving} placeholder="Your college or organization" className="mt-2 w-full rounded-lg border border-[#1C2734] bg-[#0A1018] px-3 py-2.5 text-sm text-[#EDF2F7] outline-none transition placeholder:text-[#556275] focus:border-[#4AFFC4]/50 disabled:opacity-60" />
                        </label>

                        <label className="block text-sm font-medium text-[#AEB9C7]">
                            Profile image URL
                            <input name="avatar" type="url" value={form.avatar} onChange={setField} maxLength={500} disabled={loading || saving} placeholder="https://example.com/your-photo.jpg" className="mt-2 w-full rounded-lg border border-[#1C2734] bg-[#0A1018] px-3 py-2.5 text-sm text-[#EDF2F7] outline-none transition placeholder:text-[#556275] focus:border-[#4AFFC4]/50 disabled:opacity-60" />
                            <span className="mt-1 block text-xs font-normal text-[#556275]">Use a public image URL. Clear the field to remove your current image.</span>
                        </label>

                        <label className="block text-sm font-medium text-[#AEB9C7]">
                            Bio
                            <textarea name="bio" value={form.bio} onChange={setField} maxLength={300} rows={4} disabled={loading || saving} placeholder="Tell the community a little about yourself" className="mt-2 w-full resize-y rounded-lg border border-[#1C2734] bg-[#0A1018] px-3 py-2.5 text-sm text-[#EDF2F7] outline-none transition placeholder:text-[#556275] focus:border-[#4AFFC4]/50 disabled:opacity-60" />
                            <span className="mt-1 block text-right text-xs font-normal text-[#556275]">{form.bio.length}/300</span>
                        </label>

                        <div className="flex flex-col-reverse gap-3 border-t border-[#1C2734] pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-[#687587]">Username and email are managed as account identifiers.</p>
                            <button type="submit" disabled={loading || saving} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#4AFFC4] px-4 py-2.5 text-sm font-semibold text-[#06120D] transition hover:bg-[#72FFD2] disabled:cursor-not-allowed disabled:opacity-50">
                                <Save size={15} /> {saving ? "Saving…" : "Save changes"}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default Profile;
