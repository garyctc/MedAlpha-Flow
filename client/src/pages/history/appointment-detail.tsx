import { Link, useLocation } from "wouter";
import { Calendar, MapPin, User, FileText, Clock } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function AppointmentDetail() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Appointment Details" backPath="/history" />
      
      <main className="p-5 space-y-6">
        <div className="flex justify-center">
           <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
             Completed
           </span>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-5 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Dr. Anna Schmidt</h2>
              <p className="text-slate-500 text-sm">General Practice</p>
           </div>
           
           <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Location</p>
                  <p className="text-sm font-medium text-slate-900">Health Center Berlin</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Date</p>
                  <p className="text-sm font-medium text-slate-900">January 15, 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Time</p>
                  <p className="text-sm font-medium text-slate-900">9:00 AM</p>
                </div>
              </div>
           </div>
        </div>

        {/* Notes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
           <div className="flex items-center gap-2 mb-3">
             <FileText size={18} className="text-primary" />
             <h3 className="font-bold text-slate-900 text-sm">Doctor's Notes</h3>
           </div>
           <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
             Routine checkup. Blood pressure normal. Recommended annual follow-up.
           </p>
           
           <div className="mt-4 pt-4 border-t border-slate-100">
             <Link href="/history/prescription/1" className="flex items-center justify-between group">
               <span className="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors">Prescription issued</span>
               <span className="text-xs text-primary font-bold">View</span>
             </Link>
           </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
           <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
             Book Again
           </Button>
           <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 text-slate-700">
             Find Similar Doctors
           </Button>
        </div>
      </main>
    </div>
  );
}
