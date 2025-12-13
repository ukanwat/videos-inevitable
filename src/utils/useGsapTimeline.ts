import { useEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import gsap from "gsap";

// Extend HTMLElement to include GSAP timeline property
interface HTMLElementWithTimeline extends HTMLElement {
  __gsapTimeline?: gsap.core.Timeline;
}

/**
 * Hook to integrate GSAP timeline with Remotion
 * Based on: https://vladimirtopolev.medium.com/how-to-integrate-greensock-with-remotion-58ddaeacf1b9
 *
 * @param gsapTimelineFactory - Function that returns a GSAP timeline instance
 * @returns Ref to attach to animation scope container
 */
export const useGsapTimeline = <T extends HTMLElement>(
  gsapTimelineFactory: () => gsap.core.Timeline
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const animationScopeRef = useRef<T>(null);

  useEffect(() => {
    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Create timeline and immediately pause it
      const timeline = gsapTimelineFactory();
      timeline.pause();

      // Store timeline in a way we can access it in frame sync
      if (animationScopeRef.current) {
        (animationScopeRef.current as HTMLElementWithTimeline).__gsapTimeline = timeline;
      }
    }, animationScopeRef);

    // Cleanup on unmount
    return () => ctx.revert();
  }, [gsapTimelineFactory]);

  // Sync GSAP timeline with Remotion frame
  useEffect(() => {
    if (animationScopeRef.current) {
      const timeline = (animationScopeRef.current as HTMLElementWithTimeline).__gsapTimeline;
      if (timeline) {
        // Convert frame to time: frame / fps = seconds
        const time = frame / fps;
        timeline.seek(time);
      }
    }
  }, [frame, fps]);

  return animationScopeRef;
};
