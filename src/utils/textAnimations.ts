import { interpolate } from "remotion";

/**
 * Text Animation Utilities for Remotion
 * Helper functions for splitting and animating text
 */

/**
 * Split text by character
 */
export function splitByCharacter(text: string): string[] {
  return text.split("");
}

/**
 * Split text by word (preserves spaces)
 */
export function splitByWord(text: string): string[] {
  // Split by spaces but keep the spaces
  return text.split(/(\s+)/);
}

/**
 * Split text by line
 */
export function splitByLine(text: string): string[] {
  return text.split("\n");
}

/**
 * Get staggered opacity for reveal animations
 */
export function getStaggeredOpacity(
  frame: number,
  startFrame: number,
  index: number,
  staggerDelay: number,
  duration: number = 15
): number {
  const elementStart = startFrame + index * staggerDelay;
  const elementEnd = elementStart + duration;

  return interpolate(frame, [elementStart, elementEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/**
 * Get staggered blur value
 */
export function getStaggeredBlur(
  frame: number,
  startFrame: number,
  index: number,
  staggerDelay: number,
  duration: number = 15,
  maxBlur: number = 10
): number {
  const elementStart = startFrame + index * staggerDelay;
  const elementEnd = elementStart + duration;

  return interpolate(frame, [elementStart, elementEnd], [maxBlur, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/**
 * Get staggered slide offset
 */
export function getStaggeredSlide(
  frame: number,
  startFrame: number,
  index: number,
  staggerDelay: number,
  duration: number = 15,
  distance: number = 20,
  direction: "up" | "down" | "left" | "right" = "up"
): { x: number; y: number } {
  const elementStart = startFrame + index * staggerDelay;
  const elementEnd = elementStart + duration;

  const progress = interpolate(frame, [elementStart, elementEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
 * Calculate total animation duration for staggered animations
 */
export function calculateStaggeredDuration(
  numElements: number,
  staggerDelay: number,
  elementDuration: number = 15
): number {
  return (numElements - 1) * staggerDelay + elementDuration;
}

/**
 * Get typewriter visible characters
 */
export function getTypewriterProgress(
  frame: number,
  startFrame: number,
  totalChars: number,
  charsPerFrame: number = 0.5
): number {
  const progress = (frame - startFrame) * charsPerFrame;
  return Math.min(Math.max(0, Math.floor(progress)), totalChars);
}

/**
 * Get cursor blink state
 */
export function getCursorBlink(frame: number, blinkInterval: number = 20): boolean {
  return Math.floor(frame / blinkInterval) % 2 === 0;
}
