import { useState } from "react";
import { useLocation } from "wouter";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SymptomsInfo() {
  const [, setLocation] = useLocation();
  const [photoUploaded, setPhotoUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Additional Information" backPath="/telehealth/symptoms-details" />
      
      <div className="w-full h-1 bg-slate-100">
        <div className="h-full bg-primary w-full"></div>
      </div>
      
      <main className="p-6 space-y-6">
        <div>
           <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">Step 3 of 3</span>
           <h2 className="text-xl font-bold text-slate-900 mb-4 font-display">Any other details the doctor should know?</h2>
           
           <Textarea 
             placeholder="Describe any other symptoms or relevant history..." 
             className="min-h-[150px] bg-white text-base rounded-xl border-slate-200 resize-none p-4"
           />
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
           <Checkbox 
             id="photo" 
             checked={photoUploaded} 
             onCheckedChange={(c) => setPhotoUploaded(!!c)} 
           />
           <Label htmlFor="photo" className="font-medium text-slate-700 cursor-pointer">
             I have uploaded relevant photos (optional)
           </Label>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-[60]">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            onClick={() => setLocation("/telehealth/review")}
           >
             Review
           </Button>
        </div>
      </div>
    </div>
  );
}
