"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { SELECT_SERVICE_EVENT, type SelectServiceDetail } from "@/lib/consultation/state";

/** Jumps to the consultation form and preselects this package (plain anchor without JS). */
export function DiscussPackageLink({ serviceId, serviceName }: { serviceId: string; serviceName: string }) {
  return (
    <Link
      href="/#contact"
      className={buttonVariants({ variant: "link" })}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent<SelectServiceDetail>(SELECT_SERVICE_EVENT, { detail: { service: serviceId } }),
        );
      }}
    >
      Discuss This Package<span className="sr-only">: {serviceName}</span> <span aria-hidden="true">→</span>
    </Link>
  );
}
