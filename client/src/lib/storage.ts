// localStorage management utilities with demo data seeding

import type {
  UserProfile,
  UserInsurance,
  Appointment,
  BookingDraft,
  RegistrationDraft,
} from '@/types/storage';

// Storage keys
const KEYS = {
  PROFILE: 'user-profile',
  INSURANCE: 'user-insurance',
  APPOINTMENTS: 'user-appointments',
  BOOKING_DRAFT: 'booking-draft',
  REGISTRATION_DRAFT: 'registration-draft',
  // Legacy keys for migration
  LEGACY_ADDRESS: 'user-address',
  LEGACY_INSURANCE_TYPE: 'user-insurance-type',
} as const;

// === Profile Management ===

export function getUserProfile(): UserProfile | null {
  // Check for migration needed
  migrateLegacyData();

  const data = localStorage.getItem(KEYS.PROFILE);
  if (!data) return null;

  try {
    return JSON.parse(data) as UserProfile;
  } catch {
    return null;
  }
}

export function saveUserProfile(profile: Partial<UserProfile>): void {
  const existing = getUserProfile();
  const merged = { ...existing, ...profile };
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(merged));
}

// === Insurance Management ===

export function getUserInsurance(): UserInsurance | null {
  const data = localStorage.getItem(KEYS.INSURANCE);
  if (!data) return null;

  try {
    return JSON.parse(data) as UserInsurance;
  } catch {
    return null;
  }
}

export function saveUserInsurance(insurance: Partial<UserInsurance>): void {
  const existing = getUserInsurance();
  const merged = { ...existing, ...insurance };
  localStorage.setItem(KEYS.INSURANCE, JSON.stringify(merged));
}

// === Appointments Management ===

export function getUserAppointments(): Appointment[] {
  const data = localStorage.getItem(KEYS.APPOINTMENTS);
  if (!data) return [];

  try {
    return JSON.parse(data) as Appointment[];
  } catch {
    return [];
  }
}

export function saveAppointment(appointment: Appointment): void {
  const appointments = getUserAppointments();

  // Check if appointment already exists (by id)
  const existingIndex = appointments.findIndex(a => a.id === appointment.id);
  if (existingIndex >= 0) {
    // Update existing
    appointments[existingIndex] = appointment;
  } else {
    // Add new
    appointments.push(appointment);
  }

  // Sort by createdAt descending (newest first)
  appointments.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(appointments));
}

export function removeAppointment(id: string): void {
  const appointments = getUserAppointments();
  const filtered = appointments.filter(a => a.id !== id);
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(filtered));
}

// === Booking Draft Management ===

export function getBookingDraft(): BookingDraft | null {
  const data = localStorage.getItem(KEYS.BOOKING_DRAFT);
  if (!data) return null;

  try {
    return JSON.parse(data) as BookingDraft;
  } catch {
    return null;
  }
}

export function saveBookingDraft(draft: Partial<BookingDraft>): void {
  const existing = getBookingDraft() || {};
  const merged = { ...existing, ...draft };
  localStorage.setItem(KEYS.BOOKING_DRAFT, JSON.stringify(merged));
}

export function clearBookingDraft(): void {
  localStorage.removeItem(KEYS.BOOKING_DRAFT);
}

// === Registration Draft Management ===

export function getRegistrationDraft(): RegistrationDraft | null {
  const data = localStorage.getItem(KEYS.REGISTRATION_DRAFT);
  if (!data) return null;

  try {
    return JSON.parse(data) as RegistrationDraft;
  } catch {
    return null;
  }
}

export function saveRegistrationDraft(draft: Partial<RegistrationDraft>): void {
  const existing = getRegistrationDraft() || {};
  const merged = { ...existing, ...draft };
  localStorage.setItem(KEYS.REGISTRATION_DRAFT, JSON.stringify(merged));
}

export function clearRegistrationDraft(): void {
  localStorage.removeItem(KEYS.REGISTRATION_DRAFT);
}

// === Demo Data Seeding ===

export function seedDemoData(): void {
  // Only seed if no profile exists
  if (getUserProfile()) return;

  // Seed profile
  const demoProfile: UserProfile = {
    firstName: 'Sarah',
    lastName: 'Schmidt',
    dateOfBirth: '1985-03-15',
    phone: '+49 30 12345678',
    email: 'sarah.schmidt@example.com',
    street: 'Hauptstraße 123',
    city: 'Berlin',
    postalCode: '10115',
  };
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(demoProfile));

  // Seed insurance
  const demoInsurance: UserInsurance = {
    type: 'gkv',
    provider: 'AOK',
    memberNumber: 'A123456789',
    insuranceNumber: 'L234567890',
  };
  localStorage.setItem(KEYS.INSURANCE, JSON.stringify(demoInsurance));

  // Seed appointments
  const demoAppointments: Appointment[] = [
    {
      id: 'appt-1',
      type: 'video',
      doctor: 'Dr. Weber',
      specialty: 'Dermatology',
      clinic: 'Teleclinic',
      date: 'Jan 10, 2026',
      time: '10:00',
      status: 'completed',
      createdAt: '2026-01-09T10:00:00Z',
    },
    {
      id: 'appt-2',
      type: 'in-person',
      doctor: 'Dr. Schmidt',
      specialty: 'General Practice',
      clinic: 'Praxis am Park',
      date: 'Feb 5, 2026',
      time: '14:30',
      status: 'upcoming',
      createdAt: '2026-01-20T10:00:00Z',
    },
  ];
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(demoAppointments));
}

// === Legacy Data Migration ===

function migrateLegacyData(): void {
  // Migrate user-address to user-profile
  const legacyAddress = localStorage.getItem(KEYS.LEGACY_ADDRESS);
  if (legacyAddress) {
    try {
      const address = JSON.parse(legacyAddress);
      const profile: Partial<UserProfile> = {
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
      };
      saveUserProfile(profile);
      localStorage.removeItem(KEYS.LEGACY_ADDRESS);
    } catch {
      // Ignore migration errors
    }
  }

  // Migrate user-insurance-type to user-insurance
  const legacyInsuranceType = localStorage.getItem(KEYS.LEGACY_INSURANCE_TYPE);
  if (legacyInsuranceType) {
    try {
      const insurance: Partial<UserInsurance> = {
        type: legacyInsuranceType as 'gkv' | 'pkv',
      };
      saveUserInsurance(insurance);
      localStorage.removeItem(KEYS.LEGACY_INSURANCE_TYPE);
    } catch {
      // Ignore migration errors
    }
  }
}
