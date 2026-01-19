import { useState } from "react";
import { useLocation } from "wouter";
import { Clock, Video, FileText, CreditCard } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function TelehealthReview() {
  const [, setLocation] = useLocation();
  const [consent, setConsent] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Review Consultation" backPath="/telehealth/symptoms-info" />
      
      <main className="p-5">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          
          {/* Type Section */}
          <div className="p-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Video size={20} />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="font-bold text-slate-900 text-sm">Video Consultation</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 font-medium">
                <Clock size={12} />
                Next available (~15 min wait)
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 mx-4"></div>

          {/* Symptoms Section */}
          <div className="p-4 flex items-start gap-4">
             <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center flex-shrink-0">
               <FileText size={20} />
             </div>
             <div className="flex-1 pt-0.5">
               <p className="font-bold text-slate-900 text-sm mb-1">Your Symptoms</p>
               <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                 <li>Cold/Flu symptoms</li>
                 <li>Duration: 1-3 days</li>
               </ul>
             </div>
             <button className="text-sm font-medium text-primary">Edit</button>
          </div>

          <div className="h-px bg-slate-100 mx-4"></div>

          {/* Cost Section */}
          <div className="p-4 flex items-start gap-4">
             <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
               <CreditCard size={20} />
             </div>
             <div className="flex-1 pt-0.5">
               <p className="font-bold text-slate-900 text-sm">Cost</p>
               <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">
                 Covered by insurance
               </span>
             </div>
          </div>

        </div>

        {/* Consent */}
        <div className="flex items-start gap-3 p-2">
           <Checkbox 
             id="consent" 
             checked={consent} 
             onCheckedChange={(c) => setConsent(!!c)} 
           />
           <div className="grid gap-1.5 leading-none">
             <label
               htmlFor="consent"
               className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700"
             >
               I consent to the video consultation terms and understand that this is not for life-threatening emergencies.
             </label>
           </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-10">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            disabled={!consent}
            onClick={() => setLocation("/telehealth/confirmation")}
           >
             Confirm
           </Button>
        </div>
      </div>
    </div>
  );
}
