import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Pill, Search, Filter, ChevronRight, FileText, Download, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HistoryPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"all" | "in-person" | "prescriptions" | "video">("all");

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-5 py-4 pt-12 bg-white border-b border-slate-100 sticky top-0 z-10">
        <h1 className="font-bold text-xl text-slate-900 font-display mb-4">History</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search history..." 
            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: "all", label: "All" },
            { id: "in-person", label: "In-Person" },
            { id: "prescriptions", label: "Prescriptions" },
            { id: "video", label: "Video" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="p-5 space-y-6">
        {/* January 2026 */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">January 2026</h3>
          <div className="space-y-4">
            
            {(activeTab === "all" || activeTab === "in-person") && (
              <HistoryCard
                icon={Calendar}
                iconColor="text-blue-600"
                iconBg="bg-blue-50"
                title="Dr. Müller"
                subtitle="General Practice • In-Person"
                date="Jan 15, 2026"
                status="Completed"
                amount="€0.00"
                onClick={() => {}} 
              />
            )}

            {(activeTab === "all" || activeTab === "prescriptions") && (
              <HistoryCard
                icon={Pill}
                iconColor="text-emerald-600"
                iconBg="bg-emerald-50"
                title="Metformin 500mg"
                subtitle="Prescription • 30 tablets"
                date="Jan 15, 2026"
                status="Redeemed"
                amount="€5.00"
                onClick={() => {}}
              />
            )}

            {(activeTab === "all" || activeTab === "video") && (
              <HistoryCard
                icon={Video}
                iconColor="text-indigo-600"
                iconBg="bg-indigo-50"
                title="Dr. Weber"
                subtitle="Dermatology • Video"
                date="Jan 10, 2026"
                status="Completed"
                amount="€0.00"
                onClick={() => {}}
              />
            )}
            
             {(activeTab === "all" || activeTab === "in-person") && (
              <HistoryCard
                icon={Calendar}
                iconColor="text-red-600"
                iconBg="bg-red-50"
                title="Dr. Koch"
                subtitle="Orthopedics • In-Person"
                date="Jan 5, 2026"
                status="Cancelled"
                statusColor="text-red-600"
                amount="€0.00"
                onClick={() => {}}
              />
            )}
          </div>
        </section>

        {/* December 2025 */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">December 2025</h3>
          <div className="space-y-4">
            {(activeTab === "all" || activeTab === "video") && (
              <HistoryCard
                icon={Video}
                iconColor="text-red-600"
                iconBg="bg-red-50"
                title="Dr. Weber"
                subtitle="Dermatology • Video"
                date="Jan 3, 2026"
                status="Cancelled"
                statusColor="text-red-600"
                amount="€0.00"
                onClick={() => {}}
              />
            )}
            
            {(activeTab === "all" || activeTab === "prescriptions") && (
              <HistoryCard
                icon={Pill}
                iconColor="text-emerald-600"
                iconBg="bg-emerald-50"
                title="Amoxicillin 500mg"
                subtitle="Prescription • 20 tablets"
                date="Dec 20, 2025"
                status="Delivered"
                amount="€5.00"
                onClick={() => {}}
              />
            )}

            {(activeTab === "all" || activeTab === "prescriptions") && (
              <HistoryCard
                icon={Pill}
                iconColor="text-emerald-600"
                iconBg="bg-emerald-50"
                title="Vitamin D 1000 IU"
                subtitle="Prescription • 60 capsules"
                date="Dec 15, 2025"
                status="Picked Up"
                amount="€12.50"
                onClick={() => {}}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function HistoryCard({ 
  icon: Icon, 
  iconColor, 
  iconBg, 
  title, 
  subtitle, 
  date, 
  status, 
  statusColor = "text-emerald-600",
  amount, 
  onClick 
}: any) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 text-left hover:border-slate-300 transition-all group"
    >
      <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className={iconColor} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-slate-900 truncate pr-2">{title}</h4>
          <span className="text-xs font-bold text-slate-900">{amount}</span>
        </div>
        <p className="text-xs text-slate-500 mb-1">{subtitle}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400">{date}</span>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>{status}</span>
        </div>
      </div>
    </motion.button>
  );
}
