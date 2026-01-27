import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation, useSearch } from "wouter";
import { MapPin, Star, Navigation, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { saveBookingDraft, getBookingDraft } from "@/lib/storage";
import { DOCTORS } from "@/lib/constants/doctors";
import { useTranslation } from "react-i18next";

const clinics = [
  {
    id: 1,
    name: "DocliQ Health Center",
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
  const search = useSearch();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { t } = useTranslation();

  // Check if coming from doctor path (has ?doctor param)
  const searchParams = new URLSearchParams(search);
  const doctorId = searchParams.get("doctor");
  const selectedDoctor = doctorId ? DOCTORS.find(d => d.id === doctorId) : null;

  // Filter clinics if doctor is selected
  const filteredClinics = useMemo(() => {
    if (selectedDoctor) {
      return clinics.filter(c => selectedDoctor.clinics.includes(c.id));
    }
    return clinics;
  }, [selectedDoctor]);

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

    if (doctorId) {
      // Doctor path: already have a doctor, go to slots
      setLocation("/booking/slots");
    } else {
      // Specialty path: go to doctor selection filtered by location
      setLocation(`/booking/doctors?location=${clinicId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader
        title={t("booking.location.title", { defaultValue: "Select Location" })}
        backPath={doctorId ? "/booking/doctors" : "/booking/specialty"}
      />

      <main className="p-5 space-y-6">
        {/* Map Placeholder */}
        <div className="w-full h-48 bg-muted rounded-3xl relative overflow-hidden flex items-center justify-center border border-border">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
           <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
             <MapPin size={24} fill="currentColor" />
           </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            {isLoading
              ? t("booking.location.searching", { defaultValue: "Finding nearby locations..." })
              : selectedDoctor
                ? t("booking.location.forDoctor", { name: selectedDoctor.name, defaultValue: `Locations for ${selectedDoctor.name}` })
                : t("booking.location.nearby", { defaultValue: "Nearby Clinics" })}
          </h2>
          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-full bg-card p-4 rounded-3xl border border-border shadow-[var(--shadow-card)]">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              ))
            ) : (
            filteredClinics.map((clinic, index) => (
              <motion.button
                key={clinic.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleClinicClick(clinic.id, clinic.name)}
                className={`w-full bg-card p-4 rounded-3xl border shadow-[var(--shadow-card)] text-left hover:border-primary/30 transition-all group ${
                  selectedLocation === clinic.name ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{clinic.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{clinic.address}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg flex items-center gap-1">
                        <Navigation size={10} />
                        {clinic.distance}
                      </span>
                      <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-lg flex items-center gap-1">
                        <Star size={10} className="fill-current" />
                        {clinic.rating} ({clinic.reviews})
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
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
