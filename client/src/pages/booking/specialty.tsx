import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Stethoscope, User, HeartPulse, Bone, Baby, Search } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Input } from "@/components/ui/input";
import { saveBookingDraft, getBookingDraft } from "@/lib/storage";
import { useTranslation } from "react-i18next";

const specialties = [
  { id: "gp", name: "General Practice", icon: Stethoscope },
  { id: "derm", name: "Dermatology", icon: User },
  { id: "cardio", name: "Cardiology", icon: HeartPulse },
  { id: "ortho", name: "Orthopedics", icon: Bone },
  { id: "gyno", name: "Gynecology", icon: User },
  { id: "peds", name: "Pediatrics", icon: Baby },
];

export default function SpecialtySelect() {
  const [, setLocation] = useLocation();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

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

  const filteredSpecialties = specialties.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title={t("booking.specialty.title", { defaultValue: "Select Specialty" })} backPath="/booking/entry" />

      <main className="p-5">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder={t("booking.specialty.search", { defaultValue: "Search specialties..." })}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredSpecialties.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSpecialtyClick(item.id)}
              className={`bg-card p-5 rounded-3xl border shadow-[var(--shadow-card)] flex flex-col items-center justify-center gap-3 hover:border-primary/30 transition-all aspect-square ${
                selectedSpecialty === item.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon size={28} className="text-primary" strokeWidth={1.5} />
              </div>
              <span className="font-medium text-foreground text-sm">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}
