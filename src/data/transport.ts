export interface TransportRouteInfo {
  origin: string;
  distance: string;
  typicalDuration: string;
  notes: string;
  connectivity: string;
}

export interface TransportData {
  collegeName: string;
  formerlyKnownAs: string;
  address: {
    campus: string;
    road: string;
    district: string;
    state: string;
    pincode: string;
    googleMapsUrl: string;
  };
  collegeBusNotice: string;
  transitHubs: TransportRouteInfo[];
  generalAdvice: string[];
}

export const TRANSPORT_DATA: TransportData = {
  collegeName: "Government College of Engineering, Erode",
  formerlyKnownAs: "Institute of Road and Transport Technology (IRTT)",
  address: {
    campus: "Government College of Engineering, Erode (GCEE)",
    road: "Suriyampalayam, Chithode",
    district: "Erode",
    state: "Tamil Nadu",
    pincode: "638316",
    googleMapsUrl: "https://maps.google.com/?q=Government+College+of+Engineering+Erode",
  },
  collegeBusNotice:
    "Comprehensive college bus facilities are arranged from Erode, Chithode, and Bhavani for symposium participants.",
  transitHubs: [
    {
      origin: "Erode Central Bus Stand",
      distance: "~13 km",
      typicalDuration: "25 - 35 mins",
      connectivity: "Regular government & town buses via Chithode / Bhavani route to Suriyampalayam stop.",
      notes: "Frequent bus services available towards Bhavani and Salem stopping directly near the college campus.",
    },
    {
      origin: "Erode Junction Railway Station (ED)",
      distance: "~14 km",
      typicalDuration: "30 - 40 mins",
      connectivity: "Direct town buses to Central Bus Stand, and connecting buses toward GCEE campus.",
      notes: "Major rail junction with connections to Chennai, Coimbatore, Bangalore, Trichy, and Madurai.",
    },
    {
      origin: "Chithode Junction",
      distance: "~2.5 km",
      typicalDuration: "5 - 10 mins",
      connectivity: "Connecting hub on NH 544 (Salem - Kochi Highway).",
      notes: "Quick auto-rickshaws and local bus frequency directly to college gate at Suriyampalayam.",
    },
    {
      origin: "Bhavani Bus Stand",
      distance: "~6 km",
      typicalDuration: "10 - 15 mins",
      connectivity: "Direct buses running towards Erode via Suriyampalayam / GCEE campus.",
      notes: "Convenient transit point for delegates arriving from Mettur, Anthiyur, and Gobichettipalayam.",
    },
  ],
  generalAdvice: [
    "Participants can disembark at the Suriyampalayam / GCEE College Bus Stop directly on the main highway.",
    "Student volunteer transport helpdesks will guide participants upon arrival at the campus entrance.",
    "For emergency transit guidance on event day, contact the student registration desk coordinators.",
  ],
};
