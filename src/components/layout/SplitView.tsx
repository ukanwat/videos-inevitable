import { cn } from "../../lib/utils";
import { SlideIn } from "../animation/SlideIn";
import { TIMING } from "../../lib/timing";

interface SplitViewProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftLabel?: string;
  rightLabel?: string;
  split?: number; // Percentage for left side (default: 50)
  startFrame?: number;
  className?: string;
}

export const SplitView: React.FC<SplitViewProps> = ({
  left,
  right,
  leftLabel,
  rightLabel,
  split = 50,
  startFrame = 0,
  className = "",
}) => {
  return (
    <div className={cn("grid grid-cols-2 gap-6", className)}>
      {/* Left side */}
      <SlideIn
        startFrame={startFrame}
        direction="left"
        duration={TIMING.NORMAL}
        distance={30}
      >
        <div
          className="h-full"
          style={{ width: `${(split / 50) * 100}%` }}
        >
          {leftLabel && (
            <div className="mb-2 text-sm font-semibold text-muted-foreground">
              {leftLabel}
            </div>
          )}
          <div>{left}</div>
        </div>
      </SlideIn>

      {/* Right side */}
      <SlideIn
        startFrame={startFrame}
        direction="right"
        duration={TIMING.NORMAL}
        distance={30}
        delay={TIMING.STAGGER_SHORT}
      >
        <div
          className="h-full"
          style={{ width: `${((100 - split) / 50) * 100}%` }}
        >
          {rightLabel && (
            <div className="mb-2 text-sm font-semibold text-muted-foreground">
              {rightLabel}
            </div>
          )}
          <div>{right}</div>
        </div>
      </SlideIn>
    </div>
  );
};
