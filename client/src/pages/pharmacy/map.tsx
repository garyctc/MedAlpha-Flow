import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search, MapPin, Navigation, Star, Menu } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PHARMACIES, isPharmacyOpen } from "@/lib/constants/pharmacies";

export default function PharmacyMap() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");

  const filteredPharmacies = useMemo(() => {
    if (!search.trim()) return PHARMACIES;
    const searchLower = search.toLowerCase();
    return PHARMACIES.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.address.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const nearestPharmacy = filteredPharmacies[0];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="bg-white px-5 pt-12 pb-4 z-20 flex items-center gap-4">
        <button onClick={() => setLocation("/home")} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left text-slate-600"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="flex-1 relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <Input
             placeholder="Search pharmacies..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="pl-10 h-10 bg-slate-50 border-transparent focus:bg-white transition-all rounded-full"
           />
        </div>
      </div>
      
      {/* Map Area */}
      <div className="flex-1 relative bg-slate-200 overflow-hidden">
        {/* Fake Map Background */}
        <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: "radial-gradient(#94a3b8 2px, transparent 2px), radial-gradient(#94a3b8 2px, transparent 2px)", 
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px"
        }}></div>
        
        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
           </div>
        </div>

        {/* Pins */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setLocation("/pharmacy/detail")}
          className="absolute top-[40%] left-[60%] flex flex-col items-center"
        >
           <div className="bg-white px-2 py-1 rounded border border-slate-200 text-xs font-bold mb-1">Apotheke am Markt</div>
           <MapPin size={32} className="text-red-500 fill-red-500" />
        </motion.button>
        
        <motion.button 
           whileTap={{ scale: 0.9 }}
           className="absolute top-[30%] left-[30%] flex flex-col items-center opacity-80"
        >
           <MapPin size={28} className="text-slate-500 fill-slate-500" />
        </motion.button>

        <motion.button 
           whileTap={{ scale: 0.9 }}
           className="absolute bottom-[40%] right-[20%] flex flex-col items-center opacity-80"
        >
           <MapPin size={28} className="text-blue-500 fill-blue-500" />
        </motion.button>
      </div>

      {/* Bottom Sheet Preview */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white rounded-t-3xl border-t border-border p-5 pb-8 relative z-10"
      >
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4"></div>
        
        <div className="flex justify-between items-center mb-4">
           <h3 className="font-bold text-slate-900">{filteredPharmacies.length} pharmacies nearby</h3>
           <button onClick={() => setLocation("/pharmacy/list")} className="text-primary text-sm font-medium">View List</button>
        </div>

        {nearestPharmacy ? (
          <div onClick={() => setLocation(`/pharmacy/detail?id=${nearestPharmacy.id}`)} className="flex gap-4 p-3 rounded-xl border border-border hover:border-primary/30 transition-all cursor-pointer">
             <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
               <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 font-bold text-xs">{nearestPharmacy.name.charAt(0)}</div>
             </div>
             <div className="flex-1">
               <h4 className="font-bold text-slate-900">{nearestPharmacy.name}</h4>
               <p className="text-xs text-slate-500">{nearestPharmacy.address} • {nearestPharmacy.distance}</p>
               <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${nearestPharmacy.statusColor}`}>{nearestPharmacy.status}</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Star size={8} className="fill-current" /> {nearestPharmacy.rating}
                  </span>
               </div>
             </div>
          </div>
        ) : (
          <div className="text-center py-4 text-slate-500 text-sm">No pharmacies found</div>
        )}
      </motion.div>
    </div>
  );
}
