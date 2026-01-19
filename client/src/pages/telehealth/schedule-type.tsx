import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";

export default function ScheduleType() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Video Consultation" backPath="/booking/type" />
      
      <div className="px-5 pt-2 flex justify-end">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-full">
           Powered by Teleclinic
        </span>
      </div>

      <main className="p-5 space-y-4">
        {/* Next Available Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/telehealth/symptoms-intro")}
          className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-primary/30 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Next Available</h3>
              <p className="text-slate-500 text-sm mt-1">Estimated wait: ~15 minutes</p>
            </div>
          </div>
          <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
        </motion.button>

        {/* Schedule Later Card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/booking/calendar")} // Reuse simplify flow or mock it
          className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-primary/30 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Pick a Time</h3>
              <p className="text-slate-500 text-sm mt-1">Choose a specific appointment slot</p>
            </div>
          </div>
          <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
        </motion.button>
      </main>
    </div>
  );
}
