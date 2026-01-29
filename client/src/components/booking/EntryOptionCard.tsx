import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";

interface EntryOptionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export function EntryOptionCard({ icon: Icon, title, subtitle, onClick }: EntryOptionCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-card p-5 rounded-3xl shadow-[var(--shadow-card)] border border-border flex items-center justify-between group hover:border-primary/30 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon size={24} className="text-primary" strokeWidth={1.5} />
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-foreground text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm mt-0.5">{subtitle}</p>
        </div>
      </div>
      <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
    </motion.button>
  );
}
