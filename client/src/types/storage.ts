// Storage type definitions for localStorage data structures

export interface UserProfile {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  postalCode: string;
}

export interface UserInsurance {
  type: 'gkv' | 'pkv';
  provider: string;
  memberNumber: string;
  insuranceNumber?: string; // GKV only
}

export interface Appointment {
  id: string;
  type: 'in-person' | 'video';
  doctor: string;
  doctorImage?: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  timeWindow?: 'morning' | 'afternoon' | 'evening';
  status: 'upcoming' | 'completed' | 'cancelled' | 'processing';
  matchStatus?: 'searching' | 'waiting' | 'confirmed' | 'rejected' | 'expired';
  createdAt: string;
  cancelledAt?: string;
}

export interface BookingDraft {
  type?: 'in-person' | 'video';
  entryMode?: 'specialty' | 'doctor' | 'fast';
  intent?: 'new' | 'reschedule' | 'book-again';
  rescheduleId?: string;
  recurring?: boolean;
  recurrenceCount?: number;
  recurrenceIntervalWeeks?: number;
  specialty?: string;
  location?: string;
  doctor?: string;
  doctorImage?: string;
  date?: string;
  time?: string;
  timeWindow?: 'morning' | 'afternoon' | 'evening';
  timeWindows?: ('morning' | 'afternoon' | 'evening')[];
  // Telehealth-specific fields
  symptoms?: string[];
  symptomDuration?: string;
  painLevel?: number;
  additionalNotes?: string;
}

export interface RegistrationDraft {
  email?: string;
  insuranceType?: 'gkv' | 'pkv';
  insuranceProvider?: string;
  insuranceMemberNumber?: string;
  insuranceNumber?: string;
  personalInfo?: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
  };
  address?: {
    street: string;
    city: string;
    postalCode: string;
  };
  consentPrivacy?: boolean;
  consentDataProcessing?: boolean;
  consentTimestamp?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  userId?: string;
}

export interface UserSettings {
  language: 'de' | 'en';
  notifications: boolean;
}

export interface LinkedAccounts {
  dm: boolean;
  payback: boolean;
  insurance: boolean;
}
