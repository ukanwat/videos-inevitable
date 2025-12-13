import { interpolate } from "remotion";
import { TIMING } from "../lib/timing";

/**
 * Common easing functions for Remotion animations
 */
export const Easing = {
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => Math.pow(t, 3),
  easeInOut: (t: number) => t < 0.5 ? 4 * Math.pow(t, 3) : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * Math.pow(t, 3) - c1 * Math.pow(t, 2);
  },
  elastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  bounce: (t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },
};

/**
 * Calculate staggered start frame for item in a sequence
 */
export function getStaggeredFrame(
  baseFrame: number,
  itemIndex: number,
  staggerDelay: number = TIMING.STAGGER_NORMAL
): number {
  return baseFrame + itemIndex * staggerDelay;
}

/**
 * Create opacity fade animation
 */
export function fadeAnimation(
  frame: number,
  startFrame: number,
  duration: number = TIMING.NORMAL,
  delay: number = 0
): number {
  return interpolate(
    frame,
    [startFrame + delay, startFrame + delay + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
}

/**
 * Create slide animation with direction
 */
export function slideAnimation(
  frame: number,
  startFrame: number,
  distance: number = 50,
  duration: number = TIMING.NORMAL,
  delay: number = 0,
  direction: "up" | "down" | "left" | "right" = "up"
): { x: number; y: number } {
  const progress = interpolate(
    frame,
    [startFrame + delay, startFrame + delay + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.easeOut,
    }
  );

  const offset = distance * (1 - progress);

  switch (direction) {
    case "up":
      return { x: 0, y: offset };
    case "down":
      return { x: 0, y: -offset };
    case "left":
      return { x: offset, y: 0 };
    case "right":
      return { x: -offset, y: 0 };
  }
}

/**
 * Create scale animation
 */
export function scaleAnimation(
  frame: number,
  startFrame: number,
  from: number = 0.95,
  to: number = 1,
  duration: number = TIMING.NORMAL,
  delay: number = 0
): number {
  return interpolate(
    frame,
    [startFrame + delay, startFrame + delay + duration],
    [from, to],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.easeOutBack,
    }
  );
}

/**
 * Create rotation animation
 */
export function rotateAnimation(
  frame: number,
  startFrame: number,
  fromDegrees: number = 0,
  toDegrees: number = 360,
  duration: number = TIMING.SLOW,
  delay: number = 0
): number {
  return interpolate(
    frame,
    [startFrame + delay, startFrame + delay + duration],
    [fromDegrees, toDegrees],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
}

/**
 * Create pulsing animation (repeating)
 */
export function pulseAnimation(
  frame: number,
  startFrame: number,
  pulseSpeed: number = 30,
  min: number = 0.8,
  max: number = 1
): number {
  const effectiveFrame = frame - startFrame;
  if (effectiveFrame < 0) return min;

  const cycle = effectiveFrame % pulseSpeed;
  const progress = cycle / pulseSpeed;
  const sine = Math.sin(progress * Math.PI * 2);
  return min + ((sine + 1) / 2) * (max - min);
}

/**
 * Create draw animation for SVG paths (0 to pathLength)
 */
export function drawPathAnimation(
  frame: number,
  startFrame: number,
  pathLength: number,
  duration: number = TIMING.SLOW,
  delay: number = 0,
  reverse: boolean = false
): number {
  const progress = interpolate(
    frame,
    [startFrame + delay, startFrame + delay + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return reverse
    ? pathLength * (1 - progress)
    : pathLength - pathLength * progress;
}

/**
 * Create counting animation for numbers
 */
export function countAnimation(
  frame: number,
  startFrame: number,
  from: number,
  to: number,
  duration: number = TIMING.NORMAL,
  delay: number = 0,
  decimals: number = 0
): string {
  const value = interpolate(
    frame,
    [startFrame + delay, startFrame + delay + duration],
    [from, to],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return value.toFixed(decimals);
}

/**
 * Create wave animation for multiple items
 */
export function waveAnimation(
  frame: number,
  startFrame: number,
  itemIndex: number,
  totalItems: number,
  waveSpeed: number = 60,
  amplitude: number = 20
): number {
  const effectiveFrame = frame - startFrame;
  if (effectiveFrame < 0) return 0;

  const phaseOffset = (itemIndex / totalItems) * Math.PI * 2;
  const waveProgress = (effectiveFrame / waveSpeed) * Math.PI * 2;
  return Math.sin(waveProgress + phaseOffset) * amplitude;
}

/**
 * Create typewriter reveal animation for text
 */
export function typewriterAnimation(
  frame: number,
  startFrame: number,
  totalCharacters: number,
  duration: number = TIMING.SLOW,
  delay: number = 0
): number {
  const progress = interpolate(
    frame,
    [startFrame + delay, startFrame + delay + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return Math.floor(progress * totalCharacters);
}

/**
 * Create sequential reveal for array items
 */
export function sequentialReveal(
  frame: number,
  startFrame: number,
  itemIndex: number,
  itemDelay: number = TIMING.STAGGER_NORMAL,
  itemDuration: number = TIMING.QUICK
): number {
  const itemStartFrame = startFrame + itemIndex * itemDelay;
  return interpolate(
    frame,
    [itemStartFrame, itemStartFrame + itemDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
}

/**
 * Create spring animation
 */
export function springAnimation(
  frame: number,
  startFrame: number,
  duration: number = TIMING.NORMAL,
  delay: number = 0,
  tension: number = 170,
  friction: number = 26
): number {
  const effectiveFrame = frame - startFrame - delay;
  if (effectiveFrame < 0) return 0;
  if (effectiveFrame >= duration) return 1;

  const progress = effectiveFrame / duration;
  const w0 = Math.sqrt(tension);
  const zeta = friction / (2 * Math.sqrt(tension));

  if (zeta < 1) {
    // Under-damped
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    const A = 1;
    const B = (zeta * w0) / wd;
    return 1 - Math.exp(-zeta * w0 * progress) * (A * Math.cos(wd * progress) + B * Math.sin(wd * progress));
  } else {
    // Critically damped or over-damped
    return 1 - Math.exp(-w0 * progress) * (1 + w0 * progress);
  }
}

/**
 * Utility to check if animation should be visible
 */
export function isVisible(
  frame: number,
  startFrame: number,
  endFrame?: number
): boolean {
  if (endFrame !== undefined) {
    return frame >= startFrame && frame <= endFrame;
  }
  return frame >= startFrame;
}

/**
 * Create looping animation progress (0 to 1, repeating)
 */
export function loopAnimation(
  frame: number,
  startFrame: number,
  loopDuration: number = TIMING.SLOW
): number {
  const effectiveFrame = frame - startFrame;
  if (effectiveFrame < 0) return 0;

  const progress = (effectiveFrame % loopDuration) / loopDuration;
  return progress;
}
