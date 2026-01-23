import { useState } from "react";
import { useLocation } from "wouter";
import { Truck } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function PharmacyConfirm() {
  const [, setLocation] = useLocation();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Confirm Pharmacy" backPath="/prescriptions/detail" />
      
      <main className="p-5 space-y-6">
        {/* Partner Card */}
        <div className="bg-white rounded-2xl p-6 border border-blue-100 ring-2 ring-blue-50">
           <div className="flex items-center gap-3 mb-4">
             {/* Logo Placeholder */}
             <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-xs">
               APO
             </div>
             <h2 className="text-lg font-bold text-slate-900">Apo Group</h2>
           </div>
           <p className="text-slate-600 text-sm">
             Your prescription will be fulfilled by Apo Group Online Pharmacy, a certified partner.
           </p>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-2xl p-5 border border-border">
           <div className="flex items-center gap-3 mb-2">
             <Truck className="text-primary" size={24} />
             <h3 className="font-bold text-slate-900">Standard Delivery</h3>
           </div>
           <p className="text-slate-600 text-sm pl-9">Estimated: 1-2 business days</p>
           <p className="text-emerald-600 font-medium text-xs pl-9 mt-1">Free shipping on prescriptions</p>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 p-2">
           <Checkbox 
             id="terms" 
             checked={agreed} 
             onCheckedChange={(c) => setAgreed(!!c)} 
           />
           <div className="grid gap-1.5 leading-none">
             <label
               htmlFor="terms"
               className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700"
             >
               I accept the terms and conditions and authorize the transfer of my prescription data to Apo Group.
             </label>
           </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-border pb-safe z-[60]">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white"
            disabled={!agreed}
            onClick={() => setLocation("/prescriptions/review")}
           >
             Continue to Order
           </Button>
        </div>
      </div>
    </div>
  );
}
