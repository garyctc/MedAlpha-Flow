import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, Video, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TelehealthSummary() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="px-5 py-4 pt-12 text-center bg-white border-b border-slate-100">
        <h1 className="font-bold text-lg text-slate-900">Consultation Complete</h1>
      </header>
      
      <main className="p-5 space-y-6">
        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Dr. Müller</h2>
          <p className="text-slate-500 text-sm mb-4">January 19, 2026 • 12 mins</p>
          
          <div className="h-px bg-slate-100 w-full my-4"></div>
          
          <div className="text-left space-y-4">
             <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Diagnosis</p>
               <p className="font-medium text-slate-900">Common cold (Viral upper respiratory infection)</p>
             </div>
             <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Recommendation</p>
               <p className="text-sm text-slate-700 leading-relaxed">
                 Rest, increase fluid intake (water, tea). Take OTC medication like Paracetamol for fever if needed. Monitor symptoms for next 48 hours.
               </p>
             </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                 <FileText size={20} />
               </div>
               <span className="font-medium text-slate-900">View Prescription</span>
             </div>
             <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">View</Button>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center">
                 <Calendar size={20} />
               </div>
               <span className="font-medium text-slate-900">Book Follow-up</span>
             </div>
             <Button size="sm" variant="outline" className="border-blue-200 text-primary hover:bg-blue-50">Book</Button>
          </div>
        </div>

        {/* Rating */}
        <div className="text-center py-4">
          <p className="text-sm font-medium text-slate-700 mb-3">Rate Your Consultation</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={28} className="text-amber-400 fill-current cursor-pointer hover:scale-110 transition-transform" />
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-10">
        <div className="max-w-[375px] mx-auto">
          <Link href="/home">
            <Button className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
              Done
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
