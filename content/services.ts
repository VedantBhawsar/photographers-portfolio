/**
 * Sample service structures. Names, descriptions, inclusions and FAQ answers
 * are editable and are not confirmed business commitments — adjust before launch.
 * Pricing is intentionally absent: quotes follow a consultation.
 */

export type Faq = { question: string; answer: string };

export type Service = {
  /** Also the URL slug: /services/{id}. */
  id: string;
  name: string;
  /** Short catalogue label shown above the name. */
  kind: string;
  description: string;
  inclusions: string[];
  /** Occasions this starting point usually suits. */
  idealFor: string[];
  /** Aspects that are shaped during the consultation — options, not promises. */
  tailored: string[];
  faqs: Faq[];
  /** Visually emphasised column. */
  featured?: boolean;
};

/** Questions that apply to every service, shown after the service-specific ones. */
export const generalFaqs: Faq[] = [
  {
    question: "Why don't you list prices?",
    answer:
      "Every project is different in length, location and what you'd like to receive. After a free consultation you'll get a written proposal and quotation tailored to your plans.",
  },
  {
    question: "Is the consultation really free?",
    answer: "Yes. It's a no-obligation conversation to understand what you have in mind and whether we're a good fit.",
  },
  {
    question: "How far ahead should I get in touch?",
    answer:
      "As early as you can, especially for a fixed date. Share your preferred dates in the form and we'll let you know what's available.",
  },
];

export const services: Service[] = [
  {
    id: "intimate-session",
    name: "The Intimate Session",
    kind: "Portraits & Couples",
    description:
      "A relaxed, unhurried session for individuals, couples and small families — guided gently, never posed stiffly.",
    inclusions: [
      "Portraits and couple sessions",
      "Creative direction and shoot planning",
      "Location and styling discussion",
      "Professionally edited photographs",
    ],
    idealFor: ["Individual and family portraits", "Engagements and anniversaries", "Couple sessions and elopements"],
    tailored: [
      "Session length and pace",
      "Studio, home or outdoor location",
      "Outfit and styling guidance",
      "Number of looks or settings",
    ],
    faqs: [
      {
        question: "We're not comfortable in front of the camera. Is that a problem?",
        answer:
          "Not at all — most people feel that way. The session is guided with simple prompts and plenty of time to settle in.",
      },
      {
        question: "Can you help us choose a location and what to wear?",
        answer: "Yes. Location and styling are part of the planning conversation before your session.",
      },
    ],
  },
  {
    id: "signature-experience",
    name: "The Signature Experience",
    kind: "Weddings & Celebrations",
    description:
      "Considered coverage for the days that matter most, planned around the moments and people you care about.",
    inclusions: [
      "Weddings, celebrations or extended sessions",
      "Pre-shoot consultation",
      "Coverage tailored to the occasion",
      "Curated photographs and an online gallery, where offered",
    ],
    idealFor: ["Weddings and civil ceremonies", "Milestone birthdays and anniversaries", "Family celebrations and gatherings"],
    tailored: [
      "Hours of coverage across the day",
      "Which parts of the day are photographed",
      "Group and family photograph planning",
      "Additional locations or events",
    ],
    faqs: [
      {
        question: "Do we plan the timeline together?",
        answer:
          "Yes. Before the day we go through the schedule, key moments and any group photographs so nothing important is missed.",
      },
      {
        question: "Can coverage include more than one event?",
        answer: "It can. Tell us about each event in your request and we'll shape the proposal around them.",
      },
    ],
    featured: true,
  },
  {
    id: "custom-project",
    name: "The Custom Project",
    kind: "Brand & Creative",
    description:
      "Photography shaped around a brief — for brands, products, events and independent creative work.",
    inclusions: [
      "Brand campaigns, products, events or creative projects",
      "Project-specific photography brief",
      "Creative planning",
      "Custom coverage and deliverables",
    ],
    idealFor: ["Product and e-commerce imagery", "Brand and campaign shoots", "Fashion, editorial and creative collaborations"],
    tailored: [
      "Shot list and creative direction",
      "Studio or on-location production",
      "Image formats for your channels",
      "Usage and licensing needs",
    ],
    faqs: [
      {
        question: "What should we prepare before the consultation?",
        answer:
          "Anything that explains the goal: where the images will be used, references you like, timelines and the products or people involved.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer: "Yes. Share them during planning and the shoot will be built around them.",
      },
    ],
  },
];

export function getService(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

/** Options for the consultation form's "Photography service" field. */
export const serviceOptions: { value: string; label: string }[] = [
  ...services.map((service) => ({ value: service.id, label: `${service.name} — ${service.kind}` })),
  { value: "not-sure", label: "Not sure yet — let's talk it through" },
];
