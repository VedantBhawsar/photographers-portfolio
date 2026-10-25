import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { consultationHref, navigation, siteConfig } from "@/content/site";

import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container-page flex h-(--header-height) items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="eyebrow py-2 text-foreground/80 decoration-1 underline-offset-[0.6em] transition-colors hover:text-foreground hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href={consultationHref} className={buttonVariants({ size: "sm", className: "hidden md:inline-flex" })}>
            Book a Free Consultation
          </Link>
          <MobileNav siteName={siteConfig.name} />
        </div>
      </div>
    </header>
  );
}
