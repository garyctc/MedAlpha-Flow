import { Link, useLocation } from "wouter";
import { Home, Calendar, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const [location] = useLocation();

  const tabs = [
    { name: "Home", icon: Home, path: "/home" },
    { name: "Appointments", icon: Calendar, path: "/appointments" },
    { name: "History", icon: Clock, path: "/history" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  // Don't show on splash, login, or teleclinic (simulates external browser)
  if (
    location === "/" ||
    location === "/login" ||
    location.startsWith("/teleclinic") ||
    location.startsWith("/notifications")
  )
    return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border max-w-[375px] mx-auto safe-area-bottom">
      <div className="grid grid-cols-4 items-center pt-3 pb-2 w-full">
        {tabs.map((tab) => {
          const isActive = location === tab.path || location.startsWith(tab.path + "/");
          return (
            <Link
              key={tab.name}
              href={tab.path}
              className="flex flex-col items-center justify-center w-full gap-1"
            >
              <tab.icon
                size={24}
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-primary" : "text-[hsl(226_12%_50%)]"
                )}
              />
              <span className={cn(
                "text-xs font-medium transition-colors duration-200",
                 isActive ? "text-primary" : "text-[hsl(226_12%_50%)]"
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
