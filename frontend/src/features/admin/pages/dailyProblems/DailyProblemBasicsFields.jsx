const inputClass = "w-full rounded-lg border border-[#1C2734] bg-[#0D151F] px-3 py-2.5 font-mono text-sm text-[#EDF2F7] outline-none focus:border-[#4AFFC4]/50";

const Field = ({ label, required, children }) => (
    <label className="block space-y-2 font-mono text-xs text-[#8D9AAF]">
        <span>{label}{required && <span className="ml-1 text-red-400">*</span>}</span>
        {children}
    </label>
);

const DailyProblemBasicsFields = ({ form, updateField, handleCategoryChange }) => (
    <section className="mb-5 rounded-xl border border-[#1C2734] bg-[#0A1018] p-4 sm:p-5">
        <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#4AFFC4]">Basic Information</h3>
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
        <label className="mt-4 flex cursor-pointer items-center gap-2 font-mono text-xs text-[#8D9AAF]">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => updateField("isPublished", e.target.checked)} className="accent-[#4AFFC4]" />
            Publish immediately
        </label>
    </section>
);

export default DailyProblemBasicsFields;
