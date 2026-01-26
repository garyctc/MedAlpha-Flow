import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
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
      <SubPageHeader title="Terms of Service" backPath="/profile/legal" />

      <main className="p-5 relative">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Last Updated: January 1, 2026</p>

        <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Acceptance of Terms</h2>
            <p className="mb-4">
              By creating an account and using DocliQ, you agree to be bound by these Terms of Service. If you do not accept these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">User Responsibilities</h2>
            <p className="mb-4">
              You agree to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate and complete information during registration.</li>
              <li>Maintain the confidentiality of your login credentials.</li>
              <li>Use the service only for lawful purposes and in a manner that does not violate the rights of others.</li>
              <li>Report any unauthorized access to your account immediately.</li>
              <li>Not attempt to gain unauthorized access to other users' accounts or systems.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Service Description</h2>
            <p className="mb-4">
              DocliQ provides a digital healthcare platform enabling users to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Book appointments with healthcare providers.</li>
              <li>Access digital prescriptions (E-Rezept) and pharmacy services.</li>
              <li>Schedule telemedicine consultations with licensed medical professionals.</li>
              <li>Manage personal health information and insurance details.</li>
            </ul>
            <p className="mt-4">
              All medical advice provided through our platform is for informational purposes only and should not substitute professional medical consultation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Termination</h2>
            <p className="mb-4">
              We may suspend or terminate your account if you violate these terms or engage in fraudulent activity. Upon termination, your right to access the service ends immediately. Outstanding balances remain due.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Limitation of Liability</h2>
            <p className="mb-4">
              DocliQ is provided "as is" without warranties. To the fullest extent permitted by law, we are not liable for indirect, incidental, special, or consequential damages arising from use of or inability to use the service. This includes damages for lost profits, data, or medical decisions made relying on our platform.
            </p>
            <p className="mt-2">
              <strong>Medical Disclaimer:</strong> DocliQ is not a substitute for professional medical advice. Always consult with qualified healthcare providers for medical diagnosis and treatment.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Changes to Terms</h2>
            <p>
              We may modify these terms at any time. Changes become effective when posted. Continued use of the service constitutes acceptance of modified terms. We will notify users of significant changes via email or app notification.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Governing Law</h2>
            <p>
              These terms are governed by the laws of Germany. Any disputes shall be resolved in the courts of Berlin, Germany, subject to German consumer protection laws.
            </p>
          </section>
        </div>

        {/* Back to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-6 right-5 w-12 h-12 rounded-full shadow-lg bg-white hover:bg-slate-50 text-slate-900 z-50 transition-all border border-slate-100"
          >
            <ArrowUp size={24} />
          </Button>
        )}
      </main>
    </div>
  );
}
