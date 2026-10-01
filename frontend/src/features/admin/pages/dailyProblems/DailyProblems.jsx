import React, { useCallback, useEffect, useState } from "react";

import AdminLayout
    from "../../components/AdminLayout";

import AdminPageHeader
    from "../../components/AdminPageHeader";

import AddDailyProblemModal
    from "./AddDailyProblemModal";
import DailyProblemFilters from "./DailyProblemFilters";
import DailyProblemTable from "./DailyProblemTable";
import AdminPagination from "../../components/AdminPagination";
import AdminFeedback from "../../components/AdminFeedback";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
    createProblem,
    getAdminProblems,
    updateProblem,
    deleteProblem
} from "../../../problems/api/problem.api";


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
    const [actionError, setActionError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [notice, setNotice] = useState("");

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
        try {
            setDeleting(true);
            setActionError("");
            setNotice("");
            await deleteProblem(problem._id);
            if (problems.length === 1 && page > 1) setPage((current) => current - 1);
            else await fetchProblems();
            setNotice(`“${problem.title}” was deleted from daily problems.`);
        } catch (error) {
            console.error("Failed to delete daily problem:", error);
            setActionError(error?.response?.data?.message || "Failed to delete daily problem.");
        } finally {
            setDeleting(false);
            setPendingDelete(null);
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

                {loadError && <AdminFeedback onDismiss={() => setLoadError("")}>{loadError}<button type="button" onClick={fetchProblems} className="ml-3 font-semibold underline">Retry</button></AdminFeedback>}
                {actionError && <AdminFeedback onDismiss={() => setActionError("")}>{actionError}</AdminFeedback>}

                {!showModal && submitError && <AdminFeedback onDismiss={() => setSubmitError("")}>{submitError}</AdminFeedback>}
                {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}>{notice}</AdminFeedback>}


                <DailyProblemFilters value={category} onChange={(value) => { setCategory(value); setPage(1); }} total={pagination.total} />

                {/* TABLE */}

                <DailyProblemTable filteredProblems={filteredProblems} loading={loading} page={page} pageSize={PAGE_SIZE} onEdit={(problem) => { setSubmitError(""); setSelectedProblem(problem); setShowModal(true); }} onDelete={setPendingDelete} />

                <AdminPagination page={page} pageSize={PAGE_SIZE} total={pagination.total} totalPages={pagination.totalPages} loading={loading} onPageChange={setPage} noun="problems" />

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

            <ConfirmDialog
                isOpen={Boolean(pendingDelete)}
                title="Delete daily problem?"
                description={pendingDelete ? `Delete “${pendingDelete.title}” from daily problems? This cannot be undone.` : "This action cannot be undone."}
                loading={deleting}
                onClose={() => !deleting && setPendingDelete(null)}
                onConfirm={() => pendingDelete && handleDelete(pendingDelete)}
            />

        </AdminLayout>
    );
};


export default DailyProblems;
