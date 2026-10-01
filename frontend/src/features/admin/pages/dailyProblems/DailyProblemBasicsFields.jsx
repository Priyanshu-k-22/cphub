const inputClass = "w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3.5 py-3 text-sm text-[var(--theme-text)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]/50 focus:ring-2 focus:ring-[var(--theme-accent)]/10";

const Field = ({ label, required, children }) => (
    <label className="block space-y-2 text-sm font-medium text-[var(--theme-text-secondary)]">
        <span>{label}{required && <span className="ml-1 text-red-400">*</span>}</span>
        {children}
    </label>
);

const DailyProblemBasicsFields = ({ form, updateField, handleCategoryChange }) => (
    <section className="mb-5 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 sm:p-5">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)]">Basic Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" required><input type="text" required value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Two Sum" className={inputClass} /></Field>
            <Field label="Slug" required><input type="text" required value={form.slug} onChange={(e) => updateField("slug", e.target.value)} placeholder="two-sum" className={inputClass} /></Field>
            <Field label="Category" required><select value={form.category} onChange={(e) => handleCategoryChange(e.target.value)} className={inputClass}><option value="DSA">DSA</option><option value="CP">CP</option></select></Field>
            <Field label="Difficulty" required><select value={form.difficulty} onChange={(e) => updateField("difficulty", e.target.value)} className={inputClass}><option value="Easy">Easy</option><option value="Medium">Medium</option><option value="Hard">Hard</option></select></Field>
            <Field label="Rating"><input type="number" value={form.rating} onChange={(e) => updateField("rating", e.target.value)} placeholder="1200" className={inputClass} /></Field>
            <Field label="Daily Date" required><input type="date" required value={form.dailyDate} onChange={(e) => updateField("dailyDate", e.target.value)} className={inputClass} /></Field>
            <Field label="Platform" required><input type="text" required value={form.platform} onChange={(e) => updateField("platform", e.target.value)} placeholder="LeetCode" className={inputClass} /></Field>
            <Field label="External Link" required><input type="url" required value={form.externalLink} onChange={(e) => updateField("externalLink", e.target.value)} placeholder="https://leetcode.com/problems/..." className={inputClass} /></Field>
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--theme-text-secondary)]">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => updateField("isPublished", e.target.checked)} className="accent-[#4AFFC4]" />
            Publish immediately
        </label>
    </section>
);

export default DailyProblemBasicsFields;
