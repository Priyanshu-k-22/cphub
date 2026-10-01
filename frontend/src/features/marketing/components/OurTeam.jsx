import React from "react";
import { Crown } from "lucide-react";
import Container from "../../../shared/components/ui/Container.jsx";
import SectionLabel from "../../../shared/components/ui/SectionLabel.jsx";
import { LEADERSHIP, TEAM_GROUPS } from "../data/team.js";

const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const PresidentCard = ({ p }) => (
  <div className="flex flex-col items-center gap-4 rounded-lg border border-[#1E5A46]/60 bg-gradient-to-br from-[#0E1D18] to-[#0C1420] p-8 text-center sm:flex-row sm:text-left">
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#0E1D18] font-mono text-2xl font-bold text-[#4AFFC4] ring-2 ring-[#1E5A46]">
      {initials(p.name)}
    </div>
    <div>
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <Crown size={16} className="text-[#FFD84A]" />
        <span className="font-mono text-[11px] uppercase tracking-wide text-[#FFD84A]">{p.role}</span>
      </div>
      <h4 className="mt-1 font-display text-xl font-semibold text-[#EDF2F7]">{p.name}</h4>
      <p className="mt-1 font-mono text-[12px] text-[#4AFFC4]">{p.tag}</p>
      <p className="mt-1 font-body text-[13px] text-[#8B95A7]">{p.year}</p>
    </div>
  </div>
);

const MemberCard = ({ m }) => (
  <div className="flex items-center gap-3 rounded-md border border-[#1C2734] bg-[#0C1420] p-4">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#0E161D] font-mono text-[12px] font-bold text-[#7FB3FF]">
      {initials(m.name)}
    </div>
    <div>
      <h5 className="font-display text-[14px] font-semibold text-[#EDF2F7]">{m.name}</h5>
      <p className="font-mono text-[11px] text-[#4AFFC4]">{m.role}</p>
      <p className="font-body text-[11.5px] text-[#8B95A7]">{m.year}</p>
    </div>
  </div>
);

const OurTeam = () => (
  <section id="team" className="border-b border-[#1C2734] bg-[#060A10]">
    <Container className="py-5 lg:py-5">
      <SectionLabel index={5} total={10} title="Our Team" />

      {LEADERSHIP.map((p) => (
        <PresidentCard key={p.name} p={p} />
      ))}

      <div className="mt-12 space-y-12">
        {TEAM_GROUPS.map((g) => (
          <div key={g.group}>
            <div className="mb-4">
              <h4 className="font-mono text-[13px] text-[#556275]">{`// ${g.group.toLowerCase().replace(/\s+/g, "_")}`}</h4>
              <p className="mt-1 font-body text-[13px] text-[#8B95A7]">{g.desc}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.members.map((m) => (
                <MemberCard key={m.name} m={m} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export default OurTeam;
