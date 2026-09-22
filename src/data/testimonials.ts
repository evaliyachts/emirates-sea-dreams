export interface Testimonial {
  name: string;
  country: string;
  rating: number;
  text: string;
  yacht: string;
  occasion: string;
}

// Publish only after business evidence and approval are recorded.
export const testimonials: Testimonial[] = [];
