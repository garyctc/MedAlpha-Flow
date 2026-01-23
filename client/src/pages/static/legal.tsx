import { useLocation } from "wouter";
import { Mail, Phone, MapPin, Scale } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { branding } from "@/config/branding";

export default function LegalDisclosure() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Legal Disclosure" backPath="/profile/legal" />
      
      <main className="p-5 space-y-8">
        
        {/* Company Info */}
        <section className="bg-white p-5 rounded-2xl border border-border text-center">
           <h2 className="text-xl font-bold text-slate-900 font-display mb-2">{branding.companyName}</h2>
           <p className="text-slate-600 text-sm">Musterstraße 123</p>
           <p className="text-slate-600 text-sm">10115 Berlin, Germany</p>
        </section>

        {/* Registration */}
        <section className="space-y-4">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Registration</h3>
           <div className="bg-white p-5 rounded-2xl border border-border space-y-3">
              <div className="flex justify-between items-start text-sm">
                 <span className="text-slate-500">Commercial Register</span>
                 <span className="font-medium text-slate-900 text-right">Amtsgericht Berlin</span>
              </div>
              <div className="h-px bg-slate-50 w-full"></div>
              <div className="flex justify-between items-start text-sm">
                 <span className="text-slate-500">Registration Number</span>
                 <span className="font-medium text-slate-900 text-right">HRB 123456</span>
              </div>
              <div className="h-px bg-slate-50 w-full"></div>
              <div className="flex justify-between items-start text-sm">
                 <span className="text-slate-500">VAT ID</span>
                 <span className="font-medium text-slate-900 text-right">DE123456789</span>
              </div>
           </div>
        </section>

        {/* Management */}
        <section className="space-y-4">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Management</h3>
           <div className="bg-white p-5 rounded-2xl border border-border">
              <p className="text-sm font-medium text-slate-900 mb-1">Managing Directors:</p>
              <p className="text-sm text-slate-600">Dr. Max Mustermann, Sarah Musterfrau</p>
           </div>
        </section>

        {/* Contact */}
        <section className="space-y-4">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Contact</h3>
           <div className="bg-white p-5 rounded-2xl border border-border space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-slate-400" />
                <a href={`mailto:${branding.supportEmail}`} className="text-sm font-medium text-primary hover:underline">{branding.supportEmail}</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-slate-400" />
                <a href="tel:+49301234567" className="text-sm font-medium text-slate-900">+49 30 1234567</a>
              </div>
           </div>
        </section>

        {/* Regulatory Info */}
        <section className="bg-slate-50 p-4 rounded-xl border border-border flex gap-3 items-start">
           <Scale className="text-slate-400 shrink-0 mt-0.5" size={20} />
           <p className="text-xs text-slate-500 leading-relaxed">
             {branding.companyName} operates under the regulations for digital healthcare applications (DiGA) and complies with the German Medical Devices Act (MPG).
           </p>
        </section>

      </main>
    </div>
  );
}
