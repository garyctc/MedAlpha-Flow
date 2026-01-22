import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { User, Shield, HelpCircle, LogOut, ChevronRight, CreditCard, Bell, FileText, Globe, Link2, Database } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import appLogo from "@/assets/app-logo.svg";
import { branding } from "@/config/branding";
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
      <header className="px-5 py-4 pt-12 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 min-h-10">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src={appLogo} alt={`${branding.appName} Logo`} className="w-full h-full object-contain" />
          </div>
          <h1 className="font-bold text-xl text-slate-900 font-display">{t("profile.title")}</h1>
        </div>
      </header>
      
      <main className="p-5 space-y-8">
        {/* User Info Card */}
        <div className="flex flex-col items-center text-center">
           <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden mb-4">
             <img src={avatarImage} alt="Profile" className="w-full h-full object-cover" />
           </div>
           {isLoading ? (
             <>
               <Skeleton className="h-7 w-40 mb-2" />
               <Skeleton className="h-4 w-48" />
             </>
           ) : (
             <>
               <h2 className="text-xl font-bold text-slate-900 font-display">{displayName}</h2>
               <p className="text-slate-500 text-sm">{displayEmail}</p>
             </>
           )}
        </div>

        {/* Menu Sections */}
        <div className="space-y-6">
           <section>
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">{t("profile.sections.account")}</h3>
             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <MenuRow icon={User} label={t("profile.menu.personalInfo")} onClick={() => setLocation("/profile/edit")} />
                {FEATURES.prescriptionEnabled && (
                  <>
                    <div className="h-px bg-slate-50 mx-4"></div>
                    <MenuRow icon={Shield} label={t("profile.menu.insuranceInfo")} onClick={handleInsuranceClick} />
                  </>
                )}
                <div className="h-px bg-slate-50 mx-4"></div>
                <MenuRow
                  icon={Link2}
                  label={t("profile.menu.linkedAccounts")}
                  value={t("profile.menu.linkedAccountsValue", { count: 1 })}
                  onClick={() => setLocation("/profile/linked-accounts")}
                />
                <div className="h-px bg-slate-50 mx-4"></div>
                <MenuRow icon={Bell} label={t("profile.menu.notifications")} onClick={handleNotificationsClick} />
                <div className="h-px bg-slate-50 mx-4"></div>
                <MenuRow icon={Database} label={t("profile.menu.myData", { defaultValue: "My Data" })} onClick={() => setLocation("/profile/data")} />
                <div className="h-px bg-slate-50 mx-4"></div>
                <MenuRow icon={Globe} label={t("nav.language")} value={languageLabel} onClick={() => setLocation("/profile/language")} />
             </div>
           </section>

           <section>
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">{t("profile.sections.support")}</h3>
             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <MenuRow icon={HelpCircle} label={t("profile.menu.help")} onClick={() => setLocation("/profile/support")} />
                <div className="h-px bg-slate-50 mx-4"></div>
                <MenuRow icon={Shield} label={t("profile.menu.privacyLegal")} onClick={() => setLocation("/profile/legal")} />
             </div>
           </section>
        </div>

        <Button
          variant="outline"
          className="w-full h-12 rounded-xl border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut size={18} /> {t("profile.signOut")}
        </Button>
      </main>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="w-[90%] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("profile.logout.title", { defaultValue: "Log out?" })}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("profile.logout.description", { defaultValue: "Are you sure you want to log out of your account?" })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-md border-border">{t("common.cancel", { defaultValue: "Cancel" })}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md"
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
    <button onClick={onClick} className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-primary transition-colors">
          <Icon size={16} />
        </div>
        <span className="font-medium text-slate-700 text-sm group-hover:text-slate-900">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-slate-400 font-medium">{value}</span>}
        <ChevronRight size={18} className="text-slate-300 group-hover:text-primary" />
      </div>
    </button>
  );
}
