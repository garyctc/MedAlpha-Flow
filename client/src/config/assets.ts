/**
 * Asset configuration for white-label support.
 * Logo and favicon paths can be overridden via environment variables.
 */

export const assets = {
  logo: import.meta.env.VITE_LOGO_PATH || '/app-logo.svg',
  favicon: import.meta.env.VITE_FAVICON_PATH || '/favicon.png',
};
