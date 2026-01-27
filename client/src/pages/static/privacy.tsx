import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Privacy Policy" backPath="/profile/legal" />
      
      <main className="p-5 relative">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">Last Updated: January 1, 2026</p>

        <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 font-display">Data We Collect</h2>
            <p className="mb-4">
              We collect personal data that you provide to us directly, such as when you create an account, update your profile, book an appointment, or use our services. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Information:</strong> Name, date of birth, contact details (email, phone number), and address.</li>
              <li><strong>Health Data:</strong> Information related to your health, such as symptoms, medication history, and prescriptions, which is processed with the highest level of security and in compliance with GDPR.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our app, device information, and log data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 font-display">How We Use Your Data</h2>
            <p className="mb-4">
              We use your data primarily to provide and improve our healthcare services. Specifically, we use it to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Facilitate appointment bookings with doctors and specialists.</li>
              <li>Process and manage your digital prescriptions (E-Rezept).</li>
              <li>Enable secure video consultations through our telemedicine partners.</li>
              <li>Communicate with you regarding your appointments, health updates, and service changes.</li>
              <li>Comply with legal obligations and healthcare regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 font-display">Data Sharing</h2>
            <p className="mb-4">
              We do not sell your personal data. We only share your data with trusted partners necessary to provide our services:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Healthcare Providers:</strong> Doctors and clinics you book appointments with.</li>
              <li><strong>Telemedicine Platforms:</strong> Video consultation providers (e.g., Teleclinic) to facilitate your virtual visits.</li>
              <li><strong>Pharmacies:</strong> Online and local pharmacies (via Apo Group) for prescription fulfillment.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 font-display">Your Rights</h2>
            <p className="mb-4">
              Under the GDPR, you have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Right to Access:</strong> You can request a copy of your personal data.</li>
              <li><strong>Right to Rectification:</strong> You can request to correct inaccurate or incomplete data.</li>
              <li><strong>Right to Erasure:</strong> You can request the deletion of your personal data ("Right to be forgotten").</li>
              <li><strong>Right to Data Portability:</strong> You can request to receive your data in a structured, commonly used format.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 font-display">Contact</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact our Data Protection Officer at:
            </p>
            <p className="mt-2 font-medium">privacy@docliq.de</p>
          </section>
        </div>

        {/* Back to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-6 right-5 w-12 h-12 rounded-full shadow-[var(--shadow-card)] bg-card hover:bg-muted text-foreground z-50 transition-all border border-border"
          >
            <ArrowUp size={24} />
          </Button>
        )}
      </main>
    </div>
  );
}
