const DailyProblemStatementEditor = ({ value, onChange }) => (
    <section className="mb-6 last:mb-0">
        <div className="mb-3 border-b border-[var(--theme-border)] pb-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--theme-accent)]">Problem Statement</p>
        </div>
        <textarea required value={value} onChange={(event) => onChange(event.target.value)} rows={7}
            placeholder="Write the complete problem statement..."
            className="w-full resize-none rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-2.5 font-mono text-[10px] text-[var(--theme-text)] outline-none placeholder:text-[var(--theme-text-muted)] focus:border-[#4AFFC4]/40" />
    </section>
);

export default DailyProblemStatementEditor;
