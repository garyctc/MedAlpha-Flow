import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Star, MapPin, Navigation, ChevronRight, Clock } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";

const pharmacies = [
  {
    id: 1,
    name: "Apotheke am Markt",
    address: "Marktstraße 15, Berlin",
    distance: "0.3 km",
    status: "Open",
    statusColor: "text-emerald-700 bg-emerald-50",
    hours: "Open until 7:00 PM",
    rating: 4.6,
    reviews: 42
  },
  {
    id: 2,
    name: "Stadt-Apotheke",
    address: "Hauptstraße 8, Berlin",
    distance: "0.7 km",
    status: "Open",
    statusColor: "text-emerald-700 bg-emerald-50",
    hours: "Open until 6:30 PM",
    rating: 4.2,
    reviews: 28
  },
  {
    id: 3,
    name: "Nacht-Apotheke",
    address: "Bahnhofstraße 22, Berlin",
    distance: "1.2 km",
    status: "24 Hours",
    statusColor: "text-blue-700 bg-blue-50",
    hours: "Always Open",
    rating: 4.0,
    reviews: 156
  }
];

const filters = ["Open Now", "24 Hours", "Highest Rated"];

export default function PharmacyList() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Nearby Pharmacies" backPath="/pharmacy/map" />
      
      <main className="p-5 space-y-4">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter, i) => (
            <button 
              key={filter} 
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0 ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-primary/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {pharmacies.map((pharmacy, index) => (
            <motion.button
              key={pharmacy.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setLocation("/pharmacy/detail")}
              className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 text-left hover:border-primary/30 transition-all group"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-slate-400 text-xl border border-slate-200">
                A
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 truncate group-hover:text-primary transition-colors">{pharmacy.name}</h3>
                  <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-xs font-bold text-amber-700">
                    <Star size={10} className="fill-current" />
                    {pharmacy.rating}
                  </div>
                </div>
                
                <p className="text-xs text-slate-500 font-medium truncate">{pharmacy.address}</p>
                
                <div className="flex items-center gap-2 mt-2">
                   <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${pharmacy.statusColor}`}>
                     {pharmacy.status}
                   </span>
                   <span className="text-[10px] text-slate-400 flex items-center gap-1">
                     <Clock size={10} /> {pharmacy.hours}
                   </span>
                </div>
                
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                  <Navigation size={10} />
                  <span>{pharmacy.distance} away</span>
                </div>
              </div>
              
              <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors self-center" size={20} />
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}
