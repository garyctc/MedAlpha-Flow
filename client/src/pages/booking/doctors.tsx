import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Star, Clock, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const doctors = [
  { 
    id: 1, 
    name: "Dr. Anna Schmidt", 
    specialty: "General Practice", 
    rating: 4.8, 
    nextAvailable: "Tomorrow, 9:00 AM",
    image: null 
  },
  { 
    id: 2, 
    name: "Dr. Michael Chen", 
    specialty: "General Practice", 
    rating: 4.7, 
    nextAvailable: "Today, 4:30 PM",
    image: null 
  },
  { 
    id: 3, 
    name: "Dr. Sarah Weber", 
    specialty: "General Practice", 
    rating: 4.9, 
    nextAvailable: "Tomorrow, 10:00 AM",
    image: null
  },
];

const filters = ["All", "Available Today", "Highest Rated"];

export default function DoctorSelect() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Select Doctor" backPath="/booking/location" />
      
      <main className="p-5 space-y-4">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter, i) => (
            <button 
              key={filter} 
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0 ? "bg-primary text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-primary/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Doctor List */}
        <div className="space-y-3">
          {loading ? (
            // Skeleton Loading State
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))
          ) : (
            // Real Data
            doctors.map((doc, index) => (
              <motion.button
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setLocation(`/booking/calendar?doctor=${doc.id}`)}
                className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 text-left hover:border-primary/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-slate-200 flex-shrink-0"></div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 truncate group-hover:text-primary transition-colors">{doc.name}</h3>
                    <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-xs font-bold text-amber-700">
                      <Star size={10} className="fill-current" />
                      {doc.rating}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{doc.specialty}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-primary font-medium">
                    <Clock size={12} />
                    Next: {doc.nextAvailable}
                  </div>
                </div>
                
                <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" size={20} />
              </motion.button>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
