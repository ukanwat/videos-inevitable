import { useCurrentFrame, interpolate } from "remotion";
import { Brain, Wrench, Eye } from "lucide-react";
import { FadeIn } from "../../../components/animation/FadeIn";
import { cn } from "../../../lib/utils";

interface ReActCycleDiagramProps {
  startFrame?: number;
  showLabels?: boolean;
  animateLoop?: boolean;
  className?: string;
}

/**
 * Circular diagram showing the ReAct loop: Thought → Action → Observation
 */
export const ReActCycleDiagram: React.FC<ReActCycleDiagramProps> = ({
  startFrame = 0,
  showLabels = true,
  animateLoop = true,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);

  // SVG viewBox dimensions for responsive scaling
  const viewBoxWidth = 1000;
  const viewBoxHeight = 700;

  // Center position
  const centerX = viewBoxWidth / 2;
  const centerY = viewBoxHeight / 2;
  const radius = 180;

  // Node positions (120 degrees apart, starting from top)
  // Using theme colors from Section 1 (chart-1, chart-2, chart-3)
  const nodes = [
    {
      id: "thought",
      label: "Thought",
      description: "Reasoning",
      icon: Brain,
      angle: -90, // Top
      color: "hsl(var(--chart-3))", // Purple
      bgColor: "bg-[hsl(var(--chart-3)/0.15)]",
      borderColor: "border-[hsl(var(--chart-3))]",
      textColor: "text-[hsl(var(--chart-3))]",
    },
    {
      id: "action",
      label: "Action",
      description: "Execute Tool",
      icon: Wrench,
      angle: 30, // Bottom right
      color: "hsl(var(--chart-1))", // Electric blue
      bgColor: "bg-[hsl(var(--chart-1)/0.15)]",
      borderColor: "border-[hsl(var(--chart-1))]",
      textColor: "text-[hsl(var(--chart-1))]",
    },
    {
      id: "observation",
      label: "Observation",
      description: "Get Result",
      icon: Eye,
      angle: 150, // Bottom left
      color: "hsl(var(--chart-2))", // Yellow/Gold
      bgColor: "bg-[hsl(var(--chart-2)/0.15)]",
      borderColor: "border-[hsl(var(--chart-2))]",
      textColor: "text-[hsl(var(--chart-2))]",
    },
  ];

  // Calculate node positions
  const getNodePosition = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  };

  // Animated pulse for loop indication
  const loopProgress = animateLoop
    ? ((relativeFrame % 90) / 90) // Complete cycle every 90 frames (3 seconds)
    : 0;

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
      <div className="relative w-full max-w-5xl mx-auto" style={{ aspectRatio: `${viewBoxWidth}/${viewBoxHeight}` }}>
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="absolute inset-0 w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
        {/* Circular arrows connecting nodes */}
        {nodes.map((node, index) => {
          const nextNode = nodes[(index + 1) % nodes.length];
          const startPos = getNodePosition(node.angle);
          const endPos = getNodePosition(nextNode.angle);

          // Calculate control points for curved arrow
          const midAngle = ((node.angle + nextNode.angle) / 2) + (nextNode.angle < node.angle ? 180 : 0);
          const controlRadius = radius + 60;
          const controlRad = (midAngle * Math.PI) / 180;
          const controlX = centerX + controlRadius * Math.cos(controlRad);
          const controlY = centerY + controlRadius * Math.sin(controlRad);

          // Animate arrow appearance
          const arrowOpacity = interpolate(
            relativeFrame,
            [30 + index * 15, 45 + index * 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Pulse animation for active segment
          const isActiveSegment = animateLoop && loopProgress >= index / 3 && loopProgress < (index + 1) / 3;
          const pulseOpacity = isActiveSegment
            ? interpolate((relativeFrame % 30), [0, 15, 30], [0.3, 1, 0.3])
            : 0.6;

          return (
            <g key={`arrow-${node.id}`} style={{ opacity: arrowOpacity }}>
              {/* Curved path */}
              <path
                d={`M ${startPos.x} ${startPos.y} Q ${controlX} ${controlY} ${endPos.x} ${endPos.y}`}
                fill="none"
                stroke={node.color}
                strokeWidth="3"
                strokeOpacity={pulseOpacity}
                strokeDasharray={animateLoop ? "8 4" : "none"}
                className="transition-all duration-300"
              />

              {/* Arrowhead */}
              <defs>
                <marker
                  id={`arrowhead-${index}`}
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill={node.color} opacity={pulseOpacity} />
                </marker>
              </defs>
              <path
                d={`M ${startPos.x} ${startPos.y} Q ${controlX} ${controlY} ${endPos.x} ${endPos.y}`}
                fill="none"
                stroke="transparent"
                strokeWidth="3"
                markerEnd={`url(#arrowhead-${index})`}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, index) => {
          const pos = getNodePosition(node.angle);
          const Icon = node.icon;

          // Stagger node appearance
          const nodeStartFrame = index * 20;
          const nodeOpacity = interpolate(
            relativeFrame,
            [nodeStartFrame, nodeStartFrame + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const nodeScale = interpolate(
            relativeFrame,
            [nodeStartFrame, nodeStartFrame + 20],
            [0.8, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g
              key={node.id}
              opacity={nodeOpacity}
              transform={`translate(${pos.x}, ${pos.y}) scale(${nodeScale})`}
            >
              {/* Background circle to block arrow lines */}
              <circle
                cx="0"
                cy="0"
                r="55"
                fill="hsl(var(--background))"
              />

              {/* Node circle */}
              <circle
                cx="0"
                cy="0"
                r="50"
                fill={node.color}
                fillOpacity="0.15"
                stroke={node.color}
                strokeWidth="3"
              />

              {/* Icon (positioned as foreignObject for React component) */}
              <foreignObject x="-24" y="-24" width="48" height="48">
                <div className="flex items-center justify-center w-full h-full">
                  <Icon size={48} style={{ color: node.color }} strokeWidth={2} />
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Labels as SVG text elements for proper scaling */}
        {showLabels && nodes.map((node, index) => {
          const labelStartFrame = 60 + index * 15;

          // Calculate label offset (further out from node)
          const labelRadius = radius + 120;
          const labelRad = (node.angle * Math.PI) / 180;
          const labelX = centerX + labelRadius * Math.cos(labelRad);
          const labelY = centerY + labelRadius * Math.sin(labelRad);

          const labelOpacity = interpolate(
            relativeFrame,
            [labelStartFrame, labelStartFrame + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g key={`label-${node.id}`} opacity={labelOpacity}>
              <text
                x={labelX}
                y={labelY}
                fill={node.color}
                fontSize="28"
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {node.label}
              </text>
              <text
                x={labelX}
                y={labelY + 28}
                fill="hsl(var(--muted-foreground))"
                fontSize="16"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {node.description}
              </text>
            </g>
          );
        })}

        {/* Center label: "ReAct" */}
        <g
          opacity={interpolate(
            relativeFrame,
            [90, 120],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )}
        >
          <text
            x={centerX}
            y={centerY - 8}
            fill="hsl(var(--foreground))"
            fontSize="48"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ReAct
          </text>
          <text
            x={centerX}
            y={centerY + 26}
            fill="hsl(var(--muted-foreground))"
            fontSize="16"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Reasoning + Acting
          </text>
        </g>
      </svg>
      </div>
    </div>
  );
};
