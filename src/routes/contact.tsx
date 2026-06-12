import { createFileRoute, useSearch } from "@tanstack/react-router";  // ← add useSearch
import { useState, useEffect } from "react";  // ← add useEffect
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { GoldDivider } from "@/components/site/Cross";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { sendMessage } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    ministry: (search.ministry as string) || "",  // ← add this
  }),
  head: () => ({
    meta: [
      { title: "Contact — St. Thereza Catholic Church" },
      { name: "description", content: "Get in touch with St. Thereza Catholic Church in Champhira, Mzimba District, Northern Region, Malawi." },
      { property: "og:title", content: "Contact St. Thereza Catholic Church" },
      { property: "og:description", content: "Address, phone, email and contact form." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { ministry } = useSearch({ from: "/contact" });  // ← read ministry from URL
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "", email: "", subject: "", message: "",
  });

  // ← pre-fill message and subject when coming from ministries page
  useEffect(() => {
    if (ministry) {
      setForm(f => ({
        ...f,
        subject: `Joining ${ministry}`,
        message: `I would like to join the ${ministry}. Please let me know how I can get involved.`,
      }));
    }
  }, [ministry]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await sendMessage(form);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Reach Out" title="Contact Us" subtitle="We'd love to hear from you." />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 grid gap-10 md:grid-cols-2">
          <div>
            <GoldDivider className="justify-start" />
            <h2 className="font-serif text-3xl text-[var(--navy-deep)] mt-3">Parish Office</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--navy-deep)]">Address</p>
                  <p className="text-[var(--muted-foreground)]">St. Thereza Catholic Church<br />Champhira, Mzimba District<br />Northern Region, Malawi<br />Plus Code: MJ37+Q56</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--navy-deep)]">Phone</p>
                  <p className="text-[var(--muted-foreground)]">+265 984 518 884</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--navy-deep)]">Email</p>
                  <p className="text-[var(--muted-foreground)]">st.therezakatetechurch@gmail.com</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="h-5 w-5 text-[var(--gold)] flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--navy-deep)]">Office Hours</p>
                  <p className="text-[var(--muted-foreground)]">Mon – Fri · 8:00 AM – 4:00 PM<br />Sat · 9:00 AM – 12:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-[var(--cream)] p-7 shadow-[var(--shadow-soft)] space-y-4 border border-[var(--border)]"
          >
            <h3 className="font-serif text-2xl text-[var(--navy-deep)]">
              {ministry ? `Join ${ministry}` : "Send us a message"}  {/* ← dynamic title */}
            </h3>

            {sent && (
              <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">
                Thank you — we'll be in touch soon. God bless you.
              </p>
            )}
            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">{error}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                required name="name" value={form.name} onChange={handleChange}
                placeholder="Full Name" maxLength={100}
                className="rounded-md bg-white border border-[var(--border)] px-4 py-3 text-sm"
              />
              <input
                required type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="Email" maxLength={255}
                className="rounded-md bg-white border border-[var(--border)] px-4 py-3 text-sm"
              />
            </div>
            <input
              required name="subject" value={form.subject} onChange={handleChange}
              placeholder="Subject" maxLength={120}
              className="w-full rounded-md bg-white border border-[var(--border)] px-4 py-3 text-sm"
            />
            <textarea
              required name="message" value={form.message} onChange={handleChange}
              placeholder="Your message…" rows={5} maxLength={1000}
              className="w-full rounded-md bg-white border border-[var(--border)] px-4 py-3 text-sm"
            />
            <button
              type="submit" disabled={loading}
              className="w-full rounded-full bg-[var(--navy)] py-3 text-sm font-semibold text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send Message"}
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