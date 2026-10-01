import React, { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Plus, Sparkles } from "lucide-react";

import AdminLayout
    from "../../components/AdminLayout";

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

            <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
                <header className="relative mb-5 overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.12)] sm:p-7 lg:p-8">
                    <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
                    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-1/4 h-px w-2/3 bg-gradient-to-r from-transparent via-amber-400/35 to-transparent" />
                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div className="min-w-0">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-text-secondary)]"><Sparkles size={14} className="text-amber-500" /> Daily challenge studio</div>
                            <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--theme-text)] sm:text-4xl">Daily Problems</h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)]">Create and curate the daily practice experience for your community across DSA and competitive programming.</p>
                        </div>
                        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-3 sm:min-w-[260px] sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3 px-1"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500"><CalendarDays size={19} /></span><div><p className="text-2xl font-black tabular-nums text-[var(--theme-text)]">{Number(pagination.total || 0).toLocaleString()}</p><p className="text-xs text-[var(--theme-text-muted)]">total challenges</p></div></div>
                            <button type="button" onClick={() => { setSubmitError(""); setSelectedProblem(null); setShowModal(true); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-4 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-105"><Plus size={17} />Add problem<ArrowUpRight size={14} /></button>
                        </div>
                    </div>
                </header>

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
