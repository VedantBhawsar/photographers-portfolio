/**
 * Genuine client feedback only — add entries once a client has given
 * permission to publish their words. The section stays hidden while empty.
 */

export type Testimonial = {
  quote: string;
  /** Name exactly as the client agreed to be credited. */
  author: string;
  /** e.g. "Wedding, 2025" — optional context. */
  context?: string;
};

export const testimonials: Testimonial[] = [];
