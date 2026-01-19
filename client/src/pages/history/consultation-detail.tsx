import { Link, useLocation } from "wouter";
import { Video, Calendar, Download, FileText } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function ConsultationDetail() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Consultation Details" backPath="/history" />
      
      <main className="p-5 space-y-6">
        <div className="flex justify-center">
           <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
             Completed
           </span>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-1 rounded-bl-xl">
             Powered by Teleclinic
           </div>
           
           <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <Video size={32} />
           </div>
           
           <h2 className="text-xl font-bold text-slate-900 mb-1">Dr. Müller</h2>
           <p className="text-slate-500 text-sm mb-4">January 19, 2026 • 12 mins</p>
        </div>

        {/* Doctor's Summary */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
           <div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Diagnosis</p>
             <p className="font-medium text-slate-900">Common cold</p>
           </div>
           
           <div className="h-px bg-slate-100 w-full"></div>
           
           <div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Recommendation</p>
             <p className="text-sm text-slate-700 leading-relaxed">
               Rest, fluids, over-the-counter cold medication. Follow up if symptoms persist beyond 7 days.
             </p>
           </div>
        </div>

        {/* Prescription Link */}
        <Link href="/history/prescription/1">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-primary/30 transition-all group">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center">
                 <FileText size={20} />
               </div>
               <div>
                 <p className="font-medium text-slate-900 text-sm">Prescription Issued</p>
                 <p className="text-xs text-slate-500">View details</p>
               </div>
             </div>
             <Button size="sm" variant="ghost" className="text-primary group-hover:bg-blue-50">View</Button>
          </div>
        </Link>

        {/* Documents */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center">
               <Download size={20} />
             </div>
             <div>
               <p className="font-medium text-slate-900 text-sm">Consultation Summary</p>
               <p className="text-xs text-slate-500">PDF • 1.2 MB</p>
             </div>
           </div>
           <Button size="sm" variant="outline" className="border-slate-200">Download</Button>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
           <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
             Book Follow-up
           </Button>
           <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 text-slate-700">
             Book with Same Doctor
           </Button>
        </div>
      </main>
    </div>
  );
}
