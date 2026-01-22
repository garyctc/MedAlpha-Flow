export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  nextAvailable: string;
  availableToday: boolean;
  image: string | null;
}

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: "Dr. Anna Schmidt",
    specialty: "General Practice",
    rating: 4.8,
    nextAvailable: "Tomorrow, 9:00 AM",
    availableToday: false,
    image: null
  },
  {
    id: '2',
    name: "Dr. Michael Chen",
    specialty: "General Practice",
    rating: 4.7,
    nextAvailable: "Today, 4:30 PM",
    availableToday: true,
    image: null
  },
  {
    id: '3',
    name: "Dr. Sarah Weber",
    specialty: "General Practice",
    rating: 4.9,
    nextAvailable: "Tomorrow, 10:00 AM",
    availableToday: false,
    image: null
  },
  {
    id: '4',
    name: "Dr. Thomas Müller",
    specialty: "General Practice",
    rating: 4.5,
    nextAvailable: "Today, 2:00 PM",
    availableToday: true,
    image: null
  },
];
