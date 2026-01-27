import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Search, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserAppointments } from "@/lib/storage";
import type { Appointment } from "@/types/storage";
import { formatLocalDate, formatLocalTime, getLocale } from "@/i18n";
import { FEATURES } from "@/lib/features";
import { AppointmentCard } from "@/components/appointment-card";

export default function HistoryPage() {
  const { t } = useTranslation();
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
      <header className="pt-12 pb-4 px-5">
        <h1 className="text-2xl font-semibold text-foreground">{t("history.title")}</h1>
      </header>

      <main className="px-5 pb-5 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
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
                    ? "bg-primary text-white border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
        {isLoading ? (
          // Loading Skeleton
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full bg-card p-4 rounded-3xl border border-border shadow-[var(--shadow-card)] flex items-center gap-4">
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
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Clock size={28} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No past appointments</h3>
            <p className="text-sm text-muted-foreground">Your appointment history will appear here</p>
          </div>
        ) : (
          // Grouped History
          Object.entries(groupedHistory).map(([monthYear, appointments]) => (
            <section key={monthYear}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{monthYear}</h3>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <AppointmentCard
                    key={apt.id}
                    data={{
                      id: apt.id,
                      status: "past",
                      type: apt.type,
                      doctor: apt.doctor,
                      doctorImage: apt.doctorImage,
                      role: apt.specialty,
                      location: apt.clinic,
                      date: `${formatLocalDate(apt.date, locale)} • ${formatLocalTime(apt.time, locale)}`,
                      subStatus: apt.status === 'cancelled' ? 'cancelled' : 'completed',
                      amount: "€0.00"
                    }}
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
