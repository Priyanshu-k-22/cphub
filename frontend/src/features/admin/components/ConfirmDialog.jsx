import { useEffect } from "react";
import { AlertTriangle, LoaderCircle, X } from "lucide-react";

const ConfirmDialog = ({
    isOpen,
    title = "Confirm action",
    description,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    loading = false,
    onConfirm,
    onClose,
}) => {
    useEffect(() => {
        if (!isOpen) return undefined;
        const onKeyDown = (event) => {
            if (event.key === "Escape" && !loading) onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, loading, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && !loading && onClose()}>
            <section role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-description" className="w-full max-w-md rounded-2xl border border-[#263342] bg-[#0B1119] p-5 shadow-2xl shadow-black/40 sm:p-6">
                <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10 text-red-300"><AlertTriangle size={21} /></span>
                    <div className="min-w-0 flex-1">
                        <h2 id="confirm-dialog-title" className="pr-7 text-base font-semibold text-[#EDF2F7]">{title}</h2>
                        <p id="confirm-dialog-description" className="mt-2 text-sm leading-6 text-[#9AA7B7]">{description}</p>
                    </div>
                    <button type="button" onClick={onClose} disabled={loading} aria-label="Close confirmation" className="-mr-2 -mt-2 rounded-lg p-2 text-[#7F8B9C] transition hover:bg-[#17212D] hover:text-white disabled:opacity-50"><X size={17} /></button>
                </div>
                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button type="button" onClick={onClose} disabled={loading} className="rounded-lg border border-[#2A3746] px-4 py-2.5 text-sm font-medium text-[#C1CBD6] transition hover:bg-[#141D28] disabled:opacity-50">{cancelLabel}</button>
                    <button type="button" onClick={onConfirm} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-wait disabled:opacity-60">{loading && <LoaderCircle size={15} className="animate-spin" />}{loading ? "Working…" : confirmLabel}</button>
                </div>
            </section>
        </div>
    );
};

export default ConfirmDialog;
