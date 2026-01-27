import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-base font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-gray-200 bg-white text-foreground",
        selected: "bg-primary text-primary-foreground border-transparent",
      },
      size: {
        default: "min-h-12 px-5 py-3",
        sm: "min-h-10 px-4 py-2 text-sm rounded-xl",
        lg: "min-h-14 px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  selected?: boolean
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, size, selected, ...props }, ref) => {
    return (
      <button
        className={cn(
          chipVariants({
            variant: selected ? "selected" : variant,
            size,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Chip.displayName = "Chip"

export { Chip, chipVariants }
