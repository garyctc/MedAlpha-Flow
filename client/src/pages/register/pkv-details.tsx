import { useState } from "react";
import { useLocation } from "wouter";
import { Smartphone, Info, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { saveRegistrationDraft } from "@/lib/storage";

export default function RegisterPKVDetails() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [checks, setChecks] = useState({
    kvnr: false,
    app: false,
    checkin: false
  });
  const [provider, setProvider] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-6">
      <SubPageHeader title="Private Insurance Setup" backPath="/register/insurance" />

      <div className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-6">
          <span className="text-primary">Step 4</span> of 5
          <div className="flex-1 h-1 bg-muted rounded-full">
            <div className="w-4/5 h-full bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Smartphone size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold font-display text-foreground">Set up GesundheitsID access</h2>
            <p className="text-muted-foreground text-sm">You'll sign in through your insurer's app</p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label>Insurance provider</Label>
            <Select onValueChange={setProvider} value={provider}>
              <SelectTrigger className="h-12 bg-muted border-border">
                <SelectValue placeholder="Search your provider..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allianz">Allianz</SelectItem>
                <SelectItem value="dkv">DKV</SelectItem>
                <SelectItem value="debeka">Debeka</SelectItem>
                <SelectItem value="axa">AXA</SelectItem>
                <SelectItem value="huk">HUK-Coburg</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-sm">Before you can redeem prescriptions:</h3>
            
            <div className="flex items-start gap-3">
              <Checkbox 
                id="kvnr" 
                checked={checks.kvnr}
                onCheckedChange={(c) => setChecks({...checks, kvnr: c as boolean})}
                className="mt-1"
              />
              <Label htmlFor="kvnr" className="text-sm font-normal text-muted-foreground leading-snug">
                I have requested my KVNR from my insurer
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox 
                id="app" 
                checked={checks.app}
                onCheckedChange={(c) => setChecks({...checks, app: c as boolean})}
                className="mt-1"
              />
              <Label htmlFor="app" className="text-sm font-normal text-muted-foreground leading-snug">
                I have my insurer's app with GesundheitsID enabled
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox 
                id="checkin" 
                checked={checks.checkin}
                onCheckedChange={(c) => setChecks({...checks, checkin: c as boolean})}
                className="mt-1"
              />
              <Label htmlFor="checkin" className="text-sm font-normal text-muted-foreground leading-snug">
                I have completed Online Check-in at my doctor
              </Label>
            </div>

            <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
              <ExternalLink size={12} /> {t("common.buttons.learnMoreRequirements")}
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-primary/5 rounded-3xl p-5 mb-6">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Info size={16} className="text-primary" /> How prescriptions work with PKV
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2 items-start">
              <span className="bg-primary/20 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">1</span>
              Sign in through your insurer's app
            </li>
            <li className="flex gap-2 items-start">
              <span className="bg-primary/20 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">2</span>
              Select prescriptions and pay full price
            </li>
            <li className="flex gap-2 items-start">
              <span className="bg-primary/20 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">3</span>
              Download Kostenbeleg (receipt)
            </li>
            <li className="flex gap-2 items-start">
              <span className="bg-primary/20 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">4</span>
              Submit to insurer for reimbursement
            </li>
          </ul>
        </div>

        <p className="text-xs text-muted-foreground mb-6 text-center">
          Not ready yet? You can still use local pharmacies. Complete GesundheitsID setup later in Settings.
        </p>

        <Button
          className="w-full h-12 text-base font-medium rounded-3xl"
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              if (provider) {
                saveRegistrationDraft({ insuranceProvider: provider });
              }
              setIsLoading(false);
              setLocation("/register/complete?type=pkv");
            }, 500);
          }}
        >
          {isLoading ? "Completing..." : "Complete Registration"}
        </Button>
      </div>
    </div>
  );
}
