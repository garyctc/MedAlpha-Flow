import { useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { Star, MapPin, Navigation, Phone, Mail, Clock, Map, ShoppingBag } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { getPharmacyById, PHARMACIES } from "@/lib/constants/pharmacies";
import { showSuccess } from "@/lib/toast-helpers";
import { useTranslation } from "react-i18next";

export default function PharmacyDetail() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const pharmacyId = params.get("id") || "1";
  const { t } = useTranslation();

  const pharmacy = useMemo(() => {
    return getPharmacyById(pharmacyId) || PHARMACIES[0];
  }, [pharmacyId]);

  const handleReserve = () => {
    // Save to localStorage (simulated order)
    const orders = JSON.parse(localStorage.getItem("pharmacy-orders") || "[]");
    orders.push({
      id: `ORD-${Date.now()}`,
      pharmacyId: pharmacy.id,
      pharmacyName: pharmacy.name,
      createdAt: new Date().toISOString(),
      status: "reserved"
    });
    localStorage.setItem("pharmacy-orders", JSON.stringify(orders));
    showSuccess(t("pharmacy.detail.reservationConfirmed"));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title={t("pharmacy.detail.title")} backPath="/pharmacy/list" />

      <main className="p-5 space-y-6">
        {/* Hero Section */}
        <div className="text-center">
           <div className="w-full h-32 bg-muted rounded-3xl mb-4 overflow-hidden relative">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="text-red-500 drop-shadow-md" size={32} fill="currentColor" />
              </div>
           </div>

           <h1 className="text-2xl font-semibold text-foreground mb-2 font-display">{pharmacy.name}</h1>

           <div className="flex justify-center items-center gap-3 mb-2">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full text-xs font-bold text-amber-700 border border-amber-100">
                <Star size={12} className="fill-current" />
                {pharmacy.rating} ({pharmacy.reviews} reviews)
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${pharmacy.statusColor} ${pharmacy.status === "Open" ? "border-emerald-100" : pharmacy.status === "24 Hours" ? "border-blue-100" : "border-red-100"}`}>
                {pharmacy.status}
              </span>
           </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
           {/* Address */}
           <div className="bg-card p-4 rounded-3xl border border-border shadow-[var(--shadow-card)] flex gap-4 items-start">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{t("pharmacy.detail.address")}</h3>
                <p className="text-muted-foreground text-sm">{pharmacy.address}, {pharmacy.postalCode} {pharmacy.city}</p>
                <p className="text-primary text-xs font-medium mt-1">{pharmacy.distance} away</p>
              </div>
           </div>

           {/* Hours */}
           <div className="bg-card p-4 rounded-3xl border border-border shadow-[var(--shadow-card)] flex gap-4 items-start">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm mb-1">{t("pharmacy.detail.openingHours")}</h3>
                <div className="text-sm space-y-1">
                   <div className="flex justify-between">
                     <span className="text-muted-foreground">{t("pharmacy.detail.monFri")}</span>
                     <span className="font-medium text-foreground">{pharmacy.hoursDetail.weekday}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-muted-foreground">{t("pharmacy.detail.saturday")}</span>
                     <span className="font-medium text-foreground">{pharmacy.hoursDetail.saturday}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-muted-foreground">{t("pharmacy.detail.sunday")}</span>
                     <span className={`font-medium ${pharmacy.hoursDetail.sunday === "Closed" ? "text-red-500" : "text-foreground"}`}>{pharmacy.hoursDetail.sunday}</span>
                   </div>
                </div>
              </div>
           </div>

           {/* Contact */}
           <div className="bg-card p-4 rounded-3xl border border-border shadow-[var(--shadow-card)] space-y-3">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                   <Phone size={20} />
                 </div>
                 <div>
                   <h3 className="font-semibold text-foreground text-sm">{t("pharmacy.detail.phone")}</h3>
                   <p className="text-muted-foreground text-sm">{pharmacy.phone}</p>
                 </div>
              </div>
              <div className="h-px bg-border w-full ml-14"></div>
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                   <Mail size={20} />
                 </div>
                 <div>
                   <h3 className="font-semibold text-foreground text-sm">{t("pharmacy.detail.email")}</h3>
                   <p className="text-muted-foreground text-sm">{pharmacy.email}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
           <Button onClick={handleReserve} className="w-full h-12 rounded-3xl bg-primary shadow-lg shadow-primary/20 flex items-center gap-2">
             <ShoppingBag size={18} /> {t("pharmacy.detail.reservePrescription")}
           </Button>
           <Button variant="outline" className="w-full h-12 rounded-3xl border-border text-foreground hover:bg-muted flex items-center gap-2">
             <Navigation size={18} /> {t("pharmacy.detail.getDirections")}
           </Button>
           <Button variant="outline" className="w-full h-12 rounded-3xl border-border text-foreground hover:bg-muted flex items-center gap-2">
             <Phone size={18} /> {t("pharmacy.detail.callPharmacy")}
           </Button>
        </div>

        {/* Info Note */}
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-4 text-center">
           <p className="text-xs text-amber-800 font-medium">
             {t("pharmacy.detail.eprescriptionNote")}
           </p>
        </div>
      </main>
    </div>
  );
}
