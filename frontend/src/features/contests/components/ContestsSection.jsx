import React, { useState } from "react";
import { PlayCircle, ChevronRight } from "lucide-react";
import Container from "../../../shared/components/ui/Container.jsx";
import SectionLabel from "../../../shared/components/ui/SectionLabel.jsx";
import VerdictBadge from "../../../shared/components/ui/VerdictBadge.jsx";
import { PrimaryButton, GhostButton } from "../../../shared/components/ui/Buttons.jsx";
import useCountdown from "../hooks/useCountdown.js";
import CONTESTS from "../data/contests.js";

const Countdown = ({ target }) => {
  const label = useCountdown(target);
  return <span className="font-mono text-2xl font-bold tracking-wider text-[#4AFFC4]">{label}</span>;
};

const ContestCard = ({ c, kind }) => (
  <div className="flex flex-col rounded-lg border border-[#1C2734] bg-[#0C1420] p-5">
    <div className="mb-3 flex items-start justify-between">
      <h4 className="font-display text-lg font-semibold text-[#EDF2F7]">{c.name}</h4>
      <VerdictBadge status={kind === "upcoming" ? "upcoming" : kind === "ongoing" ? "live" : "ended"} />
    </div>
    <div className="grid grid-cols-2 gap-2 font-mono text-[12px] text-[#8B95A7]">
      <span>{c.date}</span>
      <span>{c.duration}</span>
      <span>{c.problems} problems</span>
      <span>{c.participants} participants</span>
    </div>
    <div className="mt-5">
      {kind === "upcoming" && (
        <div className="flex items-center justify-between">
          <Countdown target={c.target} />
          <PrimaryButton className="!px-4 !py-2">Register</PrimaryButton>
        </div>
      )}
      {kind === "ongoing" && (
        <GhostButton className="w-full border-[#FFC24A]/40 text-[#FFC24A] hover:border-[#FFC24A] hover:text-[#FFC24A]">
          <PlayCircle size={14} /> Enter Contest
        </GhostButton>
      )}
      {kind === "past" && (
        <GhostButton className="w-full">
          View Results <ChevronRight size={14} />
        </GhostButton>
      )}
    </div>
  </div>
);

const Contests = () => {
  const [tab, setTab] = useState("upcoming");
  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "ongoing", label: "Ongoing" },
    { id: "past", label: "Past" },
  ];
  return (
    <section id="contests" className="border-b border-[#1C2734] bg-[#060A10]">
      <Container className="py-5 lg:py-5">
        <SectionLabel index={3} total={10} title="Contests" />
        <div className="mb-8 inline-flex rounded-md border border-[#1C2734] p-1 font-mono text-[12.5px]">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded px-4 py-2 transition-colors ${
                tab === t.id ? "bg-[#4AFFC4] text-[#06120D] font-semibold" : "text-[#AEB9C7] hover:text-[#EDF2F7]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONTESTS[tab].map((c) => (
            <ContestCard key={c.name} c={c} kind={tab} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Contests;
