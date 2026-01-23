import { motion } from "framer-motion";
import { QrCode, Copy, Info, Radio } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function PrescriptionRedeem() {
  return (
    <div className="min-h-screen bg-primary pb-20">
      <SubPageHeader title="Redeem Prescription" className="bg-transparent border-none text-white [&>button]:bg-white/10 [&>button]:text-white [&>h1]:text-white" />
      
      <main className="p-6 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 w-full text-center relative mt-4"
        >
          <div className="w-16 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
          
          <h2 className="text-xl font-bold text-slate-900 mb-1">Amoxicillin 500mg</h2>
          <p className="text-slate-500 text-sm mb-8">Ref #8923-1290-AZ</p>

          <div className="bg-white p-4 border-2 border-slate-900 rounded-2xl inline-block mb-6 relative">
            <QrCode size={180} className="text-slate-900" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               {/* Optional Logo in middle of QR */}
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                 <div className="w-2 h-2 bg-primary rounded-full"></div>
               </div>
            </div>
          </div>

          <p className="text-slate-600 font-medium mb-6">Scan at any Cardlink pharmacy</p>

          <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-border mb-6">
             <div className="text-left">
               <span className="text-xs text-slate-400 block uppercase tracking-wider">Expires</span>
               <span className="text-sm font-bold text-slate-800">Jan 28, 2026</span>
             </div>
             <div className="h-8 w-px bg-slate-200"></div>
             <div className="text-left">
               <span className="text-xs text-slate-400 block uppercase tracking-wider">Copay</span>
               <span className="text-sm font-bold text-slate-800">$15.00</span>
             </div>
          </div>
          
          <div className="space-y-3">
             <Button className="w-full h-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-2">
                 <Radio size={18} className="animate-pulse" />
                 Tap for NFC
             </Button>

             <Button variant="outline" className="w-full border-slate-200 h-12 rounded-xl">
               <Copy size={16} className="mr-2" /> Copy Reference ID
             </Button>
          </div>

        </motion.div>

        <div className="mt-8 text-white/60 text-sm flex items-start gap-2 max-w-[280px]">
           <Info size={16} className="mt-0.5 flex-shrink-0" />
           <p>Show this code to your pharmacist. This prescription is valid for one-time use only.</p>
        </div>
      </main>
    </div>
  );
}
