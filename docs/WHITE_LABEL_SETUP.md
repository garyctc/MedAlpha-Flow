# White Label Setup Guide

# This is header 1

MedAlpha Connect is built to support white-label deployments. Partners can customize the app's branding, colors, and features while maintaining identical functionality.

## Quick Start

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# App Branding
VITE_APP_NAME=Partner Health
VITE_COMPANY_NAME=Partner GmbH
VITE_SUPPORT_EMAIL=support@partner.de
VITE_TAGLINE=Your healthcare companion

# Assets
VITE_LOGO_PATH=/assets/partner-logo.svg
VITE_FAVICON_PATH=/assets/partner-favicon.png

# Optional: Load partner config from JSON
VITE_PARTNER_ID=partner-name
```

### 2. Asset Files

Place your branded assets in the `public/` directory:

```
public/
├── assets/
│   ├── partners/
│   │   └── {partner-id}/
│   │       ├── logo.svg
│   │       ├── favicon.png
│   │       └── logo-splash.svg (optional)
│   └── app-logo.svg (default)
```

### 3. Design Tokens (Optional)

Override design tokens by creating `shared/design-tokens-{PARTNER_ID}.json`:

```json
{
  "colors": {
    "semantic": {
      "primary": {
        "value": "#1E40AF"
      },
      "success": {
        "value": "#16A34A"
      }
    }
  }
}
```

Then regenerate tokens:

```bash
npm run tokens:generate
```

## Advanced: Partner Config Files

For complex deployments with multiple partners, use JSON config files.

### Partner Config Structure

```json
{
  "partnerId": "example-partner",
  "branding": {
    "appName": "Example Health",
    "companyName": "Example GmbH",
    "supportEmail": "support@example.de",
    "tagline": "Your healthcare platform"
  },
  "assets": {
    "logo": "/assets/partners/example/logo.svg",
    "favicon": "/assets/partners/example/favicon.png"
  },
  "colors": {
    "primary": "#1E40AF",
    "secondary": "#DC2626",
    "success": "#16A34A",
    "warning": "#F59E0B"
  },
  "features": {
    "prescriptionEnabled": true,
    "telemedicineEnabled": true,
    "appointmentsEnabled": true
  }
}
```

### Loading Partner Configs

Partner configs can be loaded from:

1. **Static Files** - `/partners/{partnerId}.json`
2. **API Endpoint** - Set `VITE_PARTNER_CONFIG_URL` env variable

Example:

```typescript
import { loadPartnerConfig, applyPartnerConfigColors } from "@/lib/partner-config";

// In your App.tsx or main component
useEffect(() => {
  const partnerId = new URLSearchParams(location.search).get("partner");
  if (partnerId) {
    loadPartnerConfig(partnerId).then((config) => {
      if (config?.colors) {
        applyPartnerConfigColors(config.colors);
      }
    });
  }
}, []);
```

## Configurable Elements

### Branding Strings

All app-facing text is externalized:

| Element | File | Override |
|---------|------|----------|
| App name | All pages | `VITE_APP_NAME` or `branding.appName` |
| Company name | Legal page | `VITE_COMPANY_NAME` or `branding.companyName` |
| Support email | Legal page | `VITE_SUPPORT_EMAIL` or `branding.supportEmail` |
| Tagline | Splash screen | `VITE_TAGLINE` or `branding.tagline` |

### Colors

All semantic colors are CSS variables:

| Color | CSS Variable | Hex |
|-------|--------------|-----|
| Primary | `--primary` | Default: `#0C3D91` |
| Success | `--success` | Default: `#2E7D32` |
| Warning | `--warning` | Default: `#F59E0B` |
| Secondary | `--destructive` | Default: `#EE161F` |

Override via:
1. Environment variables (if regenerating tokens)
2. Partner config JSON
3. Runtime CSS injection via `applyPartnerConfigColors()`

### Features

Control which features are visible:

```typescript
import { FEATURES } from "@/lib/features";

// Features are configurable via environment or partner config
if (FEATURES.prescriptionEnabled) {
  // Show prescriptions feature
}
```

## Deployment Strategies

### Strategy 1: Single Partner Deploy

Build and deploy for a specific partner:

```bash
VITE_APP_NAME="Partner Health" \
VITE_LOGO_PATH="/assets/partner-logo.svg" \
npm run build
```

### Strategy 2: Multi-Tenant (Static Configs)

Deploy once with multiple partner configs in `/partners/`:

```bash
npm run build

# Partners load their config dynamically:
# https://app.example.com?partner=partner-id
```

### Strategy 3: Multi-Tenant (API)

Partner configs served from API endpoint:

```bash
VITE_PARTNER_CONFIG_URL="https://api.example.com/partners" \
npm run build

# Route: GET /partners/{partnerId} returns config JSON
```

## Verification Checklist

Before releasing a white-label deployment:

- [ ] App name appears correctly on splash, welcome, and legal pages
- [ ] Logo displays in header and navigation
- [ ] Primary color used in buttons, links, and interactive elements
- [ ] Success color used in confirmation states
- [ ] Support email correct in legal disclosure
- [ ] Company name appears in legal section
- [ ] Favicon loads correctly
- [ ] Feature flags work (if applicable)
- [ ] No hardcoded brand names in error messages or logs
- [ ] Assets load from correct paths

## Troubleshooting

### App name not updating

Check that `branding.appName` is being used, not hardcoded strings. Search for:

```bash
grep -r "MedAlpha Connect" client/src/
```

Should return only in branding config, not in components.

### Colors not applying

Ensure CSS variables are properly generated:

```bash
npm run tokens:generate
```

Check that color overrides are in HSL format if using runtime injection.

### Logo not loading

Verify path is relative to `public/` directory. Test with:

```bash
curl https://app.example.com/assets/logo.svg
```

## Example Deployments

### Deploy for dm Clinical

```bash
npm run tokens:generate && npm run build

# Use partners/dm-clinical.json config
VITE_PARTNER_ID=dm-clinical npm run dev
```

### Deploy for Generic Partner

```bash
VITE_APP_NAME="Generic Health" \
VITE_COMPANY_NAME="Generic GmbH" \
VITE_LOGO_PATH="/assets/generic-logo.svg" \
npm run build
```

## Technical Details

### How Branding Works

1. **Config Layer** - Branding strings stored in `config/branding.ts`
2. **Component Usage** - Components import and use `branding.appName`, etc.
3. **Override Sources** - Values come from:
   - Environment variables (build-time)
   - Partner config JSON (load-time)
   - Runtime CSS for colors

### How Colors Work

1. **Design Tokens** - Defined in `shared/design-tokens.json`
2. **CSS Generation** - `npm run tokens:generate` creates `tokens.css`
3. **Tailwind Integration** - Tailwind uses CSS variables
4. **Runtime Override** - `applyPartnerConfigColors()` injects overrides

## Support

For white-label integration questions:
- See `shared/partner-config.schema.json` for config schema
- Review `partners/example-partner.json` for example
- Check `client/src/lib/partner-config.ts` for loader implementation
