import { useLocation } from "wouter";
import { FileText, Download, Share2, Mail } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";

export default function PrescriptionReceipt() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Reimbursement Receipt" backPath="/history" />
      
      <main className="p-5 space-y-6">
        <div className="bg-white rounded-2xl border border-border p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Order #MED-2026-0119</p>
              <h3 className="font-bold text-slate-900">Metformin 500mg</h3>
              <p className="text-sm text-slate-500">January 19, 2026</p>
            </div>
            <span className="font-bold text-slate-900">€24.95</span>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-4 border border-purple-100 mb-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-purple-600 border border-purple-100">
              <FileText size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 truncate">Kostenbeleg_MED-2026-0119.pdf</p>
              <p className="text-xs text-slate-500">124 KB</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 gap-2">
            <Download size={18} /> Download PDF
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 text-slate-700 gap-2">
            <Share2 size={18} /> Send to PKV App
          </Button>
          <Button variant="ghost" className="w-full h-12 rounded-xl text-slate-500 gap-2">
            <Mail size={18} /> Email to Myself
          </Button>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
          <p className="font-bold mb-1">Next Steps:</p>
          <p>Submit this document to your insurer for reimbursement. Keep a copy for your records.</p>
        </div>
      </main>
    </div>
  );
}
