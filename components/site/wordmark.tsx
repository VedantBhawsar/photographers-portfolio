import Link from "next/link";

import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("font-serif text-[1.375rem] leading-none tracking-[0.06em] uppercase", className)}
    >
      {siteConfig.name}
    </Link>
  );
}
