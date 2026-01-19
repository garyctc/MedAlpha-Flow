import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white" data-testid="splash-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-6 border border-white/20">
          <Plus className="w-10 h-10 text-white" strokeWidth={3} />
        </div>
        <h1 className="text-3xl font-bold font-display tracking-tight mb-2">MedAlpha</h1>
        <p className="text-white/80 font-medium">Your healthcare companion</p>
      </motion.div>
    </div>
  );
}
