# Photography Portfolio

An editorial portfolio site for an independent photographer. It showcases work by category, explains services without pricing, and turns visitors into **free consultation requests**.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, masonry portfolio with filters, services overview, about, process, final CTA, consultation form |
| `/portfolio` | Category tiles + every project (masonry, filterable) |
| `/portfolio/[category]` | Category landing page: SEO heading, intro, uncropped gallery with lightbox, what to expect, projects, form with the matching service preselected |
| `/services/[service]` | Package detail: inclusions, ideal for, what can be tailored, process, related work, FAQs, form preselected (no prices) |
| `/work/[slug]` | Individual project gallery with lightbox |
| `/privacy` | Privacy policy |

Built with Next.js 16 (App Router, Cache Components, Partial Prefetching), React 19, TypeScript (strict) and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Development server                                 |
| `npm run build`     | Production build (prerenders every page)           |
| `npm run start`     | Serve the production build                         |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript)      |
| `npm run typecheck` | `tsc --noEmit`                                     |
| `npm test`          | Unit tests for consultation validation (`node --test`) |

## Before launch — checklist

Everything below is a placeholder until the photographer confirms it. Nothing about the business has been invented: no contact details, testimonials, awards, client names or prices.

1. **Business name.** Edit `siteConfig.name` in `content/site.ts` (currently "Studio Name").
2. **Photography.** Every image in `assets/photos/` is a **stock placeholder** from Unsplash (see `assets/photos/CREDITS.md`). None of it is the photographer's work. Replace the files and update `content/portfolio.ts` (titles, summaries, alt text, categories). Replace `app/opengraph-image.jpg` as well.
3. **Category and service copy.** The intros, "what to expect" points (`content/portfolio.ts`) and FAQ answers (`content/services.ts`) are neutral sample text — confirm they match how the photographer works.
4. **About section.** The biography and philosophy in `components/sections/about.tsx` are placeholder copy. The about image should be a portrait of the photographer.
5. **Services.** The names and inclusions in `content/services.ts` are sample structures, not commitments. Confirm or edit them.
6. **Testimonials.** Add genuine, permissioned quotes to `content/testimonials.ts`. The section stays hidden while the list is empty.
7. **Environment variables.** Copy `.env.example` to `.env.local` (or set them on your host):
   - `NEXT_PUBLIC_SITE_URL` enables canonical URLs, the sitemap and absolute Open Graph URLs.
   - `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_SERVICE_AREA` are shown only when set.
   - `NEXT_PUBLIC_SCHEDULING_URL` (optional) offers a Calendly/Cal.com link next to the form.
   - `NEXT_PUBLIC_CLIENT_GALLERY_URL` (optional) adds a "Client galleries" footer link to a proofing/delivery service such as Pixieset, ShootProof or Pic-Time.
   - `RESEND_API_KEY`, `CONSULTATION_TO_EMAIL`, `CONSULTATION_FROM_EMAIL` are **required in production** for consultation requests (see below).
8. **Social links.** Add them to `siteConfig.social`.
9. **Privacy policy.** `app/privacy/page.tsx` describes what the site does today. Have it reviewed for your jurisdiction, and update it if you add analytics or other processors.

## Consultation requests

The form (`components/sections/consultation-form.tsx`) posts to a Server Action (`lib/consultation/actions.ts`).

- **Validation.** The same rules (`lib/consultation/validation.ts`) run in the browser for instant field-level feedback and again on the server. The form still works with JavaScript disabled (progressive enhancement).
- **Delivery** (`lib/consultation/deliver.ts`):
  - With Resend configured, the request is emailed as plain text to `CONSULTATION_TO_EMAIL`, with reply-to set to the visitor.
  - In **development** without credentials, requests are appended to `.data/consultation-requests.jsonl` (gitignored) so the flow can be tested end to end.
  - In **production** without credentials, the visitor sees an error asking them to get in touch directly. The site never claims a request was received when it wasn't.
- **Wording.** The confirmation says a *request* was sent and that nothing is booked until the photographer replies.
- **Spam and abuse.** A hidden honeypot field and a minimum fill time reject automated submissions. Valid submissions are rate-limited per IP (5 per 10 minutes), and a per-form submission id prevents double delivery.
- **Privacy.** Logs never contain visitor details. Only delivery status codes and error names are logged.

> The rate limiter and duplicate guard are in-memory, so they protect a single server instance. On multi-instance or serverless hosting, back them with a shared store (e.g. Upstash Redis) if abuse becomes a problem.

To use a different email or CRM provider, replace `sendWithResend` in `lib/consultation/deliver.ts`. The rest of the flow doesn't change.

## Project structure

```
app/                      routes: home, /work/[slug], /privacy, sitemap, robots, OG image
components/site/          header, mobile menu (native <dialog>), footer, wordmark
components/sections/      page sections + the consultation form
components/work/          project gallery with accessible lightbox
components/ui/button.tsx  button variants (shadcn / Base UI)
content/                  editable data: site config, portfolio, services, testimonials
lib/consultation/         validation, server action, delivery, rate limiting
assets/photos/            placeholder imagery (statically imported → blur placeholders, intrinsic sizes)
```

## Design system

The visual direction was explored with **Google Stitch** (project "Photography Portfolio — Stories Worth Remembering"), which produced the "Atelier Curatorial Editorial" system: warm ecru paper, carbon ink, Newsreader serif headings with Plus Jakarta Sans body text, 1px hairlines, square corners, and asymmetric editorial layouts. Desktop and mobile screens were generated and used as references.

The tokens live in `app/globals.css`:

- **Colour:** `background #F6F3EE`, `surface #FAF8F5`, `foreground #1A1918`, hairline `border #E3DED6`. Two Stitch values were adjusted for WCAG 2.2 AA: muted text darkened to `#6B675F` (5.1:1) and form-field rules to `#8A847A` (3.35:1, above the 3:1 required for non-text UI).
- **Type:** fluid scale (`text-display`, `text-headline`, `text-title`, `text-quote`, `text-numeral`, `text-lead`, `text-label`).
- **Utilities:** `container-page` (max 90rem, 20/40/64px gutters), `section-y` (fluid vertical rhythm), `eyebrow` (uppercase catalogue label), `link-underline`.
- **Motion:** a single easing token (`--ease-editorial`). Everything is disabled under `prefers-reduced-motion`.

## Accessibility notes

Skip link; semantic landmarks; one `h1` per page; visible focus rings (flipped on dark imagery); the menu and lightbox use modal `<dialog>` (focus trap, Escape, background scroll lock, focus returned to the trigger); filters use `aria-pressed` with a live-region result count; form fields have labels, hints and errors wired up with `aria-describedby` / `aria-invalid`, and focus moves to the first invalid field or to the confirmation.

## Known behaviour

- Galleries use CSS-column masonry, so photos keep their natural aspect ratio (never cropped). Columns fill top to bottom, so the visual order runs down each column.
- Project, category and service pages read their URL parameter inside `<Suspense>` so the page shell can be prefetched once (Partial Prefetching). As a result, an unknown `/work/…`, `/portfolio/…` or `/services/…` URL renders the not-found page with HTTP 200 plus `noindex` instead of a 404. This is [documented Next.js behaviour](node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md) for not-found after streaming starts. Other unknown URLs return a true 404.
- Without `NEXT_PUBLIC_SITE_URL`, the build warns that `metadataBase` is unset and the sitemap is empty.
