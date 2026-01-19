import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Building, Video, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";

export default function BookingType() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Book Appointment" backPath="/home" />
      
      <main className="p-5 space-y-4">
        {/* In-Person Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/booking/specialty")}
          className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-primary/30 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
              <Building size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">In-Person Visit</h3>
              <p className="text-slate-500 text-sm mt-1">Book a doctor's appointment at a clinic near you</p>
            </div>
          </div>
          <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
        </motion.button>

        {/* Telemedicine Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/telehealth/schedule-type")}
          className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-primary/30 transition-all text-left relative overflow-hidden"
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
              <Video size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Video Consultation</h3>
              <p className="text-slate-500 text-sm mt-1">Speak with a doctor from home</p>
              <span className="inline-block mt-2 text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Powered by Teleclinic
              </span>
            </div>
          </div>
          <ChevronRight className="text-slate-300 group-hover:text-purple-600 transition-colors relative z-10" />
        </motion.button>
      </main>
    </div>
  );
}
