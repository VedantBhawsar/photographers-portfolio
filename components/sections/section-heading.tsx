import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
};

/** Eyebrow + serif heading pairing used to open every section. */
export function SectionHeading({ id, eyebrow, title, intro, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h2 id={id} className="mt-4 text-headline">
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-xl text-lead text-muted-foreground">{intro}</p>}
    </div>
  );
}
