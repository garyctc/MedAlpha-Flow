import { useLocation } from "wouter";
import { User, MapPin, Calendar, Clock } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function BookingReview() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title="Review Booking" backPath="/booking/calendar" />
      
      <main className="p-5">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Doctor Section */}
          <div className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <p className="font-bold text-slate-900">Dr. Anna Schmidt</p>
              <p className="text-sm text-slate-500">General Practice</p>
            </div>
            <button className="text-sm font-medium text-primary">Edit</button>
          </div>

          <div className="h-px bg-slate-100 mx-4"></div>

          {/* Location Section */}
          <div className="p-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="font-bold text-slate-900 text-sm">Health Center Berlin</p>
              <p className="text-xs text-slate-500 mt-0.5">Friedrichstraße 123, Berlin</p>
            </div>
            <button className="text-sm font-medium text-primary">Edit</button>
          </div>

          <div className="h-px bg-slate-100 mx-4"></div>

          {/* Date & Time Section */}
          <div className="p-4 flex items-start gap-4">
             <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-primary" />
                  <span className="text-sm font-medium text-slate-700">January 20, 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-primary" />
                  <span className="text-sm font-medium text-slate-700">9:00 AM</span>
                </div>
             </div>
             <button className="text-sm font-medium text-primary">Edit</button>
          </div>

        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 pb-safe z-[60]">
        <div className="max-w-[375px] mx-auto">
           <Button 
            className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            onClick={() => setLocation("/booking/success")}
           >
             Confirm Booking
           </Button>
        </div>
      </div>
    </div>
  );
}
