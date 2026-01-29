export type NotificationKind = "promo" | "tip";

export type CmsNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  url?: string;
  image?: string;
  createdAt: string; // ISO
};

export const demoNotifications: CmsNotification[] = [
  {
    id: "promo-vaccination-program",
    kind: "promo",
    title: "Vaccination Program",
    body: "Stay protected with our comprehensive vaccination services. Book your appointment today.",
    image: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=400&h=300&fit=crop",
    createdAt: "2026-01-26T12:00:00Z",
  },
  {
    id: "promo-free-check-week",
    kind: "promo",
    title: "Free health check week",
    body: "Book a basic screening this week. Limited slots.",
    url: "https://example.com/free-health-check",
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
    createdAt: "2026-01-20T14:01:00Z",
  },
  {
    id: "promo-new-clinic-partner",
    kind: "promo",
    title: "New clinic partner",
    body: "DocliQ now available at Riverside Clinic.",
    url: "https://example.com/clinic-partner",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    createdAt: "2026-01-12T09:15:00Z",
  },
  {
    id: "promo-refer-friend",
    kind: "promo",
    title: "Refer a friend",
    body: "Invite a friend to join DocliQ Connect.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
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

