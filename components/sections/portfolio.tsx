import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { categories, projects } from "@/content/portfolio";

import { PortfolioGallery } from "./portfolio-gallery";
import { SectionHeading } from "./section-heading";

export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="section-y border-b">
      <div className="container-page">
        <SectionHeading id="portfolio-title" eyebrow="Selected Work" title="A Collection of Moments" />
        <PortfolioGallery projects={projects} categories={categories} />
        <div className="mt-20 flex justify-center">
          <Link href="/portfolio" className={buttonVariants({ variant: "outline" })}>
            Browse the Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
