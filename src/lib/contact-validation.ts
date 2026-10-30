import { publishableYachts } from "@/data/yachts";
import type { YachtEnquiryFields } from "./contact-request";

export const getDubaiDate = (now = new Date()): string => {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
};

export const getEnquiryLimits = (name: string) => {
  const normalized = name.trim().toLowerCase();
  const yacht = publishableYachts.find((record) => [record.name.toLowerCase(), record.slug].includes(normalized));
  return {
    yacht,
    minimumDuration: yacht?.minimumDuration ?? Math.min(...publishableYachts.map((record) => record.minimumDuration)),
    maximumGuests: yacht?.guestCapacity,
  };
};

export const validateYachtEnquiry = (fields: YachtEnquiryFields, now = new Date()): string | undefined => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date) || fields.date < getDubaiDate(now)) return "Choose today or a future date for your trip in Dubai.";
  const parsed = new Date(`${fields.date}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== fields.date) return "Choose a valid date for your trip.";
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(fields.time)) return "Choose a valid start time.";
  const limits = getEnquiryLimits(fields.yacht);
  const duration = Number(fields.duration);
  if (!Number.isFinite(duration) || !Number.isInteger(duration) || duration < limits.minimumDuration) return `Choose a minimum of ${limits.minimumDuration} hours${limits.yacht ? ` for ${limits.yacht.name}` : " for the published fleet"}.`;
  const guests = Number(fields.guests);
  if (!Number.isSafeInteger(guests) || guests < 1) return "Enter a whole number of guests, at least 1.";
  if (limits.maximumGuests && guests > limits.maximumGuests) return `${limits.yacht?.name} accommodates up to ${limits.maximumGuests} guests. Choose another yacht or adjust your guest count.`;
};
