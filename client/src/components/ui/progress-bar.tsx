import * as React from "react"

import { cn } from "@/lib/utils"

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number
  totalSteps: number
  showLabel?: boolean
  showPercentage?: boolean
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      currentStep,
      totalSteps,
      showLabel = true,
      showPercentage = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.round((currentStep / totalSteps) * 100)

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {(showLabel || showPercentage) && (
          <div className="flex items-center justify-between mb-2">
            {showLabel && (
              <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                Step {currentStep} of {totalSteps}
              </span>
            )}
            {showPercentage && (
              <span className="text-xs font-medium text-muted-foreground">
                {percentage}%
              </span>
            )}
          </div>
        )}
        <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }
