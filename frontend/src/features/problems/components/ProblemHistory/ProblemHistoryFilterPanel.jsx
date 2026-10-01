import { useEffect } from "react";

const CATEGORY_OPTIONS = [
    {
        label: "All",
        value: "",
    },
    {
        label: "DSA",
        value: "DSA",
    },
    {
        label: "CP",
        value: "CP",
    },
];

const DIFFICULTY_OPTIONS = [
    {
        label: "All",
        value: "",
    },
    {
        label: "Easy",
        value: "Easy",
    },
    {
        label: "Medium",
        value: "Medium",
    },
    {
        label: "Hard",
        value: "Hard",
    },
];

const TOPIC_OPTIONS = [
    "Arrays",
    "Strings",
    "Linked List",
    "Stack",
    "Queue",
    "Binary Tree",
    "BST",
    "Trie",
    "Sliding Window",
    "Two Pointers",
    "Prefix Sum",
    "Recursion",
    "Backtracking",
    "DP",
];

const TAG_OPTIONS = [
    "Array",
    "String",
    "Hash Table",
    "Sorting",
    "Binary Search",
    "Tree",
    "Recursion",
    "Backtracking",
    "Greedy",
    "Prefix Sum",
    "Sliding Window",
    "Two Pointers",
];

const ProblemHistoryFilterPanel = ({
    open,
    filters,
    onChange,
    onClose,
    onClear,
}) => {
    /*
    |--------------------------------------------------------------------------
    | Prevent Background Scrolling
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!open) {
            return;
        }

        document.body.style.overflow =
            "hidden";

        return () => {
            document.body.style.overflow =
                "";
        };
    }, [open]);

    if (!open) {
        return null;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Filter
    |--------------------------------------------------------------------------
    */

    const updateFilter = (
        key,
        value
    ) => {
        onChange((previous) => ({
            ...previous,
            [key]: value,
        }));
    };

    return (
        <div className="fixed inset-0 z-50">

            {/* =========================================================
                BACKDROP
            ========================================================== */}

            <button
                type="button"
                aria-label="Close filters"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-[2px]"
            />

            {/* =========================================================
                DRAWER
            ========================================================== */}

            <aside className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-[#1c2734] bg-[#080d14] shadow-2xl">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="flex items-center justify-between border-b border-[#1c2734] px-5 py-4">

                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4affc4]">
                            Refine
                        </p>

                        <h2 className="mt-1 text-lg font-semibold text-[#edf2f7]">
                            Filters
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#718096] transition hover:bg-[#111923] hover:text-[#edf2f7]"
                    >
                        ×
                    </button>
                </div>

                {/* =====================================================
                    CONTENT
                ====================================================== */}

                <div className="flex-1 overflow-y-auto px-5 py-5">

                    {/* Category */}

                    <FilterSection label="Category">
                        <select
                            value={
                                filters.category
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "category",
                                    event.target
                                        .value
                                )
                            }
                            className="filter-select"
                        >
                            {CATEGORY_OPTIONS.map(
                                (option) => (
                                    <option
                                        key={
                                            option.value ||
                                            "all"
                                        }
                                        value={
                                            option.value
                                        }
                                    >
                                        {
                                            option.label
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </FilterSection>

                    {/* DSA Topic */}

                    <FilterSection label="DSA Topic">
                        <select
                            value={
                                filters.topic
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "topic",
                                    event.target
                                        .value
                                )
                            }
                            className="filter-select"
                        >
                            <option value="">
                                All Topics
                            </option>

                            {TOPIC_OPTIONS.map(
                                (topic) => (
                                    <option
                                        key={topic}
                                        value={topic}
                                    >
                                        {topic}
                                    </option>
                                )
                            )}
                        </select>
                    </FilterSection>

                    {/* Tag */}

                    <FilterSection label="Tag">
                        <select
                            value={
                                filters.tag
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "tag",
                                    event.target
                                        .value
                                )
                            }
                            className="filter-select"
                        >
                            <option value="">
                                All Tags
                            </option>

                            {TAG_OPTIONS.map(
                                (tag) => (
                                    <option
                                        key={tag}
                                        value={tag}
                                    >
                                        {tag}
                                    </option>
                                )
                            )}
                        </select>
                    </FilterSection>

                    {/* Difficulty */}

                    <FilterSection label="Difficulty">
                        <select
                            value={
                                filters.difficulty
                            }
                            onChange={(event) =>
                                updateFilter(
                                    "difficulty",
                                    event.target
                                        .value
                                )
                            }
                            className="filter-select"
                        >
                            {DIFFICULTY_OPTIONS.map(
                                (option) => (
                                    <option
                                        key={
                                            option.value ||
                                            "all"
                                        }
                                        value={
                                            option.value
                                        }
                                    >
                                        {
                                            option.label
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </FilterSection>
                </div>

                {/* =====================================================
                    FOOTER
                ====================================================== */}

                <div className="border-t border-[#1c2734] p-5">

                    <button
                        type="button"
                        onClick={onClear}
                        className="w-full rounded-lg border border-[#263445] bg-[#0d141d] px-4 py-2.5 text-sm text-[#aeb9c7] transition hover:border-red-400/30 hover:text-red-400"
                    >
                        Clear Filters
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-2 w-full rounded-lg bg-[#4affc4] px-4 py-2.5 text-sm font-semibold text-[#060a10] transition hover:bg-[#68ffd0]"
                    >
                        Apply
                    </button>
                </div>
            </aside>
        </div>
    );
};

/*
|--------------------------------------------------------------------------
| Filter Section
|--------------------------------------------------------------------------
*/

const FilterSection = ({
    label,
    children,
}) => {
    return (
        <div className="mb-5">
            <label className="mb-2 block text-xs font-medium text-[#aeb9c7]">
                {label}
            </label>

            {children}
        </div>
    );
};

export default ProblemHistoryFilterPanel;