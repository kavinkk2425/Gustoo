export interface Coordinator {
  name: string;
  phone: string;
  role?: string;
}

export interface EventRuleRound {
  title: string;
  description?: string;
  rules: string[];
}

export type EventRules = string[] | {
  round1?: EventRuleRound;
  round2?: EventRuleRound;
  general?: {
    title: string;
    rules: string[];
  };
};

export interface GustoEvent {
  id: string;
  title: string;
  category: "Technical" | "Non-Technical";
  subCategory: "Group / Abstract" | "Individual / Direct" | "Online Submission" | "Offline Interactive";
  eventType: "ABSTRACT" | "DIRECT" | "SUBMISSION";
  date: string;
  time: string;
  venue: string;
  description: string;
  teamSize: string;
  rules: EventRules;
  coordinators: Coordinator[];
  image: string;
  submissionName?: string;
  submissionEmail?: string;
  registrationDeadline: string;
  isSlotsFull?: boolean;
  onSpotRegistrationAvailable: boolean;
}

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  phone: string;
  category: "Secretary" | "Registration Coordinator" | "Staff Advisor" | "Event Coordinator";
  initials: string;
  email?: string;
}

export interface BusEntry {
  time: string;
  type: string;
  destination: string;
}

export interface BusRoute {
  location: string;
  buses: BusEntry[];
  stopName: string;
  distance: string;
  duration: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category?: "symposium" | "ceremony" | "events" | "campus";
}

export interface AboutInfo {
  symposiumName: string;
  edition: string;
  tagline: string;
  institution: string;
  formerlyKnownAs: string;
  department: string;
  eventDate: string;
  registrationLastDate: string;
  registrationFee: number;
  contactEmail: string;
  instagram: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  description: string;
  highlights: string[];
  venueAddress: {
    campus: string;
    road: string;
    district: string;
    state: string;
    pincode: string;
  };
}

export interface YouTubeMedia {
  channelUrl: string;
  channelName: string;
  featuredVideoId: string;
  title: string;
  embedUrl: string;
  description: string;
}
