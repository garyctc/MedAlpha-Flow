import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground active:brightness-95",
        destructive:
          "bg-destructive text-destructive-foreground active:brightness-95",
        outline:
          "border border-gray-200 bg-white text-foreground active:bg-gray-50",
        secondary:
          "border border-primary bg-transparent text-primary active:bg-primary/5",
        ghost:
          "text-foreground active:bg-gray-100",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-12 px-6 py-3",
        sm: "min-h-10 rounded-xl px-4 text-sm",
        lg: "min-h-14 rounded-2xl px-8 text-lg",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  trailingIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, trailingIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {trailingIcon && <span className="ml-1">{trailingIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
