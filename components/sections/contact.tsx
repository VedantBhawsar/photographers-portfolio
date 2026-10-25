import { serviceOptions } from "@/content/services";
import { siteConfig } from "@/content/site";

import { ConsultationForm } from "./consultation-form";

const nextSteps = [
  "We read your request and reply by email, usually with a few suggested times.",
  "We meet for a relaxed call to talk through your plans — free, with no obligation.",
  "If it feels right, you receive a tailored proposal and quotation.",
];

type ContactProps = {
  /** Preselects a service in the form. */
  defaultService?: string;
  title?: string;
};

export function Contact({ defaultService, title = "Request a Free Consultation" }: ContactProps) {
  const { contact, schedulingUrl } = siteConfig;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y border-t">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow text-muted-foreground">Contact</p>
          <h2 id="contact-title" className="mt-4 text-headline">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-lead text-muted-foreground">
            Share a few details about your plans. This sends a request — we&apos;ll be in touch to confirm a time
            that works for you.
          </p>

          <h3 className="eyebrow mt-12 font-sans text-muted-foreground">What happens next</h3>
          <ol className="mt-5 space-y-4 border-t pt-6">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex gap-4 text-[0.9375rem] leading-relaxed">
                <span aria-hidden="true" className="font-serif text-lg leading-snug text-muted-foreground">
                  {index + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>

          {(contact.email || contact.phone || contact.serviceArea) && (
            <dl className="mt-12 space-y-6 border-t pt-8">
              {contact.email && (
                <div>
                  <dt className="eyebrow text-muted-foreground">Email</dt>
                  <dd className="mt-1.5">
                    <a href={`mailto:${contact.email}`} className="link-underline">
                      {contact.email}
                    </a>
                  </dd>
                </div>
              )}
              {contact.phone && (
                <div>
                  <dt className="eyebrow text-muted-foreground">Phone</dt>
                  <dd className="mt-1.5">
                    <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="link-underline">
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              )}
              {contact.serviceArea && (
                <div>
                  <dt className="eyebrow text-muted-foreground">Service area</dt>
                  <dd className="mt-1.5">{contact.serviceArea}</dd>
                </div>
              )}
            </dl>
          )}

          {schedulingUrl && (
            <p className="mt-10 text-[0.9375rem] leading-relaxed text-muted-foreground">
              Prefer to choose a time yourself?{" "}
              <a href={schedulingUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">
                Open the scheduling page<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          )}
        </div>

        <div className="border bg-surface p-6 sm:p-10 lg:col-span-7">
          <ConsultationForm serviceOptions={serviceOptions} contactEmail={contact.email} defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
