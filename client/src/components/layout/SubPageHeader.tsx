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
    // Always try history back first if no specific path overrides it, 
    // or if we want natural browser behavior. 
    // But usually backPath is explicit. 
    // If the user wants "previous screen I was in", standard history.back() is best.
    // However, sometimes we need to enforce a path if history is empty or external.
    
    // For this prototype, let's prioritize history.back() if backPath is NOT forced, 
    // OR if the user explicitly requested "previous screen".
    // Actually, checking the user request: they want to go back to WHERE THEY WERE.
    // The current implementation prefers `backPath`.
    // If I change it to prefer history.back() when available, it might solve it.
    
    // BUT wouter's setLocation pushes new state.
    // window.history.back() pops.
    
    if (window.history.length > 1) {
       window.history.back();
    } else if (backPath) {
       setLocation(backPath);
    } else {
       setLocation("/home");
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
