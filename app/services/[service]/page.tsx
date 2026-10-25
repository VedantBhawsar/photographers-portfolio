import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BookingProcess } from "@/components/sections/booking-process";
import { Contact } from "@/components/sections/contact";
import { FaqList } from "@/components/sections/faq-list";
import { SectionHeading } from "@/components/sections/section-heading";
import { PageFallback } from "@/components/site/page-fallback";
import { buttonVariants } from "@/components/ui/button";
import { ProjectCard } from "@/components/work/project-card";
import { categories, projects } from "@/content/portfolio";
import { generalFaqs, getService, services, type Service } from "@/content/services";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type Params = PageProps<"/services/[service]">["params"];

export function generateStaticParams() {
  return services.map((service) => ({ service: service.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const service = getService((await params).service);
  if (!service) notFound();

  return {
    title: `${service.name} — ${service.kind}`,
    description: service.description,
    ...(siteConfig.url && { alternates: { canonical: `/services/${service.id}` } }),
  };
}

/** Projects from the categories this service covers. */
function relatedProjects(service: Service) {
  const covered = new Set(categories.filter((c) => c.serviceId === service.id).map((c) => c.id));
  return projects.filter((project) => covered.has(project.category));
}

export default function ServicePage({ params }: PageProps<"/services/[service]">) {
  return (
    <>
      <div className="container-page pt-12 md:pt-16">
        <Link href="/#services" className="eyebrow text-muted-foreground hover:text-foreground">
          <span aria-hidden="true">←</span> All services
        </Link>
      </div>
      <Suspense fallback={<PageFallback />}>
        <ServiceContent params={params} />
      </Suspense>
    </>
  );
}

async function ServiceContent({ params }: { params: Params }) {
  const service = getService((await params).service);
  if (!service) notFound();

  const number = String(services.indexOf(service) + 1).padStart(2, "0");
  const related = relatedProjects(service);
  const image = related[0]?.cover;
  const others = services.filter((item) => item.id !== service.id);

  const details = [
    { title: "What's included", items: service.inclusions },
    { title: "Ideal for", items: service.idealFor },
    { title: "Shaped around you", items: service.tailored },
  ];

  return (
    <>
      <header className="container-page grid gap-12 pt-12 pb-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-28">
        <div className="border-t pt-10 lg:col-span-6 lg:pr-6">
          <p className="eyebrow text-muted-foreground">
            {number} — {service.kind}
          </p>
          <h1 className="mt-5 text-display">{service.name}</h1>
          <p className="mt-8 max-w-md text-lead text-muted-foreground">{service.description}</p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Link href="#contact" className={buttonVariants({ size: "lg" })}>
              Discuss This Package
            </Link>
            {related.length > 0 && (
              <Link href="#related-work" className={buttonVariants({ variant: "link", className: "self-start sm:self-auto" })}>
                See related work <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
        {image && (
          <div className="relative aspect-4/5 overflow-hidden bg-muted lg:col-span-5 lg:col-start-8">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="eager"
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 90rem) 520px, (min-width: 64rem) 38vw, 100vw"
              className="object-cover"
              style={{ objectPosition: image.focus }}
            />
          </div>
        )}
      </header>

      <section aria-labelledby="details-title" className="section-y border-t">
        <div className="container-page">
          <SectionHeading id="details-title" eyebrow="The details" title="What This Looks Like" />
          <div className="mt-14 grid border-y md:grid-cols-3">
            {details.map((group, index) => (
              <div
                key={group.title}
                className={cn(
                  "border-b py-10 last:border-b-0 md:border-b-0 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0 lg:px-12",
                  index > 0 && "md:border-l",
                )}
              >
                <h3 className="eyebrow font-sans text-muted-foreground">{group.title}</h3>
                <ul className="mt-6 space-y-3.5 text-[0.9375rem]">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-4">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-foreground/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl leading-relaxed text-muted-foreground">
            <strong className="font-medium text-foreground">No fixed price list.</strong> Every project is quoted
            individually after a free consultation, so you only pay for what your day or project actually needs.
          </p>
        </div>
      </section>

      <BookingProcess />

      {related.length > 0 && (
        <section id="related-work" aria-labelledby="related-title" className="section-y">
          <div className="container-page">
            <SectionHeading id="related-title" eyebrow="Selected work" title="Related Projects" />
            <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
              {related.slice(0, 3).map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FaqList faqs={[...service.faqs, ...generalFaqs]} />

      <Contact defaultService={service.id} title={`Discuss ${service.name}`} />

      <nav aria-label="Other services" className="border-t">
        <div className="container-page grid gap-8 py-14 sm:grid-cols-2">
          {others.map((other) => (
            <Link key={other.id} href={`/services/${other.id}`} prefetch className="group block">
              <span className="eyebrow text-muted-foreground">{other.kind}</span>
              <span className="mt-2 block font-serif text-title decoration-1 underline-offset-[0.2em] group-hover:underline">
                {other.name} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
