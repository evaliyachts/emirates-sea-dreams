import { HOME_SERVICE_MEDIA } from "./home-media";
import { publishableYachts } from "./yachts";
import type { ApprovedServiceMedia, ApprovedServiceRecord } from "./approved-service-schema";

export type { ApprovedServiceMedia, ApprovedServiceRecord } from "./approved-service-schema";

const serviceMedia = (rightsRecordId: string, alt: string): ApprovedServiceMedia => {
  const source = HOME_SERVICE_MEDIA.find((record) => record.rightsRecordId === rightsRecordId);
  if (!source) throw new Error(`Approved service media is missing from the local homepage registry: ${rightsRecordId}`);
  return {
    path: source.path,
    alt,
    width: source.width,
    height: source.height,
    rightsRecordId: source.rightsRecordId,
  };
};

const approved = (record: ApprovedServiceRecord) => record;

export const approvedServices: readonly ApprovedServiceRecord[] = [
  approved({
    id: "service-birthday",
    slug: "birthday-party",
    path: "/services/birthday-party",
    name: "Private Birthday Yacht Celebration",
    category: "celebration",
    availability: "on request and subject to confirmation",
    metadata: {
      title: "Birthday Yacht Party Dubai | Private Request Planning",
      description: "Plan a private birthday yacht request in Dubai by guest capacity, yacht price and optional celebration details that require separate confirmation.",
      h1: "Plan a Private Birthday Yacht Celebration in Dubai",
    },
    introduction: "A birthday yacht request starts with the people attending, the date you prefer and the yacht facts that fit the group. This page separates those verified decisions from celebration ideas, so you can compare published capacity, hourly price and minimum duration before asking about any optional setup.",
    directAnswer: "A private birthday yacht celebration is on request and subject to confirmation. Choose a published yacht that can hold the complete group, request a duration that meets its minimum, and list cake, decoration, music, dining or photography separately for supplier and price confirmation.",
    whoItIsFor: "This request is for people planning a private birthday gathering who can confirm the complete guest count before comparing yacht capacity and optional celebration ideas.",
    suitableGroupTypes: [
      "A couple or small private birthday group within the selected yacht's published capacity.",
      "Family and friends gathering for a birthday, with every adult and child counted.",
      "A larger private birthday group that needs a higher-capacity published yacht comparison.",
    ],
    optionalRequestBoundary: "Cake, decoration, music, dining, photography, balloons and entertainment are optional requests subject to availability, supplier confirmation and separate pricing unless the final written offer states otherwise.",
    sections: [
      {
        heading: "Start with the birthday group, not a package label",
        paragraphs: [
          "Count every guest before comparing yachts. The published capacity is a maximum comparison limit, while the actual request still needs confirmation for the chosen date and group.",
          "Then compare length, hourly price and minimum duration. A larger yacht or higher rate does not prove that a celebration extra, supplier or particular layout is available.",
        ],
      },
      {
        heading: "Separate the yacht request from celebration extras",
        paragraphs: [
          "Describe the preferred style and each optional item in writing. A photograph or birthday theme does not establish that cake, decoration, music, dining or a photographer forms part of the yacht price.",
          "Ask for the availability, supplier, lead time and separate price of every requested addition. Rely only on the final written offer when deciding what has been confirmed.",
        ],
      },
      {
        heading: "Keep timing and movement flexible until confirmed",
        paragraphs: [
          "Prepare a preferred date, start time and requested number of hours, but do not rely on a fixed departure point, route, duration or landmark sequence from this page.",
          "The useful outcome is a complete request: selected yacht, guest count, requested timing and a clearly separated optional list for confirmation.",
        ],
      },
    ],
    bookingSteps: [
      "Confirm the complete birthday guest count, including children.",
      "Compare three published yacht records by capacity, hourly price, size and minimum duration.",
      "Prepare the preferred date, timing and requested duration without assuming a route or departure point.",
      "List every optional celebration item and review the final written offer before relying on it.",
    ],
    priceFactors: [
      "The selected yacht's verified hourly price.",
      "The requested hours, subject to that yacht's published minimum duration.",
      "The complete guest count and the size of yacht selected.",
      "Separately confirmed suppliers, styling, hospitality or entertainment requests.",
    ],
    faqs: [
      { question: "Is birthday decoration part of the yacht's hourly price?", answer: "No decoration is assumed. Describe the requested setup and obtain availability, supplier and separate-price confirmation in the final written offer." },
      { question: "Can a birthday yacht request be confirmed from this page?", answer: "No. The service is on request and subject to confirmation, including the yacht, date, timing and every optional item." },
      { question: "How should I compare yachts for a birthday group?", answer: "Use the verified guest capacity first, then compare hourly price, minimum duration and length. Those facts do not confirm celebration equipment or extras." },
      { question: "Does the birthday page promise a route or landmark stop?", answer: "No pre-set route, departure point or landmark coverage is published. Include timing preferences in the request and wait for written confirmation." },
    ],
    yachtIds: ["yacht-royal-majesty-50", "yacht-majesty-56", "yacht-majesty-88"],
    yachtSelectionNote: "These three records provide factual capacity and price comparisons for small, medium and larger groups. The selection does not verify birthday equipment, suppliers or setup compatibility.",
    relatedServiceIds: ["service-graduation", "service-anniversary", "service-engagement"],
    media: serviceMedia("english-home-service-birthday-001", "Birthday celebration setting for a private yacht request"),
  }),
  approved({
    id: "service-proposal",
    slug: "marriage-proposal-party",
    path: "/services/marriage-proposal-party",
    name: "Private Yacht Marriage Proposal",
    category: "private-experience",
    availability: "on request and subject to confirmation",
    metadata: {
      title: "Yacht Proposal Dubai | Plan a Private Request",
      description: "Prepare a private yacht proposal request in Dubai with verified yacht facts and optional styling, dining and photography confirmed separately.",
      h1: "Plan a Private Yacht Marriage Proposal in Dubai",
    },
    introduction: "A proposal request benefits from careful planning without assuming a ready-made setup. Begin with whether the trip is for two people or a small group, compare the published yacht limits, and describe the preferred timing and optional presentation in a way that can be checked before you rely on it.",
    directAnswer: "A private yacht marriage proposal is on request and subject to confirmation. The yacht, date and timing must be confirmed, while letters, candles, flowers, decoration, dinner and photography remain optional requests with separate availability, supplier and price decisions.",
    whoItIsFor: "This request is for a couple planning a private yacht proposal, with the option to include a small group only when the full guest count fits the selected yacht's published capacity.",
    suitableGroupTypes: [
      "A two-person proposal request built around verified yacht price and minimum-duration facts.",
      "A proposal with a small private group, counted before the yacht shortlist is prepared.",
    ],
    optionalRequestBoundary: "Letters, candles, flowers, styling, decoration, dinner, photography and music are optional requests subject to availability, supplier confirmation and separate pricing unless the final written offer states otherwise.",
    sections: [
      {
        heading: "Choose the yacht from verified facts",
        paragraphs: [
          "Use the complete guest count to stay within the published capacity, then compare length, hourly price and minimum duration. A yacht name or image does not prove privacy arrangements or proposal equipment.",
          "A smaller group can still compare more than one vessel by budget and requested time. Availability remains a booking-time check rather than a promise made by this page.",
        ],
      },
      {
        heading: "Describe the proposal moment without assuming a setup",
        paragraphs: [
          "State the preferred atmosphere and list each optional request separately. Do not assume letters, candles, flowers, a photographer, dinner or decoration appears automatically.",
          "Ask what can be supplied, what lead time applies and what the separate price will be. The final written offer is the source for any confirmed arrangement.",
        ],
      },
      {
        heading: "Plan timing with a flexible operational request",
        paragraphs: [
          "Share the preferred date and time, along with any sequencing question, but do not rely on a fixed departure, route, duration or landmark position.",
          "A clear request combines yacht choice, guest count, requested duration and an optional-item list while leaving operational details open until confirmation.",
        ],
      },
    ],
    bookingSteps: [
      "Decide whether the request is for two people or includes additional guests.",
      "Compare published yacht capacity, rate, length and minimum duration.",
      "Write down the preferred date, timing and sequence without assuming a pre-set route.",
      "Request each styling, dining or photography item separately and review the written response.",
    ],
    priceFactors: [
      "The verified hourly rate of the selected yacht.",
      "The requested booking time and the yacht's minimum duration.",
      "The number of guests and vessel size chosen for the request.",
      "Separately confirmed styling, flowers, dining, photography or other supplier work.",
    ],
    faqs: [
      { question: "Are proposal letters or candles automatically provided?", answer: "No. Letters, candles and other styling are optional requests that require availability, supplier and separate-price confirmation." },
      { question: "Is a photographer part of the proposal request?", answer: "Photography is not assumed. Ask whether a supplier can be confirmed for the date and rely only on the final written offer." },
      { question: "Can I select a precise proposal landmark from this page?", answer: "No pre-set route or landmark coverage is promised. Describe the preference and wait for operational confirmation." },
      { question: "When is a proposal yacht request confirmed?", answer: "It remains on request and subject to confirmation until the chosen yacht, date, timing and accepted optional items are confirmed in writing." },
    ],
    yachtIds: ["yacht-azimut-42", "yacht-royal-majesty-50", "yacht-sunseeker-92"],
    yachtSelectionNote: "These records compare different sizes, rates and minimum durations for a two-person or small-group request. They do not verify proposal styling, privacy features or supplier access.",
    relatedServiceIds: ["service-engagement", "service-anniversary", "service-wedding"],
    media: serviceMedia("english-home-service-proposal-001", "Marriage proposal celebration setting for a private yacht request"),
  }),
  approved({
    id: "service-anniversary",
    slug: "wedding-anniversary-parties",
    path: "/services/wedding-anniversary-parties",
    name: "Private Yacht Anniversary Celebration",
    category: "celebration",
    availability: "on request and subject to confirmation",
    metadata: {
      title: "Yacht Anniversary Dubai | Private Celebration Planning",
      description: "Plan a private yacht anniversary request in Dubai by verified capacity and price, with dining, styling and photography treated as optional.",
      h1: "Plan a Private Yacht Anniversary Celebration in Dubai",
    },
    introduction: "An anniversary may be a quiet request for two people or a private gathering with family and friends. Define the complete group first, then compare yacht capacity, hourly price and minimum duration before discussing any optional dining, styling, flowers, music or photography.",
    directAnswer: "A private yacht anniversary celebration is on request and subject to confirmation. Yacht availability and timing must be checked, and dining, decoration, flowers, music and photography are separate optional requests rather than assumptions attached to the anniversary label.",
    whoItIsFor: "This request is for a couple marking an anniversary or for a private anniversary gathering whose complete group can be compared with published yacht capacity.",
    suitableGroupTypes: [
      "A two-person private anniversary request.",
      "An anniversary gathering with family or friends within a published yacht's capacity.",
    ],
    optionalRequestBoundary: "Dining, decoration, flowers, cake, music, photography and styling are optional requests subject to availability, supplier confirmation and separate pricing unless the final written offer states otherwise.",
    sections: [
      {
        heading: "Define the anniversary format and full group",
        paragraphs: [
          "State whether the request is for a couple or a larger private gathering. Use the complete number of guests to compare only yachts whose published capacity can accommodate that number.",
          "Length and price help compare records, but they do not prove a dining layout, decoration option or other celebration feature.",
        ],
      },
      {
        heading: "Request hospitality and styling as separate decisions",
        paragraphs: [
          "Describe any dining, flowers, cake, music, photography or styling request one item at a time. No optional item is assumed from a photograph or page theme.",
          "For each request, ask about supplier availability, lead time and separate pricing. Confirmed details belong in the final written offer.",
        ],
      },
      {
        heading: "Compare time and cost without a fixed itinerary",
        paragraphs: [
          "Use the yacht's hourly rate and minimum duration to estimate the base vessel comparison. The final request can state a preferred date and time without relying on a fixed departure point or route.",
          "This approach keeps the anniversary personal while preserving an accurate boundary between published yacht facts and details that require confirmation.",
        ],
      },
    ],
    bookingSteps: [
      "Confirm whether the anniversary is for two people or a larger private group.",
      "Shortlist yachts using published capacity, hourly price, length and minimum duration.",
      "Prepare a preferred date, start time and requested number of hours.",
      "List dining, styling, flowers, music and photography separately for written confirmation.",
    ],
    priceFactors: [
      "The selected yacht's published hourly rate.",
      "The requested duration compared with the vessel's minimum.",
      "The group size and vessel size chosen.",
      "Any supplier-confirmed hospitality, styling, flowers, music or photography.",
    ],
    faqs: [
      { question: "Is anniversary dining part of the yacht price?", answer: "No dining service is assumed. Menu, supplier, lead time and separate price must be confirmed before relying on it." },
      { question: "Can an anniversary request include family and friends?", answer: "You may submit the complete group as a request, provided the shortlist respects each yacht's published capacity. Final availability still requires confirmation." },
      { question: "Does this page confirm flowers or photography?", answer: "No. Flowers and photography are optional supplier requests with separate availability and pricing." },
      { question: "Is there a fixed anniversary trip duration?", answer: "No fixed service duration is published. The requested hours must meet the chosen yacht's verified minimum and remain subject to confirmation." },
    ],
    yachtIds: ["yacht-azimut-42", "yacht-azimut-55", "yacht-sunseeker-90"],
    yachtSelectionNote: "These yacht records compare a range of capacities, lengths, rates and minimum durations. They do not establish anniversary dining, decoration or photography capability.",
    relatedServiceIds: ["service-proposal", "service-engagement", "service-birthday"],
    media: serviceMedia("english-home-service-anniversary-001", "Anniversary celebration setting for a private yacht request"),
  }),
  approved({
    id: "service-engagement",
    slug: "engagement-parties",
    path: "/services/engagement-parties",
    name: "Private Yacht Engagement Celebration",
    category: "celebration",
    availability: "on request and subject to confirmation",
    metadata: {
      title: "Engagement Yacht Party Dubai | Private Request Guide",
      description: "Prepare a private engagement yacht request in Dubai with verified yacht choices and optional styling, catering and photography confirmed separately.",
      h1: "Plan a Private Engagement Yacht Celebration in Dubai",
    },
    introduction: "An engagement gathering needs a clear group count and a yacht comparison before any styling or hospitality discussion. Use the verified fleet fields to identify possible sizes and budgets, then describe optional celebration requests without treating them as a package or a confirmed part of the yacht.",
    directAnswer: "A private engagement yacht celebration is on request and subject to confirmation. Compare the group against published yacht capacity, meet the vessel's minimum duration, and request cake, decoration, music, dining, flowers or photography separately for supplier and price confirmation.",
    whoItIsFor: "This request is for a couple, family or invited private group preparing an engagement gathering and comparing yachts by verified capacity, size, rate and minimum duration.",
    suitableGroupTypes: [
      "A small engagement gathering with a complete confirmed guest count.",
      "A family engagement celebration requiring a medium-capacity yacht comparison.",
      "A larger private engagement group that remains within a selected yacht's published capacity.",
    ],
    optionalRequestBoundary: "Cake, decoration, music, dining, flowers, balloons, photography and styling are optional requests subject to availability, supplier confirmation and separate pricing unless the final written offer states otherwise.",
    sections: [
      {
        heading: "Build the engagement shortlist around capacity",
        paragraphs: [
          "Count all guests and compare that number with the published limits. A yacht with a higher capacity may offer a different price and minimum duration, but no event setup is inferred from those facts.",
          "Use length as another comparison point rather than a promise about seating, layout, decoration space or equipment.",
        ],
      },
      {
        heading: "Turn styling ideas into confirmable requests",
        paragraphs: [
          "List cake, flowers, balloons, decoration, dining, music and photography separately. A service image provides category context and does not establish what a supplier can provide.",
          "Ask for availability, supplier confirmation, lead time and separate pricing. Check every accepted element in the final written offer.",
        ],
      },
      {
        heading: "Keep the engagement plan operationally flexible",
        paragraphs: [
          "Submit a preferred date, timing and requested duration without relying on a particular departure point, route or landmark sequence.",
          "The final request should identify the chosen yacht, group size and optional details while leaving operational confirmation to the written booking process.",
        ],
      },
    ],
    bookingSteps: [
      "Create one complete engagement guest count.",
      "Compare published yacht capacity, price, length and minimum duration.",
      "State the preferred date and timing without assuming an itinerary.",
      "Submit each styling, catering, music or photography request separately for confirmation.",
    ],
    priceFactors: [
      "The selected yacht's verified hourly price.",
      "The requested booking hours and published minimum duration.",
      "The guest count and vessel size compared.",
      "Separately confirmed cake, styling, hospitality, music or photography suppliers.",
    ],
    faqs: [
      { question: "Is engagement decoration automatically arranged?", answer: "No. Decoration is an optional request requiring supplier availability and separate pricing in the final written offer." },
      { question: "Can I rely on cake or dining from the page image?", answer: "No. Images do not establish an inclusion, menu or supplier. Submit the request and wait for written confirmation." },
      { question: "How many guests can attend an engagement request?", answer: "Use the chosen yacht's verified capacity as the published maximum comparison limit, then submit the actual group for confirmation." },
      { question: "Is the engagement route combined with wedding parties?", answer: "No. This page keeps a distinct engagement intent. The historical combined route remains blocked and no redirect or consolidation is approved." },
    ],
    yachtIds: ["yacht-royal-majesty-50", "yacht-majesty-56", "yacht-majesty-88"],
    yachtSelectionNote: "The three records provide factual comparisons across group limits and hourly rates. They do not confirm engagement styling, catering, music or photography features.",
    relatedServiceIds: ["service-proposal", "service-wedding", "service-anniversary"],
    media: serviceMedia("english-home-service-engagement-001", "Engagement celebration setting for a private yacht request"),
  }),
  approved({
    id: "service-wedding",
    slug: "wedding-parties",
    path: "/services/wedding-parties",
    name: "Private Yacht Wedding Celebration",
    category: "celebration",
    availability: "on request and subject to confirmation",
    metadata: {
      title: "Wedding Yacht Party Dubai | Private Celebration Guide",
      description: "Plan a private yacht wedding celebration in Dubai as a requestable gathering, with yacht facts and optional suppliers confirmed separately.",
      h1: "Plan a Private Yacht Wedding Celebration in Dubai",
    },
    introduction: "This page covers a private yacht celebration or gathering connected with a wedding. It does not establish legal ceremony authority. Start with the full guest count and verified yacht comparison, then prepare any hospitality, styling, music or photography requests for separate supplier confirmation.",
    directAnswer: "A private yacht wedding celebration is on request and subject to confirmation. It is presented as a private gathering rather than a legally authorized ceremony, and decoration, cake, catering, flowers, music, photography and entertainment remain optional requests with separate pricing.",
    whoItIsFor: "This request is for a couple and invited private group planning a wedding-related yacht celebration or gathering, not for arranging a legally authorized ceremony.",
    suitableGroupTypes: [
      "A private wedding-related gathering with family and close guests.",
      "A larger private celebration that requires a verified higher-capacity yacht comparison.",
    ],
    optionalRequestBoundary: "Decoration, cake, catering, flowers, music, photography, dining, styling and entertainment are optional requests subject to availability, supplier confirmation and separate pricing unless the final written offer states otherwise.",
    sections: [
      {
        heading: "Treat the page as celebration planning, not ceremony authority",
        paragraphs: [
          "The request may concern a private gathering before or after a wedding, but this page does not claim authority to conduct or legalize a marriage ceremony.",
          "Any legal, officiant or ceremony requirement needs separate qualified advice and is not represented by the yacht service described here.",
        ],
      },
      {
        heading: "Use capacity and price to build a factual vessel shortlist",
        paragraphs: [
          "Count every guest, then compare that total with published yacht capacity. Review length, hourly price and minimum duration without inferring a floor plan or event equipment.",
          "The selection is a starting point for a request. The yacht, date, timing and compatibility with each optional detail remain subject to confirmation.",
        ],
      },
      {
        heading: "Confirm every celebration supplier separately",
        paragraphs: [
          "List decoration, cake, catering, flowers, music, photography, dining and entertainment individually. None is assumed from a wedding theme or image.",
          "Ask about supplier availability, access, lead time and separate price, and rely on the final written offer for accepted arrangements.",
        ],
      },
    ],
    bookingSteps: [
      "Define the private celebration or gathering without assuming legal ceremony capability.",
      "Confirm the full guest count and compare published yacht limits and prices.",
      "Prepare preferred timing and duration without relying on a pre-set route or departure.",
      "Submit each supplier and setup request separately and review the final written offer.",
    ],
    priceFactors: [
      "The chosen yacht's verified hourly rate.",
      "The requested hours and the vessel's published minimum duration.",
      "The group size and vessel size selected.",
      "Separately confirmed styling, hospitality, music, photography or entertainment suppliers.",
    ],
    faqs: [
      { question: "Does this service perform a legal wedding ceremony?", answer: "No legal ceremony authority is claimed. The page describes a requestable private yacht celebration or gathering only." },
      { question: "Are catering and decoration part of the yacht rate?", answer: "No. Catering and decoration are optional supplier requests requiring availability and separate-price confirmation." },
      { question: "Can a wedding gathering use a large yacht?", answer: "You may compare larger published capacity records, but the actual group, date and requested arrangements remain subject to confirmation." },
      { question: "Is the historical combined engagement and wedding page active?", answer: "No. That overlapping owner remains blocked, with no approved redirect or consolidation." },
    ],
    yachtIds: ["yacht-majesty-56", "yacht-majesty-88", "yacht-ocean-dream-143"],
    yachtSelectionNote: "These records span verified capacities for different group sizes. They do not establish ceremony authority, layouts, suppliers or wedding equipment.",
    relatedServiceIds: ["service-engagement", "service-anniversary", "service-proposal"],
    media: serviceMedia("english-home-service-wedding-001", "Wedding celebration setting for a private yacht request"),
  }),
  approved({
    id: "service-graduation",
    slug: "graduation-parties",
    path: "/services/graduation-parties",
    name: "Private Yacht Graduation Celebration",
    category: "celebration",
    availability: "on request and subject to confirmation",
    metadata: {
      title: "Graduation Yacht Party Dubai | Private Request Guide",
      description: "Plan a private graduation yacht request in Dubai by verified group capacity and price, with cake, decoration, music and photos optional.",
      h1: "Plan a Private Graduation Yacht Celebration in Dubai",
    },
    introduction: "A graduation gathering can be prepared accurately by separating the student group and yacht comparison from optional celebration ideas. Confirm every guest, compare verified capacity and price, and submit any cake, decoration, music, dining or photography request as a separate item.",
    directAnswer: "A private graduation yacht celebration is on request and subject to confirmation. The yacht and timing must be checked, while cake, decoration, music, dining, balloons and photography remain optional supplier requests with separate pricing.",
    whoItIsFor: "This request is for a graduate and a private group of family or friends who can provide the complete guest count before choosing a yacht.",
    suitableGroupTypes: [
      "A small graduation gathering with family or close friends.",
      "A medium or larger private graduation group matched to published yacht capacity.",
    ],
    optionalRequestBoundary: "Cake, decoration, music, dining, balloons, photography, styling and entertainment are optional requests subject to availability, supplier confirmation and separate pricing unless the final written offer states otherwise.",
    sections: [
      {
        heading: "Count the graduation group before comparing yachts",
        paragraphs: [
          "Include graduates, family members and friends in one complete number. Compare it with each yacht's published capacity rather than estimating from photographs.",
          "Review the hourly rate, minimum duration and length for budget and size context. These facts do not confirm event equipment or a celebration layout.",
        ],
      },
      {
        heading: "Keep graduation additions optional and itemized",
        paragraphs: [
          "Describe cake, balloons, decoration, music, dining and photography separately. Nothing is assumed simply because a graduation request is accepted for review.",
          "Ask about supplier availability, lead time and separate price. Check the final written offer before planning around an addition.",
        ],
      },
      {
        heading: "Prepare a flexible timing request",
        paragraphs: [
          "State the preferred date, start time and requested hours while respecting the selected yacht's minimum duration. No fixed itinerary or landmark coverage is published.",
          "A careful request combines verified vessel facts with an explicit optional list, allowing each operational detail to be confirmed without overpromising.",
        ],
      },
    ],
    bookingSteps: [
      "Create one complete guest count for graduates, family and friends.",
      "Compare published yachts by capacity, hourly price, length and minimum duration.",
      "Prepare a date and timing request without assuming a route or departure point.",
      "List cake, decoration, music, dining and photography separately for confirmation.",
    ],
    priceFactors: [
      "The published hourly rate of the selected yacht.",
      "The requested number of hours and the yacht's minimum duration.",
      "The complete group size and vessel size selected.",
      "Separately confirmed cake, styling, hospitality, music or photography suppliers.",
    ],
    faqs: [
      { question: "Does a graduation request come with cake or balloons?", answer: "No. Cake and balloons are optional requests requiring supplier availability and separate-price confirmation." },
      { question: "Can students choose a yacht by the group size?", answer: "Yes, compare the complete group with verified capacity, but the actual yacht and date remain on request and subject to confirmation." },
      { question: "Is music or photography confirmed by this page?", answer: "No. Both are optional supplier requests and must appear in the final written offer before you rely on them." },
      { question: "Does the graduation service follow a set route?", answer: "No pre-set route, departure point or landmark sequence is published. Submit preferences for operational confirmation." },
    ],
    yachtIds: ["yacht-royal-majesty-50", "yacht-majesty-56", "yacht-doretty-90"],
    yachtSelectionNote: "The selected records compare verified capacity and hourly-rate ranges for different group sizes. They do not verify graduation equipment, styling or supplier access.",
    relatedServiceIds: ["service-birthday", "service-bachelor", "service-engagement"],
    media: serviceMedia("english-home-service-graduation-001", "Graduation celebration setting for a private yacht request"),
  }),
  approved({
    id: "service-bachelor",
    slug: "bachelor-parties",
    path: "/services/bachelor-parties",
    name: "Private Yacht Bachelor Gathering",
    category: "celebration",
    availability: "on request and subject to confirmation",
    metadata: {
      title: "Bachelor Yacht Party Dubai | Respectful Private Planning",
      description: "Plan a respectful private bachelor yacht gathering in Dubai using verified yacht facts, with conduct, music and setup requests confirmed.",
      h1: "Plan a Respectful Private Bachelor Yacht Gathering in Dubai",
    },
    introduction: "A bachelor gathering can be planned as a respectful private group experience without adult-entertainment implications. Start with the complete guest count and published yacht limits, then describe music, setup, dining or entertainment preferences as optional requests governed by yacht rules and confirmation.",
    directAnswer: "A private bachelor yacht gathering is on request and subject to confirmation. Choose a yacht by verified capacity, price and minimum duration; conduct, music, setup, dining and entertainment requests remain subject to yacht rules, availability, supplier confirmation and separate pricing.",
    whoItIsFor: "This request is for friends planning a respectful private bachelor gathering and willing to follow the selected yacht's conduct rules and confirmation process.",
    suitableGroupTypes: [
      "A small private group comparing yachts by verified price and capacity.",
      "A larger group whose complete guest count fits a published yacht limit.",
    ],
    optionalRequestBoundary: "Music, setup, dining, styling, photography and entertainment are optional requests subject to yacht rules, availability, supplier confirmation and separate pricing unless the final written offer states otherwise.",
    sections: [
      {
        heading: "Plan a private gathering with respectful expectations",
        paragraphs: [
          "This page supports a private group celebration and does not suggest adult entertainment. Guests remain responsible for conduct that follows the confirmed yacht rules.",
          "Describe the group and preferred atmosphere clearly so that music, setup and other requests can be reviewed before the date.",
        ],
      },
      {
        heading: "Compare yacht limits before discussing setup",
        paragraphs: [
          "Use the full guest count against verified capacity, then compare hourly price, length and minimum duration. No sound equipment, layout or entertainment feature is inferred.",
          "A factual shortlist allows the request to be evaluated without claiming that a particular yacht supports an unverified setup.",
        ],
      },
      {
        heading: "Confirm music, dining and entertainment separately",
        paragraphs: [
          "List each optional request and ask whether it complies with yacht rules, supplier availability and operating requirements. No item is assumed from the page title.",
          "Request separate pricing and rely only on the final written offer for accepted details, timing and any applicable restrictions.",
        ],
      },
    ],
    bookingSteps: [
      "Confirm the complete guest count and the respectful private-gathering purpose.",
      "Compare published yacht capacity, rate, length and minimum duration.",
      "Prepare preferred timing and duration without assuming a route or departure point.",
      "Submit music, conduct, setup, dining and entertainment questions for written confirmation.",
    ],
    priceFactors: [
      "The selected yacht's verified hourly price.",
      "The requested hours and published minimum duration.",
      "The group size and yacht size compared.",
      "Any separately confirmed setup, music, dining, photography or entertainment supplier.",
    ],
    faqs: [
      { question: "Does this page promote adult entertainment?", answer: "No. It describes a respectful private group gathering, with conduct and setup subject to yacht rules and confirmation." },
      { question: "Is music automatically available for a bachelor gathering?", answer: "No music feature is assumed. Submit the request so compatibility, rules, availability and separate pricing can be checked." },
      { question: "How should a bachelor group choose a yacht?", answer: "Compare complete guest count with verified capacity, then review hourly price, minimum duration and length. No event equipment is implied." },
      { question: "Can the gathering be confirmed immediately?", answer: "No. The service is on request and subject to confirmation, including the yacht, date, conduct expectations and optional requests." },
    ],
    yachtIds: ["yacht-majesty-56", "yacht-sunseeker-90", "yacht-doretty-95"],
    yachtSelectionNote: "These records compare verified capacities, rates and minimum durations for different group sizes. They do not establish music, event equipment, setup or entertainment capability.",
    relatedServiceIds: ["service-birthday", "service-graduation", "service-morning-trip"],
  }),
  approved({
    id: "service-afternoon-tea",
    slug: "afternoon-tea-trip",
    path: "/services/afternoon-tea-trip",
    name: "Private Yacht Afternoon Tea Request",
    category: "hospitality",
    availability: "on request and subject to confirmation",
    metadata: {
      title: "Afternoon Tea Yacht Dubai | Private Hospitality Request",
      description: "Prepare a private yacht afternoon tea request in Dubai, with yacht facts verified and menu, supplier, lead time and price confirmed separately.",
      h1: "Plan a Private Yacht Afternoon Tea Request in Dubai",
    },
    introduction: "An afternoon tea idea is published here only as a requestable private yacht hospitality experience. Choose the yacht from verified capacity, price and duration fields, then ask whether a menu and supplier can be arranged for the preferred date rather than relying on a standard offering.",
    directAnswer: "A private yacht afternoon tea experience is on request and subject to confirmation. Tea service is not assumed in the yacht price; the menu, supplier, dietary questions, lead time and separate price must be confirmed in the final written offer.",
    whoItIsFor: "This request is for a couple or private small group interested in asking whether an afternoon hospitality arrangement can be confirmed separately for a selected yacht.",
    suitableGroupTypes: [
      "A couple requesting a private afternoon yacht experience.",
      "A small family or friends group within the selected yacht's published capacity.",
    ],
    optionalRequestBoundary: "Afternoon tea, menu items, dining setup, flowers, styling and photography are optional requests subject to availability, supplier confirmation, lead time and separate pricing unless the final written offer states otherwise.",
    sections: [
      {
        heading: "Choose the vessel before requesting hospitality",
        paragraphs: [
          "Compare the full group with published yacht capacity, then review hourly price, length and minimum duration. Those facts do not confirm dining furniture, serviceware or hospitality staff.",
          "Shortlisting by verified facts creates a clear vessel request before menu and supplier questions are introduced.",
        ],
      },
      {
        heading: "Ask for a menu and supplier instead of assuming one",
        paragraphs: [
          "No fixed tea selection or menu item is published. State any dietary question and ask what a confirmed supplier can provide for the date and group.",
          "Menu, supplier, lead time and separate price all require confirmation. Do not assume preparation occurs onboard.",
        ],
      },
      {
        heading: "Prepare time preferences without a fixed trip plan",
        paragraphs: [
          "Afternoon describes the requested timing, not a confirmed departure, route, duration or landmark sequence. The requested hours must also meet the yacht's published minimum.",
          "A complete request combines yacht, group, date, timing and hospitality questions so each element can be answered in writing.",
        ],
      },
    ],
    bookingSteps: [
      "Confirm the complete afternoon-tea group size.",
      "Compare published yacht capacity, rate, length and minimum duration.",
      "Prepare the preferred date and afternoon timing without assuming an itinerary.",
      "Request menu, supplier, dietary, lead-time and separate-price details in writing.",
    ],
    priceFactors: [
      "The verified hourly rate of the selected yacht.",
      "The requested hours and the yacht's minimum duration.",
      "The full group size and vessel size selected.",
      "A separately confirmed hospitality supplier, menu and any optional styling.",
    ],
    faqs: [
      { question: "Is afternoon tea part of the yacht's hourly price?", answer: "No tea service is assumed. Menu, supplier, lead time and separate price must be confirmed in writing." },
      { question: "Is there a published afternoon tea menu?", answer: "No fixed menu is published. Submit dietary questions and wait for the available supplier options and prices." },
      { question: "Will afternoon tea be prepared onboard?", answer: "No onboard-cooking or preparation promise is made. The supplier and service method require confirmation." },
      { question: "Does afternoon tea follow a set route?", answer: "No. Afternoon is a timing preference; departure, route, duration and operational details remain subject to confirmation." },
    ],
    yachtIds: ["yacht-azimut-42", "yacht-majesty-44", "yacht-azimut-55"],
    yachtSelectionNote: "These records compare verified small-group capacity, rate, size and minimum duration. They do not confirm a menu, dining setup or hospitality supplier.",
    relatedServiceIds: ["service-barbecue", "service-morning-trip", "service-anniversary"],
  }),
  approved({
    id: "service-morning-trip",
    slug: "morning-yacht-trips",
    path: "/services/morning-yacht-trips",
    name: "Private Morning Yacht Experience",
    category: "private-experience",
    availability: "on request and subject to confirmation",
    metadata: {
      title: "Morning Yacht Trip Dubai | Private Experience Planning",
      description: "Plan a private morning yacht request in Dubai by verified yacht capacity, price and duration without assuming breakfast, route or activities.",
      h1: "Plan a Private Morning Yacht Experience in Dubai",
    },
    introduction: "A morning yacht trip is treated as a timing preference for a private experience, not a fixed itinerary or package. Compare published yacht facts for the complete group, choose a requested duration that respects the vessel minimum, and list breakfast or other hospitality ideas separately if you want them checked.",
    directAnswer: "A private morning yacht experience is on request and subject to confirmation. No fixed departure point, route, duration, breakfast, tea or activity is promised; hospitality requests require menu, supplier, lead-time and separate-price confirmation.",
    whoItIsFor: "This request is for a couple, family or private group that prefers a morning timing request and can keep route, departure and hospitality details open until confirmation.",
    suitableGroupTypes: [
      "A couple or small group comparing a private morning timing request.",
      "A family or friends group whose complete count fits the selected yacht's published capacity.",
    ],
    optionalRequestBoundary: "Breakfast, tea, dining, photography, music and other hospitality or entertainment ideas are optional requests subject to availability, supplier confirmation, lead time and separate pricing unless the final written offer states otherwise.",
    sections: [
      {
        heading: "Use morning as a requested time, not an itinerary",
        paragraphs: [
          "State the preferred date and morning start window, but do not rely on a particular departure point, route, landmark sequence or water condition.",
          "Operational timing and the requested hours remain subject to confirmation, and the duration must meet the chosen yacht's verified minimum.",
        ],
      },
      {
        heading: "Compare yachts by the facts the fleet publishes",
        paragraphs: [
          "Use complete guest count, capacity, hourly price, minimum duration and length to build a shortlist. None of these fields proves a breakfast service, activity or route.",
          "Choose the comparison that fits the group and budget, then submit the specific date and requested time for confirmation.",
        ],
      },
      {
        heading: "Treat breakfast and other additions as separate requests",
        paragraphs: [
          "No breakfast, tea or dining item is assumed. If hospitality is requested, ask for the menu, supplier, lead time, service method and separate price.",
          "Do not assume food is prepared onboard. Rely only on the final written offer for any accepted hospitality or entertainment detail.",
        ],
      },
    ],
    bookingSteps: [
      "Confirm the full morning-trip guest count.",
      "Compare verified capacity, hourly price, length and minimum duration.",
      "Prepare a preferred date, morning start window and requested hours.",
      "List breakfast, tea or other optional requests separately for written confirmation.",
    ],
    priceFactors: [
      "The selected yacht's verified hourly rate.",
      "The requested hours and the yacht's published minimum duration.",
      "The complete group size and yacht size compared.",
      "Any separately confirmed menu, hospitality supplier or optional arrangement.",
    ],
    faqs: [
      { question: "Does a morning yacht request include breakfast?", answer: "No breakfast is assumed. Menu, supplier, lead time, service method and separate price require confirmation." },
      { question: "Is a morning route already decided?", answer: "No pre-set route, departure point or landmark sequence is published. Morning is a requested time subject to operational confirmation." },
      { question: "Can I request more than the minimum duration?", answer: "You may submit a longer requested duration. The chosen yacht, date, timing and total hours still require confirmation." },
      { question: "Are morning water activities offered?", answer: "No activity capability is claimed on this page. Swimming, fishing and water-activity detail owners remain blocked." },
    ],
    yachtIds: ["yacht-royal-majesty-50", "yacht-azimut-55", "yacht-sunseeker-92"],
    yachtSelectionNote: "These records compare verified capacities, hourly rates and minimum durations. They do not confirm a morning route, breakfast, tea or activity.",
    relatedServiceIds: ["service-afternoon-tea", "service-barbecue", "service-proposal"],
  }),
  approved({
    id: "service-barbecue",
    slug: "barbecue-on-the-yacht",
    path: "/services/barbecue-on-the-yacht",
    name: "Private Yacht Barbecue Request",
    category: "hospitality",
    availability: "on request and subject to confirmation",
    metadata: {
      title: "Yacht BBQ Dubai | Private Hospitality Request",
      description: "Prepare a private yacht BBQ request in Dubai with verified yacht choices and menu, supplier, lead time, service method and price confirmed.",
      h1: "Plan a Private Yacht Barbecue Request in Dubai",
    },
    introduction: "A barbecue idea is published only as a requestable private yacht hospitality option. Select a yacht using verified capacity, hourly price and minimum duration, then ask whether a menu and supplier can be confirmed for the chosen date instead of assuming food or cooking forms part of the vessel booking.",
    directAnswer: "A private yacht barbecue request is on request and subject to confirmation. BBQ is not assumed in the yacht price, onboard cooking is not promised, and the menu, supplier, lead time, service method and separate price must be confirmed in writing.",
    whoItIsFor: "This request is for a private group that wants to ask whether separate barbecue hospitality can be arranged for a selected yacht without assuming food or cooking is part of the vessel price.",
    suitableGroupTypes: [
      "A family or friends group comparing yachts by verified capacity and rate.",
      "A private celebration group requesting a separately confirmed hospitality arrangement.",
    ],
    optionalRequestBoundary: "BBQ, catering, menu items, dining setup, music, photography and styling are optional requests subject to availability, supplier confirmation, lead time and separate pricing unless the final written offer states otherwise.",
    sections: [
      {
        heading: "Shortlist the yacht before discussing a barbecue supplier",
        paragraphs: [
          "Compare the complete group with the published capacity, then review length, hourly price and minimum duration. No cooking equipment or dining setup is inferred from those facts.",
          "The three yacht links provide a factual range for comparison only; actual compatibility with the hospitality request needs confirmation.",
        ],
      },
      {
        heading: "Confirm menu, supplier and service method",
        paragraphs: [
          "No fixed BBQ menu is published. Submit dietary questions and ask which supplier, menu and lead time may be available for the date.",
          "Do not assume food is prepared onboard. Ask how the confirmed service would be supplied and what separate price applies.",
        ],
      },
      {
        heading: "Keep route and timing outside the food promise",
        paragraphs: [
          "A BBQ request does not establish a fixed departure point, route, landmark sequence or service duration. Submit the preferred timing and hours as part of the wider yacht request.",
          "Rely on the final written offer for the yacht, date, timing and every accepted hospitality detail.",
        ],
      },
    ],
    bookingSteps: [
      "Confirm the complete group size for the private hospitality request.",
      "Compare verified yacht capacity, hourly price, length and minimum duration.",
      "Prepare the preferred date, timing and requested hours without assuming a route.",
      "Request menu, supplier, dietary, lead-time, service-method and price details in writing.",
    ],
    priceFactors: [
      "The verified hourly rate of the selected yacht.",
      "The requested hours and the yacht's minimum duration.",
      "The group size and vessel size chosen.",
      "A separately confirmed BBQ supplier, menu, service method and optional setup.",
    ],
    faqs: [
      { question: "Is BBQ part of the yacht's hourly price?", answer: "No BBQ service is assumed. Menu, supplier, lead time, method and separate price must appear in the final written offer." },
      { question: "Will food be cooked onboard?", answer: "No onboard-cooking promise is made. The confirmed supplier and service method determine how any accepted request is handled." },
      { question: "Is there a standard barbecue menu?", answer: "No fixed menu is published. Submit dietary questions and wait for available supplier options and separate prices." },
      { question: "Does a BBQ request guarantee a particular route?", answer: "No. The hospitality idea does not establish a route, departure point, landmark sequence or duration." },
    ],
    yachtIds: ["yacht-majesty-44", "yacht-majesty-56", "yacht-doretty-90"],
    yachtSelectionNote: "These records compare verified capacity, size, price and minimum duration. They do not confirm cooking equipment, dining setup, a menu or a supplier.",
    relatedServiceIds: ["service-afternoon-tea", "service-morning-trip", "service-birthday"],
    media: serviceMedia("english-home-service-barbecue-001", "Barbecue hospitality setting for a private yacht request"),
  }),
] as const;

export const approvedServiceIds = new Set(approvedServices.map((service) => service.id));
export const approvedServicePaths = new Set(approvedServices.map((service) => service.path));

export const getApprovedServiceBySlug = (slug: string | undefined) =>
  approvedServices.find((service) => service.slug === slug);

export const getApprovedServiceById = (id: string) =>
  approvedServices.find((service) => service.id === id);

export const assertApprovedServiceRegistryIntegrity = () => {
  if (approvedServices.length !== 10) throw new Error(`Expected 10 owner-approved services; found ${approvedServices.length}.`);
  const ids = approvedServices.map((service) => service.id);
  const paths = approvedServices.map((service) => service.path);
  const slugs = approvedServices.map((service) => service.slug);
  const titles = approvedServices.map((service) => service.metadata.title.toLowerCase());
  const descriptions = approvedServices.map((service) => service.metadata.description.toLowerCase());
  const h1s = approvedServices.map((service) => service.metadata.h1.toLowerCase());
  [ids, paths, slugs, titles, descriptions, h1s].forEach((values) => {
    if (new Set(values).size !== values.length) throw new Error("Approved service ownership fields must be unique.");
  });

  const yachtIds = new Set(publishableYachts.map((yacht) => yacht.id));
  const serviceIds = new Set(ids);
  approvedServices.forEach((service) => {
    service.yachtIds.forEach((id) => {
      if (!yachtIds.has(id)) throw new Error(`${service.path}: yacht selection is not currently publishable: ${id}`);
    });
    service.relatedServiceIds.forEach((id) => {
      if (!serviceIds.has(id)) throw new Error(`${service.path}: related service is not approved: ${id}`);
    });
  });

  const textOnly = approvedServices.filter((service) => !service.media).map((service) => service.path).sort();
  const expectedTextOnly = [
    "/services/afternoon-tea-trip",
    "/services/bachelor-parties",
    "/services/morning-yacht-trips",
  ].sort();
  if (JSON.stringify(textOnly) !== JSON.stringify(expectedTextOnly)) {
    throw new Error("Only bachelor, afternoon-tea and morning-trip pages may be text-only in PR 6B.");
  }
};

assertApprovedServiceRegistryIntegrity();
