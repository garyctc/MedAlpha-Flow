import { useState } from "react";
import { useLocation } from "wouter";
import { MapPin, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import SubPageHeader from "@/components/layout/SubPageHeader";
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
import {
  setLocationExplainerSeen,
  setLocationPermissionState,
} from "@/lib/storage";

export default function LocationPermissionExplainer() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);

  const handleDecision = (state: "granted" | "denied") => {
    setLocationPermissionState(state);
    setLocationExplainerSeen(true);
    setShowDialog(false);
    setLocation("/booking/location");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader
        title={t("booking.location.permission.title", {
          defaultValue: "Enable location",
        })}
        backPath="/booking/entry"
      />

      <main className="p-5 space-y-6">
        <div className="bg-card border border-border rounded-3xl p-5 shadow-[var(--shadow-card)] space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <MapPin size={26} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              {t("booking.location.permission.heading", {
                defaultValue: "Find clinics faster",
              })}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("booking.location.permission.body", {
                defaultValue:
                  "Allow location access to prioritize nearby clinics and shorten your wait time.",
              })}
            </p>
          </div>
          <Button className="w-full" onClick={() => setShowDialog(true)}>
            {t("booking.location.permission.cta", {
              defaultValue: "Enable location",
            })}
          </Button>
        </div>

        <div className="bg-muted/40 border border-dashed border-border rounded-3xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-foreground/5 text-foreground flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-medium text-foreground">
                {t("booking.location.permission.privacy.title", {
                  defaultValue: "Your privacy comes first",
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("booking.location.permission.privacy.body", {
                  defaultValue: "We only use location while you book appointments.",
                })}
              </p>
            </div>
          </div>
        </div>
      </main>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="w-[90%] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("booking.location.permission.modal.title", {
                defaultValue: "Allow location access?",
              })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("booking.location.permission.modal.body", {
                defaultValue:
                  "We use your location to sort nearby clinics first. You can change this later in settings.",
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleDecision("denied")}> 
              {t("booking.location.permission.modal.deny", {
                defaultValue: "Not now",
              })}
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDecision("granted")}> 
              {t("booking.location.permission.modal.allow", {
                defaultValue: "Allow location",
              })}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
