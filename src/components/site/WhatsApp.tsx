import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/265984518884?text=Hello%20Katete%20Catholic%20Church"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-elegant)] hover:scale-110 transition-transform animate-float"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
