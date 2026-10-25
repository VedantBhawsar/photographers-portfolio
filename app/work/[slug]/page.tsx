import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageFallback } from "@/components/site/page-fallback";
import { buttonVariants } from "@/components/ui/button";
import { ProjectGallery } from "@/components/work/project-gallery";
import { getCategoryLabel, getProject, projects } from "@/content/portfolio";
import { consultationHref, siteConfig } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return {
    title: project.title,
    description: project.summary,
    ...(siteConfig.url && { alternates: { canonical: `/work/${project.slug}` } }),
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover.src.src, width: project.cover.src.width, height: project.cover.src.height, alt: project.cover.alt }],
    },
  };
}

/*
 * The page shell (back link, consultation prompt) is shared by every project, so it can be
 * prefetched once as the route's App Shell. Everything that depends on the URL's `slug`
 * lives behind <Suspense>; each project is still prerendered in full at build time.
 */
export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <article>
      <div className="container-page pt-12 md:pt-16">
        <Link href="/#portfolio" className="eyebrow text-muted-foreground hover:text-foreground">
          <span aria-hidden="true">←</span> All work
        </Link>
      </div>

      <Suspense fallback={<PageFallback />}>
        <ProjectContent params={params} />
      </Suspense>

      <footer className="border-t">
        <div className="container-page py-16 md:py-20">
          <p className="eyebrow text-muted-foreground">Planning something similar?</p>
          <p className="mt-4 max-w-md font-serif text-title">Let&apos;s talk about your story — the consultation is free.</p>
          <Link href={consultationHref} className={buttonVariants({ className: "mt-8" })}>
            Book a Free Consultation
          </Link>
        </div>
      </footer>
    </article>
  );
}

async function ProjectContent({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const position = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(position + 1) % projects.length];

  return (
    <>
      <header className="container-page pt-12 pb-14 md:pb-20">
        <div className="grid gap-8 border-t pt-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Link
              href={`/portfolio/${project.category}`}
              className="eyebrow text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {getCategoryLabel(project.category)}
            </Link>
            <h1 className="mt-4 text-display">{project.title}</h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-lead text-muted-foreground">{project.summary}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {project.gallery.length} photographs · select any image to view it larger.
            </p>
          </div>
        </div>
      </header>

      <div className="container-page pb-20 md:pb-28">
        <ProjectGallery title={project.title} photos={project.gallery} />
      </div>

      <nav aria-label="More work" className="border-t">
        <div className="container-page py-14 md:py-16 md:text-right">
          <Link href={`/work/${next.slug}`} prefetch className="group inline-block">
            <span className="eyebrow text-muted-foreground">Next project</span>
            <span className="mt-3 block font-serif text-headline decoration-1 underline-offset-[0.15em] group-hover:underline">
              {next.title} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
