import React from "react";
import { ChevronRight, Code2, Users, Trophy, Cpu } from "lucide-react";
import Container from "../../../shared/components/ui/Container.jsx";
import { GhostButton } from "../../../shared/components/ui/Buttons.jsx";

const ClubIntro = () => {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="border-b border-[#1C2734] bg-[#080D14]">
      <Container className="grid grid-cols-1 gap-10 py-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <div>
          <span className="font-mono text-[13px] text-[#4AFFC4]">// who_we_are</span>
          <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#EDF2F7] sm:text-4xl">
            A community built for people who'd rather debug at midnight than watch Netflix.
          </h3>
          <p className="mt-5 max-w-xl font-body text-[15px] leading-relaxed text-[#AEB9C7]">
            We are a community of students passionate about Competitive Programming, Data
            Structures, Algorithms, and problem solving. CpHub gives you a place to learn,
            practice, compete, collaborate, and grow — alongside people who care about the same
            thing you do.
          </p>
          <GhostButton className="mt-7" onClick={() => go("about")}>
            Learn More <ChevronRight size={14} />
          </GhostButton>
        </div>
        <div className="grid grid-cols-2 gap-4 font-mono text-[12px]">
          {[
            { icon: Code2, label: "Weekly problem sets" },
            { icon: Users, label: "Peer mentorship" },
            { icon: Trophy, label: "Rated contests" },
            { icon: Cpu, label: "DSA deep-dives" },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} className="rounded-md border border-[#1C2734] bg-[#0C1420] p-4">
              <Icon size={18} className="mb-3 text-[#4AFFC4]" />
              <p className="text-[#AEB9C7]">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ClubIntro;
