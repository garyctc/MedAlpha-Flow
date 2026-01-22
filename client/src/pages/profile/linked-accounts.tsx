import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link2, ChevronRight, Check } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getLinkedAccounts, saveLinkedAccounts, getUserInsurance } from "@/lib/storage";
import { showSuccess } from "@/lib/toast-helpers";
import { useSSOProviders } from "@/hooks/use-sso-providers";
import type { LinkedAccounts as LinkedAccountsType } from "@/types/storage";

export default function LinkedAccounts() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<LinkedAccountsType>({ dm: true, payback: false, insurance: false });
  const { providers } = useSSOProviders();

  const insurance = getUserInsurance();
  const insuranceLabel = insurance?.provider || "TK - Techniker";

  useEffect(() => {
    const timer = setTimeout(() => {
      setAccounts(getLinkedAccounts());
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleAccount = (account: keyof LinkedAccountsType) => {
    const newValue = !accounts[account];
    const updated = { ...accounts, [account]: newValue };
    setAccounts(updated);
    saveLinkedAccounts(updated);

    if (newValue) {
      showSuccess(`${account === 'dm' ? 'dm' : account === 'payback' ? 'PAYBACK' : insuranceLabel} connected`);
    } else {
      showSuccess(`${account === 'dm' ? 'dm' : account === 'payback' ? 'PAYBACK' : insuranceLabel} unlinked`);
    }
  };

  const connectedAccounts = [
    accounts.dm && { key: 'dm', name: 'dm', icon: 'dm', bgColor: 'bg-slate-100', textColor: 'text-slate-500' },
    accounts.payback && { key: 'payback', name: 'PAYBACK', icon: 'PAYBACK', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    accounts.insurance && { key: 'insurance', name: insuranceLabel, icon: 'TK', bgColor: 'bg-green-50', textColor: 'text-green-700' },
  ].filter(Boolean) as { key: string; name: string; icon: string; bgColor: string; textColor: string }[];

  const availableAccounts = [
    !accounts.dm && { key: 'dm', name: 'dm', desc: 'Sign in with your dm account', icon: 'dm', bgColor: 'bg-slate-100', textColor: 'text-slate-500' },
    !accounts.payback && { key: 'payback', name: 'PAYBACK', desc: 'Earn points on health bookings', icon: 'PAYBACK', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    !accounts.insurance && { key: 'insurance', name: insuranceLabel, desc: 'Access digital health card', icon: 'TK', bgColor: 'bg-green-50', textColor: 'text-green-700' },
  ].filter(Boolean) as { key: string; name: string; desc: string; icon: string; bgColor: string; textColor: string }[];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-safe">
        <SubPageHeader title="Linked Accounts" backPath="/profile" />
        <main className="p-5 space-y-8">
          <Skeleton className="h-4 w-64" />
          <section className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-safe">
      <SubPageHeader title="Linked Accounts" backPath="/profile" />

      <main className="p-5 space-y-8">
        <p className="text-sm text-slate-500 leading-relaxed px-1">
          Connect partner accounts to sign in faster and sync your benefits.
        </p>

        {/* Connected Accounts */}
        {connectedAccounts.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Connected</h3>

            <div className="space-y-3">
              {connectedAccounts.map((account) => (
                <div key={account.key} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 ${account.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className={`font-bold ${account.textColor} text-xs`}>{account.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{account.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Connected January 15, 2026</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleAccount(account.key as keyof LinkedAccountsType)}
                      className="text-red-500 text-sm font-medium hover:text-red-600"
                    >
                      Unlink
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Available Accounts */}
        {availableAccounts.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Available</h3>

            <div className="space-y-3">
              {availableAccounts.map((account) => (
                <div key={account.key} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 ${account.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 ${account.textColor} font-bold text-[10px]`}>
                      {account.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{account.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{account.desc}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-primary border-primary/20 hover:bg-primary/5"
                    onClick={() => handleToggleAccount(account.key as keyof LinkedAccountsType)}
                  >
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
