import { cn } from "../../lib/utils";
import { ScaleIn } from "../animation/ScaleIn";
import { TIMING } from "../../lib/timing";

interface VideoCardProps {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "emphasis" | "muted";
  startFrame?: number;
  className?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  title,
  children,
  variant = "default",
  startFrame = 0,
  className = "",
}) => {
  const variantStyles = {
    default: "bg-card border",
    emphasis: "bg-accent border-accent border-2",
    muted: "bg-muted border-muted-foreground/20",
  };

  return (
    <ScaleIn startFrame={startFrame} duration={TIMING.NORMAL} from={0.98}>
      <div
        className={cn(
          "rounded-lg border p-6 shadow-sm",
          variantStyles[variant],
          className
        )}
      >
        {title && (
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            {title}
          </h3>
        )}
        <div className="text-foreground">{children}</div>
      </div>
    </ScaleIn>
  );
};
