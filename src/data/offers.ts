export interface Offer {
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  price_label: string;
  inclusions: string[];
  description: string;
  featured: boolean;
  badge?: string;
}

// Publish only after business evidence and approval are recorded.
export const offers: Offer[] = [];
