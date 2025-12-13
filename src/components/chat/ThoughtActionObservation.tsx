import { cn } from "../../lib/utils";
import { SlideIn } from "../animation/SlideIn";
import { TIMING } from "../../lib/timing";

interface ThoughtActionObservationProps {
  type: "thought" | "action" | "observation";
  content: string;
  startFrame?: number;
  className?: string;
}

export const ThoughtActionObservation: React.FC<
  ThoughtActionObservationProps
> = ({ type, content, startFrame = 0, className = "" }) => {
  // Styling based on type
  const typeStyles = {
    thought: {
      label: "Thought:",
      container: "bg-accent/30 border-l-4 border-accent italic",
      labelColor: "text-accent-foreground font-semibold",
    },
    action: {
      label: "Action:",
      container: "bg-primary/10 border-l-4 border-primary font-mono",
      labelColor: "text-primary font-semibold",
    },
    observation: {
      label: "Observation:",
      container: "bg-muted border-l-4 border-muted-foreground",
      labelColor: "text-muted-foreground font-semibold",
    },
  };

  const style = typeStyles[type];

  return (
    <SlideIn
      startFrame={startFrame}
      direction="up"
      duration={TIMING.NORMAL}
      distance={15}
    >
      <div
        className={cn(
          "p-4 rounded-r-lg",
          style.container,
          className
        )}
      >
        <div className="flex flex-col gap-2">
          <span className={cn("text-sm", style.labelColor)}>
            {style.label}
          </span>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
            {content}
          </p>
        </div>
      </div>
    </SlideIn>
  );
};
