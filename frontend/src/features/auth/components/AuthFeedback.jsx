const AuthFeedback = ({ variant = "error", children }) => {
    const success = variant === "success";
    return (
        <div role={success ? "status" : "alert"} className={`mb-5 rounded-md border px-4 py-3 ${success ? "border-[#4AFFC4]/20 bg-[#4AFFC4]/5" : "border-red-500/20 bg-red-500/5"}`}>
            <p className={`font-mono text-xs leading-5 ${success ? "text-[#4AFFC4]" : "text-red-400"}`}>
                {children}
            </p>
        </div>
    );
};

export default AuthFeedback;
