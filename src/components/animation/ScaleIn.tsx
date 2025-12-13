import { interpolate, useCurrentFrame } from "remotion";
import { TIMING } from "../../lib/timing";

interface ScaleInProps {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  delay?: number;
  from?: number;
  className?: string;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  startFrame = 0,
  duration = TIMING.NORMAL,
  delay = 0,
  from = 0.9,
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
        // Ease out back (slight overshoot)
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      },
    }
  );

  const scale = interpolate(progress, [0, 1], [from, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
};
