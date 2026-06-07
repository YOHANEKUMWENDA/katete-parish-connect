import { Mail } from "lucide-react";

export function MailchimpNewsletter() {
  return (
    <section className="section-pad bg-[var(--navy)] text-[var(--cream)]">
      <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
        <Mail className="h-8 w-8 text-[var(--gold)] mx-auto" />
        <h2 className="font-serif text-3xl mt-4 mb-3">Stay Connected</h2>
        <p className="text-[var(--cream)]/80 mb-8">
          Subscribe to our monthly newsletter for parish news, prayer intentions, and upcoming events.
        </p>

        {/* Mailchimp Signup Form Embed */}
        <div id="mc_embed_shell" className="max-w-md mx-auto">
          <div id="mc_embed_signup">
            <form
              action="https://app.us2.list-manage.com/subscribe/post?u=d2ff46689de8261707480e7e2&id=bc15b4fed4&f_id=00e6f6e3f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              target="_blank"
              noValidate
              className="validate space-y-4"
            >
              <div className="mc-field-group w-full">
                <input
                  type="email"
                  name="EMAIL"
                  className="required email w-full rounded-lg px-4 py-3 text-[var(--navy-deep)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  id="mce-EMAIL"
                  placeholder="Your email address"
                  required
                />
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
