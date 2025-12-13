/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "../../lib/utils";
import { ScaleIn } from "../animation/ScaleIn";
import { TIMING } from "../../lib/timing";
import { ReactNode } from "react";
import { NodeShape, NodeStatus } from "../../types/workflow";
import * as LucideIcons from "lucide-react";
import { NodeContextBar } from "../visualization/NodeContextBar";

interface WorkflowNodeProps {
  label: string;
  title?: string; // Optional prominent title
  icon?: string; // Lucide icon name
  content?: ReactNode; // Custom content component
  data?: string | { display?: string; contextPercent?: number; [key: string]: any }; // Input/output data shown
  status?: NodeStatus;
  shape?: NodeShape;
  startFrame?: number;
  className?: string;
  children?: ReactNode; // Legacy: Custom content
}

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  label,
  title,
  icon,
  content,
  data,
  status = "pending",
  shape = "rectangle",
  startFrame = 0,
  className = "",
  children,
}) => {
  // Get the Lucide icon component dynamically
  const IconComponent = icon
    ? (LucideIcons as any)[icon] || null
    : null;
  const statusStyles = {
    pending: {
      border: "border-muted-foreground/40",
      bg: "bg-muted/50",
      text: "text-muted-foreground",
      iconColor: "text-muted-foreground",
      glow: "",
    },
    active: {
      border: "border-primary",
      bg: "bg-primary/5",
      text: "text-foreground",
      iconColor: "text-foreground",
      glow: "shadow-[0_0_20px_rgba(var(--primary),0.3)]",
    },
    complete: {
      border: "border-chart-2/60",
      bg: "bg-chart-2/5",
      text: "text-foreground",
      iconColor: "text-foreground",
      glow: "",
    },
    error: {
      border: "border-destructive",
      bg: "bg-destructive/10",
      text: "text-foreground",
      iconColor: "text-foreground",
      glow: "",
    },
  };

  const style = statusStyles[status];

  // For diamond nodes, we'll use a rotated square with rounded corners
  const isDiamond = shape === "diamond";

  return (
    <ScaleIn startFrame={startFrame} duration={TIMING.NORMAL}>
      {/* Outer container for diamond rotation */}
      {isDiamond ? (
        <div className="relative flex items-center justify-center" style={{ width: "140px", height: "140px" }}>
          {/* Opaque background layer */}
          <div
            className="absolute inset-0 rotate-45 rounded-lg border-2 bg-background/95 backdrop-blur-sm"
            style={{
              boxShadow: "0 0 0 15px hsl(var(--background))", // Extra background padding
            }}
          />
          {/* Colored layer */}
          <div
            className={cn(
              "absolute inset-0 rotate-45 rounded-lg border-2 backdrop-blur-sm",
              style.border,
              style.bg,
              style.glow
            )}
          />
          {/* Content (not rotated) */}
          <div className="relative z-10 px-3 text-center max-w-[100px]">
            {/* Icon and Title stacked for compact layout */}
            <div className="flex flex-col items-center justify-center gap-1">
              {IconComponent && (
                <IconComponent className={cn("w-4 h-4", style.iconColor)} />
              )}
              <span className={cn("font-semibold text-xs leading-tight", style.text)}>
                {title || label}
              </span>
            </div>

            {/* Custom content */}
            {content || children ? (
              <div className="mt-1 text-xs">{content || children}</div>
            ) : (
              data && (
                <div className="mt-1 text-[10px]">
                  <NodeContextBar data={data} />
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative p-4 border-2 min-w-[200px] backdrop-blur-sm bg-background/95",
            shape === "rectangle" && "rounded-lg",
            shape === "rounded" && "rounded-xl",
            shape === "circle" && "rounded-full",
            shape === "pill" && "rounded-full",
            style.border,
            style.bg,
            style.glow,
            className
          )}
        >
          {/* Icon and Title side-by-side */}
          <div className="flex items-center gap-2 mb-2">
            {IconComponent && (
              <IconComponent className={cn("w-5 h-5", style.iconColor)} />
            )}
            <span className={cn("font-semibold text-sm", style.text)}>
              {title || label}
            </span>
          </div>

          {/* Custom content */}
          {content || children ? (
            <div className="mt-2">{content || children}</div>
          ) : (
            data && (
              <div className="mt-2">
                <NodeContextBar data={data} />
              </div>
            )
          )}
        </div>
      )}
    </ScaleIn>
  );
};
