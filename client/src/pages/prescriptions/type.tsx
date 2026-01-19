import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Truck, MapPin, ChevronRight, Info, Shield, CreditCard } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { useState, useEffect } from "react";

export default function PrescriptionType() {
  const [, setLocation] = useLocation();
  const [insuranceType, setInsuranceType] = useState<"gkv" | "pkv">("gkv");

  // Simulate persistent insurance type
  useEffect(() => {
    const saved = localStorage.getItem("user-insurance-type") as "gkv" | "pkv";
    if (saved) setInsuranceType(saved);
  }, []);

  const toggleInsurance = () => {
    const newType = insuranceType === "gkv" ? "pkv" : "gkv";
    setInsuranceType(newType);
    localStorage.setItem("user-insurance-type", newType);
  };

  const handleOnlineClick = () => {
    if (insuranceType === "gkv") {
      setLocation("/prescriptions/nfc-intro");
    } else {
      setLocation("/prescriptions/pkv-auth");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="px-5 py-4 pt-12 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-bold text-xl text-slate-900 font-display">Prescriptions</h1>
      </header>
      
      <main className="p-5 space-y-6">
        {/* Insurance Toggle/Badge */}
        <div className="flex justify-end">
          <button 
            onClick={toggleInsurance}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              insuranceType === "gkv" 
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200" 
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            {insuranceType === "gkv" ? <Shield size={12} /> : <CreditCard size={12} />}
            {insuranceType === "gkv" ? "Public Insurance" : "Private Insurance"}
          </button>
        </div>

        {/* Info Banner */}
        <div className={`border rounded-xl p-4 flex gap-3 items-start ${
          insuranceType === "gkv" 
            ? "bg-blue-50 border-blue-100" 
            : "bg-purple-50 border-purple-100"
        }`}>
          <Info className={`${insuranceType === "gkv" ? "text-blue-600" : "text-purple-600"} shrink-0 mt-0.5`} size={20} />
          <p className="text-sm text-slate-700 font-medium">
            {insuranceType === "gkv" 
              ? "Scan your health card to retrieve prescriptions"
              : "Use GesundheitsID to retrieve prescriptions"
            }
          </p>
        </div>

        <div className="space-y-4">
          {/* Online Pharmacy Card */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleOnlineClick}
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
