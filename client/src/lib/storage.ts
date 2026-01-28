// localStorage management utilities with demo data seeding

import type {
  UserProfile,
  UserInsurance,
  Appointment,
  BookingDraft,
  RegistrationDraft,
  AuthState,
  UserSettings,
  LinkedAccounts,
} from '@/types/storage';
import { format, parse } from "date-fns";
import { enUS } from "date-fns/locale";
import { findDoctorByName } from "@/lib/constants/doctors";
import { mapMatchStatusToLifecycle } from "@/lib/appointments/status";

// Storage keys
const KEYS = {
  PROFILE: 'user-profile',
  INSURANCE: 'user-insurance',
  APPOINTMENTS: 'user-appointments',
  APPOINTMENTS_SCHEMA_V2: 'user-appointments-schema-v2',
  DOCTOR_AVATARS_V2: 'doctor-avatars-v2',
  BOOKING_DRAFT: 'booking-draft',
  REGISTRATION_DRAFT: 'registration-draft',
  AUTH_STATE: 'auth-state',
  SETTINGS: 'user-settings',
  LINKED_ACCOUNTS: 'linked-accounts',
  // Legacy keys for migration
  LEGACY_ADDRESS: 'user-address',
  LEGACY_INSURANCE_TYPE: 'user-insurance-type',
} as const;

export function clearStorage(): void {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}

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
  migrateAppointmentsToIsoV2();
  migrateDoctorAvatars();

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

function migrateDoctorAvatars(): void {
  if (localStorage.getItem(KEYS.DOCTOR_AVATARS_V2) === "1") return;

  const raw = localStorage.getItem(KEYS.APPOINTMENTS);
  if (!raw) {
    localStorage.setItem(KEYS.DOCTOR_AVATARS_V2, "1");
    return;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    localStorage.setItem(KEYS.DOCTOR_AVATARS_V2, "1");
    return;
  }

  if (!Array.isArray(parsed)) {
    localStorage.setItem(KEYS.DOCTOR_AVATARS_V2, "1");
    return;
  }

  const migrated = parsed.map((apt) => {
    if (!apt || typeof apt !== "object") return apt;
    const next = { ...(apt as Record<string, unknown>) };

    // Look up doctor by name and update the image
    const doctorName = typeof next.doctor === "string" ? next.doctor : null;
    if (doctorName) {
      const doctor = findDoctorByName(doctorName);
      if (doctor?.image) {
        next.doctorImage = doctor.image;
      }
    }

    return next;
  });

  try {
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(migrated));
    localStorage.setItem(KEYS.DOCTOR_AVATARS_V2, "1");
  } catch {
    // ignore write failures
  }
}

function migrateAppointmentsToIsoV2(): void {
  if (localStorage.getItem(KEYS.APPOINTMENTS_SCHEMA_V2) === "1") return;

  const raw = localStorage.getItem(KEYS.APPOINTMENTS);
  if (!raw) {
    localStorage.setItem(KEYS.APPOINTMENTS_SCHEMA_V2, "1");
    return;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return;
  }

  if (!Array.isArray(parsed)) return;

  const dateFormats = ["MMM d, yyyy", "MMMM d, yyyy", "MMM dd, yyyy", "MMMM dd, yyyy"] as const;

  const migrated = parsed.map((apt) => {
    if (!apt || typeof apt !== "object") return apt;
    const next = { ...(apt as any) };

    const date = typeof next.date === "string" ? next.date.trim() : null;
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      for (const fmt of dateFormats) {
        const dt = parse(date, fmt, new Date(), { locale: enUS });
        if (!Number.isNaN(dt.getTime())) {
          next.date = format(dt, "yyyy-MM-dd");
          break;
        }
      }
    }

    const time = typeof next.time === "string" ? next.time.trim() : null;
    if (time && !/^\d{2}:\d{2}$/.test(time)) {
      const dt = /\b(am|pm)\b/i.test(time)
        ? parse(time, "h:mm a", new Date(), { locale: enUS })
        : parse(time.padStart(5, "0"), "HH:mm", new Date());
      if (!Number.isNaN(dt.getTime())) {
        next.time = format(dt, "HH:mm");
      }
    }

    return next;
  });

  try {
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(migrated));
    localStorage.setItem(KEYS.APPOINTMENTS_SCHEMA_V2, "1");
  } catch {
    // ignore write failures
  }
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

// === Auth State Management ===

export function getAuthState(): AuthState | null {
  const data = localStorage.getItem(KEYS.AUTH_STATE);
  if (!data) return null;

  try {
    return JSON.parse(data) as AuthState;
  } catch {
    return null;
  }
}

export function saveAuthState(state: AuthState): void {
  localStorage.setItem(KEYS.AUTH_STATE, JSON.stringify(state));
}

export function clearAuthState(): void {
  localStorage.removeItem(KEYS.AUTH_STATE);
}

// === User Settings Management ===

const DEFAULT_SETTINGS: UserSettings = {
  language: 'de',
  notifications: true,
};

export function getUserSettings(): UserSettings {
  const data = localStorage.getItem(KEYS.SETTINGS);
  if (!data) return DEFAULT_SETTINGS;

  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) } as UserSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveUserSettings(settings: Partial<UserSettings>): void {
  const existing = getUserSettings();
  const merged = { ...existing, ...settings };
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(merged));
}

// === Linked Accounts Management ===

const DEFAULT_LINKED_ACCOUNTS: LinkedAccounts = {
  dm: false,
  payback: false,
  insurance: false,
};

export function getLinkedAccounts(): LinkedAccounts {
  const data = localStorage.getItem(KEYS.LINKED_ACCOUNTS);
  if (!data) return DEFAULT_LINKED_ACCOUNTS;

  try {
    return { ...DEFAULT_LINKED_ACCOUNTS, ...JSON.parse(data) } as LinkedAccounts;
  } catch {
    return DEFAULT_LINKED_ACCOUNTS;
  }
}

export function saveLinkedAccounts(accounts: Partial<LinkedAccounts>): void {
  const existing = getLinkedAccounts();
  const merged = { ...existing, ...accounts };
  localStorage.setItem(KEYS.LINKED_ACCOUNTS, JSON.stringify(merged));
}

// === Appointment Update Helper ===

export function updateAppointment(id: string, updates: Partial<Appointment>): void {
  const appointments = getUserAppointments();
  const index = appointments.findIndex(a => a.id === id);

  if (index >= 0) {
    appointments[index] = { ...appointments[index], ...updates };
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }
}

// === Demo Data Seeding ===

export function seedDemoData(): void {
  const existingProfile = getUserProfile();
  if (!existingProfile) {
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
  }

  const existingInsurance = getUserInsurance();
  if (!existingInsurance) {
    const demoInsurance: UserInsurance = {
      type: 'gkv',
      provider: 'AOK',
      memberNumber: 'A123456789',
      insuranceNumber: 'L234567890',
    };
    localStorage.setItem(KEYS.INSURANCE, JSON.stringify(demoInsurance));
  }

  // Seed appointments with proper doctor avatars from DOCTORS list
  const drWeber = findDoctorByName("Dr. Sarah Weber");
  const drSchmidt = findDoctorByName("Dr. Anna Schmidt");
  const drChen = findDoctorByName("Dr. Michael Chen");
  const drMuller = findDoctorByName("Dr. Thomas Müller");
  const now = new Date().toISOString();

  const demoAppointments: Appointment[] = [
    {
      id: "match-searching",
      type: "in-person",
      doctor: "Dr. Michael Chen",
      doctorImage: drChen?.image || undefined,
      specialty: "General Practice",
      clinic: "DocliQ Health Center",
      date: "2026-02-02",
      time: "pending",
      timeWindow: "morning",
      status: mapMatchStatusToLifecycle("searching"),
      matchStatus: "searching",
      createdAt: now,
    },
    {
      id: "match-waiting",
      type: "video",
      doctor: "Dr. Sarah Weber",
      doctorImage: drWeber?.image || undefined,
      specialty: "General Practice",
      clinic: "Teleclinic",
      date: "2026-02-03",
      time: "pending",
      timeWindow: "afternoon",
      status: mapMatchStatusToLifecycle("waiting"),
      matchStatus: "waiting",
      createdAt: "2026-01-27T10:00:00Z",
    },
    {
      id: "match-confirmed",
      type: "in-person",
      doctor: "Dr. Anna Schmidt",
      doctorImage: drSchmidt?.image || undefined,
      specialty: "General Practice",
      clinic: "Praxis am Park",
      date: "2026-02-04",
      time: "10:30",
      timeWindow: "morning",
      status: mapMatchStatusToLifecycle("confirmed"),
      matchStatus: "confirmed",
      createdAt: "2026-01-27T11:00:00Z",
    },
    {
      id: "match-rejected",
      type: "in-person",
      doctor: "Dr. Thomas Müller",
      doctorImage: drMuller?.image || undefined,
      specialty: "General Practice",
      clinic: "DocliQ Health Center",
      date: "2026-02-05",
      time: "pending",
      timeWindow: "evening",
      status: mapMatchStatusToLifecycle("rejected"),
      matchStatus: "rejected",
      createdAt: "2026-01-27T12:00:00Z",
    },
    {
      id: "match-expired",
      type: "video",
      doctor: "Dr. Sarah Weber",
      doctorImage: drWeber?.image || undefined,
      specialty: "Dermatology",
      clinic: "Teleclinic",
      date: "2026-02-06",
      time: "pending",
      timeWindow: "morning",
      status: mapMatchStatusToLifecycle("expired"),
      matchStatus: "expired",
      createdAt: "2026-01-27T13:00:00Z",
    },
    {
      id: "book-again-1",
      type: "video",
      doctor: "Dr. Sarah Weber",
      doctorImage: drWeber?.image || undefined,
      specialty: "Dermatology",
      clinic: "Teleclinic",
      date: "2025-12-15",
      time: "09:00",
      status: "completed",
      createdAt: "2025-12-15T09:00:00Z",
    },
    {
      id: "book-again-2",
      type: "in-person",
      doctor: "Dr. Anna Schmidt",
      doctorImage: drSchmidt?.image || undefined,
      specialty: "General Practice",
      clinic: "Praxis am Park",
      date: "2025-12-10",
      time: "11:30",
      status: "completed",
      createdAt: "2025-12-10T11:30:00Z",
    },
    {
      id: "book-again-3",
      type: "video",
      doctor: "Dr. Michael Chen",
      doctorImage: drChen?.image || undefined,
      specialty: "General Practice",
      clinic: "Teleclinic",
      date: "2025-11-20",
      time: "15:00",
      status: "completed",
      createdAt: "2025-11-20T15:00:00Z",
    },
    {
      id: "book-again-4",
      type: "in-person",
      doctor: "Dr. Thomas Müller",
      doctorImage: drMuller?.image || undefined,
      specialty: "General Practice",
      clinic: "DocliQ Health Center",
      date: "2025-11-05",
      time: "08:30",
      status: "completed",
      createdAt: "2025-11-05T08:30:00Z",
    },
    {
      id: "book-again-5",
      type: "video",
      doctor: "Dr. Sarah Weber",
      doctorImage: drWeber?.image || undefined,
      specialty: "Dermatology",
      clinic: "Teleclinic",
      date: "2025-10-18",
      time: "13:15",
      status: "completed",
      createdAt: "2025-10-18T13:15:00Z",
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
