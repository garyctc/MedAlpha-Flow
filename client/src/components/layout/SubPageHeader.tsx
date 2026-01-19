import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface SubPageHeaderProps {
  title: string;
  backPath?: string;
  className?: string;
}

export default function SubPageHeader({ title, backPath, className }: SubPageHeaderProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    if (backPath) {
      setLocation(backPath);
    } else {
      window.history.back();
    }
  };

  return (
    <header className={cn("bg-white px-4 py-4 flex items-center gap-4 border-b border-slate-100 sticky top-0 z-10", className)}>
      <button 
        onClick={handleBack}
        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-lg font-bold text-slate-900 font-display">{title}</h1>
    </header>
  );
}
