import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonStyles = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border font-sans text-[0.75rem] font-medium tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-300 ease-(--ease-editorial) select-none disabled:pointer-events-none disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground hover:bg-primary/85",
        outline: "border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
        inverse: "border-background bg-background text-foreground hover:bg-background/85",
        "outline-inverse": "border-background/80 bg-transparent text-background hover:bg-background hover:text-foreground",
        link: "h-auto border-transparent px-0 tracking-[0.1em] text-foreground underline decoration-1 underline-offset-[0.45em] hover:underline-offset-[0.25em]",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5",
        lg: "h-14 px-9",
        icon: "size-11 tracking-normal",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/** Class names for button-styled elements (e.g. links), with conflicting utilities resolved. */
function buttonVariants({ className, ...variants }: VariantProps<typeof buttonStyles> & { className?: string } = {}) {
  return cn(buttonStyles(variants), className)
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonStyles>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonStyles({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
