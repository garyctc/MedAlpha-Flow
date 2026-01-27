import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Smartphone, Vibrate, Wifi } from "lucide-react";

export default function NfcScan() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Simulate scan success
    const timer = setTimeout(() => {
      // Could vibrate here if device API supported
      if (navigator.vibrate) navigator.vibrate(200);
      setLocation("/prescriptions/gkv-sms-verify");
    }, 4000); // Increased duration as per Prompt 14C

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col relative overflow-hidden" data-testid="nfc-scan-screen">
      
      {/* Background Pulse Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
           animate={{ scale: [1, 2], opacity: [0.5, 0] }}
           transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
           className="w-64 h-64 rounded-full border border-white/30"
        />
        <motion.div
           animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
           transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.2 }}
           className="w-48 h-48 rounded-full border border-white/50 absolute"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-6">
         <motion.div
           animate={{ rotate: [0, 5, -5, 0] }}
           transition={{ repeat: Infinity, duration: 0.5 }}
           className="mb-8"
         >
           <Smartphone size={80} className="text-white" />
         </motion.div>

         <h2 className="text-2xl font-semibold mb-2">Scanning...</h2>
         <p className="text-white/60 mb-2">Hold your card still</p>
         <p className="text-white/40 text-sm">This may take up to 20 seconds</p>

         <div className="flex items-center gap-2 text-white/40 text-sm mt-8">
           <Vibrate size={16} />
           <span>Haptic feedback enabled</span>
         </div>
      </div>

      <div className="p-6 pb-safe z-10">
        <button 
          onClick={() => window.history.back()}
          className="w-full py-4 text-white/80 font-medium hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
