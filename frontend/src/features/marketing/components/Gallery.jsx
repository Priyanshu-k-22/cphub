import React, { useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import Container from "../../../shared/components/ui/Container.jsx";
import SectionLabel from "../../../shared/components/ui/SectionLabel.jsx";
import GALLERY from "../data/gallery.js";

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const cats = ["All", "Contests", "Workshops", "Events"];
  const items = filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  return (
    <section id="gallery" className="border-b border-[#1C2734] bg-[#060A10]">
      <Container className="py-5 lg:py-5">
        <SectionLabel index={7} total={10} title="Gallery" />
        <div className="mb-6 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[11.5px] transition-colors ${
                filter === c ? "border-[#4AFFC4] bg-[#0E1D18] text-[#4AFFC4]" : "border-[#2A3341] text-[#8B95A7] hover:text-[#EDF2F7]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-4 [column-fill:_balance]">
          {items.map((g) => (
            <button
              key={g.id}
              onClick={() => setActive(g)}
              className={`group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg border border-[#1C2734] bg-gradient-to-br ${g.tone} ${g.h} text-left`}
            >
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div>
                  <p className="font-display text-[14px] font-semibold text-white">{g.title}</p>
                  <p className="font-mono text-[10.5px] text-[#AEB9C7]">{g.category}</p>
                </div>
              </div>
              <ImageIcon size={20} className="absolute right-3 top-3 text-white/30" />
            </button>
          ))}
        </div>
      </Container>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className={`relative w-full max-w-2xl overflow-hidden rounded-lg border border-[#1C2734] bg-gradient-to-br ${active.tone} p-10`}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setActive(null)} className="absolute right-4 top-4 text-white/70 hover:text-white">
              <X size={20} />
            </button>
            <ImageIcon size={40} className="text-white/30" />
            <h4 className="mt-6 font-display text-2xl font-semibold text-white">{active.title}</h4>
            <p className="mt-1 font-mono text-[12px] text-[#AEB9C7]">{active.category}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
