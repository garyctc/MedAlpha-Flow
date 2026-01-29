import * as React from "react";
import { getNotifications, sortByCreatedAtDesc, type CmsNotification } from "@/lib/notifications";
import { getLocale, type Locale } from "@/i18n";

type ReadMap = Record<string, string>; // notificationId -> readAt ISO

type NotificationsContextValue = {
  notifications: CmsNotification[];
  promos: CmsNotification[];
  readMap: ReadMap;
  unreadCount: number;
  unreadPromoCount: number;
  unreadTipCount: number;
  isRead: (id: string) => boolean;
  markRead: (id: string) => void;
};

const READ_STORAGE_KEY = "docliq.notifications.read.v1";

function safeParseReadMap(raw: string | null): ReadMap {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as ReadMap;
  } catch {
    return {};
  }
}

function persistReadMap(map: ReadMap): void {
  try {
    localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore write failures
  }
}

function cleanupReadMap(map: ReadMap, ids: Set<string>): ReadMap {
  const next: ReadMap = {};
  for (const [id, readAt] of Object.entries(map)) {
    if (ids.has(id)) next[id] = readAt;
  }
  return next;
}

const NotificationsContext = React.createContext<NotificationsContextValue | null>(null);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>(getLocale);

  // Listen for language changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      setLocale(getLocale());
    };
    window.addEventListener("storage", handleStorageChange);
    // Also check periodically for in-app changes
    const interval = setInterval(() => {
      const currentLocale = getLocale();
      setLocale(prev => prev !== currentLocale ? currentLocale : prev);
    }, 500);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const notifications = React.useMemo(() => sortByCreatedAtDesc(getNotifications(locale)), [locale]);
  const promos = React.useMemo(() => notifications.filter((n) => n.kind === "promo"), [notifications]);

  const [readMap, setReadMap] = React.useState<ReadMap>(() =>
    safeParseReadMap(typeof window === "undefined" ? null : localStorage.getItem(READ_STORAGE_KEY))
  );

  React.useEffect(() => {
    const ids = new Set(notifications.map((n) => n.id));
    const cleaned = cleanupReadMap(readMap, ids);
    if (Object.keys(cleaned).length !== Object.keys(readMap).length) {
      setReadMap(cleaned);
      persistReadMap(cleaned);
    }
  }, [notifications, readMap]);

  const isRead = React.useCallback((id: string) => Boolean(readMap[id]), [readMap]);

  const markRead = React.useCallback((id: string) => {
    setReadMap((prev) => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: new Date().toISOString() };
      persistReadMap(next);
      return next;
    });
  }, []);

  const unreadCount = React.useMemo(
    () => notifications.reduce((acc, n) => acc + (readMap[n.id] ? 0 : 1), 0),
    [notifications, readMap]
  );

  const unreadPromoCount = React.useMemo(
    () => promos.reduce((acc, n) => acc + (readMap[n.id] ? 0 : 1), 0),
    [promos, readMap]
  );

  const unreadTipCount = React.useMemo(
    () => notifications.filter((n) => n.kind === "tip").reduce((acc, n) => acc + (readMap[n.id] ? 0 : 1), 0),
    [notifications, readMap]
  );

  const value = React.useMemo<NotificationsContextValue>(
    () => ({ notifications, promos, readMap, unreadCount, unreadPromoCount, unreadTipCount, isRead, markRead }),
    [notifications, promos, readMap, unreadCount, unreadPromoCount, unreadTipCount, isRead, markRead]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications(): NotificationsContextValue {
  const ctx = React.useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}

