import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Check, Calendar } from "lucide-react";
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
    selected: true
  },
  {
    id: 2,
    medication: "Lisinopril 10mg",
    detail: "28 tablets, 1x daily",
    doctor: "Dr. Schmidt",
    issued: "Jan 15, 2026",
    expires: "Apr 15, 2026",
    selected: false
  }
];

export default function PrescriptionList() {
  const [, setLocation] = useLocation();
  const [items, setItems] = useState(prescriptions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleSelection = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const selectedCount = items.filter(i => i.selected).length;

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Your Prescriptions" backPath="/prescriptions/nfc-intro" />
      
      <main className="p-5 space-y-6">
        {/* Success Banner */}
        <div className="bg-[#2E7D32] rounded-xl p-4 flex items-center gap-3 shadow-md shadow-green-900/10 text-white">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Check size={18} strokeWidth={3} />
          </div>
          <p className="font-bold">2 prescriptions found</p>
        </div>

        <div className="space-y-4">
          {loading ? (
            // Skeleton Loading
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
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
                className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  item.selected 
                    ? "border-primary shadow-md shadow-primary/10 ring-1 ring-primary" 
                    : "border-slate-100 shadow-sm hover:border-slate-300"
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
                      
                      <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-500">
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
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-10">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            disabled={selectedCount === 0 || loading}
            onClick={() => setLocation("/prescriptions/detail")}
           >
             {loading ? "Loading..." : `Continue with ${selectedCount} selected`}
           </Button>
        </div>
      </div>
    </div>
  );
}
