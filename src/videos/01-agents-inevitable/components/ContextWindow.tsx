import { useCurrentFrame, interpolate } from "remotion";
import { TIMING } from "../../../lib/timing";
import { cn } from "../../../lib/utils";

interface ContextWindowProps {
  current: number;
  max: number;
  iterations?: { iteration: number; tokens: number }[]; // Show growth over iterations
  startFrame?: number;
  animationDuration?: number;
  label?: string;
  className?: string;
}

export const ContextWindow: React.FC<ContextWindowProps> = ({
  current,
  max,
  iterations,
  startFrame = 0,
  animationDuration = TIMING.NORMAL,
  label = "Context Window",
  className = "",
}) => {
  const frame = useCurrentFrame();

  // Animate current value growing
  const progress = interpolate(
    frame,
    [startFrame, startFrame + animationDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const animatedCurrent = current * progress;
  const percentage = (animatedCurrent / max) * 100;

  // Color zones: green < 50%, yellow < 80%, red >= 80%
  const getColor = () => {
    if (percentage < 50) return "hsl(var(--chart-2))"; // Green
    if (percentage < 80) return "#f59e0b"; // Yellow
    return "hsl(var(--destructive))"; // Red
  };

  const fillColor = getColor();

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="text-sm font-mono text-muted-foreground">
          {Math.round(animatedCurrent)} / {max} tokens
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-6 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-300 rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: fillColor,
          }}
        />

        {/* Percentage text inside bar */}
        {percentage > 20 && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
            {Math.round(percentage)}%
          </div>
        )}
      </div>

      {/* Iteration history */}
      {iterations && iterations.length > 0 && (
        <div className="mt-4 space-y-1">
          <div className="text-xs font-semibold text-muted-foreground mb-2">
            Token Growth by Iteration:
          </div>
          {iterations.map((iter, index) => {
            const iterProgress = interpolate(
              frame,
              [
                startFrame + index * TIMING.STAGGER_SHORT,
                startFrame + index * TIMING.STAGGER_SHORT + TIMING.QUICK,
              ],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            return (
              <div
                key={iter.iteration}
                className="flex items-center gap-2 text-xs"
                style={{ opacity: iterProgress }}
              >
                <span className="w-20 text-muted-foreground">
                  Iteration {iter.iteration}:
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/50 transition-all"
                    style={{
                      width: `${(iter.tokens / max) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-16 text-right text-muted-foreground font-mono">
                  {iter.tokens}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Warning message */}
      {percentage >= 80 && (
        <div className="text-xs text-destructive bg-destructive/10 border border-destructive rounded p-2">
          ⚠️ Context window approaching limit
        </div>
      )}
    </div>
  );
};
