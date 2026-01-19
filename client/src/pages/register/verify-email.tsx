import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubPageHeader from "@/components/layout/SubPageHeader";

export default function RegisterVerifyEmail() {
  const [, setLocation] = useLocation();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    setTimer(45);
    setCanResend(false);
  };

  return (
    <div className="min-h-screen bg-white pb-6">
      <SubPageHeader title="Verify Email" backPath="/register" />
      
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8">
          <span className="text-primary">Step 1</span> of 5
          <div className="flex-1 h-1 bg-slate-100 rounded-full">
            <div className="w-1/5 h-full bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-4 relative">
            <Mail size={32} />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-3 h-3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900 mb-2">Check your inbox</h2>
          <p className="text-slate-500 text-sm">
            We sent a verification code to<br />
            <span className="font-bold text-slate-900">max@example.com</span>
          </p>
        </div>

        <div className="space-y-6">
          <Input 
            type="text" 
            placeholder="000000"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
            className="h-16 text-center text-2xl font-bold tracking-[0.5em] bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl"
          />

          <div className="flex justify-center">
            {canResend ? (
              <button 
                onClick={handleResend}
                className="text-primary font-medium text-sm flex items-center gap-2 hover:underline"
              >
                <RefreshCw size={14} /> Resend code
              </button>
            ) : (
              <span className="text-slate-400 text-sm font-medium">
                Resend in 0:{timer.toString().padStart(2, '0')}
              </span>
            )}
          </div>

          <Button 
            className="w-full h-12 text-base font-medium rounded-xl"
            disabled={code.length !== 6}
            onClick={() => setLocation("/register/personal")}
          >
            Verify
          </Button>

          <div className="text-center mt-4">
            <button 
              onClick={() => setLocation("/register")}
              className="text-primary font-medium text-sm hover:underline"
            >
              Use a different email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
