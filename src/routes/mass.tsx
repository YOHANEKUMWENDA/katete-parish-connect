import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { GoldDivider } from "@/components/site/Cross";
import { Droplets, Cross, Flame, Heart, Hand, Users, BookOpen } from "lucide-react";

export const Route = createFileRoute("/mass")({
  head: () => ({
    meta: [
      { title: "Mass & Liturgy — Katete Catholic Church Mission" },
      { name: "description", content: "Mass times, sacraments, confession schedule and liturgical calendar at Katete Catholic Church." },
      { property: "og:title", content: "Mass & Liturgy" },
      { property: "og:description", content: "Mass schedule, sacraments, and liturgical seasons." },
    ],
  }),
  component: Mass,
});

const schedule = [
  { day: "Sunday", times: ["7:00 AM — English Mass", "9:30 AM — Chitumbuka Mass", "4:00 PM — Youth Mass"] },
  { day: "Monday", times: ["6:00 AM — Morning Mass"] },
  { day: "Wednesday", times: ["6:00 AM — Morning Mass"] },
  { day: "Friday", times: ["6:00 PM — Evening Mass"] },
  { day: "Saturday", times: ["7:00 AM — Mass", "4:00 – 5:30 PM — Confession", "6:00 PM — Vigil Mass"] },
  { day: "Holy Days", times: ["6:00 AM & 6:00 PM"] },
];

const sacraments = [
  { icon: Droplets, t: "Baptism", d: "Welcoming new members into the Body of Christ. Contact the parish office two months in advance." },
  { icon: Cross, t: "Eucharist", d: "The source and summit of our faith. Celebrated at every Mass." },
  { icon: Flame, t: "Confirmation", d: "Sealing of the Holy Spirit. Annual preparation begins in February." },
  { icon: Heart, t: "Marriage", d: "Couples should contact the parish at least six months before the wedding date." },
  { icon: Hand, t: "Anointing of the Sick", d: "Available on request — call the parish office anytime." },
  { icon: Users, t: "Holy Orders", d: "Pray for vocations. Speak with the parish priest if you feel called." },
  { icon: BookOpen, t: "Reconciliation", d: "Saturdays 4:00 – 5:30 PM or by appointment." },
];

const seasons = [
  { s: "Advent", d: "A season of joyful preparation for the coming of Christ." },
  { s: "Christmas", d: "Celebrating the Incarnation — special Masses on Dec 24 & 25." },
  { s: "Lent", d: "40 days of prayer, fasting, and almsgiving. Stations of the Cross every Friday." },
  { s: "Easter Triduum", d: "Holy Thursday, Good Friday, and Easter Vigil — the heart of our liturgical year." },
  { s: "Ordinary Time", d: "Growth in discipleship through Scripture and the sacraments." },
];

function Mass() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Liturgy" title="Mass & Liturgy" subtitle="Come and worship — the Lord is here." />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="text-center">
            <GoldDivider />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Weekly Mass Schedule</h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow-soft)]">
            <table className="w-full text-left">
              <thead className="bg-[var(--navy)] text-[var(--cream)]">
                <tr>
                  <th className="px-6 py-4 font-serif">Day</th>
                  <th className="px-6 py-4 font-serif">Mass Times</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] bg-white">
                {schedule.map(({ day, times }) => (
                  <tr key={day} className="hover:bg-[var(--cream)] transition-colors">
                    <td className="px-6 py-5 font-semibold text-[var(--navy-deep)] align-top">{day}</td>
                    <td className="px-6 py-5 text-[var(--muted-foreground)]">
                      <ul className="space-y-1">{times.map(t => <li key={t}>{t}</li>)}</ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--cream)]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center">
            <GoldDivider />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">The Seven Sacraments</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sacraments.map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-transform border border-transparent hover:border-[var(--gold)]/30">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navy)] text-[var(--gold)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-xl text-[var(--navy-deep)] mt-4">{t}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="text-center">
            <GoldDivider />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Liturgical Calendar</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {seasons.map(({ s, d }) => (
              <div key={s} className="flex gap-4 rounded-xl bg-[var(--cream)] p-5 border-l-4 border-[var(--gold)]">
                <div>
                  <h3 className="font-serif text-xl text-[var(--navy-deep)]">{s}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
