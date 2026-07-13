export type HomepageMediaSurface = "hero-desktop" | "hero-mobile" | "service-card";

export type ServicePlanningCategoryId =
  | "celebration"
  | "romance"
  | "hospitality"
  | "water-activity"
  | "private-experience";

export interface HomepageMediaRecord {
  id: string;
  path: string;
  width: number;
  height: number;
  alt: string;
  rightsRecordId: string;
  surface: HomepageMediaSurface;
  planningCategoryId?: ServicePlanningCategoryId;
}

export interface HomepageServiceMediaRecord extends HomepageMediaRecord {
  surface: "service-card";
  planningCategoryId: ServicePlanningCategoryId;
}

export const HOME_HERO_DESKTOP: HomepageMediaRecord = {
  id: "home-hero-desktop",
  path: "/media/home/hero/yacht-cover-desktop.avif",
  width: 2752,
  height: 1536,
  alt: "",
  rightsRecordId: "english-home-hero-desktop-001",
  surface: "hero-desktop",
};

export const HOME_HERO_MOBILE: HomepageMediaRecord = {
  id: "home-hero-mobile",
  path: "/media/home/hero/yacht-cover-mobile.avif",
  width: 1536,
  height: 2752,
  alt: "",
  rightsRecordId: "english-home-hero-mobile-001",
  surface: "hero-mobile",
};

export const HOME_SERVICE_MEDIA: readonly HomepageServiceMediaRecord[] = [
  {
    id: "home-service-birthday",
    path: "/media/home/services/birthday-party.webp",
    width: 767,
    height: 730,
    alt: "",
    rightsRecordId: "english-home-service-birthday-001",
    surface: "service-card",
    planningCategoryId: "celebration",
  },
  {
    id: "home-service-anniversary",
    path: "/media/home/services/wedding-anniversary.webp",
    width: 767,
    height: 728,
    alt: "",
    rightsRecordId: "english-home-service-anniversary-001",
    surface: "service-card",
    planningCategoryId: "celebration",
  },
  {
    id: "home-service-engagement",
    path: "/media/home/services/engagement-party.webp",
    width: 767,
    height: 729,
    alt: "",
    rightsRecordId: "english-home-service-engagement-001",
    surface: "service-card",
    planningCategoryId: "romance",
  },
  {
    id: "home-service-proposal",
    path: "/media/home/services/marriage-proposal.webp",
    width: 767,
    height: 730,
    alt: "",
    rightsRecordId: "english-home-service-proposal-001",
    surface: "service-card",
    planningCategoryId: "romance",
  },
  {
    id: "home-service-graduation",
    path: "/media/home/services/graduation-party.webp",
    width: 767,
    height: 729,
    alt: "",
    rightsRecordId: "english-home-service-graduation-001",
    surface: "service-card",
    planningCategoryId: "celebration",
  },
  {
    id: "home-service-wedding",
    path: "/media/home/services/wedding-party.webp",
    width: 767,
    height: 730,
    alt: "",
    rightsRecordId: "english-home-service-wedding-001",
    surface: "service-card",
    planningCategoryId: "celebration",
  },
  {
    id: "home-service-jet-ski",
    path: "/media/home/services/jet-ski.jpg",
    width: 750,
    height: 690,
    alt: "",
    rightsRecordId: "english-home-service-jet-ski-001",
    surface: "service-card",
    planningCategoryId: "water-activity",
  },
  {
    id: "home-service-donut-ride",
    path: "/media/home/services/donut-ride.webp",
    width: 720,
    height: 461,
    alt: "",
    rightsRecordId: "english-home-service-donut-ride-001",
    surface: "service-card",
    planningCategoryId: "water-activity",
  },
  {
    id: "home-service-banana-boat",
    path: "/media/home/services/banana-boat.webp",
    width: 767,
    height: 729,
    alt: "",
    rightsRecordId: "english-home-service-banana-boat-001",
    surface: "service-card",
    planningCategoryId: "water-activity",
  },
  {
    id: "home-service-barbecue",
    path: "/media/home/services/barbecue.webp",
    width: 461,
    height: 472,
    alt: "",
    rightsRecordId: "english-home-service-barbecue-001",
    surface: "service-card",
    planningCategoryId: "hospitality",
  },
  {
    id: "home-service-swimming",
    path: "/media/home/services/swimming.webp",
    width: 425,
    height: 668,
    alt: "",
    rightsRecordId: "english-home-service-swimming-001",
    surface: "service-card",
    planningCategoryId: "private-experience",
  },
  {
    id: "home-service-food",
    path: "/media/home/services/food-menu.webp",
    width: 358,
    height: 506,
    alt: "",
    rightsRecordId: "english-home-service-food-001",
    surface: "service-card",
    planningCategoryId: "hospitality",
  },
  {
    id: "home-service-fishing",
    path: "/media/home/services/fishing.webp",
    width: 648,
    height: 1152,
    alt: "",
    rightsRecordId: "english-home-service-fishing-001",
    surface: "service-card",
    planningCategoryId: "private-experience",
  },
];

export const HOMEPAGE_MEDIA: readonly HomepageMediaRecord[] = [
  HOME_HERO_DESKTOP,
  HOME_HERO_MOBILE,
  ...HOME_SERVICE_MEDIA,
];
