import { useLocation } from "wouter";
import { User, MapPin, Calendar, Clock } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { getBookingDraft, clearBookingDraft } from "@/lib/storage";
import { useTranslation } from "react-i18next";
import { formatLocalDate, formatLocalTime, getLocale } from "@/i18n";

export default function BookingReview() {
  const [, setLocation] = useLocation();
  const draft = getBookingDraft();
  const { t } = useTranslation();
  const locale = getLocale();

  const fallbackDateIso = "2026-01-20";
  const fallbackTime24 = "09:00";

  const handleConfirm = () => {
    clearBookingDraft();
    setLocation("/booking/smart-match-processing");
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <SubPageHeader title={t("booking.review.title")} backPath="/booking/calendar" />
      
      <main className="p-5">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Doctor Section */}
          <div className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <p className="font-bold text-slate-900">{draft?.doctor || "Dr. Anna Schmidt"}</p>
              <p className="text-sm text-slate-500">{draft?.specialty || t("specialty.generalPractice")}</p>
            </div>
            <button className="text-sm font-medium text-primary">{t("common.buttons.edit")}</button>
          </div>

          <div className="h-px bg-slate-100 mx-4"></div>

          {/* Location Section */}
          <div className="p-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="font-bold text-slate-900 text-sm">{draft?.location || "Health Center Berlin"}</p>
              <p className="text-xs text-slate-500 mt-0.5">Friedrichstraße 123, Berlin</p>
            </div>
            <button className="text-sm font-medium text-primary">{t("common.buttons.edit")}</button>
          </div>

          <div className="h-px bg-slate-100 mx-4"></div>

          {/* Date & Time Section */}
          <div className="p-4 flex items-start gap-4">
             <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-primary" />
                  <span className="text-sm font-medium text-slate-700">
                    {draft?.date || formatLocalDate(fallbackDateIso, locale)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-primary" />
                  <span className="text-sm font-medium text-slate-700">
                    {draft?.time || formatLocalTime(fallbackTime24, locale)}
                  </span>
                </div>
             </div>
             <button className="text-sm font-medium text-primary">{t("common.buttons.edit")}</button>
          </div>

        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-[80px] left-0 right-0 z-40 flex justify-center">
        <div className="max-w-[375px] w-full bg-white border-t border-slate-100 px-5 py-4 flex justify-center">
          <div className="w-[315px]">
            <Button
              className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
              onClick={handleConfirm}
            >
              {t("booking.review.confirm")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
