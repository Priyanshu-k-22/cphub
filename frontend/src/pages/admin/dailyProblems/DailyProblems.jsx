import React, { useCallback, useEffect, useState } from "react";

import {
    Edit3,
    Trash2,
    Plus,
    CalendarDays
} from "lucide-react";

import AdminLayout
    from "../components/AdminLayout";

import AdminPageHeader
    from "../components/AdminPageHeader";

import AddDailyProblemModal
    from "./AddDailyProblemModal";
import {
    createProblem,
    getAdminProblems,
    updateProblem,
    deleteProblem
} from "../../../api/problem.api";


const DailyProblems = () => {
    const PAGE_SIZE = 20;

    const [showModal, setShowModal] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [category, setCategory] =
        useState("ALL");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
    const [problems, setProblems] = useState([]);
    const [loadError, setLoadError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [selectedProblem, setSelectedProblem] = useState(null);

    const fetchProblems = useCallback(async () => {
        try {
            setLoading(true);
            setLoadError("");
            const response = await getAdminProblems({ category, page, limit: PAGE_SIZE });
            setProblems(response?.data?.problems || []);
            setPagination(response?.data?.pagination || { total: 0, totalPages: 0 });
        } catch (error) {
            setLoadError(
                error?.response?.data?.message ||
                "Could not load daily problems. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, [category, page]);

    useEffect(() => {
        fetchProblems();
    }, [fetchProblems]);


    /*
    |--------------------------------------------------------------------------
    | Add Problem
    |--------------------------------------------------------------------------
    */

    const handleSaveProblem = async (
        problem
    ) => {

        try {

            setLoading(true);
            setSubmitError("");
            const response = selectedProblem
                ? await updateProblem(selectedProblem._id, problem)
                : await createProblem(problem);
            const savedProblem = response?.data;
            if (!savedProblem?._id) {
                throw new Error("The server did not return the saved problem.");
            }
            if (!selectedProblem && page !== 1) setPage(1);
            else await fetchProblems();
            setShowModal(false);
            setSelectedProblem(null);

        } catch (error) {

            console.error("Failed to save daily problem:", error);
            setSubmitError(
                error?.response?.data?.message ||
                error.message ||
                "Failed to save daily problem. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = async (problem) => {

        const confirmed =
            window.confirm(
                `Delete "${problem.title}" from daily problems?`
            );

        if (!confirmed) {
            return;
        }

        try {
            await deleteProblem(problem._id);
            if (problems.length === 1 && page > 1) setPage((current) => current - 1);
            else await fetchProblems();
        } catch (error) {
            console.error("Failed to delete daily problem:", error);
            alert(error?.response?.data?.message || "Failed to delete daily problem.");
        }

    };


    /*
    |--------------------------------------------------------------------------
    | Filter
    |--------------------------------------------------------------------------
    */

    const filteredProblems = problems;


    return (

        <AdminLayout>

            <div
                className="
                    px-4
                    py-5
                    sm:px-5
                    lg:px-7
                "
            >

                {/* HEADER */}

                <AdminPageHeader
                    title="Daily Problems"
                    description="Manage daily DSA and CP problems."
                    action={() => {
                        setSubmitError("");
                        setSelectedProblem(null);
                        setShowModal(true)
                    }}
                    actionLabel="Add Problem"
                />

                {loadError && (
                    <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {loadError}
                        <button type="button" onClick={fetchProblems} className="ml-3 underline">
                            Retry
                        </button>
                    </div>
                )}

                {submitError && (
                    <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {submitError}
                    </div>
                )}


                {/* FILTER BAR */}

                <div
                    className="
                        mb-4
                        flex
                        items-center
                        justify-between
                        gap-3
                    "
                >

                    <div
                        className="
                            flex
                            gap-1.5
                        "
                    >

                        {[
                            "ALL",
                            "DSA",
                            "CP"
                        ].map(
                            (item) => (

                                <button
                                    key={item}
                                    onClick={() => { setCategory(item); setPage(1); }}
                                    className={`
                                        rounded-lg
                                        border
                                        px-4
                                        py-2
                                        font-mono
                                        text-[9px]
                                        transition

                                        ${
                                            category === item
                                                ? `
                                                    border-[#4AFFC4]/30
                                                    bg-[#4AFFC4]/10
                                                    text-[#4AFFC4]
                                                `
                                                : `
                                                    border-[#1C2734]
                                                    bg-[#080D14]
                                                    text-[#556275]
                                                    hover:text-[#DCE4ED]
                                                `
                                        }
                                    `}
                                >
                                    {item}
                                </button>

                            )
                        )}

                    </div>


                    <div
                        className="
                            hidden
                            items-center
                            gap-2
                            font-mono
                            text-[9px]
                            text-[#556275]
                            sm:flex
                        "
                    >

                        <CalendarDays
                            size={13}
                        />

                        {pagination.total}
                        {" "}
                        problems

                    </div>

                </div>


                {/* TABLE */}

                <div
                    className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#1C2734]
                        bg-[#080D14]
                    "
                >

                    <div
                        className="
                            overflow-x-auto
                        "
                    >

                        <table
                            className="
                                w-full
                                min-w-[800px]
                                text-left
                            "
                        >

                            {/* TABLE HEADER */}

                            <thead>

                                <tr
                                    className="
                                        border-b
                                        border-[#1C2734]
                                        font-mono
                                        text-[8px]
                                        uppercase
                                        tracking-wider
                                        text-[#556275]
                                    "
                                >

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        #
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Problem
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Category
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Difficulty
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Platform
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Date
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                        "
                                    >
                                        Status
                                    </th>

                                    <th
                                        className="
                                            px-4
                                            py-3
                                            text-right
                                        "
                                    >
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            {/* TABLE BODY */}

                            <tbody>

                                {filteredProblems.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="
                                                px-4
                                                py-12
                                                text-center
                                            "
                                        >

                                            <p
                                                className="
                                                    font-mono
                                                    text-[10px]
                                                    text-[#556275]
                                                "
                                            >
                                                {loading ? "Loading problems..." : "No daily problems found."}
                                            </p>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredProblems.map(
                                        (problem, index) => (

                                            <tr
                                                key={
                                                    problem._id
                                                }
                                                className="
                                                    border-b
                                                    border-[#1C2734]/60
                                                    last:border-0
                                                    hover:bg-[#0B1119]
                                                "
                                            >

                                                {/* NUMBER */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                        font-mono
                                                        text-[9px]
                                                        text-[#465364]
                                                    "
                                                >
                                                    {String(
                                                    (page - 1) * PAGE_SIZE + index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </td>


                                                {/* PROBLEM */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                    "
                                                >

                                                    <div>

                                                        <p
                                                            className="
                                                                text-[11px]
                                                                text-[#DCE4ED]
                                                            "
                                                        >
                                                            {
                                                                problem.title
                                                            }
                                                        </p>

                                                        <p
                                                            className="
                                                                mt-0.5
                                                                font-mono
                                                                text-[8px]
                                                                text-[#556275]
                                                            "
                                                        >
                                                            Rating{" "}
                                                            {
                                                                problem.rating ??
                                                                "-"
                                                            }
                                                        </p>

                                                    </div>

                                                </td>


                                                {/* CATEGORY */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            rounded-md
                                                            border
                                                            border-[#1C2734]
                                                            bg-[#0D151F]
                                                            px-2
                                                            py-1
                                                            font-mono
                                                            text-[8px]
                                                            text-[#7F8B9C]
                                                        "
                                                    >
                                                        {
                                                            problem.category
                                                        }
                                                    </span>

                                                </td>


                                                {/* DIFFICULTY */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                        font-mono
                                                        text-[9px]
                                                    "
                                                >

                                                    <span
                                                        className={`
                                                            ${
                                                                problem.difficulty ===
                                                                "Easy"
                                                                    ? "text-[#4AFFC4]"
                                                                    : problem.difficulty ===
                                                                      "Medium"
                                                                    ? "text-yellow-400"
                                                                    : "text-red-400"
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            problem.difficulty
                                                        }
                                                    </span>

                                                </td>


                                                {/* PLATFORM */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                        font-mono
                                                        text-[9px]
                                                        text-[#7F8B9C]
                                                    "
                                                >
                                                    {
                                                        problem.platform
                                                    }
                                                </td>


                                                {/* DATE */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                        font-mono
                                                        text-[9px]
                                                        text-[#7F8B9C]
                                                    "
                                                >
                                                    {
                                                        problem.dailyDate
                                                    }
                                                </td>


                                                {/* STATUS */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                    "
                                                >

                                                    <span
                                                        className={`
                                                            rounded-md
                                                            px-2
                                                            py-1
                                                            font-mono
                                                            text-[8px]

                                                            ${
                                                                problem.isPublished
                                                                    ? `
                                                                        bg-[#4AFFC4]/10
                                                                        text-[#4AFFC4]
                                                                    `
                                                                    : `
                                                                        bg-yellow-400/10
                                                                        text-yellow-400
                                                                    `
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            problem.isPublished
                                                                ? "Published"
                                                                : "Draft"
                                                        }
                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td
                                                    className="
                                                        px-4
                                                        py-3
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            justify-end
                                                            gap-1
                                                        "
                                                    >

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSubmitError("");
                                                                setSelectedProblem(problem);
                                                                setShowModal(true);
                                                            }}
                                                            aria-label={`Edit ${problem.title}`}
                                                            className="
                                                                rounded
                                                                p-1.5
                                                                text-[#556275]
                                                                hover:bg-[#0D151F]
                                                                hover:text-[#4AFFC4]
                                                            "
                                                        >

                                                            <Edit3
                                                                size={13}
                                                            />

                                                        </button>


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(problem)
                                                            }
                                                            aria-label={`Delete ${problem.title}`}
                                                            className="
                                                                rounded
                                                                p-1.5
                                                                text-[#556275]
                                                                hover:bg-red-500/5
                                                                hover:text-red-400
                                                            "
                                                        >

                                                            <Trash2
                                                                size={13}
                                                            />

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-[#1C2734] bg-[#080D14] px-4 py-3 text-sm text-[#7F8B9C]">
                    <span>{pagination.total ? `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, pagination.total)} of ${pagination.total} problems` : "No problems"}</span>
                    <div className="flex items-center gap-2"><button type="button" disabled={loading || page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 disabled:opacity-40">Previous</button><span className="px-1">{page} / {Math.max(1, pagination.totalPages)}</span><button type="button" disabled={loading || page >= pagination.totalPages} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-[#1C2734] px-3 py-2 disabled:opacity-40">Next</button></div>
                </div>

            </div>


            {/* ADD MODAL */}

            <AddDailyProblemModal
                isOpen={
                    showModal
                }
                onClose={() =>
                    {
                        setShowModal(false);
                        setSelectedProblem(null);
                    }
                }
                onSubmit={
                    handleSaveProblem
                }
                initialProblem={selectedProblem}
                isEditing={Boolean(selectedProblem)}
                error={submitError}
                loading={
                    loading
                }
            />

        </AdminLayout>
    );
};


export default DailyProblems;
