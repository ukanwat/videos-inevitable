import { useCurrentFrame } from "remotion";
import { ComputedEdge } from "../../types/workflow";
import { calculatePathLength, getPositionAlongPath } from "../../lib/workflows/edges";
import {
  getEdgeDrawProgress,
  getEdgeStrokeDash,
  getFlowAnimationStyle,
} from "../../lib/workflows/animations";
import { cn } from "../../lib/utils";

interface WorkflowEdgeProps {
  edge: ComputedEdge;
  startFrame: number;
  className?: string;
}

/**
 * Animated edge component for workflow diagrams
 */
export const WorkflowEdge: React.FC<WorkflowEdgeProps> = ({
  edge,
  startFrame,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const pathLength = calculatePathLength(
    edge.sourcePosition,
    edge.targetPosition,
    edge.type
  );

  // Edge drawing animation
  const drawProgress = getEdgeDrawProgress(frame, startFrame);
  const { strokeDasharray, strokeDashoffset } = getEdgeStrokeDash(
    pathLength,
    drawProgress
  );

  // Flow animation style
  const flowAnimation = edge.flowAnimation
    ? getFlowAnimationStyle({
        frame,
        startFrame: startFrame + 30, // Start flow after edge is drawn
        pathLength,
        type: edge.flowAnimation,
        color: edge.color,
      })
    : null;

  // Edge color
  const edgeColor = edge.color || "hsl(var(--muted-foreground))";

  return (
    <g className={cn("workflow-edge", className)}>
      {/* Arrow marker definition */}
      <defs>
        <marker
          id={`arrow-${edge.id}`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path
            d="M 0 0 L 10 5 L 0 10 z"
            fill={edgeColor}
            opacity={drawProgress}
          />
        </marker>

        {/* Gradient for gradient flow */}
        {flowAnimation?.type === "gradient" && (
          <linearGradient id={`gradient-${edge.id}`} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={edgeColor} stopOpacity="0" />
            <stop offset="50%" stopColor={edgeColor} stopOpacity="1" />
            <stop offset="100%" stopColor={edgeColor} stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="0 0"
              to="1 0"
              dur="2s"
              repeatCount="indefinite"
            />
          </linearGradient>
        )}
      </defs>

      {/* Main edge path */}
      <path
        d={edge.path}
        fill="none"
        stroke={
          flowAnimation?.type === "gradient"
            ? `url(#gradient-${edge.id})`
            : edgeColor
        }
        strokeWidth="2"
        strokeDasharray={edge.animated ? strokeDasharray : undefined}
        strokeDashoffset={edge.animated ? strokeDashoffset : undefined}
        markerEnd={`url(#arrow-${edge.id})`}
        opacity={edge.animated ? Math.min(drawProgress * 2, 1) : 1}
      />

      {/* Pulse animation overlay */}
      {flowAnimation?.type === "pulse" && drawProgress >= 1 && (
        <path
          d={edge.path}
          fill="none"
          stroke={edgeColor}
          strokeWidth="4"
          opacity={flowAnimation.opacity! * 0.5}
          pointerEvents="none"
        />
      )}

      {/* Dots animation */}
      {(flowAnimation?.type === "dots" || flowAnimation?.type === "particles") &&
        drawProgress >= 1 &&
        flowAnimation.positions?.map((position, index) => {
          const point = getPositionAlongPath(
            edge.sourcePosition,
            edge.targetPosition,
            position,
            edge.type
          );

          return (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={flowAnimation.type === "particles" ? 3 : 4}
              fill={edgeColor}
              opacity={flowAnimation.opacity || 1}
            />
          );
        })}

      {/* Edge label */}
      {edge.label && edge.labelPosition && drawProgress >= 0.5 && (
        <g>
          {/* Background for label */}
          <rect
            x={edge.labelPosition.x - 30}
            y={edge.labelPosition.y - 12}
            width="60"
            height="24"
            fill="hsl(var(--background))"
            stroke={edgeColor}
            strokeWidth="1"
            rx="4"
            opacity={Math.min((drawProgress - 0.5) * 2, 1)}
          />
          {/* Label text */}
          <text
            x={edge.labelPosition.x}
            y={edge.labelPosition.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-medium fill-foreground"
            opacity={Math.min((drawProgress - 0.5) * 2, 1)}
          >
            {edge.label}
          </text>
        </g>
      )}
    </g>
  );
};
