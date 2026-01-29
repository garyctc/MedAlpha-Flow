import { useLocation } from "wouter";
import { Stethoscope, User, Zap } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { EntryOptionCard } from "@/components/booking/EntryOptionCard";
import { saveBookingDraft } from "@/lib/storage";
import { useTranslation } from "react-i18next";

export default function BookingEntry() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title={t("booking.entry.title", { defaultValue: "Book an Appointment" })} backPath="/home" />
      <main className="p-5 space-y-4">
        <EntryOptionCard
          icon={Zap}
          title={t("booking.entry.fastTitle", { defaultValue: "Find a doctor fast" })}
          subtitle={t("booking.entry.fastSubtitle", { defaultValue: "We'll match you with the first available appointment" })}
          onClick={() => {
            saveBookingDraft({ entryMode: "fast", intent: "new" });
            setLocation("/booking/slots");
          }}
        />

        <EntryOptionCard
          icon={Stethoscope}
          title={t("booking.entry.selectSpecialty", { defaultValue: "Select Specialty" })}
          subtitle={t("booking.entry.fastest", { defaultValue: "Fastest available appointment" })}
          onClick={() => {
            saveBookingDraft({ entryMode: "specialty", intent: "new" });
            setLocation("/booking/specialty");
          }}
        />

        <EntryOptionCard
          icon={User}
          title={t("booking.entry.selectDoctor", { defaultValue: "Select Doctor" })}
          subtitle={t("booking.entry.doctorSubtitle", { defaultValue: "Choose a specific doctor" })}
          onClick={() => {
            saveBookingDraft({ entryMode: "doctor", intent: "new" });
            setLocation("/booking/doctors");
          }}
        />
      </main>
    </div>
  );
}
