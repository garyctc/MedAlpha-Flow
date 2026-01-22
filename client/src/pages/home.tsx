import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Bell, Calendar, Pill, ChevronLeft, ChevronRight, MapPin, Building, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { formatLocalDayNumber, formatLocalMonthShort, formatLocalTime, getLocale } from "@/i18n";
import { FEATURES } from "@/lib/features";
import { useNotifications } from "@/contexts/NotificationsContext";

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
  // Toggle this to see empty state
  const hasAppointments = true; 
  const { t } = useTranslation();
  const locale = getLocale();
  const { unreadCount, promos } = useNotifications();

  const upcomingDateIso = "2026-01-24";
  const upcomingTime24 = "10:00";
  const upcomingMonth = formatLocalMonthShort(upcomingDateIso, locale);
  const upcomingDay = formatLocalDayNumber(upcomingDateIso, locale);
  const upcomingTime = formatLocalTime(upcomingTime24, locale);

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
        {/* Health Services */}
        <section className="space-y-4">
          <h2 className="font-bold text-lg text-foreground">{t("home.sections.healthServices")}</h2>
          <div className={FEATURES.prescriptionEnabled ? "grid grid-cols-3 gap-4" : "grid grid-cols-2 gap-4"}>
          {/* In-Person Appointment (Curaay) */}
          <Link href="/booking/specialty" className="h-full">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full h-full bg-card p-5 rounded-lg shadow-[var(--shadow-card)] border border-border flex flex-col items-start gap-4 text-left hover:border-purple-200 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Building size={24} />
              </div>
              <div>
                <span className="block font-bold text-foreground group-hover:text-purple-600 transition-colors">
                  {t("booking.type.inPerson.title")}
                </span>
                <span className="text-xs text-muted-foreground mt-1 block">{t("booking.type.inPerson.subtitle")}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide mt-2 block">
                  Powered by Curaay
                </span>
              </div>
            </motion.button>
          </Link>

          {/* Video Consultation (Teleclinic) */}
          <Link href="/teleclinic/simulated" className="h-full">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full h-full bg-card p-5 rounded-lg shadow-[var(--shadow-card)] border border-border flex flex-col items-start gap-4 text-left hover:border-cyan-200 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <Video size={24} />
              </div>
              <div>
                <span className="block font-bold text-foreground group-hover:text-cyan-600 transition-colors">
                  {t("booking.type.video.title")}
                </span>
                <span className="text-xs text-muted-foreground mt-1 block">{t("booking.type.video.subtitle")}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide mt-2 block">
                  {t("booking.type.video.partner")}
                </span>
              </div>
            </motion.button>
          </Link>

          {/* Prescription (conditional) */}
          {FEATURES.prescriptionEnabled && (
            <Link href="/prescriptions" className="h-full">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full h-full bg-card p-5 rounded-lg shadow-[var(--shadow-card)] border border-border flex flex-col items-start gap-4 text-left hover:border-emerald-200 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Pill size={24} />
                </div>
                <div>
                  <span className="block font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                    {t("home.features.redeem.title")}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1 block">{t("home.features.redeem.subtitle")}</span>
                </div>
              </motion.button>
            </Link>
          )}
          </div>
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
          
          {hasAppointments ? (
            <Link href="/appointments/detail">
            <Card className="border-none shadow-[var(--shadow-card)] overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform">
               <CardContent className="p-0">
                 <div className="flex">
                    <div className="bg-accent w-20 flex flex-col items-center justify-center border-r border-border p-2">
                       <span className="text-xs font-bold text-primary uppercase">{upcomingMonth}</span>
                       <span className="text-2xl font-bold text-foreground">{upcomingDay}</span>
                       <span className="text-xs font-medium text-muted-foreground mt-1">{upcomingTime}</span>
                    </div>
                    <div className="p-4 flex-1 flex justify-between items-center">
                       <div>
                         <h4 className="font-bold text-foreground">Dr. Sarah Johnson</h4>
                         <p className="text-sm text-muted-foreground">{t("home.upcoming.subtitle")}</p>
                         <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                           <MapPin size={12} />
                           <span>Curaay Clinic, Downtown</span>
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
           <h3 className="font-bold text-lg text-foreground mb-4">{t("home.sections.recent")}</h3>
           <div className="bg-card rounded-lg border border-border shadow-[var(--shadow-card)] p-4 space-y-4">
              {FEATURES.prescriptionEnabled && (
                <>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <Pill size={18} />
                     </div>
                     <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{t("home.recent.prescription.title")}</p>
                        <p className="text-xs text-muted-foreground">{t("home.recent.prescription.subtitle")}</p>
                     </div>
                     <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                       {t("common.status.completed")}
                     </span>
                  </div>
                  <div className="h-px bg-border w-full" />
                </>
              )}
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
      </main>
    </div>
  );
}
