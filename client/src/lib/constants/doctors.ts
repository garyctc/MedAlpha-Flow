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
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    clinics: [1, 2],
  },
  {
    id: '2',
    name: "Dr. Michael Chen",
    specialty: "General Practice",
    rating: 4.7,
    nextAvailable: "Today",
    availableToday: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
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
