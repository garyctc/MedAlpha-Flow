import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Bell, Plus, Stethoscope, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentCard } from "@/components/appointment-card";
import { useTranslation } from "react-i18next";
import { getUserProfile, clearBookingDraft, saveBookingDraft } from "@/lib/storage";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { useNotifications } from "@/contexts/NotificationsContext";
import type { CmsNotification } from "@/lib/notifications";
import type { UserProfile } from "@/types/storage";
import appLogo from "@/assets/app-logo.svg";
import { HOME_APPOINTMENT_MOCKS, HOME_APPOINTMENT_STATUS_ORDER } from "@/lib/appointments/home-mocks";

// Health service tiles
const healthServices = [
  { id: "gp", label: "GP", icon: Stethoscope, path: "/booking/entry" },
  { id: "records", label: "Records", icon: FileText, path: "/history" },
];

function PromoCarousel({ promos }: { promos: CmsNotification[] }) {
  const { t } = useTranslation();
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });

  // Show max 5 recent promos with images
  const displayPromos = promos.filter((p) => p.image).slice(0, 5);

  if (displayPromos.length === 0) return null;

  return (
    <div className="overflow-hidden px-5" ref={emblaRef}>
      <div className="flex gap-3">
        {displayPromos.map((promo) => (
          <div key={promo.id} className="flex-[0_0_72%] min-w-0">
            <div className="bg-card rounded-3xl overflow-hidden shadow-[var(--shadow-card)] border border-border">
              {/* Image with gradient overlay on left */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay on left edge for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
              </div>
              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground">{promo.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{promo.body}</p>
                <Button variant="link" className="text-primary h-auto p-0 text-sm font-medium">
                  {t("common.buttons.learnMore")}
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
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { unreadCount, promos } = useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => {
      const userProfile = getUserProfile();

      setProfile(userProfile);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const firstName = profile?.firstName || "Alex";
  const orderedHomeAppointments = HOME_APPOINTMENT_STATUS_ORDER
    .map((key) => HOME_APPOINTMENT_MOCKS.find((item) => item.statusKey === key))
    .filter((item): item is (typeof HOME_APPOINTMENT_MOCKS)[number] => Boolean(item));

  return (
    <div className="min-h-screen bg-background pb-32" data-testid="home-screen">
      {/* Header */}
      <header className="px-5 pt-12 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img src={appLogo} alt="DoctoliQ" className="w-10 h-10" />
            <div>
              <p className="text-sm text-muted-foreground">{t("home.greeting.welcome")}</p>
              <h1 className="text-2xl font-semibold text-foreground mt-0.5">
                {t("home.greeting.goodDay", { name: firstName })}
              </h1>
            </div>
          </div>
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
                <h2 className="font-semibold text-lg text-foreground">{t("home.sections.discoverMore")}</h2>
              </div>
              <PromoCarousel promos={promos} />
            </section>

            {/* Next Appointment Section */}
            <section className="px-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-foreground">{t("home.appointments.title")}</h2>
              </div>

              {orderedHomeAppointments.map((apt) => (
                <AppointmentCard
                  key={apt.id}
                  data={{
                    ...apt,
                    statusLabel: t(`home.appointments.status.${apt.statusKey}`),
                  }}
                  onClick={() => setLocation("/appointments")}
                />
              ))}
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
