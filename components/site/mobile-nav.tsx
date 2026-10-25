"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { buttonVariants } from "@/components/ui/button";
import { consultationHref, navigation } from "@/content/site";

/**
 * Full-screen menu for small and medium screens. A native modal <dialog>
 * provides the focus trap, Escape-to-close and inert background for free.
 */
export function MobileNav({ siteName }: { siteName: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    // Close automatically if the viewport grows into the desktop layout.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) dialog?.close();
    };
    // Return focus to the trigger however the menu closes. Not every browser focuses a
    // button on click, so the dialog's built-in focus restoration can't be relied on.
    const onClose = () => triggerRef.current?.focus({ preventScroll: true });

    desktop.addEventListener("change", onChange);
    dialog?.addEventListener("close", onClose);
    return () => {
      desktop.removeEventListener("change", onChange);
      dialog?.removeEventListener("close", onClose);
    };
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="eyebrow -mr-2 inline-flex h-11 items-center px-2 lg:hidden"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        Menu
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-transparent open:flex open:flex-col"
      >
        <div className="container-page flex h-(--header-height) shrink-0 items-center justify-between border-b">
          <span className="font-serif text-[1.375rem] leading-none tracking-[0.06em] uppercase">{siteName}</span>
          <button type="button" className="eyebrow -mr-2 inline-flex h-11 items-center px-2" onClick={close}>
            Close
          </button>
        </div>

        <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-between overflow-y-auto py-10">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href} className="border-b">
                <Link
                  href={item.href}
                  onClick={close}
                  className="block py-4 font-serif text-[2.25rem] leading-tight transition-opacity hover:opacity-70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={consultationHref} onClick={close} className={buttonVariants({ className: "mt-10 w-full" })}>
            Book a Free Consultation
          </Link>
        </nav>
      </dialog>
    </>
  );
}
