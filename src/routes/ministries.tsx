import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Users, Heart, Music, Crown, HandHelping, BookOpen, Sparkles } from "lucide-react";

export const Route = createFileRoute("/ministries")({
  head: () => ({
    meta: [
      { title: "Ministries & Groups — Katete Catholic Church Mission" },
      { name: "description", content: "Youth, CWA, CMA, Choir, Legion of Mary, Outreach and Catechism — find your community at Katete." },
      { property: "og:title", content: "Ministries & Groups" },
      { property: "og:description", content: "Explore the ministries and groups of Katete Catholic Church Mission." },
    ],
  }),
  component: Ministries,
});

const groups = [
  { icon: Sparkles, t: "Youth Ministry (YCS)", d: "Young Christian Students growing in faith, friendship and leadership." },
  { icon: Heart, t: "Catholic Women's Association", d: "A vibrant sisterhood of prayer, service and family support." },
  { icon: Users, t: "Catholic Men's Association", d: "Men united in faith, fatherhood, and parish service." },
  { icon: Music, t: "Choir & Music Ministry", d: "Lifting our hearts to God through traditional and African liturgical song." },
  { icon: Crown, t: "Legion of Mary", d: "A spiritual association devoted to prayer and apostolic works under Our Lady." },
  { icon: HandHelping, t: "Outreach & Social Justice", d: "Caring for the poor, the sick and the marginalized in our community." },
  { icon: BookOpen, t: "Children's Catechism", d: "Sunday School preparing little ones for First Communion and a life of faith." },
];

function Ministries() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Get Involved" title="Ministries & Groups" subtitle="There is a place for you here." />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ icon: Icon, t, d }) => (
            <article key={t} className="rounded-xl bg-[var(--cream)] p-7 shadow-[var(--shadow-soft)] border border-[var(--border)] hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)] transition-all">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--navy)] text-[var(--gold)]">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="font-serif text-2xl text-[var(--navy-deep)] mt-5">{t}</h3>
              <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">{d}</p>
              <button className="mt-5 inline-flex rounded-full bg-[var(--navy)] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors">
                Join Us
              </button>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
