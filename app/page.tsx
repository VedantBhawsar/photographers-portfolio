import type { Metadata } from "next";

import { About } from "@/components/sections/about";
import { BookingProcess } from "@/components/sections/booking-process";
import { Contact } from "@/components/sections/contact";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { siteConfig } from "@/content/site";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  ...(siteConfig.url && { alternates: { canonical: "/" } }),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Services />
      <About />
      <BookingProcess />
      <Testimonials items={testimonials} />
      <FinalCta />
      <Contact />
    </>
  );
}
