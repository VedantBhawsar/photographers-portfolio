import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Contact } from "@/components/sections/contact";
import { SectionHeading } from "@/components/sections/section-heading";
import { PageFallback } from "@/components/site/page-fallback";
import { buttonVariants } from "@/components/ui/button";
import { ProjectCard } from "@/components/work/project-card";
import { ProjectGallery } from "@/components/work/project-gallery";
import { categories, getCategory, getCategoryPhotos, getProjectsInCategory } from "@/content/portfolio";
import { getService } from "@/content/services";
import { siteConfig } from "@/content/site";

type Params = PageProps<"/portfolio/[category]">["params"];

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const cover = getProjectsInCategory(category.id)[0]?.cover;
  return {
    title: category.title,
    description: category.intro,
    ...(siteConfig.url && { alternates: { canonical: `/portfolio/${category.id}` } }),
    openGraph: {
      title: category.title,
      description: category.intro,
      ...(cover && {
        images: [{ url: cover.src.src, width: cover.src.width, height: cover.src.height, alt: cover.alt }],
      }),
    },
  };
}

export default function CategoryPage({ params }: PageProps<"/portfolio/[category]">) {
  return (
    <>
      <div className="container-page pt-12 md:pt-16">
        <Link href="/portfolio" className="eyebrow text-muted-foreground hover:text-foreground">
          <span aria-hidden="true">←</span> Portfolio
        </Link>
      </div>
      <Suspense fallback={<PageFallback />}>
        <CategoryContent params={params} />
      </Suspense>
    </>
  );
}

async function CategoryContent({ params }: { params: Params }) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const photos = getCategoryPhotos(category.id);
  const related = getProjectsInCategory(category.id);
  const service = getService(category.serviceId);

  return (
    <>
      <header className="container-page pt-12 pb-16 md:pb-20">
        <div className="grid gap-8 border-t pt-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-muted-foreground">Portfolio — {category.label}</p>
            <h1 className="mt-4 text-display">{category.title}</h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-lead text-muted-foreground">{category.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link href="#contact" className={buttonVariants()}>
                Book a Free Consultation
              </Link>
              {service && (
                <Link href={`/services/${service.id}`} className={buttonVariants({ variant: "link" })}>
                  {service.name} <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {photos.length > 0 && (
        <section aria-label={`${category.label} photographs`} className="container-page pb-20 md:pb-28">
          <ProjectGallery title={category.title} photos={photos} />
        </section>
      )}

      <section aria-labelledby="expect-title" className="section-y border-t">
        <div className="container-page">
          <SectionHeading id="expect-title" eyebrow="The experience" title="What to Expect" />
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-10 lg:gap-16">
            {category.expect.map((item, index) => (
              <li key={item.title} className="border-t pt-6">
                <span aria-hidden="true" className="font-serif text-2xl text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-title">{item.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="projects-title" className="section-y border-t">
          <div className="container-page">
            <SectionHeading id="projects-title" eyebrow={category.label} title="Projects" />
            <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
              {related.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Contact defaultService={category.serviceId} />
    </>
  );
}
