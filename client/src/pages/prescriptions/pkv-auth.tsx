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
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center relative">
            <Shield size={48} className="text-primary" />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full border-2 border-white">
              SECURE
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 mb-8">
          <h2 className="text-xl font-semibold font-display text-foreground">Sign in with your PKV app</h2>
          <p className="text-muted-foreground text-sm">Authenticate securely to access your e-prescriptions</p>
        </div>

        <div className="bg-card rounded-3xl p-5 border border-border shadow-[var(--shadow-card)] space-y-4">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Check size={14} className="text-emerald-600" strokeWidth={3} />
            </div>
            <p className="text-sm text-muted-foreground">You have a KVNR from your insurer</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Check size={14} className="text-emerald-600" strokeWidth={3} />
            </div>
            <p className="text-sm text-muted-foreground">Your PKV app has GesundheitsID enabled</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Check size={14} className="text-emerald-600" strokeWidth={3} />
            </div>
            <p className="text-sm text-muted-foreground">You've completed Online Check-in at your doctor</p>
          </div>
        </div>

        <div className="text-center">
          <button className="text-primary text-sm font-medium hover:underline">
            Don't have these? Learn how to set up
          </button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-card border-t border-border pb-safe z-10">
        <div className="max-w-[375px] mx-auto">
          <Button
            className="w-full h-12 text-base rounded-3xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            onClick={() => setLocation("/prescriptions/pkv-insurer-select")}
          >
            Continue to PKV Login
          </Button>
        </div>
      </div>
    </div>
  );
}
