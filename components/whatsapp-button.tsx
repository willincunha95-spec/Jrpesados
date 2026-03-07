"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5511958572567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white pl-5 pr-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Contato pelo WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-medium hidden sm:inline">Fale conosco</span>
    </a>
  )
}
