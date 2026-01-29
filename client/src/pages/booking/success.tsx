import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Check, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DURATION_DEFAULT, DURATION_SLOW, EASING_DEFAULT, shouldReduceMotion } from "@/lib/motion";
import { clearBookingDraft } from "@/lib/storage";

export default function BookingSuccess() {
  const reduceMotion = shouldReduceMotion();
  const [, setLocation] = useLocation();
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);

  useEffect(() => {
    clearBookingDraft();
  }, []);

  const handleNavigateHome = () => {
    setShowNotificationDialog(false);
    setLocation("/home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center" data-testid="success-screen">
      <motion.div
        initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: DURATION_SLOW, ease: EASING_DEFAULT }}
        className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"
      >
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
          <Check size={40} className="text-white" strokeWidth={3} />
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: DURATION_DEFAULT, ease: EASING_DEFAULT, delay: DURATION_DEFAULT }
        }
        className="w-full"
      >
        <h1 className="text-2xl font-semibold text-foreground mb-2">Request sent</h1>
        <p className="text-muted-foreground mb-8 max-w-[280px] mx-auto">
          We're matching you with the first available appointment. We'll notify you as soon as it's confirmed.
        </p>

        <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] p-5 mb-8 text-left mx-auto max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" strokeWidth={2} />
            </div>
            <div>
              <p className="font-semibold text-foreground">Smart Match is working</p>
              <p className="text-sm text-muted-foreground">You'll get a confirmation shortly.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 w-full">
          <Button className="w-full h-12" onClick={() => setShowNotificationDialog(true)}>
            Back to Home
          </Button>
        </div>
      </motion.div>

      <AlertDialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <AlertDialogContent className="w-[90%] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Stay updated</AlertDialogTitle>
            <AlertDialogDescription>
              Enable notifications so we can alert you when your appointment is confirmed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleNavigateHome}>Not now</AlertDialogCancel>
            <AlertDialogAction onClick={handleNavigateHome}>Enable notifications</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
