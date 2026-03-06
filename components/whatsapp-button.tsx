"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5511958572567";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-whatsapp group"
      aria-label="Contato via WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        fill="white"
        className="w-7 h-7 md:w-8 md:h-8"
        aria-hidden="true"
      >
        <path d="M16.003 3.2c-7.067 0-12.8 5.733-12.8 12.8 0 2.267.6 4.467 1.733 6.4l-1.933 7.067 7.267-1.867c1.867 1 3.933 1.533 6.067 1.533 7.067 0 12.8-5.733 12.8-12.8s-5.733-12.8-12.8-12.8zm0 23.467c-2 0-3.933-.533-5.6-1.533l-.4-.267-4.133 1.067 1.067-4-.267-.4c-1.067-1.733-1.6-3.733-1.6-5.733 0-5.867 4.8-10.667 10.667-10.667s10.667 4.8 10.667 10.667-4.8 10.867-10.4 10.867zm5.867-8c-.333-.133-1.867-.933-2.133-1.033-.267-.133-.467-.133-.667.133-.2.267-.8 1.033-.933 1.2-.133.2-.267.2-.6.067-.333-.133-1.333-.467-2.533-1.533-.933-.8-1.6-1.8-1.733-2.133-.133-.333 0-.467.133-.6.133-.133.333-.333.467-.467.133-.133.2-.267.267-.4.067-.133.067-.267 0-.4-.067-.133-.667-1.6-.933-2.2-.267-.533-.467-.467-.667-.467h-.533c-.2 0-.467.067-.733.333-.267.267-.933.933-.933 2.267s.933 2.6 1.067 2.8c.133.2 1.867 2.867 4.533 4 .633.267 1.133.4 1.533.533.633.2 1.2.167 1.667.1.533-.067 1.6-.667 1.833-1.267.2-.6.2-1.133.133-1.267-.067-.133-.267-.2-.6-.333z" />
      </svg>

      <span className="absolute right-full mr-3 bg-foreground text-background text-sm font-medium py-2 px-4 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
        Fale Conosco
      </span>
    </a>
  );
}
