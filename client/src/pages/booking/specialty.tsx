import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Stethoscope, User, HeartPulse, Brain, Eye, Activity } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";

const specialties = [
  { id: "gp", name: "General Doctor", icon: Stethoscope, color: "text-blue-500", bg: "bg-blue-50" },
  { id: "dental", name: "Dentist", icon: User, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: "cardio", name: "Cardiologist", icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-50" },
  { id: "neuro", name: "Neurologist", icon: Brain, color: "text-violet-500", bg: "bg-violet-50" },
  { id: "vision", name: "Optometrist", icon: Eye, color: "text-amber-500", bg: "bg-amber-50" },
  { id: "physio", name: "Physiotherapy", icon: Activity, color: "text-cyan-500", bg: "bg-cyan-50" },
];

export default function SpecialtySelect() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="New Appointment" backPath="/home" />
      
      <main className="p-5">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Choose Specialty</h2>
          <p className="text-slate-500 text-sm">Select the type of doctor you need to see.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {specialties.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLocation(`/booking/doctors?specialty=${item.id}`)}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:border-primary/30 transition-all aspect-square"
            >
              <div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center ${item.color}`}>
                <item.icon size={28} />
              </div>
              <span className="font-medium text-slate-800 text-sm">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}
