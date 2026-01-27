import { useLocation } from "wouter";
import { HelpCircle, BookOpen, Info, MessageSquare, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";

export default function HelpSupport() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Help & Support" backPath="/profile" />
      
      <main className="p-5">
        <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
           <MenuRow
             icon={HelpCircle}
             label="FAQ"
             onClick={() => setLocation("/static/faq")}
           />
           <div className="h-px bg-border mx-4"></div>
           <MenuRow
             icon={BookOpen}
             label="Medical Glossary"
             onClick={() => setLocation("/static/glossary")}
           />
           <div className="h-px bg-border mx-4"></div>
           <MenuRow
             icon={Info}
             label="About"
             onClick={() => setLocation("/static/about")}
           />
           <div className="h-px bg-border mx-4"></div>
           <MenuRow
             icon={MessageSquare}
             label="Contact Support"
             onClick={() => setLocation("/static/support")}
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
