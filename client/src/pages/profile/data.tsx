import { Download, Trash2, Lock } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/lib/toast-helpers";

export default function DataPrivacy() {
  const handleExportClick = () => {
    showSuccess("Data export coming soon");
  };

  const handleDeleteClick = () => {
    showSuccess("Contact support to delete your account");
  };

  const dataCategories = [
    {
      icon: "👤",
      title: "Personal Information",
      description: "Name, email, phone, address, date of birth",
      status: "Stored"
    },
    {
      icon: "🏥",
      title: "Insurance Information",
      description: "Insurance type, provider, policy details",
      status: "Stored"
    },
    {
      icon: "📅",
      title: "Appointments",
      description: "Booked appointments, consultations, history",
      status: "Stored"
    },
    {
      icon: "💊",
      title: "Prescriptions",
      description: "Digital prescriptions, redemption history",
      status: "Stored"
    },
    {
      icon: "⚙️",
      title: "Settings",
      description: "Language, notifications, preferences",
      status: "Stored"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="My Data" backPath="/profile" />

      <main className="p-5 space-y-6">
        {/* Intro */}
        <section>
          <p className="text-sm text-slate-700 leading-relaxed">
            Under the GDPR (General Data Protection Regulation), you have the right to access, export, and delete your personal data. Use the options below to manage your data.
          </p>
        </section>

        {/* Data Export */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Export Your Data</h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
            <p className="text-sm text-slate-700">
              Download all your data in a machine-readable format (JSON).
            </p>
            <Button
              onClick={handleExportClick}
              disabled
              className="w-full h-12 rounded-xl flex items-center gap-2"
              variant="outline"
            >
              <Download size={18} />
              Export Data (Coming Soon)
            </Button>
          </div>
        </section>

        {/* Data Categories */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Data We Store</h2>
          <div className="space-y-3">
            {dataCategories.map((category, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-start gap-3"
              >
                <div className="text-2xl flex-shrink-0">{category.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-slate-900 text-sm">{category.title}</p>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {category.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Account Deletion */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Delete Your Account</h2>
          <div className="bg-red-50 rounded-2xl border border-red-100 shadow-sm p-5 space-y-3">
            <p className="text-sm text-red-900 leading-relaxed">
              Deleting your account is permanent and cannot be undone. All your data will be removed from our systems.
            </p>
            <Button
              onClick={handleDeleteClick}
              disabled
              className="w-full h-12 rounded-xl flex items-center gap-2"
              variant="outline"
            >
              <Trash2 size={18} />
              Delete Account (Contact Support)
            </Button>
          </div>
        </section>

        {/* GDPR Rights */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Your GDPR Rights</h2>
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5 space-y-3">
            <div className="flex gap-3">
              <Lock size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Right to Access (Article 15)</p>
                <p className="text-xs text-blue-800">You can request a copy of all personal data we hold about you.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Lock size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Right to Data Portability (Article 20)</p>
                <p className="text-xs text-blue-800">You can request your data in a structured, machine-readable format.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Lock size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Right to Erasure (Article 17)</p>
                <p className="text-xs text-blue-800">You can request deletion of your personal data, with limited exceptions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <p className="text-xs text-slate-500 text-center">
            For data requests or questions, contact: <span className="font-medium text-slate-700">privacy@docliq.de</span>
          </p>
        </section>
      </main>
    </div>
  );
}
