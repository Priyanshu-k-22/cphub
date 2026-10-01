const FILTER_LABELS = {
    category: "Category",
    topic: "Topic",
    tag: "Tag",
    difficulty: "Difficulty",
};

const ProblemHistoryActiveFilters = ({
    filters,
    onRemove,
    onClear,
}) => {
    const activeFilters = Object.entries(
        filters
    ).filter(([, value]) =>
        Boolean(value)
    );

    if (activeFilters.length === 0) {
        return null;
    }

    return (
        <div className="mb-4 flex flex-wrap items-center gap-2">

            <span className="text-xs text-[#556275]">
                Active:
            </span>

            {activeFilters.map(
                ([key, value]) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() =>
                            onRemove(key)
                        }
                        className="inline-flex items-center gap-1.5 rounded-md border border-[#263445] bg-[#0d141d] px-2.5 py-1 text-[11px] text-[#aeb9c7] transition hover:border-[#4affc4]/40 hover:text-[#edf2f7]"
                    >
                        <span>
                            {FILTER_LABELS[key]}:
                        </span>

                        <span className="text-[#4affc4]">
                            {value}
                        </span>

                        <span className="ml-1 text-[#556275]">
                            ×
                        </span>
                    </button>
                )
            )}

            <button
                type="button"
                onClick={onClear}
                className="text-[11px] text-[#718096] transition hover:text-[#4affc4]"
            >
                Clear all
            </button>
        </div>
    );
};

export default ProblemHistoryActiveFilters;