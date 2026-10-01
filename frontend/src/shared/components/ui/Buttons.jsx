import React from "react";

export const PrimaryButton = ({ children, className = "", ...props }) => (
  <button
    className={`group inline-flex items-center justify-center gap-2 rounded-md bg-[#4AFFC4] px-5 py-3 font-mono text-[13px] font-semibold text-[#06120D] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#4AFFC4,0_10px_30px_-10px_rgba(74,255,196,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4AFFC4] ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const GhostButton = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-md border border-[#2A3341] bg-transparent px-5 py-3 font-mono text-[13px] font-semibold text-[#EDF2F7] transition-colors duration-150 hover:border-[#4AFFC4] hover:text-[#4AFFC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4AFFC4] ${className}`}
    {...props}
  >
    {children}
  </button>
);
