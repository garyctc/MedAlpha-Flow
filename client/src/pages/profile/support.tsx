import { useLocation } from "wouter";
import { HelpCircle, MessageSquare, Flag, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";

export default function HelpSupport() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Help & Support" backPath="/profile" />
      
      <main className="p-5">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
           <MenuRow 
             icon={HelpCircle} 
             label="FAQ" 
             onClick={() => setLocation("/static/faq")}
           />
           <div className="h-px bg-slate-50 mx-4"></div>
           <MenuRow 
             icon={MessageSquare} 
             label="Contact Support" 
             onClick={() => setLocation("/static/support")}
           />
           <div className="h-px bg-slate-50 mx-4"></div>
           <MenuRow 
             icon={Flag} 
             label="Report a Problem" 
             onClick={() => setLocation("/static/support")}
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
