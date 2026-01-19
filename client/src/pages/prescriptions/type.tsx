import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Plus, ChevronRight, Package, Check, Calendar, Info } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function PrescriptionType() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-5 py-4 pt-12 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-bold text-xl text-slate-900 font-display">Prescriptions</h1>
      </header>
      
      <main className="p-5 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-2 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab("active")}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-[2px] ${
              activeTab === "active" 
                ? "border-primary text-primary" 
                : "border-transparent text-slate-500"
            }`}
          >
            Active
          </button>
          <button 
            onClick={() => setActiveTab("delivered")}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-[2px] ${
              activeTab === "delivered" 
                ? "border-primary text-primary" 
                : "border-transparent text-slate-500"
            }`}
          >
            Delivered
          </button>
        </div>

        {activeTab === "active" ? (
          /* Active Content */
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
        ) : (
          /* Delivered Content */
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">January 2026</h3>
              <div className="space-y-4">
                <DeliveredCard 
                  status="Delivered"
                  statusColor="bg-emerald-50 text-emerald-700"
                  medication="Metformin 500mg"
                  detail="30 tablets"
                  date="Delivered Jan 18, 2026"
                  pharmacy="Apo Group"
                  onClick={() => setLocation("/prescriptions/detail?status=delivered")}
                />
                <DeliveredCard 
                  status="Delivered"
                  statusColor="bg-emerald-50 text-emerald-700"
                  medication="Ibuprofen 400mg"
                  detail="20 tablets"
                  date="Delivered Jan 12, 2026"
                  pharmacy="dm Pharmacy Berlin"
                  onClick={() => setLocation("/prescriptions/detail?status=delivered")}
                />
                <DeliveredCard 
                  status="Picked up"
                  statusColor="bg-emerald-50 text-emerald-700"
                  medication="Vitamin D 1000 IU"
                  detail="60 capsules"
                  date="Picked up Jan 8, 2026"
                  pharmacy="Local Pharmacy"
                  onClick={() => setLocation("/prescriptions/detail?status=pickedup")}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">December 2025</h3>
              <div className="space-y-4">
                 <DeliveredCard 
                  status="Delivered"
                  statusColor="bg-emerald-50 text-emerald-700"
                  medication="Amoxicillin 500mg"
                  detail="21 tablets"
                  date="Delivered Dec 20, 2025"
                  pharmacy="Apo Group"
                  onClick={() => setLocation("/prescriptions/detail?status=delivered")}
                />
              </div>
            </div>
          </div>
        )}

        {/* FAB */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/prescriptions/redeem-start")}
          className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center z-20"
        >
          <Plus size={28} />
        </motion.button>
      </main>
    </div>
  );
}

function ActivePrescriptionCard({ medication, detail, issued, expires, price, onClick }: any) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:border-primary/30 transition-all group"
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
      className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3 text-left hover:border-primary/30 transition-all group"
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
