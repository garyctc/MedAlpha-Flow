import { Link, useLocation } from "wouter";
import { Pill, FileText, Calendar, User, Truck, CheckCircle2 } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function PrescriptionDetail() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Prescription Details" backPath="/history" />
      
      <main className="p-5 space-y-6">
        <div className="flex justify-center">
           <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
             <CheckCircle2 size={12} /> Delivered
           </span>
        </div>

        {/* Medication Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
           <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6">
             <Pill size={32} />
           </div>

           <h1 className="text-2xl font-bold text-slate-900 mb-2 font-display">Metformin 500mg</h1>
           
           <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Form</span>
                <span className="text-slate-900 font-medium">Tablets</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Quantity</span>
                <span className="text-slate-900 font-medium">30</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Dosage</span>
                <span className="text-slate-900 font-medium">1x daily with meals</span>
              </div>
           </div>
        </div>

        {/* Info */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
           <div className="flex items-center gap-3">
             <User size={18} className="text-slate-400" />
             <div>
               <p className="text-xs text-slate-400 font-bold uppercase">Prescribed By</p>
               <p className="text-sm font-medium text-slate-900">Dr. Anna Schmidt</p>
             </div>
           </div>
           
           <div className="flex items-center gap-3">
             <FileText size={18} className="text-slate-400" />
             <div>
               <p className="text-xs text-slate-400 font-bold uppercase">Date Issued</p>
               <p className="text-sm font-medium text-slate-900">January 15, 2026</p>
             </div>
           </div>

           <div className="flex items-center gap-3">
             <Calendar size={18} className="text-slate-400" />
             <div>
               <p className="text-xs text-slate-400 font-bold uppercase">Valid Until</p>
               <p className="text-sm font-medium text-slate-900">April 15, 2026</p>
             </div>
           </div>
        </div>

        {/* Fulfillment */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
           <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
             <Truck size={16} /> Fulfillment
           </h3>
           <div className="flex justify-between text-sm">
             <span className="text-slate-500">Method</span>
             <span className="font-medium text-slate-900">Online (Apo Group)</span>
           </div>
           <div className="flex justify-between text-sm">
             <span className="text-slate-500">Order #</span>
             <span className="font-medium text-slate-900 font-mono">MED-2026-0116</span>
           </div>
           <div className="flex justify-between text-sm">
             <span className="text-slate-500">Delivered</span>
             <span className="font-medium text-slate-900">January 18, 2026</span>
           </div>
        </div>

        <Button className="w-full h-12 rounded-xl bg-primary shadow-lg shadow-primary/20">
          Reorder
        </Button>
      </main>
    </div>
  );
}
