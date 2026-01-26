import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Bell, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale } from "@/i18n";
import { getUserProfile, getUserAppointments, clearBookingDraft, saveBookingDraft } from "@/lib/storage";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { useNotifications } from "@/contexts/NotificationsContext";
import type { UserProfile, Appointment } from "@/types/storage";
import { AppointmentCard } from "@/components/appointment-card";

function stableHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  return hash;
}

function DiscoverMoreCarousel() {
  const { promos } = useNotifications();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const scrollSnaps = React.useMemo(() => emblaApi?.scrollSnapList() ?? [], [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const gradients = [
    "from-sky-700 to-cyan-500",
    "from-indigo-700 to-sky-500",
    "from-teal-700 to-sky-500",
  ];

  if (promos.length === 0) return null;

  return (
    <div className="group relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {promos.map((promo) => {
            const gradient = gradients[stableHash(promo.id) % gradients.length];
            const content = (
              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} text-white p-6 h-40 ring-1 ring-white/10`}
              >
                <div className="absolute inset-0 opacity-80 bg-[radial-gradient(280px_140px_at_20%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold font-display leading-tight line-clamp-1">{promo.title}</h2>
                    <p className="text-white/90 text-sm leading-snug line-clamp-2 max-w-[90%]">{promo.body}</p>
                  </div>
                  {promo.url ? (
                    <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold">
                      Learn more
                    </span>
                  ) : null}
                </div>
              </div>
            );

            return (
              <div key={promo.id} className="flex-[0_0_84%] min-w-0">
                {promo.url ? (
                  <a
                    href={promo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="rounded-2xl">{content}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous promo"
        disabled={!canScrollPrev}
        onClick={() => emblaApi?.scrollPrev()}
        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/15 border border-white/20 text-white backdrop-blur-sm opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 disabled:opacity-40"
      >
        <ChevronLeft className="mx-auto" size={18} />
      </button>

      <button
        type="button"
        aria-label="Next promo"
        disabled={!canScrollNext}
        onClick={() => emblaApi?.scrollNext()}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/15 border border-white/20 text-white backdrop-blur-sm opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 disabled:opacity-40"
      >
        <ChevronRight className="mx-auto" size={18} />
      </button>

      {scrollSnaps.length > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-2" aria-label="Promo carousel pagination">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to promo ${idx + 1}`}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`h-2 w-2 rounded-full transition-colors ${
                idx === selectedIndex ? "bg-white" : "bg-white/30 hover:bg-white/45"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

import appLogo from "@/assets/app-logo.svg";
import { branding } from "@/config/branding";

export default function Home() {
  const { t } = useTranslation();
  const locale = getLocale();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [upcomingAppointment, setUpcomingAppointment] = useState<Appointment | null>(null);
  const { unreadCount, promos } = useNotifications();

  useEffect(() => {
    // Simulate loading delay for realism
    const timer = setTimeout(() => {
      const userProfile = getUserProfile();
      const appointments = getUserAppointments();
      // Find first upcoming appointment
      const upcoming = appointments.find(a => a.status === 'upcoming');

      setProfile(userProfile);
      setUpcomingAppointment(upcoming || null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const hasAppointments = !!upcomingAppointment;

  return (
    <div className="min-h-screen bg-background pb-24" data-testid="home-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-900 to-sky-700"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 bg-[radial-gradient(900px_400px_at_20%_20%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(700px_320px_at_90%_30%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(800px_380px_at_40%_120%,rgba(255,255,255,0.10),transparent_60%)]"
        />

        <header className="sticky top-0 z-10 bg-slate-950/35 backdrop-blur border-b border-white/10">
          <div className="px-5 py-4 pt-12">
            <div className="flex justify-between items-center min-h-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain" />
                </div>
                <h1 className="text-xl font-bold text-white font-display tracking-tight">{branding.appName}</h1>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/notifications"
                  className="text-white/90 hover:text-white transition-colors relative inline-flex items-center justify-center"
                  aria-label="Notifications"
                >
                  <Bell size={24} />
                  {unreadCount > 0 ? (
                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-950/35">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  ) : null}
                </Link>
              </div>
            </div>
          </div>
        </header>

        {promos.length > 0 ? (
          <section className="relative px-5 pb-6 pt-4 space-y-3">
            <h2 className="font-bold text-lg text-white/95">{t("home.sections.discoverMore")}</h2>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="-mr-5">
              <DiscoverMoreCarousel />
            </motion.div>
          </section>
        ) : null}
      </div>

      <main className="px-5 py-6 space-y-8">
        {isLoading ? (
          <LoadingSkeleton variant="page" />
        ) : (
        <>
        {/* Health Services */}
        <section>
          <h3 className="font-bold text-lg text-foreground mb-4">{t("home.sections.healthServices")}</h3>
          <Link
            href="/booking/entry"
            onClick={() => {
              clearBookingDraft();
              saveBookingDraft({ type: 'in-person' });
            }}
          >
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-card p-5 rounded-lg shadow-[var(--shadow-soft)] border border-border flex items-center gap-4 text-left hover:border-primary/20 hover:shadow-[var(--shadow-card)] transition-all group"
            >
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Calendar size={24} />
              </div>
              <div className="flex-1">
                <span className="block font-bold text-foreground group-hover:text-primary transition-colors">
                  {t("booking.type.inPerson.title")}
                </span>
                <span className="text-xs text-muted-foreground mt-1 block">{t("booking.type.inPerson.subtitle")}</span>
              </div>
              <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
          </Link>
        </section>

        {/* Upcoming Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-foreground">{t("home.sections.upcoming")}</h3>
            {hasAppointments && (
              <Link href="/appointments" className="text-sm font-medium text-primary hover:underline">
                {t("common.buttons.seeAll")}
              </Link>
            )}
          </div>

          {hasAppointments && upcomingAppointment ? (
            <AppointmentCard
              data={{
                id: upcomingAppointment.id,
                status: upcomingAppointment.status as "upcoming" | "past" | "processing",
                type: upcomingAppointment.type,
                doctor: upcomingAppointment.doctor,
                role: upcomingAppointment.specialty,
                location: upcomingAppointment.clinic,
                date: `${formatLocalDate(upcomingAppointment.date, locale)} • ${formatLocalTime(upcomingAppointment.time, locale)}`,
                subStatus: undefined
              }}
              onClick={() => setLocation(`/appointments/${upcomingAppointment.id}`)}
            />
          ) : (
            // Empty State
            <div className="bg-card rounded-lg border border-border border-dashed p-8 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-2">
                <Calendar size={32} />
              </div>
              <p className="font-medium text-foreground">{t("home.empty.title")}</p>
              <Link
                href="/booking/entry"
                onClick={() => {
                  clearBookingDraft();
                  saveBookingDraft({ type: 'in-person' });
                }}
              >
                <Button variant="link" className="text-primary h-auto p-0">{t("home.empty.cta")}</Button>
              </Link>
            </div>
          )}
        </section>

        {/* Recent Activity Mini-List */}
        <section>
           <h3 className="font-bold text-lg text-foreground mb-4">{t("home.sections.recent")}</h3>
           <div className="bg-card rounded-lg border border-border shadow-[var(--shadow-card)] p-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <Calendar size={18} />
                 </div>
                 <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{t("home.recent.appointment.title")}</p>
                    <p className="text-xs text-muted-foreground">{t("home.recent.appointment.subtitle")}</p>
                 </div>
                 <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                   {t("common.status.confirmed")}
                 </span>
              </div>
           </div>
        </section>
        </>
        )}
      </main>
    </div>
  );
}
