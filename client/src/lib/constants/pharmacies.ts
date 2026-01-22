// Pharmacy constants for the pharmacy finder feature

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  distance: string;
  distanceKm: number;
  status: "Open" | "Closed" | "24 Hours";
  statusColor: string;
  hours: string;
  hoursDetail: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  is24Hour: boolean;
  hasDelivery: boolean;
  openUntil: number; // Hour in 24h format when it closes today
}

export const PHARMACIES: Pharmacy[] = [
  {
    id: "1",
    name: "Apotheke am Markt",
    address: "Marktstraße 15",
    city: "Berlin",
    postalCode: "10115",
    distance: "0.3 km",
    distanceKm: 0.3,
    status: "Open",
    statusColor: "text-emerald-700 bg-emerald-50",
    hours: "Open until 7:00 PM",
    hoursDetail: {
      weekday: "8:00 AM - 7:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    rating: 4.6,
    reviews: 42,
    phone: "030 1234567",
    email: "info@apotheke-markt.de",
    is24Hour: false,
    hasDelivery: true,
    openUntil: 19
  },
  {
    id: "2",
    name: "Stadt-Apotheke",
    address: "Hauptstraße 8",
    city: "Berlin",
    postalCode: "10117",
    distance: "0.7 km",
    distanceKm: 0.7,
    status: "Open",
    statusColor: "text-emerald-700 bg-emerald-50",
    hours: "Open until 6:30 PM",
    hoursDetail: {
      weekday: "8:30 AM - 6:30 PM",
      saturday: "9:00 AM - 1:00 PM",
      sunday: "Closed"
    },
    rating: 4.2,
    reviews: 28,
    phone: "030 2345678",
    email: "info@stadt-apotheke.de",
    is24Hour: false,
    hasDelivery: false,
    openUntil: 18
  },
  {
    id: "3",
    name: "Nacht-Apotheke",
    address: "Bahnhofstraße 22",
    city: "Berlin",
    postalCode: "10119",
    distance: "1.2 km",
    distanceKm: 1.2,
    status: "24 Hours",
    statusColor: "text-blue-700 bg-blue-50",
    hours: "Always Open",
    hoursDetail: {
      weekday: "24 Hours",
      saturday: "24 Hours",
      sunday: "24 Hours"
    },
    rating: 4.0,
    reviews: 156,
    phone: "030 3456789",
    email: "info@nacht-apotheke.de",
    is24Hour: true,
    hasDelivery: true,
    openUntil: 24
  },
  {
    id: "4",
    name: "Sonnen-Apotheke",
    address: "Sonnenallee 45",
    city: "Berlin",
    postalCode: "12045",
    distance: "1.8 km",
    distanceKm: 1.8,
    status: "Closed",
    statusColor: "text-red-700 bg-red-50",
    hours: "Opens 8:00 AM tomorrow",
    hoursDetail: {
      weekday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 12:00 PM",
      sunday: "Closed"
    },
    rating: 4.8,
    reviews: 89,
    phone: "030 4567890",
    email: "info@sonnen-apotheke.de",
    is24Hour: false,
    hasDelivery: true,
    openUntil: 18
  }
];

// Helper to check if pharmacy is currently open (simplified for prototype)
export function isPharmacyOpen(pharmacy: Pharmacy): boolean {
  if (pharmacy.is24Hour) return true;
  const currentHour = new Date().getHours();
  return currentHour >= 8 && currentHour < pharmacy.openUntil;
}

// Get pharmacy by ID
export function getPharmacyById(id: string): Pharmacy | undefined {
  return PHARMACIES.find(p => p.id === id);
}
