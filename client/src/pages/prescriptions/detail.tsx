import { useLocation } from "wouter";
import { Pill, FileText, Calendar, User } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function PrescriptionDetail() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Prescription Details" backPath="/prescriptions/list" />
      
      <main className="p-5 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
           <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6">
             <Pill size={32} />
           </div>

           <h1 className="text-2xl font-bold text-slate-900 mb-2 font-display">Metformin 500mg</h1>
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-6">
             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
             Active
           </div>

           <div className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Form</span>
                <span className="text-slate-900 font-medium">Tablets</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Quantity</span>
                <span className="text-slate-900 font-medium">30</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Dosage</span>
                <span className="text-slate-900 font-medium">1x daily</span>
              </div>
              
              <div className="flex items-start gap-3 py-3">
                 <User className="text-slate-400 mt-0.5" size={18} />
                 <div>
                   <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Prescribed By</p>
                   <p className="text-slate-900 font-medium">Dr. Anna Schmidt</p>
                 </div>
              </div>
              
              <div className="flex items-start gap-3 py-3">
                 <FileText className="text-slate-400 mt-0.5" size={18} />
                 <div>
                   <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Date Issued</p>
                   <p className="text-slate-900 font-medium">January 15, 2026</p>
                 </div>
              </div>

              <div className="flex items-start gap-3 py-3">
                 <Calendar className="text-slate-400 mt-0.5" size={18} />
                 <div>
                   <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Valid Until</p>
                   <p className="text-slate-900 font-medium">April 15, 2026</p>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-10">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            onClick={() => setLocation("/prescriptions/pharmacy")}
           >
             Redeem This Prescription
           </Button>
        </div>
      </div>
    </div>
  );
}
