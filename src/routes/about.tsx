import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { GoldDivider } from "@/components/site/Cross";
import { Heart, Eye, Compass } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — St. Thereza Catholic Church" },
      { name: "description", content: "Our history, mission, pastoral team, and connection to the Mzuzu Diocese." },
      { property: "og:title", content: "About St. Thereza Catholic Church" },
      { property: "og:description", content: "Our history, mission, vision, and pastoral team." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Our Story" title="About Our Mission" subtitle="A century of faith in the heart of Mzimba." />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 prose-lg">
          <GoldDivider className="justify-start" />
          <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Our History</h2>
          <p className="mt-5 text-[var(--muted-foreground)] leading-relaxed">
            St. Thereza Catholic Church was established as part of the early evangelizing work of the
            Missionaries of Africa in northern Malawi. From its humble beginnings under a mango tree, the
            parish grew into a vibrant community — building schools, chapels, and a family rooted in
            Christ and the Eucharist.
          </p>
          <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
            Today, as part of the Mzuzu Diocese, St. Thereza serves thousands of faithful across Champhira and
            surrounding villages, continuing the missionary spirit of those who came before us.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[var(--cream)]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 grid gap-6 md:grid-cols-3">
          {[
            { icon: Compass, t: "Our Mission", d: "To proclaim the Gospel of Jesus Christ and form disciples through the sacraments, prayer, and service." },
            { icon: Eye, t: "Our Vision", d: "A united Catholic community where every person experiences God's love and lives it daily." },
            { icon: Heart, t: "Core Values", d: "Faith · Charity · Family · Humility · Service · Reverence for the Eucharist." },
          ].map(({ icon: Icon, t, d }) => (
            <article key={t} className="rounded-xl bg-white p-8 shadow-[var(--shadow-soft)] border border-[var(--border)]">
              <Icon className="h-7 w-7 text-[var(--gold)]" />
              <h3 className="font-serif text-2xl text-[var(--navy-deep)] mt-4">{t}</h3>
              <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="text-center">
            <GoldDivider />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Parish Priest</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-[260px_1fr] gap-8 items-center bg-[var(--cream)] rounded-2xl p-8 shadow-[var(--shadow-soft)]">
            <div className="h-64 w-full md:h-64 md:w-64 rounded-xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-deep)] flex items-center justify-center text-[var(--gold)] font-serif text-7xl shadow-[var(--shadow-elegant)]">
              FR
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Parish Priest</p>
              <h3 className="font-serif text-3xl text-[var(--navy-deep)] mt-1">Rev. Fr. Joseph Banda</h3>
              <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
                Ordained in the Mzuzu Diocese, Fr. Joseph has shepherded the St. Thereza community for the past
                seven years. With a deep love for the Eucharist and pastoral care, he guides the parish in
                faith, education, and outreach.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--cream)]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center">
            <GoldDivider />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Pastoral Leadership</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Sr. Mary Chirwa", "Pastoral Coordinator"],
              ["Dcn. Patrick Soko", "Deacon"],
              ["John Phiri", "Parish Council Chair"],
              ["Grace Mhone", "Liturgy Coordinator"],
            ].map(([n, r]) => (
              <div key={n} className="bg-white rounded-xl p-6 text-center shadow-[var(--shadow-soft)]">
                <div className="mx-auto h-20 w-20 rounded-full bg-[var(--navy)] text-[var(--gold)] flex items-center justify-center font-serif text-2xl">
                  {n.split(" ").map(s => s[0]).join("").slice(0,2)}
                </div>
                <p className="mt-4 font-serif text-lg text-[var(--navy-deep)]">{n}</p>
                <p className="text-xs uppercase tracking-wider text-[var(--gold)] mt-1">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--navy-deep)] text-[var(--cream)] text-center">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <GoldDivider />
          <h2 className="font-serif text-3xl mt-3">Part of the Mzuzu Diocese</h2>
          <p className="mt-4 text-[var(--cream)]/80">
            St. Thereza Catholic Church proudly serves under the spiritual leadership of the Diocese of
            Mzuzu, in communion with the universal Catholic Church.
          </p>
          <a href="#" className="mt-6 inline-flex rounded-full border border-[var(--gold)]/50 px-6 py-3 text-sm text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors">
            Visit Mzuzu Diocese
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
