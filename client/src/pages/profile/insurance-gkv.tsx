import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Lock, Shield, Camera, Loader2 } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUserInsurance, saveUserInsurance } from "@/lib/storage";
import { showSuccess } from "@/lib/toast-helpers";
import type { UserInsurance } from "@/types/storage";

const PROVIDER_MAP: Record<string, string> = {
  'tk': 'Techniker Krankenkasse (TK)',
  'aok': 'AOK',
  'barmer': 'Barmer',
  'dak': 'DAK Gesundheit',
  'ikk': 'IKK classic',
};

const PROVIDER_KEY_MAP: Record<string, string> = {
  'Techniker Krankenkasse (TK)': 'tk',
  'AOK': 'aok',
  'Barmer': 'barmer',
  'DAK Gesundheit': 'dak',
  'IKK classic': 'ikk',
};

export default function InsuranceInfoGKV() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [insurance, setInsurance] = useState<UserInsurance | null>(null);
  const [provider, setProvider] = useState('aok');
  const [insuranceNumber, setInsuranceNumber] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getUserInsurance();
      setInsurance(data);
      if (data?.provider) {
        setProvider(PROVIDER_KEY_MAP[data.provider] || 'aok');
      }
      if (data?.insuranceNumber) {
        setInsuranceNumber(data.insuranceNumber);
      }
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 500));

    saveUserInsurance({
      type: 'gkv',
      provider: PROVIDER_MAP[provider] || provider,
      insuranceNumber: insuranceNumber,
      memberNumber: insurance?.memberNumber || '',
    });

    setIsSaving(false);
    showSuccess("Insurance information updated");
    setLocation("/profile");
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
            <Skeleton className="h-12 w-full rounded-xl" />
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
          <div className="flex items-center justify-between bg-blue-50 text-primary p-3 rounded-2xl border border-blue-100">
             <div className="flex items-center gap-3">
               <Shield size={20} className="fill-current" />
               <span className="font-bold">Public Insurance (GKV)</span>
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
          <Label className="text-sm font-medium text-slate-700">Insurance Provider</Label>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger className="h-12 rounded-xl bg-white border-slate-200">
              <SelectValue placeholder="Select your provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tk">Techniker Krankenkasse (TK)</SelectItem>
              <SelectItem value="aok">AOK</SelectItem>
              <SelectItem value="barmer">Barmer</SelectItem>
              <SelectItem value="dak">DAK Gesundheit</SelectItem>
              <SelectItem value="ikk">IKK classic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Card Info */}
        <div className="space-y-4">
           <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">Insurance Number</Label>
              <Input
                value={insuranceNumber}
                onChange={(e) => setInsuranceNumber(e.target.value)}
                placeholder="A123456789"
                className="h-12 rounded-xl bg-white border-slate-200"
              />
              <p className="text-xs text-slate-400">10 characters: Letter + 9 Digits</p>
           </div>

           <Button variant="outline" className="w-full h-12 rounded-xl border-primary text-primary hover:bg-blue-50 gap-2">
             <Camera size={18} />
             Rescan Health Card
           </Button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-border pb-safe z-[60] max-w-[375px] mx-auto">
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
            onClick={() => setLocation("/profile")}
           >
             Cancel
           </Button>
        </div>
      </div>
    </div>
  );
}
