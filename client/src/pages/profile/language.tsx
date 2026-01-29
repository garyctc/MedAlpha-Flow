import { useLocation } from "wouter";
import { Check } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { useTranslation } from "react-i18next";
import { setLocale, type Locale } from "@/i18n";

export default function LanguageSelection() {
  const [, setLocation] = useLocation();
  const { t, i18n } = useTranslation();
  const currentLocale = (i18n.language === "de" ? "de" : "en") satisfies Locale;

  const handleLanguageSelect = (locale: Locale) => {
    setLocale(locale);
    setTimeout(() => {
      setLocation("/profile");
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      <SubPageHeader title={t("nav.language")} backPath="/profile" />

      <main className="p-4 space-y-6">
        {/* Section 1 - Current Language */}
        <section>
          <div className="bg-card rounded-3xl shadow-[var(--shadow-card)] p-4 flex items-center justify-between border border-border">
            <span className="text-foreground font-medium">{t("profile.language.currentLabel")}</span>
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold">
                {currentLocale === "de" ? t("profile.language.deLabel") : t("profile.language.enLabel")}
              </span>
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Check size={14} className="text-primary" />
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-2 ml-1">
            {t("profile.language.helper")}
          </p>
        </section>

        {/* Section 2 - Available Languages */}
        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            {t("profile.language.available")}
          </h3>
          <div className="bg-card rounded-3xl shadow-[var(--shadow-card)] overflow-hidden border border-border">
            {/* English */}
            <button
              onClick={() => handleLanguageSelect("en")}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors border-b border-border last:border-0"
            >
              <div className="flex items-center gap-4">
                <span className="text-foreground font-medium">{t("profile.language.enLabel")}</span>
              </div>
              {currentLocale === "en" ? (
                <div className="w-5 h-5 rounded-full bg-primary border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-border" />
              )}
            </button>

            {/* German */}
            <button
              onClick={() => handleLanguageSelect("de")}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-foreground font-medium">{t("profile.language.deLabel")}</span>
              </div>
              {currentLocale === "de" ? (
                <div className="w-5 h-5 rounded-full bg-primary border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-border" />
              )}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
