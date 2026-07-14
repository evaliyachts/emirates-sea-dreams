import { getWhatsAppLink } from "@/lib/constants";

export interface YachtEnquiryFields {
  date: string;
  time: string;
  duration: string;
  guests: string;
  yacht: string;
  occasion: string;
  note: string;
}

const line = (label: string, value: string) => value.trim() ? `${label}: ${value.trim()}` : undefined;

export const prepareYachtEnquiry = (fields: YachtEnquiryFields) => {
  const message = [
    "Hello Dubai Yacht, I would like to enquire about a private yacht in Dubai.",
    line("Preferred date", fields.date),
    line("Preferred start time", fields.time),
    line("Requested duration", fields.duration ? `${fields.duration} hours` : ""),
    line("Guest count", fields.guests),
    line("Yacht interest", fields.yacht),
    line("Occasion or optional requests", fields.occasion),
    line("Note", fields.note),
    "I understand that this is an enquiry, not a confirmed booking.",
  ].filter((value): value is string => Boolean(value)).join("\n");

  return { message, url: getWhatsAppLink(message) };
};

export const openPreparedWhatsApp = (url: string, openWindow: typeof window.open = window.open): boolean => {
  try {
    const target = openWindow("", "dubai_yacht_whatsapp");
    if (!target) return false;
    target.opener = null;
    target.location.href = url;
    return true;
  } catch {
    return false;
  }
};
