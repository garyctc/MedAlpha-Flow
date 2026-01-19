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
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/booking/specialty")}
          className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-primary/30 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center">
              <Building size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">In-Person Visit</h3>
              <p className="text-slate-500 text-sm mt-1">Book a doctor's appointment at a clinic near you</p>
            </div>
          </div>
          <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
        </motion.button>

        <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center">
              <Video size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Video Consultation</h3>
              <p className="text-slate-500 text-sm mt-1">Coming soon</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
