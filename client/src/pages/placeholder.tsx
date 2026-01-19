import { useLocation } from "wouter";
import { Construction } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";

export default function Placeholder({ title = "Coming Soon" }: { title?: string }) {
  // Extract title from path if generic
  const [location] = useLocation();
  const pageTitle = location.replace("/", "").charAt(0).toUpperCase() + location.slice(2);

  return (
    <div className="min-h-screen bg-background pb-24">
      <SubPageHeader title={title === "Coming Soon" ? pageTitle : title} backPath="/home" />
      
      <main className="p-5 flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
           <Construction size={40} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Coming Soon</h2>
        <p className="text-slate-500 max-w-[200px]">This feature is currently under development.</p>
      </main>
    </div>
  );
}
