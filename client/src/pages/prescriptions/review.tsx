import { useLocation } from "wouter";
import { Pencil } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function OrderReview() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Review Order" backPath="/prescriptions/pharmacy" />
      
      <main className="p-5 space-y-6">
        {/* Delivery Address */}
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
           
           <div className="flex justify-between items-start mb-4">
             <div>
               <p className="font-medium text-slate-900">Metformin 500mg</p>
               <p className="text-xs text-slate-500">30 tablets</p>
             </div>
             <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Insurance covered</span>
           </div>
           
           <div className="h-px bg-slate-100 my-4"></div>
           
           <div className="flex justify-between items-center">
             <span className="font-bold text-slate-900">Total</span>
             <span className="font-bold text-slate-900 text-lg">€0.00</span>
           </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-10">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            onClick={() => setLocation("/prescriptions/success")}
           >
             Place Order
           </Button>
        </div>
      </div>
    </div>
  );
}
