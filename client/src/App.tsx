import { Switch, Route } from "wouter";
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
import PrescriptionRedeem from "@/pages/prescriptions/redeem";

function Router() {
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
      <Route path="/prescriptions" component={PrescriptionRedeem} />
      <Route path="/prescriptions/redeem" component={PrescriptionRedeem} />

      {/* Placeholders */}
      <Route path="/appointments" component={Home} />
      <Route path="/history" component={Home} />
      <Route path="/profile" component={Home} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen font-sans bg-background text-foreground antialiased selection:bg-primary/20">
        <Router />
        <BottomNav />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
