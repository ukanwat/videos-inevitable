import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "../../../lib/utils";
import { ThoughtActionObservation } from "../../../components/chat/ThoughtActionObservation";
import { ProgressBar } from "../../../components/visualization/ProgressBar";
import { Search, Cloud, Calculator, Check, type LucideIcon } from "lucide-react";

interface Iteration {
  thought: string;
  action: string;
  observation: string;
  contextTokens: number;
  toolIcon?: "search" | "weather" | "calculator" | "other";
}

const iconMap: Record<string, LucideIcon> = {
  search: Search,
  weather: Cloud,
  calculator: Calculator,
};

interface ReActLoopProps {
  iterations: Iteration[];
  maxTokens?: number;
  startFrame?: number;
  iterationDelay?: number;
  className?: string;
}

export const ReActLoop: React.FC<ReActLoopProps> = ({
  iterations,
  maxTokens = 8000,
  startFrame = 0,
  iterationDelay = 90,
  className = "",
}) => {
  const frame = useCurrentFrame();

  // Calculate relative frame (how many frames since we should start animating)
  const relativeFrame = Math.max(0, frame - startFrame);

  // Calculate current iteration based on relative frame
  const currentIterationIndex = Math.min(
    Math.floor(relativeFrame / iterationDelay),
    iterations.length - 1
  );

  // Don't render anything until we've reached startFrame
  if (frame < startFrame) {
    return null;
  }

  const currentIteration = iterations[currentIterationIndex] || iterations[0];
  // Use relative frame for iteration start
  const iterStartFrame = currentIterationIndex * iterationDelay;

  return (
    <div className={cn("w-full h-full flex flex-col items-center justify-center", className)}>
      <div className="w-full max-w-5xl">
        {/* Previous iterations - compact breadcrumb style */}
        {currentIterationIndex > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              {iterations.slice(0, currentIterationIndex).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm">
                    <Check size={14} className="text-primary" />
                    <span className="text-muted-foreground">Iteration {index + 1}</span>
                  </div>
                  {index < currentIterationIndex - 1 && (
                    <span className="text-muted-foreground">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Current iteration - full display */}
      <div className="w-full">
        {/* Iteration header */}
        <div
          className="flex items-center justify-between mb-6"
          style={{
            opacity: interpolate(
              relativeFrame,
              [iterStartFrame, iterStartFrame + 15],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <h3 className="text-3xl font-bold text-foreground">
            Iteration {currentIterationIndex + 1}
          </h3>
          <div className="text-base text-muted-foreground">
            Context: {currentIteration.contextTokens.toLocaleString()} / {maxTokens.toLocaleString()} tokens
          </div>
        </div>

        {/* Step-by-step TAO display */}
        <div className="space-y-6 bg-card border-2 border-primary/20 rounded-xl p-8">
          {/* Thought - Step 1 */}
          <div
            style={{
              opacity: interpolate(
                relativeFrame,
                [iterStartFrame + 15, iterStartFrame + 30],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              transform: `translateY(${interpolate(
                relativeFrame,
                [iterStartFrame + 15, iterStartFrame + 30],
                [20, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )}px)`,
            }}
          >
            <ThoughtActionObservation
              type="thought"
              content={currentIteration.thought}
              startFrame={iterStartFrame + 20}
            />
          </div>

          {/* Action - Step 2 */}
          {relativeFrame >= iterStartFrame + 35 && (
            <div
              style={{
                opacity: interpolate(
                  relativeFrame,
                  [iterStartFrame + 35, iterStartFrame + 50],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                transform: `translateY(${interpolate(
                  relativeFrame,
                  [iterStartFrame + 35, iterStartFrame + 50],
                  [20, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )}px)`,
              }}
            >
              <div className="flex items-start gap-3">
                {currentIteration.toolIcon && iconMap[currentIteration.toolIcon] && (
                  <div className="flex-shrink-0 mt-1">
                    {(() => {
                      const Icon = iconMap[currentIteration.toolIcon];
                      return <Icon size={24} className="text-primary" />;
                    })()}
                  </div>
                )}
                <div className="flex-1">
                  <ThoughtActionObservation
                    type="action"
                    content={currentIteration.action}
                    startFrame={iterStartFrame + 40}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Observation - Step 3 */}
          {relativeFrame >= iterStartFrame + 55 && (
            <div
              style={{
                opacity: interpolate(
                  relativeFrame,
                  [iterStartFrame + 55, iterStartFrame + 70],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                transform: `translateY(${interpolate(
                  relativeFrame,
                  [iterStartFrame + 55, iterStartFrame + 70],
                  [20, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )}px)`,
              }}
            >
              <ThoughtActionObservation
                type="observation"
                content={currentIteration.observation}
                startFrame={iterStartFrame + 60}
              />
            </div>
          )}
        </div>

        {/* Context progress bar */}
        <div
          className="mt-8"
          style={{
            opacity: interpolate(
              relativeFrame,
              [iterStartFrame + 70, iterStartFrame + 85],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <ProgressBar
            current={currentIteration.contextTokens}
            max={maxTokens}
            label="Context Window"
            startFrame={iterStartFrame + 70}
            zones={[
              { threshold: 0, color: "hsl(var(--chart-2))" },
              { threshold: 50, color: "#f59e0b" },
              { threshold: 80, color: "hsl(var(--destructive))" },
            ]}
          />

          {/* Warning if approaching limit */}
          {currentIteration.contextTokens / maxTokens > 0.8 && (
            <div className="mt-3 p-3 bg-destructive/10 border border-destructive rounded-lg">
              <p className="text-sm text-destructive font-medium">
                ⚠️ Warning: Approaching context limit ({Math.round((currentIteration.contextTokens / maxTokens) * 100)}%)
              </p>
            </div>
          )}
        </div>
      </div>

        {/* Iteration counter at bottom */}
        <div className="mt-6 pt-4 text-center text-muted-foreground text-sm">
          Iteration {currentIterationIndex + 1} of {iterations.length}
        </div>
      </div>
    </div>
  );
};
