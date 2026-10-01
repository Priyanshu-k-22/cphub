import { useEffect, useState } from "react";

import { getProblemHistory } from "../api/problem.api";

import ProblemHistoryCard from "../components/ProblemHistory/ProblemHistoryCard";
import ProblemHistoryFilterPanel from "../components/ProblemHistory/ProblemHistoryFilterPanel";
import ProblemHistoryActiveFilters from "../components/ProblemHistory/ProblemHistoryActiveFilters";
import ProblemPagination from "../components/ProblemHistory/ProblemPagination";

const ProblemHistory = () => {
    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [problems, setProblems] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filters, setFilters] = useState({
        category: "",
        topic: "",
        tag: "",
        difficulty: "",
    });

    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });

    /*
    |--------------------------------------------------------------------------
    | Fetch Problems
    |--------------------------------------------------------------------------
    */

useEffect(() => {
    let active = true;
    const fetchHistory = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getProblemHistory({
                ...filters,
                search,
                sort,
                page,
                limit: 20,
            });

            // Backend response:
            // {
            //     statusCode: 200,
            //     data: {
            //         problems: [],
            //         pagination: {}
            //     },
            //     message: "...",
            //     success: true
            // }

            const historyProblems = Array.isArray(
                response?.data?.problems
            )
                ? response.data.problems
                : [];

            if (!active) return;

            setProblems(historyProblems);

            setPagination(
                response?.data?.pagination || {
                    page,
                    limit: 20,
                    total: historyProblems.length,
                    totalPages: 1,
                }
            );

        } catch (err) {
            if (!active) return;

            setError(
                err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load problem history."
            );

            setProblems([]);

            setPagination({
                page,
                limit: 20,
                total: 0,
                totalPages: 0,
            });
        } finally {
            if (active) setLoading(false);
        }
    };

    fetchHistory();
    return () => { active = false; };
}, [filters, search, sort, page]);

    /*
    |--------------------------------------------------------------------------
    | Clear Filters
    |--------------------------------------------------------------------------
    */

    const clearFilters = () => {
        setPage(1);
        setFilters({
            category: "",
            topic: "",
            tag: "",
            difficulty: "",
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Remove Individual Filter
    |--------------------------------------------------------------------------
    */

    const removeFilter = (key) => {
        setPage(1);
        setFilters((previous) => ({
            ...previous,
            [key]: "",
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | Active Filter Count
    |--------------------------------------------------------------------------
    */

    const activeFilterCount = Object.values(filters).filter(
        Boolean
    ).length;

    /*
    |--------------------------------------------------------------------------
    | Stats
    |--------------------------------------------------------------------------
    */

    const solvedCount = problems.filter(
        (problem) =>
            problem.status === "Solved" ||
            problem.status === "solved"
    ).length;

    const attemptedCount = problems.filter(
        (problem) =>
            problem.status === "Attempted" ||
            problem.status === "attempted"
    ).length;

    const cpCount = problems.filter(
        (problem) => problem.category === "CP"
    ).length;

    const dsaCount = problems.filter(
        (problem) => problem.category === "DSA"
    ).length;

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="problem-history-page min-h-screen w-full bg-[#060a10] text-[#edf2f7]">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:px-8">

                {/* =========================================================
                    HEADER
                ========================================================== */}

                <div className="mb-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="mb-1 font-mono text-xs uppercase tracking-[0.25em] text-[#4affc4]">
                                Practice
                            </p>

                            <h1 className="text-2xl font-semibold md:text-3xl">
                                Problem History
                            </h1>

                            <p className="mt-1 text-sm text-[#718096]">
                                Track your coding problems and progress.
                            </p>
                        </div>

                        {/* Filter Button */}

                        <button
                            type="button"
                            onClick={() =>
                                setIsFilterOpen(true)
                            }
                            className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#263445] bg-[#0c131c] px-4 py-2.5 text-sm text-[#cbd5e1] transition hover:border-[#4affc4]/50 hover:text-[#4affc4]"
                        >
                            <span className="text-base">
                                ☷
                            </span>

                            <span>
                                Filters
                            </span>

                            {activeFilterCount > 0 && (
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4affc4] px-1 text-[10px] font-bold text-[#060a10]">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* =========================================================
                    STATS
                ========================================================== */}

                <div className="mb-5 grid grid-cols-2 gap-2 md:grid-cols-4">

                    {/* Solved */}

                    <div className="rounded-xl border border-[#1c2734] bg-[#0a1018] px-4 py-3">
                        <p className="text-xs text-[#718096]">
                            Solved
                        </p>

                        <p className="mt-1 text-xl font-semibold text-[#4affc4]">
                            {solvedCount}
                        </p>
                    </div>

                    {/* Attempted */}

                    <div className="rounded-xl border border-[#1c2734] bg-[#0a1018] px-4 py-3">
                        <p className="text-xs text-[#718096]">
                            Attempted
                        </p>

                        <p className="mt-1 text-xl font-semibold text-yellow-400">
                            {attemptedCount}
                        </p>
                    </div>

                    {/* CP */}

                    <div className="rounded-xl border border-[#1c2734] bg-[#0a1018] px-4 py-3">
                        <p className="text-xs text-[#718096]">
                            CP
                        </p>

                        <p className="mt-1 text-xl font-semibold text-blue-400">
                            {cpCount}
                        </p>
                    </div>

                    {/* DSA */}

                    <div className="rounded-xl border border-[#1c2734] bg-[#0a1018] px-4 py-3">
                        <p className="text-xs text-[#718096]">
                            DSA
                        </p>

                        <p className="mt-1 text-xl font-semibold text-emerald-400">
                            {dsaCount}
                        </p>
                    </div>
                </div>

                {/* =========================================================
                    SEARCH + SORT
                ========================================================== */}

                <div className="mb-4 flex flex-col gap-2 md:flex-row">

                    {/* Search */}

                    <div className="relative flex-1">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556275]">
                            ⌕
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => {
                                setPage(1);
                                setSearch(event.target.value);
                            }}
                            placeholder="Search problems..."
                            className="w-full rounded-xl border border-[#1c2734] bg-[#0a1018] py-3 pl-10 pr-4 text-sm text-[#edf2f7] outline-none placeholder:text-[#556275] focus:border-[#4affc4]/50"
                        />
                    </div>

                    {/* Sort */}

                    <select
                        value={sort}
                        onChange={(event) => {
                            setPage(1);
                            setSort(event.target.value);
                        }}
                        className="rounded-xl border border-[#1c2734] bg-[#0a1018] px-4 py-3 text-sm text-[#aeb9c7] outline-none focus:border-[#4affc4]/50"
                    >
                        <option value="newest">
                            Newest First
                        </option>

                        <option value="oldest">
                            Oldest First
                        </option>
                    </select>
                </div>

                {/* =========================================================
                    ACTIVE FILTERS
                ========================================================== */}

                <ProblemHistoryActiveFilters
                    filters={filters}
                    onRemove={removeFilter}
                    onClear={clearFilters}
                />

                {/* =========================================================
                    ERROR
                ========================================================== */}

                {error && (
                    <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* =========================================================
                    LOADING
                ========================================================== */}

                {loading ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <div className="text-sm text-[#718096]">
                            Loading problem history...
                        </div>
                    </div>
                ) : problems.length === 0 ? (

                    /* =====================================================
                       EMPTY STATE
                    ====================================================== */

                    <div className="rounded-xl border border-dashed border-[#263445] bg-[#0a1018] px-6 py-16 text-center">

                        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#111923] text-[#718096]">
                            ?
                        </div>

                        <p className="text-sm text-[#718096]">
                            No problems found.
                        </p>

                        {(search ||
                            activeFilterCount > 0) && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    clearFilters();
                                }}
                                className="mt-3 text-sm text-[#4affc4] hover:underline"
                            >
                                Clear search and filters
                            </button>
                        )}
                    </div>
                ) : (

                    /* =====================================================
                       PROBLEM LIST
                    ====================================================== */

                    <div className="space-y-2">

                        {problems.map(
                            (problem, index) => (
                                <ProblemHistoryCard
                                    key={
                                        problem._id ||
                                        problem.id ||
                                        index
                                    }
                                    problem={problem}
                                />
                            )
                        )}
                    </div>
                )}

                {/* =========================================================
                    PAGINATION INFO
                ========================================================== */}

                {!loading &&
                    problems.length > 0 && (
                        <div className="mt-5 flex justify-between text-xs text-[#556275]">

                            <span>
                                Showing{" "}
                                {problems.length}{" "}
                                of{" "}
                                {pagination.total}
                            </span>

                            <span>
                                Page{" "}
                                {pagination.page}{" "}
                                of{" "}
                                {pagination.totalPages}
                            </span>
                        </div>
                    )}
                {!loading && (
                    <ProblemPagination
                        page={pagination.page || page}
                        totalPages={pagination.totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>

            {/* =============================================================
                FILTER DRAWER
            ============================================================= */}

            <ProblemHistoryFilterPanel
                open={isFilterOpen}
                filters={filters}
                onChange={(update) => {
                    setPage(1);
                    setFilters(update);
                }}
                onClose={() =>
                    setIsFilterOpen(false)
                }
                onClear={clearFilters}
            />
        </div>
    );
};

export default ProblemHistory;
