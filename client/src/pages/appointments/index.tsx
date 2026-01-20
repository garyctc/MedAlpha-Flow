import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Filter, ChevronRight, Plus, MapPin, Clock, Video, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Appointment = {
  id: string;
  status: "upcoming" | "past";
  type: "in-person" | "video";
  badge: string;
  badgeColor: string;
  doctor: string;
  role: string;
  location: string;
  date: string;
  subStatus?: string; // e.g., "Cancelled", "Completed"
};

const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    status: "upcoming",
    type: "in-person",
    badge: "Tomorrow",
    badgeColor: "bg-blue-50 text-blue-600",
    doctor: "Dr. Anna Schmidt",
    role: "General Practice",
    location: "Health Center Berlin",
    date: "Jan 20, 2026 • 9:00 AM"
  },
  {
    id: "2",
    status: "upcoming",
    type: "in-person",
    badge: "In 3 days",
    badgeColor: "bg-blue-50 text-blue-600",
    doctor: "Dr. Weber",
    role: "Dermatology",
    location: "Skin Clinic Mitte",
    date: "Jan 22, 2026 • 2:30 PM"
  },
  {
    id: "3",
    status: "upcoming",
    type: "video",
    badge: "Jan 27",
    badgeColor: "bg-slate-100 text-slate-500",
    doctor: "Dr. Koch",
    role: "General Practice",
    location: "Video Consultation",
    date: "Jan 27, 2026 • 11:00 AM"
  },
  {
    id: "4",
    status: "past",
    type: "in-person",
    badge: "Completed",
    badgeColor: "bg-emerald-50 text-emerald-700",
    doctor: "Dr. Müller",
    role: "General Practice",
    location: "Health Center Berlin",
    date: "Jan 15, 2026",
    subStatus: "Completed"
  },
  {
    id: "5",
    status: "past",
    type: "video",
    badge: "Video",
    badgeColor: "bg-blue-50 text-blue-700",
    doctor: "Dr. Weber",
    role: "Dermatology",
    location: "Teleclinic",
    date: "Jan 10, 2026",
    subStatus: "Completed"
  },
  {
    id: "6",
    status: "past",
    type: "in-person",
    badge: "Cancelled",
    badgeColor: "bg-red-50 text-red-600",
    doctor: "Dr. Koch",
    role: "Orthopedics",
    location: "Health Center Berlin",
    date: "Jan 5, 2026",
    subStatus: "Cancelled"
  }
];

export default function AppointmentsPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "in-person" | "video">("all");

  const filteredAppointments = SAMPLE_APPOINTMENTS.filter(apt => {
    // Only show upcoming appointments in this view, as past ones are in History tab
    if (apt.status !== "upcoming") return false;
    
    // Filter by type
    if (filterType === "all") return true;
    return apt.type === filterType;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="px-5 py-4 pt-12 flex justify-between items-center">
          <h1 className="font-bold text-xl text-slate-900 font-display">Appointments</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("gap-2 transition-colors", showFilter && "text-primary bg-primary/5")}
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? <X size={16} /> : <Filter size={16} />} 
            {showFilter ? "Close" : "Filter"}
          </Button>
        </div>
        
        {/* Filter Options */}
        <AnimatePresence>
          {showFilter && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-5 pb-4 overflow-hidden"
            >
              <div className="flex gap-2">
                {[
                  { id: "all", label: "All Types" },
                  { id: "in-person", label: "In-Person" },
                  { id: "video", label: "Video" }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFilterType(option.id as any)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                      filterType === option.id
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <main className="p-5 relative min-h-[calc(100vh-140px)]">
        
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

        {/* FAB */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/booking/type")}
          className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center z-20"
        >
          <Plus size={28} />
        </motion.button>
      </main>
    </div>
  );
}

function AppointmentCard({ data, onClick }: { data: Appointment, onClick: () => void }) {
  const isVideo = data.type === "video";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3 text-left hover:border-primary/30 transition-all group"
    >
      <div className="flex justify-between items-start w-full">
        <div className="flex gap-2">
          {data.subStatus === "Completed" && (
             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-700">Completed</span>
          )}
          {data.subStatus === "Cancelled" && (
             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-red-50 text-red-600">Cancelled</span>
          )}
           {!data.subStatus && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${data.badgeColor}`}>{data.badge}</span>
          )}
          
          {isVideo && (
             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-indigo-50 text-indigo-600 flex items-center gap-1">
               <Video size={10} /> Video
             </span>
          )}
        </div>
        <span className="text-xs text-slate-400 font-medium">{data.date}</span>
      </div>
      
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{data.doctor}</h3>
          <p className="text-sm text-slate-500">{data.role}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
             {isVideo ? <Video size={10} /> : <MapPin size={10} />}
             <span>{data.location}</span>
          </div>
        </div>
        <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
      </div>
    </motion.button>
  );
}
