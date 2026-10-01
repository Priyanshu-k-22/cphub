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
import AdminFeedback from "../../components/AdminFeedback";
import ConfirmDialog from "../../components/ConfirmDialog";

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
    const [modalError, setModalError] = useState("");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [pendingDelete, setPendingDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);


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
            setModalError("");

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
            setNotice(selectedProblem ? "CP sheet problem updated." : "CP sheet problem added.");


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

            setModalError(message);

        } finally {

            setCreating(false);

        }

    };

    const handleDeleteProblem = async (problem) => {
        try {
            setDeleting(true);
            setError("");
            setNotice("");
            await deleteCPProblem(problem._id);
            setProblems((current) => current.filter((item) => item._id !== problem._id));
            setNotice(`“${problem.title}” was deleted from the CP sheet.`);
        } catch (error) {
            console.error("Failed to delete CP problem:", error);
            setError(error?.response?.data?.message || "Failed to delete problem.");
        } finally {
            setDeleting(false);
            setPendingDelete(null);
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
                        setModalError("");
                        setSelectedProblem(null);
                        setShowModal(true)
                    }}
                    actionLabel="Add Problem"
                />


                <RatingFilter ratings={ratings} value={rating} onChange={setRating} />

                {error && <AdminFeedback onDismiss={() => setError("")}>{error}</AdminFeedback>}
                {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}>{notice}</AdminFeedback>}

                {/* TABLE */}

                <CPSheetProblemTable loading={loading} problems={problems} rating={rating} onEdit={(problem) => { setModalError(""); setSelectedProblem(problem); setShowModal(true); }} onDelete={setPendingDelete} />

            </div>


            {/* ADD PROBLEM MODAL */}

            <AddProblemModal
                isOpen={
                    showModal
                }
                onClose={() =>
                    { setShowModal(false); setModalError(""); }
                }
                onSubmit={
                    handleSaveProblem
                }
                initialProblem={selectedProblem}
                isEditing={Boolean(selectedProblem)}
                error={modalError}
                onErrorDismiss={() => setModalError("")}
                loading={
                    creating
                }
            />

            <ConfirmDialog
                isOpen={Boolean(pendingDelete)}
                title="Delete CP sheet problem?"
                description={pendingDelete ? `Delete “${pendingDelete.title}”? Saved progress for this problem will also be removed.` : "This action cannot be undone."}
                loading={deleting}
                onClose={() => !deleting && setPendingDelete(null)}
                onConfirm={() => pendingDelete && handleDeleteProblem(pendingDelete)}
            />

        </AdminLayout>

    );

};


export default CPSheetAdmin;
