import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PortfolioGallery } from "@/components/sections/portfolio-gallery";
import { SectionHeading } from "@/components/sections/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { categories, getProjectsInCategory, projects } from "@/content/portfolio";
import { consultationHref, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Weddings, portraits, couples, events, editorial and brand photography — browse the work by category.",
  ...(siteConfig.url && { alternates: { canonical: "/portfolio" } }),
};

export default function PortfolioPage() {
  const withWork = categories
    .map((category) => ({ category, items: getProjectsInCategory(category.id) }))
    .filter(({ items }) => items.length > 0);

  return (
    <>
      <header className="container-page border-b pt-12 pb-16 md:pt-16 md:pb-20">
        <p className="eyebrow text-muted-foreground">Portfolio</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="text-display lg:col-span-7">A Collection of Moments</h1>
          <p className="text-lead text-muted-foreground lg:col-span-4 lg:col-start-9">
            Browse by the kind of story you&apos;re planning, or explore every project below.
          </p>
        </div>
      </header>

      <section aria-labelledby="categories-title" className="section-y border-b">
        <div className="container-page">
          <h2 id="categories-title" className="sr-only">
            Categories
          </h2>
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
            {withWork.map(({ category, items }) => {
              const cover = items[0].cover;
              return (
                <li key={category.id}>
                  <Link href={`/portfolio/${category.id}`} prefetch className="group block">
                    <div className="relative aspect-4/5 overflow-hidden bg-muted">
                      <Image
                        src={cover.src}
                        alt=""
                        fill
                        placeholder="blur"
                        sizes="(min-width: 90rem) 430px, (min-width: 64rem) 30vw, (min-width: 40rem) 46vw, 100vw"
                        className="object-cover transition-transform duration-1000 ease-(--ease-editorial) group-hover:scale-[1.03]"
                        style={{ objectPosition: cover.focus }}
                      />
                    </div>
                    <div className="mt-5 border-t pt-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-title decoration-1 underline-offset-[0.2em] group-hover:underline">
                          {category.label}
                        </h3>
                        <span className="eyebrow shrink-0 text-muted-foreground">
                          {items.length} {items.length === 1 ? "project" : "projects"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{category.intro}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="all-projects-title" className="section-y">
        <div className="container-page">
          <SectionHeading id="all-projects-title" eyebrow="Every project" title="All Work" />
          <PortfolioGallery projects={projects} categories={categories} />
          <div className="mt-20 flex flex-col items-start gap-6 border-t pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-lg font-serif text-title">Have something similar in mind?</p>
            <Link href={consultationHref} className={buttonVariants()}>
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
