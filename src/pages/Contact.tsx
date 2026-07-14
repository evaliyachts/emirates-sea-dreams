import { FormEvent, useRef, useState } from "react";
import { Clipboard, MessageCircle, Phone, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { buildBreadcrumbSchema } from "@/lib/entity-schema";
import { getPhoneLink, getWhatsAppLink, PHONE_NUMBER } from "@/lib/constants";
import { openPreparedWhatsApp, prepareYachtEnquiry, type YachtEnquiryFields } from "@/lib/contact-request";
import { getApprovedValue, siteFacts } from "@/config/site-facts";

const EMPTY_FORM: YachtEnquiryFields = { date: "", time: "", duration: "", guests: "", yacht: "", occasion: "", note: "" };
const PREPARED_CONFIRMATION = "Your enquiry has been prepared in WhatsApp. It is not sent until you press Send in WhatsApp, and it is not a confirmed booking.";

const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [prepared, setPrepared] = useState<{ message: string; url: string } | null>(null);
  const [status, setStatus] = useState("");
  const [blocked, setBlocked] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const departure = getApprovedValue(siteFacts.departureLocation);

  const update = (field: keyof YachtEnquiryFields, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const focusStatus = () => window.setTimeout(() => statusRef.current?.focus(), 0);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = prepareYachtEnquiry(form);
    setPrepared(next);
    const opened = openPreparedWhatsApp(next.url);
    setBlocked(!opened);
    setStatus(opened ? PREPARED_CONFIRMATION : "WhatsApp could not open automatically. Nothing has been sent. Use the prepared link or copy the message below.");
    focusStatus();
  };

  const copyMessage = async () => {
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(prepared.message);
      setStatus("The prepared enquiry message has been copied. Nothing has been sent.");
    } catch {
      setStatus("The message could not be copied automatically. Nothing has been sent; use the prepared WhatsApp link or call the approved number.");
    }
    focusStatus();
  };

  const inputClass = "w-full px-4 py-3 rounded-2xl bg-secondary/40 border border-border/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm backdrop-blur-sm";
  return (
    <Layout>
      <SEOHead
        title="Contact Dubai Yacht | Prepare a Yacht Enquiry"
        description="Prepare a private yacht enquiry for WhatsApp or call Dubai Yacht using the approved contact number. An enquiry is not a confirmed booking."
        path="/contact"
        jsonLd={buildBreadcrumbSchema("/contact", [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])}
      />
      <div className="pt-28 pb-20" data-support-content="contact">
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedSection initiallyVisible className="text-center mb-12">
            <span className="liquid-pill inline-block mb-4">Contact</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">Prepare a Private Yacht Enquiry</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Compare a yacht first, then prepare the details needed to ask about availability. This browser form does not submit a booking.</p>
          </AnimatedSection>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <AnimatedSection>
              <form onSubmit={handleSubmit} className="liquid-glass-gold p-6 md:p-8 space-y-5" aria-describedby="form-disclosure">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="text-sm text-foreground">Preferred date<input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={`${inputClass} mt-2`} /></label>
                  <label className="text-sm text-foreground">Preferred start time<input required type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className={`${inputClass} mt-2`} /></label>
                  <label className="text-sm text-foreground">Requested duration (hours)<input required type="number" min="1" step="1" value={form.duration} onChange={(e) => update("duration", e.target.value)} className={`${inputClass} mt-2`} /></label>
                  <label className="text-sm text-foreground">Guest count<input required type="number" min="1" step="1" value={form.guests} onChange={(e) => update("guests", e.target.value)} className={`${inputClass} mt-2`} /></label>
                </div>
                <label className="text-sm text-foreground">Yacht interest<input value={form.yacht} onChange={(e) => update("yacht", e.target.value)} className={`${inputClass} mt-2`} placeholder="Optional yacht name or shortlist" /></label>
                <label className="text-sm text-foreground">Occasion or optional requests<textarea rows={3} value={form.occasion} onChange={(e) => update("occasion", e.target.value)} className={`${inputClass} mt-2`} placeholder="Optional requests remain subject to confirmation and separate pricing" /></label>
                <label className="text-sm text-foreground">General note (optional)<textarea rows={3} value={form.note} onChange={(e) => update("note", e.target.value)} className={`${inputClass} mt-2`} /></label>
                <p id="form-disclosure" className="text-xs text-muted-foreground leading-relaxed">The form prepares a message locally in this browser. It does not send values to this website, Netlify, email, a database or an internal API. Transmission happens only if you press Send in WhatsApp.</p>
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 liquid-btn-primary"><Send className="w-4 h-4" aria-hidden="true" /> Prepare in WhatsApp</button>
              </form>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="space-y-4">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="liquid-glass p-5 flex items-center gap-4 block">
                <MessageCircle className="w-6 h-6 text-green-400" aria-hidden="true" /><span><strong className="block text-foreground">WhatsApp enquiry</strong><span className="text-xs text-muted-foreground">Open a general enquiry</span></span>
              </a>
              <a href={getPhoneLink()} className="liquid-glass p-5 flex items-center gap-4 block">
                <Phone className="w-6 h-6 text-primary" aria-hidden="true" /><span><strong className="block text-foreground">Call Dubai Yacht</strong><span className="text-xs text-muted-foreground">{PHONE_NUMBER}</span></span>
              </a>
              {departure && <div className="glass-card p-5 text-xs text-muted-foreground leading-relaxed"><strong className="block text-sm text-foreground mb-2">Departure reference</strong>{departure}</div>}
            </AnimatedSection>
          </div>

          {status && (
            <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="mt-8 glass-card p-6 focus:outline-none focus:ring-2 focus:ring-primary">
              <p className="text-foreground leading-relaxed">{status}</p>
              {blocked && prepared && <div className="flex flex-wrap gap-3 mt-4"><a href={prepared.url} target="_blank" rel="noopener noreferrer" className="liquid-btn-gold px-5 py-3 text-primary">Open prepared WhatsApp message</a><button type="button" onClick={copyMessage} className="liquid-btn px-5 py-3 inline-flex items-center gap-2"><Clipboard className="w-4 h-4" aria-hidden="true" />Copy message</button><a href={getPhoneLink()} className="liquid-btn px-5 py-3">Call {PHONE_NUMBER}</a></div>}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
