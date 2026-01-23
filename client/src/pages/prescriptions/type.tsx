import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Plus, ChevronRight, Package, Check, Calendar, Info } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import appLogo from "@/assets/app-logo.svg";
import { branding } from "@/config/branding";

export default function PrescriptionType() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-5 py-4 pt-12">
          <div className="flex items-center gap-2 min-h-10">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain" />
            </div>
            <h1 className="font-bold text-xl text-slate-900 font-display">Prescriptions</h1>
          </div>
        </div>
      </header>
      
      <main className="p-5 space-y-6">

          {/* Active Content */}
          <div className="space-y-4">
             {/* Reusing existing prescription list items statically for now as per design */}
             <ActivePrescriptionCard 
               medication="Metformin 500mg"
               detail="30 tablets, 1x daily"
               issued="Jan 15, 2026"
               expires="Apr 15, 2026"
               price={5.00}
               onClick={() => setLocation("/prescriptions/detail")}
             />
             <ActivePrescriptionCard 
               medication="Lisinopril 10mg"
               detail="28 tablets, 1x daily"
               issued="Jan 15, 2026"
               expires="Apr 15, 2026"
               price={5.00}
               onClick={() => setLocation("/prescriptions/detail")}
             />
          </div>

      </main>

      {/* FAB */}
      <div className="fixed bottom-[160px] left-0 right-0 max-w-[375px] mx-auto pointer-events-none z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/prescriptions/redeem-start")}
          className="absolute right-5 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center pointer-events-auto"
        >
          <Plus size={28} />
        </motion.button>
      </div>
    </div>
  );
}

function ActivePrescriptionCard({ medication, detail, issued, expires, price, onClick }: any) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white p-5 rounded-2xl border border-border cursor-pointer hover:border-primary/30 transition-all group"
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{medication}</h3>
      </div>
      <p className="text-slate-600 mb-3 font-medium">{detail}</p>
      
      <div className="mb-3">
         <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
           Copay: €{price.toFixed(2)}
         </span>
      </div>

      <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-500 border-t border-slate-50 pt-3">
         <span>Issued: {issued}</span>
         <span className="flex items-center gap-1">
           <Calendar size={12} /> Exp: {expires}
         </span>
      </div>
    </motion.div>
  );
}

function DeliveredCard({ status, statusColor, medication, detail, date, pharmacy, onClick }: any) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white p-4 rounded-2xl border border-border flex flex-col gap-3 text-left hover:border-primary/30 transition-all group"
    >
      <div className="flex justify-between items-start w-full">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${statusColor}`}>{status}</span>
        <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{pharmacy}</span>
      </div>
      
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{medication}</h3>
          <p className="text-sm text-slate-500">{detail}</p>
          <p className="text-xs text-slate-400 mt-1">{date}</p>
        </div>
        <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
      </div>
    </motion.button>
  );
}
