import { ContactPerson } from "./types";
import { GUSTO_EVENTS } from "./events";

export const CORE_CONTACTS: ContactPerson[] = [
  {
    id: "sec-1",
    name: "SANTHAKUMARAN C",
    role: "Student Secretary",
    phone: "+91 9626202811",
    category: "Secretary",
    initials: "SC",
    email: "gustoitgcee@gmail.com",
  },
  {
    id: "sec-2",
    name: "SORNA MALLIKA M",
    role: "Student Secretary",
    phone: "+91 8015754245",
    category: "Secretary",
    initials: "SM",
    email: "gustoitgcee@gmail.com",
  },
  {
    id: "reg-1",
    name: "MURUGANANTHAM R",
    role: "Registration Coordinator",
    phone: "+91 7418024057",
    category: "Registration Coordinator",
    initials: "MR",
    email: "gustoitgcee@gmail.com",
  },
  {
    id: "reg-2",
    name: "MAHADHARSHINI P",
    role: "Registration Coordinator",
    phone: "+91 8122720771",
    category: "Registration Coordinator",
    initials: "MP",
    email: "gustoitgcee@gmail.com",
  },
];

// Dynamically generate all event coordinators from the centralized event data
export const EVENT_CONTACTS = GUSTO_EVENTS.flatMap((event) =>
  event.coordinators.map((c, idx) => ({
    id: `${event.id}-coord-${idx}`,
    name: c.name,
    role: `${event.title} Coordinator`,
    phone: c.phone.startsWith("+91") ? c.phone : `+91 ${c.phone}`,
    category: "Event Coordinator" as const,
    initials: c.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    eventName: event.title,
    eventId: event.id,
  }))
);

export const ALL_CONTACTS = [...CORE_CONTACTS, ...EVENT_CONTACTS];
