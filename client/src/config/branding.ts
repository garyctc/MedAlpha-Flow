/**
 * Branding configuration for white-label support.
 * All values are externalized from component code.
 * Can be overridden via environment variables at build time.
 */

export const branding = {
  appName: import.meta.env.VITE_APP_NAME || 'MedAlpha Connect',
  companyName: import.meta.env.VITE_COMPANY_NAME || 'MedAlpha GmbH',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'legal@medalpha.de',
  tagline: import.meta.env.VITE_TAGLINE || 'Your healthcare companion',
};
