import React from "react";
import { CheckCircle2, XCircle, Flame, Clock } from "lucide-react";

const STATUS_MAP = {
  open: { label: "OPEN", cls: "text-[#4AFFC4] border-[#1E5A46] bg-[#0E1D18]", icon: CheckCircle2 },
  closed: { label: "CLOSED", cls: "text-[#FF6B4A] border-[#5A2A1E] bg-[#1D120E]", icon: XCircle },
  live: { label: "LIVE", cls: "text-[#FFC24A] border-[#5A461E] bg-[#1D170E]", icon: Flame },
  upcoming: { label: "UPCOMING", cls: "text-[#7FB3FF] border-[#1E3A5A] bg-[#0E161D]", icon: Clock },
  ended: { label: "ENDED", cls: "text-[#8B95A7] border-[#2A3341] bg-[#131A22]", icon: CheckCircle2 },
};

const VerdictBadge = ({ status }) => {
  const m = STATUS_MAP[status] || STATUS_MAP.open;
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-wide ${m.cls}`}>
      <Icon size={12} strokeWidth={2.5} />
      {m.label}
    </span>
  );
};

export default VerdictBadge;
