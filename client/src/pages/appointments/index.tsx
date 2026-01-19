import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Filter, ChevronRight, Plus, MapPin, Clock } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function AppointmentsPage() {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState("upcoming");

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-5 py-4 pt-12 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-bold text-xl text-slate-900 font-display">Appointments</h1>
        <Button variant="ghost" size="sm" className="text-primary gap-2">
          <Filter size={16} /> Filter
        </Button>
      </header>
      
      <main className="p-5 relative min-h-[calc(100vh-140px)]">
        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "upcoming" ? "bg-primary text-white" : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "all" ? "bg-primary text-white" : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            All
          </button>
        </div>

        {/* List */}
        <div className="space-y-4">
          <AppointmentCard 
            badge="Tomorrow"
            badgeColor="bg-blue-50 text-blue-600"
            doctor="Dr. Anna Schmidt"
            role="General Practice"
            location="Health Center Berlin"
            date="Jan 20, 2026 • 9:00 AM"
            onClick={() => setLocation("/appointments/detail")}
          />
          
          <AppointmentCard 
            badge="In 3 days"
            badgeColor="bg-blue-50 text-blue-600"
            doctor="Dr. Weber"
            role="Dermatology"
            location="Skin Clinic Mitte"
            date="Jan 22, 2026 • 2:30 PM"
            onClick={() => setLocation("/appointments/detail")}
          />
          
          <AppointmentCard 
            badge="Jan 27"
            badgeColor="bg-slate-100 text-slate-500"
            doctor="Dr. Koch"
            role="General Practice"
            location="Health Center Berlin"
            date="Jan 27, 2026 • 11:00 AM"
            onClick={() => setLocation("/appointments/detail")}
          />
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

function AppointmentCard({ badge, badgeColor, doctor, role, location, date, onClick }: any) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3 text-left hover:border-primary/30 transition-all group"
    >
      <div className="flex justify-between items-start w-full">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${badgeColor}`}>{badge}</span>
        <span className="text-xs text-slate-400 font-medium">{date}</span>
      </div>
      
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{doctor}</h3>
          <p className="text-sm text-slate-500">{role}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
             <MapPin size={10} />
             <span>{location}</span>
          </div>
        </div>
        <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
      </div>
    </motion.button>
  );
}
