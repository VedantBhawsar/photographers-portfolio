import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { sectionImages } from "@/content/portfolio";
import { consultationHref } from "@/content/site";

export function Hero() {
  const { heroMain, heroInset } = sectionImages;

  return (
    <section aria-labelledby="hero-title" className="border-b">
      <div className="container-page grid gap-14 pt-12 pb-20 md:pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-6 lg:pr-6">
          <p className="eyebrow text-muted-foreground">Weddings · Portraits · Celebrations · Brands</p>
          <h1 id="hero-title" className="mt-6 text-display">
            Stories Worth <em className="italic">Remembering.</em>
          </h1>
          <p className="mt-8 max-w-md text-lead text-muted-foreground">
            Thoughtfully captured moments, genuine emotions, and timeless photographs for life&apos;s meaningful
            occasions.
          </p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Link href={consultationHref} className={buttonVariants({ size: "lg" })}>
              Book a Free Consultation
            </Link>
            <Link href="/#portfolio" className={buttonVariants({ variant: "link", className: "self-start sm:self-auto" })}>
              Explore Our Work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Tall portrait frame with a smaller landscape print overlapping its lower-left corner. */}
        <div className="relative mx-auto w-full max-w-md pb-14 pl-10 sm:max-w-lg sm:pl-16 lg:col-span-6 lg:max-w-none lg:pb-16 lg:pl-24">
          <div className="relative aspect-4/5 overflow-hidden bg-muted">
            <Image
              src={heroMain.src}
              alt={heroMain.alt}
              fill
              loading="eager"
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 90rem) 560px, (min-width: 64rem) 40vw, (min-width: 40rem) 448px, 85vw"
              className="object-cover"
              style={{ objectPosition: heroMain.focus }}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[46%] border border-border bg-surface p-2 sm:p-3">
            <div className="relative aspect-4/3 overflow-hidden bg-muted">
              <Image
                src={heroInset.src}
                alt={heroInset.alt}
                fill
                loading="eager"
                placeholder="blur"
                sizes="(min-width: 64rem) 22vw, 40vw"
                className="object-cover"
                style={{ objectPosition: heroInset.focus }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
