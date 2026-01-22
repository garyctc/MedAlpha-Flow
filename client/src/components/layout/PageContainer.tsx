import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Additional padding at bottom for bottom nav */
  hasBottomNav?: boolean;
}

/**
 * PageContainer provides the branded page structure with:
 * - Primary color background that shows behind rounded corners
 * - White content area with rounded top corners
 * - Proper spacing for bottom navigation
 */
export default function PageContainer({ children, className, hasBottomNav = true }: PageContainerProps) {
  return (
    <div className={cn("min-h-screen bg-primary", hasBottomNav && "pb-24")}>
      {children}
    </div>
  );
}

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageContent is the white content area with rounded top corners.
 * Use this inside PageContainer after the header.
 */
export function PageContent({ children, className }: PageContentProps) {
  return (
    <div className={cn("bg-background rounded-t-[24px] min-h-screen -mt-6 relative z-10 pb-24", className)}>
      {children}
    </div>
  );
}
