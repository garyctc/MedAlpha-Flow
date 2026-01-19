import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import dmLogo from "@/assets/dm-logo.png";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-900" data-testid="splash-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-32 h-32 flex items-center justify-center mb-6">
          <img src={dmLogo} alt="DM Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-3xl font-bold font-display tracking-tight mb-2 text-slate-900">MedAlpha</h1>
        <p className="text-slate-500 font-medium">Your healthcare companion</p>
      </motion.div>
    </div>
  );
}
