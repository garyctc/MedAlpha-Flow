import { useState } from "react";
import { useLocation } from "wouter";
import { Lock, ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CompleteProfile() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    phone: "",
    dob: "",
    insurance: ""
  });

  const handleContinue = () => {
    // Navigate to Terms & Conditions / Legal
    setLocation("/profile/legal");
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="px-5 py-4 pt-12 bg-white border-b border-slate-100 sticky top-0 z-10">
        <h1 className="font-bold text-xl text-slate-900 font-display">Complete Your Profile</h1>
      </header>

      <main className="p-5 space-y-6">
        <div className="text-sm text-slate-500">
          <p className="font-medium text-slate-900 mb-1">Welcome from dm</p>
          <p>We just need a few more details to get you started.</p>
        </div>

        {/* Read-only Section */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">From your dm account:</span>
          
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-slate-500 mb-1 block">Full Name</Label>
              <div className="relative">
                <Input 
                  value="Max Mustermann" 
                  readOnly 
                  className="bg-white border-slate-200 pr-10" 
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              </div>
            </div>
            
            <div>
              <Label className="text-xs text-slate-500 mb-1 block">Email</Label>
              <div className="relative">
                <Input 
                  value="max@example.com" 
                  readOnly 
                  className="bg-white border-slate-200 pr-10" 
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 pt-1">
             <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
             <span className="text-xs text-slate-500 font-medium">Managed by dm</span>
          </div>
        </div>

        {/* Editable Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
            <Input 
              id="phone" 
              placeholder="+49" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="h-12 rounded-xl bg-white border-slate-200"
            />
            <p className="text-xs text-slate-400">For appointment reminders</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth <span className="text-red-500">*</span></Label>
            <div className="relative">
              <Input 
                id="dob" 
                placeholder="DD.MM.YYYY" 
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                className="h-12 rounded-xl bg-white border-slate-200 pr-10"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance">Health Insurance</Label>
            <div className="relative">
              <select 
                id="insurance"
                className="w-full h-12 rounded-xl bg-white border border-slate-200 px-3 appearance-none text-slate-900"
                value={formData.insurance}
                onChange={(e) => setFormData({...formData, insurance: e.target.value})}
              >
                <option value="">Select your insurance</option>
                <option value="tk">Techniker Krankenkasse (TK)</option>
                <option value="aok">AOK</option>
                <option value="barmer">Barmer</option>
                <option value="pkv">Private (PKV)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        <Button 
          className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 mt-8"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </main>
    </div>
  );
}
