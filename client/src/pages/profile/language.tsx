import { useState } from "react";
import { useLocation } from "wouter";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { useToast } from "@/hooks/use-toast";

export default function LanguageSelection() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    toast({
      title: "Language updated",
      description: "The app will now display in English",
    });
    setTimeout(() => {
      setLocation("/profile");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-safe">
      <SubPageHeader title="Language" backPath="/profile" />

      <main className="p-4 space-y-6">
        {/* Section 1 - Current Language */}
        <section>
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
            <span className="text-slate-900 font-medium">App Language</span>
            <div className="flex items-center gap-2">
              <span className="text-[#0C3D91] font-bold">English</span>
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={14} className="text-[#2E7D32]" />
              </div>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-2 ml-1">
            The app will display in your selected language
          </p>
        </section>

        {/* Section 2 - Available Languages */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            Available
          </h3>
          <div className="bg-white rounded-lg overflow-hidden">
            {/* English (Selected) */}
            <button
              onClick={() => handleLanguageSelect("english")}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">🇬🇧</span>
                <span className="text-slate-900 font-medium">English</span>
              </div>
              <div className="w-5 h-5 rounded-full bg-[#0C3D91] border-2 border-[#0C3D91] flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </button>

            {/* German */}
            <button
              onClick={() => handleLanguageSelect("german")}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">🇩🇪</span>
                <span className="text-slate-900 font-medium">Deutsch</span>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
            </button>
          </div>
        </section>

        {/* Section 3 - Coming Soon */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            Coming Soon
          </h3>
          <div className="bg-white rounded-lg overflow-hidden">
            <ComingSoonRow flag="🇹🇷" name="Türkçe" />
            <ComingSoonRow flag="🇵🇱" name="Polski" />
            <ComingSoonRow flag="🇷🇴" name="Română" />
            
            {expanded && (
              <>
                <ComingSoonRow flag="🇧🇬" name="Български" native="Bulgarian" />
                <ComingSoonRow flag="🇭🇷" name="Hrvatski" native="Croatian" />
                <ComingSoonRow flag="🇷🇸" name="Српски" native="Serbian" />
                <ComingSoonRow flag="🇭🇺" name="Magyar" native="Hungarian" />
                <ComingSoonRow flag="🇨🇿" name="Čeština" native="Czech" />
                <ComingSoonRow flag="🇸🇰" name="Slovenčina" native="Slovak" />
                <ComingSoonRow flag="🇸🇮" name="Slovenščina" native="Slovenian" />
                <ComingSoonRow flag="🇮🇹" name="Italiano" native="Italian" />
                <ComingSoonRow flag="🇪🇸" name="Español" native="Spanish" />
                <ComingSoonRow flag="🇵🇹" name="Português" native="Portuguese" />
              </>
            )}

            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full p-4 flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-medium">
                {expanded ? "Show fewer" : "More languages..."}
              </span>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-2 pb-8 text-center">
          <p className="text-slate-400 text-sm">
            Need another language?{" "}
            <button className="text-primary underline font-medium">
              Let us know
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

function ComingSoonRow({ flag, name, native }: { flag: string; name: string; native?: string }) {
  return (
    <div className="w-full p-4 flex items-center justify-between border-b border-slate-50 last:border-0 opacity-50 cursor-not-allowed bg-slate-50/30">
      <div className="flex items-center gap-4">
        <span className="text-2xl grayscale opacity-70">{flag}</span>
        <div className="flex flex-col items-start">
          <span className="text-slate-500 font-medium">{name}</span>
          {native && <span className="text-xs text-slate-400">{native}</span>}
        </div>
      </div>
      <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
        Soon
      </span>
    </div>
  );
}
