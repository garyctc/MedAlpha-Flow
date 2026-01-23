import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Check, Calendar, Info, Shield, CreditCard } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { PageContent } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

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
    <div className="min-h-screen bg-primary">
      <SubPageHeader title="Your Prescriptions" backPath="/prescriptions/type" showLogo={true} />

      <PageContent>
        {/* Filter Pills */}
        <div className="px-5 pt-5 pb-3">
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
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

      <main className="p-5 pt-0 space-y-6">
        {/* Success Banner */}
        <div className="bg-success rounded-xl p-4 flex items-center gap-3 text-white">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Check size={18} strokeWidth={3} />
          </div>
          <p className="font-bold">2 prescriptions found</p>
        </div>

        {/* GKV Exemption Toggle */}
        {insuranceType === "gkv" && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
             <Checkbox 
               id="exempt" 
               checked={exempt}
               onCheckedChange={(c) => setExempt(c as boolean)}
               className="mt-1"
             />
             <div>
               <label htmlFor="exempt" className="font-bold text-slate-900 text-sm block">I have a copay exemption</label>
               <p className="text-xs text-slate-500">Befreiungsausweis required</p>
             </div>
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <LoadingSkeleton variant="list" count={2} />
          ) : (
            // Real Data
            items.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleSelection(item.id)}
                className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  item.selected 
                    ? "border-primary ring-1 ring-primary"
                    : "border-border hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-4">
                   <div className="pt-1 pointer-events-none">
                      <Checkbox checked={item.selected} />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-slate-900 text-lg">{item.medication}</h3>
                      </div>
                      <p className="text-slate-600 mb-3 font-medium">{item.detail}</p>
                      
                      {/* Price Label */}
                      <div className="mb-3">
                        {insuranceType === "gkv" ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                              Copay: €{exempt ? "0.00" : "5.00"}
                            </span>
                            {exempt && <Info size={14} className="text-blue-500" />}
                          </div>
                        ) : (
                          <div>
                            <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                              Price: €{item.price.toFixed(2)}
                            </span>
                            <p className="text-[10px] text-purple-600 font-medium mt-1">Reimbursable by your insurer</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-500 border-t border-slate-50 pt-3">
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
      </PageContent>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-border pb-safe z-[60]">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white"
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
