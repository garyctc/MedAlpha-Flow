// Default doctor avatar for fallback when no image is available
export const DEFAULT_DOCTOR_AVATAR = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=face";

// Male and female fallback avatars for unknown doctors
export const MALE_DOCTOR_AVATAR = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face";
export const FEMALE_DOCTOR_AVATAR = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  nextAvailable: string;
  availableToday: boolean;
  image: string | null;
  clinics: number[];
}

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: "Dr. Anna Schmidt",
    specialty: "General Practice",
    rating: 4.8,
    nextAvailable: "Tomorrow",
    availableToday: false,
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&h=150&fit=crop&crop=face",
    clinics: [1, 2],
  },
  {
    id: '2',
    name: "Dr. Michael Chen",
    specialty: "General Practice",
    rating: 4.7,
    nextAvailable: "Today",
    availableToday: true,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=face",
    clinics: [1],
  },
  {
    id: '3',
    name: "Dr. Sarah Weber",
    specialty: "General Practice",
    rating: 4.9,
    nextAvailable: "Tomorrow",
    availableToday: false,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face",
    clinics: [2, 3],
  },
  {
    id: '4',
    name: "Dr. Thomas Müller",
    specialty: "General Practice",
    rating: 4.5,
    nextAvailable: "Today",
    availableToday: true,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face",
    clinics: [3],
  },
];

/**
 * Find a doctor by name (partial match supported).
 * Returns the doctor object or undefined if not found.
 */
export function findDoctorByName(name: string): Doctor | undefined {
  const normalizedName = name.toLowerCase().replace(/^dr\.?\s*/i, '').trim();
  return DOCTORS.find(doc => {
    const docName = doc.name.toLowerCase().replace(/^dr\.?\s*/i, '').trim();
    return docName.includes(normalizedName) || normalizedName.includes(docName.split(' ')[0]);
  });
}

/**
 * Get doctor avatar by name. Falls back to gender-appropriate avatar.
 * Female names: Anna, Sarah, Maria, Lisa, Laura, Julia
 * Male names: Michael, Thomas, Peter, Hans, Max, Felix
 */
export function getDoctorAvatar(name: string): string {
  const doctor = findDoctorByName(name);
  if (doctor?.image) return doctor.image;

  // Gender detection based on common German first names
  const femaleNames = ['anna', 'sarah', 'maria', 'lisa', 'laura', 'julia', 'weber', 'schmidt'];
  const normalizedName = name.toLowerCase();

  const isFemale = femaleNames.some(fn => normalizedName.includes(fn));
  return isFemale ? FEMALE_DOCTOR_AVATAR : MALE_DOCTOR_AVATAR;
}

/**
 * Get a random doctor from the list
 */
export function getRandomDoctor(): Doctor {
  return DOCTORS[Math.floor(Math.random() * DOCTORS.length)];
}

export interface Clinic {
  id: number;
  name: string;
  address: string;
  distance: string;
  distanceKm: number;
  rating: number;
  reviews: number;
}

export const CLINICS: Clinic[] = [
  {
    id: 1,
    name: "DocliQ Health Center",
    address: "Friedrichstraße 123, Berlin",
    distance: "1.2 km",
    distanceKm: 1.2,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "MedCore Health Center",
    address: "Alexanderplatz 5, Berlin",
    distance: "2.5 km",
    distanceKm: 2.5,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "City West Medical",
    address: "Kurfürstendamm 22, Berlin",
    distance: "4.1 km",
    distanceKm: 4.1,
    rating: 4.9,
    reviews: 210
  }
];

/**
 * Get clinic name by ID
 */
export function getClinicName(clinicId: number): string {
  return CLINICS.find(c => c.id === clinicId)?.name || `Clinic ${clinicId}`;
}

/**
 * Get clinic names for a list of clinic IDs
 */
export function getClinicNames(clinicIds: number[]): string {
  return clinicIds.map(id => getClinicName(id)).join(", ");
}
