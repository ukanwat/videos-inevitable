import { interpolate, useCurrentFrame } from "remotion";
import { TIMING } from "../../lib/timing";

interface SlideInProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  startFrame?: number;
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = "up",
  startFrame = 0,
  duration = TIMING.NORMAL,
  delay = 0,
  distance = 20,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const effectiveStart = startFrame + delay;

  const progress = interpolate(
    frame,
    [effectiveStart, effectiveStart + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: (t) => {
        // Ease out cubic
        return 1 - Math.pow(1 - t, 3);
      },
    }
  );

  const opacity = interpolate(progress, [0, 1], [0, 1]);

  let translateX = 0;
  let translateY = 0;

  switch (direction) {
    case "left":
      translateX = interpolate(progress, [0, 1], [-distance, 0]);
      break;
    case "right":
      translateX = interpolate(progress, [0, 1], [distance, 0]);
      break;
    case "up":
      translateY = interpolate(progress, [0, 1], [distance, 0]);
      break;
    case "down":
      translateY = interpolate(progress, [0, 1], [-distance, 0]);
      break;
  }

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
};
