import { useState } from "react";
import { useLocation } from "wouter";
import { Calendar, Clock, MapPin, Star, Navigation, CalendarPlus, Info } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function AppointmentDetail() {
  const [, setLocation] = useLocation();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { toast } = useToast();

  const handleCancel = () => {
    setShowCancelDialog(false);
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been successfully cancelled.",
    });
    setTimeout(() => setLocation("/appointments"), 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Appointment Details" backPath="/appointments" />
      
      <main className="p-5 space-y-6">
        <div className="flex justify-center">
           <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1">
             <Clock size={12} /> Tomorrow at 9:00 AM
           </span>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
           {/* Doctor */}
           <div className="p-5 flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-xl">
                 AS
              </div>
              <div className="flex-1">
                 <h2 className="text-lg font-bold text-slate-900">Dr. Anna Schmidt</h2>
                 <p className="text-slate-500 text-sm">General Practice</p>
                 <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="text-amber-400 fill-current" />
                    <span className="text-xs font-bold text-slate-700">4.8</span>
                 </div>
              </div>
           </div>

           <div className="h-px bg-slate-50 mx-5"></div>

           {/* Location */}
           <div className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                    <MapPin size={16} />
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-900 text-sm">Health Center Berlin</h3>
                    <p className="text-slate-500 text-sm">Friedrichstraße 123, Berlin</p>
                    <button className="text-primary text-xs font-bold mt-1 flex items-center gap-1">
                       <Navigation size={10} /> Get Directions
                    </button>
                 </div>
              </div>
           </div>

           <div className="h-px bg-slate-50 mx-5"></div>

           {/* Date & Time */}
           <div className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                    <Calendar size={16} />
                 </div>
                 <span className="font-medium text-slate-900 text-sm">January 20, 2026</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                    <Clock size={16} />
                 </div>
                 <div className="flex-1 flex justify-between items-center">
                    <span className="font-medium text-slate-900 text-sm">9:00 AM</span>
                    <button className="text-primary text-xs font-bold flex items-center gap-1">
                       <CalendarPlus size={12} /> Add to Calendar
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
           <Button 
             variant="outline" 
             className="w-full h-12 rounded-xl border-blue-200 text-blue-700 hover:bg-blue-50"
             onClick={() => setLocation("/booking/calendar")}
           >
             Reschedule Appointment
           </Button>
           <Button 
             variant="outline" 
             className="w-full h-12 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
             onClick={() => setShowCancelDialog(true)}
           >
             Cancel Appointment
           </Button>
        </div>

        {/* Info */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
           <div className="flex items-center gap-2 mb-3">
             <Info size={16} className="text-slate-400" />
             <h3 className="font-bold text-slate-900 text-sm">What to bring</h3>
           </div>
           <ul className="space-y-2 text-sm text-slate-600 pl-1">
             <li>• Your Gesundheitskarte (health card)</li>
             <li>• Previous medical records (if applicable)</li>
             <li>• List of current medications</li>
           </ul>
        </div>
      </main>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="w-[90%] rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your appointment with Dr. Schmidt? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl border-slate-200">Keep it</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} className="bg-red-500 hover:bg-red-600 text-white rounded-xl">Yes, Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
