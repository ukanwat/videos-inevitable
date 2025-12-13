import { useCurrentFrame } from "remotion";
import { useMemo } from "react";
import {
  WorkflowNodeConfig,
  WorkflowEdgeConfig,
  LayoutConfig,
  AnimationConfig,
} from "../../types/workflow";
import { computeLayout } from "../../lib/workflows/layout";
import { WorkflowEdge } from "./WorkflowEdge";
import { WorkflowNode } from "./WorkflowNode";
import {
  getStaggeredNodeFrame,
  getStaggeredEdgeFrame,
} from "../../lib/workflows/animations";

interface WorkflowGraphProps {
  nodes: WorkflowNodeConfig[];
  edges: WorkflowEdgeConfig[];
  layout?: Partial<LayoutConfig>;
  animation?: AnimationConfig;
  startFrame?: number;
  viewBox?: {
    width: number;
    height: number;
  };
  className?: string;
}

/**
 * Main workflow graph component that renders an animated workflow diagram
 */
export const WorkflowGraph: React.FC<WorkflowGraphProps> = ({
  nodes,
  edges,
  layout: layoutConfig,
  animation: animationConfig,
  startFrame = 0,
  viewBox = { width: 1000, height: 600 },
  className = "",
}) => {
  const _frame = useCurrentFrame(); // Reserved for future animation use

  // Default layout configuration
  const defaultLayout: LayoutConfig = {
    type: "dag",
    direction: "horizontal",
    nodeSpacing: 80,
    levelSpacing: 200,
    padding: 50,
    centerGraph: true,
    ...layoutConfig,
  };

  // Default animation configuration
  const defaultAnimation: AnimationConfig = {
    nodeDelay: 10,
    edgeDelay: 15,
    sequenceDelay: 0,
    staggerNodes: true,
    staggerEdges: true,
    ...animationConfig,
  };

  // Compute layout (memoized)
  const layoutResult = useMemo(
    () => computeLayout(nodes, edges, defaultLayout),
    [nodes, edges, defaultLayout]
  );

  const { nodes: computedNodes, edges: computedEdges, bounds } = layoutResult;

  // Calculate viewBox to fit all nodes
  const effectiveViewBox = viewBox || {
    width: bounds.width + defaultLayout.padding! * 2,
    height: bounds.height + defaultLayout.padding! * 2,
  };

  return (
    <div className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${effectiveViewBox.width} ${effectiveViewBox.height}`}
        className="overflow-visible"
      >
        {/* Render edges first (below nodes) */}
        <g className="workflow-edges">
          {computedEdges.map((edge, index) => {
            const edgeStartFrame = defaultAnimation.staggerEdges
              ? getStaggeredEdgeFrame(
                  startFrame + (defaultAnimation.sequenceDelay || 0),
                  index,
                  computedNodes.length,
                  defaultAnimation.edgeDelay
                )
              : startFrame + (defaultAnimation.sequenceDelay || 0);

            return (
              <WorkflowEdge
                key={edge.id}
                edge={edge}
                startFrame={edgeStartFrame}
              />
            );
          })}
        </g>

        {/* Render nodes (above edges) */}
        <g className="workflow-nodes">
          {computedNodes.map((node, index) => {
            const nodeStartFrame = defaultAnimation.staggerNodes
              ? getStaggeredNodeFrame(
                  startFrame + (defaultAnimation.sequenceDelay || 0),
                  index,
                  defaultAnimation.nodeDelay
                )
              : startFrame + (defaultAnimation.sequenceDelay || 0);

            // Opaque background rectangle to prevent edge bleed-through
            // Smaller padding for diamond nodes to avoid gaps
            const bgPadding = node.shape === "diamond" ? 2 : 5;

            return (
              <g key={node.id}>
                {/* Background rectangle with extra padding */}
                <rect
                  x={node.position.x - bgPadding}
                  y={node.position.y - bgPadding}
                  width={node.size.width + bgPadding * 2}
                  height={node.size.height + bgPadding * 2}
                  fill="hsl(var(--background))"
                  opacity="1"
                />

                {/* Node content */}
                <foreignObject
                  x={node.position.x}
                  y={node.position.y}
                  width={node.size.width}
                  height={node.size.height}
                  className="overflow-visible"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <WorkflowNode
                      label={node.label || node.id}
                      title={node.title}
                      icon={node.icon}
                      content={node.content}
                      data={node.data as any}
                      status={node.status}
                      shape={node.shape}
                      startFrame={nodeStartFrame}
                      className={node.className}
                    />
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
