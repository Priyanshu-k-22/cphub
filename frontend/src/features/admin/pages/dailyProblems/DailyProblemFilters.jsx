const categories = ["ALL", "DSA", "CP"];

const DailyProblemFilters = ({ value, onChange, total }) => (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5" role="group" aria-label="Filter daily problems by category">
            {categories.map((category) => (
                <button key={category} type="button" onClick={() => onChange(category)} aria-pressed={value === category}
                    className={`rounded-lg border px-3 py-2 font-mono text-[10px] transition ${value === category ? "border-[#4AFFC4]/40 bg-[#4AFFC4]/10 text-[#4AFFC4]" : "border-[#1C2734] bg-[#0A1018] text-[#718096] hover:text-white"}`}>
                    {category === "ALL" ? "All" : category}
                </button>
            ))}
        </div>
        <span className="font-mono text-[10px] text-[#556275]">{total} problems</span>
    </div>
);

export default DailyProblemFilters;
