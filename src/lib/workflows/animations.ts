import { interpolate } from "remotion";
import { FlowAnimationType } from "../../types/workflow";

/**
 * Animation timing constants
 */
export const WORKFLOW_TIMING = {
  NODE_REVEAL: 20, // Frames for node to reveal
  EDGE_REVEAL: 30, // Frames for edge to draw
  NODE_STAGGER: 10, // Frames between node reveals
  EDGE_STAGGER: 15, // Frames between edge reveals
  STATUS_TRANSITION: 20, // Frames for status change
  FLOW_SPEED: 60, // Frames for one flow cycle
};

/**
 * Easing functions
 */
export const easing = {
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => Math.pow(t, 3),
  easeInOut: (t: number) =>
    t < 0.5 ? 4 * Math.pow(t, 3) : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

/**
 * Calculate node reveal animation progress
 */
export function getNodeRevealProgress(
  frame: number,
  startFrame: number,
  duration: number = WORKFLOW_TIMING.NODE_REVEAL
): number {
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easing.easeOutBack,
    }
  );
}

/**
 * Calculate edge draw animation progress (stroke-dashoffset)
 */
export function getEdgeDrawProgress(
  frame: number,
  startFrame: number,
  duration: number = WORKFLOW_TIMING.EDGE_REVEAL
): number {
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easing.easeInOut,
    }
  );
}

/**
 * Calculate flow animation position (0-1 along path)
 */
export function getFlowAnimationPosition(
  frame: number,
  startFrame: number,
  speed: number = WORKFLOW_TIMING.FLOW_SPEED
): number {
  const relativeFrame = frame - startFrame;
  // Loop continuously
  return (relativeFrame % speed) / speed;
}

/**
 * Get pulse opacity for flow animation
 */
export function getPulseOpacity(
  frame: number,
  startFrame: number,
  speed: number = WORKFLOW_TIMING.FLOW_SPEED
): number {
  const position = getFlowAnimationPosition(frame, startFrame, speed);
  // Fade in and out as it travels
  return Math.sin(position * Math.PI);
}

/**
 * Generate positions for multiple dots along edge
 */
export function getFlowDotsPositions(
  frame: number,
  startFrame: number,
  numDots: number = 3,
  speed: number = WORKFLOW_TIMING.FLOW_SPEED
): number[] {
  const positions: number[] = [];
  const spacing = 1 / numDots;

  for (let i = 0; i < numDots; i++) {
    const offset = i * spacing;
    let position = getFlowAnimationPosition(frame, startFrame, speed) + offset;

    // Wrap around
    if (position > 1) {
      position = position - 1;
    }

    positions.push(position);
  }

  return positions;
}

/**
 * Get gradient position for flow animation
 */
export function getGradientFlowOffset(
  frame: number,
  startFrame: number,
  speed: number = WORKFLOW_TIMING.FLOW_SPEED
): string {
  const position = getFlowAnimationPosition(frame, startFrame, speed);
  const offset = position * 200 - 100; // -100% to 100%
  return `${offset}%`;
}

/**
 * Calculate staggered start frame for nodes
 */
export function getStaggeredNodeFrame(
  baseFrame: number,
  nodeIndex: number,
  stagger: number = WORKFLOW_TIMING.NODE_STAGGER
): number {
  return baseFrame + nodeIndex * stagger;
}

/**
 * Calculate staggered start frame for edges
 */
export function getStaggeredEdgeFrame(
  baseFrame: number,
  edgeIndex: number,
  nodeCount: number,
  stagger: number = WORKFLOW_TIMING.EDGE_STAGGER
): number {
  // Start edges after all nodes have started appearing
  const nodesCompleteFrame = baseFrame + (nodeCount - 1) * WORKFLOW_TIMING.NODE_STAGGER + WORKFLOW_TIMING.NODE_REVEAL;
  return nodesCompleteFrame + edgeIndex * stagger;
}

/**
 * Get stroke-dasharray and stroke-dashoffset for edge drawing
 */
export function getEdgeStrokeDash(
  pathLength: number,
  progress: number
): { strokeDasharray: string; strokeDashoffset: number } {
  return {
    strokeDasharray: `${pathLength}`,
    strokeDashoffset: pathLength * (1 - progress),
  };
}

/**
 * Flow animation renderer based on type
 */
export interface FlowAnimationProps {
  frame: number;
  startFrame: number;
  pathLength: number;
  type: FlowAnimationType;
  color?: string;
}

/**
 * Get flow animation style based on type
 */
export function getFlowAnimationStyle(
  props: FlowAnimationProps
): {
  type: FlowAnimationType;
  positions?: number[];
  opacity?: number;
  gradientOffset?: string;
} {
  const { frame, startFrame, type } = props;

  switch (type) {
    case "pulse":
      return {
        type: "pulse",
        opacity: getPulseOpacity(frame, startFrame),
      };

    case "dots":
      return {
        type: "dots",
        positions: getFlowDotsPositions(frame, startFrame, 3),
      };

    case "particles":
      return {
        type: "particles",
        positions: getFlowDotsPositions(frame, startFrame, 5),
        opacity: 0.8,
      };

    case "gradient":
      return {
        type: "gradient",
        gradientOffset: getGradientFlowOffset(frame, startFrame),
      };

    default:
      return { type: "none" };
  }
}
