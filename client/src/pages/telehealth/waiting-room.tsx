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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-5 py-4 flex justify-between items-center border-b border-slate-100">
        <h1 className="font-bold text-lg text-slate-900">Waiting Room</h1>
        <button onClick={() => setLocation("/home")} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
          <X size={18} />
        </button>
      </header>

      <div className="flex-1 flex flex-col p-6">
         {/* Partner Badge */}
         <div className="flex justify-center mb-6">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-3 py-1 rounded-full">
             Powered by Teleclinic
           </span>
         </div>

         {/* Camera Preview */}
         <div className="w-full aspect-[4/5] bg-slate-900 rounded-3xl relative overflow-hidden mb-2 shadow-inner flex items-center justify-center">
            {/* Fake Camera Feed Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse"></div>
            <div className="relative z-10 flex flex-col items-center gap-2 text-white/50">
              <Camera size={48} />
              <span className="text-sm font-medium">Camera Preview</span>
            </div>
         </div>
         <p className="text-center text-xs text-slate-400 mb-8">Your camera preview</p>

         {/* Queue Status */}
         <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-1">Position: 2</h2>
            <p className="text-slate-500 font-medium flex items-center justify-center gap-2">
              Estimated wait: ~8 minutes
              <span className="flex gap-1">
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1 h-1 bg-slate-400 rounded-full" />
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1 h-1 bg-slate-400 rounded-full" />
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1 h-1 bg-slate-400 rounded-full" />
              </span>
            </p>
         </div>

         {/* Test Buttons */}
         <div className="flex justify-center gap-4 mb-8">
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-full border-slate-200 text-slate-600">
              <Camera size={20} />
            </Button>
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-full border-slate-200 text-slate-600">
              <Mic size={20} />
            </Button>
         </div>

         {/* Tip Card */}
         <div className="bg-blue-50 p-4 rounded-xl text-center text-sm text-blue-800 font-medium">
           Tip: Find a quiet, well-lit space for your consultation
         </div>
      </div>
      
      <div className="p-5 pb-safe text-center">
        <button className="text-red-500 font-medium text-sm hover:underline">Leave Waiting Room</button>
      </div>
    </div>
  );
}
