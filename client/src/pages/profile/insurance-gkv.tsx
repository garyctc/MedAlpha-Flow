import { useLocation } from "wouter";
import { Lock, Shield, Camera, ChevronDown } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InsuranceInfoGKV() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-32">
      <SubPageHeader title="Insurance Information" backPath="/profile" />
      
      <main className="p-5 space-y-8">
        {/* Insurance Type */}
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-blue-50 text-[#0C3D91] p-3 rounded-2xl border border-blue-100">
             <div className="flex items-center gap-3">
               <Shield size={20} className="fill-current" />
               <span className="font-bold">Public Insurance (GKV)</span>
             </div>
             <Lock size={14} className="opacity-50" />
          </div>
          <div className="flex justify-between items-center px-1">
             <p className="text-xs text-slate-400">Change only possible via support</p>
             <button className="text-xs text-primary underline">Contact Support</button>
          </div>
        </div>

        {/* Provider */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">Insurance Provider</Label>
          <Select defaultValue="tk">
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
                defaultValue="A123456789"
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

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-10">
        <div className="max-w-[375px] mx-auto space-y-2">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white"
            onClick={() => setLocation("/profile")}
           >
             Save
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
