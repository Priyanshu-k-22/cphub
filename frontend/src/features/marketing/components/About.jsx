import React from "react";
import { CheckCircle2 } from "lucide-react";
import Container from "../../../shared/components/ui/Container.jsx";
import SectionLabel from "../../../shared/components/ui/SectionLabel.jsx";

const PRINCIPLES = [
  "Consistency beats intensity — show up every week.",
  "Teach what you learn; mentoring solidifies it.",
  "Every rating starts at zero — no gatekeeping.",
  "Contests are practice, not a verdict on your worth.",
];

const About = () => (
  <section id="about" className="border-b border-[#1C2734] bg-[#080D14]">
    <Container className="py-5 lg:py-5">
      <SectionLabel index={8} total={10} title="About CpHub" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4 font-body text-[15px] leading-relaxed text-[#AEB9C7]">
          <p>
            CpHub started as a handful of students meeting after class to solve
            Codeforces problems together. What began as a small study group turned into a
            college-wide movement — because the biggest gap in most students' preparation
            wasn't talent, it was community.
          </p>
          <p>
            We noticed juniors struggling to find good starting points, seniors with no outlet to
            mentor, and a college with plenty of coders but no shared culture around competitive
            programming. So we built one: weekly contests, structured DSA tracks, and a space
            where asking "why does this TLE?" is normal.
          </p>
          <p>
            Today CpHub runs regular contests, hosts workshops on everything from segment
            trees to flows, and fields teams for ICPC and inter-college competitions — all
            student-run, for students who want to get better at this together.
          </p>
        </div>
        <div className="rounded-lg border border-[#1C2734] bg-[#0C1420] p-6">
          <h4 className="font-mono text-[13px] text-[#4AFFC4]">// principles.md</h4>
          <ul className="mt-4 space-y-3 font-body text-[13.5px] text-[#AEB9C7]">
            {PRINCIPLES.map((p) => (
              <li key={p} className="flex gap-2.5">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#4AFFC4]" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  </section>
);

export default About;
