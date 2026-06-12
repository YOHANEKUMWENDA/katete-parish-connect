import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { GoldDivider } from "@/components/site/Cross";
import { Building, Globe, GraduationCap, Heart, Smartphone, Landmark } from "lucide-react";

export const Route = createFileRoute("/give")({
  head: () => ({
    meta: [
      { title: "Give — St. Thereza Catholic Church" },
      { name: "description", content: "Support the mission of St. Thereza Catholic Church through tithes and offerings." },
      { property: "og:title", content: "Give to St. Thereza Catholic Church" },
      { property: "og:description", content: "Donate to our building fund, outreach, education and mission work." },
    ],
  }),
  component: Give,
});

function Give() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Stewardship" title="Give & Support" subtitle="Every offering is a seed of grace." />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <GoldDivider />
          <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">A Heart of Generosity</h2>
          <p className="mt-5 text-[var(--muted-foreground)] leading-relaxed">
            Through tithes, offerings and gifts of all sizes, our parish is able to celebrate the
            sacraments, support outreach, maintain our facilities, and form disciples for Christ. Thank
            you for partnering with us in this mission.
          </p>
          <blockquote className="mt-8 italic text-[var(--navy)] font-serif text-xl">
            "Each one must give as he has decided in his heart, not reluctantly or under compulsion, for
            God loves a cheerful giver." — 2 Corinthians 9:7
          </blockquote>
        </div>
      </section>

      <section className="section-pad bg-[var(--cream)]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center"><GoldDivider /><h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Where Your Gift Goes</h2></div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Building, t: "Building Fund", d: "Construction & maintenance of our parish buildings." },
              { icon: Globe, t: "Mission Work", d: "Evangelization across Champhira and beyond." },
              { icon: GraduationCap, t: "Education", d: "Bursaries and support for our schools." },
              { icon: Heart, t: "Outreach", d: "Care for the poor, sick and vulnerable." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-white rounded-xl p-6 text-center shadow-[var(--shadow-soft)]">
                <Icon className="h-8 w-8 mx-auto text-[var(--gold)]" />
                <h3 className="font-serif text-lg text-[var(--navy-deep)] mt-4">{t}</h3>
                <p className="mt-2 text-xs text-[var(--muted-foreground)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-5xl px-4 lg:px-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-[var(--navy)] text-[var(--cream)] p-8 shadow-[var(--shadow-elegant)]">
            <Smartphone className="h-7 w-7 text-[var(--gold)]" />
            <h3 className="font-serif text-2xl mt-3">Mobile Money</h3>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/15 pb-3">
                <span className="text-[var(--cream)]/70">Airtel Money</span>
                <span className="font-mono text-[var(--gold)]">10110507</span>
              </div>
              <div className="flex justify-between border-b border-white/15 pb-3">
                <span className="text-[var(--cream)]/70">TNM Mpamba</span>
                <span className="font-mono text-[var(--gold)]">1515720</span>
              </div>
              <p className="text-[var(--cream)]/70 text-xs pt-2">Account name: St. Thereza Catholic Church</p>
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--cream)] p-8 shadow-[var(--shadow-soft)] border border-[var(--border)]">
            <Landmark className="h-7 w-7 text-[var(--gold)]" />
            <h3 className="font-serif text-2xl text-[var(--navy-deep)] mt-3">Bank Transfer</h3>
            <div className="mt-5 space-y-3 text-sm text-[var(--muted-foreground)]">
              <p><strong className="text-[var(--navy-deep)]">Bank:</strong> National Bank of Malawi</p>
              <p><strong className="text-[var(--navy-deep)]">Account:</strong> St. Thereza Catholic Church</p>
              <p><strong className="text-[var(--navy-deep)]">Account No:</strong> <span className="font-mono">1008755047</span></p>
              <p><strong className="text-[var(--navy-deep)]">Branch:</strong> Mzimba</p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl mt-10 px-4 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            You may also give in person during Sunday Mass collections or at the parish office during office hours.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
