import { MessageCircle, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getPublishableYachtBySlug } from "@/data/yachts";
import { getApprovedServiceBySlug } from "@/data/approved-services";
import { getPhoneLink, getWhatsAppLink } from "@/lib/constants";

const BookingActions = ({ compact = false }: { compact?: boolean }) => {
  const { pathname } = useLocation();
  const yacht = pathname.startsWith("/yachts/") ? getPublishableYachtBySlug(pathname.split("/")[2]) : undefined;
  const service = pathname.startsWith("/services/") ? getApprovedServiceBySlug(pathname.split("/")[2]) : undefined;
  const message = yacht || service
    ? `Hi Dubai Yacht, I'd like to check availability.\nDate:\nTime:\nGuests:\n${yacht ? `Preferred yacht: ${yacht.name}` : `Occasion: ${service!.name}`}\nDuration:`
    : undefined;
  return (
    <div className={`flex ${compact ? "gap-2" : "flex-wrap gap-3"}`}>
      <a href={getWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className={`liquid-btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 font-semibold ${compact ? "flex-1 text-sm" : "text-base"}`}>
        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />{compact ? "WhatsApp Us" : "Check Availability"}
      </a>
      <a href={getPhoneLink()} className={`liquid-btn inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-foreground ${compact ? "text-sm" : "text-base"}`}>
        <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />Call Now
      </a>
    </div>
  );
};
export default BookingActions;
