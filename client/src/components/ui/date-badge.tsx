import * as React from "react"

import { cn } from "@/lib/utils"

export interface DateBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date
  time?: string
  size?: "default" | "compact"
}

const DateBadge = React.forwardRef<HTMLDivElement, DateBadgeProps>(
  ({ className, date, time, size = "default", ...props }, ref) => {
    const monthAbbr = date.toLocaleDateString("en-US", { month: "short" })
    const day = date.getDate().toString().padStart(2, "0")

    const sizeClasses =
      size === "compact"
        ? "px-2.5 py-1.5 min-w-[44px]"
        : "px-3 py-2 min-w-[52px]"

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center", className)}
        {...props}
      >
        <div
          className={cn(
            "bg-accent text-accent-foreground rounded-xl flex flex-col items-center justify-center",
            sizeClasses
          )}
        >
          <span className="text-[10px] font-semibold uppercase tracking-wide leading-none">
            {monthAbbr}
          </span>
          <span className="text-lg font-bold leading-tight">{day}</span>
        </div>
        {time && (
          <span className="text-xs text-muted-foreground mt-1.5">{time}</span>
        )}
      </div>
    )
  }
)
DateBadge.displayName = "DateBadge"

export { DateBadge }
