import { useLocation } from "wouter";
import { Pill, FileText, Calendar, User, Truck, MapPin, Download, RefreshCw } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { usePrimarySSOProvider } from "@/hooks/use-sso-providers";

export default function PrescriptionDetail() {
  const [location, setLocation] = useLocation();
  const primaryProvider = usePrimarySSOProvider();
  
  // Simple check for query param (in a real app use a proper hook or parser)
  const isDelivered = location.includes("status=delivered");
  const isPickedUp = location.includes("status=pickedup");
  const isHistory = isDelivered || isPickedUp;

  if (isHistory) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <SubPageHeader title="Prescription Details" backPath="/prescriptions" />
        
        <main className="p-5 space-y-6">
          {/* Status Badge */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-4 flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
               {isDelivered ? <Truck size={20} /> : <MapPin size={20} />}
             </div>
             <div>
               <h2 className="font-semibold text-emerald-800 text-lg">{isDelivered ? "Delivered" : "Picked up"}</h2>
               <p className="text-emerald-600 text-sm">January 18, 2026</p>
             </div>
          </div>

          <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow-card)] border border-border">
             <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
               <Pill size={32} />
             </div>

             <h1 className="text-2xl font-semibold text-foreground mb-2 font-display">Metformin 500mg</h1>

             <div className="space-y-6 mt-6">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Dosage</span>
                  <span className="text-foreground font-medium text-right max-w-[60%]">Take 1 tablet twice daily with meals</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Quantity</span>
                  <span className="text-foreground font-medium">30 tablets</span>
                </div>

                <div className="flex items-start gap-3 py-3">
                   <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                     <User className="text-primary" size={16} />
                   </div>
                   <div>
                     <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Prescribed By</p>
                     <p className="text-foreground font-medium">Dr. Anna Schmidt</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Delivery/Pickup Info */}
          <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow-card)] border border-border">
             <h3 className="font-semibold text-foreground mb-4">{isDelivered ? "Delivery Information" : "Pickup Information"}</h3>

             <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Pharmacy</span>
                  <span className="text-foreground font-medium">{isDelivered ? "Apo Group" : primaryProvider?.pharmacyName || 'Pharmacy'}</span>
                </div>

                {isDelivered ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Order #</span>
                      <span className="text-foreground font-medium">#APO-2026-12345</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block mb-1">Delivered to</span>
                      <span className="text-foreground font-medium block">Friedrichstraße 123, Berlin</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Tracking</span>
                      <span className="text-emerald-600 font-medium">DHL - Delivered</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-muted-foreground text-sm block mb-1">Picked up at</span>
                      <span className="text-foreground font-medium block">Charlottenstraße 45, 10117 Berlin</span>
                    </div>
                  </>
                )}
             </div>
          </div>
        </main>

        {/* Sticky Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-card border-t border-border pb-safe z-[60] flex gap-3">
           <Button variant="outline" className="flex-1 h-12 rounded-xl text-primary border-primary hover:bg-primary/5">
             <Download size={18} className="mr-2" /> Receipt
           </Button>
           <Button className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
             <RefreshCw size={18} className="mr-2" /> Reorder
           </Button>
        </div>
      </div>
    );
  }

  // Active (Pending) State
  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Prescription Details" backPath="/prescriptions" />
      
      <main className="p-5 space-y-6">
        <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow-card)] border border-border">
           <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
             <Pill size={32} />
           </div>

           <h1 className="text-2xl font-semibold text-foreground mb-2 font-display">Metformin 500mg</h1>
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold mb-6">
             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
             Active
           </div>

           <div className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground text-sm">Form</span>
                <span className="text-foreground font-medium">Tablets</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground text-sm">Quantity</span>
                <span className="text-foreground font-medium">30</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground text-sm">Dosage</span>
                <span className="text-foreground font-medium">1x daily</span>
              </div>

              <div className="flex items-start gap-3 py-3">
                 <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                   <User className="text-primary" size={16} />
                 </div>
                 <div>
                   <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Prescribed By</p>
                   <p className="text-foreground font-medium">Dr. Anna Schmidt</p>
                 </div>
              </div>

              <div className="flex items-start gap-3 py-3">
                 <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                   <FileText className="text-primary" size={16} />
                 </div>
                 <div>
                   <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Date Issued</p>
                   <p className="text-foreground font-medium">January 15, 2026</p>
                 </div>
              </div>

              <div className="flex items-start gap-3 py-3">
                 <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                   <Calendar className="text-primary" size={16} />
                 </div>
                 <div>
                   <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Valid Until</p>
                   <p className="text-foreground font-medium">April 15, 2026</p>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-card border-t border-border pb-safe z-[60]">
        <div className="max-w-[375px] mx-auto">
           <Button
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            onClick={() => setLocation("/prescriptions/pharmacy")}
           >
             Redeem This Prescription
           </Button>
        </div>
      </div>
    </div>
  );
}
