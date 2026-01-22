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
  rightElement?: React.ReactNode;
}

export default function SubPageHeader({ title, backPath, className, showLogo = false, rightElement }: SubPageHeaderProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    if (backPath) {
      setLocation(backPath);
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/home");
    }
  };

  return (
    <header className={cn("bg-primary pb-6", className)}>
      <div className="px-4 py-4 pt-12">
        <div className="flex items-center gap-3 min-h-10">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          {showLogo && (
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
              <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain brightness-0 invert" />
            </div>
          )}
          <h1 className="text-lg font-bold text-white font-display flex-1">{title}</h1>
          {rightElement && (
            <div className="flex items-center">
              {rightElement}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
