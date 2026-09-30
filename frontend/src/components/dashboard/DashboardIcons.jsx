import React from "react";

const BrandMark = ({ label, className = "", title }) => (
    <span title={title || label} aria-hidden="true" className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xs font-black tracking-tight ${className}`}>
        {label}
    </span>
);

export const CodeforcesMark = ({ className = "" }) => (
    <BrandMark label="CF" className={`border-blue-400/20 bg-blue-500/10 text-blue-400 ${className}`} title="Codeforces" />
);

export const LeetCodeMark = ({ className = "" }) => (
    <BrandMark label="LC" className={`border-orange-400/20 bg-orange-500/10 text-orange-400 ${className}`} title="LeetCode" />
);

export default BrandMark;
