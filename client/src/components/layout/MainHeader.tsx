import { Link } from "wouter";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import appLogo from "@/assets/app-logo.svg";
import { branding } from "@/config/branding";
import { useNotifications } from "@/contexts/NotificationsContext";
import { getUserProfile } from "@/lib/storage";

interface MainHeaderProps {
  title?: string;
  className?: string;
  showProfile?: boolean;
  showNotifications?: boolean;
  rightElement?: React.ReactNode;
}

/**
 * MainHeader is the branded header for main/tab screens.
 * Shows logo, app name (or custom title), and optional profile avatar.
 */
export default function MainHeader({
  title,
  className,
  showProfile = true,
  showNotifications = true,
  rightElement
}: MainHeaderProps) {
  const { unreadCount } = useNotifications();
  const profile = getUserProfile();

  return (
    <header className={cn("bg-primary pb-6", className)}>
      <div className="px-6 py-4 pt-12">
        <div className="flex justify-between items-center min-h-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <h1 className="text-xl font-bold text-white font-display tracking-tight">
              {title || branding.appName}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {rightElement}
            {showNotifications && (
              <Link
                href="/notifications"
                className="text-white/80 hover:text-white transition-colors relative inline-flex items-center justify-center"
                aria-label="Notifications"
              >
                <Bell size={22} />
                {unreadCount > 0 ? (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-primary">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                ) : null}
              </Link>
            )}
            {showProfile && (
              <Link
                href="/profile"
                className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center overflow-hidden"
                aria-label="Profile"
              >
                <span className="text-white font-semibold text-sm">
                  {profile?.firstName?.[0] || 'U'}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
