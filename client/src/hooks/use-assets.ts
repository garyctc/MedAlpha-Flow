/**
 * Hook to access asset paths from config.
 * This allows logos and other assets to be overridden per white-label partner.
 */

import { assets } from "@/config/assets";

export function useAssets() {
  return {
    logo: assets.logo,
    favicon: assets.favicon,
  };
}
