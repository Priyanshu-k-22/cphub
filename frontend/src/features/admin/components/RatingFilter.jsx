const RatingFilter = ({ ratings, value, onChange }) => (
    <div className="mb-4 flex flex-wrap gap-2" aria-label="Filter by Codeforces rating">
        {ratings.map((rating) => (
            <button key={rating} type="button" onClick={() => onChange(rating)} aria-pressed={value === rating}
                className={`rounded-lg border px-4 py-2 font-mono text-xs transition ${value === rating ? "border-[#4AFFC4]/40 bg-[#4AFFC4]/10 text-[#4AFFC4]" : "border-[#1C2734] bg-[#0A1018] text-[#7F8B9C] hover:text-white"}`}>
                {rating}
            </button>
        ))}
    </div>
);

export default RatingFilter;
