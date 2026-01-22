import { useLocation } from "wouter";
import { Link2, ChevronRight, Check } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { useSSOProviders } from "@/hooks/use-sso-providers";

export default function LinkedAccounts() {
  const [, setLocation] = useLocation();
  const { providers } = useSSOProviders();
  const connectedProvider = providers[0];
  const availableProviders = providers.slice(1);

  return (
    <div className="min-h-screen bg-background pb-safe">
      <SubPageHeader title="Linked Accounts" backPath="/profile" />

      <main className="p-5 space-y-8">
        <p className="text-sm text-slate-500 leading-relaxed px-1">
          Connect partner accounts to sign in faster and sync your benefits.
        </p>

        {/* Connected Accounts */}
        {connectedProvider && (
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Connected</h3>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: connectedProvider.backgroundColor,
                      color: connectedProvider.textColor
                    }}
                  >
                    <span className="font-bold text-xs">{connectedProvider.logoInitials}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{connectedProvider.displayName}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Connected January 15, 2026</p>
                  </div>
                </div>
                <button className="text-red-500 text-sm font-medium hover:text-red-600">
                  Unlink
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Available Accounts */}
        {availableProviders.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Available</h3>

            <div className="space-y-3">
              {availableProviders.map((provider) => (
                <div key={provider.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs"
                      style={{
                        backgroundColor: provider.backgroundColor,
                        color: provider.textColor
                      }}
                    >
                      {provider.logoInitials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{provider.displayName}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Connect to your account</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-primary border-primary/20 hover:bg-primary/5">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
