import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { saveRegistrationDraft } from "@/lib/storage";

export default function RegisterAccount() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false, confirm: false });
  const [isLoading, setIsLoading] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentDataProcessing, setConsentDataProcessing] = useState(false);

  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    match: password === confirmPassword && confirmPassword !== ""
  };

  const isEmailValid = email.includes("@") && email.includes(".");
  const isFormValid = isEmailValid && validations.length && validations.uppercase && validations.number && validations.match && consentPrivacy && consentDataProcessing;

  return (
    <div className="min-h-screen bg-white pb-6">
      <SubPageHeader title="Create Account" backPath="/login" />
      
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
          <span className="text-primary">Step 1</span> of 5
          <div className="flex-1 h-1 bg-slate-100 rounded-full">
            <div className="w-1/5 h-full bg-primary rounded-full"></div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          // Simulate API call
          setTimeout(() => {
            saveRegistrationDraft({
              email,
              consentPrivacy,
              consentDataProcessing,
              consentTimestamp: new Date().toISOString()
            });
            setIsLoading(false);
            setLocation("/register/verify");
          }, 500);
        }}>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched({...touched, email: true})}
              className={`h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all ${touched.email && !isEmailValid ? "border-red-500" : ""}`}
            />
            {touched.email && !isEmailValid && (
              <p className="text-xs text-red-500 font-medium">Please enter a valid email address</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched({...touched, password: true})}
                className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="space-y-1 pt-1">
              <ValidationItem satisfied={validations.length} label="At least 8 characters" />
              <ValidationItem satisfied={validations.uppercase} label="One uppercase letter" />
              <ValidationItem satisfied={validations.number} label="One number" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input
              id="confirm"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => setTouched({...touched, confirm: true})}
              className={`h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all ${touched.confirm && !validations.match ? "border-red-500" : ""}`}
            />
            {touched.confirm && !validations.match && (
              <p className="text-xs text-red-500 font-medium">Passwords do not match</p>
            )}
          </div>

          <div className="space-y-3 py-2">
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent-privacy"
                checked={consentPrivacy}
                onCheckedChange={(checked) => setConsentPrivacy(checked === true)}
              />
              <Label htmlFor="consent-privacy" className="text-sm font-normal cursor-pointer leading-snug pt-0.5">
                I agree to the{" "}
                <a href="/static/privacy" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent-data"
                checked={consentDataProcessing}
                onCheckedChange={(checked) => setConsentDataProcessing(checked === true)}
              />
              <Label htmlFor="consent-data" className="text-sm font-normal cursor-pointer leading-snug pt-0.5">
                I consent to processing of my health data as described in the{" "}
                <a href="/static/privacy" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium rounded-xl mt-4"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Creating account..." : "Continue"}
          </Button>

          <div className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-bold hover:underline">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
}

function ValidationItem({ satisfied, label }: { satisfied: boolean, label: string }) {
  return (
    <div className={`flex items-center gap-2 text-xs ${satisfied ? "text-emerald-600" : "text-slate-400"}`}>
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${satisfied ? "bg-emerald-100" : "bg-slate-100"}`}>
        {satisfied ? <Check size={10} strokeWidth={3} /> : <div className="w-1 h-1 rounded-full bg-slate-300" />}
      </div>
      <span>{label}</span>
    </div>
  );
}
