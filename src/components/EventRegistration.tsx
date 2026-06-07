interface EventRegistrationProps {
  formId?: string;
}

export function EventRegistration({ formId = "YOUR_GOOGLE_FORM_ID" }: EventRegistrationProps) {
  const iframeUrl = `https://docs.google.com/forms/d/${formId}/viewform?embedded=true`;

  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-[var(--navy-deep)]">Event Registration</h2>
          <p className="mt-3 text-[var(--muted-foreground)]">
            Register for our upcoming parish events. We look forward to seeing you!
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)] border border-[var(--border)]">
          <iframe
            src={iframeUrl}
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Event Registration Form"
            className="w-full"
          >
            Loading…
          </iframe>
        </div>

        <div className="mt-8 p-6 rounded-lg bg-[var(--cream)] border border-[var(--border)]">
          <h3 className="font-semibold text-[var(--navy-deep)]">Questions?</h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Contact the parish office at <a href="mailto:info@sttheresacatholic.org" className="text-[var(--navy)] hover:text-[var(--gold)] font-semibold">info@sttheresacatholic.org</a> or call <a href="tel:+265984518884" className="text-[var(--navy)] hover:text-[var(--gold)] font-semibold">+265 98 451 8884</a>
          </p>
        </div>
      </div>
    </section>
  );
}
