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
    <div className="min-h-screen bg-background pb-6">
      <SubPageHeader title="Your Health Insurance" backPath="/register/personal" />

      <div className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-6">
          <span className="text-primary">Step 3</span> of 5
          <div className="flex-1 h-1 bg-muted rounded-full">
            <div className="w-3/5 h-full bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold font-display text-foreground mb-1">Which insurance covers your prescriptions?</h2>
          <p className="text-muted-foreground text-sm">This determines how you'll redeem e-prescriptions</p>
        </div>

        <div className="space-y-4 mb-8">
          {/* GKV Card */}
          <div
            onClick={() => setSelectedType("gkv")}
            className={`relative p-5 rounded-3xl border-2 transition-all cursor-pointer shadow-[var(--shadow-card)] ${
              selectedType === "gkv"
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 ${
                selectedType === "gkv" ? "border-primary" : "border-border"
              }`}>
                {selectedType === "gkv" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield size={14} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Public Insurance (GKV)</h3>
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-3 uppercase tracking-wider">Gesetzliche Krankenversicherung</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">*</span>
                    You have a Gesundheitskarte (health card) with NFC
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">*</span>
                    Prescriptions cost 5-10 EUR copay
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">*</span>
                    Examples: TK, AOK, Barmer, DAK
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* PKV Card */}
          <div
            onClick={() => setSelectedType("pkv")}
            className={`relative p-5 rounded-3xl border-2 transition-all cursor-pointer shadow-[var(--shadow-card)] ${
              selectedType === "pkv"
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 ${
                selectedType === "pkv" ? "border-primary" : "border-border"
              }`}>
                {selectedType === "pkv" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield size={14} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Private Insurance (PKV)</h3>
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-3 uppercase tracking-wider">Private Krankenversicherung</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">*</span>
                    You use GesundheitsID to access prescriptions
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">*</span>
                    You pay upfront, then get reimbursed
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">*</span>
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
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full"
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
                  <div className="bg-muted p-4 rounded-3xl text-sm text-muted-foreground">
                    <p className="mb-3">Check your insurance card. If it has an NFC symbol and a 6-digit CAN number, you have GKV.</p>
                    <div className="h-32 bg-card rounded-xl flex items-center justify-center text-muted-foreground border border-border">
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
          className="w-full h-12 text-base font-medium rounded-3xl"
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
