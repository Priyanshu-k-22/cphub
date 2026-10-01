const AdminPagination = ({ page, pageSize, total, totalPages, loading, onPageChange, noun = "items" }) => (
    <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[#1C2734] bg-[#080D14] px-4 py-3 text-sm text-[#7F8B9C]">
        <span className="text-xs">{total ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} of ${total} ${noun}` : `No ${noun}`}</span>
        <div className="flex shrink-0 items-center gap-2">
            <button type="button" disabled={loading || page <= 1} onClick={() => onPageChange(page - 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 disabled:opacity-40">Previous</button>
            <span className="px-1">{page} / {Math.max(1, totalPages)}</span>
            <button type="button" disabled={loading || page >= totalPages} onClick={() => onPageChange(page + 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 disabled:opacity-40">Next</button>
        </div>
    </div>
);

export default AdminPagination;
