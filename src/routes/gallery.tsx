import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { X } from "lucide-react";
import congregationImg from "@/assets/congregation.jpg";
import heroImg from "@/assets/church-hero.jpg";
import bibleImg from "@/assets/bible-rosary.jpg";
import stainedGlass from "@/assets/stained-glass.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — St. Thereza Catholic Church" },
      { name: "description", content: "Photos from parish life, liturgy, youth events and community outreach." },
      { property: "og:title", content: "Gallery" },
      { property: "og:description", content: "Glimpses of life at St. Thereza Catholic Church." },
    ],
  }),
  component: Gallery,
});

const items = [
  { src: heroImg, cat: "Parish Life", h: "tall" },
  { src: congregationImg, cat: "Liturgy", h: "short" },
  { src: bibleImg, cat: "Liturgy", h: "med" },
  { src: stainedGlass, cat: "Special Occasions", h: "tall" },
  { src: congregationImg, cat: "Youth Events", h: "med" },
  { src: heroImg, cat: "Community Outreach", h: "short" },
  { src: bibleImg, cat: "Parish Life", h: "tall" },
  { src: stainedGlass, cat: "Liturgy", h: "med" },
  { src: congregationImg, cat: "Community Outreach", h: "short" },
];

const cats = ["All", "Parish Life", "Liturgy", "Youth Events", "Community Outreach", "Special Occasions"];

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = items.filter(i => filter === "All" || i.cat === filter);

  return (
    <SiteLayout>
      <PageHero eyebrow="Moments of Grace" title="Gallery" subtitle="A visual journey through parish life." />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors ${
                  filter === c ? "bg-[var(--navy)] text-[var(--cream)]" : "bg-[var(--cream)] text-[var(--navy)] hover:bg-[var(--gold)] hover:text-[var(--navy-deep)]"
                }`}
              >{c}</button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((i, idx) => (
              <button
                key={idx}
                onClick={() => setLightbox(i.src)}
                className="block w-full break-inside-avoid overflow-hidden rounded-xl shadow-[var(--shadow-soft)] group relative"
                style={{ aspectRatio: i.h === "tall" ? "3/4" : i.h === "short" ? "4/3" : "1/1" }}
              >
                <img src={i.src} alt={i.cat} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-wider bg-[var(--navy)]/85 text-[var(--gold)] px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {i.cat}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-[var(--navy-deep)]/95 flex items-center justify-center p-4 animate-fade-in cursor-zoom-out">
          <button className="absolute top-5 right-5 text-[var(--cream)] hover:text-[var(--gold)]" aria-label="Close">
            <X className="h-8 w-8" />
          </button>
          <img src={lightbox} alt="" className="max-h-[90vh] max-w-full rounded-lg shadow-[var(--shadow-elegant)]" />
        </div>
      )}
    </SiteLayout>
  );
}
