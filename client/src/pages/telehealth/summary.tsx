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
      <header className="px-5 py-4 pt-12 text-center bg-card border-b border-border">
        <h1 className="font-semibold text-lg text-foreground">Consultation Complete</h1>
      </header>

      <main className="p-5 space-y-6">
        {/* Summary Card */}
        <div className="bg-card rounded-3xl shadow-[var(--shadow-card)] border border-border p-6 text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Video size={32} />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Dr. Müller</h2>
          <p className="text-muted-foreground text-sm mb-4">{consultDate} • 12 mins</p>

          <div className="h-px bg-border w-full my-4"></div>

          <div className="text-left space-y-4">
             <div>
               <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Diagnosis</p>
               <p className="font-medium text-foreground">Common cold (Viral upper respiratory infection)</p>
             </div>
             <div>
               <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Recommendation</p>
               <p className="text-sm text-foreground leading-relaxed">
                 Rest, increase fluid intake (water, tea). Take OTC medication like Paracetamol for fever if needed. Monitor symptoms for next 48 hours.
               </p>
             </div>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-card p-4 rounded-3xl border border-border flex items-center justify-between shadow-[var(--shadow-card)]">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
               <Calendar size={20} />
             </div>
             <span className="font-medium text-foreground">Book Follow-up</span>
           </div>
           <Link href="/telehealth/schedule-type">
             <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">Book</Button>
           </Link>
        </div>

        {/* Rating */}
        <div className="text-center py-4">
          <p className="text-sm font-medium text-foreground mb-3">Rate Your Consultation</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={`cursor-pointer hover:scale-110 transition-transform ${star <= rating ? "text-amber-400 fill-current" : "text-muted-foreground"}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-card border-t border-border pb-safe z-10">
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
