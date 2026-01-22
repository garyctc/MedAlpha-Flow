import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Search, Video, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import appLogo from "@/assets/app-logo.svg";
import { branding } from "@/config/branding";
import { getUserAppointments } from "@/lib/storage";
import type { Appointment } from "@/types/storage";
import { formatLocalDate, getLocale } from "@/i18n";
import { FEATURES } from "@/lib/features";

export default function HistoryPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"all" | "in-person" | "video">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const locale = getLocale();

  // Load history from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const all = getUserAppointments();
      const past = all.filter(a => a.status === 'completed' || a.status === 'cancelled');
      setHistory(past);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter history by search and type
  const filteredHistory = useMemo(() => {
    let results = history;

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(h =>
        h.doctor.toLowerCase().includes(q) ||
        h.specialty.toLowerCase().includes(q) ||
        h.clinic.toLowerCase().includes(q)
      );
    }

    // Filter by type
    if (activeTab !== "all") {
      results = results.filter(h => h.type === activeTab);
    }

    return results;
  }, [history, searchQuery, activeTab]);

  // Group by month
  const groupedHistory = useMemo(() => {
    const groups: { [key: string]: Appointment[] } = {};
    filteredHistory.forEach(apt => {
      const date = new Date(apt.date);
      const monthYear = date.toLocaleString(locale === 'de' ? 'de-DE' : 'en-US', { month: 'long', year: 'numeric' });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(apt);
    });
    return groups;
  }, [filteredHistory, locale]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-5 py-4 pt-12 bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="flex items-center gap-2 mb-4 min-h-10">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain" />
          </div>
          <h1 className="font-bold text-xl text-slate-900 font-display">History</h1>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
          />
        </div>

        {/* Filter Tabs - Hidden in V1 */}
        {FEATURES.videoConsultationEnabled && (
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "all", label: "All" },
              { id: "in-person", label: "In-Person" },
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
        )}
      </header>

      <main className="p-5 space-y-6">
        {isLoading ? (
          // Loading Skeleton
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-3 w-40" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredHistory.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Clock size={28} className="text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">No past appointments</h3>
            <p className="text-sm text-slate-500">Your appointment history will appear here</p>
          </div>
        ) : (
          // Grouped History
          Object.entries(groupedHistory).map(([monthYear, appointments]) => (
            <section key={monthYear}>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{monthYear}</h3>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <HistoryCard
                    key={apt.id}
                    icon={FEATURES.videoConsultationEnabled && apt.type === 'video' ? Video : Calendar}
                    iconColor={apt.status === 'cancelled' ? "text-red-600" : (FEATURES.videoConsultationEnabled && apt.type === 'video' ? "text-indigo-600" : "text-blue-600")}
                    iconBg={apt.status === 'cancelled' ? "bg-red-50" : (FEATURES.videoConsultationEnabled && apt.type === 'video' ? "bg-indigo-50" : "bg-blue-50")}
                    title={apt.doctor}
                    subtitle={FEATURES.videoConsultationEnabled ? `${apt.specialty} • ${apt.type === 'video' ? 'Video' : 'In-Person'}` : apt.specialty}
                    date={formatLocalDate(apt.date, locale)}
                    status={apt.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                    statusColor={apt.status === 'cancelled' ? "text-red-600" : "text-emerald-600"}
                    amount="€0.00"
                    onClick={() => setLocation(`/appointments/${apt.id}`)}
                  />
                ))}
              </div>
            </section>
          ))
        )}
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
