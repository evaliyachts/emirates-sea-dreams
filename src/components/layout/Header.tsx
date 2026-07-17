import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, MessageCircle, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { NAV_LINKS, BRAND_NAME, getWhatsAppLink, getPhoneLink } from "@/lib/constants";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setIsOpen(false), [location.pathname]);

  const navLink = (link: (typeof NAV_LINKS)[number], mobile = false) => (
    <Link
      key={link.path}
      to={link.path}
      aria-current={location.pathname === link.path ? "page" : undefined}
      onClick={() => setIsOpen(false)}
      className={`${mobile ? "block px-4 py-3 text-lg font-display rounded-2xl" : "px-4 py-2 text-sm font-medium rounded-xl"} transition-all ${location.pathname === link.path ? "text-primary liquid-glass-gold" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"}`}
    >{link.label}</Link>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "liquid-header py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center group" aria-label={`${BRAND_NAME} home`}><img src="/dubai-yachts-logo.png" alt={BRAND_NAME} width="358" height="80" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" decoding="async" /></Link>
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">{NAV_LINKS.map((link) => navLink(link))}</nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-medium liquid-btn text-green-400"><MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp</a>
          <a href={getPhoneLink()} className="flex items-center gap-2 px-4 py-2 text-sm font-medium liquid-btn-gold text-primary"><Phone className="w-4 h-4" aria-hidden="true" /> Call</a>
        </div>
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild><button className="lg:hidden p-2 rounded-lg text-foreground focus-visible:ring-2 focus-visible:ring-primary" aria-label="Open navigation menu"><Menu className="w-6 h-6" /></button></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md lg:hidden" />
            <Dialog.Content className="fixed inset-0 z-[70] lg:hidden flex flex-col p-6 pt-20 bg-background/95 overflow-y-auto focus:outline-none">
              <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
              <Dialog.Description className="sr-only">Site pages and approved contact channels</Dialog.Description>
              <Dialog.Close asChild><button className="absolute right-4 top-5 p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-primary" aria-label="Close navigation menu"><X className="w-6 h-6" /></button></Dialog.Close>
              <nav aria-label="Mobile primary" className="flex flex-col gap-2">{NAV_LINKS.map((link) => navLink(link, true))}</nav>
              <div className="mt-8 flex flex-col gap-3">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 liquid-btn text-green-400"><MessageCircle className="w-5 h-5" aria-hidden="true" /> WhatsApp</a>
                <a href={getPhoneLink()} className="flex items-center justify-center gap-2 px-6 py-3 liquid-btn-gold text-primary"><Phone className="w-5 h-5" aria-hidden="true" /> Call</a>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
};

export default Header;
