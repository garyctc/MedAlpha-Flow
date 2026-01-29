import { useState } from "react";
import { useLocation } from "wouter";
import { Lock, ChevronDown, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveUserProfile, saveUserInsurance, saveAuthState } from "@/lib/storage";
import { showSuccess } from "@/lib/toast-helpers";
import { useSSOProviders } from "@/hooks/use-sso-providers";

// SSO data that would come from dm
const SSO_DATA = {
  firstName: "Max",
  lastName: "Mustermann",
  email: "max@example.com"
};

const INSURANCE_MAP: Record<string, { type: 'gkv' | 'pkv'; provider: string }> = {
  tk: { type: 'gkv', provider: 'Techniker Krankenkasse (TK)' },
  aok: { type: 'gkv', provider: 'AOK' },
  barmer: { type: 'gkv', provider: 'Barmer' },
  pkv: { type: 'pkv', provider: 'Private Insurance' }
};

export default function CompleteProfile() {
  const [, setLocation] = useLocation();
  const [isSaving, setIsSaving] = useState(false);
  const { providers, getSSOProvider } = useSSOProviders();
  const [formData, setFormData] = useState({
    phone: "",
    dob: "",
    insurance: ""
  });

  // Extract provider ID from URL query string
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const providerId = searchParams.get('provider') || providers[0]?.id;
  const provider = getSSOProvider(providerId || '');

  const handleContinue = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 500));

    // Save profile from SSO + form data
    saveUserProfile({
      firstName: SSO_DATA.firstName,
      lastName: SSO_DATA.lastName,
      email: SSO_DATA.email,
      phone: formData.phone,
      dateOfBirth: formData.dob,
      street: "",
      city: "",
      postalCode: ""
    });

    // Save insurance if selected
    if (formData.insurance && INSURANCE_MAP[formData.insurance]) {
      const ins = INSURANCE_MAP[formData.insurance];
      saveUserInsurance({
        type: ins.type,
        provider: ins.provider,
        memberNumber: ""
      });
    }

    // Mark as fully logged in
    saveAuthState({ isLoggedIn: true, userId: "sso-user" });

    setIsSaving(false);
    showSuccess("Profile created successfully");
    setLocation("/home");
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="px-5 py-4 pt-12 bg-card border-b border-border sticky top-0 z-10">
        <h1 className="font-semibold text-xl text-foreground font-display">Complete Your Profile</h1>
      </header>

      <main className="p-5 space-y-6">
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Welcome from {provider?.displayName || 'partner'}</p>
          <p>We just need a few more details to get you started.</p>
        </div>

        {/* Read-only Section */}
        <div className="bg-muted rounded-3xl p-4 border border-border space-y-4">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">From your {provider?.displayName || 'partner'} account:</span>

          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Full Name</Label>
              <div className="relative">
                <Input
                  value="Max Mustermann"
                  readOnly
                  className="bg-card border-border pr-10"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Email</Label>
              <div className="relative">
                <Input
                  value="max@example.com"
                  readOnly
                  className="bg-card border-border pr-10"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
             <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
             <span className="text-xs text-muted-foreground font-medium">Managed by {provider?.displayName || 'partner'}</span>
          </div>
        </div>

        {/* Editable Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
            <Input
              id="phone"
              placeholder="+49"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="h-12 rounded-3xl bg-card border-border"
            />
            <p className="text-xs text-muted-foreground">For appointment reminders</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth <span className="text-red-500">*</span></Label>
            <div className="relative">
              <Input
                id="dob"
                placeholder="DD.MM.YYYY"
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                className="h-12 rounded-3xl bg-card border-border pr-10"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance">Health Insurance</Label>
            <div className="relative">
              <select
                id="insurance"
                className="w-full h-12 rounded-3xl bg-card border border-border px-3 appearance-none text-foreground"
                value={formData.insurance}
                onChange={(e) => setFormData({...formData, insurance: e.target.value})}
              >
                <option value="">Select your insurance</option>
                <option value="tk">Techniker Krankenkasse (TK)</option>
                <option value="aok">AOK</option>
                <option value="barmer">Barmer</option>
                <option value="pkv">Private (PKV)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        <Button
          className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 rounded-3xl shadow-lg shadow-primary/20 mt-8"
          onClick={handleContinue}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </main>
    </div>
  );
}
