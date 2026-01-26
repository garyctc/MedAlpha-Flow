import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Stethoscope, User } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { saveBookingDraft } from "@/lib/storage";

export default function BookingEntry() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Book an Appointment" backPath="/booking/type" />
      <main className="p-5 space-y-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            saveBookingDraft({ entryMode: "specialty", intent: "new" });
            setLocation("/booking/specialty");
          }}
          className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center">
              <Stethoscope size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Select Specialty</h3>
              <p className="text-slate-500 text-sm mt-1">Fastest available appointment</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            saveBookingDraft({ entryMode: "doctor", intent: "new" });
            setLocation("/booking/doctors");
          }}
          className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <User size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Select Doctor</h3>
              <p className="text-slate-500 text-sm mt-1">Choose a specific doctor</p>
            </div>
          </div>
        </motion.button>
      </main>
    </div>
  );
}
