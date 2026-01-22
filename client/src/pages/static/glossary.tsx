import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Input } from "@/components/ui/input";

interface GlossaryTerm {
  german: string;
  english: string;
  definition: string;
}

interface GlossarySection {
  title: string;
  terms: GlossaryTerm[];
}

const glossarySections: GlossarySection[] = [
  {
    title: "Insurance Terms",
    terms: [
      {
        german: "GKV",
        english: "Statutory Health Insurance",
        definition: "Gesetzliche Krankenversicherung. Public health insurance system in Germany covering approximately 90% of the population."
      },
      {
        german: "PKV",
        english: "Private Health Insurance",
        definition: "Private Krankenversicherung. Optional private insurance for high earners, self-employed, and civil servants."
      },
      {
        german: "Zuzahlung",
        english: "Co-payment",
        definition: "Patient's portion of healthcare costs. Typically €5–€10 per prescription or €10 per day for hospital stays."
      },
      {
        german: "Kassenrezept",
        english: "Insurance-Covered Prescription",
        definition: "Prescription issued by a doctor covered by public health insurance. Patient pays only the co-payment."
      },
      {
        german: "Privatrezept",
        english: "Private Prescription",
        definition: "Prescription issued for private patients or PKV-insured. Patient pays the full pharmacy price."
      }
    ]
  },
  {
    title: "Digital Health",
    terms: [
      {
        german: "ePA",
        english: "Electronic Patient Record",
        definition: "Elektronische Patientenakte. Digital health record system allowing patients to store and access medical documents online."
      },
      {
        german: "DiGA",
        english: "Digital Health Application",
        definition: "Digitale Gesundheitsanwendungen. Certified medical apps prescribed by doctors and covered by health insurance."
      },
      {
        german: "E-Rezept",
        english: "Digital Prescription",
        definition: "Elektronisches Rezept. Digital prescription system eliminating paper prescriptions and enabling delivery to any pharmacy."
      },
      {
        german: "gematik",
        english: "Telematics Infrastructure Company",
        definition: "German state organization managing the IT infrastructure for secure health data exchange between doctors, hospitals, and pharmacies."
      },
      {
        german: "Telematikinfrastruktur",
        english: "Telematics Infrastructure",
        definition: "Secure network connecting all healthcare providers in Germany for HIPAA-equivalent data protection."
      }
    ]
  },
  {
    title: "Healthcare",
    terms: [
      {
        german: "Hausarzt",
        english: "General Practitioner",
        definition: "Primary care physician. Coordinates overall care and provides referrals to specialists."
      },
      {
        german: "Facharzt",
        english: "Specialist",
        definition: "Medical specialist (cardiologist, dermatologist, etc.). Usually requires referral from GP in GKV."
      },
      {
        german: "Überweisung",
        english: "Referral",
        definition: "Doctor's referral to a specialist. Required under German health insurance for specialist visits (GKV)."
      },
      {
        german: "AU-Bescheinigung",
        english: "Sick Leave Certificate",
        definition: "Arbeitsunfähigkeitsbescheinigung. Medical certificate proving inability to work, required after 3 consecutive sick days."
      }
    ]
  }
];

export default function MedicalGlossary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const toggleTerm = (id: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedTerms(newExpanded);
  };

  const filteredSections = glossarySections.map(section => ({
    ...section,
    terms: section.terms.filter(term =>
      term.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.terms.length > 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Medical Glossary" backPath="/profile/support" />

      <main className="p-5">
        <div className="mb-6 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-10 bg-white border-slate-200"
          />
        </div>

        {filteredSections.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">No terms match your search.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSections.map((section) => (
              <section key={section.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">{section.title}</h2>
                </div>

                <div className="divide-y divide-slate-100">
                  {section.terms.map((term, idx) => {
                    const termId = `${section.title}-${idx}`;
                    const isExpanded = expandedTerms.has(termId);

                    return (
                      <button
                        key={termId}
                        onClick={() => toggleTerm(termId)}
                        className="w-full px-5 py-4 flex items-start justify-between hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1">
                            <p className="font-semibold text-slate-900 text-sm">{term.german}</p>
                            <p className="text-xs text-slate-500 font-normal">({term.english})</p>
                          </div>
                          {isExpanded && (
                            <p className="text-slate-600 text-sm leading-relaxed mt-2">{term.definition}</p>
                          )}
                        </div>
                        <div className="ml-3 flex-shrink-0">
                          <ChevronDown
                            size={18}
                            className={`text-slate-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
