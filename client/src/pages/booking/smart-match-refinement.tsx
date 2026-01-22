import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type RefinementScenario = {
  type: "time" | "specialty" | "location";
  message: string;
  options: string[];
};

export default function SmartMatchRefinement() {
  const [, setLocation] = useLocation();
  const [selectedOption, setSelectedOption] = useState("");

  // Random refinement scenario (memoized so it doesn't change on re-render)
  const scenario = useMemo<RefinementScenario>(() => {
    const scenarios: RefinementScenario[] = [
      {
        type: "time",
        message: "Your preferred time slot is unavailable.",
        options: ["Today 2:00 PM", "Tomorrow 10:00 AM", "Tomorrow 3:00 PM"],
      },
      {
        type: "specialty",
        message: "We found a similar specialist available sooner.",
        options: ["General Practice", "Internal Medicine", "Family Medicine"],
      },
      {
        type: "location",
        message: "Suggested nearby clinic with availability.",
        options: ["Downtown Clinic", "Mitte Health Center", "Kreuzberg Medical"],
      },
    ];

    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }, []);

  const handleSubmit = () => {
    if (selectedOption) {
      setLocation("/booking/smart-match-processing");
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-amber-50 border-b border-amber-100 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
            <AlertCircle className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">Additional Information Needed</h1>
          </div>
        </div>
        <p className="text-sm text-amber-800 bg-amber-100 p-3 rounded-lg">
          {scenario.message} Please select an alternative below.
        </p>
      </div>

      {/* Form Content */}
      <div className="p-5 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            {scenario.type === "time" && "Available Time Slots"}
            {scenario.type === "specialty" && "Alternative Specialties"}
            {scenario.type === "location" && "Nearby Clinics"}
          </label>
          <div className="space-y-2">
            {scenario.options.map((option) => (
              <motion.button
                key={option}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedOption(option)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  selectedOption === option
                    ? "border-purple-600 bg-purple-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span
                  className={`font-medium ${
                    selectedOption === option ? "text-purple-900" : "text-slate-700"
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
          className="w-full h-12 text-base font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
          disabled={!selectedOption}
          onClick={handleSubmit}
        >
          Submit Selection
        </Button>

        {/* Cancel */}
        <button
          onClick={() => {
            sessionStorage.removeItem("smart-match-retry");
            setLocation("/booking/review");
          }}
          className="w-full text-slate-500 text-sm font-medium hover:text-slate-700"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
}
