/**
 * Partner configuration loader and merger.
 * Allows loading partner-specific overrides at runtime.
 */

type PartnerConfig = {
  partnerId: string;
  branding?: {
    appName?: string;
    companyName?: string;
    supportEmail?: string;
    tagline?: string;
  };
  assets?: {
    logo?: string;
    favicon?: string;
  };
  colors?: {
    primary?: string;
    secondary?: string;
    success?: string;
    warning?: string;
  };
  features?: {
    prescriptionEnabled?: boolean;
    telemedicineEnabled?: boolean;
    appointmentsEnabled?: boolean;
  };
};

/**
 * Load partner config from JSON file or fetch endpoint.
 * Supports loading from:
 * - Static JSON files in /partners/{partnerId}.json
 * - API endpoint (if VITE_PARTNER_CONFIG_URL is set)
 * - Default from env variables
 */
export async function loadPartnerConfig(
  partnerId?: string
): Promise<PartnerConfig | null> {
  const resolvedPartnerId = partnerId || import.meta.env.VITE_PARTNER_ID || "default";

  // Try loading from static JSON first
  try {
    const configUrl = `/partners/${resolvedPartnerId}.json`;
    const response = await fetch(configUrl);
    if (response.ok) {
      return (await response.json()) as PartnerConfig;
    }
  } catch (err) {
    console.warn(`Failed to load partner config from /partners/${resolvedPartnerId}.json:`, err);
  }

  // Try loading from API endpoint
  const apiUrl = import.meta.env.VITE_PARTNER_CONFIG_URL;
  if (apiUrl) {
    try {
      const response = await fetch(`${apiUrl}/${resolvedPartnerId}`);
      if (response.ok) {
        return (await response.json()) as PartnerConfig;
      }
    } catch (err) {
      console.warn(`Failed to load partner config from API:`, err);
    }
  }

  return null;
}

/**
 * Apply partner config overrides to CSS variables.
 * Converts hex colors to HSL and injects into CSS.
 */
export function applyPartnerConfigColors(colors: PartnerConfig["colors"]) {
  if (!colors) return;

  const root = document.documentElement;

  if (colors.primary) {
    const hsl = hexToHsl(colors.primary);
    root.style.setProperty("--primary", hsl);
  }

  if (colors.secondary) {
    const hsl = hexToHsl(colors.secondary);
    root.style.setProperty("--destructive", hsl);
  }

  if (colors.success) {
    const hsl = hexToHsl(colors.success);
    root.style.setProperty("--success", hsl);
  }

  if (colors.warning) {
    const hsl = hexToHsl(colors.warning);
    root.style.setProperty("--warning", hsl);
  }
}

/**
 * Convert hex color to HSL string for CSS variables.
 * Example: "#0C3D91" -> "218 85% 31%"
 */
function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "";

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  const hDeg = Math.round(h * 360);
  const sPercent = Math.round(s * 100);
  const lPercent = Math.round(l * 100);

  return `${hDeg} ${sPercent}% ${lPercent}%`;
}
