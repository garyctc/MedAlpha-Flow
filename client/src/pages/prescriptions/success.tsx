import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Check, Package, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DURATION_DEFAULT, DURATION_SLOW, EASING_DEFAULT, shouldReduceMotion } from "@/lib/motion";

export default function OrderSuccess() {
  const [, setLocation] = useLocation();
  const [insuranceType, setInsuranceType] = useState<"gkv" | "pkv">("gkv");
  const reduceMotion = shouldReduceMotion();

  useEffect(() => {
    const saved = localStorage.getItem("user-insurance-type") as "gkv" | "pkv";
    if (saved) setInsuranceType(saved);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center" data-testid="order-success-screen">
      <motion.div
        initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: DURATION_SLOW, ease: EASING_DEFAULT }}
        className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6"
      >
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
          <Check size={40} className="text-white" strokeWidth={3} />
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: DURATION_DEFAULT, ease: EASING_DEFAULT, delay: DURATION_DEFAULT }
        }
        className="w-full"
      >
        <h1 className="text-2xl font-bold font-display text-slate-900 mb-2">Order placed</h1>
        <p className="text-slate-500 mb-8 max-w-[280px] mx-auto">Your prescription has been sent to Apo Group.</p>

        {/* Order Details Card */}
        <div className="bg-slate-50 rounded-2xl border border-border p-6 mb-6 text-left relative overflow-hidden">
           <div className="flex items-center gap-4 mb-4">
             <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 text-primary">
               <Package size={20} />
             </div>
             <div>
               <p className="text-xs text-slate-500 uppercase font-bold">Order Number</p>
               <p className="text-slate-900 font-mono font-medium">#MED-2026-0119</p>
             </div>
           </div>
           
           <div className="space-y-1">
             <p className="text-sm text-slate-500">Estimated Delivery</p>
             <p className="font-bold text-slate-900">January 21-22, 2026</p>
           </div>
        </div>

        {/* PKV Kostenbeleg Section */}
        {insuranceType === "pkv" && (
          <div className="bg-purple-50 rounded-2xl border border-purple-100 p-5 mb-8 text-left">
            <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
              Reimbursement Receipt
            </h3>
            <div className="flex gap-4 items-start mb-3">
               <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-purple-600 border border-purple-100 flex-shrink-0">
                 <FileText size={20} />
               </div>
               <div>
                 <p className="text-sm text-purple-900 font-medium">Your Kostenbeleg will be available after delivery</p>
                 <p className="text-xs text-purple-700 mt-1">We'll notify you when it's ready</p>
               </div>
            </div>
            <button 
              onClick={() => setLocation("/prescriptions/receipt")} 
              className="text-xs font-bold text-purple-600 flex items-center gap-1 hover:underline"
            >
              <Info size={12} /> Preview Receipt
            </button>
          </div>
        )}

        <div className="space-y-3 w-full">
           <Button variant="outline" className="w-full h-12 rounded-xl text-base border-slate-200 text-slate-700">
             Track Order
           </Button>
           
           <Link href="/home">
             <Button className="w-full h-12 rounded-xl text-base bg-primary hover:bg-primary/90">
               Done
             </Button>
           </Link>
        </div>
      </motion.div>
    </div>
  );
}
