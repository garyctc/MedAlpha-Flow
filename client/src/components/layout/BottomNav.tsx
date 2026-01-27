import { Link, useLocation } from "wouter";
import { Home, Calendar, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function BottomNav() {
  const [location] = useLocation();
  const { t } = useTranslation();

  const tabs = [
    { name: t("nav.home"), icon: Home, path: "/home" },
    { name: t("nav.appointments"), icon: Calendar, path: "/appointments" },
    { name: t("nav.history"), icon: Clock, path: "/history" },
    { name: t("nav.profile"), icon: User, path: "/profile" },
  ];

  // Only hide on auth screens and video calls
  if (
    location === "/" ||
    location === "/login" ||
    location.startsWith("/register") ||
    location.startsWith("/sso") ||
    location.startsWith("/teleclinic")
  )
    return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border h-20 pb-safe max-w-[375px] mx-auto">
      <div className="grid grid-cols-4 items-center h-full pt-2 pb-4">
        {tabs.map((tab) => {
          const isActive = location === tab.path || location.startsWith(tab.path + "/");
          return (
            <Link
              key={tab.name}
              href={tab.path}
              className="flex flex-col items-center justify-center w-full h-full gap-1"
            >
              <tab.icon
                size={24}
                strokeWidth={isActive ? 2 : 1.5}
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span className={cn(
                "text-[10px] font-medium transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
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
