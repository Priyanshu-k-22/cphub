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


                <DailyProblemFilters value={category} onChange={(value) => { setCategory(value); setPage(1); }} total={pagination.total} />

                {/* TABLE */}

                <DailyProblemTable filteredProblems={filteredProblems} loading={loading} page={page} pageSize={PAGE_SIZE} onEdit={(problem) => { setSelectedProblem(problem); setShowModal(true); }} onDelete={handleDeleteProblem} />

                <div className="mt-4 flex items-center justify-between rounded-xl border border-[#1C2734] bg-[#080D14] px-4 py-3 text-sm text-[#7F8B9C]">
                    <span>{pagination.total ? `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, pagination.total)} of ${pagination.total} problems` : "No problems"}</span>
                    <AdminPagination page={page} pageSize={PAGE_SIZE} total={pagination.total} totalPages={pagination.totalPages} loading={loading} onPageChange={setPage} noun="problems" />
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
