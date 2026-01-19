import { Link, useLocation } from "wouter";
import { Home, Calendar, Pill, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const [location] = useLocation();

  const tabs = [
    { name: "Home", icon: Home, path: "/home" },
    { name: "Appointments", icon: Calendar, path: "/appointments" },
    { name: "Prescriptions", icon: Pill, path: "/prescriptions" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  // Don't show on splash or login
  if (location === "/" || location === "/login") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 h-[80px] pb-safe">
      <div className="grid grid-cols-4 items-center h-14 max-w-[375px] mx-auto w-full">
        {tabs.map((tab) => {
          const isActive = location === tab.path;
          return (
            <Link 
              key={tab.name} 
              href={tab.path} 
              className="flex flex-col items-center justify-center w-full h-full space-y-1"
            >
              <tab.icon
                size={24}
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-primary fill-current" : "text-slate-400 stroke-[1.5px]"
                )}
              />
              <span className={cn(
                "text-[10px] font-medium transition-colors duration-200",
                 isActive ? "text-primary" : "text-slate-400"
              )}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
