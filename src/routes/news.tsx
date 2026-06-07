import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { GoldDivider } from "@/components/site/Cross";
import { Calendar, MapPin, Clock, Download } from "lucide-react";
import { BlogPostsFeed } from "@/components/BlogPostsFeed";
import { EventRegistration } from "@/components/EventRegistration";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — St. Thereza Catholic Church" },
      { name: "description", content: "Parish news, upcoming events, and bulletin downloads." },
      { property: "og:title", content: "News & Events" },
      { property: "og:description", content: "Stay up to date with St. Thereza parish news and events." },
    ],
  }),
  component: News,
});

const events = [
  { t: "Ash Wednesday Mass", d: "Feb 18, 2026", time: "6:00 AM & 6:00 PM", loc: "Main Church" },
  { t: "Parish Family Day", d: "Mar 09, 2026", time: "10:00 AM", loc: "Parish Grounds" },
  { t: "Easter Vigil", d: "Apr 04, 2026", time: "7:30 PM", loc: "Main Church" },
];

function News() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Life at St. Thereza" title="News & Events" subtitle="Stay connected to our parish community." />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center">
            <GoldDivider />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Latest News</h2>
          </div>
          <div className="mt-10">
            <BlogPostsFeed />
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

      <EventRegistration formId="YOUR_GOOGLE_FORM_ID" />

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
