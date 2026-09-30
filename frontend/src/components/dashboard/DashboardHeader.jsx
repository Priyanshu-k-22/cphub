import React, { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Github, GraduationCap, Linkedin, RefreshCw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHeader = ({ user, onRefresh, refreshing }) => {
    const [avatarFailed, setAvatarFailed] = useState(false);
    const now = new Date();
    const username = user?.username || "there";
    const avatar = user?.profile?.avatar;
    const hour = now.getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const date = now.toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" });
    const profile = user?.profile || {};

    useEffect(() => setAvatarFailed(false), [avatar]);

    return (
        <header className="relative mb-4 overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.12)] sm:p-6">
            <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-[#4AFFC4]/10 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-1/3 h-px w-1/2 bg-gradient-to-r from-transparent via-[#4AFFC4]/35 to-transparent" />

            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-medium text-[var(--theme-text-secondary)]">
                        <Sparkles size={14} className="text-[var(--theme-accent)]" />
                        CpHub student workspace
                    </div>
                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-[var(--theme-text)] sm:text-3xl">{greeting}, {username}</h1>
                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)]">
                        Small steps, solved consistently. Pick up where you left off and keep building momentum.
                    </p>

                    {(profile.department || profile.currentSemester || profile.college) && (
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--theme-text-muted)]">
                            <GraduationCap size={15} className="text-[var(--theme-accent)]" />
                            {[profile.department, profile.currentSemester && `Semester ${profile.currentSemester}`, profile.college].filter(Boolean).map((value, index) => (
                                <span key={`${value}-${index}`} className="max-w-full truncate">{value}</span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex shrink-0 items-center justify-between gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-3 md:justify-start">
                    <button type="button" onClick={onRefresh} disabled={refreshing} aria-label="Refresh dashboard" title="Refresh dashboard" className="rounded-lg p-2 text-[var(--theme-text-secondary)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-accent)] disabled:opacity-50">
                        <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                    </button>
                    <div className="flex items-center gap-3">
                        <Link to="/profile" aria-label="Open your profile" className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--theme-accent)] bg-[var(--theme-accent-soft)] text-lg font-bold text-[var(--theme-accent)] transition hover:scale-105">
                            {avatar && !avatarFailed
                                ? <img src={avatar} alt={`${username} profile`} className="h-full w-full object-cover" onError={() => setAvatarFailed(true)} />
                                : username.slice(0, 1).toUpperCase()}
                        </Link>
                        <div>
                            <p className="max-w-36 truncate text-sm font-semibold text-[var(--theme-text)]">{username}</p>
                            <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-[var(--theme-text-muted)]"><CalendarDays size={13} />{date}</p>
                        </div>
                    </div>
                    <div className="ml-2 flex items-center gap-1.5 border-l border-[var(--theme-border)] pl-3">
                        {profile.links?.github && <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="rounded-lg p-2 text-[var(--theme-text-secondary)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-accent)]"><Github size={17} /></a>}
                        {profile.links?.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="rounded-lg p-2 text-[var(--theme-text-secondary)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-accent)]"><Linkedin size={17} /></a>}
                        <Link to="/profile" aria-label="Edit profile" className="rounded-lg p-2 text-[var(--theme-text-secondary)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-accent)]"><ArrowUpRight size={17} /></Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
