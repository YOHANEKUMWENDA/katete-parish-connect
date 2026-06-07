import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { GoldDivider, CrossIcon } from "@/components/site/Cross";
import { Calendar, Clock, Mail, Users, Heart, BookOpen, GraduationCap } from "lucide-react";
import heroImg from "@/assets/church-hero.jpg";
import congregationImg from "@/assets/congregation.jpg";
import bibleImg from "@/assets/bible-rosary.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Katete Catholic Church Mission — Mzuzu Diocese, Malawi" },
      { name: "description", content: "Welcome to Katete Catholic Church Mission in Champhira, Mzimba. Join us for Mass, sacraments, ministries and community life." },
      { property: "og:title", content: "Katete Catholic Church Mission" },
      { property: "og:description", content: "A welcoming parish of the Mzuzu Diocese in Champhira, Mzimba." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center justify-center text-center text-[var(--cream)] overflow-hidden">
        <img src={heroImg} alt="Katete Catholic Church at sunset" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)]/85 via-[var(--navy-deep)]/55 to-[var(--navy-deep)]/90" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 animate-fade-up">
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--gold)] mb-5">✦ Mzuzu Diocese · Malawi ✦</p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-tight">
            Welcome to Katete<br/>Catholic Church Mission
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--cream)]/85 max-w-2xl mx-auto">
            A faith-filled community in Champhira, Mzimba — gathered to worship Christ,
            serve our neighbors, and grow as one family of God.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 justify-center">
            <Link to="/mass" className="rounded-full bg-[var(--gold)] px-7 py-3 text-sm font-semibold text-[var(--navy-deep)] hover:bg-[var(--cream)] transition-colors">
              See Mass Times
            </Link>
            <Link to="/about" className="rounded-full border border-[var(--cream)]/40 px-7 py-3 text-sm font-semibold text-[var(--cream)] hover:bg-[var(--cream)]/10 transition-colors">
              About Our Parish
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK-ACCESS CARDS */}
      <section className="section-pad bg-[var(--cream)]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 grid gap-6 md:grid-cols-3">
          {[
            { icon: Clock, title: "Mass Times", desc: "Join us for Sunday and weekday Mass.", to: "/mass" },
            { icon: Calendar, title: "Upcoming Events", desc: "Stay connected with parish life.", to: "/news" },
            { icon: Mail, title: "Contact Us", desc: "Reach the parish office anytime.", to: "/contact" },
          ].map(({ icon: Icon, title, desc, to }) => (
            <Link
              key={title}
              to={to}
              className="group rounded-xl bg-white p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all border border-transparent hover:border-[var(--gold)]/30"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navy)] text-[var(--gold)] mb-5 group-hover:scale-110 transition-transform">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-serif text-2xl text-[var(--navy-deep)]">{title}</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{desc}</p>
              <span className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT INTRO */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 grid gap-12 md:grid-cols-2 items-center">
          <div className="relative">
            <img src={congregationImg} alt="Parish congregation in worship" loading="lazy" width={1280} height={854}
                 className="rounded-2xl shadow-[var(--shadow-elegant)] object-cover" />
            <div className="absolute -bottom-6 -right-6 hidden md:flex h-28 w-28 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy-deep)] shadow-[var(--shadow-soft)]">
              <CrossIcon className="h-12 w-12" />
            </div>
          </div>
          <div className="animate-fade-up">
            <GoldDivider className="justify-start" />
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--navy-deep)] mt-3">About Our Parish</h2>
            <p className="mt-5 text-[var(--muted-foreground)] leading-relaxed">
              Rooted in the Catholic faith and the rich tradition of the Mzuzu Diocese, Katete Catholic Church
              Mission has been a place of prayer, learning, and service for generations. We welcome every soul
              — old and young, near and far — into the family of Christ.
            </p>
            <blockquote className="mt-6 border-l-4 border-[var(--gold)] pl-5 italic text-[var(--navy)]">
              "I have come that they may have life, and have it to the full." — John 10:10
            </blockquote>
            <Link to="/about" className="mt-7 inline-flex items-center rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-semibold text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-pad bg-[var(--navy-deep)] text-[var(--cream)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_30%,var(--gold),transparent_40%),radial-gradient(circle_at_80%_70%,var(--gold),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 lg:px-8 text-center">
          <GoldDivider />
          <h2 className="font-serif text-3xl md:text-4xl mt-3">By God's Grace</h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: "1962", l: "Founded", icon: BookOpen },
              { n: "3,500+", l: "Parishioners", icon: Users },
              { n: "12", l: "Outreach Programs", icon: Heart },
              { n: "6", l: "Schools Supported", icon: GraduationCap },
            ].map(({ n, l, icon: Icon }) => (
              <div key={l} className="animate-fade-up">
                <Icon className="h-7 w-7 mx-auto text-[var(--gold)]" />
                <p className="font-serif text-4xl md:text-5xl text-[var(--gold)] mt-3">{n}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[var(--cream)]/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad bg-[var(--cream)]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 text-center">
          <GoldDivider />
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--navy-deep)] mt-3">Voices from Our Community</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { q: "This parish raised my children in faith. It is truly our second home.", n: "Agnes Mvula", r: "Parishioner since 1998" },
              { q: "Through the youth ministry, I found my purpose and my calling in Christ.", n: "Brian Nyirenda", r: "YCS Coordinator" },
              { q: "The Outreach Ministry restored hope to so many families in Champhira.", n: "Sr. Mary Chirwa", r: "Pastoral Team" },
            ].map(({ q, n, r }) => (
              <figure key={n} className="rounded-xl bg-white p-7 text-left shadow-[var(--shadow-soft)] border border-[var(--border)] animate-fade-up">
                <CrossIcon className="h-5 w-5 text-[var(--gold)]" />
                <blockquote className="mt-4 text-[var(--navy-deep)] italic font-serif text-lg leading-snug">"{q}"</blockquote>
                <figcaption className="mt-5">
                  <p className="font-semibold text-[var(--navy)]">{n}</p>
                  <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">{r}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <img src={bibleImg} alt="Open Bible with rosary" loading="lazy" width={1280} height={854} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--navy-deep)]/85" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 md:py-28 text-center text-[var(--cream)]">
          <h2 className="font-serif text-3xl md:text-4xl">Come and worship with us</h2>
          <p className="mt-4 text-[var(--cream)]/80">All are welcome at the table of the Lord.</p>
          <Link to="/contact" className="mt-7 inline-flex rounded-full bg-[var(--gold)] px-7 py-3 text-sm font-semibold text-[var(--navy-deep)] hover:bg-[var(--cream)] transition-colors">
            Plan Your Visit
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
