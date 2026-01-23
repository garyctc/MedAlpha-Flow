import { useLocation } from "wouter";
import { AlertTriangle } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function PkvError() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Setup Required" backPath="/prescriptions/pkv-auth" />
      
      <main className="p-5 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-full bg-white border border-orange-200 rounded-2xl p-6 mb-6">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-500">
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">GesundheitsID Not Set Up</h2>
          <p className="text-slate-600 text-sm mb-4">
            We couldn't authenticate with your insurer. Please make sure you have activated GesundheitsID in your insurer's app.
          </p>
          <Button variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50">
            Open PKV App
          </Button>
        </div>

        <div className="space-y-4 w-full">
          <button 
            onClick={() => setLocation("/prescriptions/pkv-auth")}
            className="w-full text-center text-primary font-medium"
          >
            Try Again
          </button>
          
          <button 
            onClick={() => setLocation("/pharmacy/map")}
            className="w-full text-center text-slate-400 font-medium text-sm"
          >
            Use Local Pharmacy Instead
          </button>
        </div>
      </main>
    </div>
  );
}
