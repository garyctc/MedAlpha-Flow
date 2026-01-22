import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { MessageSquareText, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import annotationsData from "../../../../docs/annotations/screen-annotations.json";

// Route to Screen ID mapping (exact matches)
const routeToScreenId: Record<string, string> = {
  "/": "AUTH-001",
  "/login": "AUTH-002",
  "/register": "REG-001",
  "/register/verify": "REG-002",
  "/register/personal": "REG-003",
  "/register/insurance": "REG-004",
  "/register/gkv-details": "REG-005",
  "/register/pkv-details": "REG-006",
  "/register/complete": "REG-007",
  "/home": "HOME-001",
  "/booking": "BKG-001",
  "/booking/type": "BKG-001",
  "/booking/specialty": "BKG-002",
  "/booking/location": "BKG-003",
  "/booking/doctors": "BKG-004",
  "/booking/calendar": "BKG-005",
  "/booking/review": "BKG-006",
  "/booking/success": "BKG-007",
  "/booking/smart-match-processing": "BKG-008",
  "/booking/smart-match-refinement": "BKG-009",
  "/booking/smart-match-success": "BKG-010",
  "/prescriptions": "RX-001",
  "/prescriptions/type": "RX-001",
  "/prescriptions/redeem-start": "RX-004",
  "/prescriptions/nfc-intro": "RX-005",
  "/prescriptions/nfc-scan": "RX-006",
  "/prescriptions/gkv-sms-verify": "RX-007",
  "/prescriptions/pkv-auth": "RX-008",
  "/prescriptions/pkv-insurer-select": "RX-009",
  "/prescriptions/pkv-redirect": "RX-010",
  "/prescriptions/pkv-error": "RX-011",
  "/prescriptions/list": "RX-002",
  "/prescriptions/pharmacy": "RX-012",
  "/prescriptions/review": "RX-013",
  "/prescriptions/success": "RX-014",
  "/prescriptions/receipt": "RX-015",
  "/telehealth/schedule-type": "TH-001",
  "/telehealth/symptoms-intro": "TH-002",
  "/telehealth/symptoms-details": "TH-003",
  "/telehealth/symptoms-info": "TH-004",
  "/telehealth/review": "TH-005",
  "/telehealth/confirmation": "TH-006",
  "/telehealth/waiting-room": "TH-007",
  "/telehealth/call": "TH-008",
  "/telehealth/summary": "TH-009",
  "/teleclinic/simulated": "TH-010",
  "/pharmacy/map": "PHR-001",
  "/pharmacy/list": "PHR-002",
  "/appointments": "APT-001",
  "/history": "HIST-001",
  "/profile": "PRF-001",
  "/profile/edit": "PRF-002",
  "/profile/linked-accounts": "PRF-005",
  "/profile/insurance-gkv": "PRF-003",
  "/profile/insurance-pkv": "PRF-004",
  "/profile/language": "PRF-006",
  "/profile/support": "PRF-007",
  "/profile/legal": "PRF-008",
  "/sso/loading": "SSO-001",
  "/sso/complete-profile": "SSO-002",
  "/static/faq": "STATIC-001",
  "/static/support": "STATIC-002",
  "/static/privacy": "STATIC-004",
  "/static/legal": "STATIC-003",
};

// Dynamic route patterns (for routes with parameters like /appointments/:id)
const dynamicRoutePatterns: Array<{ pattern: RegExp; screenId: string }> = [
  { pattern: /^\/appointments\/[^/]+$/, screenId: "APT-002" },
  { pattern: /^\/prescriptions\/[^/]+$/, screenId: "RX-003" },
  { pattern: /^\/pharmacy\/[^/]+$/, screenId: "PHR-003" },
];

// Get screen ID for a given location
function getScreenId(location: string): string {
  // First check exact matches
  if (routeToScreenId[location]) {
    return routeToScreenId[location];
  }

  // Then check dynamic patterns
  for (const { pattern, screenId } of dynamicRoutePatterns) {
    if (pattern.test(location)) {
      return screenId;
    }
  }

  return "ERR-001";
}

interface ScreenAnnotation {
  title: string;
  assumptions: string[];
  userScenario: string;
  pros: string[];
  cons: string[];
  impactIfWrong: string;
}

type AnnotationsData = Record<string, ScreenAnnotation>;

const annotations = annotationsData as AnnotationsData;

function Section({
  title,
  children,
  defaultOpen = true,
  isEmpty = false
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isEmpty?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-sm text-gray-700">{title}</span>
        <div className="flex items-center gap-2">
          {isEmpty && (
            <span className="text-xs text-gray-400 italic">empty</span>
          )}
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 text-sm text-gray-600">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AnnotationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const screenId = getScreenId(location);
  const annotation = annotations[screenId];

  const hasAssumptions = annotation?.assumptions?.length > 0;
  const hasScenario = annotation?.userScenario?.length > 0;
  const hasPros = annotation?.pros?.length > 0;
  const hasCons = annotation?.cons?.length > 0;
  const hasImpact = annotation?.impactIfWrong?.length > 0;
  const hasAnyContent = hasAssumptions || hasScenario || hasPros || hasCons || hasImpact;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 w-12 h-12 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
        style={{
          right: "calc(50% - 187.5px - 60px)",
          top: "20px",
        }}
        title="Screen Annotations"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageSquareText className="w-5 h-5" />
        )}
      </button>

      {/* Annotation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed z-40 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
            style={{
              right: "calc(50% - 187.5px - 380px)",
              top: "20px",
              width: "320px",
              maxHeight: "calc(100vh - 40px)",
            }}
          >
            {/* Header */}
            <div className="bg-violet-600 text-white px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-violet-500 px-2 py-0.5 rounded">
                  {screenId}
                </span>
              </div>
              <h2 className="font-semibold mt-1">{annotation?.title || "Unknown Screen"}</h2>
              <p className="text-xs text-violet-200 mt-0.5">{location}</p>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
              {!hasAnyContent ? (
                <div className="text-center py-8 text-gray-400">
                  <MessageSquareText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No annotations yet</p>
                  <p className="text-xs mt-1">Edit screen-annotations.json to add notes</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <Section title="Assumptions" isEmpty={!hasAssumptions}>
                    {hasAssumptions ? (
                      <ul className="list-disc list-inside space-y-1">
                        {annotation.assumptions.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 italic">No assumptions documented</p>
                    )}
                  </Section>

                  <Section title="User Scenario" isEmpty={!hasScenario}>
                    {hasScenario ? (
                      <p>{annotation.userScenario}</p>
                    ) : (
                      <p className="text-gray-400 italic">No scenario documented</p>
                    )}
                  </Section>

                  <Section title="Pros" isEmpty={!hasPros}>
                    {hasPros ? (
                      <ul className="list-disc list-inside space-y-1">
                        {annotation.pros.map((item, i) => (
                          <li key={i} className="text-green-700">{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 italic">No pros documented</p>
                    )}
                  </Section>

                  <Section title="Cons" isEmpty={!hasCons}>
                    {hasCons ? (
                      <ul className="list-disc list-inside space-y-1">
                        {annotation.cons.map((item, i) => (
                          <li key={i} className="text-red-700">{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 italic">No cons documented</p>
                    )}
                  </Section>

                  <Section title="Impact if Wrong" isEmpty={!hasImpact}>
                    {hasImpact ? (
                      <p className="text-amber-700">{annotation.impactIfWrong}</p>
                    ) : (
                      <p className="text-gray-400 italic">No impact documented</p>
                    )}
                  </Section>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
