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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search questions..." 
            className="pl-10 h-12 bg-white border-slate-200 rounded-xl focus:bg-white transition-all" 
          />
        </div>

        {/* FAQ Content */}
        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-bold text-slate-900 mb-3 px-1">Appointments</h3>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="bg-white px-4 py-3 rounded-xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-slate-900 data-[state=open]:rounded-b-none data-[state=open]:border-b-0">
                  How do I book an appointment?
                </AccordionTrigger>
                <AccordionContent className="bg-slate-50 px-4 py-3 rounded-b-xl border border-t-0 border-border text-slate-600 text-sm leading-relaxed">
                  To book an appointment, go to the Home screen and tap "Book Appointment". Select whether you want an in-person visit or video consultation, choose your specialty, and pick a time slot that works for you.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b-0">
                <AccordionTrigger className="bg-white px-4 py-3 rounded-xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-slate-900 data-[state=open]:rounded-b-none data-[state=open]:border-b-0">
                  Can I cancel or reschedule?
                </AccordionTrigger>
                <AccordionContent className="bg-slate-50 px-4 py-3 rounded-b-xl border border-t-0 border-border text-slate-600 text-sm leading-relaxed">
                  Yes, you can cancel or reschedule appointments up to 24 hours in advance. Go to the "History" tab, find your upcoming appointment, and tap to view options for cancellation or rescheduling.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b-0">
                <AccordionTrigger className="bg-white px-4 py-3 rounded-xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-slate-900 data-[state=open]:rounded-b-none data-[state=open]:border-b-0">
                  What if I'm late?
                </AccordionTrigger>
                <AccordionContent className="bg-slate-50 px-4 py-3 rounded-b-xl border border-t-0 border-border text-slate-600 text-sm leading-relaxed">
                  If you're running late, please contact the clinic directly. For video consultations, try to join at least 5 minutes early to test your connection. Appointments may be cancelled if you are more than 10 minutes late.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section>
            <h3 className="text-sm font-bold text-slate-900 mb-3 px-1">Prescriptions</h3>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-4" className="border-b-0">
                <AccordionTrigger className="bg-white px-4 py-3 rounded-xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-slate-900 data-[state=open]:rounded-b-none data-[state=open]:border-b-0">
                  How does e-prescription work?
                </AccordionTrigger>
                <AccordionContent className="bg-slate-50 px-4 py-3 rounded-b-xl border border-t-0 border-border text-slate-600 text-sm leading-relaxed">
                  Your doctor will issue a digital prescription (E-Rezept) directly to your app. You can then choose to redeem it at a local pharmacy using the QR code or have it delivered to your home via our online pharmacy partners.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b-0">
                <AccordionTrigger className="bg-white px-4 py-3 rounded-xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-slate-900 data-[state=open]:rounded-b-none data-[state=open]:border-b-0">
                  Do I need my health card?
                </AccordionTrigger>
                <AccordionContent className="bg-slate-50 px-4 py-3 rounded-b-xl border border-t-0 border-border text-slate-600 text-sm leading-relaxed">
                  For in-person visits, you should always bring your Gesundheitskarte. For video consultations and redeeming e-prescriptions through the app, your verified digital identity is sufficient.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b-0">
                <AccordionTrigger className="bg-white px-4 py-3 rounded-xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-slate-900 data-[state=open]:rounded-b-none data-[state=open]:border-b-0">
                  How long does delivery take?
                </AccordionTrigger>
                <AccordionContent className="bg-slate-50 px-4 py-3 rounded-b-xl border border-t-0 border-border text-slate-600 text-sm leading-relaxed">
                  Standard delivery usually takes 1-2 business days. Same-day delivery may be available in select urban areas if ordered before 2 PM.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section>
            <h3 className="text-sm font-bold text-slate-900 mb-3 px-1">Video Consultations</h3>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-7" className="border-b-0">
                <AccordionTrigger className="bg-white px-4 py-3 rounded-xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-slate-900 data-[state=open]:rounded-b-none data-[state=open]:border-b-0">
                  What do I need for a video call?
                </AccordionTrigger>
                <AccordionContent className="bg-slate-50 px-4 py-3 rounded-b-xl border border-t-0 border-border text-slate-600 text-sm leading-relaxed">
                  You need a stable internet connection, a device with a camera and microphone (smartphone, tablet, or computer), and a quiet private space for your consultation.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8" className="border-b-0">
                <AccordionTrigger className="bg-white px-4 py-3 rounded-xl border border-border hover:no-underline hover:border-primary/30 transition-all text-sm font-medium text-slate-900 data-[state=open]:rounded-b-none data-[state=open]:border-b-0">
                  Is it covered by insurance?
                </AccordionTrigger>
                <AccordionContent className="bg-slate-50 px-4 py-3 rounded-b-xl border border-t-0 border-border text-slate-600 text-sm leading-relaxed">
                  Yes, most statutory and private health insurance providers in Germany cover video consultations for many common medical issues, just like a regular doctor's visit.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        {/* Support Link */}
        <div className="pt-4 text-center">
           <p className="text-sm text-slate-500 mb-2">Can't find what you're looking for?</p>
           <Link href="/static/support">
             <Button variant="link" className="text-primary h-auto p-0 font-bold">Contact Support</Button>
           </Link>
        </div>
      </main>
    </div>
  );
}
