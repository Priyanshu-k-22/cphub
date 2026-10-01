import React from "react";
import Container from "../../../shared/components/ui/Container.jsx";
import SectionLabel from "../../../shared/components/ui/SectionLabel.jsx";
import { ACHIEVEMENTS, HALL_OF_FAME } from "../data/achievements.js";

const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Achievements = () => (
  <section id="achievements" className="relative overflow-hidden border-b border-[#1C2734] bg-[#080D14]">
    <Container className="py-5 lg:py-5">
      <SectionLabel index={6} total={10} title="Achievements" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map(({ icon: Icon, label, tone }) => (
          <div key={label} className="flex items-center gap-3 rounded-md border border-[#1C2734] bg-[#0C1420] px-4 py-3.5">
            <Icon size={18} className={tone} />
            <span className="font-body text-[13.5px] text-[#EDF2F7]">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h4 className="mb-5 font-mono text-[13px] text-[#556275]">// hall_of_fame — exceptional coders</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {HALL_OF_FAME.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-4 rounded-lg border border-[#1E5A46]/60 bg-gradient-to-br from-[#0E1D18] to-[#0C1420] p-5"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0E1D18] font-mono text-[15px] font-bold text-[#4AFFC4] ring-1 ring-[#1E5A46]">
                {initials(p.name)}
              </div>
              <div>
                <h5 className="font-display text-[15px] font-semibold text-[#EDF2F7]">{p.name}</h5>
                <p className="font-mono text-[11.5px] text-[#4AFFC4]">{p.tag}</p>
                <p className="mt-1 font-body text-[12.5px] text-[#8B95A7]">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default Achievements;
