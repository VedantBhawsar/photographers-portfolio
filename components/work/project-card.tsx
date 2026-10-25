import Image from "next/image";
import Link from "next/link";

import { getCategoryLabel, type Project } from "@/content/portfolio";

/** Compact project tile used in "related work" grids. */
export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;

  return (
    <Link href={`/work/${project.slug}`} prefetch className="group block">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 90rem) 420px, (min-width: 48rem) 30vw, 100vw"
          className="object-cover transition-transform duration-1000 ease-(--ease-editorial) group-hover:scale-[1.03]"
          style={{ objectPosition: project.cover.focus }}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-6 border-t pt-3">
        <Heading className="font-serif text-[1.375rem] leading-snug decoration-1 underline-offset-[0.2em] group-hover:underline">
          {project.title}
        </Heading>
        <span className="eyebrow shrink-0 text-muted-foreground">{getCategoryLabel(project.category)}</span>
      </div>
    </Link>
  );
}
