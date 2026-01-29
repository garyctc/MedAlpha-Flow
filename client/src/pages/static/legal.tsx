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
        <section className="bg-card p-5 rounded-3xl border border-border shadow-[var(--shadow-card)] text-center">
           <h2 className="text-xl font-semibold text-foreground font-display mb-2">{branding.companyName}</h2>
           <p className="text-muted-foreground text-sm">Musterstraße 123</p>
           <p className="text-muted-foreground text-sm">10115 Berlin, Germany</p>
        </section>

        {/* Registration */}
        <section className="space-y-4">
           <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Registration</h3>
           <div className="bg-card p-5 rounded-3xl border border-border shadow-[var(--shadow-card)] space-y-3">
              <div className="flex justify-between items-start text-sm">
                 <span className="text-muted-foreground">Commercial Register</span>
                 <span className="font-medium text-foreground text-right">Amtsgericht Berlin</span>
              </div>
              <div className="h-px bg-muted w-full"></div>
              <div className="flex justify-between items-start text-sm">
                 <span className="text-muted-foreground">Registration Number</span>
                 <span className="font-medium text-foreground text-right">HRB 123456</span>
              </div>
              <div className="h-px bg-muted w-full"></div>
              <div className="flex justify-between items-start text-sm">
                 <span className="text-muted-foreground">VAT ID</span>
                 <span className="font-medium text-foreground text-right">DE123456789</span>
              </div>
           </div>
        </section>

        {/* Management */}
        <section className="space-y-4">
           <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Management</h3>
           <div className="bg-card p-5 rounded-3xl border border-border shadow-[var(--shadow-card)]">
              <p className="text-sm font-medium text-foreground mb-1">Managing Directors:</p>
              <p className="text-sm text-muted-foreground">Dr. Max Mustermann, Sarah Musterfrau</p>
           </div>
        </section>

        {/* Contact */}
        <section className="space-y-4">
           <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Contact</h3>
           <div className="bg-card p-5 rounded-3xl border border-border shadow-[var(--shadow-card)] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail size={16} className="text-primary" />
                </div>
                <a href={`mailto:${branding.supportEmail}`} className="text-sm font-medium text-primary hover:underline">{branding.supportEmail}</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone size={16} className="text-primary" />
                </div>
                <a href="tel:+49301234567" className="text-sm font-medium text-foreground">+49 30 1234567</a>
              </div>
           </div>
        </section>

        {/* Regulatory Info */}
        <section className="bg-primary/5 p-4 rounded-3xl border border-primary/10 flex gap-3 items-start">
           <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
             <Scale className="text-primary" size={16} />
           </div>
           <p className="text-xs text-muted-foreground leading-relaxed">
             {branding.companyName} operates under the regulations for digital healthcare applications (DiGA) and complies with the German Medical Devices Act (MPG).
           </p>
        </section>

      </main>
    </div>
  );
}
