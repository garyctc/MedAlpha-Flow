import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Filter, ChevronRight, Plus, MapPin, Clock, Video, CheckCircle2, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dmLogo from "@/assets/dm-logo.svg";
import { useToast } from "@/hooks/use-toast";
import PushNotificationBanner from "@/components/ui/push-notification-banner";
import { getUserAppointments, saveAppointment } from "@/lib/storage";
import type { Appointment as StoredAppointment } from "@/types/storage";

type Appointment = {
  id: string;
  status: "upcoming" | "past" | "processing";
  type: "in-person" | "video";
  badge: string;
  badgeColor: string;
  doctor: string;
  role: string;
  location: string;
  date: string;
  subStatus?: string; // e.g., "Cancelled", "Completed", "Processing"
};

// Convert stored appointments to display format
function convertStoredAppointments(stored: StoredAppointment[]): Appointment[] {
  return stored.map(apt => {
    const statusDisplay = apt.status === 'processing' ? 'processing' :
      apt.status === 'upcoming' ? 'upcoming' : 'past';

    let badge = apt.date;
    let badgeColor = "bg-slate-100 text-slate-500";

    if (apt.status === 'processing') {
      badge = 'Processing';
      badgeColor = "bg-blue-50 text-blue-600";
    } else if (apt.status === 'completed') {
      badge = 'Completed';
      badgeColor = "bg-emerald-50 text-emerald-700";
    } else if (apt.status === 'cancelled') {
      badge = 'Cancelled';
      badgeColor = "bg-red-50 text-red-600";
    } else if (apt.type === 'video') {
      badge = 'Video';
      badgeColor = "bg-blue-50 text-blue-700";
    }

    return {
      id: apt.id,
      status: statusDisplay,
      type: apt.type,
      badge,
      badgeColor,
      doctor: apt.doctor,
      role: apt.specialty,
      location: apt.clinic,
      date: `${apt.date} • ${apt.time}`,
      subStatus: apt.status === 'completed' ? 'Completed' :
        apt.status === 'cancelled' ? 'Cancelled' :
        apt.status === 'processing' ? 'Processing' : undefined
    };
  });
}

export default function AppointmentsPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [filterType, setFilterType] = useState<"all" | "in-person" | "video">("all");
  const [pendingBooking, setPendingBooking] = useState<Appointment | null>(null);
  const [showPushNotification, setShowPushNotification] = useState(false);
  const [confirmedDoctorName, setConfirmedDoctorName] = useState("");
  const { toast } = useToast();

  // Check for pending Curaay booking on mount
  useEffect(() => {
    const bookingData = localStorage.getItem("pending-curaay-booking");
    if (bookingData) {
      const booking = JSON.parse(bookingData);
      setPendingBooking({
        id: booking.id,
        status: "processing",
        type: "in-person",
        badge: "Processing",
        badgeColor: "bg-blue-50 text-blue-600",
        doctor: "TBD",
        role: "Awaiting confirmation",
        location: "Curaay Health Center",
        date: booking.date,
        subStatus: "Processing"
      });

      // Simulate webhook after 5 seconds
      const webhookTimer = setTimeout(() => {
        const doctorName = "Dr. Sarah Johnson";

        // Update to confirmed
        const confirmedAppointment = {
          id: booking.id,
          status: "upcoming",
          type: "in-person",
          badge: "Tomorrow",
          badgeColor: "bg-blue-50 text-blue-600",
          doctor: doctorName,
          role: "General Practice",
          location: "Curaay Health Center, Downtown Berlin",
          date: "January 24, 2026 • 10:00 AM",
          subStatus: undefined
        };

        setPendingBooking(confirmedAppointment);

        // Save to persistent storage
        saveAppointment({
          id: booking.id,
          type: "in-person",
          doctor: doctorName,
          specialty: "General Practice",
          clinic: "Curaay Health Center, Downtown Berlin",
          date: "January 24, 2026",
          time: "10:00 AM",
          status: "upcoming",
          createdAt: booking.createdAt
        });

        // Store doctor name for push notification
        setConfirmedDoctorName(doctorName);

        // Clear from localStorage
        localStorage.removeItem("pending-curaay-booking");

        // Show toast notification
        toast({
          title: "Appointment Confirmed!",
          description: `Your appointment with ${doctorName} has been confirmed.`,
        });

        // Simulate "appointment concluded" push notification after 12 more seconds
        const pushTimer = setTimeout(() => {
          setShowPushNotification(true);
        }, 12000);

        return () => clearTimeout(pushTimer);
      }, 5000);

      return () => clearTimeout(webhookTimer);
    }
  }, [toast]);

  // Combine pending booking with stored appointments
  const storedAppointments = convertStoredAppointments(getUserAppointments());
  const allAppointments = pendingBooking
    ? [pendingBooking, ...storedAppointments]
    : storedAppointments;

  const filteredAppointments = allAppointments.filter(apt => {
    // Only show upcoming and processing appointments in this view
    if (apt.status !== "upcoming" && apt.status !== "processing") return false;

    // Filter by type
    if (filterType === "all") return true;
    return apt.type === filterType;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Push Notification Banner */}
      <PushNotificationBanner
        show={showPushNotification}
        title="Appointment Completed"
        message={`How was your visit with ${confirmedDoctorName}? Would you like to redeem a prescription or find a nearby pharmacy?`}
        onDismiss={() => setShowPushNotification(false)}
        onActionPrimary={() => setLocation("/prescriptions")}
        onActionSecondary={() => setLocation("/pharmacy/map")}
        primaryLabel="Redeem Prescription"
        secondaryLabel="Find Pharmacy"
      />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="px-5 py-4 pt-12">
          <div className="flex items-center gap-2 mb-4 min-h-10">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={dmLogo} alt="DM Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-bold text-xl text-slate-900 font-display">Appointments</h1>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "all", label: "All Types" },
              { id: "in-person", label: "In-Person" },
              { id: "video", label: "Video" }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setFilterType(option.id as any)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap",
                  filterType === option.id
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      <main className="p-5 relative">

        {/* Note: Removed tabs for Upcoming/Past as History is now in a separate tab */}

        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
              <AppointmentCard 
                key={apt.id}
                data={apt}
                onClick={() => setLocation("/appointments/detail")}
              />
            ))
          ) : (
             <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
               <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                 <Filter size={20} className="text-slate-300" />
               </div>
               <p className="text-sm">No upcoming {filterType !== 'all' ? filterType : ''} appointments</p>
               <Button variant="link" onClick={() => setLocation("/history")} className="mt-2 text-primary">View History</Button>
             </div>
          )}
        </div>

      </main>

      {/* FAB */}
      <div className="fixed bottom-[160px] left-0 right-0 max-w-[375px] mx-auto pointer-events-none z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/booking/type")}
          className="absolute right-5 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center pointer-events-auto"
        >
          <Plus size={28} />
        </motion.button>
      </div>
    </div>
  );
}

function AppointmentCard({ data, onClick }: { data: Appointment, onClick: () => void }) {
  const isVideo = data.type === "video";
  const isProcessing = data.status === "processing";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border shadow-sm flex flex-col gap-3 text-left transition-all group ${
        isProcessing
          ? "bg-purple-50 border-purple-200"
          : "bg-white border-slate-100 hover:border-primary/30"
      }`}
    >
      <div className="flex justify-between items-start w-full">
        <div className="flex gap-2">
          {data.subStatus === "Processing" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-purple-600 text-white flex items-center gap-1 animate-pulse">
              <Loader2 size={10} className="animate-spin" /> Processing
            </span>
          )}
          {data.subStatus === "Completed" && (
             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-700">Completed</span>
          )}
          {data.subStatus === "Cancelled" && (
             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-red-50 text-red-600">Cancelled</span>
          )}
           {!data.subStatus && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${data.badgeColor}`}>{data.badge}</span>
          )}

          {isVideo && !isProcessing && (
             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-cyan-50 text-cyan-600 flex items-center gap-1">
               <Video size={10} /> Video
             </span>
          )}
        </div>
        <span className="text-xs text-slate-400 font-medium">{data.date}</span>
      </div>


      <div className="flex justify-between items-center w-full">
        <div className="flex-1">
          <h3 className={`font-bold text-lg transition-colors ${
            isProcessing ? "text-purple-900" : "text-slate-900 group-hover:text-primary"
          }`}>{data.doctor}</h3>
          <p className="text-sm text-slate-500">{data.role}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
             {isVideo ? <Video size={10} /> : <MapPin size={10} />}
             <span>{data.location}</span>
          </div>
          {isProcessing && (
            <span className="inline-block mt-2 text-[9px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Powered by Curaay
            </span>
          )}
        </div>
        <ChevronRight size={20} className={`transition-colors ${
          isProcessing ? "text-purple-400" : "text-slate-300 group-hover:text-primary"
        }`} />
      </div>
    </motion.button>
  );
}
