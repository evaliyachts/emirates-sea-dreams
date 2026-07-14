import { getApprovedValue, siteFacts } from "@/config/site-facts";

const requireApproved = <T>(value: T | undefined, label: string): T => {
  if (value === undefined) throw new Error(`${label} is not approved.`);
  return value;
};

export const BRAND_NAME = requireApproved(getApprovedValue(siteFacts.brandName), "Brand name");
export const DOMAIN = "https://yachtrentaldxb.com";
export const PHONE_NUMBER = requireApproved(getApprovedValue(siteFacts.phoneDisplay), "Display phone");
export const PHONE_E164 = requireApproved(getApprovedValue(siteFacts.phoneE164), "E.164 phone");
export const WHATSAPP_URL = requireApproved(getApprovedValue(siteFacts.whatsappUrl), "WhatsApp URL");
export const RESPONSIBLE_PERSON = requireApproved(getApprovedValue(siteFacts.responsiblePerson), "Responsible person");
export const LEGAL_PUBLICATION_DATE = requireApproved(getApprovedValue(siteFacts.legalPublicationDate), "Legal publication date");
export const PLACEHOLDER_IMAGE = "/placeholder.svg";

export const getWhatsAppLink = (message?: string) => {
  const defaultMsg = "Hello Dubai Yacht, I would like to enquire about a private yacht in Dubai.";
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message || defaultMsg)}`;
};

export const getPhoneLink = () => `tel:${PHONE_E164}`;

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Yachts", path: "/yachts" },
  { label: "Services", path: "/services" },
  { label: "Occasions", path: "/occasions" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];
