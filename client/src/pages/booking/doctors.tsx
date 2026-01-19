import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Star, MapPin, Calendar } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

const doctors = [
  { 
    id: 1, 
    name: "Dr. Sarah Johnson", 
    role: "General Practitioner", 
    rating: 4.9, 
    reviews: 124, 
    location: "Curaay Clinic, Downtown",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
  },
  { 
    id: 2, 
    name: "Dr. Michael Chen", 
    role: "General Practitioner", 
    rating: 4.8, 
    reviews: 89, 
    location: "MedCore Health Center",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300"
  },
  { 
    id: 3, 
    name: "Dr. Emily Wilson", 
    role: "General Practitioner", 
    rating: 5.0, 
    reviews: 56, 
    location: "Curaay Clinic, North",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300"
  },
];

export default function DoctorSelect() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Select Doctor" backPath="/booking" />
      
      <main className="p-5 space-y-4">
        {doctors.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex gap-4">
              <div className="w-20 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900">{doc.name}</h3>
                    <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-md">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-amber-700">{doc.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{doc.role}</p>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                  <MapPin size={12} />
                  <span>{doc.location}</span>
                </div>

                <Button 
                  size="sm" 
                  className="mt-3 w-full h-8 text-xs bg-slate-50 text-primary hover:bg-primary hover:text-white border border-slate-100 shadow-none"
                  onClick={() => setLocation(`/booking/calendar?doctor=${doc.id}`)}
                >
                  Book Visit
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}
