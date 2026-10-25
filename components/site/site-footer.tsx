import Link from "next/link";

import { navigation, siteConfig } from "@/content/site";

import { Wordmark } from "./wordmark";

export function SiteFooter() {
  const { contact, social } = siteConfig;

  return (
    <footer className="border-t bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{siteConfig.description}</p>
          {contact.serviceArea && <p className="eyebrow mt-6 text-muted-foreground">{contact.serviceArea}</p>}
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <h2 className="eyebrow font-sans text-muted-foreground">Navigation</h2>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="eyebrow font-sans text-muted-foreground">Get in touch</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="hover:underline hover:underline-offset-4">
                  {contact.email}
                </a>
              </li>
            )}
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="hover:underline hover:underline-offset-4">
                  {contact.phone}
                </a>
              </li>
            )}
            <li>
              <Link href="/#contact" className="hover:underline hover:underline-offset-4">
                Consultation request form
              </Link>
            </li>
            {siteConfig.clientGalleryUrl && (
              <li>
                <a href={siteConfig.clientGalleryUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                  Client galleries
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
            {social.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col gap-3 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {siteConfig.name}. All rights reserved.
        </p>
        <Link href="/privacy" className="hover:text-foreground hover:underline hover:underline-offset-4">
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}
