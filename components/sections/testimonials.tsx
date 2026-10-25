import type { Testimonial } from "@/content/testimonials";

import { SectionHeading } from "./section-heading";

/** Renders nothing until genuine, permissioned testimonials are added to content/testimonials.ts. */
export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="section-y border-b">
      <div className="container-page">
        <SectionHeading id="testimonials-title" eyebrow="Kind words" title="From Our Clients" />
        <ul className="mt-16 grid gap-14 md:grid-cols-2 lg:gap-20">
          {items.map((item) => (
            <li key={`${item.author}-${item.quote.slice(0, 24)}`}>
              <figure className="border-t pt-8">
                <blockquote className="font-serif text-quote">“{item.quote}”</blockquote>
                <figcaption className="eyebrow mt-6 text-muted-foreground">
                  {item.author}
                  {item.context && <span> — {item.context}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
