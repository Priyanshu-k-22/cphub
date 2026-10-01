import React from "react";
import Container from "../../../shared/components/ui/Container.jsx";

const Vision = () => (
  <section className="relative overflow-hidden border-b border-[#1C2734] bg-[#060A10]">
    <div className="grid-bg absolute inset-0 opacity-30" />
    <Container className="relative py-20 text-center lg:py-28">
      <span className="font-mono text-[13px] text-[#4AFFC4]">// vision</span>
      <blockquote className="mx-auto mt-6 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-[#EDF2F7] sm:text-4xl">
        “To build a strong competitive programming culture within our college — an environment
        where students continuously challenge themselves, learn from each other, and compete at
        <span className="text-[#4AFFC4]"> national and international </span>
        levels.”
      </blockquote>
    </Container>
  </section>
);

export default Vision;
