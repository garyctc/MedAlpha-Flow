import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Truck, MapPin, ChevronRight, Info } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";

export default function PrescriptionType() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Redeem Prescription" backPath="/home" />
      
      <main className="p-5 space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
          <Info className="text-primary shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-slate-700 font-medium">Choose how you'd like to redeem your e-prescription</p>
        </div>

        <div className="space-y-4">
          {/* Online Pharmacy Card */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setLocation("/prescriptions/nfc-intro")}
            className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-primary/30 transition-all text-left relative overflow-hidden"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Online Pharmacy</h3>
                <p className="text-slate-500 text-sm mt-1">Get your medication delivered to your door</p>
                <span className="inline-block mt-2 text-[10px] font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Powered by Apo Group
                </span>
              </div>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors relative z-10" />
          </motion.button>

          {/* Local Pharmacy Card */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setLocation("/pharmacy/map")}
            className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-primary/30 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Local Pharmacy</h3>
                <p className="text-slate-500 text-sm mt-1">Find a pharmacy near you</p>
              </div>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
          </motion.button>
        </div>
      </main>
    </div>
  );
}
