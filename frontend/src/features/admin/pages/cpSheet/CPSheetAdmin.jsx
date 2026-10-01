import React, {
    useEffect,
    useState
} from "react";

import AdminLayout
    from "../../components/AdminLayout";

import AdminPageHeader
    from "../../components/AdminPageHeader";

import AddProblemModal
    from "./AddProblemModal";
import RatingFilter from "../../components/RatingFilter";
import CPSheetProblemTable from "./CPSheetProblemTable";

import {
    getCPSheet,
    createCPProblem,
    updateCPProblem,
    deleteCPProblem
} from "../../../cp/api/cpSheet.api";


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


                <RatingFilter ratings={ratings} value={rating} onChange={setRating} />

                {/* TABLE */}

                <CPSheetProblemTable loading={loading} problems={problems} rating={rating} onEdit={(problem) => { setSelectedProblem(problem); setShowModal(true); }} onDelete={handleDeleteProblem} />

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
