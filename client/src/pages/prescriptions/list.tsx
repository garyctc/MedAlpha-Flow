import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Check, Calendar, Info, Shield, CreditCard } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

const prescriptions = [
  {
    id: 1,
    medication: "Metformin 500mg",
    detail: "30 tablets, 1x daily",
    doctor: "Dr. Schmidt",
    issued: "Jan 15, 2026",
    expires: "Apr 15, 2026",
    price: 24.95,
    selected: true
  },
  {
    id: 2,
    medication: "Lisinopril 10mg",
    detail: "28 tablets, 1x daily",
    doctor: "Dr. Schmidt",
    issued: "Jan 15, 2026",
    expires: "Apr 15, 2026",
    price: 18.50,
    selected: false
  }
];

export default function PrescriptionList() {
  const [, setLocation] = useLocation();
  const [items, setItems] = useState(prescriptions);
  const [loading, setLoading] = useState(true);
  const [insuranceType, setInsuranceType] = useState<"gkv" | "pkv">("gkv");
  const [exempt, setExempt] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "redeemed">("active");

  useEffect(() => {
    const saved = localStorage.getItem("user-insurance-type") as "gkv" | "pkv";
    if (saved) setInsuranceType(saved);
    
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleSelection = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const selectedItems = items.filter(i => i.selected);
  const selectedCount = selectedItems.length;

  const calculateTotal = () => {
    if (insuranceType === "gkv") {
      return exempt ? 0 : selectedCount * 5.00;
    } else {
      return selectedItems.reduce((sum, item) => sum + item.price, 0);
    }
  };

  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <SubPageHeader title="Your Prescriptions" backPath="/prescriptions/type" className="border-none pb-2" showLogo={true} />
        <div className="px-4 pb-4">
           <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "active", label: "Active" },
              { id: "redeemed", label: "Redeemed" }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveTab(option.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                  activeTab === option.id
                    ? "bg-foreground text-white border-foreground"
                    : "bg-card text-muted-foreground border-border hover:border-foreground/30"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <main className="p-5 space-y-6">
        {/* Success Banner */}
        <div className="bg-success rounded-xl p-4 flex items-center gap-3 shadow-md shadow-green-900/10 text-white">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Check size={18} strokeWidth={3} />
          </div>
          <p className="font-semibold">2 prescriptions found</p>
        </div>

        {/* GKV Exemption Toggle */}
        {insuranceType === "gkv" && (
          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-4 flex items-start gap-3">
             <Checkbox
               id="exempt"
               checked={exempt}
               onCheckedChange={(c) => setExempt(c as boolean)}
               className="mt-1"
             />
             <div>
               <label htmlFor="exempt" className="font-semibold text-foreground text-sm block">I have a copay exemption</label>
               <p className="text-xs text-muted-foreground">Befreiungsausweis required</p>
             </div>
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            // Skeleton Loading
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-card p-5 rounded-3xl border border-border shadow-[var(--shadow-card)] flex items-start gap-4">
                <Skeleton className="w-5 h-5 rounded mt-1" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Real Data
            items.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleSelection(item.id)}
                className={`bg-card p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                  item.selected
                    ? "border-primary shadow-md shadow-primary/10 ring-1 ring-primary"
                    : "border-border shadow-[var(--shadow-card)] hover:border-foreground/30"
                }`}
              >
                <div className="flex items-start gap-4">
                   <div className="pt-1 pointer-events-none">
                      <Checkbox checked={item.selected} />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-foreground text-lg">{item.medication}</h3>
                      </div>
                      <p className="text-muted-foreground mb-3 font-medium">{item.detail}</p>

                      {/* Price Label */}
                      <div className="mb-3">
                        {insuranceType === "gkv" ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground bg-muted px-2 py-1 rounded">
                              Copay: €{exempt ? "0.00" : "5.00"}
                            </span>
                            {exempt && <Info size={14} className="text-primary" />}
                          </div>
                        ) : (
                          <div>
                            <span className="text-sm font-semibold text-foreground bg-muted px-2 py-1 rounded">
                              Price: €{item.price.toFixed(2)}
                            </span>
                            <p className="text-[10px] text-purple-600 font-medium mt-1">Reimbursable by your insurer</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-muted-foreground border-t border-border pt-3">
                         <span>Issued: {item.issued}</span>
                         <span className="flex items-center gap-1">
                           <Calendar size={12} /> Exp: {item.expires}
                         </span>
                      </div>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-card border-t border-border pb-safe z-[60]">
        <div className="max-w-[375px] mx-auto">
           <Button
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            disabled={selectedCount === 0 || loading}
            onClick={() => setLocation("/prescriptions/detail")} // Should probably go to review/pharmacy first? Prompt says 05 -> ... -> 07. Existing flow has pharmacy confirm in between.
           >
             {loading ? "Loading..." : (
               insuranceType === "gkv"
                 ? `Continue with €${total.toFixed(2)} copay`
                 : `Continue with €${total.toFixed(2)} total`
             )}
           </Button>
        </div>
      </div>
    </div>
  );
}
