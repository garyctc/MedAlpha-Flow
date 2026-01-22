import { useEffect } from "react";
import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import BottomNav from "@/components/layout/BottomNav";
import AnnotationPanel from "@/components/annotations/AnnotationPanel";
import { seedDemoData } from "@/lib/storage";

import Splash from "@/pages/splash";
import Login from "@/pages/login";
import Home from "@/pages/home";

// Booking Flow
import BookingType from "@/pages/booking/type";
import SpecialtySelect from "@/pages/booking/specialty";
import LocationSelect from "@/pages/booking/location";
import DoctorSelect from "@/pages/booking/doctors";
import BookingCalendar from "@/pages/booking/calendar";
import BookingReview from "@/pages/booking/review";
import BookingSuccess from "@/pages/booking/success";

// Smart Match Integration
import SmartMatchProcessing from "@/pages/booking/smart-match-processing";
import SmartMatchRefinement from "@/pages/booking/smart-match-refinement";
import SmartMatchSuccess from "@/pages/booking/smart-match-success";

// Prescription Flow
import PrescriptionType from "@/pages/prescriptions/type";
import PrescriptionRedeemStart from "@/pages/prescriptions/redeem-start";
import PrescriptionRedeem from "@/pages/prescriptions/redeem";
import NfcIntro from "@/pages/prescriptions/nfc-intro";
import NfcScan from "@/pages/prescriptions/nfc-scan";
import GkvSmsVerify from "@/pages/prescriptions/gkv-sms-verify";
import PkvAuth from "@/pages/prescriptions/pkv-auth";
import PkvInsurerSelect from "@/pages/prescriptions/pkv-insurer-select";
import PkvRedirect from "@/pages/prescriptions/pkv-redirect";
import PkvError from "@/pages/prescriptions/pkv-error";
import PrescriptionList from "@/pages/prescriptions/list";
import PrescriptionDetail from "@/pages/prescriptions/detail";
import PharmacyConfirm from "@/pages/prescriptions/pharmacy";
import OrderReview from "@/pages/prescriptions/review";
import OrderSuccess from "@/pages/prescriptions/success";
import PrescriptionReceipt from "@/pages/prescriptions/receipt";

// Telehealth Flow
import ScheduleType from "@/pages/telehealth/schedule-type";
import SymptomsIntro from "@/pages/telehealth/symptoms-intro";
import SymptomsDetails from "@/pages/telehealth/symptoms-details";
import SymptomsInfo from "@/pages/telehealth/symptoms-info";
import TelehealthReview from "@/pages/telehealth/review";
import TelehealthConfirmation from "@/pages/telehealth/confirmation";
import WaitingRoom from "@/pages/telehealth/waiting-room";
import TelehealthCall from "@/pages/telehealth/call";
import TelehealthSummary from "@/pages/telehealth/summary";

// Teleclinic Integration
import TeleclinicSimulated from "@/pages/teleclinic/simulated";

// Pharmacy Search Flow
import PharmacyMap from "@/pages/pharmacy/map";
import PharmacyList from "@/pages/pharmacy/list";
import PharmacyDetail from "@/pages/pharmacy/detail";

// History Flow
import HistoryPage from "@/pages/history/index";
// import AppointmentDetail from "@/pages/history/appointment-detail";
// import HistoryPrescriptionDetail from "@/pages/history/prescription-detail";
// import ConsultationDetail from "@/pages/history/consultation-detail";

// Profile Flow
import ProfilePage from "@/pages/profile/index";
import EditProfile from "@/pages/profile/edit";
import LinkedAccounts from "@/pages/profile/linked-accounts";
import InsuranceInfoGKV from "@/pages/profile/insurance-gkv";
import InsuranceInfoPKV from "@/pages/profile/insurance-pkv";

// SSO Flow
import SSOLoading from "@/pages/sso/loading";
import CompleteProfile from "@/pages/sso/complete-profile";
import LanguageSelection from "@/pages/profile/language";
import HelpSupport from "@/pages/profile/support";
import PrivacyLegal from "@/pages/profile/legal";

// Static Pages
import FAQPage from "@/pages/static/faq";
import SupportPage from "@/pages/static/support";
import PrivacyPolicy from "@/pages/static/privacy";
import LegalDisclosure from "@/pages/static/legal";

// Appointments Flow
import AppointmentsPage from "@/pages/appointments/index";
import FutureAppointmentDetail from "@/pages/appointments/detail";

// Registration Flow
import RegisterAccount from "@/pages/register/account";
import RegisterVerifyEmail from "@/pages/register/verify-email";
import RegisterPersonal from "@/pages/register/personal-info";
import RegisterInsuranceType from "@/pages/register/insurance-type";
import RegisterGKVDetails from "@/pages/register/gkv-details";
import RegisterPKVDetails from "@/pages/register/pkv-details";
import RegisterComplete from "@/pages/register/complete";


import Placeholder from "@/pages/placeholder";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />

      {/* Registration Routes */}
      <Route path="/register" component={RegisterAccount} />
      <Route path="/register/verify" component={RegisterVerifyEmail} />
      <Route path="/register/personal" component={RegisterPersonal} />
      <Route path="/register/insurance" component={RegisterInsuranceType} />
      <Route path="/register/gkv-details" component={RegisterGKVDetails} />
      <Route path="/register/pkv-details" component={RegisterPKVDetails} />
      <Route path="/register/complete" component={RegisterComplete} />
      
      {/* Booking Routes */}
      <Route path="/booking" component={BookingType} />
      <Route path="/booking/type" component={BookingType} />
      <Route path="/booking/specialty" component={SpecialtySelect} />
      <Route path="/booking/location" component={LocationSelect} />
      <Route path="/booking/doctors" component={DoctorSelect} />
      <Route path="/booking/calendar" component={BookingCalendar} />
      <Route path="/booking/review" component={BookingReview} />
      <Route path="/booking/success" component={BookingSuccess} />

      {/* Smart Match Integration */}
      <Route path="/booking/smart-match-processing" component={SmartMatchProcessing} />
      <Route path="/booking/smart-match-refinement" component={SmartMatchRefinement} />
      <Route path="/booking/smart-match-success" component={SmartMatchSuccess} />

      {/* Prescription Routes */}
      <Route path="/prescriptions" component={PrescriptionType} />
      <Route path="/prescriptions/type" component={PrescriptionType} />
      <Route path="/prescriptions/redeem" component={PrescriptionRedeem} />
      
      {/* GKV Flow */}
      <Route path="/prescriptions/nfc-intro" component={NfcIntro} />
      <Route path="/prescriptions/nfc-scan" component={NfcScan} />
      <Route path="/prescriptions/gkv-sms-verify" component={GkvSmsVerify} />
      
      {/* PKV Flow */}
      <Route path="/prescriptions/pkv-auth" component={PkvAuth} />
      <Route path="/prescriptions/pkv-insurer-select" component={PkvInsurerSelect} />
      <Route path="/prescriptions/pkv-redirect" component={PkvRedirect} />
      <Route path="/prescriptions/pkv-error" component={PkvError} />
      
      {/* Shared Flow */}
      <Route path="/prescriptions/redeem-start" component={PrescriptionRedeemStart} />
      <Route path="/prescriptions/list" component={PrescriptionList} />
      <Route path="/prescriptions/detail" component={PrescriptionDetail} />
      <Route path="/prescriptions/pharmacy" component={PharmacyConfirm} />
      <Route path="/prescriptions/review" component={OrderReview} />
      <Route path="/prescriptions/success" component={OrderSuccess} />
      <Route path="/prescriptions/receipt" component={PrescriptionReceipt} />

      {/* Telehealth Routes */}
      <Route path="/telehealth/schedule-type" component={ScheduleType} />
      <Route path="/telehealth/symptoms-intro" component={SymptomsIntro} />
      <Route path="/telehealth/symptoms-details" component={SymptomsDetails} />
      <Route path="/telehealth/symptoms-info" component={SymptomsInfo} />
      <Route path="/telehealth/review" component={TelehealthReview} />
      <Route path="/telehealth/confirmation" component={TelehealthConfirmation} />
      <Route path="/telehealth/waiting-room" component={WaitingRoom} />
      <Route path="/telehealth/call" component={TelehealthCall} />
      <Route path="/telehealth/summary" component={TelehealthSummary} />

      {/* Teleclinic Integration */}
      <Route path="/teleclinic/simulated" component={TeleclinicSimulated} />

      {/* Pharmacy Search Routes */}
      <Route path="/pharmacy/map" component={PharmacyMap} />
      <Route path="/pharmacy/list" component={PharmacyList} />
      <Route path="/pharmacy/detail" component={PharmacyDetail} />

      {/* History Routes */}
      <Route path="/history" component={HistoryPage} />

      {/* Profile Routes */}
      <Route path="/profile" component={ProfilePage} />
      <Route path="/profile/edit" component={EditProfile} />
      <Route path="/profile/linked-accounts" component={LinkedAccounts} />
      <Route path="/profile/insurance-gkv" component={InsuranceInfoGKV} />

      {/* SSO Routes */}
      <Route path="/sso/loading" component={SSOLoading} />
      <Route path="/sso/complete-profile" component={CompleteProfile} />
      <Route path="/profile/insurance-pkv" component={InsuranceInfoPKV} />
      <Route path="/profile/language" component={LanguageSelection} />
      <Route path="/profile/support" component={HelpSupport} />
      <Route path="/profile/legal" component={PrivacyLegal} />

      {/* Static Routes */}
      <Route path="/static/faq" component={FAQPage} />
      <Route path="/static/support" component={SupportPage} />
      <Route path="/static/privacy" component={PrivacyPolicy} />
      <Route path="/static/legal" component={LegalDisclosure} />

      {/* Appointment Routes */}
      <Route path="/appointments" component={AppointmentsPage} />
      <Route path="/appointments/:id" component={FutureAppointmentDetail} />

      {/* Placeholders */}
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Seed demo data on first load
  useEffect(() => {
    seedDemoData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen font-sans bg-background text-foreground antialiased selection:bg-primary/20 flex items-start justify-center">
          <div className="w-full max-w-[375px] relative">
            <AppRoutes />
            <BottomNav />
            <Toaster />
          </div>
          <AnnotationPanel />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
