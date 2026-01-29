import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2, Check, Clock } from "lucide-react";

export default function SmartMatchProcessing() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 15, 90));
    }, 300);

    // Animate steps
    const stepTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, 2));
    }, 800);

    // Navigate to success after 2.5s
    const decisionTimer = setTimeout(() => {
      setLocation("/booking/success");
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-5 text-center">
      {/* MedAlpha Match Logo */}
      <div className="w-20 h-20 bg-primary rounded-full mb-6 flex items-center justify-center shadow-lg">
        <span className="text-white text-3xl font-semibold">M</span>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-foreground mb-2">Processing your request...</h2>
      <p className="text-muted-foreground mb-8 text-sm">This usually takes 10-30 seconds</p>

      {/* Progress Bar */}
      <div className="w-full max-w-xs mb-8">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
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
                    ? "bg-primary text-white"
                    : isCurrent
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
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
                  isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Spinner */}
      <Loader2 className="animate-spin text-primary mb-8" size={32} />

      {/* Cancel Button */}
      <button
        onClick={() => setLocation("/booking/review")}
        className="text-muted-foreground font-medium text-sm hover:text-foreground"
      >
        Cancel
      </button>
    </div>
  );
}
