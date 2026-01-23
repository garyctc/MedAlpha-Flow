import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Stethoscope, User, HeartPulse, Bone, Baby, Search } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Input } from "@/components/ui/input";
import { saveBookingDraft, getBookingDraft } from "@/lib/storage";

const specialties = [
  { id: "gp", name: "General Practice", icon: Stethoscope, color: "text-blue-500", bg: "bg-blue-50" },
  { id: "derm", name: "Dermatology", icon: User, color: "text-rose-500", bg: "bg-rose-50" },
  { id: "cardio", name: "Cardiology", icon: HeartPulse, color: "text-red-500", bg: "bg-red-50" },
  { id: "ortho", name: "Orthopedics", icon: Bone, color: "text-slate-500", bg: "bg-slate-100" },
  { id: "gyno", name: "Gynecology", icon: User, color: "text-pink-500", bg: "bg-pink-50" },
  { id: "peds", name: "Pediatrics", icon: Baby, color: "text-emerald-500", bg: "bg-emerald-50" },
];

export default function SpecialtySelect() {
  const [, setLocation] = useLocation();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  useEffect(() => {
    const draft = getBookingDraft();
    if (draft?.specialty) {
      setSelectedSpecialty(draft.specialty);
    }
  }, []);

  const handleSpecialtyClick = (specialty: string) => {
    saveBookingDraft({ specialty });
    setLocation(`/booking/location?specialty=${specialty}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Select Specialty" backPath="/booking/type" />
      
      <main className="p-5">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            placeholder="Search specialties..." 
            className="pl-10 h-12 bg-white border-slate-200 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {specialties.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSpecialtyClick(item.id)}
              className={`bg-white p-5 rounded-2xl border flex flex-col items-center justify-center gap-3 hover:border-primary/30 transition-all aspect-square ${
                selectedSpecialty === item.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'
              }`}
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
