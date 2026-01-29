import * as React from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { useNotifications } from "@/contexts/NotificationsContext";
import { cn } from "@/lib/utils";

type TabValue = "all" | "promo" | "tip";

function formatTimestamp(iso: string): string {
  const dt = new Date(iso);
  if (Number.isNaN(dt.getTime())) return "";
  return format(dt, "dd MMM yyyy HH:mm");
}

function NotificationRow({
  id,
  title,
  body,
  createdAt,
  isRead,
}: {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
}) {
  return (
    <Link href={`/notifications/${id}`} className="block">
      <div className="px-4 py-4 flex items-start gap-3 hover:bg-muted/40 transition-colors">
        <div className="pt-1">
          {!isRead ? (
            <span className="block h-2.5 w-2.5 rounded-full bg-red-500" aria-label="Unread" />
          ) : (
            <span className="block h-2.5 w-2.5 rounded-full bg-transparent" aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className={`text-lg leading-tight ${isRead ? "font-medium" : "font-bold"} text-foreground line-clamp-1`}
              >
                {title}
              </p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{body}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{formatTimestamp(createdAt)}</p>
        </div>
      </div>
    </Link>
  );
}

function NotificationsTab({ value }: { value: TabValue }) {
  const { notifications, isRead } = useNotifications();

  const filtered = React.useMemo(() => {
    if (value === "all") return notifications;
    return notifications.filter((n) => n.kind === value);
  }, [notifications, value]);

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-foreground">No notifications yet</p>
        <p className="text-xs text-muted-foreground mt-1">Check back later</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
      {filtered.map((n, idx) => (
        <div key={n.id}>
          <NotificationRow
            id={n.id}
            title={n.title}
            body={n.body}
            createdAt={n.createdAt}
            isRead={isRead(n.id)}
          />
          {idx < filtered.length - 1 ? <div className="h-px bg-border mx-4" /> : null}
        </div>
      ))}
    </div>
  );
}

export default function NotificationsList() {
  const [activeTab, setActiveTab] = React.useState<TabValue>("all");
  const { unreadCount, unreadPromoCount, unreadTipCount } = useNotifications();

  const getUnreadCount = (tabId: TabValue): number => {
    switch (tabId) {
      case "all":
        return unreadCount;
      case "promo":
        return unreadPromoCount;
      case "tip":
        return unreadTipCount;
    }
  };

  const formatBadgeCount = (count: number): string => {
    return count > 99 ? "99+" : count.toString();
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <SubPageHeader title="Notifications" />

      <main className="p-5 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label="Notification filters">
          {[
            { id: "all" as const, label: "All" },
            { id: "promo" as const, label: "Promos" },
            { id: "tip" as const, label: "Tips" },
          ].map((tab) => {
            const unreadTabCount = getUnreadCount(tab.id);
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap flex items-center gap-1",
                  activeTab === tab.id
                    ? "bg-primary text-white border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                )}
              >
                {tab.label}
                {unreadTabCount > 0 && (
                  <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold ml-1">
                    {formatBadgeCount(unreadTabCount)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div role="tabpanel">
          <NotificationsTab value={activeTab} />
        </div>
      </main>
    </div>
  );
}
