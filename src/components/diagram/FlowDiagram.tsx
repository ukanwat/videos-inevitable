import { useCurrentFrame, interpolate } from "remotion";
import { useEffect, useRef } from "react";
import { TIMING } from "../../lib/timing";
import { cn } from "../../lib/utils";

interface FlowNode {
  id: string;
  label: string;
  type?: "rect" | "circle" | "diamond";
  x: number;
  y: number;
}

interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

interface FlowDiagramProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  activeNodes?: string[]; // IDs of highlighted nodes
  startFrame?: number;
  layout?: "horizontal" | "vertical" | "custom";
  className?: string;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  edges,
  activeNodes = [],
  startFrame = 0,
  layout = "horizontal",
  className = "",
}) => {
  const frame = useCurrentFrame();
  const svgRef = useRef<SVGSVGElement>(null);

  // Node animation progress
  const nodeProgress = interpolate(
    frame,
    [startFrame, startFrame + TIMING.NORMAL],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Edge animation progress (after nodes)
  const edgeProgress = interpolate(
    frame,
    [startFrame + TIMING.NORMAL, startFrame + TIMING.NORMAL + TIMING.SLOW],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Auto-layout if not custom
  const positionedNodes = nodes.map((node, index) => {
    if (layout === "custom") {
      return node;
    }

    const spacing = 200;
    if (layout === "horizontal") {
      return {
        ...node,
        x: index * spacing + 100,
        y: 200,
      };
    } else {
      return {
        ...node,
        x: 200,
        y: index * spacing + 100,
      };
    }
  });

  useEffect(() => {
    if (!svgRef.current) return;

    // SVG will be rendered in JSX below
    // This useEffect can be used for D3 animations if needed
  }, [positionedNodes, edges, nodeProgress, edgeProgress, activeNodes]);

  const getNodePath = (node: FlowNode) => {
    const size = 80;
    const halfSize = size / 2;

    switch (node.type || "rect") {
      case "circle":
        return `M ${node.x},${node.y} m -${halfSize},0 a ${halfSize},${halfSize} 0 1,0 ${size},0 a ${halfSize},${halfSize} 0 1,0 -${size},0`;
      case "diamond":
        return `M ${node.x},${node.y - halfSize} L ${node.x + halfSize},${node.y} L ${node.x},${node.y + halfSize} L ${node.x - halfSize},${node.y} Z`;
      default: // rect
        return `M ${node.x - halfSize},${node.y - halfSize} h ${size} v ${size} h -${size} Z`;
    }
  };

  const getEdgePath = (edge: FlowEdge) => {
    const fromNode = positionedNodes.find((n) => n.id === edge.from);
    const toNode = positionedNodes.find((n) => n.id === edge.to);

    if (!fromNode || !toNode) return "";

    // Simple straight line (can be enhanced with curves)
    return `M ${fromNode.x},${fromNode.y} L ${toNode.x},${toNode.y}`;
  };

  return (
    <div className={cn("w-full h-full", className)}>
      <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 600">
        {/* Edges */}
        {edges.map((edge, index) => {
          const path = getEdgePath(edge);
          const pathElement = svgRef.current?.querySelector(`#edge-${index}`) as SVGPathElement | null;
          const pathLength = pathElement?.getTotalLength() || 100;

          return (
            <g key={`edge-${index}`}>
              <path
                id={`edge-${index}`}
                d={path}
                fill="none"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - edgeProgress)}
                markerEnd="url(#arrowhead)"
              />
              {edge.label && edgeProgress > 0.5 && (
                <text
                  x={
                    (positionedNodes.find((n) => n.id === edge.from)?.x || 0) +
                    (positionedNodes.find((n) => n.id === edge.to)?.x || 0)
                  }
                  y={
                    (positionedNodes.find((n) => n.id === edge.from)?.y || 0) +
                    (positionedNodes.find((n) => n.id === edge.to)?.y || 0)
                  }
                  fill="hsl(var(--foreground))"
                  fontSize="12"
                  textAnchor="middle"
                  opacity={edgeProgress}
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {positionedNodes.map((node) => {
          const isActive = activeNodes.includes(node.id);
          const path = getNodePath(node);

          return (
            <g key={node.id}>
              <path
                d={path}
                fill={isActive ? "hsl(var(--primary))" : "hsl(var(--card))"}
                stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth={isActive ? 3 : 1}
                opacity={nodeProgress}
                transform={`scale(${nodeProgress})`}
                style={{
                  transformOrigin: `${node.x}px ${node.y}px`,
                }}
              />
              <text
                x={node.x}
                y={node.y}
                fill={isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"}
                fontSize="14"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
                opacity={nodeProgress}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="hsl(var(--muted-foreground))"
            />
          </marker>
        </defs>
      </svg>
    </div>
  );
};
