import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-primary text-primary-foreground shadow-sm",
        secondary:
          "border border-border/60 bg-secondary text-secondary-foreground",
        destructive:
          "border border-transparent bg-destructive/10 text-destructive",
        outline:
          "border border-border text-muted-foreground",
        accent:
          "border border-primary/30 bg-primary/10 text-primary font-medium tracking-wide",
        stock:
          "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700",
        mto:
          "border border-amber-500/20 bg-amber-500/10 text-amber-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
