import React, { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Code2, Plus, Sparkles } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import AddProblemModal from "./AddProblemModal";
import RatingFilter from "../../components/RatingFilter";
import CPSheetProblemTable from "./CPSheetProblemTable";
import AdminFeedback from "../../components/AdminFeedback";
import ConfirmDialog from "../../components/ConfirmDialog";
import { getCPSheet, createCPProblem, updateCPProblem, deleteCPProblem } from "../../../cp/api/cpSheet.api";

const ratings = [800, 900, 1000, 1100, 1200];

const CPSheetAdmin = () => {
    const [rating, setRating] = useState(800);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [modalError, setModalError] = useState("");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [pendingDelete, setPendingDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchProblems = useCallback(async () => {
        setLoading(true);
        setError("");
        setProblems([]);
        try {
            const response = await getCPSheet(rating);
            setProblems(response?.data?.problems || []);
        } catch (requestError) {
            console.error("Failed to fetch CP Sheet:", requestError);
            setError(requestError?.response?.data?.message || "Could not load this rating track. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [rating]);

    useEffect(() => { fetchProblems(); }, [fetchProblems]);

    const handleSaveProblem = async (formData) => {
        try {
            setCreating(true);
            setModalError("");
            const payload = { ...formData, rating: Number(formData.rating), order: Number(formData.order) };
            if (selectedProblem) await updateCPProblem(selectedProblem._id, payload);
            else await createCPProblem(payload);

            setShowModal(false);
            setSelectedProblem(null);
            setNotice(selectedProblem ? "CP Sheet problem updated." : "CP Sheet problem added.");
            if (payload.rating !== rating) setRating(payload.rating);
            else await fetchProblems();
        } catch (requestError) {
            console.error("Failed to save CP problem:", requestError);
            setModalError(requestError?.response?.data?.message || "Failed to save problem. Please try again.");
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
            setNotice(`“${problem.title}” was deleted from the CP Sheet.`);
        } catch (requestError) {
            console.error("Failed to delete CP problem:", requestError);
            setError(requestError?.response?.data?.message || "Failed to delete problem.");
        } finally {
            setDeleting(false);
            setPendingDelete(null);
        }
    };

    return <AdminLayout>
        <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
            <header className="relative mb-5 overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.12)] sm:p-7 lg:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-1/4 h-px w-2/3 bg-gradient-to-r from-transparent via-blue-400/35 to-transparent" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-text-secondary)]"><Sparkles size={14} className="text-blue-500" /> Competitive programming studio</div>
                        <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--theme-text)] sm:text-4xl">CP Sheet</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--theme-text-secondary)]">Build a thoughtful Codeforces practice path, organized by rating and ordered for steady progress.</p>
                    </div>
                    <div className="flex flex-col gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-raised)] p-3 sm:min-w-[260px] sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3 px-1"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"><Code2 size={19} /></span><div><p className="text-2xl font-black tabular-nums text-[var(--theme-text)]">{loading ? "…" : problems.length}<span className="ml-1 text-base font-bold text-[var(--theme-text-muted)]">/ 50</span></p><p className="text-xs text-[var(--theme-text-muted)]">in {rating} rating track</p></div></div>
                        <button type="button" onClick={() => { setModalError(""); setSelectedProblem(null); setShowModal(true); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-4 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-105"><Plus size={17} />Add problem<ArrowUpRight size={14} /></button>
                    </div>
                </div>
            </header>

            <RatingFilter ratings={ratings} value={rating} onChange={(nextRating) => { setRating(nextRating); setNotice(""); }} />
            {error && <AdminFeedback onDismiss={() => setError("")}>{error}<button type="button" onClick={fetchProblems} className="ml-3 font-semibold underline">Retry</button></AdminFeedback>}
            {notice && <AdminFeedback variant="success" onDismiss={() => setNotice("")}>{notice}</AdminFeedback>}
            <CPSheetProblemTable loading={loading} problems={problems} rating={rating} onEdit={(problem) => { setModalError(""); setSelectedProblem(problem); setShowModal(true); }} onDelete={setPendingDelete} />
        </div>

        <AddProblemModal isOpen={showModal} onClose={() => { setShowModal(false); setModalError(""); }} onSubmit={handleSaveProblem} initialProblem={selectedProblem} isEditing={Boolean(selectedProblem)} error={modalError} onErrorDismiss={() => setModalError("")} loading={creating} defaultRating={rating} />
        <ConfirmDialog isOpen={Boolean(pendingDelete)} title="Delete CP Sheet problem?" description={pendingDelete ? `Delete “${pendingDelete.title}”? Saved progress for this problem will also be removed.` : "This action cannot be undone."} loading={deleting} onClose={() => !deleting && setPendingDelete(null)} onConfirm={() => pendingDelete && handleDeleteProblem(pendingDelete)} />
    </AdminLayout>;
};

export default CPSheetAdmin;
