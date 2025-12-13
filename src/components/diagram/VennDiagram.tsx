import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "../../lib/utils";

interface VennDiagramProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  overlapContent: React.ReactNode;
  leftColor?: string;
  rightColor?: string;
  startFrame?: number;
  className?: string;
}

export const VennDiagram: React.FC<VennDiagramProps> = ({
  leftContent,
  rightContent,
  overlapContent,
  leftColor = "hsl(var(--chart-1))",
  rightColor = "hsl(var(--chart-2))",
  startFrame = 0,
  className = "",
}) => {
  const frame = useCurrentFrame();

  // Animation: circles scale in
  const leftCircleScale = interpolate(
    frame,
    [startFrame, startFrame + 30],
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

  const rightCircleScale = interpolate(
    frame,
    [startFrame + 15, startFrame + 45],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      },
    }
  );

  // Content fade in after circles
  const contentOpacity = interpolate(
    frame,
    [startFrame + 40, startFrame + 55],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <div className="relative w-full max-w-5xl h-[600px]">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full absolute inset-0"
          style={{ filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))" }}
        >
          {/* Left circle - bigger and more overlap */}
          <circle
            cx="370"
            cy="300"
            r="260"
            fill={leftColor}
            opacity="0.5"
            style={{
              transform: `scale(${leftCircleScale})`,
              transformOrigin: "340px 300px",
            }}
          />

          {/* Right circle - bigger and more overlap */}
          <circle
            cx="650"
            cy="300"
            r="260"
            fill={rightColor}
            opacity="0.5"
            style={{
              transform: `scale(${rightCircleScale})`,
              transformOrigin: "660px 300px",
            }}
          />
        </svg>

        {/* Content containers positioned over the circles */}
        {/* Left content */}
        <div
          className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[25%] flex items-center justify-center text-center"
          style={{ opacity: contentOpacity }}
        >
          {leftContent}
        </div>

        {/* Overlap content */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] flex items-center justify-center text-center"
          style={{ opacity: contentOpacity }}
        >
          {overlapContent}
        </div>

        {/* Right content */}
        <div
          className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[25%] flex items-center justify-center text-center"
          style={{ opacity: contentOpacity }}
        >
          {rightContent}
        </div>
      </div>
    </div>
  );
};
