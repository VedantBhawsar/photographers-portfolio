import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page section-y">
      <p className="eyebrow text-muted-foreground">404</p>
      <h1 className="mt-4 max-w-2xl text-headline">This page couldn&apos;t be found.</h1>
      <p className="mt-6 max-w-md text-lead text-muted-foreground">
        It may have moved, or the link may be out of date.
      </p>
      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
        <Link href="/" className={buttonVariants()}>
          Back to Home
        </Link>
        <Link href="/#portfolio" className={buttonVariants({ variant: "link", className: "self-start sm:self-auto" })}>
          View Portfolio
        </Link>
      </div>
    </section>
  );
}
