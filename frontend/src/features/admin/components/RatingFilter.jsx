import { SlidersHorizontal } from "lucide-react";

const RatingFilter = ({ ratings, value, onChange }) => (
    <section className="mb-4 flex flex-col gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--theme-text)]"><SlidersHorizontal size={15} className="text-[var(--theme-accent)]" />Choose a rating track</div>
            <p className="mt-1 text-xs text-[var(--theme-text-muted)]">Switch between Codeforces difficulty levels</p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by Codeforces rating">
            {ratings.map((rating) => {
                const active = value === rating;
                return <button key={rating} type="button" onClick={() => onChange(rating)} aria-pressed={active}
                    className={`min-h-10 min-w-[68px] rounded-xl border px-3 text-xs font-bold tabular-nums transition ${active ? "border-[var(--theme-accent)]/35 bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] shadow-sm" : "border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-accent)]/30 hover:text-[var(--theme-text)]"}`}>
                    {rating}
                </button>;
            })}
        </div>
    </section>
);

export default RatingFilter;
