import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { MessageSquare, RefreshCw } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GkvSmsVerify() {
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

  const handleVerify = () => {
    if (code.length === 6) {
      setLocation("/prescriptions/list");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Verify Your Identity" backPath="/prescriptions/nfc-scan" />
      
      <main className="p-6 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
          <MessageSquare size={32} />
        </div>
        
        <h2 className="text-xl font-bold text-slate-900 mb-2">Check your messages</h2>
        <p className="text-slate-500 mb-8">
          We sent a code to <span className="font-bold text-slate-900">+49 *** ***78</span>
        </p>

        <Input 
          type="text" 
          placeholder="000000"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
          className="h-16 text-center text-2xl font-bold tracking-[0.5em] bg-white border-slate-200 mb-6 rounded-2xl"
        />

        <div className="flex justify-center mb-8">
          {canResend ? (
            <button 
              onClick={() => { setTimer(45); setCanResend(false); }}
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
          className="w-full h-12 text-base font-medium rounded-xl mb-4"
          disabled={code.length !== 6}
          onClick={handleVerify}
        >
          Verify
        </Button>

        <button className="text-slate-400 text-sm hover:text-slate-600">
          Didn't receive it? Check your number in profile
        </button>
      </main>
    </div>
  );
}
