import type { ReactNode } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsApp";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Nav />
      <main className="flex-1 animate-fade-in">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative bg-[var(--navy)] text-[var(--cream)] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,var(--gold),transparent_45%),radial-gradient(circle_at_70%_80%,var(--gold),transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 py-20 md:py-28 text-center animate-fade-up">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)] mb-4">{eyebrow}</p>
        )}
        <h1 className="font-serif text-4xl md:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl mx-auto text-[var(--cream)]/80 text-base md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
