import { useLocation } from "wouter";
import { Star, MapPin, Navigation, Phone, Mail, Clock, Map } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function PharmacyDetail() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Pharmacy Details" backPath="/pharmacy/list" />
      
      <main className="p-5 space-y-6">
        {/* Hero Section */}
        <div className="text-center">
           <div className="w-full h-32 bg-slate-200 rounded-2xl mb-4 overflow-hidden relative">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="text-red-500 drop-shadow-md" size={32} fill="currentColor" />
              </div>
           </div>
           
           <h1 className="text-2xl font-bold text-slate-900 mb-2 font-display">Apotheke am Markt</h1>
           
           <div className="flex justify-center items-center gap-3 mb-2">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full text-xs font-bold text-amber-700 border border-amber-100">
                <Star size={12} className="fill-current" />
                4.6 (42 reviews)
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Open Now
              </span>
           </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
           {/* Address */}
           <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Address</h3>
                <p className="text-slate-600 text-sm">Marktstraße 15, 10115 Berlin</p>
                <p className="text-primary text-xs font-medium mt-1">0.3 km away</p>
              </div>
           </div>

           {/* Hours */}
           <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Opening Hours</h3>
                <div className="text-sm space-y-1">
                   <div className="flex justify-between">
                     <span className="text-slate-600">Mon - Fri</span>
                     <span className="font-medium text-slate-900">8:00 AM - 7:00 PM</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-600">Saturday</span>
                     <span className="font-medium text-slate-900">9:00 AM - 2:00 PM</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-600">Sunday</span>
                     <span className="font-medium text-red-500">Closed</span>
                   </div>
                </div>
              </div>
           </div>

           {/* Contact */}
           <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
                   <Phone size={20} />
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-900 text-sm">Phone</h3>
                   <p className="text-slate-600 text-sm">030 1234567</p>
                 </div>
              </div>
              <div className="h-px bg-slate-100 w-full ml-14"></div>
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
                   <Mail size={20} />
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-900 text-sm">Email</h3>
                   <p className="text-slate-600 text-sm">info@apotheke-markt.de</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
           <Button className="w-full h-12 rounded-xl bg-primary shadow-lg shadow-primary/20 flex items-center gap-2">
             <Navigation size={18} /> Get Directions
           </Button>
           <Button variant="outline" className="w-full h-12 rounded-xl border-primary text-primary hover:bg-primary/5 flex items-center gap-2">
             <Phone size={18} /> Call Pharmacy
           </Button>
        </div>

        {/* Info Note */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
           <p className="text-xs text-amber-800 font-medium">
             Present your e-prescription at the pharmacy counter. Your Gesundheitskarte may be required.
           </p>
        </div>
      </main>
    </div>
  );
}
