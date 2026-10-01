import React from "react";

// Structural divider that reads like a code comment — encodes real
// section-numbering the way a source file's // markers do.
const SectionLabel = ({ index, total, title, id }) => (
  <div id={id} className="flex items-center gap-3 mb-10 scroll-mt-24">
    <span className="font-mono text-[13px] text-[#4AFFC4]">
      {`// ${index.toString().padStart(2, "0")}/${total.toString().padStart(2, "0")}`}
    </span>
    <span className="h-px flex-1 bg-[#1C2734]" />
    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#EDF2F7] tracking-tight">
      {title}
    </h2>
  </div>
);

export default SectionLabel;
