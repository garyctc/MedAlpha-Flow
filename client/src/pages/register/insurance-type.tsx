import { useState } from "react";
import { useLocation } from "wouter";
import { Shield, ChevronDown, ChevronUp, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { saveRegistrationDraft } from "@/lib/storage";

export default function RegisterInsuranceType() {
  const [, setLocation] = useLocation();
  const [selectedType, setSelectedType] = useState<"gkv" | "pkv" | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-6">
      <SubPageHeader title="Your Health Insurance" backPath="/register/personal" />
      
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
          <span className="text-primary">Step 3</span> of 5
          <div className="flex-1 h-1 bg-slate-100 rounded-full">
            <div className="w-3/5 h-full bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold font-display text-slate-900 mb-1">Which insurance covers your prescriptions?</h2>
          <p className="text-slate-500 text-sm">This determines how you'll redeem e-prescriptions</p>
        </div>

        <div className="space-y-4 mb-8">
          {/* GKV Card */}
          <div 
            onClick={() => setSelectedType("gkv")}
            className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedType === "gkv" 
                ? "border-blue-600 bg-blue-50/50" 
                : "border-border bg-white hover:border-slate-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 ${
                selectedType === "gkv" ? "border-blue-600" : "border-slate-300"
              }`}>
                {selectedType === "gkv" && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield size={18} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900">Public Insurance (GKV)</h3>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">Gesetzliche Krankenversicherung</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    You have a Gesundheitskarte (health card) with NFC
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    Prescriptions cost €5-10 copay
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    Examples: TK, AOK, Barmer, DAK
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* PKV Card */}
          <div 
            onClick={() => setSelectedType("pkv")}
            className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedType === "pkv" 
                ? "border-purple-600 bg-purple-50/50" 
                : "border-border bg-white hover:border-slate-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 ${
                selectedType === "pkv" ? "border-purple-600" : "border-slate-300"
              }`}>
                {selectedType === "pkv" && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield size={18} className="text-purple-600" />
                  <h3 className="font-bold text-slate-900">Private Insurance (PKV)</h3>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">Private Krankenversicherung</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    You use GesundheitsID to access prescriptions
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    You pay upfront, then get reimbursed
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    Examples: Allianz, DKV, Debeka, AXA
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Not sure? */}
        <div className="mb-8">
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-full"
          >
            {showHelp ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            Not sure which one you have?
          </button>
          
          <AnimatePresence>
            {showHelp && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2">
                  <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
                    <p className="mb-3">Check your insurance card. If it has an NFC symbol and a 6-digit CAN number, you have GKV.</p>
                    <div className="h-32 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                      <CreditCard size={48} />
                      {/* Placeholder for card image */}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          className="w-full h-12 text-base font-medium rounded-xl"
          disabled={!selectedType}
          onClick={() => {
            if (selectedType) {
              saveRegistrationDraft({ insuranceType: selectedType });
              setLocation(selectedType === "gkv" ? "/register/gkv-details" : "/register/pkv-details");
            }
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
