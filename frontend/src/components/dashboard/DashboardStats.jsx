import React from "react";


const DashboardStats = ({
    codeforces,
    loading,
    syncing,
    onSync
}) => {

    /*
    |--------------------------------------------------------------------------
    | Loading state
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                {[
                    "CP Rating",
                    "Solved",
                    "Contests",
                    "Streak"
                ].map((label) => (

                    <div key={label}>

                        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#556275]">
                            {label}
                        </p>

                        <div className="mt-2 h-6 w-16 animate-pulse rounded bg-[#1C2734]" />

                        <div className="mt-1 h-3 w-20 animate-pulse rounded bg-[#111923]" />

                    </div>

                ))}

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Codeforces values
    |--------------------------------------------------------------------------
    */

    const hasProfile = Boolean(codeforces);

    const rating = codeforces?.rating > 0
        ? codeforces.rating
        : hasProfile ? "Unrated" : "—";

    const maxRating = codeforces?.maxRating > 0
        ? codeforces.maxRating
        : "—";

    const solved = codeforces?.solvedProblems ?? "—";

    const contests = codeforces?.contestCount ?? "—";

    const rank = codeforces?.rank || (hasProfile ? "Unrated" : "—");


    return (
        <div>


            {/* =========================================================
                HEADER
            ========================================================== */}

            <div className="mb-3 flex items-center justify-between">

                <div>

                    <p className="text-sm font-semibold text-[9px] uppercase tracking-[0.12em]">
                        Codeforces
                    </p>

                    <p className="mt-1 text-xs text-[#6B7788]">
                        {codeforces?.lastSyncedAt
                            ? `Last synced ${new Date(codeforces.lastSyncedAt).toLocaleString()}`
                            : "Profile not synced yet"}
                    </p>

                </div>


                {/* =====================================================
                    SYNC BUTTON
                ====================================================== */}

                <button
                    type="button"
                    onClick={onSync}
                    disabled={syncing}
                    className="
                        rounded-md
                        border
                        border-[#1C2734]
                        bg-[#0B1119]
                        px-2.5
                        py-1.5
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-wide
                        text-[#4AFFC4]
                        transition
                        hover:border-[#4AFFC4]
                        hover:bg-[#4AFFC4]/5
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {syncing ? "syncing..." : "sync"}
                </button>

            </div>


            {/* =========================================================
                STATS
            ========================================================== */}

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">


                {/* =====================================================
                    CP RATING
                ====================================================== */}

                <div>

                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#556275]">
                        CP Rating
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                        {rating}
                    </p>

                    <p className="mt-0.5 font-mono text-[9px] text-[#556275]">
                        best {maxRating}
                    </p>

                </div>


                {/* =====================================================
                    SOLVED
                ====================================================== */}

                <div>

                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#556275]">
                        Solved
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                        {solved}
                    </p>

                    <p className="mt-0.5 font-mono text-[9px] text-[#556275]">
                        Codeforces
                    </p>

                </div>


                {/* =====================================================
                    CONTESTS
                ====================================================== */}

                <div>

                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#556275]">
                        Contests
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                        {contests}
                    </p>

                    <p className="mt-0.5 font-mono text-[9px] text-[#556275]">
                        Codeforces
                    </p>

                </div>


                    {/* =====================================================
                    RANK
                ====================================================== */}

                <div>

                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#556275]">
                        Rank
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                        {rank}
                    </p>

                    <p className="mt-0.5 font-mono text-[9px] text-[#556275]">
                        current rank
                    </p>

                </div>

            </div>

        </div>
    );
};


export default DashboardStats;
