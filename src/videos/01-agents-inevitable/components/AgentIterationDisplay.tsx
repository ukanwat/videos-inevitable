import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "../../../lib/utils";
import { FadeIn } from "../../../components/animation/FadeIn";
import {
  Search,
  Cloud,
  Calculator,
  Check,
  Plane,
  Hotel,
  DollarSign,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";

interface IterationStep {
  thought: string;
  action: string;
  observation: string;
  contextTokens: number;
  toolIcon?: keyof typeof iconMap;
}

interface AgentIterationDisplayProps {
  iterations: IterationStep[];
  maxTokens?: number;
  startFrame?: number;
  iterationDuration?: number; // How long each iteration stays visible
  showFinalAnswer?: boolean;
  finalAnswer?: string;
  className?: string;
}

const iconMap = {
  search: Search,
  weather: Cloud,
  calculator: Calculator,
  plane: Plane,
  hotel: Hotel,
  dollar: DollarSign,
  check: CheckCircle,
} as const;

/**
 * Beautiful display for agent iterations with tool icons and context tracking
 */
export const AgentIterationDisplay: React.FC<AgentIterationDisplayProps> = ({
  iterations,
  maxTokens = 8000,
  startFrame = 0,
  iterationDuration = 150, // 5 seconds per iteration
  showFinalAnswer = false,
  finalAnswer,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);

  // Calculate which iteration we're on
  const currentIterationIndex = Math.min(
    Math.floor(relativeFrame / iterationDuration),
    iterations.length - 1
  );

  const currentIteration = iterations[currentIterationIndex];
  const iterStartFrame = currentIterationIndex * iterationDuration;
  const inIterationFrame = relativeFrame - iterStartFrame;

  // Check if we're in the final answer phase
  const finalAnswerStartFrame = iterations.length * iterationDuration;
  const showFinal = showFinalAnswer && relativeFrame >= finalAnswerStartFrame;

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      {/* Progress breadcrumbs - shows completed iterations */}
      {currentIterationIndex > 0 && !showFinal && (
        <FadeIn startFrame={startFrame + iterationDuration} duration={20}>
          <div className="mb-8 px-4">
            <div className="flex items-center gap-3 flex-wrap justify-center max-w-4xl mx-auto">
              {iterations.slice(0, currentIterationIndex).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-chart-2/10 rounded-full border-2 border-chart-2/30">
                    <Check size={18} className="text-chart-2" strokeWidth={2.5} />
                    <span className="text-sm font-semibold text-foreground">
                      Iteration {index + 1}
                    </span>
                  </div>
                  {index < currentIterationIndex - 1 && (
                    <span className="text-xl text-muted-foreground">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* Current iteration display */}
      {!showFinal && (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-5xl px-4">
            {/* Iteration header */}
            <div
              className="flex items-center justify-between mb-8"
              style={{
                opacity: interpolate(
                  inIterationFrame,
                  [0, 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
              }}
            >
              <h3 className="text-4xl font-bold text-foreground">
                Iteration {currentIterationIndex + 1}
              </h3>
              <div className="text-xl font-semibold text-muted-foreground">
                {currentIterationIndex + 1} / {iterations.length}
              </div>
            </div>

            {/* TAO Card */}
            <div
              className="bg-card border-2 border-primary/20 rounded-2xl p-8 shadow-lg space-y-6"
              style={{
                opacity: interpolate(
                  inIterationFrame,
                  [10, 30],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
              }}
            >
              {/* Thought */}
              <div
                style={{
                  opacity: interpolate(
                    inIterationFrame,
                    [30, 50],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  transform: `translateY(${interpolate(
                    inIterationFrame,
                    [30, 50],
                    [20, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  )}px)`,
                }}
              >
                <div className="flex items-start gap-4 p-4 bg-[hsl(var(--chart-3)/0.1)] border-l-4 border-[hsl(var(--chart-3))] rounded-r-lg">
                  <div className="flex-shrink-0 text-[hsl(var(--chart-3))] font-bold text-sm uppercase tracking-wide pt-0.5">
                    Thought
                  </div>
                  <p className="flex-1 text-base leading-relaxed text-foreground italic font-serif">
                    {currentIteration.thought}
                  </p>
                </div>
              </div>

              {/* Action */}
              {inIterationFrame > 60 && (
                <div
                  style={{
                    opacity: interpolate(
                      inIterationFrame,
                      [60, 80],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    ),
                    transform: `translateY(${interpolate(
                      inIterationFrame,
                      [60, 80],
                      [20, 0],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    )}px)`,
                  }}
                >
                  <div className="flex items-start gap-4 p-4 bg-[hsl(var(--chart-1)/0.1)] border-l-4 border-[hsl(var(--chart-1))] rounded-r-lg">
                    <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
                      <span className="text-[hsl(var(--chart-1))] font-bold text-sm uppercase tracking-wide">
                        Action
                      </span>
                      {currentIteration.toolIcon && iconMap[currentIteration.toolIcon] && (() => {
                        const Icon = iconMap[currentIteration.toolIcon];
                        return <Icon size={20} className="text-[hsl(var(--chart-1))]" strokeWidth={2.5} />;
                      })()}
                    </div>
                    <p className="flex-1 text-base leading-relaxed text-foreground font-mono">
                      {currentIteration.action}
                    </p>
                  </div>
                </div>
              )}

              {/* Observation */}
              {inIterationFrame > 90 && (
                <div
                  style={{
                    opacity: interpolate(
                      inIterationFrame,
                      [90, 110],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    ),
                    transform: `translateY(${interpolate(
                      inIterationFrame,
                      [90, 110],
                      [20, 0],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    )}px)`,
                  }}
                >
                  <div className="flex items-start gap-4 p-4 bg-[hsl(var(--chart-2)/0.1)] border-l-4 border-[hsl(var(--chart-2))] rounded-r-lg">
                    <div className="flex-shrink-0 text-[hsl(var(--chart-2))] font-bold text-sm uppercase tracking-wide pt-0.5">
                      Observation
                    </div>
                    <p className="flex-1 text-base leading-relaxed text-foreground">
                      {currentIteration.observation}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Context window progress */}
            {inIterationFrame > 110 && (
              <div
                className="mt-8"
                style={{
                  opacity: interpolate(
                    inIterationFrame,
                    [110, 130],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-semibold text-muted-foreground">Context Window</span>
                  <span className="text-base font-mono font-semibold text-foreground">
                    {currentIteration.contextTokens.toLocaleString()} / {maxTokens.toLocaleString()} tokens
                  </span>
                </div>
                <div className="relative h-4 bg-muted/50 rounded-full overflow-hidden border border-border">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${(currentIteration.contextTokens / maxTokens) * 100}%`,
                      backgroundColor:
                        currentIteration.contextTokens / maxTokens < 0.5
                          ? "hsl(var(--chart-2))"
                          : currentIteration.contextTokens / maxTokens < 0.8
                            ? "#f59e0b"
                            : "hsl(var(--destructive))",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Final Answer */}
      {showFinal && finalAnswer && (
        <FadeIn startFrame={startFrame + finalAnswerStartFrame} duration={40}>
          <div className="flex-1 pt-48 flex items-center justify-center px-12 text-black">
            <div className="w-full max-w-4xl text-center space-y-8">
              {/* Success checkmark */}
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-chart-2/20 flex items-center justify-center">
                  <CheckCircle size={64} className="text-chart-2" strokeWidth={2} />
                </div>
              </div>

              {/* Completed badge */}
              <div className="inline-block px-6 py-2 bg-chart-2/20 border-2 border-chart-2 rounded-full">
                <span className="text-black font-bold  text-lg">
                  ✓ All iterations complete
                </span>
              </div>

              {/* Final answer */}
              <div className="bg-card border-2 border-chart-2/30 rounded-2xl p-8">
                <div className="text-chart-2 font-bold text-sm uppercase tracking-wide mb-4">
                  Final Answer
                </div>
                <p className="text-2xl leading-relaxed text-foreground">
                  {finalAnswer}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
};
