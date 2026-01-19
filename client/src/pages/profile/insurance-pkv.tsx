import { useLocation } from "wouter";
import { Lock, Shield, ExternalLink, Check, AlertCircle } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InsuranceInfoPKV() {
  const [, setLocation] = useLocation();
  const isSetup = false; // Toggle for prototype state

  return (
    <div className="min-h-screen bg-background pb-32">
      <SubPageHeader title="Versicherungsinformationen" backPath="/profile" />
      
      <main className="p-5 space-y-8">
        {/* Insurance Type */}
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-purple-50 text-[#7C3AED] p-3 rounded-2xl border border-purple-100">
             <div className="flex items-center gap-3">
               <Shield size={20} className="fill-current" />
               <span className="font-bold">Private Versicherung (PKV)</span>
             </div>
             <Lock size={14} className="opacity-50" />
          </div>
          <div className="flex justify-between items-center px-1">
             <p className="text-xs text-slate-400">Änderung nur über Support möglich</p>
             <button className="text-xs text-primary underline">Support kontaktieren</button>
          </div>
        </div>

        {/* Provider */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">Private Krankenkasse</Label>
          <Select defaultValue="allianz">
            <SelectTrigger className="h-12 rounded-xl bg-white border-slate-200">
              <SelectValue placeholder="Wähle deine Krankenkasse" />
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
           
           {isSetup ? (
             <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-100">
               <Check size={20} />
               <span className="font-medium text-sm">GesundheitsID verbunden</span>
             </div>
           ) : (
             <div className="bg-amber-50 text-amber-700 p-4 rounded-xl flex items-center gap-3 border border-amber-100">
               <AlertCircle size={20} />
               <span className="font-medium text-sm">GesundheitsID noch nicht eingerichtet</span>
             </div>
           )}

           <button className="flex items-center gap-2 text-primary font-medium text-sm mt-2 hover:underline">
             <ExternalLink size={14} />
             GesundheitsID in App einrichten
           </button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-10">
        <div className="max-w-[375px] mx-auto space-y-2">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white"
            onClick={() => setLocation("/profile")}
           >
             Speichern
           </Button>
           <Button 
            variant="ghost"
            className="w-full h-12 text-base rounded-xl text-slate-600"
            onClick={() => setLocation("/profile")}
           >
             Abbrechen
           </Button>
        </div>
      </div>
    </div>
  );
}
