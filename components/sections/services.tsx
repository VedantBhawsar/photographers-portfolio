import Link from "next/link";

import { services } from "@/content/services";
import { cn } from "@/lib/utils";

import { DiscussPackageLink } from "./discuss-package-link";
import { SectionHeading } from "./section-heading";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y border-b">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="Photography for Every Story"
          intro="Three starting points, each shaped around you. Quotations depend on what your day or project needs, so we talk first and propose after."
        />

        <ul className="mt-16 grid border-y md:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.id}
              className={cn(
                "flex flex-col border-b py-12 last:border-b-0 md:border-b-0 md:px-8 md:py-14 md:first:pl-0 md:last:pr-0 lg:px-12",
                index > 0 && "md:border-l",
                service.featured && "md:bg-surface",
              )}
            >
              <p className="eyebrow text-muted-foreground">
                {String(index + 1).padStart(2, "0")} — {service.kind}
              </p>
              <h3 className="mt-5 text-title">
                <Link href={`/services/${service.id}`} prefetch className="decoration-1 underline-offset-[0.2em] hover:underline">
                  {service.name}
                </Link>
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">{service.description}</p>
              <ul className="mt-8 space-y-3.5 text-[0.9375rem]">
                {service.inclusions.map((item) => (
                  <li key={item} className="flex gap-4">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-foreground/50" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 pt-10">
                <DiscussPackageLink serviceId={service.id} serviceName={service.name} />
                <Link
                  href={`/services/${service.id}`}
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Full details<span className="sr-only"> about {service.name}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-14 max-w-2xl text-center font-serif text-quote italic">
          Every project is different. Let&apos;s discuss your vision and create a photography experience tailored to
          you.
        </p>
      </div>
    </section>
  );
}
