import { useCurrentFrame, interpolate } from "remotion";
import { useEffect, useRef, useState } from "react";
import { TIMING } from "../../../lib/timing";

export interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startFrame?: number;
  loop?: boolean;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  pathColor = "hsl(var(--muted-foreground))",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "hsl(var(--primary))",
  gradientStopColor = "hsl(var(--chart-2))",
  delay = 0,
  duration = TIMING.SLOW,
  startFrame = 0,
  loop = true,
}) => {
  const frame = useCurrentFrame();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const pathRef = useRef<SVGPathElement>(null);

  // Calculate positions and create path
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const fromX = fromRect.left - containerRect.left + fromRect.width / 2;
      const fromY = fromRect.top - containerRect.top + fromRect.height / 2;
      const toX = toRect.left - containerRect.left + toRect.width / 2;
      const toY = toRect.top - containerRect.top + toRect.height / 2;

      const controlPointX = fromX + (toX - fromX) / 2;
      const controlPointY = fromY + (toY - fromY) / 2 + curvature;

      const path = `M ${fromX},${fromY} Q ${controlPointX},${controlPointY} ${toX},${toY}`;
      setPathD(path);
      setSvgDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });
    };

    updatePath();

    // Update on resize
    const observer = new ResizeObserver(updatePath);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  // Animate beam
  const pathLength = pathRef.current?.getTotalLength() || 0;

  const effectiveFrame = frame - startFrame - delay;

  let progress: number;
  if (loop) {
    // Loop the animation
    const loopFrame = effectiveFrame % duration;
    progress = interpolate(
      loopFrame,
      [0, duration],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  } else {
    // Play once
    progress = interpolate(
      effectiveFrame,
      [0, duration],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  }

  const offset = reverse ? pathLength * (1 - progress) : pathLength * -1 * (1 - progress);

  // Fade in the entire beam
  const beamOpacity = interpolate(
    effectiveFrame,
    [0, TIMING.QUICK],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  if (!pathD) return null;

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-0"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <defs>
        <linearGradient id={`gradient-${startFrame}`} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Static path */}
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        fill="none"
      />

      {/* Animated beam */}
      <path
        ref={pathRef}
        d={pathD}
        stroke={`url(#gradient-${startFrame})`}
        strokeWidth={pathWidth}
        fill="none"
        strokeDasharray={pathLength}
        strokeDashoffset={offset}
        opacity={beamOpacity}
      />
    </svg>
  );
};
