/**
 * Animation timing constants for video production
 * All values in frames (assuming 30fps)
 */

export const TIMING = {
  // Duration presets
  INSTANT: 5, // ~0.16s
  QUICK: 15, // 0.5s
  NORMAL: 30, // 1s
  SLOW: 60, // 2s
  VERY_SLOW: 90, // 3s

  // Code reveal timings
  LINE_DELAY: 10, // Delay between code lines (0.33s)
  CHAR_DELAY: 1, // For potential typewriter effects

  // Standard easing curves (cubic-bezier values)
  EASE_OUT: [0.16, 1, 0.3, 1] as const,
  EASE_IN_OUT: [0.65, 0, 0.35, 1] as const,
  EASE_IN: [0.42, 0, 1, 1] as const,

  // Common animation delays
  STAGGER_SHORT: 5,  // Short stagger between elements
  STAGGER_NORMAL: 10, // Normal stagger
  STAGGER_LONG: 20,  // Long stagger
} as const;

/**
 * FPS constant
 */
export const FPS = 30;

/**
 * Convert seconds to frames
 */
export const secondsToFrames = (seconds: number): number => {
  return Math.round(seconds * FPS);
};

/**
 * Convert frames to seconds
 */
export const framesToSeconds = (frames: number): number => {
  return frames / FPS;
};
