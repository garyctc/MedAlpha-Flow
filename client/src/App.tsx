import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import BottomNav from "@/components/layout/BottomNav";

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

// Prescription Flow
import PrescriptionType from "@/pages/prescriptions/type";
import PrescriptionRedeem from "@/pages/prescriptions/redeem";
import NfcIntro from "@/pages/prescriptions/nfc-intro";
import NfcScan from "@/pages/prescriptions/nfc-scan";
import PrescriptionList from "@/pages/prescriptions/list";
import PrescriptionDetail from "@/pages/prescriptions/detail";
import PharmacyConfirm from "@/pages/prescriptions/pharmacy";
import OrderReview from "@/pages/prescriptions/review";
import OrderSuccess from "@/pages/prescriptions/success";

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

// Pharmacy Search Flow
import PharmacyMap from "@/pages/pharmacy/map";
import PharmacyList from "@/pages/pharmacy/list";
import PharmacyDetail from "@/pages/pharmacy/detail";

// History Flow
import HistoryPage from "@/pages/history/index";
import AppointmentDetail from "@/pages/history/appointment-detail";
import HistoryPrescriptionDetail from "@/pages/history/prescription-detail";
import ConsultationDetail from "@/pages/history/consultation-detail";

// Profile Flow
import ProfilePage from "@/pages/profile/index";
import HelpSupport from "@/pages/profile/support";
import PrivacyLegal from "@/pages/profile/legal";

// Static Pages
import FAQPage from "@/pages/static/faq";
import SupportPage from "@/pages/static/support";
import PrivacyPolicy from "@/pages/static/privacy";
import LegalDisclosure from "@/pages/static/legal";


import Placeholder from "@/pages/placeholder";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      
      {/* Booking Routes */}
      <Route path="/booking" component={BookingType} />
      <Route path="/booking/type" component={BookingType} />
      <Route path="/booking/specialty" component={SpecialtySelect} />
      <Route path="/booking/location" component={LocationSelect} />
      <Route path="/booking/doctors" component={DoctorSelect} />
      <Route path="/booking/calendar" component={BookingCalendar} />
      <Route path="/booking/review" component={BookingReview} />
      <Route path="/booking/success" component={BookingSuccess} />

      {/* Prescription Routes */}
      <Route path="/prescriptions" component={PrescriptionType} />
      <Route path="/prescriptions/type" component={PrescriptionType} />
      <Route path="/prescriptions/redeem" component={PrescriptionRedeem} />
      <Route path="/prescriptions/nfc-intro" component={NfcIntro} />
      <Route path="/prescriptions/nfc-scan" component={NfcScan} />
      <Route path="/prescriptions/list" component={PrescriptionList} />
      <Route path="/prescriptions/detail" component={PrescriptionDetail} />
      <Route path="/prescriptions/pharmacy" component={PharmacyConfirm} />
      <Route path="/prescriptions/review" component={OrderReview} />
      <Route path="/prescriptions/success" component={OrderSuccess} />

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

      {/* Pharmacy Search Routes */}
      <Route path="/pharmacy/map" component={PharmacyMap} />
      <Route path="/pharmacy/list" component={PharmacyList} />
      <Route path="/pharmacy/detail" component={PharmacyDetail} />

      {/* History Routes */}
      <Route path="/history" component={HistoryPage} />
      <Route path="/history/appointment/:id" component={AppointmentDetail} />
      <Route path="/history/prescription/:id" component={HistoryPrescriptionDetail} />
      <Route path="/history/consultation/:id" component={ConsultationDetail} />

      {/* Profile Routes */}
      <Route path="/profile" component={ProfilePage} />
      <Route path="/profile/support" component={HelpSupport} />
      <Route path="/profile/legal" component={PrivacyLegal} />

      {/* Static Routes */}
      <Route path="/static/faq" component={FAQPage} />
      <Route path="/static/support" component={SupportPage} />
      <Route path="/static/privacy" component={PrivacyPolicy} />
      <Route path="/static/legal" component={LegalDisclosure} />

      {/* Placeholders */}
      <Route path="/appointments" component={() => <Placeholder title="Appointments" />} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen font-sans bg-background text-foreground antialiased selection:bg-primary/20">
          <AppRoutes />
          <BottomNav />
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
