import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Bell, Calendar, ChevronRight, MapPin, ShoppingBag, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import avatarImage from "@assets/generated_images/professional_user_avatar_for_healthcare_app.png";
import { useTranslation } from "react-i18next";
import { formatLocalDayNumber, formatLocalMonthShort, formatLocalTime, getLocale } from "@/i18n";
import { getUserProfile, getUserAppointments } from "@/lib/storage";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import type { UserProfile, Appointment } from "@/types/storage";

function PromoCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const { t } = useTranslation();

  const banners = [
    {
      id: 1,
      title: t("home.promo.pharmacy.title"),
      subtitle: t("home.promo.pharmacy.subtitle"),
      gradient: "from-blue-600 to-cyan-500",
      icon: ShoppingBag,
      link: "/pharmacy/map"
    },
    {
      id: 2,
      title: t("home.promo.brands.title"),
      subtitle: t("home.promo.brands.subtitle"),
      gradient: "from-purple-600 to-pink-500",
      icon: Star,
      link: "/pharmacy/list"
    }
  ];

  return (
    <div className="overflow-hidden rounded-lg shadow-[var(--shadow-card)]" ref={emblaRef}>
      <div className="flex">
        {banners.map((banner) => (
          <div key={banner.id} className="flex-[0_0_100%] min-w-0">
             <div className={`relative overflow-hidden bg-gradient-to-br ${banner.gradient} text-white p-6 h-40 flex items-center`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="relative z-10 flex-1">
                  <h2 className="text-xl font-bold font-display mb-1">{banner.title}</h2>
                  <p className="text-white/90 text-sm mb-3 max-w-[80%]">
                    {banner.subtitle}
                  </p>
                  <Link href={banner.link}>
                    <Button size="sm" variant="secondary" className="h-8 px-4 text-xs font-bold bg-white/20 hover:bg-white/30 text-white border-none">
                      {t("home.promo.cta")}
                    </Button>
                  </Link>
                </div>
                <div className="relative z-10 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                   <banner.icon size={24} className="text-white" />
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import appLogo from "@/assets/app-logo.svg";

export default function Home() {
  const { t } = useTranslation();
  const locale = getLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [upcomingAppointment, setUpcomingAppointment] = useState<Appointment | null>(null);

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
    <div className="min-h-screen bg-background pb-24" data-testid="home-screen">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="px-5 py-4 pt-12">
          <div className="flex justify-between items-center min-h-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src={appLogo} alt="MedAlpha Connect Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-xl font-bold text-foreground font-display tracking-tight">MedAlpha Connect</h1>
            </div>
            <div className="flex items-center gap-4">
               <button className="text-muted-foreground hover:text-primary transition-colors relative">
                 <Bell size={24} />
                 <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-card"></span>
               </button>
               <Link href="/profile">
                 <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border shadow-[var(--shadow-soft)] cursor-pointer">
                   <img src={avatarImage} alt="Profile" className="w-full h-full object-cover" />
                 </div>
               </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-6 space-y-8">
        {isLoading ? (
          <LoadingSkeleton variant="page" />
        ) : (
        <>
        {/* Promo Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <PromoCarousel />
        </motion.div>

        {/* Feature Card */}
        <Link href="/booking/type">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-card p-5 rounded-lg shadow-[var(--shadow-soft)] border border-border flex items-center gap-4 text-left hover:border-primary/20 hover:shadow-[var(--shadow-card)] transition-all group"
          >
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Calendar size={24} />
            </div>
            <div className="flex-1">
              <span className="block font-bold text-foreground group-hover:text-primary transition-colors">
                {t("home.features.book.title")}
              </span>
              <span className="text-xs text-muted-foreground mt-1 block">{t("home.features.book.subtitle")}</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.button>
        </Link>

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
