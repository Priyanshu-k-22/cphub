import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const styles = {
    error: { icon: AlertCircle, classes: "border-red-500/30 bg-red-500/10 text-red-300" },
    success: { icon: CheckCircle2, classes: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300" },
    info: { icon: Info, classes: "border-[#4AFFC4]/25 bg-[#4AFFC4]/5 text-[#B7FCE5]" },
};

const AdminFeedback = ({ variant = "error", children, onDismiss, className = "" }) => {
    const { icon: Icon, classes } = styles[variant] || styles.error;
    return (
        <div role={variant === "error" ? "alert" : "status"} className={`mb-4 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${classes} ${className}`}>
            <Icon size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            <div className="min-w-0 flex-1 leading-6">{children}</div>
            {onDismiss && <button type="button" onClick={onDismiss} aria-label="Dismiss message" className="shrink-0 rounded-md p-1 opacity-75 transition hover:bg-black/10 hover:opacity-100"><X size={15} /></button>}
        </div>
    );
};

export default AdminFeedback;
