/**
 * Branding configuration for white-label support.
 * All values are externalized from component code.
 * Can be overridden via environment variables at build time.
 */

export const branding = {
  appName: import.meta.env.VITE_APP_NAME || 'DocliQ',
  companyName: import.meta.env.VITE_COMPANY_NAME || 'DocliQ GmbH',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'legal@docliq.de',
  tagline: import.meta.env.VITE_TAGLINE || 'Your healthcare companion',
};
