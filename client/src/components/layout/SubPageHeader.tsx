import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import appLogo from "@/assets/app-logo.svg";
import { branding } from "@/config/branding";

interface SubPageHeaderProps {
  title: string;
  backPath?: string;
  className?: string;
  showLogo?: boolean;
}

export default function SubPageHeader({ title, backPath, className, showLogo = false }: SubPageHeaderProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    // Use backPath if provided (explicit navigation target)
    // Otherwise fall back to history.back() for natural browser behavior
    if (backPath) {
      setLocation(backPath);
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/home");
    }
  };

  return (
    <header className={cn("bg-background px-4 py-4 flex items-center gap-3 sticky top-0 z-10", className)}>
      <button
        onClick={handleBack}
        className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors -ml-2"
      >
        <ChevronLeft size={24} strokeWidth={1.5} />
      </button>
      {showLogo && (
        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
          <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain" />
        </div>
      )}
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
    </header>
  );
}
