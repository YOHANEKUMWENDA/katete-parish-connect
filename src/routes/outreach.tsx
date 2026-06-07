import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { GoldDivider } from "@/components/site/Cross";
import { GraduationCap, Stethoscope, Utensils, Baby, Handshake } from "lucide-react";

export const Route = createFileRoute("/outreach")({
  head: () => ({
    meta: [
      { title: "Education & Outreach — Katete Catholic Church Mission" },
      { name: "description", content: "Schools, community outreach and partnerships of Katete Catholic Church." },
      { property: "og:title", content: "Education & Outreach" },
      { property: "og:description", content: "Our schools, outreach programs and Catholic partnerships." },
    ],
  }),
  component: Outreach,
});

const schools = [
  { n: "Katete Primary School", d: "A Catholic-affiliated primary school serving over 800 pupils from surrounding villages." },
  { n: "St. Joseph Secondary School", d: "Forming young Christian leaders through academics, faith and service." },
  { n: "Champhira Nursery", d: "Early childhood education rooted in love and prayer." },
];

const programs = [
  { icon: Utensils, t: "Feeding Programme", d: "Hot meals served weekly to vulnerable children and elders." },
  { icon: Stethoscope, t: "Community Health", d: "Mobile health clinics in partnership with the diocesan health office." },
  { icon: Baby, t: "Orphan & Vulnerable Care", d: "Sponsorship, counselling and material support for orphans." },
  { icon: GraduationCap, t: "Bursary Programme", d: "School fees support for children from low-income families." },
  { icon: Handshake, t: "Skills Training", d: "Tailoring, carpentry and small-business workshops for youth." },
];

function Outreach() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Serving Our Neighbors" title="Education & Outreach" subtitle="Faith expressed through love in action." />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center">
            <GoldDivider />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Our Schools</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {schools.map(s => (
              <article key={s.n} className="rounded-xl bg-[var(--cream)] p-7 shadow-[var(--shadow-soft)] border-t-4 border-[var(--gold)]">
                <GraduationCap className="h-7 w-7 text-[var(--gold)]" />
                <h3 className="font-serif text-xl text-[var(--navy-deep)] mt-4">{s.n}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--cream)]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center">
            <GoldDivider />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Community Outreach</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-white rounded-xl p-6 shadow-[var(--shadow-soft)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navy)] text-[var(--gold)]"><Icon className="h-5 w-5" /></span>
                <h3 className="font-serif text-xl text-[var(--navy-deep)] mt-4">{t}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--navy-deep)] text-[var(--cream)] text-center">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <GoldDivider />
          <h2 className="font-serif text-3xl mt-3">Our Partners</h2>
          <p className="mt-4 text-[var(--cream)]/80">
            In partnership with the Mzuzu Diocese, Caritas Malawi, the Catholic Health Commission and local
            communities, we serve the people of God across Champhira and Mzimba.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
