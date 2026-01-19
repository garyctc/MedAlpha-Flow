import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Filter, ChevronRight, Plus, MapPin, Clock, Video, CheckCircle2 } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function AppointmentsPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-5 py-4 pt-12 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-bold text-xl text-slate-900 font-display">Appointments</h1>
        <Button variant="ghost" size="sm" className="text-primary gap-2">
          <Filter size={16} /> Filter
        </Button>
      </header>
      
      <main className="p-5 relative min-h-[calc(100vh-140px)]">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-[2px] ${
              activeTab === "upcoming" 
                ? "border-primary text-primary" 
                : "border-transparent text-slate-500"
            }`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab("past")}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-[2px] ${
              activeTab === "past" 
                ? "border-primary text-primary" 
                : "border-transparent text-slate-500"
            }`}
          >
            Past
          </button>
        </div>

        {activeTab === "upcoming" ? (
          /* Upcoming Content */
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
        ) : (
          /* Past Content */
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">January 2026</h3>
              <div className="space-y-4">
                {/* Card 1 */}
                <AppointmentCard 
                  badge="Completed"
                  badgeColor="bg-emerald-50 text-emerald-700"
                  doctor="Dr. Müller"
                  role="General Practice"
                  location="Health Center Berlin"
                  date="Jan 15, 2026"
                  onClick={() => {}} // No detail for history in prototype
                />

                {/* Card 2 */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3 text-left hover:border-primary/30 transition-all group"
                >
                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-blue-50 text-blue-700">Video</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-700">Completed</span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Jan 10, 2026</span>
                  </div>
                  
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">Dr. Weber</h3>
                      <p className="text-sm text-slate-500">Dermatology • Teleclinic</p>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                </motion.button>

                {/* Card 3 */}
                <AppointmentCard 
                  badge="Cancelled"
                  badgeColor="bg-red-50 text-red-600"
                  doctor="Dr. Koch"
                  role="Orthopedics"
                  location="Health Center Berlin"
                  date="Jan 5, 2026"
                  onClick={() => {}}
                />
              </div>
            </div>
            
            {/* Empty State Example (hidden if content exists) */}
            {/* 
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Calendar className="text-slate-300" size={32} />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">No past appointments</h3>
              <p className="text-sm text-slate-500">Your appointment history will appear here</p>
            </div> 
            */}
          </div>
        )}

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
