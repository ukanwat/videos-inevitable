/**
 * Layout algorithms for workflow positioning
 */
export type LayoutType = "tree" | "dag" | "force" | "manual";

/**
 * Edge curve types
 */
export type EdgeType = "bezier" | "straight" | "orthogonal" | "step";

/**
 * Data flow animation types
 */
export type FlowAnimationType = "pulse" | "dots" | "particles" | "gradient" | "none";

/**
 * Node shapes for visual representation
 */
export type NodeShape = "rectangle" | "diamond" | "circle" | "rounded" | "pill";

/**
 * Node status for state visualization
 */
export type NodeStatus = "pending" | "active" | "complete" | "error";

/**
 * Position in 2D space
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Size dimensions
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * Configuration for a workflow node
 */
export interface WorkflowNodeConfig {
  id: string;
  shape?: NodeShape; // Visual shape of the node
  label?: string;
  title?: string; // Optional title (displayed prominently)
  icon?: string; // Optional Lucide icon name
  content?: React.ReactNode; // Optional custom content
  data?: Record<string, unknown>;
  position?: Position;
  size?: Size;
  status?: NodeStatus;
  className?: string;
}

/**
 * Props passed to custom node components
 */
export interface WorkflowNodeProps {
  id: string;
  data?: Record<string, unknown>;
  status?: NodeStatus;
}

/**
 * Configuration for a workflow edge
 */
export interface WorkflowEdgeConfig {
  id: string;
  source: string;
  target: string;
  type?: EdgeType;
  animated?: boolean;
  flowAnimation?: FlowAnimationType;
  label?: string;
  labelPosition?: number; // 0-1, position along edge
  className?: string;
  color?: string;
}

/**
 * Animation timing configuration
 */
export interface AnimationConfig {
  nodeDelay?: number; // Frames between each node reveal
  edgeDelay?: number; // Frames between each edge reveal
  sequenceDelay?: number; // Frames for overall sequence start
  staggerNodes?: boolean; // Stagger node animations
  staggerEdges?: boolean; // Stagger edge animations
}

/**
 * Layout configuration options
 */
export interface LayoutConfig {
  type: LayoutType;
  direction?: "horizontal" | "vertical" | "radial";
  nodeSpacing?: number;
  levelSpacing?: number;
  padding?: number;
  centerGraph?: boolean;
}

/**
 * Complete workflow configuration
 */
export interface WorkflowConfig {
  nodes: WorkflowNodeConfig[];
  edges: WorkflowEdgeConfig[];
  layout: LayoutConfig;
  animation?: AnimationConfig;
  viewBox?: {
    width: number;
    height: number;
  };
}

/**
 * Computed node with position information
 */
export interface ComputedNode extends WorkflowNodeConfig {
  position: Position;
  size: Size;
}

/**
 * Computed edge with path information
 */
export interface ComputedEdge extends Omit<WorkflowEdgeConfig, 'labelPosition'> {
  path: string; // SVG path string
  sourcePosition: Position;
  targetPosition: Position;
  labelPosition?: Position; // Computed actual position (different from config's ratio)
  labelPositionRatio?: number; // Original ratio from config
}

/**
 * Layout result after computation
 */
export interface LayoutResult {
  nodes: ComputedNode[];
  edges: ComputedEdge[];
  bounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    width: number;
    height: number;
  };
}
