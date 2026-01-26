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
    image: null,
    clinics: [1, 2],
  },
  {
    id: '2',
    name: "Dr. Michael Chen",
    specialty: "General Practice",
    rating: 4.7,
    nextAvailable: "Today",
    availableToday: true,
    image: null,
    clinics: [1],
  },
  {
    id: '3',
    name: "Dr. Sarah Weber",
    specialty: "General Practice",
    rating: 4.9,
    nextAvailable: "Tomorrow",
    availableToday: false,
    image: null,
    clinics: [2, 3],
  },
  {
    id: '4',
    name: "Dr. Thomas Müller",
    specialty: "General Practice",
    rating: 4.5,
    nextAvailable: "Today",
    availableToday: true,
    image: null,
    clinics: [3],
  },
];
