import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Bell, Plus, Stethoscope, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateBadge } from "@/components/ui/date-badge";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale } from "@/i18n";
import { getUserProfile, getUserAppointments, clearBookingDraft, saveBookingDraft } from "@/lib/storage";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { useNotifications } from "@/contexts/NotificationsContext";
import type { UserProfile, Appointment } from "@/types/storage";
import userAvatar from "@assets/generated_images/professional_user_avatar_for_healthcare_app.png";
import { DEFAULT_DOCTOR_AVATAR } from "@/lib/constants/doctors";

// Suggested cards data with images
const suggestedCards = [
  {
    id: "vaccination",
    category: "VACCINATION",
    title: "Stay protected",
    description: "Book your seasonal vaccinations and keep your immunization records up to date.",
    image: "https://images.unsplash.com/photo-1632053001332-2f0e82df8c53?w=400&h=300&fit=crop",
  },
  {
    id: "vaccination",
    category: "VACCINATION",
    title: "Flu Shot Available",
    description: "Protect yourself this season with a free flu vaccination.",
    image: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=400&h=300&fit=crop",
  },
  {
    id: "mental-health",
    category: "MENTAL HEALTH",
    title: "Stress Management",
    description: "Learn techniques to manage daily stress effectively.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
  },
];

// Health service tiles
const healthServices = [
  { id: "gp", label: "GP", icon: Stethoscope, path: "/booking/entry" },
  { id: "records", label: "Records", icon: FileText, path: "/history" },
];

function SuggestedCarousel() {
  const { t } = useTranslation();
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });

  return (
    <div className="overflow-hidden px-5" ref={emblaRef}>
      <div className="flex gap-3">
        {suggestedCards.map((card) => (
          <div key={card.id} className="flex-[0_0_72%] min-w-0">
            <div className="bg-card rounded-3xl overflow-hidden shadow-[var(--shadow-card)] border border-border">
              {/* Image with gradient overlay on left */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay on left edge for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                {/* Category tag */}
                <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-[10px] font-semibold tracking-wide rounded-md">
                  {card.category}
                </span>
              </div>
              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground">{card.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{card.description}</p>
                <Button variant="link" className="text-primary h-auto p-0 text-sm font-medium">
                  {t("common.buttons.viewDetails")}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const locale = getLocale();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [upcomingAppointment, setUpcomingAppointment] = useState<Appointment | null>(null);
  const { unreadCount } = useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => {
      const userProfile = getUserProfile();
      const appointments = getUserAppointments();
      const upcoming = appointments.find(a => a.status === 'upcoming');

      setProfile(userProfile);
      setUpcomingAppointment(upcoming || null);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const firstName = profile?.firstName || "Alex";

  return (
    <div className="min-h-screen bg-background pb-32" data-testid="home-screen">
      {/* Header */}
      <header className="px-5 pt-12 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{t("home.greeting.welcome")}</p>
            <h1 className="text-2xl font-semibold text-foreground mt-0.5">
              {t("home.greeting.goodDay", { name: firstName })}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/notifications"
              className="relative text-foreground hover:text-primary transition-colors"
              aria-label="Notifications"
            >
              <Bell size={24} strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
            <Link href="/profile" className="block">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                <img
                  src={userAvatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="space-y-6">
        {isLoading ? (
          <div className="px-5">
            <LoadingSkeleton variant="page" />
          </div>
        ) : (
          <>
            {/* Suggested Section */}
            <section className="space-y-3">
              <div className="flex items-center justify-between px-5">
                <h2 className="font-semibold text-lg text-foreground">{t("home.sections.suggested")}</h2>
                <button className="text-sm font-medium text-primary">{t("common.buttons.showAll")}</button>
              </div>
              <SuggestedCarousel />
            </section>

            {/* Next Appointment Section */}
            <section className="px-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-foreground">{t("home.sections.nextAppointment")}</h2>
                {upcomingAppointment && (
                  <Link href="/appointments" className="text-sm font-medium text-primary">
                    {t("common.buttons.seeAll")}
                  </Link>
                )}
              </div>

              {upcomingAppointment ? (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLocation(`/appointments/${upcomingAppointment.id}`)}
                  className="w-full bg-card rounded-3xl p-4 shadow-[var(--shadow-card)] border border-border flex items-center gap-4 text-left"
                >
                  {/* Doctor photo */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                      <img
                          src={upcomingAppointment.doctorImage || DEFAULT_DOCTOR_AVATAR}
                          alt={upcomingAppointment.doctor}
                          className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Verification badge */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{upcomingAppointment.doctor}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {upcomingAppointment.specialty} • {upcomingAppointment.type === 'video' ? 'Video' : 'Check-up'}
                    </p>
                  </div>

                  {/* Date badge with time */}
                  <div className="flex-shrink-0 text-center">
                    <DateBadge date={new Date(upcomingAppointment.date)} />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatLocalTime(upcomingAppointment.time, locale)}
                    </p>
                  </div>
                </motion.button>
              ) : (
                <div className="bg-card rounded-3xl border border-dashed border-border p-8 text-center">
                  <p className="text-muted-foreground">{t("home.empty.title")}</p>
                  <Link
                    href="/booking/entry"
                    onClick={() => {
                      clearBookingDraft();
                      saveBookingDraft({ type: 'in-person' });
                    }}
                  >
                    <Button variant="link" className="text-primary mt-2">{t("home.empty.cta")}</Button>
                  </Link>
                </div>
              )}
            </section>

            {/* Health Services Grid */}
            <section className="px-5 space-y-3">
              <h2 className="font-semibold text-lg text-foreground">{t("home.sections.healthServices")}</h2>
              <div className="grid grid-cols-2 gap-3">
                {healthServices.map((service) => (
                  <Link
                    key={service.id}
                    href={service.path}
                    onClick={() => {
                      if (service.id === 'gp') {
                        clearBookingDraft();
                        saveBookingDraft({ type: 'in-person' });
                      }
                    }}
                  >
                    <motion.div
                      whileTap={{ scale: 0.97 }}
                      className="bg-card rounded-2xl p-4 shadow-[var(--shadow-soft)] border border-border flex flex-col items-center gap-3 text-center hover:border-primary/20 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <service.icon size={24} className="text-primary" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{service.label}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Fixed Book Appointment CTA */}
      <div className="fixed bottom-24 left-0 right-0 px-5 max-w-[375px] mx-auto z-40">
        <Link
          href="/booking/entry"
          onClick={() => {
            clearBookingDraft();
            saveBookingDraft({ type: 'in-person' });
          }}
          className="block"
        >
          <Button className="w-full h-12 rounded-2xl text-base font-semibold gap-2">
            <Plus size={20} strokeWidth={2} />
            {t("home.cta.bookAppointment")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
