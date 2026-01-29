---
date: 2026-01-29
problem_type: build_error
component: deployment
symptoms:
  - "Vercel URL triggers file download instead of loading app"
  - "Command npm run build:client exited with 1"
  - "Missing required token: colors.primitives.blue.10"
root_cause: multiple_configuration_issues
severity: critical
tags: [vercel, vite, node20, deployment, design-tokens]
---

# Vercel Deployment Fails for Vite App with Node 20 Requirements

## Problem

Vercel deployment of a Vite/React app failed. When accessing the deployed URL, the browser downloaded a file instead of rendering the app.

## Symptoms

1. Browser shows file download dialog when loading Vercel URL
2. Build logs show: `Command "npm run build:client" exited with 1`
3. Token generation error: `Missing required token: colors.primitives.blue.10`

## Investigation Steps

| Attempt | Result |
|---------|--------|
| Created vercel.json with buildCommand/outputDirectory | Still failed |
| Changed rewrites/routes configuration | Still failed |
| Fixed design token script | Partial fix |
| Added .nvmrc for Node 20 | Partial fix |
| Checked Vercel dashboard settings | Found wrong build command |
| Checked connected repo | Found wrong repo connected |

## Root Cause

**Four separate issues combined:**

### 1. Node Version Mismatch
`vite.config.ts` uses `import.meta.dirname` which requires Node 20.11+. Vercel defaults to Node 18.x.

```typescript
// vite.config.ts - requires Node 20+
resolve: {
  alias: {
    "@": path.resolve(import.meta.dirname, "client", "src"),
  },
},
```

### 2. Missing Design Token
Token generation script referenced non-existent color:

```typescript
// BROKEN - blue doesn't exist in tokens
const blue10 = getRequiredHex(tokens, "colors.primitives.blue.10", primitives.blue?.["10"]);

// FIXED - use teal which exists
const teal10 = getRequiredHex(tokens, "colors.primitives.teal.10", primitives.teal?.["10"]);
```

### 3. Vercel Dashboard Override
Vercel dashboard settings overrode `vercel.json`, running `npm run build` (full server build) instead of `npm run build:client` (client only).

### 4. Wrong Repository Connected
Vercel project was connected to a different GitHub repo that lacked the correct configuration.

## Solution

### 1. Add Node Version Requirement

Create `.nvmrc`:
```
20
```

Or add to `package.json`:
```json
"engines": { "node": ">=20" }
```

### 2. Fix Design Token Script

```typescript
// script/generate-design-tokens.ts
const teal10 = getRequiredHex(tokens, "colors.primitives.teal.10", primitives.teal?.["10"]);

// Update usage
`  --accent: ${hexToHslTriplet(teal10)};`,
```

### 3. Configure Vercel Dashboard

In Vercel Project Settings → Build and Deployment:
- **Build Command**: `npm run build:client` (Override: ON)
- **Output Directory**: `dist/public` (Override: ON)
- **Framework Preset**: Vite

### 4. Verify vercel.json

```json
{
  "buildCommand": "npm run build:client",
  "outputDirectory": "dist/public",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 5. Connect Correct Repository

In Vercel Project Settings → Git:
1. Disconnect current repo
2. Connect correct GitHub repository
3. Redeploy

## Prevention

1. **Always specify Node version** - Add `.nvmrc` or `engines` field for projects using modern Node features
2. **Validate design tokens exist** - Token generation should fail gracefully or list available tokens on error
3. **Check Vercel dashboard settings** - Dashboard overrides take precedence over vercel.json
4. **Verify connected repo** - Confirm Vercel is deploying from the correct repository

## Verification

After fixes:
1. Push changes to GitHub
2. Check Vercel build logs for successful completion
3. Visit deployed URL - should render app, not download file
4. Test SPA routing - navigate to sub-routes directly

## Related

- Vite documentation on `import.meta.dirname`: requires Node 20.11+
- Vercel Vite deployment guide: https://vercel.com/docs/frameworks/vite
