import React, { useEffect, useState } from "react";
import Container from "../../../shared/components/ui/Container.jsx";
import useInView from "../../../shared/hooks/useInView.js";

const Counter = ({ target, suffix = "", duration = 1400 }) => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-[#EDF2F7] sm:text-5xl">
      {val}
      {suffix}
    </span>
  );
};

const STATS = [
  { target: 500, suffix: "+", label: "Active members" },
  { target: 30, suffix: "+", label: "Contests hosted" },
  { target: 50, suffix: "+", label: "Events run" },
  { target: 20, suffix: "+", label: "Achievements" },
];

const Stats = () => (
  <section className="border-b border-[#1C2734] bg-[#060A10]">
    <Container className="grid grid-cols-2 gap-8 py-16 sm:grid-cols-4 lg:py-20">
      {STATS.map((s) => (
        <div key={s.label} className="text-center">
          <Counter target={s.target} suffix={s.suffix} />
          <p className="mt-2 font-mono text-[12px] uppercase tracking-wide text-[#8B95A7]">{s.label}</p>
        </div>
      ))}
    </Container>
  </section>
);

export default Stats;
