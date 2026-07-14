import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { BRAND_NAME, NAV_LINKS, getWhatsAppLink, getPhoneLink } from "@/lib/constants";


const Footer = () => (
  <footer className="liquid-divider pt-16 pb-8 border-t border-border/30">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <Link to="/" className="flex items-center mb-4">
            <img
              src="/dubai-yachts-logo.png"
              alt={BRAND_NAME}
              className="h-8 w-auto"
            />
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Published yacht facts and planning guidance for private yacht requests in Dubai. Availability and optional services require confirmation.
          </p>
          <div className="flex gap-3">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" aria-label="Contact Dubai Yacht on WhatsApp" className="p-2 liquid-btn rounded-xl text-green-400">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href={getPhoneLink()} aria-label="Call Dubai Yacht" className="p-2 liquid-btn-gold rounded-xl text-primary">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Published Guides</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <Link to="/yachts" className="text-muted-foreground hover:text-primary transition-colors">Compare verified yachts and prices</Link>
            <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Review optional service categories</Link>
            <Link to="/occasions" className="text-muted-foreground hover:text-primary transition-colors">Plan a private yacht occasion</Link>
          </nav>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Before You Request</h4>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
            <p>Prepare your preferred date, duration, guest count, yacht shortlist and any optional requests. Confirm availability and operating details before relying on them.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
