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

      {/* Placeholders */}
      <Route path="/appointments" component={() => <Placeholder title="Appointments" />} />
      <Route path="/history" component={() => <Placeholder title="History" />} />
      <Route path="/profile" component={() => <Placeholder title="Profile" />} />
      
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
