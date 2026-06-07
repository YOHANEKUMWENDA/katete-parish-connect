import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { GoldDivider } from "@/components/site/Cross";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Katete Catholic Church Mission" },
      { name: "description", content: "Get in touch with Katete Catholic Church Mission in Champhira, Mzimba." },
      { property: "og:title", content: "Contact Katete Catholic Church" },
      { property: "og:description", content: "Address, phone, email and contact form." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <PageHero eyebrow="Reach Out" title="Contact Us" subtitle="We'd love to hear from you." />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 grid gap-10 md:grid-cols-2">
          <div>
            <GoldDivider className="justify-start" />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Parish Office</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-3"><MapPin className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                <div><p className="font-semibold text-[var(--navy-deep)]">Address</p>
                  <p className="text-[var(--muted-foreground)]">Katete Catholic Church Mission<br/>Champhira, Mzimba District<br/>Malawi</p></div>
              </li>
              <li className="flex gap-3"><Phone className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                <div><p className="font-semibold text-[var(--navy-deep)]">Phone</p>
                  <p className="text-[var(--muted-foreground)]">+265 000 000 000</p></div>
              </li>
              <li className="flex gap-3"><Mail className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                <div><p className="font-semibold text-[var(--navy-deep)]">Email</p>
                  <p className="text-[var(--muted-foreground)]">info@katetecatholic.org</p></div>
              </li>
              <li className="flex gap-3"><Clock className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                <div><p className="font-semibold text-[var(--navy-deep)]">Office Hours</p>
                  <p className="text-[var(--muted-foreground)]">Mon – Fri · 8:00 AM – 4:00 PM<br/>Sat · 9:00 AM – 12:00 PM</p></div>
              </li>
            </ul>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-2xl bg-[var(--cream)] p-7 shadow-[var(--shadow-soft)] space-y-4 border border-[var(--border)]"
          >
            <h3 className="font-serif text-2xl text-[var(--navy-deep)]">Send us a message</h3>
            {sent && <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">Thank you — we'll be in touch soon. God bless you.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required placeholder="Full Name" maxLength={100} className="rounded-md bg-white border border-[var(--border)] px-4 py-3 text-sm" />
              <input required type="email" placeholder="Email" maxLength={255} className="rounded-md bg-white border border-[var(--border)] px-4 py-3 text-sm" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input placeholder="Phone" maxLength={30} className="rounded-md bg-white border border-[var(--border)] px-4 py-3 text-sm" />
              <input required placeholder="Subject" maxLength={120} className="rounded-md bg-white border border-[var(--border)] px-4 py-3 text-sm" />
            </div>
            <textarea required placeholder="Your message…" rows={5} maxLength={1000} className="w-full rounded-md bg-white border border-[var(--border)] px-4 py-3 text-sm" />
            <button type="submit" className="w-full rounded-full bg-[var(--navy)] py-3 text-sm font-semibold text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section className="bg-[var(--cream)] pb-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)] aspect-[16/9] bg-white">
            <iframe
              title="Map of Mzimba"
              src="https://www.google.com/maps?q=Champhira,+Mzimba,+Malawi&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
