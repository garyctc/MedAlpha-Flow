import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Check, Calendar, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getRegistrationDraft, clearRegistrationDraft, saveUserProfile, saveUserInsurance, saveAuthState } from "@/lib/storage";
import { showSuccess } from "@/lib/toast-helpers";
import { DURATION_DEFAULT, DURATION_SLOW, EASING_DEFAULT, shouldReduceMotion } from "@/lib/motion";
import { branding } from "@/config/branding";

export default function RegisterComplete() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const type = searchParams.get("type") || "gkv";
  const isGkv = type === "gkv";
  const [userData, setUserData] = useState({ name: "", email: "" });
  const reduceMotion = shouldReduceMotion();

  useEffect(() => {
    // Move registration draft to permanent storage
    const draft = getRegistrationDraft();
    if (draft) {
      // Save profile
      if (draft.personalInfo) {
        saveUserProfile({
          firstName: draft.personalInfo.firstName,
          lastName: draft.personalInfo.lastName,
          dateOfBirth: draft.personalInfo.dateOfBirth,
          phone: draft.personalInfo.phone,
          email: draft.email || "",
          street: draft.address?.street || "",
          city: draft.address?.city || "",
          postalCode: draft.address?.postalCode || ""
        });

        // Update display data
        setUserData({
          name: `${draft.personalInfo.firstName} ${draft.personalInfo.lastName}`,
          email: draft.email || ""
        });
      }

      // Save insurance
      if (draft.insuranceType) {
        saveUserInsurance({
          type: draft.insuranceType,
          provider: draft.insuranceProvider || "",
          memberNumber: draft.insuranceMemberNumber || "",
          insuranceNumber: draft.insuranceNumber
        });
      }

      // Save auth state - user is now logged in
      saveAuthState({ isLoggedIn: true, userId: "user-" + Date.now() });

      // Clear registration draft
      clearRegistrationDraft();

      // Show success toast
      showSuccess("Account created successfully");
    }
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-center items-center text-center">
      <motion.div
        initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: DURATION_SLOW, ease: EASING_DEFAULT }}
        className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6"
      >
        <Check size={48} strokeWidth={3} />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: DURATION_DEFAULT, ease: EASING_DEFAULT, delay: DURATION_DEFAULT }
        }
        className="space-y-8 w-full max-w-sm"
      >
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 mb-2">Welcome to {branding.appName}</h1>
          <p className="text-slate-500">Your account has been created</p>
        </div>

        {/* User Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-border text-left">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 border border-slate-200 font-bold text-lg">
               {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
             </div>
             <div>
               <h3 className="font-bold text-slate-900">{userData.name}</h3>
               <p className="text-xs text-slate-500">{userData.email}</p>
             </div>
          </div>
          <div className={`text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-2 ${
            isGkv ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
          }`}>
            <div className={`w-2 h-2 rounded-full ${isGkv ? "bg-blue-600" : "bg-purple-600"}`} />
            {isGkv ? "Public Insurance (GKV)" : "Private Insurance (PKV)"}
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 text-left">What's next?</h3>
          
          <div className="flex items-center gap-3 text-left text-sm text-slate-600 bg-white border border-border p-3 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
               <Calendar size={16} />
            </div>
            Book your first appointment
          </div>

          <div className="flex items-center gap-3 text-left text-sm text-slate-600 bg-white border border-border p-3 rounded-xl">
             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
               {isGkv ? <CreditCard size={16} /> : <Smartphone size={16} />}
             </div>
             {isGkv 
               ? "Have your health card ready to redeem prescriptions"
               : "Set up GesundheitsID in your insurer's app"
             }
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button 
            className="w-full h-12 text-base font-medium rounded-xl"
            onClick={() => setLocation("/home")}
          >
            Explore the App
          </Button>
          <Button 
            variant="outline"
            className="w-full h-12 text-base font-medium rounded-xl border-slate-200 text-primary hover:bg-slate-50"
            onClick={() => setLocation("/booking/type")}
          >
            Book an Appointment
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
