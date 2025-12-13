import dagre from "dagre";
import {
  WorkflowNodeConfig,
  WorkflowEdgeConfig,
  LayoutConfig,
  ComputedNode,
  ComputedEdge,
  LayoutResult,
  Position,
  Size,
} from "../../types/workflow";
import { generateEdgePath, getLabelPosition } from "./edges";
import { getNodeConnectionPoint } from "./nodeConnections";

/**
 * Default node size
 */
const DEFAULT_NODE_SIZE: Size = {
  width: 160,
  height: 100,
};

/**
 * Diamond node size (larger to accommodate diamond rotation)
 */
const DIAMOND_NODE_SIZE: Size = {
  width: 200,
  height: 200,
};

/**
 * Compute layout for workflow nodes and edges
 */
export function computeLayout(
  nodes: WorkflowNodeConfig[],
  edges: WorkflowEdgeConfig[],
  config: LayoutConfig
): LayoutResult {
  // Add default sizes to nodes (diamond nodes get larger size)
  const nodesWithSize: ComputedNode[] = nodes.map((node) => ({
    ...node,
    position: node.position || { x: 0, y: 0 },
    size: node.size || (node.shape === "diamond" ? DIAMOND_NODE_SIZE : DEFAULT_NODE_SIZE),
  }));

  // Compute positions based on layout type
  let positionedNodes: ComputedNode[];

  switch (config.type) {
    case "manual":
      positionedNodes = nodesWithSize;
      break;
    case "tree":
    case "dag":
    case "force":
    default:
      // Use Dagre for all automatic layouts
      positionedNodes = computeDagreLayout(nodesWithSize, edges, config);
      break;
  }

  // Compute edge paths
  const computedEdges = computeEdgePaths(positionedNodes, edges);

  // Calculate bounds
  const bounds = calculateBounds(positionedNodes);

  // Center if requested
  if (config.centerGraph) {
    const offsetX = -bounds.minX + (config.padding || 0);
    const offsetY = -bounds.minY + (config.padding || 0);

    positionedNodes = positionedNodes.map((node) => ({
      ...node,
      position: {
        x: node.position.x + offsetX,
        y: node.position.y + offsetY,
      },
    }));

    // Recalculate edges with new positions
    const recomputedEdges = computeEdgePaths(positionedNodes, edges);
    const newBounds = calculateBounds(positionedNodes);

    return {
      nodes: positionedNodes,
      edges: recomputedEdges,
      bounds: newBounds,
    };
  }

  return {
    nodes: positionedNodes,
    edges: computedEdges,
    bounds,
  };
}

/**
 * Compute layout using Dagre
 */
function computeDagreLayout(
  nodes: ComputedNode[],
  edges: WorkflowEdgeConfig[],
  config: LayoutConfig
): ComputedNode[] {
  // Create a new directed graph
  const g = new dagre.graphlib.Graph();

  // Set graph options
  g.setGraph({
    rankdir: config.direction === "vertical" ? "TB" : "LR", // Top-Bottom or Left-Right
    nodesep: config.nodeSpacing || 80, // Horizontal space between nodes
    ranksep: config.levelSpacing || 150, // Vertical space between ranks
    marginx: config.padding || 20,
    marginy: config.padding || 20,
  });

  // Default to allow edges
  g.setDefaultEdgeLabel(() => ({}));

  // Add nodes to graph
  nodes.forEach((node) => {
    g.setNode(node.id, {
      width: node.size.width,
      height: node.size.height,
      label: node.label,
    });
  });

  // Add edges to graph
  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  // Run the layout algorithm
  dagre.layout(g);

  // Extract positions from dagre graph
  const positionedNodes: ComputedNode[] = nodes.map((node) => {
    const dagreNode = g.node(node.id);

    if (!dagreNode) {
      return node;
    }

    // Dagre returns center point, we need top-left corner
    return {
      ...node,
      position: {
        x: dagreNode.x - node.size.width / 2,
        y: dagreNode.y - node.size.height / 2,
      },
    };
  });

  return positionedNodes;
}

/**
 * Compute edge paths with arrow positions
 */
function computeEdgePaths(
  nodes: ComputedNode[],
  edges: WorkflowEdgeConfig[]
): ComputedEdge[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return edges.map((edge) => {
    const sourceNode = nodeMap.get(edge.source);
    const targetNode = nodeMap.get(edge.target);

    // Destructure edge to omit labelPosition (ratio) from WorkflowEdgeConfig
    const { labelPosition: labelPositionRatio, ...edgeWithoutLabelPos } = edge;

    if (!sourceNode || !targetNode) {
      return {
        ...edgeWithoutLabelPos,
        path: "",
        sourcePosition: { x: 0, y: 0 },
        targetPosition: { x: 0, y: 0 },
      };
    }

    // Calculate edge connection points based on node shapes
    // First get centers for initial calculation
    const sourceCenter: Position = {
      x: sourceNode.position.x + sourceNode.size.width / 2,
      y: sourceNode.position.y + sourceNode.size.height / 2,
    };

    const targetCenter: Position = {
      x: targetNode.position.x + targetNode.size.width / 2,
      y: targetNode.position.y + targetNode.size.height / 2,
    };

    // Get actual connection points based on node shapes (diamond, circle, rectangle)
    const sourcePos = getNodeConnectionPoint(sourceNode, targetCenter, true);
    const targetPos = getNodeConnectionPoint(targetNode, sourceCenter, false);

    // Generate path
    const path = generateEdgePath(sourcePos, targetPos, edge.type);

    // Calculate label position if label exists
    const computedLabelPosition = edge.label
      ? getLabelPosition(sourcePos, targetPos, labelPositionRatio || 0.5, edge.type)
      : undefined;

    return {
      ...edgeWithoutLabelPos,
      path,
      sourcePosition: sourcePos,
      targetPosition: targetPos,
      labelPosition: computedLabelPosition,
      labelPositionRatio,
    };
  });
}

/**
 * Calculate bounding box
 */
function calculateBounds(nodes: ComputedNode[]) {
  if (nodes.length === 0) {
    return {
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
      width: 0,
      height: 0,
    };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  nodes.forEach((node) => {
    minX = Math.min(minX, node.position.x);
    minY = Math.min(minY, node.position.y);
    maxX = Math.max(maxX, node.position.x + node.size.width);
    maxY = Math.max(maxY, node.position.y + node.size.height);
  });

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
