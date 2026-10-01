import React from "react";
import { Code2, Flame, Trophy, Users, ArrowUpRight } from "lucide-react";
import Container from "../../../shared/components/ui/Container.jsx";
import SectionLabel from "../../../shared/components/ui/SectionLabel.jsx";

const MISSION = [
  { icon: Code2, title: "Learn", desc: "Build strong foundations in Data Structures and Algorithms from first principles." },
  { icon: Flame, title: "Practice", desc: "Stay sharp through curated problem sets and regular hands-on practice sessions." },
  { icon: Trophy, title: "Compete", desc: "Take part in contests that prepare you for Codeforces, CodeChef, AtCoder and ICPC." },
  { icon: Users, title: "Collaborate", desc: "Learn across batches — juniors and seniors solving problems side by side." },
  { icon: ArrowUpRight, title: "Grow", desc: "Progress from your first 'Hello World' to a rated competitive programmer." },
];

const Mission = () => (
  <section className="border-b border-[#1C2734] bg-[#080D14]">
    <Container className="py-5 lg:py-5">
      <SectionLabel index={1} total={10} title="Mission" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {MISSION.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group rounded-lg border border-[#1C2734] bg-[#0C1420] p-5 transition-colors hover:border-[#4AFFC4]/60"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#0E1D18] text-[#4AFFC4]">
              <Icon size={18} strokeWidth={2.2} />
            </div>
            <h4 className="font-display text-lg font-semibold text-[#EDF2F7]">{title}</h4>
            <p className="mt-2 font-body text-[13.5px] leading-relaxed text-[#8B95A7]">{desc}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export default Mission;
