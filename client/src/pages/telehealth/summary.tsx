import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, Video, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserAppointments, updateAppointment } from "@/lib/storage";
import { format } from "date-fns";

export default function TelehealthSummary() {
  const [consultDate, setConsultDate] = useState("January 19, 2026");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Find the most recent video appointment and mark it as completed
    const appointments = getUserAppointments();
    const videoAppt = appointments.find(a => a.type === "video" && a.status === "upcoming");
    if (videoAppt) {
      updateAppointment(videoAppt.id, { status: "completed" });
      try {
        setConsultDate(format(new Date(), "MMMM d, yyyy"));
      } catch {
        setConsultDate("Today");
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="px-5 py-4 pt-12 text-center bg-white border-b border-border">
        <h1 className="font-bold text-lg text-slate-900">Consultation Complete</h1>
      </header>
      
      <main className="p-5 space-y-6">
        {/* Summary Card */}
        <div className="bg-white rounded-2xl border border-border p-6 text-center">
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Dr. Müller</h2>
          <p className="text-slate-500 text-sm mb-4">{consultDate} • 12 mins</p>
          
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

        {/* Action Card */}
        <div className="bg-white p-4 rounded-xl border border-border flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center">
               <Calendar size={20} />
             </div>
             <span className="font-medium text-slate-900">Book Follow-up</span>
           </div>
           <Link href="/telehealth/schedule-type">
             <Button size="sm" variant="outline" className="border-blue-200 text-primary hover:bg-blue-50">Book</Button>
           </Link>
        </div>

        {/* Rating */}
        <div className="text-center py-4">
          <p className="text-sm font-medium text-slate-700 mb-3">Rate Your Consultation</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={`cursor-pointer hover:scale-110 transition-transform ${star <= rating ? "text-amber-400 fill-current" : "text-slate-300"}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-border pb-safe z-10">
        <div className="max-w-[375px] mx-auto">
          <Link href="/home">
            <Button className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white">
              Done
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
