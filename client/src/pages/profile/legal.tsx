import { useLocation } from "wouter";
import { Shield, FileText, Check, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";

export default function PrivacyLegal() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Privacy & Legal" backPath="/profile" />
      
      <main className="p-5">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
           <MenuRow 
             icon={Shield} 
             label="Privacy Policy" 
             onClick={() => setLocation("/static/privacy")}
           />
           <div className="h-px bg-slate-50 mx-4"></div>
           <MenuRow 
             icon={FileText} 
             label="Legal Disclosure" 
             onClick={() => setLocation("/static/legal")}
           />
           <div className="h-px bg-slate-50 mx-4"></div>
           <MenuRow
             icon={Check}
             label="Terms of Service"
             onClick={() => setLocation("/static/legal")}
           />
        </div>
      </main>
    </div>
  );
}

function MenuRow({ icon: Icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-primary transition-colors">
          <Icon size={16} />
        </div>
        <span className="font-medium text-slate-700 text-sm group-hover:text-slate-900">{label}</span>
      </div>
      <ChevronRight size={18} className="text-slate-300 group-hover:text-primary" />
    </button>
  );
}
