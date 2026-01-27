import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Check, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getRegistrationDraft, clearRegistrationDraft, saveUserProfile, saveUserInsurance, saveAuthState, clearBookingDraft, saveBookingDraft } from "@/lib/storage";
import { showSuccess } from "@/lib/toast-helpers";
import { DURATION_DEFAULT, DURATION_SLOW, EASING_DEFAULT, shouldReduceMotion } from "@/lib/motion";
import { branding } from "@/config/branding";

export default function RegisterComplete() {
  const [, setLocation] = useLocation();
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
    <div className="min-h-screen bg-background p-6 flex flex-col justify-center items-center text-center">
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
          <h1 className="text-2xl font-semibold font-display text-foreground mb-2">Welcome to {branding.appName}</h1>
          <p className="text-muted-foreground">Your account has been created</p>
        </div>

        {/* User Card */}
        <div className="bg-muted rounded-3xl p-5 border border-border text-left">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center text-muted-foreground border border-border font-semibold text-lg">
               {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
             </div>
             <div>
               <h3 className="font-semibold text-foreground">{userData.name}</h3>
               <p className="text-xs text-muted-foreground">{userData.email}</p>
             </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground text-left">What's next?</h3>

          <div className="flex items-center gap-3 text-left text-sm text-muted-foreground bg-card border border-border p-3 rounded-3xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
               <Calendar size={16} className="text-primary" />
            </div>
            Book your first appointment
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button
            className="w-full h-12 text-base font-medium rounded-3xl"
            onClick={() => setLocation("/home")}
          >
            Explore the App
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 text-base font-medium rounded-3xl border-border text-primary hover:bg-muted"
            onClick={() => {
              clearBookingDraft();
              saveBookingDraft({ type: 'in-person' });
              setLocation("/booking/specialty");
            }}
          >
            Book an Appointment
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
