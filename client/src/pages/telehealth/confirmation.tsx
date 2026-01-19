import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Check, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TelehealthConfirmation() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center" data-testid="telehealth-success-screen">
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
        <h1 className="text-2xl font-bold font-display text-slate-900 mb-2">Consultation Scheduled!</h1>
        <p className="text-slate-500 mb-8 max-w-[280px] mx-auto">You'll be connected with a doctor shortly.</p>

        {/* Info Card */}
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 mb-8 text-left relative overflow-hidden">
           <div className="flex items-start gap-4 mb-4">
             <Clock className="text-primary mt-1" size={20} />
             <div>
               <p className="font-bold text-slate-900">Estimated wait: ~15 minutes</p>
               <p className="text-sm text-slate-500 mt-1">You'll receive a notification when it's your turn.</p>
             </div>
           </div>
        </div>

        <div className="space-y-3 w-full">
           <Button 
             className="w-full h-12 rounded-xl text-base bg-primary hover:bg-primary/90"
             onClick={() => setLocation("/telehealth/waiting-room")}
           >
             Join Waiting Room
           </Button>
           
           <Button variant="outline" className="w-full h-12 rounded-xl text-base border-slate-200 text-slate-700">
             <Bell size={18} className="mr-2" /> I'll Wait for Notification
           </Button>
        </div>
      </motion.div>
    </div>
  );
}
