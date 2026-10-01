import React from "react";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import Container from "../../../shared/components/ui/Container.jsx";
import SectionLabel from "../../../shared/components/ui/SectionLabel.jsx";
import VerdictBadge from "../../../shared/components/ui/VerdictBadge.jsx";
import { GhostButton } from "../../../shared/components/ui/Buttons.jsx";
import EVENTS from "../data/events.js";

const EventCard = ({ e }) => (
  <div className="flex h-full flex-col rounded-lg border border-[#1C2734] bg-[#0C1420] p-5 transition-colors hover:border-[#4AFFC4]/50">
    <div className="mb-3 flex items-start justify-between gap-2">
      <span className="rounded border border-[#2A3341] px-2 py-0.5 font-mono text-[10.5px] text-[#7FB3FF]">{e.type}</span>
      <VerdictBadge status={e.status} />
    </div>
    <h4 className="font-display text-lg font-semibold text-[#EDF2F7]">{e.name}</h4>
    <p className="mt-2 flex-1 font-body text-[13.5px] leading-relaxed text-[#8B95A7]">{e.desc}</p>
    <div className="mt-4 space-y-1.5 font-mono text-[12px] text-[#AEB9C7]">
      <div className="flex items-center gap-2">
        <Calendar size={13} className="text-[#4AFFC4]" /> {e.date} · {e.time}
      </div>
      <div className="flex items-center gap-2">
        <MapPin size={13} className="text-[#4AFFC4]" /> {e.location}
      </div>
    </div>
    <button
      disabled={e.status === "closed"}
      className={`mt-5 w-full rounded-md py-2.5 font-mono text-[12.5px] font-semibold transition-colors ${
        e.status === "closed"
          ? "cursor-not-allowed border border-[#2A3341] text-[#556275]"
          : "bg-[#4AFFC4] text-[#06120D] hover:brightness-95"
      }`}
    >
      {e.status === "closed" ? "Registrations Closed" : "Register Now"}
    </button>
  </div>
);

const Events = () => (
  <section id="events" className="border-b border-[#1C2734] bg-[#080D14]">
    <Container className="py-5 lg:py-5">
      <SectionLabel index={2} total={10} title="Upcoming Events" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {EVENTS.map((e) => (
          <EventCard key={e.name} e={e} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <GhostButton>
          View All Events <ChevronRight size={14} />
        </GhostButton>
      </div>
    </Container>
  </section>
);

export default Events;
