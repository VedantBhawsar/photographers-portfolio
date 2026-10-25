import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { sectionImages } from "@/content/portfolio";
import { consultationHref, siteConfig } from "@/content/site";

export function FinalCta() {
  const photo = sectionImages.finalCta;
  const getInTouchHref = siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : "/#contact";

  return (
    <section aria-labelledby="final-cta-title" className="on-dark relative isolate overflow-hidden bg-ink text-background">
      <Image
        src={photo.src}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover opacity-55"
        style={{ objectPosition: photo.focus }}
      />
      <div className="container-page flex min-h-[34rem] flex-col items-center justify-center py-24 text-center md:min-h-[40rem]">
        <p className="eyebrow text-background/80">Free consultation</p>
        <h2 id="final-cta-title" className="mt-6 max-w-3xl text-headline">
          Let&apos;s Create Something Meaningful.
        </h2>
        <p className="mt-6 max-w-lg text-lead text-background/85">
          Have an idea, a special occasion, or a story worth telling? Let&apos;s talk about it.
        </p>
        <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Link href={consultationHref} className={buttonVariants({ variant: "inverse", size: "lg" })}>
            Book a Free Consultation
          </Link>
          <Link href={getInTouchHref} className={buttonVariants({ variant: "outline-inverse", size: "lg" })}>
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
