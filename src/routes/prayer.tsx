import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { GoldDivider, CrossIcon } from "@/components/site/Cross";

export const Route = createFileRoute("/prayer")({
  head: () => ({
    meta: [
      { title: "Prayer Corner — St. Thereza Catholic Church" },
      { name: "description", content: "Daily Scripture, prayer requests, and a guide to the Holy Rosary." },
      { property: "og:title", content: "Prayer Corner" },
      { property: "og:description", content: "Daily Scripture and prayer requests." },
    ],
  }),
  component: Prayer,
});

const mysteries = [
  { t: "Joyful", d: "Mondays & Saturdays" },
  { t: "Sorrowful", d: "Tuesdays & Fridays" },
  { t: "Glorious", d: "Wednesdays & Sundays" },
  { t: "Luminous", d: "Thursdays" },
];

function Prayer() {
  return (
    <SiteLayout>
      <PageHero eyebrow="In Communion of Prayer" title="Prayer Corner" subtitle="Lift your heart to the Lord." />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="rounded-2xl bg-[var(--navy)] text-[var(--cream)] p-10 text-center shadow-[var(--shadow-elegant)] relative overflow-hidden">
            <CrossIcon className="h-8 w-8 text-[var(--gold)] mx-auto animate-float" />
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Scripture of the Day</p>
            <blockquote className="mt-4 font-serif text-2xl md:text-3xl leading-snug">
              "The Lord is my shepherd; I shall not want."
            </blockquote>
            <p className="mt-3 text-sm text-[var(--cream)]/70">— Psalm 23:1</p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--cream)]">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="text-center"><GoldDivider /><h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Submit a Prayer Request</h2></div>
          <form
            action="https://formspree.io/f/xykaelrb"
            method="POST"
            className="mt-8 rounded-2xl bg-white p-7 shadow-[var(--shadow-soft)] space-y-4 border border-[var(--border)]"
          >
            <input name="name" placeholder="Your name (or 'Anonymous')" maxLength={80} className="w-full rounded-md bg-[var(--cream)] border border-[var(--border)] px-4 py-3 text-sm" />
            <textarea required name="intention" placeholder="Share your prayer intention…" rows={5} maxLength={500} className="w-full rounded-md bg-[var(--cream)] border border-[var(--border)] px-4 py-3 text-sm" />
            <button type="submit" className="w-full rounded-full bg-[var(--navy)] py-3 text-sm font-semibold text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors">
              Submit Prayer
            </button>
          </form>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="text-center"><GoldDivider /><h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Mysteries of the Holy Rosary</h2></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mysteries.map(m => (
              <div key={m.t} className="rounded-xl bg-[var(--cream)] p-6 text-center border border-[var(--border)]">
                <CrossIcon className="h-6 w-6 text-[var(--gold)] mx-auto" />
                <h3 className="font-serif text-xl text-[var(--navy-deep)] mt-3">{m.t}</h3>
                <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mt-2">{m.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[var(--muted-foreground)]">
            Join us for the Rosary 30 minutes before every weekday Mass.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
