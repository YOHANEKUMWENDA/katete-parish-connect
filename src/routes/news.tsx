import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { GoldDivider } from "@/components/site/Cross";
import { Calendar, MapPin, Clock, Download } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — Katete Catholic Church Mission" },
      { name: "description", content: "Parish news, upcoming events, and bulletin downloads." },
      { property: "og:title", content: "News & Events" },
      { property: "og:description", content: "Stay up to date with Katete parish news and events." },
    ],
  }),
  component: News,
});

const posts = [
  { cat: "Announcement", t: "Confirmation Class 2026 Registration Opens", d: "Feb 12, 2026", e: "Register your candidates for this year's Confirmation preparation programme." },
  { cat: "Mission", t: "Outreach to Mthonsi Village", d: "Feb 04, 2026", e: "Our parish team distributed food and prayed with families affected by recent floods." },
  { cat: "Youth", t: "YCS Annual Retreat Recap", d: "Jan 21, 2026", e: "Over 200 young people gathered for three days of prayer, song and fellowship." },
  { cat: "Liturgy", t: "Lenten Schedule Released", d: "Jan 10, 2026", e: "Find Stations of the Cross times and Lenten reflection topics inside." },
];

const events = [
  { t: "Ash Wednesday Mass", d: "Feb 18, 2026", time: "6:00 AM & 6:00 PM", loc: "Main Church" },
  { t: "Parish Family Day", d: "Mar 09, 2026", time: "10:00 AM", loc: "Parish Grounds" },
  { t: "Easter Vigil", d: "Apr 04, 2026", time: "7:30 PM", loc: "Main Church" },
];

function News() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Life at Katete" title="News & Events" subtitle="Stay connected to our parish community." />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center">
            <GoldDivider />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Latest News</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.map(p => (
              <article key={p.t} className="rounded-xl bg-[var(--cream)] p-7 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-[var(--navy)] text-[var(--gold)] px-3 py-1 uppercase tracking-wider">{p.cat}</span>
                  <span className="text-[var(--muted-foreground)]">{p.d}</span>
                </div>
                <h3 className="font-serif text-2xl text-[var(--navy-deep)] mt-4">{p.t}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{p.e}</p>
                <a href="#" className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">Read more →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--cream)]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center">
            <GoldDivider />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Upcoming Events</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {events.map(e => (
              <div key={e.t} className="rounded-xl bg-white p-6 border-t-4 border-[var(--gold)] shadow-[var(--shadow-soft)]">
                <Calendar className="h-6 w-6 text-[var(--gold)]" />
                <h3 className="font-serif text-xl text-[var(--navy-deep)] mt-3">{e.t}</h3>
                <div className="mt-3 space-y-1 text-sm text-[var(--muted-foreground)]">
                  <p className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {e.d}</p>
                  <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {e.time}</p>
                  <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {e.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <GoldDivider />
          <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Parish Bulletin</h2>
          <p className="mt-3 text-[var(--muted-foreground)]">Download this week's bulletin for readings, prayer intentions and announcements.</p>
          <a href="#" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-semibold text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors">
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
