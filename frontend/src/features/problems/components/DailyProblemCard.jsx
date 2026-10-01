import { ArrowUpRight, Braces, Code2, Layers3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const getDifficultyStyle = (difficulty) => ({
    Easy: "bg-emerald-500/10 text-emerald-500",
    Medium: "bg-amber-500/10 text-amber-500",
    Hard: "bg-rose-500/10 text-rose-500",
}[difficulty] || "bg-[var(--theme-surface-high)] text-[var(--theme-text-secondary)]");

const DailyProblemCard = ({ problem }) => {
    const category = problem.category || "DSA";
    const isCP = category === "CP";
    const platform = problem.platform || "Practice";
    const tags = Array.isArray(problem.tags) ? problem.tags : [];
    const topics = Array.isArray(problem.topics) ? problem.topics : [];
    const topic = problem.topic || topics[0] || "";
    const Icon = isCP ? Code2 : Layers3;

    return <Link to={`/problems/${problem._id}`} className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 transition duration-200 hover:-translate-y-1 hover:border-[var(--theme-accent)]/50 hover:shadow-xl hover:shadow-black/5 sm:p-6">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[var(--theme-accent)] opacity-0 blur-3xl transition group-hover:opacity-[0.08]" />
        <div className="relative flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${isCP ? "bg-sky-500/10 text-sky-500" : "bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"}`}><Icon size={21} /></span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-2.5 py-1 text-[10px] font-semibold text-[var(--theme-text-muted)]"><Sparkles size={12} className="text-[var(--theme-accent)]" />Today</span>
            </div>

            <h3 className="mt-5 line-clamp-2 text-lg font-bold leading-snug text-[var(--theme-text)] transition group-hover:text-[var(--theme-accent)]">{problem.title}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-2 py-1 text-[10px] font-semibold text-[var(--theme-text-secondary)]">{platform}</span>
                <span className={`rounded-md px-2 py-1 text-[10px] font-semibold ${isCP ? "bg-sky-500/10 text-sky-500" : "bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]"}`}>{isCP ? "CP" : "DSA"}</span>
                {isCP && problem.rating != null ? <span className="inline-flex items-center gap-1 rounded-md bg-sky-500/10 px-2 py-1 text-[10px] font-semibold text-sky-500"><Braces size={11} />{problem.rating}</span> : problem.difficulty && <span className={`rounded-md px-2 py-1 text-[10px] font-semibold ${getDifficultyStyle(problem.difficulty)}`}>{problem.difficulty}</span>}
            </div>

            {(topic || tags.length > 0) && <div className="mt-3 flex min-h-5 flex-wrap items-center gap-1.5">
                {topic && <span className="text-xs text-[var(--theme-text-muted)]">{topic}</span>}
                {tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-md bg-[var(--theme-surface-high)] px-1.5 py-0.5 text-[10px] text-[var(--theme-text-muted)]">{tag}</span>)}
                {tags.length > 3 && <span className="text-[10px] text-[var(--theme-text-muted)]">+{tags.length - 3}</span>}
            </div>}

            <div className="mt-auto flex items-center justify-between border-t border-[var(--theme-border)] pt-4">
                <span className="text-xs font-medium text-[var(--theme-text-muted)]">Open challenge</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] transition group-hover:translate-x-0.5"><ArrowUpRight size={17} /></span>
            </div>
        </div>
    </Link>;
};

export default DailyProblemCard;
