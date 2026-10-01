import { ListFilter } from "lucide-react";

const categories = ["ALL", "DSA", "CP"];

const DailyProblemFilters = ({ value, onChange, total }) => (
    <section className="mb-4 flex flex-col gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter daily problems by category">
            <span className="mr-1 flex items-center gap-2 text-xs font-semibold text-[var(--theme-text-muted)]"><ListFilter size={15} />Category</span>
            {categories.map((category) => {
                const active = value === category;
                return <button key={category} type="button" onClick={() => onChange(category)} aria-pressed={active}
                    className={`min-h-10 rounded-xl border px-4 text-xs font-bold transition ${active ? "border-[var(--theme-accent)]/35 bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] shadow-sm" : "border-[var(--theme-border)] bg-[var(--theme-surface-raised)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-accent)]/30 hover:text-[var(--theme-text)]"}`}>
                    {category === "ALL" ? "All categories" : category}
                </button>;
            })}
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--theme-text-muted)]"><span className="h-2 w-2 rounded-full bg-[var(--theme-accent)]" /><span><strong className="font-bold text-[var(--theme-text)]">{Number(total || 0).toLocaleString()}</strong> problems in this view</span></div>
    </section>
);

export default DailyProblemFilters;
