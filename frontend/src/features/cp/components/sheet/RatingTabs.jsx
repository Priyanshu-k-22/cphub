import React from "react";
import { Check, ChevronRight, Signal } from "lucide-react";

const RatingTabs = ({ ratings, selectedRating, onRatingChange }) => (
    <section className="mb-5 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"><Signal size={17} /></span>
            <div><h2 className="font-bold text-[var(--theme-text)]">Choose your level</h2><p className="mt-0.5 text-xs text-[var(--theme-text-muted)]">Switch tracks anytime. Your progress is saved for each rating.</p></div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {ratings.map((rating, index) => {
                const active = rating === selectedRating;
                const names = ["Beginner", "Beginner +", "Intermediate", "Intermediate +", "Advanced"];
                return <button key={rating} type="button" aria-pressed={active} onClick={() => onRatingChange(rating)} className={`group relative flex min-h-[76px] items-center justify-between gap-2 rounded-xl border px-3 py-3 text-left transition duration-200 hover:-translate-y-0.5 ${active ? "border-[var(--theme-accent)] bg-[var(--theme-accent-soft)] shadow-sm" : "border-[var(--theme-border)] bg-[var(--theme-surface-raised)] hover:border-[var(--theme-accent)]/50"}`}>
                    <span><span className={`block text-lg font-black tracking-tight ${active ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)]"}`}>{rating}<span className="ml-1 text-[10px] font-medium text-[var(--theme-text-muted)]">+</span></span><span className="mt-0.5 block text-[10px] font-medium text-[var(--theme-text-muted)]">{names[index] || "Practice"}</span></span>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${active ? "bg-[var(--theme-accent)] text-[var(--theme-page)]" : "text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)]"}`}>{active ? <Check size={15} /> : <ChevronRight size={15} />}</span>
                </button>;
            })}
        </div>
    </section>
);

export default RatingTabs;
