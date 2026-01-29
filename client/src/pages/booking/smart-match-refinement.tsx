import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type RefinementScenario = {
  type: "time" | "specialty" | "location";
  messageKey: string;
  optionKeys?: string[];
  options?: string[];
};

export default function SmartMatchRefinement() {
  const [, setLocation] = useLocation();
  const [selectedOption, setSelectedOption] = useState("");
  const { t } = useTranslation();

  // Random refinement scenario (memoized so it doesn't change on re-render)
  const scenario = useMemo<RefinementScenario>(() => {
    const scenarios: RefinementScenario[] = [
      {
        type: "time",
        messageKey: "booking.refinement.scenarios.timeUnavailable",
        options: ["Today 2:00 PM", "Tomorrow 10:00 AM", "Tomorrow 3:00 PM"],
      },
      {
        type: "specialty",
        messageKey: "booking.refinement.scenarios.specialistAvailable",
        optionKeys: ["specialty.generalPractice", "specialty.internalMedicine", "specialty.familyMedicine"],
      },
      {
        type: "location",
        messageKey: "booking.refinement.scenarios.nearbyClinic",
        options: ["Downtown Clinic", "Mitte Health Center", "Kreuzberg Medical"],
      },
    ];

    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }, []);

  const displayOptions = scenario.optionKeys
    ? scenario.optionKeys.map(key => t(key))
    : scenario.options || [];

  const handleSubmit = () => {
    if (selectedOption) {
      setLocation("/booking/smart-match-processing");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-amber-50 border-b border-amber-100 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
            <AlertCircle className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">{t("booking.refinement.title")}</h1>
          </div>
        </div>
        <p className="text-sm text-amber-800 bg-amber-100 p-3 rounded-3xl">
          {t(scenario.messageKey)} {t("booking.refinement.selectAlternative")}
        </p>
      </div>

      {/* Form Content */}
      <div className="p-5 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            {scenario.type === "time" && t("booking.refinement.labels.timeSlots")}
            {scenario.type === "specialty" && t("booking.refinement.labels.specialties")}
            {scenario.type === "location" && t("booking.refinement.labels.clinics")}
          </label>
          <div className="space-y-2">
            {displayOptions.map((option) => (
              <motion.button
                key={option}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedOption(option)}
                className={`w-full p-4 rounded-3xl border-2 text-left transition-all ${
                  selectedOption === option
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-muted-foreground/30"
                }`}
              >
                <span
                  className={`font-medium ${
                    selectedOption === option ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {option}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          className="w-full h-12 text-base font-semibold rounded-3xl"
          disabled={!selectedOption}
          onClick={handleSubmit}
        >
          {t("booking.refinement.submit")}
        </Button>

        {/* Cancel */}
        <button
          onClick={() => {
            sessionStorage.removeItem("smart-match-retry");
            setLocation("/booking/review");
          }}
          className="w-full text-muted-foreground text-sm font-medium hover:text-foreground"
        >
          {t("booking.refinement.cancel")}
        </button>
      </div>
    </div>
  );
}
