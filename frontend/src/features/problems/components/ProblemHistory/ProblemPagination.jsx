import React from "react";

const ProblemPagination = ({
    page,
    totalPages,
    onPageChange
}) => {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-8 flex items-center justify-center gap-3">

            <button
                type="button"
                disabled={page === 1}
                onClick={() =>
                    onPageChange(page - 1)
                }
                className="rounded-lg border border-[#1C2734] px-4 py-2 font-mono text-xs text-[#AEB9C7] transition hover:border-[#4AFFC4]/30 hover:text-[#4AFFC4] disabled:cursor-not-allowed disabled:opacity-30"
            >
                ← previous
            </button>


            <div className="rounded-lg border border-[#1C2734] bg-[#0A1018] px-4 py-2 font-mono text-xs text-[#556275]">
                <span className="text-[#EDF2F7]">
                    {page}
                </span>

                {" / "}

                {totalPages}
            </div>


            <button
                type="button"
                disabled={page === totalPages}
                onClick={() =>
                    onPageChange(page + 1)
                }
                className="rounded-lg border border-[#1C2734] px-4 py-2 font-mono text-xs text-[#AEB9C7] transition hover:border-[#4AFFC4]/30 hover:text-[#4AFFC4] disabled:cursor-not-allowed disabled:opacity-30"
            >
                next →
            </button>

        </div>
    );
};

export default ProblemPagination;