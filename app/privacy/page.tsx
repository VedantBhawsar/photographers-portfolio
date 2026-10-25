import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles the personal information you share through this website.`,
  ...(siteConfig.url && { alternates: { canonical: "/privacy" } }),
};

/*
 * Starting-point policy describing what this site actually does today.
 * Have it reviewed for your jurisdiction (e.g. GDPR/UK GDPR, CCPA) before launch,
 * and update it if you add analytics, cookies or other processors.
 */
export default function PrivacyPage() {
  const { email } = siteConfig.contact;

  return (
    <article className="container-page section-y">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow text-muted-foreground">Legal</p>
        <h1 className="mt-4 text-headline">Privacy Policy</h1>

        <div className="mt-12 space-y-10 leading-relaxed text-muted-foreground [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-title [&_h2]:text-foreground">
          <section>
            <h2>What we collect</h2>
            <p>
              When you request a consultation, we collect the details you choose to share: your name, email address,
              phone number (optional), the type of photography you&apos;re interested in, your preferred dates or
              availability, and a description of your project.
            </p>
          </section>

          <section>
            <h2>How we use it</h2>
            <p>
              We use this information only to respond to your enquiry, arrange a consultation and, if you choose to
              go ahead, prepare a proposal. We don&apos;t sell your information or use it for unrelated marketing.
            </p>
          </section>

          <section>
            <h2>How it&apos;s handled</h2>
            <p>
              Requests are delivered to us by email through a transactional email provider. We keep enquiry details
              only as long as needed to respond and, where you become a client, to deliver our services and meet
              legal obligations.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>This website does not use advertising or analytics cookies.</p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              You can ask us to access, correct or delete the personal information you&apos;ve shared at any time
              {email ? (
                <>
                  {" "}
                  by emailing{" "}
                  <a href={`mailto:${email}`} className="link-underline text-foreground">
                    {email}
                  </a>
                </>
              ) : (
                <>
                  {" "}
                  by contacting us through the{" "}
                  <Link href="/#contact" className="link-underline text-foreground">
                    contact form
                  </Link>
                </>
              )}
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
