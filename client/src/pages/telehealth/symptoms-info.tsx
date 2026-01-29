import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getBookingDraft, saveBookingDraft } from "@/lib/storage";

export default function SymptomsInfo() {
  const [, setLocation] = useLocation();
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    const draft = getBookingDraft();
    if (draft?.additionalNotes) {
      setAdditionalNotes(draft.additionalNotes);
    }
  }, []);

  const handleNotesChange = (value: string) => {
    setAdditionalNotes(value);
    saveBookingDraft({ additionalNotes: value });
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Additional Information" backPath="/telehealth/symptoms-details" />
      
      <div className="w-full h-1 bg-border">
        <div className="h-full bg-primary w-full"></div>
      </div>

      <main className="p-6 space-y-6">
        <div>
           <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">Step 3 of 3</span>
           <h2 className="text-xl font-semibold text-foreground mb-4 font-display">Any other details the doctor should know?</h2>

           <Textarea
             placeholder="Describe any other symptoms or relevant history..."
             className="min-h-[150px] bg-card text-base rounded-3xl border-border resize-none p-4"
             value={additionalNotes}
             onChange={(e) => handleNotesChange(e.target.value)}
           />
        </div>

        <div className="bg-card p-4 rounded-3xl border border-border shadow-[var(--shadow-card)] flex items-center gap-3">
           <Checkbox
             id="photo"
             checked={photoUploaded}
             onCheckedChange={(c) => setPhotoUploaded(!!c)}
           />
           <Label htmlFor="photo" className="font-medium text-foreground cursor-pointer">
             I have uploaded relevant photos (optional)
           </Label>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-card border-t border-border pb-safe z-[60]">
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
