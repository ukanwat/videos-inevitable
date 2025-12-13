import { cn } from "../../lib/utils";
import { FadeIn } from "../animation/FadeIn";
import { SlideIn } from "../animation/SlideIn";
import { TIMING } from "../../lib/timing";

interface ChatComparisonProps {
  query: string;
  responseA: string;
  responseB: string;
  selected?: "A" | "B";
  labelA?: string;
  labelB?: string;
  startFrame?: number;
  className?: string;
}

export const ChatComparison: React.FC<ChatComparisonProps> = ({
  query,
  responseA,
  responseB,
  selected,
  labelA = "Response A",
  labelB = "Response B",
  startFrame = 0,
  className = "",
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Query */}
      <FadeIn startFrame={startFrame} duration={TIMING.NORMAL}>
        <div className="text-center p-4 bg-secondary rounded-lg">
          <p className="text-sm font-medium text-secondary-foreground">
            {query}
          </p>
        </div>
      </FadeIn>

      {/* Responses side-by-side */}
      <div className="grid grid-cols-2 gap-4">
        {/* Response A */}
        <SlideIn
          startFrame={startFrame + TIMING.QUICK}
          direction="left"
          duration={TIMING.NORMAL}
        >
          <div
            className={cn(
              "p-4 rounded-lg border-2 transition-all",
              selected === "A"
                ? "border-chart-2 bg-chart-2/10"
                : "border bg-muted opacity-70"
            )}
          >
            <div className="mb-2">
              <span className="text-xs font-semibold text-muted-foreground">
                {labelA}
              </span>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {responseA}
            </p>
          </div>
        </SlideIn>

        {/* Response B */}
        <SlideIn
          startFrame={startFrame + TIMING.QUICK}
          direction="right"
          duration={TIMING.NORMAL}
        >
          <div
            className={cn(
              "p-4 rounded-lg border-2 transition-all",
              selected === "B"
                ? "border-chart-2 bg-chart-2/10"
                : "border bg-muted opacity-70"
            )}
          >
            <div className="mb-2">
              <span className="text-xs font-semibold text-muted-foreground">
                {labelB}
              </span>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {responseB}
            </p>
          </div>
        </SlideIn>
      </div>
    </div>
  );
};
