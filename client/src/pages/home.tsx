import * as React from "react";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Bell, Calendar, ChevronRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { formatLocalDayNumber, formatLocalMonthShort, formatLocalTime, getLocale } from "@/i18n";
import { getUserProfile, getUserAppointments } from "@/lib/storage";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { PromoCard, type PromoCardProps } from "@/components/ui/promo-card";
import { useNotifications } from "@/contexts/NotificationsContext";
import type { UserProfile, Appointment } from "@/types/storage";

const MAX_CAROUSEL_ITEMS = 5;

function DiscoverMoreCarousel({ promos }: { promos: PromoCardProps[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const displayedPromos = promos.slice(0, MAX_CAROUSEL_ITEMS);
  const scrollSnaps = React.useMemo(() => emblaApi?.scrollSnapList() ?? [], [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (displayedPromos.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {displayedPromos.map((promo) => (
            <div key={promo.id} className="flex-[0_0_84%] min-w-0">
              <PromoCard {...promo} />
            </div>
          ))}
        </div>
      </div>

      {scrollSnaps.length > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-2" aria-label="Promo carousel pagination">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to promo ${idx + 1}`}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`h-2 w-2 rounded-full transition-colors ${
                idx === selectedIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
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
import { BookingIllustration } from "@/components/illustrations/BookingIllustration";

export default function Home() {
  const { t } = useTranslation();
  const locale = getLocale();
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

  // Format dates for upcoming appointment
  const upcomingDateIso = upcomingAppointment?.date || "";
  const upcomingTime24 = upcomingAppointment?.time || "";
  const upcomingMonth = upcomingDateIso ? formatLocalMonthShort(upcomingDateIso, locale) : "";
  const upcomingDay = upcomingDateIso ? formatLocalDayNumber(upcomingDateIso, locale) : "";
  const upcomingTime = upcomingTime24 ? formatLocalTime(upcomingTime24, locale) : "";

  return (
    <div className="min-h-screen bg-primary" data-testid="home-screen">
      {/* Header */}
      <header className="bg-primary pb-6">
        <div className="px-6 py-4 pt-12">
          <div className="flex justify-between items-center min-h-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <h1 className="text-xl font-bold text-white font-display tracking-tight">{branding.appName}</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/notifications"
                className="text-white/80 hover:text-white transition-colors relative inline-flex items-center justify-center"
                aria-label="Notifications"
              >
                <Bell size={22} />
                {unreadCount > 0 ? (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-primary">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                ) : null}
              </Link>
              <Link
                href="/profile"
                className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center overflow-hidden"
                aria-label="Profile"
              >
                <span className="text-white font-semibold text-sm">
                  {profile?.firstName?.[0] || 'U'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content area with rounded top corners */}
      <div className="bg-background rounded-t-[24px] min-h-screen -mt-6 relative z-10 pb-24">
        {promos.length > 0 ? (
          <section className="px-6 pb-6 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-foreground">{t("home.sections.discoverMore")}</h2>
              {promos.length > MAX_CAROUSEL_ITEMS && (
                <Link href="/notifications" className="text-sm font-medium text-primary hover:underline">
                  {t("common.buttons.seeAll")}
                </Link>
              )}
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="-mr-6">
              <DiscoverMoreCarousel promos={promos} />
            </motion.div>
          </section>
        ) : null}

      <main className="px-6 py-6 space-y-6">
        {isLoading ? (
          <LoadingSkeleton variant="page" />
        ) : (
        <>
        {/* Feature Card - Book Appointment Hero CTA */}
        <Link href="/booking/type" className="block">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary p-4 rounded-xl text-left hover:bg-primary/90 transition-all shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-primary-foreground">
                {t("home.features.book.title")}
              </span>
              <BookingIllustration className="w-20 h-16 flex-shrink-0 text-primary-foreground" />
            </div>
          </motion.button>
        </Link>

        {/* Upcoming Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg text-foreground">{t("home.sections.upcoming")}</h3>
            {hasAppointments && (
              <Link href="/appointments" className="text-sm font-medium text-primary hover:underline">
                {t("common.buttons.seeAll")}
              </Link>
            )}
          </div>

          {hasAppointments && upcomingAppointment ? (
            <Link href="/appointments/detail">
            <Card className="border border-border overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform">
               <CardContent className="p-0">
                 <div className="flex">
                    <div className="bg-accent w-20 flex flex-col items-center justify-center border-r border-border p-2">
                       <span className="text-xs font-bold text-primary uppercase">{upcomingMonth}</span>
                       <span className="text-2xl font-bold text-foreground">{upcomingDay}</span>
                       <span className="text-xs font-medium text-muted-foreground mt-1">{upcomingTime}</span>
                    </div>
                    <div className="p-4 flex-1 flex justify-between items-center">
                       <div>
                         <h4 className="font-bold text-foreground">{upcomingAppointment.doctor}</h4>
                         <p className="text-sm text-muted-foreground">{upcomingAppointment.specialty}</p>
                         <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                           <MapPin size={12} />
                           <span>{upcomingAppointment.clinic || t("home.upcoming.subtitle")}</span>
                         </div>
                       </div>
                       <Button size="icon" variant="ghost" className="text-muted-foreground">
                         <ChevronRight size={20} />
                       </Button>
                    </div>
                 </div>
               </CardContent>
            </Card>
            </Link>
          ) : (
            // Empty State
            <div className="bg-card rounded-lg border border-border border-dashed p-8 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-2">
                <Calendar size={32} />
              </div>
              <p className="font-medium text-foreground">{t("home.empty.title")}</p>
              <Link href="/booking/type">
                <Button variant="link" className="text-primary h-auto p-0">{t("home.empty.cta")}</Button>
              </Link>
            </div>
          )}
        </section>

        {/* Recent Activity Mini-List */}
        <section>
           <h3 className="font-bold text-lg text-foreground mb-3">{t("home.sections.recent")}</h3>
           <div className="bg-card rounded-lg border border-border  p-4">
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
    </div>
  );
}
