import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation, useSearch } from "wouter";
import { Star, Clock, Calendar, MapPin, ChevronRight, Search } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Chip } from "@/components/ui/chip";
import { saveBookingDraft, getBookingDraft } from "@/lib/storage";
import { DOCTORS, DEFAULT_DOCTOR_AVATAR, CLINICS, getClinicName, getClinicNames } from "@/lib/constants/doctors";
import { useTranslation } from "react-i18next";

type FilterType = 'all' | 'available' | 'top-rated';

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Available Today", value: "available" },
  { label: "Highest Rated", value: "top-rated" },
];

export default function DoctorSelect() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  // Check if coming from location selection (specialty path)
  const searchParams = new URLSearchParams(search);
  const locationId = searchParams.get("location");
  const locationIdNum = locationId ? parseInt(locationId) : null;
  const locationName = locationIdNum ? getClinicName(locationIdNum) : null;

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
    // First filter by location if coming from specialty path
    let doctors = locationIdNum
      ? DOCTORS.filter(d => d.clinics.includes(locationIdNum))
      : DOCTORS;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      doctors = doctors.filter(d =>
        d.name.toLowerCase().includes(query)
      );
    }

    // Then apply the selected filter
    switch (filter) {
      case 'available':
        return doctors.filter(d => d.availableToday);
      case 'top-rated':
        return doctors.filter(d => d.rating >= 4.8);
      default:
        return doctors;
    }
  }, [filter, locationIdNum, searchQuery]);

  const handleSkipDoctor = () => {
    // Go to slots without setting a doctor
    setLocation("/booking/slots");
  };

  const handleDoctorClick = (doctorId: string, doctorName: string) => {
    const doc = DOCTORS.find(d => d.id === doctorId);
    if (!doc) return;

    saveBookingDraft({ doctor: doctorName, doctorImage: doc.image || undefined, specialty: doc.specialty });

    if (doc.clinics.length === 1) {
      // Single clinic: auto-save location and go straight to slots
      const clinicName = getClinicName(doc.clinics[0]);
      saveBookingDraft({ location: clinicName });
      setLocation("/booking/slots");
    } else {
      // Multiple clinics: check if location already selected (specialty flow)
      const draft = getBookingDraft();
      if (draft?.entryMode === 'specialty' && draft?.location) {
        setLocation("/booking/slots");
      } else {
        setLocation(`/booking/location?doctor=${doctorId}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader
        title={t("booking.doctors.title", { defaultValue: "Select Doctor" })}
        backPath={locationId ? "/booking/location" : "/booking/entry"}
      />

      <main className="p-5 space-y-4">
        {/* Location-filtered heading and skip button */}
        {locationName && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              {t("booking.doctors.atLocation", { location: locationName, defaultValue: `Doctors at ${locationName}` })}
            </h2>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleSkipDoctor}
              className="w-full bg-card p-4 rounded-3xl border border-border shadow-[var(--shadow-card)] flex items-center justify-between hover:border-primary/30 transition-colors group"
            >
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {t("booking.doctors.anyDoctor", { defaultValue: "Any available doctor" })}
              </span>
              <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t("booking.doctors.search", { defaultValue: "Search doctors..." })}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((f) => (
            <Chip
              key={f.value}
              onClick={() => setFilter(f.value)}
              selected={filter === f.value}
              size="sm"
            >
              {f.label}
            </Chip>
          ))}
        </div>

        {/* Doctor List */}
        <div className="space-y-3">
          {loading ? (
            // Skeleton Loading State
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full bg-card p-4 rounded-3xl border border-border shadow-[var(--shadow-card)] flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))
          ) : filteredDoctors.length === 0 ? (
            // Empty State
            <div className="bg-card rounded-3xl border border-dashed border-border p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} className="text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground mb-1">{t("booking.doctors.empty.title", { defaultValue: "No doctors match this filter" })}</p>
              <p className="text-sm text-muted-foreground">{t("booking.doctors.empty.subtitle", { defaultValue: "Try a different filter or check back later" })}</p>
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
                className={`w-full bg-card p-4 rounded-3xl border shadow-[var(--shadow-card)] flex items-center gap-4 text-left hover:border-primary/30 transition-colors group ${
                  selectedDoctor === doc.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                      src={doc.image || DEFAULT_DOCTOR_AVATAR}
                      alt={doc.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{doc.name}</h3>
                    <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-lg text-xs font-semibold text-amber-700 ml-2">
                      <Star size={10} className="fill-current" />
                      {doc.rating}
                    </div>
                  </div>
                  <p className="text-sm text-primary font-medium">{doc.specialty}</p>
                  {!locationName && (
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin size={10} />
                      {getClinicNames(doc.clinics)}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {t("booking.doctors.nextAvailable", { time: doc.nextAvailable, defaultValue: `Next: ${doc.nextAvailable}` })}
                    </div>
                    <span className="text-xs font-semibold bg-primary text-white px-3 py-1.5 rounded-xl">
                      {t("common.buttons.book", { defaultValue: "Book" })}
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
