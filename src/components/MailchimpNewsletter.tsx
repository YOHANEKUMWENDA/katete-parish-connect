import { Mail } from "lucide-react";

export function MailchimpNewsletter() {
  return (
    <section className="section-pad bg-[var(--navy)] text-[var(--cream)]">
      <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
        <Mail className="h-8 w-8 text-[var(--gold)] mx-auto" />
        <h2 className="font-serif text-3xl mt-4 mb-3">Subscribe Here</h2>
        <p className="text-[var(--cream)]/80 mb-8">
          Join St. Thereza Catholic Church updates for parish news, prayer intentions, and upcoming events.
        </p>

        {/* Mailchimp Signup Form Embed */}
        <div id="mc_embed_shell" className="max-w-md mx-auto">
          <div id="mc_embed_signup">
            <form
              action="https://app.us2.list-manage.com/subscribe/post?u=d2ff46689de8261707480e7e2&id=bc15b4fed4&f_id=00e6f6e3f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate space-y-4"
            >
              <div className="grid gap-4">
                <label className="block text-left text-sm text-[var(--cream)]/80">
                  <span className="block text-xs uppercase tracking-[0.2em] mb-1">Email Address</span>
                  <input
                    type="email"
                    name="EMAIL"
                    id="mce-EMAIL"
                    autoComplete="email"
                    className="required email w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--navy-deep)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    placeholder="Your email address"
                    required
                  />
                </label>
                <label className="block text-left text-sm text-[var(--cream)]/80">
                  <span className="block text-xs uppercase tracking-[0.2em] mb-1">First Name</span>
                  <input
                    type="text"
                    name="FNAME"
                    id="mce-FNAME"
                    autoComplete="given-name"
                    className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--navy-deep)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    placeholder="First name"
                    required
                  />
                </label>
                <label className="block text-left text-sm text-[var(--cream)]/80">
                  <span className="block text-xs uppercase tracking-[0.2em] mb-1">Last Name</span>
                  <input
                    type="text"
                    name="LNAME"
                    id="mce-LNAME"
                    autoComplete="family-name"
                    className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--navy-deep)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    placeholder="Last name"
                    required
                  />
                </label>
              </div>
              <div id="mce-responses" className="clear foot">
                <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
              </div>
              <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                <input type="text" name="b_d2ff46689de8261707480e7e2_bc15b4fed4" tabIndex={-1} value="" readOnly />
              </div>
              <div className="optionalParent">
                <div className="clear foot">
                  <input
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[var(--navy-deep)] hover:bg-[var(--cream)] transition-colors cursor-pointer"
                    value="Subscribe"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <p className="text-xs text-[var(--cream)]/60 mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
