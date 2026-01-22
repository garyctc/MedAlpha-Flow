/**
 * Feature flags for conditional feature visibility.
 * Set to false to hide features from UI while preserving code.
 */
export const FEATURES = {
  prescriptionEnabled: false,
  videoConsultationEnabled: false,  // Hide video consultation for V1
} as const;
