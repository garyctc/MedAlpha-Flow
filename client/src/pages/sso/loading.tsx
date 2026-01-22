import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAuthState, saveLinkedAccounts } from "@/lib/storage";

export default function SSOLoading() {
  const [, setLocation] = useLocation();
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // Save partial auth state (not fully logged in until profile complete)
      saveAuthState({ isLoggedIn: false, userId: "sso-user" });
      // Mark dm as linked since user came from SSO
      saveLinkedAccounts({ dm: true });
      // For prototype, we simulate success and go to complete profile
      setLocation("/sso/complete-profile");
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="text-red-600" size={24} />
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Connection failed</h1>
        <p className="text-slate-500 mb-8">Unable to connect with dm. Please try again.</p>
        
        <div className="w-full space-y-3 max-w-xs">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
          <button 
            className="w-full text-slate-500 font-medium text-sm p-2"
            onClick={() => setLocation("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      {/* Partner Logo Placeholder */}
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <span className="font-bold text-slate-400">dm</span>
      </div>
      
      <p className="text-slate-500 font-medium mb-8">Connecting with dm...</p>
      
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );
}
