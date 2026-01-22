import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Lock, Shield, ExternalLink, Check, AlertCircle, Loader2 } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUserInsurance, saveUserInsurance, getUserSettings, saveUserSettings } from "@/lib/storage";
import { showSuccess } from "@/lib/toast-helpers";
import type { UserInsurance } from "@/types/storage";

const PROVIDER_MAP: Record<string, string> = {
  'allianz': 'Allianz Private Krankenversicherung',
  'dkv': 'DKV',
  'debeka': 'Debeka',
  'axa': 'AXA',
  'huk': 'HUK-COBURG',
};

const PROVIDER_KEY_MAP: Record<string, string> = {
  'Allianz Private Krankenversicherung': 'allianz',
  'DKV': 'dkv',
  'Debeka': 'debeka',
  'AXA': 'axa',
  'HUK-COBURG': 'huk',
};

export default function InsuranceInfoPKV() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [insurance, setInsurance] = useState<UserInsurance | null>(null);
  const [provider, setProvider] = useState('allianz');
  const [isGesundheitsIdSetup, setIsGesundheitsIdSetup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getUserInsurance();
      setInsurance(data);
      if (data?.provider) {
        setProvider(PROVIDER_KEY_MAP[data.provider] || 'allianz');
      }
      // Check for GesundheitsID setup status in settings
      const settings = getUserSettings() as any;
      setIsGesundheitsIdSetup(settings?.gesundheitsIdSetup || false);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 500));

    saveUserInsurance({
      type: 'pkv',
      provider: PROVIDER_MAP[provider] || provider,
      memberNumber: insurance?.memberNumber || '',
    });

    setIsSaving(false);
    showSuccess("Insurance information updated");
    setLocation("/profile");
  };

  const handleSetupGesundheitsId = () => {
    // Simulate setup - toggle the state
    const newState = !isGesundheitsIdSetup;
    setIsGesundheitsIdSetup(newState);
    saveUserSettings({ gesundheitsIdSetup: newState } as any);
    showSuccess(newState ? "GesundheitsID connected" : "GesundheitsID disconnected");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-32">
        <SubPageHeader title="Insurance Information" backPath="/profile" />
        <main className="p-5 space-y-8">
          <Skeleton className="h-14 w-full rounded-2xl" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <SubPageHeader title="Insurance Information" backPath="/profile" />

      <main className="p-5 space-y-8">
        {/* Insurance Type */}
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-purple-50 text-[#7C3AED] p-3 rounded-2xl border border-purple-100">
             <div className="flex items-center gap-3">
               <Shield size={20} className="fill-current" />
               <span className="font-bold">Private Insurance (PKV)</span>
             </div>
             <Lock size={14} className="opacity-50" />
          </div>
          <div className="flex justify-between items-center px-1">
             <p className="text-xs text-slate-400">Change only possible via support</p>
             <button onClick={() => setLocation("/profile/support")} className="text-xs text-primary underline">Contact Support</button>
          </div>
        </div>

        {/* Provider */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">Private Insurance Provider</Label>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger className="h-12 rounded-xl bg-white border-slate-200">
              <SelectValue placeholder="Select your provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="allianz">Allianz Private Krankenversicherung</SelectItem>
              <SelectItem value="dkv">DKV</SelectItem>
              <SelectItem value="debeka">Debeka</SelectItem>
              <SelectItem value="axa">AXA</SelectItem>
              <SelectItem value="huk">HUK-COBURG</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* GesundheitsID Setup */}
        <div className="space-y-3">
           <Label className="text-sm font-medium text-slate-700">GesundheitsID Status</Label>

           {isGesundheitsIdSetup ? (
             <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-100">
               <Check size={20} />
               <span className="font-medium text-sm">GesundheitsID connected</span>
             </div>
           ) : (
             <div className="bg-amber-50 text-amber-700 p-4 rounded-xl flex items-center gap-3 border border-amber-100">
               <AlertCircle size={20} />
               <span className="font-medium text-sm">GesundheitsID not set up</span>
             </div>
           )}

           <button
             onClick={handleSetupGesundheitsId}
             className="flex items-center gap-2 text-primary font-medium text-sm mt-2 hover:underline"
           >
             <ExternalLink size={14} />
             {isGesundheitsIdSetup ? "Disconnect GesundheitsID" : "Setup GesundheitsID in App"}
           </button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-10">
        <div className="max-w-[375px] mx-auto space-y-2">
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
            onClick={() => setLocation("/profile")}
           >
             Cancel
           </Button>
        </div>
      </div>
    </div>
  );
}
