import * as React from "react"
import { cn } from "@/lib/utils"

export interface DoctorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  specialty: string
  imageUrl?: string
  verified?: boolean
  centered?: boolean
  size?: "default" | "compact"
}

const DoctorCard = React.forwardRef<HTMLDivElement, DoctorCardProps>(
  (
    {
      className,
      name,
      specialty,
      imageUrl,
      verified = true,
      centered = false,
      size = "default",
      ...props
    },
    ref
  ) => {
    const photoSize = size === "compact" ? "w-14 h-14" : "w-20 h-20"
    void verified

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-4",
          centered && "flex-col text-center",
          className
        )}
        {...props}
      >
        <div className="relative flex-shrink-0">
          <div
            className={cn(
              photoSize,
              "rounded-full bg-gray-200 overflow-hidden"
            )}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-xl font-semibold">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            )}
          </div>
        </div>
        <div className={cn(centered ? "space-y-1" : "min-w-0 flex-1")}>
          <h3 className="font-semibold text-foreground truncate">{name}</h3>
          <p className="text-sm text-primary">{specialty}</p>
        </div>
      </div>
    )
  }
)
DoctorCard.displayName = "DoctorCard"

export { DoctorCard }
