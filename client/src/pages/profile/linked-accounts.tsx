import { useLocation } from "wouter";
import { Link2, ChevronRight, Check } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function LinkedAccounts() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-safe">
      <SubPageHeader title="Linked Accounts" backPath="/profile" />

      <main className="p-5 space-y-8">
        <p className="text-sm text-slate-500 leading-relaxed px-1">
          Connect partner accounts to sign in faster and sync your benefits.
        </p>

        {/* Connected Accounts */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Connected</h3>
          
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-slate-500 text-xs">dm</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">dm</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Connected January 15, 2026</p>
                </div>
              </div>
              <button className="text-red-500 text-sm font-medium hover:text-red-600">
                Unlink
              </button>
            </div>
          </div>
        </section>

        {/* Available Accounts */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Available</h3>
          
          <div className="space-y-3">
            {/* PAYBACK */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-700 font-bold text-[10px]">
                  PAYBACK
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">PAYBACK</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Earn points on health bookings</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-primary border-primary/20 hover:bg-primary/5">
                Connect
              </Button>
            </div>

            {/* Insurance */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 text-green-700 font-bold text-xs">
                  TK
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">TK - Techniker</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Access digital health card</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-primary border-primary/20 hover:bg-primary/5">
                Connect
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
