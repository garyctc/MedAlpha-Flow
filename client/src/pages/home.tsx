import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Bell, Calendar, Pill, ChevronRight, MapPin, ShoppingBag, Sun, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import avatarImage from "@assets/generated_images/professional_user_avatar_for_healthcare_app.png";

function PromoCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const banners = [
    {
      id: 1,
      title: "Pharmacy Products",
      subtitle: "Order non-prescription medicines directly to your home.",
      gradient: "from-blue-600 to-cyan-500",
      icon: ShoppingBag,
      link: "/pharmacy/map"
    },
    {
      id: 2,
      title: "Boost Immune System",
      subtitle: "Vitamins and supplements for a healthy life.",
      gradient: "from-amber-500 to-orange-500",
      icon: Sun,
      link: "/prescriptions"
    },
    {
      id: 3,
      title: "Premium Brands",
      subtitle: "Discover top healthcare brands like Linola and Ratiopharm.",
      gradient: "from-purple-600 to-pink-500",
      icon: Star,
      link: "/pharmacy/list"
    }
  ];

  return (
    <div className="overflow-hidden rounded-2xl shadow-lg shadow-slate-200/50" ref={emblaRef}>
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
                      Shop Now
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

import dmLogo from "@/assets/dm-logo.svg";

export default function Home() {
  // Toggle this to see empty state
  const hasAppointments = true; 

  return (
    <div className="min-h-screen bg-background pb-24" data-testid="home-screen">
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-6 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src={dmLogo} alt="DM Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-display tracking-tight">MedAlpha</h1>
        </div>
        <div className="flex items-center gap-4">
           <button className="text-slate-400 hover:text-primary transition-colors relative">
             <Bell size={24} />
             <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
           </button>
           <Link href="/profile">
             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm cursor-pointer">
               <img src={avatarImage} alt="Profile" className="w-full h-full object-cover" />
             </div>
           </Link>
        </div>
      </header>

      <main className="px-5 py-6 space-y-8">
        {/* Promo Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <PromoCarousel />
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/booking/type">
            <motion.button 
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start gap-4 text-left hover:border-primary/20 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Calendar size={24} />
              </div>
              <div>
                <span className="block font-bold text-slate-800 group-hover:text-primary transition-colors">Book Appointment</span>
                <span className="text-xs text-slate-500 mt-1 block">Schedule a visit</span>
              </div>
            </motion.button>
          </Link>

          <Link href="/prescriptions">
            <motion.button 
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start gap-4 text-left hover:border-primary/20 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Pill size={24} />
              </div>
              <div>
                <span className="block font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">Redeem Prescription</span>
                <span className="text-xs text-slate-500 mt-1 block">Pharmacy pickup</span>
              </div>
            </motion.button>
          </Link>
        </div>

        {/* Upcoming Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-slate-800">Upcoming</h3>
            {hasAppointments && <Link href="/appointments" className="text-sm font-medium text-primary hover:underline">See all</Link>}
          </div>
          
          {hasAppointments ? (
            <Link href="/appointments/detail">
            <Card className="border-none shadow-md shadow-slate-200/50 rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform">
               <CardContent className="p-0">
                 <div className="flex">
                    <div className="bg-blue-50 w-20 flex flex-col items-center justify-center border-r border-blue-100 p-2">
                       <span className="text-xs font-bold text-primary uppercase">Jan</span>
                       <span className="text-2xl font-bold text-slate-900">24</span>
                       <span className="text-xs font-medium text-slate-500 mt-1">10:00</span>
                    </div>
                    <div className="p-4 flex-1 flex justify-between items-center">
                       <div>
                         <h4 className="font-bold text-slate-900">Dr. Sarah Johnson</h4>
                         <p className="text-sm text-slate-500">General Checkup</p>
                         <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                           <MapPin size={12} />
                           <span>Curaay Clinic, Downtown</span>
                         </div>
                       </div>
                       <Button size="icon" variant="ghost" className="text-slate-300">
                         <ChevronRight size={20} />
                       </Button>
                    </div>
                 </div>
               </CardContent>
            </Card>
            </Link>
          ) : (
            // Empty State
            <div className="bg-white rounded-2xl border border-slate-100 border-dashed p-8 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-2">
                <Calendar size={32} />
              </div>
              <p className="font-medium text-slate-900">No upcoming appointments</p>
              <Link href="/booking/type">
                <Button variant="link" className="text-primary h-auto p-0">Book Appointment</Button>
              </Link>
            </div>
          )}
        </section>

        {/* Recent Activity Mini-List */}
        <section>
           <h3 className="font-bold text-lg text-slate-800 mb-4">Recent</h3>
           <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <Pill size={18} />
                 </div>
                 <div className="flex-1">
                    <p className="font-medium text-sm text-slate-900">Prescription Refilled</p>
                    <p className="text-xs text-slate-500">Amoxicillin • 2 days ago</p>
                 </div>
                 <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Completed</span>
              </div>
              <div className="h-px bg-slate-100 w-full" />
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <Calendar size={18} />
                 </div>
                 <div className="flex-1">
                    <p className="font-medium text-sm text-slate-900">Appointment Booked</p>
                    <p className="text-xs text-slate-500">Dr. Smith • 5 days ago</p>
                 </div>
                 <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full">Confirmed</span>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
