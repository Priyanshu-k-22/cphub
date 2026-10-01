import { GraduationCap } from "lucide-react";
import ProfileEditForm from "./ProfileEditForm";

const ProfileDetails = ({ form, editing, saving, loading, setForm, saveProfile, setEditing, user }) => (
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
                        {editing && <ProfileEditForm form={form} setForm={setForm} saving={saving} loading={loading} saveProfile={saveProfile} setEditing={setEditing} user={user} />}
                    </section>
);

export default ProfileDetails;
