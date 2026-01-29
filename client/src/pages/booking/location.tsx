import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation, useSearch } from "wouter";
import { MapPin, Star, Navigation, ChevronRight, Search, AlertTriangle, ShieldCheck } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  saveBookingDraft,
  getBookingDraft,
  getLocationPermissionState,
  setLocationPermissionState,
  getUserProfile,
} from "@/lib/storage";
import { DOCTORS, CLINICS } from "@/lib/constants/doctors";
import { ADDRESS_SUGGESTIONS } from "@/lib/constants/addresses";
import { useTranslation } from "react-i18next";

export default function LocationSelect() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [permissionState, setPermissionStateLocal] = useState(() => getLocationPermissionState());
  const [showDialog, setShowDialog] = useState(false);
  const { t } = useTranslation();

  // Check if coming from doctor path (has ?doctor param)
  const searchParams = new URLSearchParams(search);
  const doctorId = searchParams.get("doctor");
  const selectedDoctor = doctorId ? DOCTORS.find(d => d.id === doctorId) : null;
  const draft = useMemo(() => getBookingDraft(), []);
  const isFastEntry = draft?.entryMode === "fast";

  // Filter CLINICS if doctor is selected
  const filteredClinics = useMemo(() => {
    if (selectedDoctor) {
      return CLINICS.filter(c => selectedDoctor.clinics.includes(c.id));
    }
    return CLINICS;
  }, [selectedDoctor]);

  const displayClinics = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    let next = filteredClinics;

    if (normalizedQuery) {
      next = next.filter((clinic) => {
        return (
          clinic.name.toLowerCase().includes(normalizedQuery) ||
          clinic.address.toLowerCase().includes(normalizedQuery)
        );
      });
    }

    if (permissionState === "granted") {
      return [...next].sort((a, b) => {
        const aNear = a.distanceKm <= 5;
        const bNear = b.distanceKm <= 5;
        if (aNear !== bNear) {
          return aNear ? -1 : 1;
        }
        return a.distanceKm - b.distanceKm;
      });
    }

    return [...next].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredClinics, permissionState, searchQuery]);

  const addressSuggestions = useMemo(() => {
    if (!isFastEntry || permissionState === "granted") return [];

    const profile = getUserProfile();
    const profileAddress = profile
      ? `${profile.street}, ${profile.postalCode} ${profile.city}`
      : null;
    const options = [profileAddress, ...ADDRESS_SUGGESTIONS].filter(
      (value): value is string => Boolean(value)
    );
    const unique = Array.from(new Set(options));

    if (!searchQuery.trim()) {
      return unique;
    }

    const normalizedQuery = searchQuery.trim().toLowerCase();
    return unique.filter((address) =>
      address.toLowerCase().includes(normalizedQuery)
    );
  }, [isFastEntry, permissionState, searchQuery]);

  useEffect(() => {
    // Skip loading simulation if permission not yet decided
    if (permissionState === "prompt") {
      setIsLoading(false);
      return;
    }

    // Load existing draft and simulate location search
    if (draft?.location) {
      setSelectedLocation(draft.location);
    }
    if (isFastEntry && permissionState === "granted" && !draft?.location) {
      setSearchQuery(
        t("booking.location.currentLocation", {
          defaultValue: "Current location",
        })
      );
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [draft, isFastEntry, permissionState, t]);

  const handlePermissionDecision = (state: "granted" | "denied") => {
    setLocationPermissionState(state);
    setPermissionStateLocal(state);
    setShowDialog(false);
    setIsLoading(true);
    // Brief loading state before showing clinics
    setTimeout(() => setIsLoading(false), 500);
  };

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

  // Permission prompt state - show explainer
  if (permissionState === "prompt") {
    return (
      <div className="min-h-screen bg-background pb-20">
        <SubPageHeader
          title={t("booking.location.permission.title", {
            defaultValue: "Enable location",
          })}
          backPath="/booking/entry"
        />

        <main className="p-5 space-y-6">
          <div className="bg-card border border-border rounded-3xl p-5 shadow-[var(--shadow-card)] space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <MapPin size={26} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                {t("booking.location.permission.heading", {
                  defaultValue: "Find clinics faster",
                })}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("booking.location.permission.body", {
                  defaultValue:
                    "Allow location access to prioritize nearby clinics and shorten your wait time.",
                })}
              </p>
            </div>
            <Button className="w-full" onClick={() => setShowDialog(true)}>
              {t("booking.location.permission.cta", {
                defaultValue: "Enable location",
              })}
            </Button>
          </div>

          <div className="bg-muted/40 border border-dashed border-border rounded-3xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-foreground/5 text-foreground flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {t("booking.location.permission.privacy.title", {
                    defaultValue: "Your privacy comes first",
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("booking.location.permission.privacy.body", {
                    defaultValue: "We only use location while you book appointments.",
                  })}
                </p>
              </div>
            </div>
          </div>
        </main>

        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent className="w-[90%] rounded-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("booking.location.permission.modal.title", {
                  defaultValue: "Allow location access?",
                })}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("booking.location.permission.modal.body", {
                  defaultValue:
                    "We use your location to sort nearby clinics first. You can change this later in settings.",
                })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handlePermissionDecision("denied")}>
                {t("booking.location.permission.modal.deny", {
                  defaultValue: "Not now",
                })}
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => handlePermissionDecision("granted")}>
                {t("booking.location.permission.modal.allow", {
                  defaultValue: "Allow location",
                })}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  // Granted or Denied state - show clinic list
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

        {permissionState === "denied" && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle size={18} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-amber-900">
                  {t("booking.location.permission.warning.title", {
                    defaultValue: "Find Clinics Faster",
                  })}
                </h3>
                <p className="text-xs text-amber-800">
                  {t("booking.location.permission.warning.body", {
                    defaultValue:
                      "Enable location to sort the closest clinics first.",
                  })}
                </p>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => handlePermissionDecision("granted")}
            >
              {t("booking.location.permission.warning.cta", {
                defaultValue: "Enable Location",
              })}
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {/* Title */}
          <h2 className="text-lg font-semibold text-foreground">
            {isLoading
              ? t("booking.location.searching", { defaultValue: "Finding nearby locations..." })
              : selectedDoctor
                ? t("booking.location.forDoctor", { name: selectedDoctor.name, defaultValue: `Locations for ${selectedDoctor.name}` })
                : t("booking.location.nearby", { defaultValue: "Clinics" })}
          </h2>

          {/* Search */}
          <div className="space-y-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("booking.location.search", {
                  defaultValue: "Search address or clinic",
                })}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {addressSuggestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("booking.location.suggestions", {
                    defaultValue: "Suggested addresses",
                  })}
                </p>
                <div className="space-y-2">
                  {addressSuggestions.slice(0, 4).map((address) => (
                    <button
                      key={address}
                      type="button"
                      onClick={() => setSearchQuery(address)}
                      className="w-full text-left bg-card border border-border rounded-2xl px-4 py-3 text-sm text-foreground hover:border-primary/30 transition-colors"
                    >
                      {address}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clinic list */}
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
            displayClinics.map((clinic, index) => (
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
