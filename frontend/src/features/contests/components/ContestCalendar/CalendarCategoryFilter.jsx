const CalendarCategoryFilter = ({ options, value, onChange }) => (
    <div className="flex gap-2 rounded-xl border border-[#1c2734] bg-[#0a1018] p-1" role="group" aria-label="Filter contests by category">
        {options.map((option) => (
            <button key={option.value || "all"} type="button" onClick={() => onChange(option.value)} aria-pressed={value === option.value}
                className={`rounded-lg px-4 py-2 text-sm transition ${value === option.value ? "bg-[#4affc4] text-[#060a10]" : "text-[#aeb9c7] hover:bg-[#111923] hover:text-[#edf2f7]"}`}>
                {option.label}
            </button>
        ))}
    </div>
);

export default CalendarCategoryFilter;
