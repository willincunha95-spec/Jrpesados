"use client"

export function FloatingWhatsApp() {
  const url = "https://wa.me/5511958572567"
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-105 transition-transform"
    >
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="#fff"
        className="relative"
      >
        <path d="M19.11 17.53c-.27-.13-1.57-.77-1.81-.86-.24-.09-.42-.13-.6.13-.18.27-.69.86-.85 1.03-.16.18-.31.2-.58.07-.27-.13-1.14-.42-2.17-1.32-.8-.71-1.34-1.57-1.5-1.84-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.46-.16 0-.34-.02-.53-.02-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.23 0 1.32.95 2.6 1.09 2.78.13.18 1.87 2.85 4.57 3.98.64.28 1.14.45 1.53.58.64.2 1.23.17 1.7.1.52-.08 1.57-.64 1.79-1.25.22-.62.22-1.14.15-1.25-.07-.11-.24-.18-.51-.31z" />
        <path d="M16 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.25.6 4.41 1.73 6.3L3.2 28.8l6.73-1.65A12.746 12.746 0 0 0 16 28.8c7.06 0 12.8-5.74 12.8-12.8S23.06 3.2 16 3.2zm0 23.04c-2.2 0-4.34-.6-6.21-1.73l-.45-.27-3.99.98 1.05-3.89-.29-.47a10.75 10.75 0 1 1 9.89 6.38z" />
      </svg>
    </a>
  )
}
