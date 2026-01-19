import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center" data-testid="order-success-screen">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6"
      >
        <div className="w-16 h-16 bg-[#2E7D32] rounded-full flex items-center justify-center shadow-lg shadow-green-200">
          <Check size={40} className="text-white" strokeWidth={3} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full"
      >
        <h1 className="text-2xl font-bold font-display text-slate-900 mb-2">Order Placed!</h1>
        <p className="text-slate-500 mb-8 max-w-[280px] mx-auto">Your prescription has been sent to Apo Group.</p>

        {/* Order Details Card */}
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 mb-8 text-left relative overflow-hidden">
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
