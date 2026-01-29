import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import appLogo from "@/assets/app-logo.svg";
import { getAuthState } from "@/lib/storage";
import { branding } from "@/config/branding";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user is already logged in
      const authState = getAuthState();
      if (authState?.isLoggedIn) {
        setLocation("/home");
      } else {
        setLocation("/login");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground" data-testid="splash-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-32 h-32 flex items-center justify-center mb-6">
          <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight mb-2 text-foreground">{branding.appName}</h1>
        <p className="text-muted-foreground font-medium">{branding.tagline}</p>
      </motion.div>
    </div>
  );
}
