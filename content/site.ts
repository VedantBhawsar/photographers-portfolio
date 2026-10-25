/**
 * Business details shown across the site.
 *
 * Everything here is a placeholder until the photographer confirms it.
 * Optional fields left as `null` / empty are simply not rendered — never
 * fill them with invented contact details.
 */

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  /** Short line used in metadata and the footer. */
  description: string;
  /** Production origin, e.g. "https://example.com". Enables canonical URLs and the sitemap. */
  url: string | null;
  contact: {
    email: string | null;
    phone: string | null;
    /** e.g. "Based in Lisbon, available for travel" — only once confirmed. */
    serviceArea: string | null;
  };
  /** Optional external scheduler (Calendly, Cal.com, …). Shown as an alternative to the request form. */
  schedulingUrl: string | null;
  /** Optional private client gallery service (Pixieset, ShootProof, Pic-Time, …) for proofing and delivery. */
  clientGalleryUrl: string | null;
  social: SocialLink[];
};

function optionalEnv(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const siteConfig: SiteConfig = {
  name: "Studio Name",
  description:
    "Thoughtfully captured moments, genuine emotions, and timeless photographs for life's meaningful occasions.",
  url: optionalEnv(process.env.NEXT_PUBLIC_SITE_URL)?.replace(/\/$/, "") ?? null,
  contact: {
    email: optionalEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: optionalEnv(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    serviceArea: optionalEnv(process.env.NEXT_PUBLIC_SERVICE_AREA),
  },
  schedulingUrl: optionalEnv(process.env.NEXT_PUBLIC_SCHEDULING_URL),
  clientGalleryUrl: optionalEnv(process.env.NEXT_PUBLIC_CLIENT_GALLERY_URL),
  social: [
    // { label: "Instagram", href: "https://instagram.com/your-handle" },
  ],
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const consultationHref = "/#contact";
