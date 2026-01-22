import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { MapPin, Star, Navigation } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { saveBookingDraft, getBookingDraft } from "@/lib/storage";

const clinics = [
  {
    id: 1,
    name: "MedAlpha Health Center",
    address: "Friedrichstraße 123, Berlin",
    distance: "1.2 km",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "MedCore Health Center",
    address: "Alexanderplatz 5, Berlin",
    distance: "2.5 km",
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "City West Medical",
    address: "Kurfürstendamm 22, Berlin",
    distance: "4.1 km",
    rating: 4.9,
    reviews: 210
  }
];

export default function LocationSelect() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    // Load existing draft and simulate location search
    const draft = getBookingDraft();
    if (draft?.location) {
      setSelectedLocation(draft.location);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClinicClick = (clinicId: number, clinicName: string) => {
    saveBookingDraft({ location: clinicName });
    setLocation(`/booking/doctors?clinic=${clinicId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Select Location" backPath="/booking/specialty" />
      
      <main className="p-5 space-y-6">
        {/* Map Placeholder */}
        <div className="w-full h-48 bg-slate-200 rounded-2xl relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#0C3D91 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
           <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
             <MapPin size={24} fill="currentColor" />
           </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            {isLoading ? "Finding nearby locations..." : "Nearby Clinics"}
          </h2>
          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              ))
            ) : (
            clinics.map((clinic, index) => (
              <motion.button
                key={clinic.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleClinicClick(clinic.id, clinic.name)}
                className={`w-full bg-white p-4 rounded-2xl border shadow-sm text-left hover:border-primary/30 transition-all flex justify-between items-center group ${
                  selectedLocation === clinic.name ? 'border-primary ring-2 ring-primary/20' : 'border-slate-100'
                }`}
              >
                <div className="w-full">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{clinic.name}</h3>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{clinic.address}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-primary bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
                        <Navigation size={10} />
                        {clinic.distance}
                      </span>
                      <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                        <Star size={10} className="fill-current" />
                        {clinic.rating} ({clinic.reviews})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-primary border border-primary/20 px-3 py-1.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      Select
                    </span>
                  </div>
                </div>
              </motion.button>
            ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
