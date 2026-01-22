import * as React from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Badge } from "@/components/ui/badge";
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
  showKindPill,
  kindLabel,
}: {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
  showKindPill: boolean;
  kindLabel: string;
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
                className={`text-sm leading-tight ${isRead ? "font-medium" : "font-bold"} text-foreground line-clamp-1`}
              >
                {title}
              </p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{body}</p>
            </div>
            {showKindPill ? (
              <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                {kindLabel}
              </Badge>
            ) : null}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">{formatTimestamp(createdAt)}</p>
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
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {filtered.map((n, idx) => (
        <div key={n.id}>
          <NotificationRow
            id={n.id}
            title={n.title}
            body={n.body}
            createdAt={n.createdAt}
            isRead={isRead(n.id)}
            showKindPill={value === "all"}
            kindLabel={n.kind === "promo" ? "Promo" : "Tip"}
          />
          {idx < filtered.length - 1 ? <div className="h-px bg-border mx-4" /> : null}
        </div>
      ))}
    </div>
  );
}

export default function NotificationsList() {
  const [activeTab, setActiveTab] = React.useState<TabValue>("all");

  return (
    <div className="min-h-screen bg-background pb-10">
      <SubPageHeader title="Notifications" />

      <main className="p-5 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label="Notification filters">
          {[
            { id: "all" as const, label: "All" },
            { id: "promo" as const, label: "Promos" },
            { id: "tip" as const, label: "Tips" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div role="tabpanel">
          <NotificationsTab value={activeTab} />
        </div>
      </main>
    </div>
  );
}
