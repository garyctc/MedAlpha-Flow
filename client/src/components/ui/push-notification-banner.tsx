import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Pill, MapPin } from "lucide-react";
import { branding } from "@/config/branding";

type PushNotificationProps = {
  show: boolean;
  title: string;
  message: string;
  onDismiss: () => void;
  onActionPrimary?: () => void;
  onActionSecondary?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export default function PushNotificationBanner({
  show,
  title,
  message,
  onDismiss,
  onActionPrimary,
  onActionSecondary,
  primaryLabel = "View",
  secondaryLabel = "Dismiss",
}: PushNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto-dismiss after 8 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300); // Wait for animation
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-4 left-4 right-4 z-[100] max-w-[375px] mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
                <span className="text-white font-semibold text-sm">{branding.appName}</span>
              </div>
              <button
                onClick={handleDismiss}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
              <p className="text-sm text-slate-600 mb-3">{message}</p>

              {/* Action Buttons */}
              {(onActionPrimary || onActionSecondary) && (
                <div className="flex gap-2">
                  {onActionPrimary && (
                    <button
                      onClick={() => {
                        onActionPrimary();
                        handleDismiss();
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Pill size={16} />
                      {primaryLabel}
                    </button>
                  )}
                  {onActionSecondary && (
                    <button
                      onClick={() => {
                        onActionSecondary();
                        handleDismiss();
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                    >
                      <MapPin size={16} />
                      {secondaryLabel}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
