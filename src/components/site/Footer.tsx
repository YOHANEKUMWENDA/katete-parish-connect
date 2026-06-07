import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { CrossIcon } from "./Cross";
import { MailchimpNewsletter } from "@/components/MailchimpNewsletter";

export function Footer() {
  return (
    <footer className="bg-[var(--navy-deep)] text-[var(--cream)]/85">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy-deep)]">
              <CrossIcon className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-serif text-lg text-[var(--cream)]">St. Thereza Catholic</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold)]">Church</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            A faithful community of the Mzuzu Diocese, serving Christ and our neighbors in Champhira, Mzimba.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-base text-[var(--gold)] mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/about", "About Us"],
              ["/mass", "Mass & Liturgy"],
              ["/ministries", "Ministries"],
              ["/news", "News & Events"],
              ["/give", "Give / Donate"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-[var(--gold)] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base text-[var(--gold)] mb-4">Mass Times</h4>
          <ul className="space-y-2 text-sm">
            <li>Sunday — 7:00 AM &amp; 9:30 AM</li>
            <li>Wednesday — 6:00 AM</li>
            <li>Friday — 6:00 PM</li>
            <li>Holy Days — 6:00 PM</li>
            <li className="pt-2 text-[var(--gold)]/90">Confession: Sat 4:00 – 5:30 PM</li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base text-[var(--gold)] mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-[var(--gold)]" /> Champhira, Mzimba District, Northern Region, Malawi</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-[var(--gold)]" /> +265 000 000 000</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-[var(--gold)]" /> st.therezakatetechurch@gmail.com</li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <MailchimpNewsletter />

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[var(--cream)]/60">
          <p>© {new Date().getFullYear()} St. Thereza Catholic Church · Mzuzu Diocese</p>
          <p className="italic">"Go therefore and make disciples of all nations." — Matthew 28:19</p>
        </div>
      </div>
    </footer>
  );
}
