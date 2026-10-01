import React from "react";
import { Github, Instagram, Linkedin } from "lucide-react";
import Container from "../ui/Container.jsx";

const Footer = () => (
  <footer className="border-t border-[#1C2734] bg-[#060A10]">
    <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
      <p className="font-mono text-[12px] text-[#556275]">© 2026 CpHub. Built by students, for students.</p>
      <div className="flex items-center gap-4 text-[#556275]">
        <Github size={16} className="cursor-pointer hover:text-[#4AFFC4]" />
        <Instagram size={16} className="cursor-pointer hover:text-[#4AFFC4]" />
        <Linkedin size={16} className="cursor-pointer hover:text-[#4AFFC4]" />
      </div>
    </Container>
  </footer>
);

export default Footer;
