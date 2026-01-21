import { TOKENS } from "@/styles/tokens";

export const DURATION_FAST = TOKENS.animation.durationMs.fast / 1000;
export const DURATION_DEFAULT = TOKENS.animation.durationMs.default / 1000;
export const DURATION_SLOW = TOKENS.animation.durationMs.slow / 1000;

export const EASING_DEFAULT = TOKENS.animation.easing.defaultBezier;

export function shouldReduceMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

