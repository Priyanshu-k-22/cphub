import React from "react";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import Container from "../../../shared/components/ui/Container.jsx";
import SectionLabel from "../../../shared/components/ui/SectionLabel.jsx";

const CONTACT_ITEMS = [
  { icon: Mail, label: "Email", value: "cphubcuj@gmail.com" },
  { icon: MessageSquare, label: "Discord", value: "discord.gg/cpdsa-club" },
];

const Contact = () => (
  <section id="contact" className="bg-[#080D14]">
    <Container className="py-5 lg:py-5">
      <SectionLabel index={10} total={10} title="Contact" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {CONTACT_ITEMS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-lg border border-[#1C2734] bg-[#0C1420] p-5">
            <Icon size={18} className="mb-3 text-[#4AFFC4]" />
            <p className="font-mono text-[11px] uppercase tracking-wide text-[#556275]">{label}</p>
            <p className="mt-1 font-body text-[14px] text-[#EDF2F7]">{value}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export default Contact;
