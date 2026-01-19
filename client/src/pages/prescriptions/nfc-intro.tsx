import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Smartphone, CreditCard, HelpCircle } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function NfcIntro() {
  const [, setLocation] = useLocation();
  const [can, setCan] = useState("");

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Scan Health Card" backPath="/prescriptions/type" />
      
      <main className="p-6 flex flex-col items-center">
          {/* Illustration Area */}
          <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
             <div className="absolute inset-0 bg-blue-50 rounded-full animate-pulse opacity-50"></div>
             <Smartphone size={80} className="text-slate-300 relative z-10" />
             
             {/* Floating Card */}
             <motion.div 
               animate={{ y: [0, -5, 0] }}
               transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
               className="absolute bottom-6 -right-2 bg-primary text-white p-2 rounded-lg shadow-xl z-20"
             >
               <CreditCard size={32} />
             </motion.div>
             
             {/* NFC Waves */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 border-4 border-primary/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
             </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 text-center mb-6">Position your Gesundheitskarte</h2>
          
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 w-full space-y-4 mb-6">
             <div className="flex gap-4">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
               <p className="text-slate-600 text-sm font-medium">Have your health card (eGK) ready</p>
             </div>
             <div className="flex gap-4">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
               <p className="text-slate-600 text-sm font-medium">Find the 6-digit CAN on the card front</p>
             </div>
             <div className="flex gap-4">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
               <p className="text-slate-600 text-sm font-medium">Hold the card against your phone</p>
             </div>
          </div>

          <div className="w-full space-y-2 mb-8">
            <label className="text-sm font-bold text-slate-700">Enter 6-digit CAN</label>
            <div className="relative">
              <Input 
                value={can}
                onChange={(e) => setCan(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={6}
                placeholder="123456"
                className="h-12 bg-white border-slate-200 tracking-widest text-lg"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary text-xs font-bold flex items-center gap-1">
                <HelpCircle size={14} /> Where is my CAN?
              </button>
            </div>
            <p className="text-xs text-slate-500">The CAN is printed on your card, usually top right</p>
          </div>

          <Button 
            className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20"
            onClick={() => setLocation("/prescriptions/nfc-scan")}
            disabled={can.length !== 6}
          >
            Start Scanning
          </Button>
      </main>
    </div>
  );
}
