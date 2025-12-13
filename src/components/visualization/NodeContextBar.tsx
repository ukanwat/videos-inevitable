/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "../../lib/utils";

interface NodeContextBarProps {
  data: any;
}

/**
 * Displays a context usage percentage bar for workflow nodes
 * Shows token counts and a color-coded progress indicator
 */
export const NodeContextBar: React.FC<NodeContextBarProps> = ({ data }) => {
  if (!data) return null;

  const displayText = data.display || (typeof data === 'string' ? data : null);
  const contextPercent = data.contextPercent;

  // If there's no displayText and no contextPercent, don't render anything
  if (!displayText && typeof contextPercent !== 'number') {
    return null;
  }

  return (
    <div className="space-y-1.5">
      {displayText && (
        <div className="p-2 bg-background/80 rounded text-xs font-mono text-foreground whitespace-pre-line">
          {displayText}
        </div>
      )}

      {/* Context usage percentage bar */}
      {typeof contextPercent === 'number' && (
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Context</span>
            <span className={cn(
              "font-mono font-semibold",
              contextPercent < 50 ? "text-chart-2" :
              contextPercent < 80 ? "text-yellow-600" :
              "text-destructive"
            )}>
              {Math.round(contextPercent)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${Math.min(contextPercent, 100)}%`,
                backgroundColor:
                  contextPercent < 50 ? "hsl(var(--chart-2))" :
                  contextPercent < 80 ? "#f59e0b" :
                  "hsl(var(--destructive))"
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
