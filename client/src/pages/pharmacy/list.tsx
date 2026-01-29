import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Star, MapPin, Navigation, ChevronRight, Clock, Search } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Input } from "@/components/ui/input";
import { PHARMACIES, isPharmacyOpen } from "@/lib/constants/pharmacies";

const FILTERS = [
  { id: "open", label: "Open Now" },
  { id: "24h", label: "24 Hours" },
  { id: "delivery", label: "Delivery" },
  { id: "rated", label: "Highest Rated" }
];

export default function PharmacyList() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredPharmacies = useMemo(() => {
    let result = [...PHARMACIES];

    // Search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.address.toLowerCase().includes(searchLower)
      );
    }

    // Apply active filters
    if (activeFilters.includes("open")) {
      result = result.filter(p => isPharmacyOpen(p));
    }
    if (activeFilters.includes("24h")) {
      result = result.filter(p => p.is24Hour);
    }
    if (activeFilters.includes("delivery")) {
      result = result.filter(p => p.hasDelivery);
    }
    if (activeFilters.includes("rated")) {
      result = result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, activeFilters]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Nearby Pharmacies" backPath="/pharmacy/map" />

      <main className="p-5 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search pharmacies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilters.includes(filter.id)
                  ? "bg-primary text-white"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {filteredPharmacies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-medium">No pharmacies found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            filteredPharmacies.map((pharmacy, index) => (
              <motion.button
                key={pharmacy.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setLocation(`/pharmacy/detail?id=${pharmacy.id}`)}
                className="w-full bg-card p-4 rounded-3xl border border-border shadow-[var(--shadow-card)] flex items-start gap-4 text-left hover:border-primary/30 transition-colors group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 font-semibold text-primary text-xl">
                  {pharmacy.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{pharmacy.name}</h3>
                    <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-lg text-xs font-semibold text-amber-700">
                      <Star size={10} className="fill-current" />
                      {pharmacy.rating}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground font-medium truncate">{pharmacy.address}, {pharmacy.city}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-lg ${pharmacy.statusColor}`}>
                      {pharmacy.status}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock size={10} /> {pharmacy.hours}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Navigation size={10} />
                    <span>{pharmacy.distance} away</span>
                  </div>
                </div>

                <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors self-center" size={20} />
              </motion.button>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
