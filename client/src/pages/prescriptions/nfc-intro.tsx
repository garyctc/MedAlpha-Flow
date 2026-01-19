import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Smartphone, CreditCard } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function NfcIntro() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Scan Health Card" backPath="/prescriptions/type" />
      
      <main className="p-6 flex flex-col items-center justify-between h-[calc(100vh-80px)]">
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          
          {/* Illustration Area */}
          <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
             <div className="absolute inset-0 bg-blue-50 rounded-full animate-pulse opacity-50"></div>
             <Smartphone size={120} className="text-slate-300 relative z-10" />
             
             {/* Floating Card */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
               className="absolute bottom-10 -right-4 bg-primary text-white p-3 rounded-xl shadow-xl z-20"
             >
               <CreditCard size={48} />
             </motion.div>
             
             {/* NFC Waves */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 border-4 border-primary/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
             </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">Position your health card</h2>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 w-full max-w-sm space-y-4">
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold flex-shrink-0">1</div>
               <p className="text-slate-600 font-medium">Hold your Gesundheitskarte ready</p>
             </div>
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold flex-shrink-0">2</div>
               <p className="text-slate-600 font-medium">Place it against the back of your phone</p>
             </div>
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold flex-shrink-0">3</div>
               <p className="text-slate-600 font-medium">Keep it still until scanning completes</p>
             </div>
          </div>
        </div>

        <div className="w-full space-y-4 mb-safe">
          <Button 
            className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20"
            onClick={() => setLocation("/prescriptions/nfc-scan")}
          >
            Start Scanning
          </Button>
          <button className="w-full text-center text-primary font-medium text-sm">
            Having trouble? Enter manually
          </button>
        </div>
      </main>
    </div>
  );
}
