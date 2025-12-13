import { useCurrentFrame, interpolate } from "remotion";
import { TIMING } from "../../lib/timing";
import { cn } from "../../lib/utils";

interface Zone {
  threshold: number; // Percentage (0-100)
  color: string;
}

interface ProgressBarProps {
  current: number;
  max: number;
  startFrame?: number;
  animationDuration?: number;
  label?: string;
  zones?: Zone[]; // Color zones for green/yellow/red
  orientation?: "horizontal" | "vertical";
  showPercentage?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  startFrame = 0,
  animationDuration = TIMING.NORMAL,
  label,
  zones,
  orientation = "horizontal",
  showPercentage = true,
  className = "",
}) => {
  const frame = useCurrentFrame();

  // Animate progress from 0 to current value
  const progress = interpolate(
    frame,
    [startFrame, startFrame + animationDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: (t) => 1 - Math.pow(1 - t, 3), // Ease out
    }
  );

  const animatedCurrent = current * progress;
  const percentage = (animatedCurrent / max) * 100;

  // Determine color based on zones
  const getColor = () => {
    if (!zones || zones.length === 0) {
      return "hsl(var(--chart-1))";
    }

    // Sort zones by threshold descending
    const sortedZones = [...zones].sort((a, b) => b.threshold - a.threshold);

    for (const zone of sortedZones) {
      if (percentage >= zone.threshold) {
        return zone.color;
      }
    }

    return zones[0].color;
  };

  const fillColor = getColor();

  return (
    <div className={cn("relative", className)}>
      {label && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {showPercentage && (
            <span className="text-sm text-muted-foreground">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          "relative bg-muted rounded-full overflow-hidden",
          orientation === "horizontal" ? "h-4" : "w-4 h-64"
        )}
      >
        <div
          className="absolute transition-all duration-300 rounded-full"
          style={{
            backgroundColor: fillColor,
            ...(orientation === "horizontal"
              ? {
                  width: `${percentage}%`,
                  height: "100%",
                  top: 0,
                  left: 0,
                }
              : {
                  width: "100%",
                  height: `${percentage}%`,
                  bottom: 0,
                  left: 0,
                }),
          }}
        />
      </div>

      {!label && showPercentage && (
        <div className="mt-1 text-xs text-muted-foreground text-center">
          {Math.round(animatedCurrent)} / {max}
        </div>
      )}
    </div>
  );
};
