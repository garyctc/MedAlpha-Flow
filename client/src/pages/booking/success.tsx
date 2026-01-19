import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, Calendar, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingSuccess() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center" data-testid="success-screen">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
      >
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
          <Check size={40} className="text-white" strokeWidth={3} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold font-display text-slate-900 mb-2">Booking Confirmed!</h1>
        <p className="text-slate-500 mb-8 max-w-[280px] mx-auto">Your appointment has been successfully scheduled.</p>

        {/* Ticket Card */}
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 mb-8 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
          
          <div className="flex items-start gap-4 mb-4 border-b border-slate-200 pb-4">
             <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-primary text-xl">
               24
             </div>
             <div>
               <p className="font-bold text-slate-900">Dr. Sarah Johnson</p>
               <p className="text-sm text-slate-500">General Checkup</p>
             </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={18} className="text-primary" />
              <span className="text-slate-700">Jan 24, 2026 • 10:00 AM</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={18} className="text-primary" />
              <span className="text-slate-700">Curaay Clinic, Downtown</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 w-full">
           <Link href="/home">
             <Button className="w-full h-12 rounded-xl text-base">Return Home</Button>
           </Link>
           <Button variant="outline" className="w-full h-12 rounded-xl text-base border-slate-200 text-slate-600">
             <Download size={18} className="mr-2" /> Add to Calendar
           </Button>
        </div>
      </motion.div>
    </div>
  );
}
