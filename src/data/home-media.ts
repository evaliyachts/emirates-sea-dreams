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
  width: 768,
  height: 1376,
  alt: "",
  rightsRecordId: "english-home-hero-mobile-001",
  surface: "hero-mobile",
};

export const HOME_SERVICE_MEDIA: readonly HomepageServiceMediaRecord[] = [
  {
    id: "home-service-birthday",
    path: "/media/home/services/04ed317f13d8d1d3-private-yacht-55ft-02-salon.webp",
    width: 1150,
    height: 1280,
    alt: "",
    rightsRecordId: "english-home-service-birthday-002",
    surface: "service-card",
    planningCategoryId: "celebration",
  },
  {
    id: "home-service-anniversary",
    path: "/media/home/services/2bc37a1679d813c5-private-yacht-55ft-08-aft-seating.webp",
    width: 900,
    height: 1600,
    alt: "",
    rightsRecordId: "english-home-service-anniversary-002",
    surface: "service-card",
    planningCategoryId: "celebration",
  },
  {
    id: "home-service-engagement",
    path: "/media/home/services/fef28f32686ec686-private-yacht-55ft-06-bow-seating.webp",
    width: 1536,
    height: 1024,
    alt: "",
    rightsRecordId: "english-home-service-engagement-002",
    surface: "service-card",
    planningCategoryId: "romance",
  },
  {
    id: "home-service-proposal",
    path: "/media/home/services/bb6fa6c92c1726f4-private-yacht-55ft-07-bow-marina.webp",
    width: 900,
    height: 1600,
    alt: "",
    rightsRecordId: "english-home-service-proposal-002",
    surface: "service-card",
    planningCategoryId: "romance",
  },
  {
    id: "home-service-graduation",
    path: "/media/home/services/63d7fb8c286f0452-private-yacht-55ft-05-flybridge-skyline.webp",
    width: 1086,
    height: 1448,
    alt: "",
    rightsRecordId: "english-home-service-graduation-002",
    surface: "service-card",
    planningCategoryId: "celebration",
  },
  {
    id: "home-service-wedding",
    path: "/media/home/services/f82dfa26e591ffae-private-yacht-55ft-04-flybridge.webp",
    width: 1448,
    height: 1086,
    alt: "",
    rightsRecordId: "english-home-service-wedding-002",
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
    path: "/media/home/services/c471f05e21df327c-private-yacht-55ft-03-salon-media.webp",
    width: 1200,
    height: 1600,
    alt: "",
    rightsRecordId: "english-home-service-barbecue-002",
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
