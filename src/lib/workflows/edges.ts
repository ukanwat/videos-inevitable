import { Position, EdgeType } from "../../types/workflow";

/**
 * Generate SVG path for edge connecting two nodes
 */
export function generateEdgePath(
  source: Position,
  target: Position,
  type: EdgeType = "bezier"
): string {
  switch (type) {
    case "straight":
      return generateStraightPath(source, target);
    case "bezier":
      return generateBezierPath(source, target);
    case "orthogonal":
      return generateOrthogonalPath(source, target);
    case "step":
      return generateStepPath(source, target);
    default:
      return generateBezierPath(source, target);
  }
}

/**
 * Straight line path
 */
function generateStraightPath(source: Position, target: Position): string {
  return `M ${source.x},${source.y} L ${target.x},${target.y}`;
}

/**
 * Smooth bezier curve (S-curve for left-to-right flow)
 */
function generateBezierPath(source: Position, target: Position): string {
  const dx = target.x - source.x;
  const dy = target.y - source.y;

  // Control points for smooth S-curve
  // Adjust based on direction of flow
  const isHorizontal = Math.abs(dx) > Math.abs(dy);

  if (isHorizontal) {
    // Horizontal flow
    const controlPointOffset = Math.abs(dx) * 0.5;
    const cp1x = source.x + controlPointOffset;
    const cp1y = source.y;
    const cp2x = target.x - controlPointOffset;
    const cp2y = target.y;

    return `M ${source.x},${source.y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${target.x},${target.y}`;
  } else {
    // Vertical flow
    const controlPointOffset = Math.abs(dy) * 0.5;
    const cp1x = source.x;
    const cp1y = source.y + controlPointOffset;
    const cp2x = target.x;
    const cp2y = target.y - controlPointOffset;

    return `M ${source.x},${source.y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${target.x},${target.y}`;
  }
}

/**
 * Orthogonal path (Manhattan routing)
 */
function generateOrthogonalPath(source: Position, target: Position): string {
  const dx = target.x - source.x;
  const dy = target.y - source.y;

  // Middle point
  const midX = source.x + dx / 2;

  return `M ${source.x},${source.y}
          L ${midX},${source.y}
          L ${midX},${target.y}
          L ${target.x},${target.y}`;
}

/**
 * Step path (staircase)
 */
function generateStepPath(source: Position, target: Position): string {
  const dx = target.x - source.x;
  const dy = target.y - source.y;

  // Create steps
  const stepX = source.x + dx;

  return `M ${source.x},${source.y}
          L ${stepX},${source.y}
          L ${stepX},${target.y}`;
}

/**
 * Calculate position along edge path at given ratio (0-1)
 */
export function getPositionAlongPath(
  source: Position,
  target: Position,
  ratio: number,
  type: EdgeType = "bezier"
): Position {
  ratio = Math.max(0, Math.min(1, ratio)); // Clamp to 0-1

  if (type === "straight") {
    return {
      x: source.x + (target.x - source.x) * ratio,
      y: source.y + (target.y - source.y) * ratio,
    };
  }

  if (type === "bezier") {
    // Use cubic bezier formula
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const isHorizontal = Math.abs(dx) > Math.abs(dy);

    if (isHorizontal) {
      const controlPointOffset = Math.abs(dx) * 0.5;
      const cp1x = source.x + controlPointOffset;
      const cp1y = source.y;
      const cp2x = target.x - controlPointOffset;
      const cp2y = target.y;

      return cubicBezierPoint(
        source,
        { x: cp1x, y: cp1y },
        { x: cp2x, y: cp2y },
        target,
        ratio
      );
    } else {
      const controlPointOffset = Math.abs(dy) * 0.5;
      const cp1x = source.x;
      const cp1y = source.y + controlPointOffset;
      const cp2x = target.x;
      const cp2y = target.y - controlPointOffset;

      return cubicBezierPoint(
        source,
        { x: cp1x, y: cp1y },
        { x: cp2x, y: cp2y },
        target,
        ratio
      );
    }
  }

  // For orthogonal and step, approximate with line segments
  return {
    x: source.x + (target.x - source.x) * ratio,
    y: source.y + (target.y - source.y) * ratio,
  };
}

/**
 * Calculate point on cubic bezier curve
 */
function cubicBezierPoint(
  p0: Position,
  p1: Position,
  p2: Position,
  p3: Position,
  t: number
): Position {
  const t2 = t * t;
  const t3 = t2 * t;
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;

  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  };
}

/**
 * Calculate approximate path length (for animations)
 */
export function calculatePathLength(
  source: Position,
  target: Position,
  type: EdgeType = "bezier"
): number {
  if (type === "straight") {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // For curves, approximate by sampling points
  const samples = 20;
  let length = 0;
  let prevPoint = source;

  for (let i = 1; i <= samples; i++) {
    const ratio = i / samples;
    const point = getPositionAlongPath(source, target, ratio, type);
    const dx = point.x - prevPoint.x;
    const dy = point.y - prevPoint.y;
    length += Math.sqrt(dx * dx + dy * dy);
    prevPoint = point;
  }

  return length;
}

/**
 * Get label position along edge
 */
export function getLabelPosition(
  source: Position,
  target: Position,
  ratio: number = 0.5,
  type: EdgeType = "bezier"
): Position {
  return getPositionAlongPath(source, target, ratio, type);
}
