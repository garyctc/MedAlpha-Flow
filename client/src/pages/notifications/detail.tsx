import * as React from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";

function formatTimestamp(iso: string, locale: string): string {
  const dt = new Date(iso);
  if (Number.isNaN(dt.getTime())) return "";
  return format(dt, locale === 'de' ? "dd.MM.yyyy HH:mm" : "MMM dd, yyyy h:mm a");
}

export default function NotificationDetail({ params }: { params: { id: string } }) {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const { notifications, markRead } = useNotifications();
  const notification = React.useMemo(
    () => notifications.find((n) => n.id === params.id) ?? null,
    [notifications, params.id]
  );

  React.useEffect(() => {
    if (!notification) return;
    markRead(notification.id);
  }, [markRead, notification]);

  if (!notification) {
    return (
      <div className="min-h-screen bg-background pb-10">
        <SubPageHeader title="Notification Details" />
        <main className="p-5">
          <p className="text-sm text-muted-foreground">Notification not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <SubPageHeader title="Notification Details" />

      <main className="p-5 space-y-6">
        <div className="space-y-2">
          <h1 className="text-lg font-semibold text-foreground">{notification.title}</h1>
          <p className="text-xs text-muted-foreground">{formatTimestamp(notification.createdAt, locale)}</p>
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] p-4">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{notification.body}</p>
        </div>

        {notification.url ? (
          <Button asChild size="lg" className="w-full">
            <a href={notification.url} target="_blank" rel="noreferrer">
              Find out more
            </a>
          </Button>
        ) : null}
      </main>
    </div>
  );
}

