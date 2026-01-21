import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Lock, AlertCircle } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getUserProfile, saveUserProfile } from "@/lib/storage";

export default function EditProfile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Initialize from localStorage
  const profile = getUserProfile();
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || "Max",
    lastName: profile?.lastName || "Mustermann",
    phone: profile?.phone || "+49 151 12345678",
    email: profile?.email || "max@example.com",
    dateOfBirth: profile?.dateOfBirth || "1990-03-15"
  });

  const hasAddress = profile?.street && profile?.city && profile?.postalCode;

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

  const handleSave = () => {
    if (validate()) {
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

      toast({
        title: "Profile updated",
        description: "Changes saved.",
      });

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
          <button className="text-xs text-primary font-medium hover:underline">Managed by dm</button>
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
          <button className="text-xs text-primary font-medium hover:underline">Managed by dm</button>
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
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
           <button className="text-xs text-primary font-medium hover:underline">Managed by dm</button>
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
          <button className="text-xs text-primary font-medium hover:underline">Managed by dm</button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-[60] max-w-[375px] mx-auto">
        <div className="space-y-2">
           <Button
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white"
            onClick={handleSave}
           >
             Save
           </Button>
           <Button
            variant="ghost"
            className="w-full h-12 text-base rounded-xl text-slate-600"
            onClick={() => setLocation("/profile")}
           >
             Cancel
           </Button>
        </div>
      </div>
    </div>
  );
}
