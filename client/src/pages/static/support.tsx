import React from "react";
import { useLocation } from "wouter";
import { Phone, Mail, Clock, HelpCircle, Bug, Send } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function SupportPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Our support team will get back to you shortly.",
    });
    setTimeout(() => setLocation("/profile/support"), 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubPageHeader title="Support" backPath="/profile/support" />
      
      <main className="p-5 space-y-6">
        {/* Contact Card */}
        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
           <h2 className="text-lg font-bold text-primary mb-4">Need help? We're here for you.</h2>
           
           <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary">
                  <Phone size={16} />
                </div>
                <p className="text-sm font-medium text-slate-700">+49 800 123 4567</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary">
                  <Mail size={16} />
                </div>
                <p className="text-sm font-medium text-slate-700">support@medalpha.de</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary">
                  <Clock size={16} />
                </div>
                <p className="text-sm font-medium text-slate-700">Mon - Fri, 8 AM - 6 PM</p>
              </div>
           </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
           <h3 className="font-bold text-slate-900 text-sm px-1">Send us a message</h3>
           
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Subject</label>
             <Select defaultValue="general">
               <SelectTrigger className="w-full bg-white h-12 rounded-xl border-slate-200">
                 <SelectValue placeholder="Select a subject" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="general">General Inquiry</SelectItem>
                 <SelectItem value="appointments">Appointments</SelectItem>
                 <SelectItem value="prescriptions">Prescriptions</SelectItem>
                 <SelectItem value="technical">Technical Issue</SelectItem>
               </SelectContent>
             </Select>
           </div>

           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Message</label>
             <Textarea 
               placeholder="Describe your issue or question..." 
               className="min-h-[120px] bg-white rounded-xl border-slate-200 resize-none p-4"
             />
           </div>

           <Button type="submit" className="w-full h-12 rounded-xl bg-primary text-white flex items-center gap-2">
             <Send size={18} /> Send Message
           </Button>
        </form>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 pt-2">
           <Button variant="outline" className="h-auto py-3 rounded-xl border-slate-200 flex flex-col items-center gap-2" onClick={() => setLocation("/static/faq")}>
             <HelpCircle className="text-slate-400" size={20} />
             <span className="text-xs font-medium text-slate-700">View FAQ</span>
           </Button>
           
           <Button variant="outline" className="h-auto py-3 rounded-xl border-slate-200 flex flex-col items-center gap-2">
             <Bug className="text-slate-400" size={20} />
             <span className="text-xs font-medium text-slate-700">Report a Bug</span>
           </Button>
        </div>
      </main>
    </div>
  );
}
