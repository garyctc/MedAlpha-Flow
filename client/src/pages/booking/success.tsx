import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingSuccess() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center" data-testid="success-screen">
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
        <h1 className="text-2xl font-bold font-display text-slate-900 mb-2">Appointment Confirmed!</h1>
        <p className="text-slate-500 mb-8 max-w-[280px] mx-auto">Your appointment has been booked successfully.</p>

        {/* Summary Card (Compact) */}
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 mb-8 text-center mx-auto max-w-xs">
           <p className="font-bold text-slate-900 text-lg mb-1">Dr. Anna Schmidt</p>
           <p className="text-primary font-medium text-sm mb-3">January 20, 2026 at 9:00 AM</p>
           <p className="text-xs text-slate-500">Health Center Berlin</p>
        </div>

        <div className="space-y-3 w-full">
           <Button variant="outline" className="w-full h-12 rounded-xl text-base border-primary text-primary hover:bg-primary/5">
             <Calendar size={18} className="mr-2" /> Add to Calendar
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
