import { useLocation } from "wouter";
import { Shield, FileText, Check, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";

export default function PrivacyLegal() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Privacy & Legal" backPath="/profile" />
      
      <main className="p-5">
        <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
           <MenuRow
             icon={Shield}
             label="Privacy Policy"
             onClick={() => setLocation("/static/privacy")}
           />
           <div className="h-px bg-border mx-4"></div>
           <MenuRow
             icon={Check}
             label="Terms of Service"
             onClick={() => setLocation("/static/terms")}
           />
           <div className="h-px bg-border mx-4"></div>
           <MenuRow
             icon={FileText}
             label="Legal Disclosure"
             onClick={() => setLocation("/static/legal")}
           />
        </div>
      </main>
    </div>
  );
}

function MenuRow({ icon: Icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full px-4 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <Icon size={16} />
        </div>
        <span className="font-medium text-foreground text-sm">{label}</span>
      </div>
      <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary" />
    </button>
  );
}
