import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Camera, Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WaitingRoom() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Simulate call starting after 4 seconds
    const timer = setTimeout(() => {
      setLocation("/telehealth/call");
    }, 4000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-card flex flex-col">
      {/* Header */}
      <header className="px-5 py-4 flex justify-between items-center border-b border-border">
        <h1 className="font-semibold text-lg text-foreground">Waiting Room</h1>
        <button onClick={() => setLocation("/home")} className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <X size={18} />
        </button>
      </header>

      <div className="flex-1 flex flex-col p-6">
         {/* Partner Badge */}
         <div className="flex justify-center mb-6">
           <span className="text-[10px] font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
             Powered by Teleclinic
           </span>
         </div>

         {/* Camera Preview */}
         <div className="w-full aspect-[4/5] bg-slate-900 rounded-3xl relative overflow-hidden mb-2 shadow-[var(--shadow-card)] flex items-center justify-center">
            {/* Fake Camera Feed Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse"></div>
            <div className="relative z-10 flex flex-col items-center gap-2 text-white/50">
              <Camera size={48} />
              <span className="text-sm font-medium">Camera Preview</span>
            </div>
         </div>
         <p className="text-center text-xs text-muted-foreground mb-8">Your camera preview</p>

         {/* Queue Status */}
         <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-1">Position: 2</h2>
            <p className="text-muted-foreground font-medium flex items-center justify-center gap-2">
              Estimated wait: ~8 minutes
              <span className="flex gap-1">
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1 h-1 bg-muted-foreground rounded-full" />
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1 h-1 bg-muted-foreground rounded-full" />
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1 h-1 bg-muted-foreground rounded-full" />
              </span>
            </p>
         </div>

         {/* Test Buttons */}
         <div className="flex justify-center gap-4 mb-8">
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-full border-border text-foreground">
              <Camera size={20} />
            </Button>
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-full border-border text-foreground">
              <Mic size={20} />
            </Button>
         </div>

         {/* Tip Card */}
         <div className="bg-primary/10 p-4 rounded-3xl text-center text-sm text-primary font-medium shadow-[var(--shadow-card)]">
           Tip: Find a quiet, well-lit space for your consultation
         </div>
      </div>

      <div className="p-5 pb-safe text-center">
        <button className="text-red-500 font-medium text-sm hover:underline">Leave Waiting Room</button>
      </div>
    </div>
  );
}
