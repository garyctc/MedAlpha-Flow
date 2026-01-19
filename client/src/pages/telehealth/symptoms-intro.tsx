import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const symptoms = [
  "Cold/Flu symptoms",
  "Skin issue",
  "Stomach problems",
  "Pain/Injury",
  "Mental health",
  "Other"
];

export default function SymptomsIntro() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSymptom = (symptom: string) => {
    if (selected.includes(symptom)) {
      setSelected(selected.filter(s => s !== symptom));
    } else {
      setSelected([...selected, symptom]);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Describe Your Symptoms" backPath="/telehealth/schedule-type" />
      
      <div className="w-full h-1 bg-slate-100">
        <div className="h-full bg-primary w-1/3"></div>
      </div>
      
      <main className="p-6">
        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">Step 1 of 3</span>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-display">What is your main concern today?</h2>

        <div className="space-y-3">
          {symptoms.map((symptom) => (
            <motion.div
              key={symptom}
              whileTap={{ scale: 0.99 }}
              onClick={() => toggleSymptom(symptom)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                selected.includes(symptom)
                  ? "bg-blue-50 border-primary text-primary font-medium"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <Checkbox checked={selected.includes(symptom)} />
              <span>{symptom}</span>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-10">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            disabled={selected.length === 0}
            onClick={() => setLocation("/telehealth/symptoms-details")}
           >
             Next
           </Button>
        </div>
      </div>
    </div>
  );
}
