# Curaay-Style Mobile App Experience Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform MedAlpha-Flow from a basic mobile-width website into a polished "app-in-browser" experience matching Curaay's native app feel.

**Architecture:** Add page-level transitions using Framer Motion's AnimatePresence, implement PWA manifest for installability, create visual device frame with status bar simulation, and add progress indicators for multi-step flows. All changes stay within the existing 375px app container.

**Tech Stack:** React 19, Framer Motion, wouter, TailwindCSS v4, PWA manifest

---

## Phase 1: Page Transitions & Navigation Polish

### Task 1: Create Page Transition Wrapper Component

**Files:**
- Create: `client/src/components/layout/PageTransition.tsx`

**Step 1: Create the PageTransition component**

```tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  direction?: "forward" | "back";
}

const variants = {
  initial: (direction: "forward" | "back") => ({
    x: direction === "forward" ? "100%" : "-30%",
    opacity: direction === "forward" ? 0 : 0.5,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "forward" | "back") => ({
    x: direction === "forward" ? "-30%" : "100%",
    opacity: direction === "forward" ? 0.5 : 0,
  }),
};

export function PageTransition({ children, direction = "forward" }: PageTransitionProps) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="absolute inset-0 bg-background"
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Verify component renders**

Run: `npm run dev`
Expected: Dev server starts without errors

**Step 3: Commit**

```bash
git add client/src/components/layout/PageTransition.tsx
git commit -m "feat: add PageTransition component for iOS-style page animations"
```

---

### Task 2: Create Navigation Direction Context

**Files:**
- Create: `client/src/contexts/NavigationContext.tsx`

**Step 1: Create navigation context for tracking direction**

```tsx
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useLocation } from "wouter";

interface NavigationContextType {
  direction: "forward" | "back";
  navigate: (path: string, options?: { direction?: "forward" | "back" }) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

const routeDepth: Record<string, number> = {
  "/": 0,
  "/login": 1,
  "/home": 1,
  "/booking": 2,
  "/booking/specialty": 3,
  "/booking/location": 4,
  "/booking/doctors": 5,
  "/booking/calendar": 6,
  "/booking/review": 7,
  "/booking/success": 8,
  "/prescriptions": 2,
  "/telehealth": 2,
  "/appointments": 2,
  "/profile": 2,
  "/history": 2,
};

function getRouteDepth(path: string): number {
  if (routeDepth[path] !== undefined) return routeDepth[path];
  // For dynamic routes, count segments
  return path.split("/").filter(Boolean).length;
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const navigate = useCallback(
    (path: string, options?: { direction?: "forward" | "back" }) => {
      if (options?.direction) {
        setDirection(options.direction);
      } else {
        const currentDepth = getRouteDepth(location);
        const targetDepth = getRouteDepth(path);
        setDirection(targetDepth >= currentDepth ? "forward" : "back");
      }
      setLocation(path);
    },
    [location, setLocation]
  );

  const goBack = useCallback(() => {
    setDirection("back");
    window.history.back();
  }, []);

  return (
    <NavigationContext.Provider value={{ direction, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}

export function useNavigationDirection() {
  const context = useContext(NavigationContext);
  return context?.direction ?? "forward";
}
```

**Step 2: Commit**

```bash
git add client/src/contexts/NavigationContext.tsx
git commit -m "feat: add NavigationContext for tracking navigation direction"
```

---

### Task 3: Integrate Transitions into App Shell

**Files:**
- Modify: `client/src/App.tsx`

**Step 1: Import dependencies and wrap routes with AnimatePresence**

In `client/src/App.tsx`, add imports at top:

```tsx
import { AnimatePresence } from "framer-motion";
import { NavigationProvider, useNavigationDirection } from "@/contexts/NavigationContext";
import { PageTransition } from "@/components/layout/PageTransition";
```

**Step 2: Modify AppRoutes to use PageTransition**

Replace the `AppRoutes` function:

```tsx
function AppRoutes() {
  const [location] = useLocation();
  const direction = useNavigationDirection();

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <PageTransition key={location} direction={direction}>
        <Switch location={location}>
          <Route path="/" component={Splash} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          {/* ... rest of routes unchanged ... */}
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </AnimatePresence>
  );
}
```

**Step 3: Wrap App with NavigationProvider**

Modify the `App` function to wrap with NavigationProvider:

```tsx
function App() {
  useEffect(() => {
    seedDemoData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavigationProvider>
          <div className="min-h-screen font-sans bg-background text-foreground antialiased selection:bg-primary/20 flex items-start justify-center">
            <div className="w-full max-w-[375px] relative overflow-hidden">
              <AppRoutes />
              <BottomNav />
            </div>
            <Toaster />
          </div>
        </NavigationProvider>
      </Router>
    </QueryClientProvider>
  );
}
```

**Step 4: Test navigation transitions**

Run: `npm run dev`
Navigate between pages and verify slide animations work

**Step 5: Commit**

```bash
git add client/src/App.tsx
git commit -m "feat: integrate page transitions with AnimatePresence"
```

---

### Task 4: Update SubPageHeader to Use Navigation Context

**Files:**
- Modify: `client/src/components/layout/SubPageHeader.tsx`

**Step 1: Read current SubPageHeader implementation**

Read file first to understand current structure.

**Step 2: Update to use navigation context**

Update the back button to use `goBack()` from navigation context:

```tsx
import { useNavigation } from "@/contexts/NavigationContext";

// Inside component:
const { goBack } = useNavigation();

// Update back button onClick:
<button onClick={goBack} ...>
```

**Step 3: Commit**

```bash
git add client/src/components/layout/SubPageHeader.tsx
git commit -m "feat: update SubPageHeader to use navigation context for back"
```

---

## Phase 2: Visual Device Frame & Status Bar

### Task 5: Create Device Frame Component

**Files:**
- Create: `client/src/components/layout/DeviceFrame.tsx`

**Step 1: Create the device frame with status bar**

```tsx
import { ReactNode } from "react";

interface DeviceFrameProps {
  children: ReactNode;
}

function StatusBar() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="h-11 bg-background flex items-center justify-between px-6 text-sm font-medium">
      <span>{timeString}</span>
      <div className="absolute left-1/2 -translate-x-1/2 w-[80px] h-[28px] bg-black rounded-full" />
      <div className="flex items-center gap-1">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C8.5 3 5.5 4.5 3.5 7L12 21l8.5-14c-2-2.5-5-4-8.5-4z" />
        </svg>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 17h20v2H2v-2zm2-5h16v2H4v-2zm2-5h12v2H6V7z" />
        </svg>
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-3 border border-current rounded-sm relative">
            <div className="absolute inset-0.5 right-1 bg-current rounded-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <div className="w-full max-w-[375px] bg-black rounded-[40px] p-2 shadow-2xl">
      <div className="bg-background rounded-[32px] overflow-hidden relative min-h-[812px]">
        <StatusBar />
        <div className="relative" style={{ height: "calc(100vh - 44px)", minHeight: "768px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add client/src/components/layout/DeviceFrame.tsx
git commit -m "feat: add DeviceFrame component with status bar simulation"
```

---

### Task 6: Integrate Device Frame on Desktop Only

**Files:**
- Modify: `client/src/App.tsx`
- Create: `client/src/hooks/use-device-frame.ts`

**Step 1: Create hook to detect if we should show device frame**

```tsx
import { useState, useEffect } from "react";

export function useDeviceFrame() {
  const [showFrame, setShowFrame] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      // Show frame only on larger screens (desktop viewing mobile prototype)
      setShowFrame(window.innerWidth > 500);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return showFrame;
}
```

**Step 2: Update App.tsx to conditionally show DeviceFrame**

Import and use the hook and component:

```tsx
import { DeviceFrame } from "@/components/layout/DeviceFrame";
import { useDeviceFrame } from "@/hooks/use-device-frame";

// In App component:
const showDeviceFrame = useDeviceFrame();

// Wrap the app container conditionally:
{showDeviceFrame ? (
  <DeviceFrame>
    <div className="w-full max-w-[375px] relative overflow-hidden">
      <AppRoutes />
      <BottomNav />
    </div>
  </DeviceFrame>
) : (
  <div className="w-full max-w-[375px] relative overflow-hidden">
    <AppRoutes />
    <BottomNav />
  </div>
)}
```

**Step 3: Commit**

```bash
git add client/src/hooks/use-device-frame.ts client/src/App.tsx
git commit -m "feat: add conditional device frame for desktop viewing"
```

---

## Phase 3: PWA Foundation

### Task 7: Create PWA Manifest

**Files:**
- Create: `client/public/manifest.json`

**Step 1: Create the manifest file**

```json
{
  "name": "MedAlpha Connect",
  "short_name": "MedAlpha",
  "description": "Healthcare booking and prescription management",
  "start_url": "/home",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#ffffff",
  "theme_color": "#7c3aed",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**Step 2: Commit**

```bash
git add client/public/manifest.json
git commit -m "feat: add PWA manifest for installability"
```

---

### Task 8: Add PWA Meta Tags to HTML

**Files:**
- Modify: `client/index.html`

**Step 1: Add manifest link and Apple-specific meta tags**

Add in the `<head>` section:

```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#7c3aed" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="MedAlpha" />
<link rel="apple-touch-icon" href="/icon-192.png" />
```

**Step 2: Commit**

```bash
git add client/index.html
git commit -m "feat: add PWA meta tags for iOS and Android"
```

---

## Phase 4: Multi-Step Flow Progress Indicators

### Task 9: Create Step Progress Component

**Files:**
- Create: `client/src/components/ui/step-progress.tsx`

**Step 1: Create the step progress indicator**

```tsx
import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function StepProgress({ currentStep, totalSteps, className }: StepProgressProps) {
  return (
    <div className={cn("flex items-center gap-1.5 px-4 py-2", className)}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 rounded-full flex-1 transition-colors duration-300",
            i < currentStep ? "bg-primary" : "bg-slate-200"
          )}
        />
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add client/src/components/ui/step-progress.tsx
git commit -m "feat: add StepProgress component for multi-step flows"
```

---

### Task 10: Add Progress to Booking Flow

**Files:**
- Modify: `client/src/pages/booking/type.tsx`
- Modify: `client/src/pages/booking/specialty.tsx`
- Modify: `client/src/pages/booking/location.tsx`
- Modify: `client/src/pages/booking/doctors.tsx`
- Modify: `client/src/pages/booking/calendar.tsx`
- Modify: `client/src/pages/booking/review.tsx`

**Step 1: Define booking flow steps**

The booking flow has 6 steps:
1. Type (in-person/video)
2. Specialty
3. Location
4. Doctor
5. Calendar (date/time)
6. Review

**Step 2: Add StepProgress to each booking page**

For each booking page, import and add StepProgress after SubPageHeader:

```tsx
import { StepProgress } from "@/components/ui/step-progress";

// After SubPageHeader:
<StepProgress currentStep={N} totalSteps={6} />
```

Where N = 1 for type, 2 for specialty, 3 for location, 4 for doctors, 5 for calendar, 6 for review.

**Step 3: Commit after each page update**

```bash
git add client/src/pages/booking/
git commit -m "feat: add step progress indicators to booking flow"
```

---

## Phase 5: Polish & Micro-Interactions

### Task 11: Add Pull-to-Refresh Visual Feedback

**Files:**
- Create: `client/src/components/ui/pull-to-refresh.tsx`

**Step 1: Create pull-to-refresh indicator (visual only for prototype)**

```tsx
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { ReactNode, useRef } from "react";
import { Loader2 } from "lucide-react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh?: () => Promise<void>;
}

export function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 60], [0, 1]);
  const scale = useTransform(y, [0, 60], [0.5, 1]);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = async () => {
    if (y.get() > 60 && onRefresh) {
      await controls.start({ y: 60 });
      await onRefresh();
    }
    await controls.start({ y: 0 });
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <motion.div
        style={{ opacity, scale }}
        className="absolute top-2 left-1/2 -translate-x-1/2 z-10"
      >
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </motion.div>
      <motion.div
        style={{ y }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 80 }}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add client/src/components/ui/pull-to-refresh.tsx
git commit -m "feat: add PullToRefresh component for native app feel"
```

---

### Task 12: Add Haptic Feedback Utility

**Files:**
- Create: `client/src/lib/haptics.ts`

**Step 1: Create haptic feedback utility**

```typescript
type HapticStyle = "light" | "medium" | "heavy" | "success" | "warning" | "error";

export function triggerHaptic(style: HapticStyle = "light") {
  // Check if Vibration API is available
  if (!("vibrate" in navigator)) return;

  const patterns: Record<HapticStyle, number | number[]> = {
    light: 10,
    medium: 20,
    heavy: 30,
    success: [10, 50, 10],
    warning: [20, 50, 20],
    error: [30, 50, 30, 50, 30],
  };

  navigator.vibrate(patterns[style]);
}

// Hook for easy use in components
export function useHaptic() {
  return {
    light: () => triggerHaptic("light"),
    medium: () => triggerHaptic("medium"),
    heavy: () => triggerHaptic("heavy"),
    success: () => triggerHaptic("success"),
    warning: () => triggerHaptic("warning"),
    error: () => triggerHaptic("error"),
  };
}
```

**Step 2: Commit**

```bash
git add client/src/lib/haptics.ts
git commit -m "feat: add haptic feedback utilities for mobile devices"
```

---

### Task 13: Add Loading Skeleton for Lists

**Files:**
- Create: `client/src/components/ui/list-skeleton.tsx`

**Step 1: Create reusable list skeleton**

```tsx
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ListSkeletonProps {
  count?: number;
  className?: string;
}

export function ListSkeleton({ count = 3, className }: ListSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="w-8 h-8 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("p-4 bg-white rounded-xl space-y-3", className)}>
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add client/src/components/ui/list-skeleton.tsx
git commit -m "feat: add ListSkeleton and CardSkeleton components"
```

---

## Phase 6: Safe Area & Notch Handling

### Task 14: Update CSS for Safe Areas

**Files:**
- Modify: `client/src/styles/index.css`

**Step 1: Add safe area utilities**

Add to the CSS file:

```css
/* Safe area utilities */
.pt-safe {
  padding-top: env(safe-area-inset-top, 0px);
}

.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.pl-safe {
  padding-left: env(safe-area-inset-left, 0px);
}

.pr-safe {
  padding-right: env(safe-area-inset-right, 0px);
}

.px-safe {
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
}

.py-safe {
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

/* Status bar height placeholder */
.status-bar-spacer {
  height: env(safe-area-inset-top, 44px);
  min-height: 44px;
}
```

**Step 2: Commit**

```bash
git add client/src/styles/index.css
git commit -m "feat: add safe area CSS utilities for notch handling"
```

---

### Task 15: Update BottomNav for Safe Areas

**Files:**
- Modify: `client/src/components/layout/BottomNav.tsx`

**Step 1: Add pb-safe to BottomNav**

The BottomNav already has `pb-safe` but ensure the height accounts for it:

```tsx
<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 pb-safe max-w-[375px] mx-auto">
  <div className="grid grid-cols-5 items-center h-14 w-full">
    {/* ... tabs ... */}
  </div>
</nav>
```

**Step 2: Commit**

```bash
git add client/src/components/layout/BottomNav.tsx
git commit -m "fix: ensure BottomNav respects safe area insets"
```

---

## Summary

This plan transforms MedAlpha-Flow into a Curaay-style mobile app experience through:

1. **Page Transitions** (Tasks 1-4): iOS-style slide animations between pages
2. **Device Frame** (Tasks 5-6): Visual phone frame with status bar on desktop
3. **PWA Foundation** (Tasks 7-8): Manifest and meta tags for installability
4. **Progress Indicators** (Tasks 9-10): Step progress for multi-step flows
5. **Micro-Interactions** (Tasks 11-13): Pull-to-refresh, haptics, skeletons
6. **Safe Areas** (Tasks 14-15): Proper notch and safe area handling

All changes stay within the 375px app container as specified.
