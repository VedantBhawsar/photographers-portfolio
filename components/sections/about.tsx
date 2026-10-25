import Image from "next/image";

import { sectionImages } from "@/content/portfolio";

/*
 * Placeholder biography — written to be replaced. It deliberately makes no
 * claims (years in business, awards, locations) that haven't been confirmed.
 */
const philosophy = "The best photographs feel less like a performance and more like a memory.";

const biography = [
  "I'm a photographer drawn to the in-between moments — the glance before a laugh, the hands that find each other without thinking, the light that only lasts a minute.",
  "My approach is calm and unobtrusive. I'll guide when it helps and step back when it doesn't, so you can be present rather than posed.",
];

const approach = [
  { title: "Listen first", text: "Every commission begins with a conversation about you, your plans and what matters most." },
  { title: "Plan with care", text: "Locations, timings and light are considered in advance, so the day itself feels easy." },
  { title: "Edit by hand", text: "Each image is selected and edited with attention, aiming for photographs that age well." },
];

export function About() {
  const photo = sectionImages.about;

  return (
    <section id="about" aria-labelledby="about-title" className="section-y border-b">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <figure className="lg:col-span-5">
          <div className="relative aspect-4/5 overflow-hidden bg-muted">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 90rem) 520px, (min-width: 64rem) 38vw, 100vw"
              className="object-cover"
              style={{ objectPosition: photo.focus }}
            />
          </div>
        </figure>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <p className="eyebrow text-muted-foreground">About</p>
          <h2 id="about-title" className="mt-4 text-headline">
            Behind the Camera
          </h2>
          <blockquote className="mt-10 border-l border-foreground pl-6 font-serif text-quote italic">
            “{philosophy}”
          </blockquote>
          <div className="mt-10 space-y-5 text-lead text-muted-foreground">
            {biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="eyebrow mt-14 font-sans text-muted-foreground">The approach</h3>
          <dl className="mt-6 grid gap-8 border-t pt-8 sm:grid-cols-3 sm:gap-6">
            {approach.map((item) => (
              <div key={item.title}>
                <dt className="font-serif text-[1.375rem] leading-snug">{item.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
