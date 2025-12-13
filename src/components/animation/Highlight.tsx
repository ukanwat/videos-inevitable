import { interpolate, useCurrentFrame } from "remotion";
import { TIMING } from "../../lib/timing";
import { cn } from "../../lib/utils";

interface HighlightProps {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  color?: string;
  pulseCount?: number;
  className?: string;
}

export const Highlight: React.FC<HighlightProps> = ({
  children,
  startFrame = 0,
  duration = TIMING.SLOW,
  color = "hsl(var(--primary))",
  pulseCount = 2,
  className = "",
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame - startFrame,
    [0, duration],
    [0, pulseCount * Math.PI * 2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Pulsing shadow/glow
  const glowIntensity = (Math.sin(progress) + 1) / 2; // 0 to 1
  const shadowBlur = interpolate(glowIntensity, [0, 1], [0, 20]);
  const shadowOpacity = interpolate(glowIntensity, [0, 1], [0.2, 0.6]);

  return (
    <div
      className={cn("relative", className)}
      style={{
        boxShadow: `0 0 ${shadowBlur}px ${color.replace(")", `, ${shadowOpacity})`)}`,
        border: `2px solid ${color.replace(")", `, ${shadowOpacity})`)}`,
        borderRadius: "var(--radius)",
      }}
    >
      {children}
    </div>
  );
};
