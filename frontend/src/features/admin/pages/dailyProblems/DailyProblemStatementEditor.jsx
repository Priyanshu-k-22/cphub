const DailyProblemStatementEditor = ({ value, onChange }) => (
    <section className="mb-6 last:mb-0">
        <div className="mb-3 border-b border-[#1C2734] pb-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#4AFFC4]">Problem Statement</p>
        </div>
        <textarea required value={value} onChange={(event) => onChange(event.target.value)} rows={7}
            placeholder="Write the complete problem statement..."
            className="w-full resize-none rounded-lg border border-[#1C2734] bg-[#0C131C] px-3 py-2.5 font-mono text-[10px] text-white outline-none placeholder:text-[#455264] focus:border-[#4AFFC4]/40" />
    </section>
);

export default DailyProblemStatementEditor;
