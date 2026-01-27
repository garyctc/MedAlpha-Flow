import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { User, Shield, HelpCircle, LogOut, ChevronRight, CreditCard, Bell, FileText, Globe, Link2, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import avatarImage from "@assets/generated_images/professional_user_avatar_for_healthcare_app.png";
import { getUserProfile, getUserInsurance, clearAuthState } from "@/lib/storage";
import { showSuccess } from "@/lib/toast-helpers";
import { useTranslation } from "react-i18next";
import { getLocale, type Locale } from "@/i18n";
import type { UserProfile, UserInsurance } from "@/types/storage";
import { FEATURES } from "@/lib/features";

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const locale: Locale = getLocale();
  const languageLabel = locale === "de" ? t("profile.language.deLabel") : t("profile.language.enLabel");

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [insurance, setInsurance] = useState<UserInsurance | null>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProfile(getUserProfile());
      setInsurance(getUserInsurance());
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : "";
  const displayEmail = profile?.email || "";

  const handleSignOut = () => {
    clearAuthState();
    showSuccess(t("profile.loggedOut", { defaultValue: "Logged out" }));
    setLocation("/login");
  };

  const handleNotificationsClick = () => {
    showSuccess(t("common.comingSoon", { defaultValue: "Coming soon" }));
  };

  const handleInsuranceClick = () => {
    // Check saved type or default to GKV for prototype
    const type = insurance?.type || localStorage.getItem("user-insurance-type");
    if (type === "pkv") {
      setLocation("/profile/insurance-pkv");
    } else {
      setLocation("/profile/insurance-gkv");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="pt-12 pb-4 px-5">
        <h1 className="text-2xl font-semibold text-foreground">{t("profile.title")}</h1>
      </header>

      <main className="p-5 space-y-8">
        {/* User Info Card */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full border-4 border-card shadow-md overflow-hidden mb-4">
            <img src={avatarImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
          {isLoading ? (
            <>
              <Skeleton className="h-7 w-40 mb-2" />
              <Skeleton className="h-4 w-48" />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-foreground">{displayName}</h2>
              <p className="text-muted-foreground text-sm">{displayEmail}</p>
            </>
          )}
        </div>

        {/* Menu Sections */}
        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t("profile.sections.account")}</h3>
            <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
              <MenuRow icon={User} label={t("profile.menu.personalInfo")} onClick={() => setLocation("/profile/edit")} />
              {FEATURES.prescriptionEnabled && (
                <>
                  <div className="h-px bg-border mx-4"></div>
                  <MenuRow icon={Shield} label={t("profile.menu.insuranceInfo")} onClick={handleInsuranceClick} />
                </>
              )}
              <div className="h-px bg-border mx-4"></div>
              <MenuRow icon={Database} label={t("profile.menu.myData", { defaultValue: "My Data" })} onClick={() => setLocation("/profile/data")} />
              <div className="h-px bg-border mx-4"></div>
              <MenuRow icon={Globe} label={t("nav.language")} value={languageLabel} onClick={() => setLocation("/profile/language")} />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t("profile.sections.support")}</h3>
            <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
              <MenuRow icon={HelpCircle} label={t("profile.menu.help")} onClick={() => setLocation("/profile/support")} />
              <div className="h-px bg-border mx-4"></div>
              <MenuRow icon={Shield} label={t("profile.menu.privacyLegal")} onClick={() => setLocation("/profile/legal")} />
            </div>
          </section>
        </div>

        <Button
          variant="outline"
          className="w-full h-12 border-destructive/30 text-destructive hover:bg-destructive/10 flex items-center gap-2"
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut size={18} /> {t("profile.signOut")}
        </Button>
      </main>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="w-[90%] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("profile.logout.title", { defaultValue: "Log out?" })}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("profile.logout.description", { defaultValue: "Are you sure you want to log out of your account?" })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel", { defaultValue: "Cancel" })}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              {t("profile.signOut")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function MenuRow({ icon: Icon, label, value, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full px-4 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <Icon size={16} strokeWidth={1.5} />
        </div>
        <span className="font-medium text-foreground text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-muted-foreground font-medium">{value}</span>}
        <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary" />
      </div>
    </button>
  );
}
