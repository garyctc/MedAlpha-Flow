export type NotificationKind = "promo" | "tip";

export type CmsNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  url?: string;
  imageUrl?: string;
  createdAt: string; // ISO
};

export const demoNotifications: CmsNotification[] = [
  {
    id: "promo-free-check-week",
    kind: "promo",
    title: "Free health check week",
    body: "Book a basic screening this week. Limited slots.",
    url: "https://example.com/free-health-check",
    imageUrl: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=225&fit=crop",
    createdAt: "2026-01-20T14:01:00Z",
  },
  {
    id: "promo-new-clinic-partner",
    kind: "promo",
    title: "New clinic partner",
    body: "MedAlpha now available at Riverside Clinic.",
    url: "https://example.com/clinic-partner",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=225&fit=crop",
    createdAt: "2026-01-12T09:15:00Z",
  },
  {
    id: "promo-refer-friend",
    kind: "promo",
    title: "Refer a friend",
    body: "Invite a friend to join MedAlpha Connect.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=225&fit=crop",
    createdAt: "2026-01-08T16:54:00Z",
  },
  {
    id: "tip-hydration",
    kind: "tip",
    title: "Hydration reminder",
    body: "Aim for 6 to 8 cups today.",
    createdAt: "2026-01-07T08:00:00Z",
  },
  {
    id: "tip-sleep-routine",
    kind: "tip",
    title: "Sleep routine",
    body: "Try consistent sleep and wake times.",
    createdAt: "2026-01-05T18:30:00Z",
  },
  {
    id: "tip-cold-season",
    kind: "tip",
    title: "Cold season",
    body: "Wash hands, rest, and hydrate.",
    createdAt: "2026-01-02T10:10:00Z",
  },
];

export function sortByCreatedAtDesc(items: CmsNotification[]): CmsNotification[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

