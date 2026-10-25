"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { CategoryId, Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";

type Filter = CategoryId | "all";

type PortfolioGalleryProps = {
  projects: Project[];
  categories: readonly { id: CategoryId; label: string }[];
};

export function PortfolioGallery({ projects, categories }: PortfolioGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const available = categories.filter((category) => projects.some((project) => project.category === category.id));
  const visible = filter === "all" ? projects : projects.filter((project) => project.category === filter);
  const labelFor = (id: CategoryId) => categories.find((category) => category.id === id)?.label ?? id;
  const filterLabel = filter === "all" ? "all categories" : labelFor(filter);

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="-mx-5 mt-12 flex gap-7 overflow-x-auto border-b px-5 [scrollbar-width:none] md:mx-0 md:px-0"
      >
        {[{ id: "all" as const, label: "All" }, ...available].map((option) => {
          const active = filter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.id)}
              className={cn(
                "eyebrow -mb-px shrink-0 border-b py-4 transition-colors",
                active
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"} in {filterLabel}.
      </p>

      {/*
        Pinterest-style masonry: CSS columns let each photograph keep its natural
        aspect ratio, so nothing is cropped and tiles stack without gaps.
      */}
      <ul className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
        {visible.map((project) => (
          <li key={project.slug} className="mb-10 break-inside-avoid lg:mb-12">
            <Link href={`/work/${project.slug}`} prefetch className="group block">
              <div className="overflow-hidden bg-muted">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  placeholder="blur"
                  sizes="(min-width: 90rem) 420px, (min-width: 64rem) 31vw, (min-width: 40rem) 46vw, 100vw"
                  className="h-auto w-full transition-transform duration-1000 ease-(--ease-editorial) group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-[1.375rem] leading-snug decoration-1 underline-offset-[0.2em] group-hover:underline">
                  {project.title}
                </h3>
                <span className="eyebrow shrink-0 text-muted-foreground">{labelFor(project.category)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
