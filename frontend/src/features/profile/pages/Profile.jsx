import React, { useEffect, useRef, useState } from "react";
import { Activity, ArrowUpRight, BookOpen, Check,  Trophy, X } from "lucide-react";

import { getCurrentUser, updateCurrentUser, uploadProfilePhoto } from "../api/user.api";
import { getCodeforcesProfile } from "../../codeforces/api/codeforces.api";
import { useAuth } from "../../auth/context/AuthContext";
import ProfileStat from "../components/ProfileStat";
import ProfileHero from "../components/ProfileHero";
import ProfileDetails from "../components/ProfileDetails";
import ProfileSidebar from "../components/ProfileSidebar";

const profileFromResponse = (response) => response?.data?.data || response?.data?.user || response?.data || null;
const profileToForm = (profile = {}) => ({
    college: profile.college || "",
    bio: profile.bio || "",
    skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : "",
    department: profile.department || "",
    currentSemester: profile.currentSemester || "",
    github: profile.links?.github || "",
    linkedin: profile.links?.linkedin || "",
});

const Profile = () => {
    const { user, updateUser } = useAuth();
    const photoInput = useRef(null);
    const [form, setForm] = useState(profileToForm());
    const [codeforces, setCodeforces] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [avatarFailed, setAvatarFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const [userResponse, cfResponse] = await Promise.allSettled([getCurrentUser(), getCodeforcesProfile()]);
                if (cancelled) return;
                if (userResponse.status === "fulfilled") {
                    const currentUser = profileFromResponse(userResponse.value);
                    if (currentUser) {
                        updateUser(currentUser);
                        setForm(profileToForm(currentUser.profile));
                    }
                } else {
                    setError(userResponse.reason?.response?.data?.message || "Could not refresh your profile. You can still edit the saved details.");
                    setForm(profileToForm(user?.profile));
                }
                if (cfResponse.status === "fulfilled") setCodeforces(cfResponse.value?.data?.data || cfResponse.value?.data || null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, []);

    const username = user?.username || "CpHub student";
    const initials = username.slice(0, 1).toUpperCase() || "S";
    const avatar = user?.profile?.avatar || "";
    const rating = Number(codeforces?.rating) > 0 ? codeforces.rating : codeforces ? "Unrated" : "—";

    const saveProfile = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        setNotice("");
        try {
            const payload = {
                college: form.college,
                bio: form.bio,
                department: form.department,
                currentSemester: form.currentSemester,
                skills: [...new Set(form.skills.split(",").map((skill) => skill.trim()).filter(Boolean))],
                links: { github: form.github, linkedin: form.linkedin },
            };
            const updatedUser = profileFromResponse(await updateCurrentUser(payload));
            if (!updatedUser?.profile) throw new Error("The server did not return the updated profile.");
            updateUser(updatedUser);
            setForm(profileToForm(updatedUser.profile));
            setNotice("Your profile was saved.");
            setEditing(false);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || requestError?.message || "Could not save your profile.");
        } finally {
            setSaving(false);
        }
    };

    const selectPhoto = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) return;
        const acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
        if (!acceptedTypes.includes(file.type)) {
            setError("Choose a JPEG, PNG, WebP, GIF, or AVIF image for your profile photo.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Choose an image smaller than 5 MB.");
            return;
        }

        setUploading(true);
        setError("");
        setNotice("");
        try {
            const updatedUser = profileFromResponse(await uploadProfilePhoto(file));
            if (!updatedUser?.profile) throw new Error("The image uploaded, but the profile could not be updated. Please try again.");
            updateUser(updatedUser);
            setAvatarFailed(false);
            setNotice("Profile photo updated.");
        } catch (requestError) {
            setError(requestError?.response?.data?.message || requestError?.message || "Could not upload your profile photo.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-[var(--theme-page)] px-4 py-6 text-[var(--theme-text)] sm:px-6 sm:py-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Your profile</h1>
                        <p className="mt-1 text-sm text-[var(--theme-text-secondary)]">Show your college community who you are.</p>
                    </div>
                    <span className="hidden rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-1.5 text-xs text-[var(--theme-text-muted)] sm:inline-flex">CpHub student community</span>
                </div>

                {error && <div role="alert" className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"><span>{error}</span><button type="button" onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button></div>}
                {notice && <div role="status" className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700"><Check size={16} />{notice}</div>}

                <ProfileHero photoInput={photoInput} avatar={avatar} avatarFailed={avatarFailed} setAvatarFailed={setAvatarFailed} uploading={uploading} loading={loading} selectPhoto={selectPhoto} initials={initials} username={username} form={form} editing={editing} setEditing={setEditing} />

                <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,.8fr)]">
                    <ProfileDetails form={form} editing={editing} saving={saving} loading={loading} setForm={setForm} saveProfile={saveProfile} setEditing={setEditing} user={user} />

                    <ProfileSidebar username={username} codeforces={codeforces} />
                </div>
                {loading && <p className="mt-4 text-center text-xs text-[var(--theme-text-muted)]">Refreshing profile…</p>}
            </div>
        </main>
    );
};

export default Profile;
