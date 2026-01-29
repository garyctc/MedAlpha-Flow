import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Check, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DURATION_DEFAULT, DURATION_SLOW, EASING_DEFAULT, shouldReduceMotion } from "@/lib/motion";
import { saveAppointment, getBookingDraft, clearBookingDraft } from "@/lib/storage";
import { format } from "date-fns";
import { DOCTORS } from "@/lib/constants/doctors";

export default function TelehealthConfirmation() {
  const [, setLocation] = useLocation();
  const reduceMotion = shouldReduceMotion();

  const handleJoinWaitingRoom = () => {
    const draft = getBookingDraft();
    const today = format(new Date(), "yyyy-MM-dd");
    const now = format(new Date(), "HH:mm");

    // Use Dr. Thomas Müller with his consistent avatar
    const drMueller = DOCTORS.find(d => d.name.includes('Müller'));

    // Save video appointment
    saveAppointment({
      id: `VID-${Date.now()}`,
      type: "video",
      doctor: drMueller?.name || "Dr. Thomas Müller",
      doctorImage: drMueller?.image || undefined,
      specialty: draft?.symptoms?.[0] || "General Consultation",
      clinic: "Teleclinic",
      date: today,
      time: now,
      status: "upcoming",
      createdAt: new Date().toISOString()
    });

    clearBookingDraft();
    setLocation("/telehealth/waiting-room");
  };

  return (
    <div className="min-h-screen bg-card flex flex-col items-center justify-center p-6 text-center" data-testid="telehealth-success-screen">
      <motion.div
        initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: DURATION_SLOW, ease: EASING_DEFAULT }}
        className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"
      >
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-lg shadow-green-200">
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
        <h1 className="text-2xl font-semibold font-display text-foreground mb-2">Consultation scheduled</h1>
        <p className="text-muted-foreground mb-8 max-w-[280px] mx-auto">You'll be connected with a doctor shortly.</p>

        {/* Info Card */}
        <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] p-6 mb-8 text-left relative overflow-hidden">
           <div className="flex items-start gap-4 mb-4">
             <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
               <Clock size={20} />
             </div>
             <div>
               <p className="font-semibold text-foreground">Estimated wait: ~15 minutes</p>
               <p className="text-sm text-muted-foreground mt-1">You'll receive a notification when it's your turn.</p>
             </div>
           </div>
        </div>

        <div className="space-y-3 w-full">
           <Button
             className="w-full h-12 rounded-xl text-base bg-primary hover:bg-primary/90"
             onClick={handleJoinWaitingRoom}
           >
             Join Waiting Room
           </Button>

           <Button variant="outline" className="w-full h-12 rounded-xl text-base border-border text-foreground">
             <Bell size={18} className="mr-2" /> I'll Wait for Notification
           </Button>
        </div>
      </motion.div>
    </div>
  );
}
