import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Pill, Video, Filter, ChevronRight, Clock } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-5 py-4 pt-12 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-bold text-xl text-slate-900 font-display">History</h1>
        <Button variant="ghost" size="sm" className="text-primary gap-2">
          <Filter size={16} /> Filter
        </Button>
      </header>
      
      <main className="p-5">
        <Tabs defaultValue="appointments" onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-12 bg-slate-100 p-1 mb-6 rounded-xl grid grid-cols-3">
            <TabsTrigger value="appointments" className="rounded-lg text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions" className="rounded-lg text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Prescriptions</TabsTrigger>
            <TabsTrigger value="consultations" className="rounded-lg text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Consultations</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-4 outline-none">
            <AppointmentCard 
              status="Completed" 
              statusColor="bg-emerald-50 text-emerald-700"
              doctor="Dr. Anna Schmidt"
              role="General Practice"
              location="Health Center Berlin"
              date="Jan 15, 2026 • 9:00 AM"
              onClick={() => setLocation("/history/appointment/1")}
            />
            <AppointmentCard 
              status="Cancelled" 
              statusColor="bg-slate-100 text-slate-500"
              doctor="Dr. Thomas Weber"
              role="Dermatology"
              location="Skin Clinic Mitte"
              date="Jan 10, 2026 • 2:30 PM"
              onClick={() => setLocation("/history/appointment/2")}
            />
            <AppointmentCard 
              status="Completed" 
              statusColor="bg-emerald-50 text-emerald-700"
              doctor="Dr. Maria Koch"
              role="General Practice"
              location="Health Center Berlin"
              date="Dec 20, 2025 • 11:00 AM"
              onClick={() => setLocation("/history/appointment/3")}
            />
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4 outline-none">
            <PrescriptionCard 
              status="Delivered"
              statusColor="bg-emerald-50 text-emerald-700"
              name="Metformin 500mg"
              details="30 tablets"
              date="Delivered: Jan 18, 2026"
              onClick={() => setLocation("/history/prescription/1")}
            />
            <PrescriptionCard 
              status="Redeemed"
              statusColor="bg-blue-50 text-blue-700"
              name="Ibuprofen 400mg"
              details="20 tablets"
              date="Redeemed: Jan 5, 2026"
              onClick={() => setLocation("/history/prescription/2")}
            />
          </TabsContent>

          <TabsContent value="consultations" className="space-y-4 outline-none">
            <ConsultationCard 
              doctor="Dr. Müller"
              type="Video Consultation"
              date="Jan 19, 2026"
              duration="12 mins"
              onClick={() => setLocation("/history/consultation/1")}
            />
            <ConsultationCard 
              doctor="Dr. Fischer"
              type="Video Consultation"
              date="Jan 5, 2026"
              duration="8 mins"
              onClick={() => setLocation("/history/consultation/2")}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function AppointmentCard({ status, statusColor, doctor, role, location, date, onClick }: any) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} onClick={onClick} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3 cursor-pointer hover:border-primary/20 transition-all">
      <div className="flex justify-between items-start">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${statusColor}`}>{status}</span>
        <span className="text-xs text-slate-400 font-medium">{date}</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-900">{doctor}</h3>
          <p className="text-xs text-slate-500">{role} • {location}</p>
        </div>
        <ChevronRight size={20} className="text-slate-300" />
      </div>
    </motion.div>
  );
}

function PrescriptionCard({ status, statusColor, name, details, date, onClick }: any) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} onClick={onClick} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 cursor-pointer hover:border-primary/20 transition-all">
      <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
        <Pill size={20} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
           <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${statusColor}`}>{status}</span>
        </div>
        <h3 className="font-bold text-slate-900">{name}</h3>
        <p className="text-xs text-slate-500">{details}</p>
        <p className="text-xs text-slate-400 mt-1">{date}</p>
      </div>
      <ChevronRight size={20} className="text-slate-300 self-center" />
    </motion.div>
  );
}

function ConsultationCard({ doctor, type, date, duration, onClick }: any) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} onClick={onClick} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 cursor-pointer hover:border-primary/20 transition-all">
      <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
        <Video size={20} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
           <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-700">Completed</span>
        </div>
        <h3 className="font-bold text-slate-900">{doctor}</h3>
        <p className="text-xs text-slate-500">{type}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
          <span>{date}</span>
          <span className="flex items-center gap-1"><Clock size={10} /> {duration}</span>
        </div>
      </div>
      <ChevronRight size={20} className="text-slate-300 self-center" />
    </motion.div>
  );
}
