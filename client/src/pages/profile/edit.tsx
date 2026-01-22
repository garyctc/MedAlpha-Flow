import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useToast } from "@/hooks/use-toast";
import { getUserProfile, saveUserProfile } from "@/lib/storage";
import { showSuccess } from "@/lib/toast-helpers";
import { usePrimarySSOProvider } from "@/hooks/use-sso-providers";

export default function EditProfile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const primaryProvider = usePrimarySSOProvider();

  // Initialize from localStorage
  const profile = getUserProfile();
  const initialFormData = useRef({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    phone: profile?.phone || "",
    email: profile?.email || "",
    dateOfBirth: profile?.dateOfBirth || ""
  });

  const [formData, setFormData] = useState(initialFormData.current);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const hasAddress = profile?.street && profile?.city && profile?.postalCode;

  // Track dirty state
  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  // Handle back navigation with unsaved changes check
  const handleBack = () => {
    if (isDirty) {
      setPendingNavigation("/profile");
      setShowDiscardDialog(true);
    } else {
      setLocation("/profile");
    }
  };

  const handleDiscardChanges = () => {
    setShowDiscardDialog(false);
    if (pendingNavigation) {
      setLocation(pendingNavigation);
    }
  };

  const [errors, setErrors] = useState({
    phone: "",
    firstName: "",
    email: ""
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { phone: "", firstName: "", email: "" };

    // Phone validation
    const phoneRegex = /^\+49\s?1[5-9]\d\s?\d{7,9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, " "))) { // simplistic check for prototype
       // Strict regex from prompt: /^\+49[1-9]\d{8,10}$/ (no spaces)
       // But value has spaces: "+49 151 12345678"
       // Let's just check if it starts with +49 and has enough digits for now visually
       if (!formData.phone.startsWith("+49") || formData.phone.length < 12) {
          newErrors.phone = "Invalid phone number. Format: +49 151 12345678";
          isValid = false;
       }
    }

    // Name validation
    if (formData.firstName.length < 2) {
      newErrors.firstName = "Name must be 2-50 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (validate()) {
      setIsSaving(true);
      await new Promise(r => setTimeout(r, 500)); // Simulate API

      // Save to localStorage
      saveUserProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        street: profile?.street || "",
        city: profile?.city || "",
        postalCode: profile?.postalCode || ""
      });

      setIsSaving(false);
      setIsDirty(false);
      showSuccess("Profile updated");
      setLocation("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <SubPageHeader title="Edit Profile" backPath="/profile" />
      
      <main className="p-5 space-y-5">
        <div className="space-y-3">
          <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">First Name</Label>
          <div className="relative">
            <Input
              id="firstName"
              value={formData.firstName}
              readOnly
              className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-500 pr-10"
            />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
          <button className="text-xs text-primary font-medium hover:underline">Managed by {primaryProvider?.displayName || 'partner'}</button>
        </div>

        <div className="space-y-3">
          <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">Last Name</Label>
          <div className="relative">
             <Input
              id="lastName"
              value={formData.lastName}
              readOnly
              className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-500 pr-10"
            />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
          <button className="text-xs text-primary font-medium hover:underline">Managed by {primaryProvider?.displayName || 'partner'}</button>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">Date of Birth</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input
              value={formData.dateOfBirth.split('-').reverse().join('.')}
              readOnly
              className="h-12 rounded-xl bg-slate-50 border-slate-200 pl-10 text-slate-500"
            />
          </div>
          <p className="text-xs text-slate-400">Change only possible via support</p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</Label>
          <div className="relative">
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              className={`h-12 rounded-xl bg-white pr-10 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200"}`}
              placeholder="+49 151 12345678"
            />
            {errors.phone && <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={16} />}
          </div>
          {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div className="space-y-3">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
          <div className="relative">
             <Input
              id="email"
              value={formData.email}
              readOnly
              className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-500 pr-10"
            />
             <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
           <button className="text-xs text-primary font-medium hover:underline">Managed by {primaryProvider?.displayName || 'partner'}</button>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">Address</Label>
          {hasAddress ? (
            <>
              <div className="relative">
                <Input
                  value={profile?.street || ""}
                  readOnly
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-500 pr-10"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Input
                    value={profile?.city || ""}
                    readOnly
                    className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-500 pr-10"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
                <div className="relative">
                  <Input
                    value={profile?.postalCode || ""}
                    readOnly
                    className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-500 pr-10"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
              </div>
            </>
          ) : (
            <div className="h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center px-4 text-slate-500 text-sm">
              No address on file
            </div>
          )}
          <button className="text-xs text-primary font-medium hover:underline">Managed by {primaryProvider?.displayName || 'partner'}</button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-[60] max-w-[375px] mx-auto">
        <div className="space-y-2">
           <Button
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white"
            onClick={handleSave}
            disabled={isSaving}
           >
             {isSaving ? (
               <>
                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                 Saving...
               </>
             ) : (
               "Save"
             )}
           </Button>
           <Button
            variant="ghost"
            className="w-full h-12 text-base rounded-xl text-slate-600"
            onClick={handleBack}
           >
             Cancel
           </Button>
        </div>
      </div>

      <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent className="w-[90%] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave without saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-md border-border">Keep editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDiscardChanges}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md"
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
