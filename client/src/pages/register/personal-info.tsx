import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubPageHeader from "@/components/layout/SubPageHeader";

export default function RegisterPersonal() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: ""
  });

  const isFormValid = Object.values(formData).every(val => val.length > 0);

  return (
    <div className="min-h-screen bg-white pb-6">
      <SubPageHeader title="Personal Information" backPath="/register/verify" />
      
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
          <span className="text-primary">Step 2</span> of 5
          <div className="flex-1 h-1 bg-slate-100 rounded-full">
            <div className="w-2/5 h-full bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input 
                id="firstName" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="h-12 bg-slate-50 border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input 
                id="lastName" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="h-12 bg-slate-50 border-slate-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of birth</Label>
            <Input 
              id="dob" 
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({...formData, dob: e.target.value})}
              className="h-12 bg-slate-50 border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <div className="flex gap-3">
              <div className="w-20 h-12 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center font-medium text-slate-700">
                +49
              </div>
              <Input 
                id="phone" 
                type="tel"
                placeholder="151 12345678"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="flex-1 h-12 bg-slate-50 border-slate-200"
              />
            </div>
            <p className="text-xs text-slate-500">We'll send verification codes to this number</p>
          </div>

          <Button 
            className="w-full h-12 text-base font-medium rounded-xl mt-4"
            disabled={!isFormValid}
            onClick={() => setLocation("/register/insurance")}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
