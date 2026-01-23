import { Badge, FileText } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";

export default function AboutPage() {
  const certifications = [
    {
      icon: Badge,
      label: "CE Mark",
      status: "Approved",
      description: "Medical device compliance",
      color: "text-green-600"
    },
    {
      icon: FileText,
      label: "DiGA ID",
      status: "Pending",
      description: "DiGA-2024-XXXXXX",
      color: "text-amber-600"
    },
    {
      icon: FileText,
      label: "BfArM",
      status: "Pending",
      description: "German regulatory approval",
      color: "text-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="About MedAlpha" backPath="/profile/support" />

      <main className="p-5 space-y-8">
        {/* App Info */}
        <section>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Version</p>
              <p className="text-lg font-semibold text-slate-900">1.0.0</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Release Date</p>
              <p className="text-sm text-slate-700">January 2026</p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Certifications & Compliance</h2>
          <div className="space-y-3">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <div key={cert.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                    <Icon size={18} className={cert.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-slate-900 text-sm">{cert.label}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cert.status === "Approved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{cert.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-900 leading-relaxed">
              <strong>MDR Class I:</strong> MedAlpha is classified as a Class I medical device under the Medical Device Regulation (MDR) 2017/745, requiring CE marking but not notified body approval.
            </p>
          </div>
        </section>

        {/* Company Info */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 font-display">Company</h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Name</p>
              <p className="text-sm text-slate-700">MedAlpha GmbH</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Founded</p>
              <p className="text-sm text-slate-700">2026</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Focus</p>
              <p className="text-sm text-slate-700">Digital healthcare platform for appointment booking, prescription management, and telemedicine.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
