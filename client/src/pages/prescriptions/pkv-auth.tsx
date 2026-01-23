import { useLocation } from "wouter";
import { Shield, Check } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function PkvAuth() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Connect via GesundheitsID" backPath="/prescriptions/type" />
      
      <main className="p-5 space-y-6">
        <div className="flex justify-center my-6">
          <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center relative">
            <Shield size={48} className="text-purple-600" />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white">
              SECURE
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 mb-8">
          <h2 className="text-xl font-bold font-display text-slate-900">Sign in with your PKV app</h2>
          <p className="text-slate-500 text-sm">Authenticate securely to access your e-prescriptions</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border space-y-4">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Check size={14} className="text-emerald-600" strokeWidth={3} />
            </div>
            <p className="text-sm text-slate-700">You have a KVNR from your insurer</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Check size={14} className="text-emerald-600" strokeWidth={3} />
            </div>
            <p className="text-sm text-slate-700">Your PKV app has GesundheitsID enabled</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Check size={14} className="text-emerald-600" strokeWidth={3} />
            </div>
            <p className="text-sm text-slate-700">You've completed Online Check-in at your doctor</p>
          </div>
        </div>

        <div className="text-center">
          <button className="text-primary text-sm font-medium hover:underline">
            Don't have these? Learn how to set up
          </button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-border pb-safe z-10">
        <div className="max-w-[375px] mx-auto">
          <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white"
            onClick={() => setLocation("/prescriptions/pkv-insurer-select")}
          >
            Continue to PKV Login
          </Button>
        </div>
      </div>
    </div>
  );
}
