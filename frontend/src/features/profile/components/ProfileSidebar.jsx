import { Code2, ExternalLink } from "lucide-react";

const ProfileSidebar = ({ username, codeforces }) => (
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
);

export default ProfileSidebar;
