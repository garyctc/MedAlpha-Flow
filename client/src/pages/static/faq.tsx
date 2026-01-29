import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ChevronDown, MessageCircle } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="FAQ" backPath="/profile/support" />
      
      <main className="p-5 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search questions..."
            className="pl-10 h-12 bg-card border-border rounded-3xl focus:bg-card transition-all shadow-[var(--shadow-card)]"
          />
        </div>

        {/* FAQ Content */}
        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Appointments</h3>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="bg-card px-4 py-3 rounded-3xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-foreground data-[state=open]:rounded-b-none data-[state=open]:border-b-0 shadow-[var(--shadow-card)]">
                  How do I book an appointment?
                </AccordionTrigger>
                <AccordionContent className="bg-muted px-4 py-3 rounded-b-3xl border border-t-0 border-border text-muted-foreground text-sm leading-relaxed">
                  To book an appointment, go to the Home screen and tap "Book Appointment". Choose your specialty and pick a time slot that works for you.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b-0">
                <AccordionTrigger className="bg-card px-4 py-3 rounded-3xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-foreground data-[state=open]:rounded-b-none data-[state=open]:border-b-0 shadow-[var(--shadow-card)]">
                  Can I cancel or reschedule?
                </AccordionTrigger>
                <AccordionContent className="bg-muted px-4 py-3 rounded-b-3xl border border-t-0 border-border text-muted-foreground text-sm leading-relaxed">
                  Yes, you can cancel or reschedule appointments up to 24 hours in advance. Go to the "History" tab, find your upcoming appointment, and tap to view options for cancellation or rescheduling.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b-0">
                <AccordionTrigger className="bg-card px-4 py-3 rounded-3xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-foreground data-[state=open]:rounded-b-none data-[state=open]:border-b-0 shadow-[var(--shadow-card)]">
                  What if I'm late?
                </AccordionTrigger>
                <AccordionContent className="bg-muted px-4 py-3 rounded-b-3xl border border-t-0 border-border text-muted-foreground text-sm leading-relaxed">
                  If you're running late, please contact the clinic directly. Appointments may be cancelled if you are more than 10 minutes late.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Prescriptions</h3>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-4" className="border-b-0">
                <AccordionTrigger className="bg-card px-4 py-3 rounded-3xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-foreground data-[state=open]:rounded-b-none data-[state=open]:border-b-0 shadow-[var(--shadow-card)]">
                  How does e-prescription work?
                </AccordionTrigger>
                <AccordionContent className="bg-muted px-4 py-3 rounded-b-3xl border border-t-0 border-border text-muted-foreground text-sm leading-relaxed">
                  Your doctor will issue a digital prescription (E-Rezept) directly to your app. You can then choose to redeem it at a local pharmacy using the QR code or have it delivered to your home via our online pharmacy partners.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b-0">
                <AccordionTrigger className="bg-card px-4 py-3 rounded-3xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-foreground data-[state=open]:rounded-b-none data-[state=open]:border-b-0 shadow-[var(--shadow-card)]">
                  Do I need my health card?
                </AccordionTrigger>
                <AccordionContent className="bg-muted px-4 py-3 rounded-b-3xl border border-t-0 border-border text-muted-foreground text-sm leading-relaxed">
                  For in-person visits, you should always bring your Gesundheitskarte. For redeeming e-prescriptions through the app, your verified digital identity is sufficient.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b-0">
                <AccordionTrigger className="bg-card px-4 py-3 rounded-3xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-foreground data-[state=open]:rounded-b-none data-[state=open]:border-b-0 shadow-[var(--shadow-card)]">
                  How long does delivery take?
                </AccordionTrigger>
                <AccordionContent className="bg-muted px-4 py-3 rounded-b-3xl border border-t-0 border-border text-muted-foreground text-sm leading-relaxed">
                  Standard delivery usually takes 1-2 business days. Same-day delivery may be available in select urban areas if ordered before 2 PM.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

        </div>

        {/* Support Link */}
        <div className="pt-4 text-center">
           <p className="text-sm text-muted-foreground mb-2">Can't find what you're looking for?</p>
           <Link href="/static/support">
             <Button variant="link" className="text-primary h-auto p-0 font-semibold">Contact Support</Button>
           </Link>
        </div>
      </main>
    </div>
  );
}
