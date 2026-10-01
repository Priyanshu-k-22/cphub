import { Camera, GraduationCap, Github, Linkedin, MapPin } from "lucide-react";

const ProfileHero = ({ photoInput, avatar, avatarFailed, setAvatarFailed, uploading, loading, selectPhoto, initials, username, form, editing, setEditing }) => (
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
                        <ProfileStat icon={Trophy} label="Rating" value={rating} sublabel={codeforces?.rank || "Codeforces"} />
                        <ProfileStat icon={ArrowUpRight} label="Peak rating" value={codeforces?.maxRating ?? "—"} sublabel={codeforces?.maxRank || "Personal best"} />
                        <ProfileStat icon={BookOpen} label="Solved" value={codeforces?.solvedProblems ?? "—"} sublabel="Codeforces problems" />
                        <ProfileStat icon={Activity} label="Contests" value={codeforces?.contestCount ?? "—"} sublabel="Participated" />
                    </div>
                </section>
);

export default ProfileHero;
