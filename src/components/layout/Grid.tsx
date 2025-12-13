import { cn } from "../../lib/utils";
import { SequentialReveal } from "../animation/SequentialReveal";
import { TIMING } from "../../lib/timing";

interface GridProps {
  children: React.ReactNode[];
  columns?: 2 | 3 | 4;
  gap?: number;
  startFrame?: number;
  stagger?: boolean;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  gap = 6,
  startFrame = 0,
  stagger = true,
  className = "",
}) => {
  const gridClasses = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  if (stagger) {
    return (
      <SequentialReveal
        startFrame={startFrame}
        itemDelay={TIMING.STAGGER_NORMAL}
        itemDuration={TIMING.NORMAL}
        animationType="slide"
        slideDirection="up"
        className={cn(
          "grid",
          gridClasses[columns],
          `gap-${gap}`,
          className
        )}
      >
        {children}
      </SequentialReveal>
    );
  }

  return (
    <div
      className={cn(
        "grid",
        gridClasses[columns],
        `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
};
