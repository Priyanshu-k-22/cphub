import React, { useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight, CheckCircle2, GitBranch, Network } from "lucide-react";
import Container from "../../../shared/components/ui/Container.jsx";
import { PrimaryButton, GhostButton } from "../../../shared/components/ui/Buttons.jsx";

const TypedLine = ({ text, delay = 0, speed = 28, className = "", onDone }) => {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    let raf;
    const start = setTimeout(() => {
      const tick = () => {
        i++;
        setShown(text.slice(0, i));
        if (i < text.length) raf = setTimeout(tick, speed);
        else onDone && onDone();
      };
      tick();
    }, delay);
    return () => {
      clearTimeout(start);
      clearTimeout(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span className={className}>{shown}</span>;
};

const HeroTerminal = () => {
  const [stage, setStage] = useState(0);
  return (
    <div className="relative rounded-lg border border-[#1C2734] bg-[#0A1018] shadow-2xl scanline overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-[#1C2734] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B4A]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFC24A]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4AFFC4]/70" />
        <span className="ml-3 font-mono text-[11px] text-[#556275]">cphub_culture.cpp — judge</span>
      </div>
      <div className="px-5 py-6 font-mono text-[13px] leading-7 sm:text-[14px]">
        <div className="text-[#556275]">$ g++ -O2 cphub_culture.cpp -o run</div>
        <div className="text-[#556275]">$ ./run</div>
        <div className="mt-1 text-[#AEB9C7]">
          <TypedLine text="Compiling discipline + curiosity..." delay={300} onDone={() => setStage(1)} />
        </div>
        {stage >= 1 && (
          <div className="text-[#AEB9C7]">
            <TypedLine text="Linking 500+ members across batches..." delay={100} onDone={() => setStage(2)} />
          </div>
        )}
        {stage >= 2 && (
          <div className="text-[#AEB9C7]">
            <TypedLine text="Running weekly contests, DSA sessions..." delay={100} onDone={() => setStage(3)} />
          </div>
        )}
        {stage >= 3 && (
          <div className="mt-3 flex items-center gap-2 text-[#4AFFC4]">
            <CheckCircle2 size={16} strokeWidth={2.5} />
            <span className="font-semibold">Verdict: Accepted</span>
            <span className="cursor-blink text-[#4AFFC4]">▌</span>
          </div>
        )}
      </div>
    </div>
  );
};

const FloatCard = ({ children, style, className = "" }) => (
  <div
    className={`float-card absolute hidden rounded-md border border-[#1C2734] bg-[#0C1420]/90 px-3 py-2 font-mono text-[11px] text-[#7FB3FF] shadow-lg backdrop-blur sm:block ${className}`}
    style={style}
  >
    {children}
  </div>
);

const Hero = () => {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="home" className="relative overflow-hidden border-b border-[#1C2734]">
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <Container className="relative grid grid-cols-1 items-center gap-14 py-20 sm:py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1E5A46] bg-[#0E1D18] px-3 py-1 font-mono text-[11px] text-[#4AFFC4]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4AFFC4]" />
            SEASON 2026 · REGISTRATIONS OPEN
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-[#EDF2F7] sm:text-6xl">
            Think. Code.
            <br />
            <span className="text-[#4AFFC4]">Compete.</span>
          </h1>
          <p className="mt-6 max-w-md font-body text-[16px] leading-relaxed text-[#AEB9C7]">
            Building a stronger competitive programming culture, one problem at a time.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryButton onClick={() => go("join")}>
              Join CpHub <ArrowUpRight size={14} />
            </PrimaryButton>
            <GhostButton onClick={() => go("contests")}>
              Explore Contests <ChevronRight size={14} />
            </GhostButton>
          </div>
          <div className="mt-10 flex items-center gap-6 font-mono text-[12px] text-[#556275]">
            <span>Codeforces</span>
            <span>CodeChef</span>
            <span>AtCoder</span>
            <span>ICPC</span>
          </div>
        </div>

        <div className="relative">
          <FloatCard style={{ top: "-2.5rem", left: "-1rem", "--r": "-4deg" }}>
            <GitBranch size={12} className="mb-1 text-[#4AFFC4]" />
            O(V + E) traversal
          </FloatCard>
          <FloatCard style={{ bottom: "-2rem", right: "-1.5rem", "--r": "3deg" }} className="!text-[#FFC24A]">
            <Network size={12} className="mb-1" />
            build() → 12ms
          </FloatCard>
          <HeroTerminal />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
