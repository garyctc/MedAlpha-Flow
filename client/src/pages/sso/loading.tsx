import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAuthState, saveLinkedAccounts } from "@/lib/storage";
import { useSSOProviders } from "@/hooks/use-sso-providers";

export default function SSOLoading() {
  const [, setLocation] = useLocation();
  const [error, setError] = useState(false);
  const { providers, getSSOProvider } = useSSOProviders();

  // Extract provider ID from URL query string
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const providerId = searchParams.get('provider') || providers[0]?.id;
  const provider = getSSOProvider(providerId || '');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // Save partial auth state (not fully logged in until profile complete)
      saveAuthState({ isLoggedIn: false, userId: "sso-user" });
      // Mark dm as linked since user came from SSO
      saveLinkedAccounts({ dm: true });
      // For prototype, we simulate success and go to complete profile
      setLocation(`/sso/complete-profile?provider=${providerId}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLocation, providerId]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="text-destructive" size={24} />
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-2">Connection failed</h1>
        <p className="text-muted-foreground mb-8">Unable to connect with {provider?.displayName || 'partner'}. Please try again.</p>

        <div className="w-full space-y-3 max-w-xs">
          <Button
            className="w-full h-12"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
          <button
            className="w-full text-muted-foreground font-medium text-sm p-2"
            onClick={() => setLocation("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      {/* Partner Logo Placeholder */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{
          backgroundColor: provider?.backgroundColor,
          color: provider?.textColor
        }}
      >
        <span className="font-bold text-sm">{provider?.logoInitials}</span>
      </div>

      <p className="text-muted-foreground font-medium mb-8">Connecting with {provider?.displayName || 'partner'}...</p>

      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );
}
