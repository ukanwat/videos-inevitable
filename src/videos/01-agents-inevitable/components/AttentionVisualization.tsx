import { useCurrentFrame, interpolate } from "remotion";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { TIMING } from "../../../lib/timing";
import { cn } from "../../../lib/utils";

interface AttentionVisualizationProps {
  tokens: string[];
  weights: number[][]; // Attention matrix: weights[i][j] = attention from token i to token j
  sourceIndex?: number; // Which token to show attention from (if undefined, show all)
  startFrame?: number;
  animationDuration?: number;
  className?: string;
}

export const AttentionVisualization: React.FC<AttentionVisualizationProps> = ({
  tokens,
  weights,
  sourceIndex,
  startFrame = 0,
  animationDuration = TIMING.SLOW,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const svgRef = useRef<SVGSVGElement>(null);

  const progress = interpolate(
    frame,
    [startFrame, startFrame + animationDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  useEffect(() => {
    if (!svgRef.current || !tokens || tokens.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth || 800;
    const height = svgRef.current.clientHeight || 400;
    const margin = { top: 60, right: 20, bottom: 20, left: 20 };

    const innerWidth = width - margin.left - margin.right;
    const tokenSpacing = innerWidth / tokens.length;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Token positions
    const tokenPositions = tokens.map((_, i) => ({
      x: i * tokenSpacing + tokenSpacing / 2,
      y: height / 2,
    }));

    // Draw attention lines
    if (sourceIndex !== undefined) {
      // Show attention from specific token
      const sourcePos = tokenPositions[sourceIndex];

      weights[sourceIndex].forEach((weight, targetIndex) => {
        if (targetIndex === sourceIndex) return; // Skip self-attention

        const targetPos = tokenPositions[targetIndex];

        // Line thickness based on attention weight
        const strokeWidth = weight * 10;

        // Color intensity based on weight
        const opacity = weight * progress;

        // Draw curved line
        const path = d3.path();
        path.moveTo(sourcePos.x, sourcePos.y);
        const controlY = sourcePos.y - 80; // Curve upward
        path.quadraticCurveTo(
          (sourcePos.x + targetPos.x) / 2,
          controlY,
          targetPos.x,
          targetPos.y
        );

        g.append("path")
          .attr("d", path.toString())
          .attr("stroke", "hsl(var(--yellow))")
          .attr("stroke-width", strokeWidth)
          .attr("fill", "none")
          .attr("opacity", opacity)
          .attr("stroke-linecap", "round");

        // Add weight label
        if (weight > 0.1 && progress > 0.5) {
          g.append("text")
            .attr("x", (sourcePos.x + targetPos.x) / 2)
            .attr("y", controlY - 10)
            .attr("text-anchor", "middle")
            .attr("fill", "hsl(var(--yellow))")
            .attr("font-size", "11px")
            .attr("font-weight", "600")
            .attr("opacity", (progress - 0.5) * 2)
            .text(weight.toFixed(2));
        }
      });
    }

    // Draw tokens
    tokenPositions.forEach((pos, i) => {
      const isSource = i === sourceIndex;

      // Token circle
      g.append("circle")
        .attr("cx", pos.x)
        .attr("cy", pos.y)
        .attr("r", isSource ? 25 : 20)
        .attr("fill", isSource ? "hsl(var(--yellow))" : "hsl(var(--card))")
        .attr("stroke", isSource ? "hsl(var(--yellow))" : "hsl(var(--border))")
        .attr("stroke-width", isSource ? 3 : 2)
        .attr("opacity", progress);

      // Token text
      g.append("text")
        .attr("x", pos.x)
        .attr("y", pos.y + 40)
        .attr("text-anchor", "middle")
        .attr("fill", "hsl(var(--foreground))")
        .attr("font-size", "14px")
        .attr("font-weight", isSource ? "700" : "500")
        .attr("opacity", progress)
        .text(tokens[i]);
    });

    // Title
    if (sourceIndex !== undefined) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("fill", "hsl(var(--foreground))")
        .attr("font-size", "16px")
        .attr("font-weight", "600")
        .attr("opacity", progress)
        .text(`Attention from "${tokens[sourceIndex]}"`);
    }
  }, [tokens, weights, sourceIndex, progress]);

  return (
    <div className={cn("w-full h-full", className)}>
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
};
