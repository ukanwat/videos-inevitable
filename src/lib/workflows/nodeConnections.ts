import { Position, Size, ComputedNode } from "../../types/workflow";

/**
 * Calculate the edge connection point for a node
 * Handles different node shapes (diamond, circle, rectangle)
 */
export function getNodeConnectionPoint(
  node: ComputedNode,
  targetPosition: Position,
  isSource: boolean
): Position {
  const nodeCenter: Position = {
    x: node.position.x + node.size.width / 2,
    y: node.position.y + node.size.height / 2,
  };

  // For diamond shaped nodes, calculate intersection with diamond edges
  if (node.shape === "diamond") {
    return getDiamondConnectionPoint(
      nodeCenter,
      node.size,
      targetPosition,
      isSource
    );
  }

  // For circular shaped nodes, calculate intersection with circle
  if (node.shape === "circle" || node.shape === "pill") {
    return getCircleConnectionPoint(
      nodeCenter,
      Math.min(node.size.width, node.size.height) / 2,
      targetPosition
    );
  }

  // For rectangular nodes, calculate intersection with rectangle edges
  return getRectangleConnectionPoint(
    node.position,
    node.size,
    targetPosition
  );
}

/**
 * Calculate connection point on a diamond (rotated square)
 * The diamond is rendered as a rotated square with rounded corners.
 * We need to calculate the intersection point with the diamond boundary.
 */
function getDiamondConnectionPoint(
  center: Position,
  size: Size,
  targetPosition: Position,
  isSource: boolean
): Position {
  // Calculate angle from center to target
  const dx = targetPosition.x - center.x;
  const dy = targetPosition.y - center.y;


  // For a diamond (rotated square), the tips are at the cardinal directions
  // The distance from center to tip is sqrt(2) * (sideLength / 2) for a rotated square
  // But since we want to connect to the visual diamond shape (not the container),
  // we need to account for the actual rotated square inside the container.

  // A 200x200 container with a rotated square has the square's diagonal equal to the container
  // The rotated square's side length = container_size / sqrt(2)
  // The distance from center to tip = container_size / 2

  // However, we have rounded corners and padding, so we use a scale factor
  // The actual diamond shape is slightly smaller than the container
  const effectiveRadius = Math.min(size.width, size.height) / 2;

  // Calculate the intersection with the diamond boundary
  // For a diamond, we calculate based on the Manhattan distance (L1 norm)
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  const manhattanDistance = absDx + absDy;

  if (manhattanDistance === 0) {
    // Target is at center, return a default point
    return { x: center.x + effectiveRadius * 0.7, y: center.y };
  }

  // Scale factor to reach the diamond boundary
  // The diamond boundary satisfies: |x| + |y| = radius
  const scale = (effectiveRadius * 0.7) / manhattanDistance;

  return {
    x: center.x + dx * scale,
    y: center.y + dy * scale,
  };
}

/**
 * Calculate connection point on a circle
 */
function getCircleConnectionPoint(
  center: Position,
  radius: number,
  targetPosition: Position
): Position {
  const dx = targetPosition.x - center.x;
  const dy = targetPosition.y - center.y;
  const angle = Math.atan2(dy, dx);

  // Reduce radius slightly to account for border
  const adjustedRadius = radius * 0.9;

  return {
    x: center.x + Math.cos(angle) * adjustedRadius,
    y: center.y + Math.sin(angle) * adjustedRadius,
  };
}

/**
 * Calculate connection point on a rectangle
 */
function getRectangleConnectionPoint(
  position: Position,
  size: Size,
  targetPosition: Position
): Position {
  const center: Position = {
    x: position.x + size.width / 2,
    y: position.y + size.height / 2,
  };

  const dx = targetPosition.x - center.x;
  const dy = targetPosition.y - center.y;

  // Determine which edge of the rectangle to connect to
  const slope = dy / dx;
  const rectSlope = size.height / size.width;

  // Reduce size slightly to account for border and padding
  const padding = 5;

  if (Math.abs(slope) < rectSlope) {
    // Connect to left or right edge
    if (dx > 0) {
      // Right edge
      return {
        x: position.x + size.width - padding,
        y: center.y + (dy / dx) * (size.width / 2 - padding),
      };
    } else {
      // Left edge
      return {
        x: position.x + padding,
        y: center.y - (dy / dx) * (size.width / 2 - padding),
      };
    }
  } else {
    // Connect to top or bottom edge
    if (dy > 0) {
      // Bottom edge
      return {
        x: center.x + (dx / dy) * (size.height / 2 - padding),
        y: position.y + size.height - padding,
      };
    } else {
      // Top edge
      return {
        x: center.x - (dx / dy) * (size.height / 2 - padding),
        y: position.y + padding,
      };
    }
  }
}
