"use client";

import { MessageCircle } from "lucide-react";
import { companyInfo } from "@/data";

export default function FloatingWhatsApp() {
  return (
    <a
      href={companyInfo.socials.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-110 md:bottom-8 md:right-8"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
    </a>
  );
}
