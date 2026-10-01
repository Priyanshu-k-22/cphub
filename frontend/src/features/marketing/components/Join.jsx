import React from "react";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import Container from "../../../shared/components/ui/Container.jsx";
import SectionLabel from "../../../shared/components/ui/SectionLabel.jsx";
import { PrimaryButton, GhostButton } from "../../../shared/components/ui/Buttons.jsx";

const JOIN_STEPS = [
  { title: "Fill the form", desc: "Tell us your year, branch, and current comfort level with DSA — no experience required." },
  { title: "Join the Discord", desc: "You'll get an invite to our server where problem sets, sessions, and announcements happen." },
  { title: "Show up Saturday", desc: "Attend your first practice session and get paired with a mentor from your track." },
];

const Join = () => (
  <section id="join" className="relative overflow-hidden border-b border-[#1C2734] bg-[#060A10]">
    <div className="grid-bg absolute inset-0 opacity-30" />
    <Container className="relative py-5 lg:py-5">
      <SectionLabel index={9} total={10} title="Join Us" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="max-w-md font-body text-[15px] leading-relaxed text-[#AEB9C7]">
            No prior rating, no prerequisites — just curiosity. Here's what happens after you
            sign up.
          </p>
          <div className="mt-8 space-y-5">
            {JOIN_STEPS.map((s, i) => (
              <div key={s.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#1E5A46] bg-[#0E1D18] font-mono text-[12px] font-semibold text-[#4AFFC4]">
                  {i + 1}
                </span>
                <div>
                  <h5 className="font-display text-[15px] font-semibold text-[#EDF2F7]">{s.title}</h5>
                  <p className="mt-1 font-body text-[13px] text-[#8B95A7]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#1C2734] bg-[#0C1420] p-7">
          <h4 className="font-display text-xl font-semibold text-[#EDF2F7]">Ready to submit?</h4>
          <p className="mt-2 font-body text-[13.5px] text-[#8B95A7]">
            Applications for the 2026 cohort are open. Takes under two minutes.
          </p>
          <div className="mt-6 space-y-3">
            <PrimaryButton className="w-full">
              Join CpHub <ArrowUpRight size={14} />
            </PrimaryButton>
            <GhostButton className="w-full">
              <MessageSquare size={14} /> Join our Discord
            </GhostButton>
          </div>
          <p className="mt-5 font-mono text-[11px] text-[#556275]">Open to all years and branches · No fee</p>
        </div>
      </div>
    </Container>
  </section>
);

export default Join;
