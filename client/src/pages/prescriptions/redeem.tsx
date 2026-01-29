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
          className="bg-white rounded-3xl p-8 w-full shadow-2xl shadow-black/20 text-center relative mt-4"
        >
          <div className="w-16 h-1 bg-border rounded-full mx-auto mb-6"></div>

          <h2 className="text-xl font-semibold text-foreground mb-1">Amoxicillin 500mg</h2>
          <p className="text-muted-foreground text-sm mb-8">Ref #8923-1290-AZ</p>

          <div className="bg-card p-4 border-2 border-foreground rounded-3xl inline-block mb-6 relative">
            <QrCode size={180} className="text-foreground" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               {/* Optional Logo in middle of QR */}
               <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center">
                 <div className="w-2 h-2 bg-primary rounded-full"></div>
               </div>
            </div>
          </div>

          <p className="text-muted-foreground font-medium mb-6">Scan at any Cardlink pharmacy</p>

          <div className="flex items-center justify-between bg-muted rounded-3xl p-3 border border-border mb-6">
             <div className="text-left">
               <span className="text-xs text-muted-foreground block uppercase tracking-wider">Expires</span>
               <span className="text-sm font-semibold text-foreground">Jan 28, 2026</span>
             </div>
             <div className="h-8 w-px bg-border"></div>
             <div className="text-left">
               <span className="text-xs text-muted-foreground block uppercase tracking-wider">Copay</span>
               <span className="text-sm font-semibold text-foreground">$15.00</span>
             </div>
          </div>

          <div className="space-y-3">
             <Button className="w-full h-12 rounded-3xl bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2">
                 <Radio size={18} className="animate-pulse" />
                 Tap for NFC
             </Button>

             <Button variant="outline" className="w-full border-border h-12 rounded-3xl">
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
