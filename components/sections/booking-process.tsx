import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { consultationHref } from "@/content/site";

import { SectionHeading } from "./section-heading";

const steps = [
  {
    title: "Share Your Vision",
    text: "Tell us about your event, session, or creative project.",
  },
  {
    title: "Book a Free Consultation",
    text: "Discuss your ideas, requirements, and expectations.",
  },
  {
    title: "Receive a Custom Proposal",
    text: "Review the proposed scope and quotation.",
  },
];

export function BookingProcess() {
  return (
    <section aria-labelledby="process-title" className="section-y border-b">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow="How it works" title="Three Simple Steps" />

        <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t pt-8">
              <span aria-hidden="true" className="block font-serif text-numeral text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-title">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col gap-6 border bg-surface p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl leading-relaxed">
            <strong className="font-medium">The consultation is free</strong> and there&apos;s no obligation to book —
            it&apos;s simply a conversation to see whether we&apos;re the right fit.
          </p>
          <Link href={consultationHref} className={buttonVariants({ variant: "outline", className: "shrink-0" })}>
            Start With a Conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
