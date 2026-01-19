import { useState } from "react";
import { useLocation } from "wouter";
import { Search, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Input } from "@/components/ui/input";

export default function PkvInsurerSelect() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");

  const insurers = [
    { name: "Allianz Private Krankenversicherung", logo: "AZ" },
    { name: "DKV Deutsche Krankenversicherung", logo: "DK" },
    { name: "HUK-COBURG Krankenversicherung", logo: "HC" },
    { name: "Debeka Krankenversicherung", logo: "DE" },
    { name: "AXA Krankenversicherung", logo: "AX" },
  ];

  const filteredInsurers = insurers.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Select Your Insurer" backPath="/prescriptions/pkv-auth" />
      
      <main className="p-5 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            className="pl-10 h-12 bg-white border-slate-200" 
            placeholder="Search insurance company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <p className="text-sm text-slate-500 px-1">
          You'll be redirected to your insurer's app to authenticate
        </p>

        <div className="space-y-3">
          {filteredInsurers.map((insurer) => (
            <div 
              key={insurer.name}
              onClick={() => setLocation(`/prescriptions/pkv-redirect?insurer=${encodeURIComponent(insurer.name)}`)}
              className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                {insurer.logo}
              </div>
              <span className="flex-1 font-medium text-slate-900">{insurer.name}</span>
              <ChevronRight className="text-slate-300" size={20} />
            </div>
          ))}
          
          <button className="w-full py-4 text-center text-primary font-medium text-sm">
            Show all insurers...
          </button>
        </div>
      </main>
    </div>
  );
}
