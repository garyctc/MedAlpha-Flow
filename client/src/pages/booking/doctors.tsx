import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Star, Clock, Calendar } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { saveBookingDraft, getBookingDraft } from "@/lib/storage";
import { DOCTORS } from "@/lib/constants/doctors";

type FilterType = 'all' | 'available' | 'top-rated';

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Available Today", value: "available" },
  { label: "Highest Rated", value: "top-rated" },
];

export default function DoctorSelect() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  useEffect(() => {
    const draft = getBookingDraft();
    if (draft?.doctor) {
      const doc = DOCTORS.find(d => d.name === draft.doctor);
      if (doc) setSelectedDoctor(doc.id);
    }
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredDoctors = useMemo(() => {
    switch (filter) {
      case 'available':
        return DOCTORS.filter(d => d.availableToday);
      case 'top-rated':
        return DOCTORS.filter(d => d.rating >= 4.8);
      default:
        return DOCTORS;
    }
  }, [filter]);

  const handleDoctorClick = (doctorId: string, doctorName: string) => {
    saveBookingDraft({ doctor: doctorName });
    setLocation(`/booking/calendar?doctor=${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Select Doctor" backPath="/booking/location" />
      
      <main className="p-5 space-y-4">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.value ? "bg-primary text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-primary/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Doctor List */}
        <div className="space-y-3">
          {loading ? (
            <LoadingSkeleton variant="card" count={3} />
          ) : filteredDoctors.length === 0 ? (
            // Empty State
            <div className="bg-white rounded-2xl border border-border border-dashed p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} className="text-slate-400" />
              </div>
              <p className="font-medium text-slate-900 mb-1">No doctors match this filter</p>
              <p className="text-sm text-slate-500">Try a different filter or check back later</p>
            </div>
          ) : (
            // Real Data
            filteredDoctors.map((doc, index) => (
              <motion.button
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleDoctorClick(doc.id, doc.name)}
                className={`w-full bg-white p-4 rounded-2xl border flex items-center gap-4 text-left hover:border-primary/30 transition-all group ${
                  selectedDoctor === doc.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                }`}
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
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                      <Clock size={12} />
                      Next: {doc.nextAvailable}
                    </div>
                    <span className="text-xs font-bold bg-primary text-white px-3 py-1.5 rounded-lg">
                      Book
                    </span>
                  </div>
                </div>
              </motion.button>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
