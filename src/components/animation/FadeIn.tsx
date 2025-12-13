import { interpolate, useCurrentFrame } from "remotion";
import { TIMING } from "../../lib/timing";

interface FadeInProps {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  startFrame = 0,
  duration = TIMING.NORMAL,
  delay = 0,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const effectiveStart = startFrame + delay;

  const opacity = interpolate(
    frame,
    [effectiveStart, effectiveStart + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div className={className} style={{ opacity }}>
      {children}
    </div>
  );
};
