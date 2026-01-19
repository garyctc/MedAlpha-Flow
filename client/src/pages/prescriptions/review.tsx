import { useLocation } from "wouter";
import { Pencil, Info } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

export default function OrderReview() {
  const [, setLocation] = useLocation();
  const [insuranceType, setInsuranceType] = useState<"gkv" | "pkv">("gkv");

  useEffect(() => {
    const saved = localStorage.getItem("user-insurance-type") as "gkv" | "pkv";
    if (saved) setInsuranceType(saved);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-32">
      <SubPageHeader title="Review Order" backPath="/prescriptions/pharmacy" />
      
      <main className="p-5 space-y-6">
        {/* Pharmacy Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide text-slate-400">Delivery Address</h3>
             <button className="text-primary text-sm font-medium flex items-center gap-1">
               <Pencil size={14} /> Edit
             </button>
           </div>
           
           <div className="space-y-1">
             <p className="font-bold text-slate-900">Max Mustermann</p>
             <p className="text-slate-600">Musterstraße 123</p>
             <p className="text-slate-600">10115 Berlin</p>
           </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
           <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide text-slate-400 mb-4">Order Summary</h3>
           
           <div className="space-y-4">
             <div>
               <div className="flex justify-between items-start mb-1">
                 <div>
                   <p className="font-medium text-slate-900">Metformin 500mg</p>
                   <p className="text-xs text-slate-500">30 tablets</p>
                 </div>
                 {insuranceType === "gkv" ? (
                   <span className="text-sm font-bold text-slate-400 line-through">€24.95</span>
                 ) : (
                   <span className="text-sm font-bold text-slate-900">€24.95</span>
                 )}
               </div>
               
               {insuranceType === "gkv" && (
                 <div className="text-xs space-y-1 mt-1">
                    <div className="flex justify-between text-emerald-600">
                      <span>Insurance covers</span>
                      <span>-€19.95</span>
                    </div>
                    <div className="flex justify-between text-slate-700 font-medium">
                      <span>Your copay</span>
                      <span>€5.00</span>
                    </div>
                 </div>
               )}
             </div>

             <div className="h-px bg-slate-100"></div>

             {/* Discount/Bonus */}
             <div className="flex justify-between items-center">
                {insuranceType === "gkv" ? (
                  <>
                    <span className="text-sm text-emerald-600 font-medium">E-Rezept-Rabatt</span>
                    <span className="text-sm text-emerald-600 font-bold">-€2.50</span>
                  </>
                ) : (
                  <div className="w-full">
                     <div className="flex justify-between items-center mb-1">
                       <span className="text-sm text-blue-600 font-medium">Privatrezept-Bonus</span>
                       <span className="text-sm text-blue-600 font-bold">€2.50 credit</span>
                     </div>
                     <p className="text-xs text-slate-500">You'll receive €2.50 account credit for future orders</p>
                  </div>
                )}
             </div>

             <div className="h-px bg-slate-100"></div>
             
             <div className="flex justify-between items-center">
               <span className="font-bold text-slate-900">
                 {insuranceType === "gkv" ? "Final amount" : "Total due now"}
               </span>
               <span className="font-bold text-slate-900 text-lg">
                 {insuranceType === "gkv" ? "€2.50" : "€24.95"}
               </span>
             </div>
           </div>
        </div>

        {/* PKV Reimbursement Info */}
        {insuranceType === "pkv" && (
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <h4 className="font-bold text-purple-900 text-sm mb-2 flex items-center gap-2">
              <Info size={16} /> Reimbursement Info
            </h4>
            <ul className="space-y-1 text-xs text-purple-800 list-disc list-inside">
              <li>After delivery, you'll receive a Kostenbeleg (receipt)</li>
              <li>Submit this to your insurer for reimbursement</li>
              <li>Typical reimbursement: 75-100% depending on your tariff</li>
            </ul>
          </div>
        )}

        {/* Terms */}
        <div className="flex items-start gap-3">
          <Checkbox id="terms" className="mt-1" />
          <label htmlFor="terms" className="text-xs text-slate-500 leading-snug">
            I agree to the Terms of Service and Privacy Policy. I confirm that I have read the pharmaceutical advice information.
          </label>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-10">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            onClick={() => setLocation("/prescriptions/success")}
           >
             {insuranceType === "gkv" 
               ? "Pay €2.50" 
               : "Pay €24.95 (reimbursable)"
             }
           </Button>
        </div>
      </div>
    </div>
  );
}
