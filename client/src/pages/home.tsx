import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale } from "@/i18n";
import { getUserProfile, getUserAppointments, clearBookingDraft, saveBookingDraft } from "@/lib/storage";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { useNotifications } from "@/contexts/NotificationsContext";
import type { CmsNotification } from "@/lib/notifications";
import type { UserProfile, Appointment } from "@/types/storage";
import { AppointmentCard } from "@/components/appointment-card";
import { seedBookAgainDraft } from "@/lib/booking/intent";
import appLogo from "@/assets/app-logo.svg";

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
  const locale = getLocale();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [bookAgainAppointments, setBookAgainAppointments] = useState<Appointment[]>([]);
  const { unreadCount, promos } = useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => {
      const userProfile = getUserProfile();
      const appointments = getUserAppointments();
      const sorted = [...appointments].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const mine = sorted.filter((apt) => apt.status !== "completed").slice(0, 5);
      const bookAgain = sorted.filter((apt) => apt.status === "completed").slice(0, 5);

      setProfile(userProfile);
      setMyAppointments(mine);
      setBookAgainAppointments(bookAgain);
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

            {/* My Appointments Section */}
            <section className="px-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-foreground">
                  {t("home.sections.myAppointments", { defaultValue: "My Appointments" })}
                </h2>
                <Link href="/appointments" className="text-sm font-medium text-primary">
                  {t("common.buttons.seeAll")}
                </Link>
              </div>

              {myAppointments.length > 0 ? (
                <div className="space-y-3" data-testid="home-my-appointments-list">
                  {myAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      data={{
                        id: appointment.id,
                        status:
                          appointment.status === "processing"
                            ? "processing"
                            : appointment.status === "upcoming"
                              ? "upcoming"
                              : "past",
                        type: appointment.type,
                        doctor: appointment.doctor,
                        doctorImage: appointment.doctorImage,
                        role: appointment.specialty,
                        location: appointment.clinic,
                        date: `${formatLocalDate(appointment.date, locale)} • ${formatLocalTime(
                          appointment.time,
                          locale
                        )}`,
                        rawDate: appointment.date,
                        rawTime: formatLocalTime(appointment.time, locale),
                        subStatus:
                          appointment.status === "completed"
                            ? "completed"
                            : appointment.status === "cancelled"
                              ? "cancelled"
                              : appointment.status === "processing"
                                ? "processing"
                                : undefined,
                        matchStatus: appointment.matchStatus,
                      }}
                      onClick={() => setLocation(`/appointments/${appointment.id}`)}
                    />
                  ))}
                </div>
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

            {/* Book Again Section */}
            <section className="px-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-foreground">
                  {t("appointments.detail.bookAgain", { defaultValue: "Book Again" })}
                </h2>
                <Link href="/history" className="text-sm font-medium text-primary">
                  {t("common.buttons.seeAll")}
                </Link>
              </div>
              {bookAgainAppointments.length > 0 ? (
                <div className="space-y-3" data-testid="home-book-again-list">
                  {bookAgainAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      data={{
                        id: appointment.id,
                        status: "past",
                        type: appointment.type,
                        doctor: appointment.doctor,
                        doctorImage: appointment.doctorImage,
                        role: appointment.specialty,
                        location: appointment.clinic,
                        date: `${formatLocalDate(appointment.date, locale)} • ${formatLocalTime(
                          appointment.time,
                          locale
                        )}`,
                        rawDate: appointment.date,
                        rawTime: formatLocalTime(appointment.time, locale),
                        subStatus: appointment.status === "cancelled" ? "cancelled" : "completed",
                      }}
                      onClick={() => {
                        seedBookAgainDraft(appointment);
                        setLocation("/booking/slots");
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-3xl border border-dashed border-border p-6 text-center">
                  <p className="text-muted-foreground">
                    {t("home.bookAgain.empty", { defaultValue: "No completed appointments yet" })}
                  </p>
                </div>
              )}
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
