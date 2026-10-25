import type { StaticImageData } from "next/image";

import aboutCameraLight from "@/assets/photos/about-camera-light.jpg";
import brandAvocadoPink from "@/assets/photos/brand-avocado-pink.jpg";
import brandFlatlayBag from "@/assets/photos/brand-flatlay-bag.jpg";
import brandHeadphonesYellow from "@/assets/photos/brand-headphones-yellow.jpg";
import brandWhiteWatch from "@/assets/photos/brand-white-watch.jpg";
import coupleHeartHands from "@/assets/photos/couple-heart-hands.jpg";
import coupleHeartLights from "@/assets/photos/couple-heart-lights.jpg";
import coupleHoldingHands from "@/assets/photos/couple-holding-hands.jpg";
import coupleSunsetBikes from "@/assets/photos/couple-sunset-bikes.jpg";
import editorialKnitStripes from "@/assets/photos/editorial-knit-stripes.jpg";
import editorialNeonTeal from "@/assets/photos/editorial-neon-teal.jpg";
import editorialPinkCurls from "@/assets/photos/editorial-pink-curls.jpg";
import editorialSunglasses from "@/assets/photos/editorial-sunglasses.jpg";
import editorialYellowTracksuit from "@/assets/photos/editorial-yellow-tracksuit.jpg";
import eventBalloons from "@/assets/photos/event-balloons.jpg";
import eventConcertLights from "@/assets/photos/event-concert-lights.jpg";
import eventConfettiCrowd from "@/assets/photos/event-confetti-crowd.jpg";
import eventDinnerToast from "@/assets/photos/event-dinner-toast.jpg";
import eventReceptionTables from "@/assets/photos/event-reception-tables.jpg";
import eventRooftopFriends from "@/assets/photos/event-rooftop-friends.jpg";
import portraitBlueWall from "@/assets/photos/portrait-blue-wall.jpg";
import portraitDenimJacket from "@/assets/photos/portrait-denim-jacket.jpg";
import portraitPinkBackdrop from "@/assets/photos/portrait-pink-backdrop.jpg";
import portraitRedSweater from "@/assets/photos/portrait-red-sweater.jpg";
import portraitStudioMan from "@/assets/photos/portrait-studio-man.jpg";
import weddingConfettiKiss from "@/assets/photos/wedding-confetti-kiss.jpg";
import weddingDarkBouquet from "@/assets/photos/wedding-dark-bouquet.jpg";
import weddingGardenAisle from "@/assets/photos/wedding-garden-aisle.jpg";
import weddingHandsBouquet from "@/assets/photos/wedding-hands-bouquet.jpg";
import weddingHandsRings from "@/assets/photos/wedding-hands-rings.jpg";
import weddingLawnChairs from "@/assets/photos/wedding-lawn-chairs.jpg";
import weddingPalmsWalk from "@/assets/photos/wedding-palms-walk.jpg";
import weddingPoolsideBalloons from "@/assets/photos/wedding-poolside-balloons.jpg";
import weddingRingsPeonies from "@/assets/photos/wedding-rings-peonies.jpg";
import weddingWoodlandEmbrace from "@/assets/photos/wedding-woodland-embrace.jpg";

/*
 * PLACEHOLDER IMAGERY — every photo below is a stock placeholder (see
 * assets/photos/CREDITS.md), not the photographer's work. Project titles and
 * descriptions are neutral samples; replace them with real projects.
 */

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position used when the photo is cropped into a frame. */
  focus?: string;
};

export type CategoryId = "weddings" | "portraits" | "couples" | "events" | "editorial" | "brand";

export type Category = {
  id: CategoryId;
  /** Short label for filters and captions. */
  label: string;
  /** Page heading and <title> on the category landing page. */
  title: string;
  /** One or two sentences introducing the category. */
  intro: string;
  /** What a client can expect — written as approach, not as promised deliverables. */
  expect: { title: string; text: string }[];
  /** Service preselected in the consultation form on this page (see content/services.ts). */
  serviceId: string;
};

/*
 * Category copy is neutral sample text describing an approach. Edit it to
 * match how the photographer actually works before launch.
 */
export const categories: Category[] = [
  {
    id: "weddings",
    label: "Weddings",
    title: "Wedding Photography",
    intro:
      "Calm, considered coverage of your wedding day — the quiet details, the people you love and the moments in between.",
    expect: [
      { title: "Planned together", text: "We talk through your timeline, locations and the moments that matter most before the day." },
      { title: "Unobtrusive on the day", text: "Gentle guidance for portraits, then stepping back so the day can unfold naturally." },
      { title: "A complete story", text: "A curated set of photographs that tells the day from beginning to end." },
    ],
    serviceId: "signature-experience",
  },
  {
    id: "portraits",
    label: "Portraits",
    title: "Portrait Photography",
    intro: "Relaxed portraits for individuals and families, in the studio or somewhere that feels like you.",
    expect: [
      { title: "A conversation first", text: "We discuss the purpose of the portraits, the mood you'd like and what to wear." },
      { title: "Guided, not stiff", text: "Simple direction that helps you feel at ease in front of the camera." },
      { title: "Carefully edited", text: "A selection of finished portraits, edited with attention to natural detail." },
    ],
    serviceId: "intimate-session",
  },
  {
    id: "couples",
    label: "Couples",
    title: "Couple Photography",
    intro: "Sessions for engagements, anniversaries and elopements — or simply to remember this chapter together.",
    expect: [
      { title: "Your kind of place", text: "Locations and timing chosen around light and the places that mean something to you." },
      { title: "Natural moments", text: "Prompts and movement rather than rigid poses, so the photographs feel like you." },
      { title: "A session that flows", text: "An unhurried pace that leaves room for the in-between moments." },
    ],
    serviceId: "intimate-session",
  },
  {
    id: "events",
    label: "Events",
    title: "Event & Celebration Photography",
    intro: "Birthdays, anniversaries, parties and gatherings — documented with an eye for atmosphere and people.",
    expect: [
      { title: "A clear brief", text: "We agree the key moments, people and details to capture before the event." },
      { title: "Discreet coverage", text: "Moving quietly through the room so guests stay relaxed and natural." },
      { title: "Atmosphere and detail", text: "The big moments alongside the small touches that made the day yours." },
    ],
    serviceId: "signature-experience",
  },
  {
    id: "editorial",
    label: "Editorial",
    title: "Fashion & Editorial Photography",
    intro: "Concept-led shoots for designers, stylists, publications and creative collaborations.",
    expect: [
      { title: "Concept and moodboard", text: "We shape the creative direction, references and shot list together." },
      { title: "Collaborative on set", text: "Working closely with styling, hair and makeup to realise the concept." },
      { title: "Considered retouching", text: "Editing that keeps texture and character while polishing the final selects." },
    ],
    serviceId: "custom-project",
  },
  {
    id: "brand",
    label: "Brand & Product",
    title: "Brand & Product Photography",
    intro: "Clean, considered imagery for products, campaigns and brand stories.",
    expect: [
      { title: "Built from a brief", text: "We start with how and where the images will be used, then plan the shots." },
      { title: "Styling with intent", text: "Backgrounds, props and light chosen to suit your brand's visual language." },
      { title: "Ready to use", text: "Final images prepared for the channels you agreed on during planning." },
    ],
    serviceId: "custom-project",
  },
];

export type Project = {
  slug: string;
  title: string;
  category: CategoryId;
  summary: string;
  cover: Photo;
  gallery: Photo[];
};

export const projects: Project[] = [
  {
    slug: "among-the-palms",
    title: "Among the Palms",
    category: "weddings",
    summary: "A sample wedding story, from quiet details to the walk away together.",
    cover: {
      src: weddingHandsBouquet,
      alt: "Close-up of a couple's hands with wedding rings resting on a peach bouquet",
      focus: "50% 50%",
    },
    gallery: [
      { src: weddingPalmsWalk, alt: "Bride and groom walking hand in hand beneath tall palm trees" },
      { src: weddingHandsBouquet, alt: "Close-up of a couple's hands with wedding rings resting on a peach bouquet" },
      { src: weddingRingsPeonies, alt: "Two gold wedding rings resting on pale pink peonies" },
      { src: weddingDarkBouquet, alt: "Bride holding a white and blush bouquet against a dark suit in low evening light" },
    ],
  },
  {
    slug: "studio-portraits",
    title: "Studio Portraits",
    category: "portraits",
    summary: "A sample set of simple, light-led studio portraits.",
    cover: {
      src: portraitPinkBackdrop,
      alt: "Portrait of a woman with her hair in a bun against a dusty pink backdrop",
      focus: "50% 35%",
    },
    gallery: [
      { src: portraitPinkBackdrop, alt: "Portrait of a woman with her hair in a bun against a dusty pink backdrop" },
      { src: portraitRedSweater, alt: "Smiling woman in a red top photographed against a softly blurred background" },
      { src: portraitStudioMan, alt: "Smiling man in a white t-shirt against a grey wall" },
    ],
  },
  {
    slug: "colour-studies",
    title: "Colour Studies",
    category: "editorial",
    summary: "A sample editorial series built around bold colour and strong poses.",
    cover: {
      src: editorialNeonTeal,
      alt: "Model in striped trousers posing against a teal wall under a neon sign",
      focus: "50% 40%",
    },
    gallery: [
      { src: editorialNeonTeal, alt: "Model in striped trousers posing against a teal wall under a neon sign" },
      { src: editorialYellowTracksuit, alt: "Model in a yellow tracksuit standing on a concrete court under a blue sky" },
      { src: editorialSunglasses, alt: "Woman in oversized sunglasses posing against a yellow wall" },
      { src: editorialPinkCurls, alt: "Woman with long curls against a pale pink wall" },
    ],
  },
  {
    slug: "golden-hour-together",
    title: "Golden Hour Together",
    category: "couples",
    summary: "A sample couple session shaped around the last light of the day.",
    cover: {
      src: coupleSunsetBikes,
      alt: "Silhouettes of two people on bicycles reaching for each other's hands at sunset",
      focus: "50% 70%",
    },
    gallery: [
      { src: coupleSunsetBikes, alt: "Silhouettes of two people on bicycles reaching for each other's hands at sunset" },
      { src: coupleHeartHands, alt: "Two hands forming a heart shape against a low sun" },
      { src: coupleHoldingHands, alt: "A couple holding hands, their shadows falling across the grass" },
      { src: coupleHeartLights, alt: "A heart of string lights glowing on sand at dusk" },
    ],
  },
  {
    slug: "an-evening-to-remember",
    title: "An Evening to Remember",
    category: "events",
    summary: "A sample celebration gallery — the toasts, the tables and the people.",
    cover: {
      src: eventDinnerToast,
      alt: "Guests raising glasses at a long dinner table under strings of warm lights",
      focus: "40% 50%",
    },
    gallery: [
      { src: eventDinnerToast, alt: "Guests raising glasses at a long dinner table under strings of warm lights" },
      { src: eventReceptionTables, alt: "Reception tables set with white linen and yellow flowers beneath a striped canopy" },
      { src: eventRooftopFriends, alt: "Three friends raising their arms toward a pastel sunset" },
      { src: eventBalloons, alt: "A ceiling of colourful balloons with trailing ribbons" },
    ],
  },
  {
    slug: "garden-vows",
    title: "Garden Vows",
    category: "weddings",
    summary: "A sample outdoor ceremony, from the aisle to the confetti.",
    cover: {
      src: weddingConfettiKiss,
      alt: "Newlyweds kissing as guests throw confetti in a garden",
      focus: "50% 40%",
    },
    gallery: [
      { src: weddingConfettiKiss, alt: "Newlyweds kissing as guests throw confetti in a garden" },
      { src: weddingGardenAisle, alt: "A garden ceremony aisle lined with chairs and pastel flower arrangements" },
      { src: weddingLawnChairs, alt: "Two decorated chairs on a lawn beside a lake" },
      { src: weddingPoolsideBalloons, alt: "Couple standing by a pool as guests release balloons behind them" },
      { src: weddingHandsRings, alt: "Close-up of joined hands with wedding rings beside an orange bouquet" },
    ],
  },
  {
    slug: "city-portraits",
    title: "City Portraits",
    category: "portraits",
    summary: "A sample on-location portrait set using colour found in the street.",
    cover: {
      src: portraitBlueWall,
      alt: "Young woman in a hoodie and denim jacket smiling beside a blue wall",
      focus: "50% 30%",
    },
    gallery: [
      { src: portraitBlueWall, alt: "Young woman in a hoodie and denim jacket smiling beside a blue wall" },
      { src: portraitDenimJacket, alt: "Woman with long hair in a denim jacket, eyes closed, outdoors among trees" },
      { src: editorialKnitStripes, alt: "Woman in a pale blue knit sweater against striped metal shutters" },
    ],
  },
  {
    slug: "objects-and-detail",
    title: "Objects & Detail",
    category: "brand",
    summary: "A sample product series with clean backgrounds and considered styling.",
    cover: {
      src: brandWhiteWatch,
      alt: "A white smartwatch laid flat on a pale grey surface",
      focus: "50% 50%",
    },
    gallery: [
      { src: brandFlatlayBag, alt: "Flat lay of a black quilted bag with sunglasses, a watch, lipstick and jewellery" },
      { src: brandWhiteWatch, alt: "A white smartwatch laid flat on a pale grey surface" },
      { src: brandHeadphonesYellow, alt: "Black over-ear headphones on a bright yellow background" },
      { src: brandAvocadoPink, alt: "Half an avocado on a soft pink background" },
    ],
  },
  {
    slug: "live-and-loud",
    title: "Live & Loud",
    category: "events",
    summary: "A sample live-event set capturing light, crowd and atmosphere.",
    cover: {
      src: eventConfettiCrowd,
      alt: "Confetti falling over a crowd under blue stage lights",
      focus: "50% 50%",
    },
    gallery: [
      { src: eventConfettiCrowd, alt: "Confetti falling over a crowd under blue stage lights" },
      { src: eventConcertLights, alt: "Concert crowd beneath vivid multicoloured stage lighting" },
    ],
  },
  {
    slug: "woodland-elopement",
    title: "Woodland Elopement",
    category: "couples",
    summary: "A sample elopement among rocks and trees, just the two of them.",
    cover: {
      src: weddingWoodlandEmbrace,
      alt: "Couple embracing among mossy boulders in a forest",
      focus: "50% 55%",
    },
    gallery: [
      { src: weddingWoodlandEmbrace, alt: "Couple embracing among mossy boulders in a forest" },
      { src: weddingDarkBouquet, alt: "Bride holding a white and blush bouquet against a dark suit in low evening light" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function getCategoryLabel(id: CategoryId): string {
  return getCategory(id)?.label ?? id;
}

export function getProjectsInCategory(id: CategoryId): Project[] {
  return projects.filter((project) => project.category === id);
}

/** Every photograph from a category's projects, in order, without repeats. */
export function getCategoryPhotos(id: CategoryId): Photo[] {
  const seen = new Set<string>();
  return getProjectsInCategory(id)
    .flatMap((project) => project.gallery)
    .filter((photo) => {
      if (seen.has(photo.src.src)) return false;
      seen.add(photo.src.src);
      return true;
    });
}

/** Imagery used by page sections outside the portfolio grid. */
export const sectionImages = {
  heroMain: {
    src: weddingPalmsWalk,
    alt: "Bride and groom walking hand in hand beneath tall palm trees",
    focus: "50% 55%",
  },
  heroInset: {
    src: weddingRingsPeonies,
    alt: "Two gold wedding rings resting on pale pink peonies",
    focus: "45% 50%",
  },
  about: {
    // Replace with a portrait of the photographer.
    src: aboutCameraLight,
    alt: "A camera held up toward a bright sky, its lens catching the sunlight",
    focus: "45% 50%",
  },
  finalCta: {
    src: weddingDarkBouquet,
    alt: "Bride holding a white and blush bouquet in low evening light",
    focus: "50% 45%",
  },
} satisfies Record<string, Photo>;
