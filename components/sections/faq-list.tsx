import type { Faq } from "@/content/services";

import { SectionHeading } from "./section-heading";

/** Question list built on native <details>, so it's keyboard and screen-reader friendly without JavaScript. */
export function FaqList({ faqs, title = "Questions, Answered" }: { faqs: Faq[]; title?: string }) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-title" className="section-y border-t">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <SectionHeading id="faq-title" eyebrow="FAQ" title={title} className="lg:col-span-4" />
        <div className="border-t lg:col-span-7 lg:col-start-6">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-serif text-[1.375rem] leading-snug [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="mt-1 font-sans text-xl leading-none text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
