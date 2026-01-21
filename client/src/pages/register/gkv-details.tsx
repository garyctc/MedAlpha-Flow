import { useState } from "react";
import { useLocation } from "wouter";
import { CreditCard, Info, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { saveRegistrationDraft } from "@/lib/storage";

export default function RegisterGKVDetails() {
  const [, setLocation] = useLocation();
  const [agreed, setAgreed] = useState(false);
  const [provider, setProvider] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");

  const isFormValid = provider && insuranceNumber.length >= 9 && agreed;

  return (
    <div className="min-h-screen bg-white pb-6">
      <SubPageHeader title="Health Card Details" backPath="/register/insurance" />
      
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
          <span className="text-primary">Step 4</span> of 5
          <div className="flex-1 h-1 bg-slate-100 rounded-full">
            <div className="w-4/5 h-full bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <CreditCard size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900">Set up your Gesundheitskarte</h2>
            <p className="text-slate-500 text-sm">You'll use this card to retrieve prescriptions</p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label>Insurance provider</Label>
            <Select onValueChange={setProvider} value={provider}>
              <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                <SelectValue placeholder="Search your provider..." />
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

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="ins-num">Insurance number</Label>
              <HelpCircle size={16} className="text-slate-400" />
            </div>
            <Input 
              id="ins-num" 
              placeholder="e.g. X123456789"
              value={insuranceNumber}
              onChange={(e) => setInsuranceNumber(e.target.value)}
              className="h-12 bg-slate-50 border-slate-200"
            />
            <p className="text-xs text-slate-500">Found on front of your card (10 digits)</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 rounded-xl p-5 mb-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Info size={16} /> How prescriptions work with GKV
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex gap-2 items-start">
              <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
              Scan your health card using NFC
            </li>
            <li className="flex gap-2 items-start">
              <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
              Enter the 6-digit CAN from your card
            </li>
            <li className="flex gap-2 items-start">
              <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
              Verify with SMS code
            </li>
            <li className="flex gap-2 items-start">
              <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
              Select prescriptions and pay copay (€5-10)
            </li>
          </ul>
        </div>

        <div className="flex items-start gap-3 mb-8">
          <Checkbox 
            id="copay" 
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="copay" className="text-sm font-normal text-slate-600 leading-snug">
            I understand my prescription copay will be €5-10 per medication
          </Label>
        </div>

        <Button
          className="w-full h-12 text-base font-medium rounded-xl"
          disabled={!isFormValid}
          onClick={() => {
            saveRegistrationDraft({
              insuranceProvider: provider,
              insuranceNumber: insuranceNumber
            });
            setLocation("/register/complete?type=gkv");
          }}
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
}
