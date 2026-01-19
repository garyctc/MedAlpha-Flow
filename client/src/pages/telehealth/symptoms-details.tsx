import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function SymptomsDetails() {
  const [, setLocation] = useLocation();
  const [duration, setDuration] = useState("1-3");
  const [painLevel, setPainLevel] = useState([5]);

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="More Details" backPath="/telehealth/symptoms-intro" />
      
      <div className="w-full h-1 bg-slate-100">
        <div className="h-full bg-primary w-2/3"></div>
      </div>
      
      <main className="p-6 space-y-8">
        <div>
           <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">Step 2 of 3</span>
           <h2 className="text-xl font-bold text-slate-900 mb-4 font-display">How long have you had these symptoms?</h2>
           
           <RadioGroup value={duration} onValueChange={setDuration} className="space-y-3">
             {[
               { id: "<24", label: "Less than 24 hours" },
               { id: "1-3", label: "1-3 days" },
               { id: "4-7", label: "4-7 days" },
               { id: ">7", label: "More than a week" }
             ].map((opt) => (
               <div key={opt.id} className={`flex items-center space-x-3 p-4 rounded-xl border transition-all ${duration === opt.id ? "bg-blue-50 border-primary" : "bg-white border-slate-200"}`}>
                 <RadioGroupItem value={opt.id} id={opt.id} className="text-primary" />
                 <Label htmlFor={opt.id} className="flex-1 cursor-pointer font-medium text-slate-700">{opt.label}</Label>
               </div>
             ))}
           </RadioGroup>
        </div>

        <div>
           <h2 className="text-xl font-bold text-slate-900 mb-6 font-display">Rate your discomfort (1-10)</h2>
           <div className="bg-white p-6 rounded-2xl border border-slate-200">
             <div className="text-center text-4xl font-bold text-primary mb-6">{painLevel[0]}</div>
             <Slider 
               value={painLevel} 
               onValueChange={setPainLevel} 
               max={10} 
               step={1} 
               className="mb-2"
             />
             <div className="flex justify-between text-xs text-slate-400 font-bold uppercase mt-4">
               <span>Mild</span>
               <span>Severe</span>
             </div>
           </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-[60]">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            onClick={() => setLocation("/telehealth/symptoms-info")}
           >
             Next
           </Button>
        </div>
      </div>
    </div>
  );
}
