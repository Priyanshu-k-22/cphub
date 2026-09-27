import React, { useEffect, useRef, useState } from "react";
import { Activity, ArrowUpRight, BookOpen, Camera, Check, Code2, ExternalLink, GraduationCap, Github, MapPin, Pencil, Save, Trophy, X, Linkedin } from "lucide-react";

import { getCurrentUser, updateCurrentUser, uploadProfilePhoto } from "../api/user.api";
import { getCodeforcesProfile } from "../api/codeforces.api";
import { useAuth } from "../context/AuthContext";

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

const Stat = ({ icon: Icon, label, value, sublabel }) => (
    <div className="min-w-0 px-4 py-4 sm:px-5">
        <p className="flex items-center gap-2 text-xs font-medium text-[var(--theme-text-muted)]"><Icon size={14} className="text-[var(--theme-accent)]" />{label}</p>
        <p className="mt-2 truncate text-xl font-semibold tracking-tight text-[var(--theme-text)]">{value}</p>
        {sublabel && <p className="mt-1 truncate text-xs text-[var(--theme-text-muted)]">{sublabel}</p>}
    </div>
);

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

                <section className="overflow-hidden rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
                    <div className="relative h-32 bg-[radial-gradient(ellipse_at_20%_0%,rgba(74,255,196,.35),transparent_48%),linear-gradient(115deg,#10231d,#162b29_54%,#203839)] sm:h-44">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
                    </div>
                    <div className="px-5 pb-5 sm:px-8 sm:pb-7">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
                                <button type="button" onClick={() => photoInput.current?.click()} disabled={uploading || loading} aria-label="Choose a profile photo" className="group relative -mt-12 flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[var(--theme-surface)] bg-[var(--theme-accent-soft)] text-3xl font-semibold text-[var(--theme-accent)] shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] disabled:cursor-wait sm:-mt-14 sm:h-32 sm:w-32">
                                    {avatar && !avatarFailed ? <img src={avatar} alt={`${username} profile`} className="h-full w-full object-cover" onError={() => setAvatarFailed(true)} /> : initials}
                                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/45 group-hover:opacity-100 group-focus-visible:bg-black/45 group-focus-visible:opacity-100">{uploading ? <span className="text-xs font-medium">Uploading…</span> : <Camera size={22} />}</span>
                                </button>
                                <input ref={photoInput} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={selectPhoto} className="sr-only" aria-label="Upload profile photo" />
                                <div className="min-w-0 pb-1">
                                    <h2 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">{username}</h2>
                                    <p className="mt-1 text-sm text-[var(--theme-text-secondary)]">{form.bio || "Student · Competitive programming enthusiast"}</p>
                                    <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--theme-text-muted)]">
                                        <span className="inline-flex items-center gap-1.5"><GraduationCap size={14} />{form.college || "College not added"}</span>
                                        {form.department && <span>{form.department}</span>}
                                        {form.currentSemester && <span>{form.currentSemester}</span>}
                                        <span className="inline-flex items-center gap-1.5"><MapPin size={13} />CUJ CpHub community</span>
                                        {form.github && <a href={form.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="inline-flex items-center gap-1.5 text-[var(--theme-accent)] hover:underline"><Github size={14} />GitHub</a>}
                                        {form.linkedin && <a href={form.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="inline-flex items-center gap-1.5 text-[var(--theme-accent)] hover:underline"><Linkedin size={14} />LinkedIn</a>}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 gap-2 sm:pb-1">
                                <button type="button" onClick={() => setEditing((value) => !value)} className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-accent)] px-4 py-2 text-sm font-semibold text-[var(--theme-accent)] transition hover:bg-[var(--theme-accent-soft)]"><Pencil size={15} />{editing ? "Close editor" : "Edit profile"}</button>
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-[var(--theme-text-muted)]">{uploading ? "Uploading your photo…" : "Select your photo to upload a new one."}</p>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-y border-t border-[var(--theme-border)] sm:grid-cols-4 sm:divide-y-0">
                        <Stat icon={Trophy} label="Rating" value={rating} sublabel={codeforces?.rank || "Codeforces"} />
                        <Stat icon={ArrowUpRight} label="Peak rating" value={codeforces?.maxRating ?? "—"} sublabel={codeforces?.maxRank || "Personal best"} />
                        <Stat icon={BookOpen} label="Solved" value={codeforces?.solvedProblems ?? "—"} sublabel="Codeforces problems" />
                        <Stat icon={Activity} label="Contests" value={codeforces?.contestCount ?? "—"} sublabel="Participated" />
                    </div>
                </section>

                <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,.8fr)]">
                    <section className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6">
                        <div className="flex items-center justify-between gap-3">
                            <div><h3 className="text-lg font-semibold">About</h3><p className="mt-1 text-xs text-[var(--theme-text-muted)]">A short introduction for your fellow students</p></div>
                            {form.bio && <span className="rounded-full bg-[var(--theme-accent-soft)] px-2.5 py-1 text-[10px] font-medium text-[var(--theme-accent)]">Student profile</span>}
                        </div>
                        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[var(--theme-text-secondary)]">{form.bio || "Add an introduction to help classmates recognize you. Share what you study, what you enjoy building, or what you are learning."}</p>
                        <div className="mt-5 border-t border-[var(--theme-border)] pt-4">
                            <h4 className="text-sm font-semibold">Education</h4>
                            <div className="mt-3 flex items-start gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><GraduationCap size={20} /></span>
                                <div className="min-w-0"><p className="font-medium">{form.college || "Add your college or university"}</p><p className="mt-1 text-xs text-[var(--theme-text-muted)]">{[form.department, form.currentSemester].filter(Boolean).join(" · ") || (form.college ? "College / University" : "Your college helps classmates find and recognize you.")}</p></div>
                            </div>
                        </div>
                        <div className="mt-5 border-t border-[var(--theme-border)] pt-4">
                            <h4 className="text-sm font-semibold">Skills</h4>
                            {form.skills.trim() ? <div className="mt-3 flex flex-wrap gap-2">{[...new Set(form.skills.split(",").map((skill) => skill.trim()).filter(Boolean))].map((skill) => <span key={skill.toLowerCase()} className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-medium text-[var(--theme-text-secondary)]">{skill}</span>)}</div> : <p className="mt-2 text-sm text-[var(--theme-text-muted)]">Add skills you want classmates to know about.</p>}
                        </div>
                        {editing && <form onSubmit={saveProfile} className="mt-5 space-y-4 border-t border-[var(--theme-border)] pt-5">
                            <h4 className="text-sm font-semibold">Edit your details</h4>
                            <label className="block text-sm font-medium text-[var(--theme-text-secondary)]">College or university<input name="college" value={form.college} onChange={(event) => setForm((current) => ({ ...current, college: event.target.value }))} maxLength={100} disabled={saving || loading} placeholder="Your college or university" className="mt-2 w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-page)] px-3 py-2.5 text-sm text-[var(--theme-text)] outline-none focus:border-[var(--theme-accent)]" /></label>
                            <label className="block text-sm font-medium text-[var(--theme-text-secondary)]">Introduction<textarea name="bio" value={form.bio} onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))} maxLength={300} rows={4} disabled={saving || loading} placeholder="What are you studying or working on?" className="mt-2 w-full resize-y rounded-lg border border-[var(--theme-border)] bg-[var(--theme-page)] px-3 py-2.5 text-sm leading-relaxed text-[var(--theme-text)] outline-none focus:border-[var(--theme-accent)]" /><span className="mt-1 block text-right text-xs text-[var(--theme-text-muted)]">{form.bio.length}/300</span></label>
                            <label className="block text-sm font-medium text-[var(--theme-text-secondary)]">Skills<input value={form.skills} onChange={(event) => setForm((current) => ({ ...current, skills: event.target.value }))} maxLength={500} disabled={saving || loading} placeholder="C++, React, Python, Problem solving" className="mt-2 w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-page)] px-3 py-2.5 text-sm text-[var(--theme-text)] outline-none focus:border-[var(--theme-accent)]" /><span className="mt-1 block text-xs font-normal text-[var(--theme-text-muted)]">Separate skills with commas (up to 20).</span></label>
                            <div className="rounded-lg border border-[var(--theme-border)] p-4">
                                <h5 className="text-sm font-semibold">Current studies <span className="font-normal text-[var(--theme-text-muted)]">(optional)</span></h5>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    <label className="text-xs font-medium text-[var(--theme-text-secondary)]">Department<input value={form.department} onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))} maxLength={100} disabled={saving || loading} placeholder="e.g. Computer Science and Engineering" className="mt-1.5 w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-page)] px-3 py-2.5 text-sm outline-none focus:border-[var(--theme-accent)]" /></label>
                                    <label className="text-xs font-medium text-[var(--theme-text-secondary)]">Current semester<input value={form.currentSemester} onChange={(event) => setForm((current) => ({ ...current, currentSemester: event.target.value }))} maxLength={40} disabled={saving || loading} placeholder="e.g. Semester 4" className="mt-1.5 w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-page)] px-3 py-2.5 text-sm outline-none focus:border-[var(--theme-accent)]" /></label>
                                </div>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <label className="text-sm font-medium text-[var(--theme-text-secondary)]"><span className="inline-flex items-center gap-1.5"><Github size={14} />GitHub profile</span><input type="url" value={form.github} onChange={(event) => setForm((current) => ({ ...current, github: event.target.value }))} maxLength={200} disabled={saving || loading} placeholder="https://github.com/username" className="mt-2 w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-page)] px-3 py-2.5 text-sm outline-none focus:border-[var(--theme-accent)]" /></label>
                                <label className="text-sm font-medium text-[var(--theme-text-secondary)]"><span className="inline-flex items-center gap-1.5"><Linkedin size={14} />LinkedIn profile</span><input type="url" value={form.linkedin} onChange={(event) => setForm((current) => ({ ...current, linkedin: event.target.value }))} maxLength={200} disabled={saving || loading} placeholder="https://www.linkedin.com/in/username" className="mt-2 w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-page)] px-3 py-2.5 text-sm outline-none focus:border-[var(--theme-accent)]" /></label>
                            </div>
                            <div className="flex justify-end gap-2"><button type="button" onClick={() => { setEditing(false); setForm(profileToForm(user?.profile)); }} className="rounded-full px-4 py-2 text-sm text-[var(--theme-text-secondary)] hover:bg-[var(--theme-surface-raised)]">Cancel</button><button type="submit" disabled={saving || loading} className="inline-flex items-center gap-2 rounded-full bg-[var(--theme-accent)] px-4 py-2 text-sm font-semibold text-[#06120D] disabled:opacity-50"><Save size={14} />{saving ? "Saving…" : "Save"}</button></div>
                        </form>}
                    </section>

                    <aside className="space-y-4">
                        <section className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5">
                            <h3 className="font-semibold">Codeforces</h3>
                            <p className="mt-1 text-xs leading-relaxed text-[var(--theme-text-muted)]">Your handle is linked to your CpHub username.</p>
                            <div className="mt-4 flex items-center gap-3 rounded-lg bg-[var(--theme-surface-raised)] p-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Code2 size={19} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{username}</p><p className="text-xs text-[var(--theme-text-muted)]">{codeforces?.rank || "No synced rating yet"}</p></div></div>
                            <a href={`https://codeforces.com/profile/${encodeURIComponent(username)}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--theme-accent)] hover:underline">View Codeforces profile <ExternalLink size={14} /></a>
                        </section>
                        <section className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5">
                            <h3 className="font-semibold">Profile visibility</h3>
                            <p className="mt-2 text-sm leading-6 text-[var(--theme-text-secondary)]">Your username, college, introduction, and Codeforces progress help your college community recognize you.</p>
                        </section>
                    </aside>
                </div>
                {loading && <p className="mt-4 text-center text-xs text-[var(--theme-text-muted)]">Refreshing profile…</p>}
            </div>
        </main>
    );
};

export default Profile;
