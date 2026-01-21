import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2, Check, Clock } from "lucide-react";

export default function CuraayProcessing() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if this is a retry (from refinement)
    const isRetry = sessionStorage.getItem("curaay-retry") === "true";

    // Animate progress bar
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 15, 90));
    }, 300);

    // Animate steps
    const stepTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, 2));
    }, 800);

    // Final decision after 2.5s
    const decisionTimer = setTimeout(() => {
      if (isRetry) {
        // Second time always succeeds
        sessionStorage.removeItem("curaay-retry");
        setLocation("/booking/curaay-success");
      } else {
        const random = Math.random();
        if (random < 0.7) {
          // 70% success
          setLocation("/booking/curaay-success");
        } else {
          // 30% refinement
          sessionStorage.setItem("curaay-retry", "true");
          setLocation("/booking/curaay-refinement");
        }
      }
    }, 2500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      clearTimeout(decisionTimer);
    };
  }, [setLocation]);

  const steps = [
    { label: "Verifying your information", icon: Check },
    { label: "Finding available appointments", icon: Clock },
    { label: "Confirming booking", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-5 text-center">
      {/* Curaay Logo */}
      <div className="w-20 h-20 bg-teal-500 rounded-full mb-6 flex items-center justify-center shadow-lg">
        <span className="text-white text-3xl font-bold">C</span>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Processing your request...</h2>
      <p className="text-slate-500 mb-8 text-sm">This usually takes 10-30 seconds</p>

      {/* Progress Bar */}
      <div className="w-full max-w-xs mb-8">
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-8 text-left w-full max-w-xs">
        {steps.map((s, index) => {
          const StepIcon = s.icon;
          const isCompleted = index < step;
          const isCurrent = index === step;

          return (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted
                    ? "bg-teal-500 text-white"
                    : isCurrent
                    ? "bg-teal-100 text-teal-600"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <Check size={18} />
                ) : (
                  <StepIcon size={18} className={isCurrent ? "animate-pulse" : ""} />
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  isCompleted || isCurrent ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Spinner */}
      <Loader2 className="animate-spin text-teal-500 mb-8" size={32} />

      {/* Cancel Button */}
      <button
        onClick={() => {
          sessionStorage.removeItem("curaay-retry");
          setLocation("/booking/review");
        }}
        className="text-slate-400 font-medium text-sm hover:text-slate-600"
      >
        Cancel
      </button>
    </div>
  );
}
