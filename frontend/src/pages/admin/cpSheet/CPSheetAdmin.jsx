import React, {
    useEffect,
    useState
} from "react";

import {
    Edit3,
    Trash2
} from "lucide-react";

import AdminLayout
    from "../components/AdminLayout";

import AdminPageHeader
    from "../components/AdminPageHeader";

import AddProblemModal
    from "./AddProblemModal";

import {
    getCPSheet,
    createCPProblem,
    updateCPProblem,
    deleteCPProblem
} from "../../../api/cpSheet.api";


const ratings = [
    800,
    900,
    1000,
    1100,
    1200
];


const CPSheetAdmin = () => {

    const [rating, setRating] =
        useState(800);

    const [problems, setProblems] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [showModal, setShowModal] =
        useState(false);

    const [creating, setCreating] =
        useState(false);

    const [selectedProblem, setSelectedProblem] =
        useState(null);


    /*
    |--------------------------------------------------------------------------
    | Fetch Problems
    |--------------------------------------------------------------------------
    */

    const fetchProblems = async () => {

        try {

            setLoading(true);

            const response =
                await getCPSheet(rating);

            /*
             * Backend returns:
             *
             * {
             *   data: {
             *      rating,
             *      problems,
             *      progress
             *   }
             * }
             */

            setProblems(
                response?.data?.problems || []
            );

        } catch (error) {

            console.error(
                "Failed to fetch CP Sheet:",
                error
            );

            setProblems([]);

        } finally {

            setLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Fetch when rating changes
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        fetchProblems();

    }, [rating]);


    /*
    |--------------------------------------------------------------------------
    | Add Problem
    |--------------------------------------------------------------------------
    */

    const handleSaveProblem = async (
        formData
    ) => {

        try {

            setCreating(true);

            /*
             * formData:
             *
             * {
             *   title,
             *   codeforcesId,
             *   rating,
             *   order,
             *   hint
             * }
             */

            const payload = {
                ...formData,
                rating: Number(formData.rating),
                order: Number(formData.order)
            };

            if (selectedProblem) {
                await updateCPProblem(selectedProblem._id, payload);
            } else {
                await createCPProblem(payload);
            }


            /*
             * Close modal
             */

            setShowModal(false);
            setSelectedProblem(null);


            /*
             * Reload current rating
             */

            await fetchProblems();

        } catch (error) {

            console.error(
                "Failed to save CP problem:",
                error
            );

            /*
             * Show backend error if available
             */

            const message =
                error?.response?.data?.message ||
                "Failed to save problem";

            alert(message);

        } finally {

            setCreating(false);

        }

    };

    const handleDeleteProblem = async (problem) => {
        const confirmed = window.confirm(
            `Delete "${problem.title}" from the CP sheet? Its saved progress will also be removed.`
        );
        if (!confirmed) return;

        try {
            await deleteCPProblem(problem._id);
            setProblems((current) => current.filter((item) => item._id !== problem._id));
        } catch (error) {
            console.error("Failed to delete CP problem:", error);
            alert(error?.response?.data?.message || "Failed to delete problem");
        }
    };


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
                    title="CP Sheet"
                    description="Manage Codeforces problems across every rating."
                    action={() => {
                        setSelectedProblem(null);
                        setShowModal(true)
                    }}
                    actionLabel="Add Problem"
                />


                {/* RATINGS */}

                <div
                    className="
                        mb-4
                        flex
                        gap-1.5
                        overflow-x-auto
                        pb-1
                    "
                >

                    {ratings.map(
                        (item) => (

                            <button
                                key={item}
                                onClick={() =>
                                    setRating(item)
                                }
                                className={`
                                    shrink-0
                                    rounded-lg
                                    border
                                    px-4
                                    py-2
                                    font-mono
                                    text-[9px]
                                    transition

                                    ${
                                        rating === item
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

                    {/* TABLE HEADER */}

                    <div
                        className="
                            border-b
                            border-[#1C2734]
                            px-4
                            py-3
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div>

                                <p
                                    className="
                                        font-mono
                                        text-[9px]
                                        uppercase
                                        text-[#4AFFC4]
                                    "
                                >

                                    Rating {rating}

                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-[10px]
                                        text-[#556275]
                                    "
                                >

                                    50 problems maximum

                                </p>

                            </div>


                            <span
                                className="
                                    font-mono
                                    text-[9px]
                                    text-[#556275]
                                "
                            >

                                {problems.length} / 50

                            </span>

                        </div>

                    </div>


                    {/* LOADING */}

                    {loading ? (

                        <div
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

                                Loading problems...

                            </p>

                        </div>

                    ) : (

                        <div
                            className="
                                overflow-x-auto
                            "
                        >

                            <table
                                className="
                                    w-full
                                    min-w-[650px]
                                    text-left
                                "
                            >

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

                                        <th className="px-4 py-3">
                                            #
                                        </th>

                                        <th className="px-4 py-3">
                                            Problem
                                        </th>

                                        <th className="px-4 py-3">
                                            Codeforces ID
                                        </th>

                                        <th className="px-4 py-3">
                                            Rating
                                        </th>

                                        <th className="px-4 py-3">
                                            Hint
                                        </th>

                                        <th className="px-4 py-3 text-right">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {problems.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="6"
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

                                                    No problems found
                                                    for rating {rating}.

                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        problems.map(
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

                                                    {/* ORDER */}

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
                                                            problem.order ||
                                                            index + 1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}

                                                    </td>


                                                    {/* TITLE */}

                                                    <td
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-[11px]
                                                            text-[#DCE4ED]
                                                        "
                                                    >

                                                        {
                                                            problem.title
                                                        }

                                                    </td>


                                                    {/* CODEFORCES ID */}

                                                    <td
                                                        className="
                                                            px-4
                                                            py-3
                                                            font-mono
                                                            text-[10px]
                                                            text-[#4AFFC4]
                                                        "
                                                    >

                                                        {
                                                            problem.codeforcesId
                                                        }

                                                    </td>


                                                    {/* RATING */}

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
                                                            problem.rating
                                                        }

                                                    </td>


                                                    {/* HINT */}

                                                    <td
                                                        className="
                                                            max-w-[220px]
                                                            px-4
                                                            py-3
                                                            text-[9px]
                                                            text-[#7F8B9C]
                                                        "
                                                    >

                                                        {problem.hint
                                                            ? (
                                                                <span
                                                                    title={
                                                                        problem.hint
                                                                    }
                                                                >
                                                                    {
                                                                        problem.hint
                                                                    }
                                                                </span>
                                                            )
                                                            : (
                                                                <span
                                                                    className="
                                                                        text-[#465364]
                                                                    "
                                                                >
                                                                    —
                                                                </span>
                                                            )
                                                        }

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
                                                                onClick={() => handleDeleteProblem(problem)}
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

                    )}

                </div>

            </div>


            {/* ADD PROBLEM MODAL */}

            <AddProblemModal
                isOpen={
                    showModal
                }
                onClose={() =>
                    setShowModal(false)
                }
                onSubmit={
                    handleSaveProblem
                }
                initialProblem={selectedProblem}
                isEditing={Boolean(selectedProblem)}
                loading={
                    creating
                }
            />

        </AdminLayout>

    );

};


export default CPSheetAdmin;
