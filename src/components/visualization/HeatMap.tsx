import { useCurrentFrame, interpolate } from "remotion";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { TIMING } from "../../lib/timing";
import { cn } from "../../lib/utils";

interface HeatMapProps {
  data: number[][]; // 2D array of values
  labels?: string[]; // Row/column labels (tokens for attention)
  startFrame?: number;
  animationDuration?: number;
  highlightCell?: [number, number]; // [row, col] to emphasize
  colorScheme?: "blues" | "reds" | "greens" | "purples";
  className?: string;
}

export const HeatMap: React.FC<HeatMapProps> = ({
  data,
  labels,
  startFrame = 0,
  animationDuration = TIMING.SLOW,
  highlightCell,
  colorScheme = "blues",
  className = "",
}) => {
  const frame = useCurrentFrame();
  const svgRef = useRef<SVGSVGElement>(null);

  // Animation progress
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
    if (!svgRef.current || !data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth || 400;
    const height = svgRef.current.clientHeight || 400;
    const margin = { top: 40, right: 20, bottom: 40, left: 40 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const numRows = data.length;
    const numCols = data[0]?.length || 0;

    const cellWidth = innerWidth / numCols;
    const cellHeight = innerHeight / numRows;

    // Color scale
    const maxValue = Math.max(...data.flat());
    const minValue = Math.min(...data.flat());

    const colorScales = {
      blues: d3.interpolateBlues,
      reds: d3.interpolateReds,
      greens: d3.interpolateGreens,
      purples: d3.interpolatePurples,
    };

    const colorScale = d3
      .scaleSequential(colorScales[colorScheme])
      .domain([minValue, maxValue]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw cells
    data.forEach((row, i) => {
      row.forEach((value, j) => {
        const isHighlighted =
          highlightCell && highlightCell[0] === i && highlightCell[1] === j;

        g.append("rect")
          .attr("x", j * cellWidth)
          .attr("y", i * cellHeight)
          .attr("width", cellWidth - 1)
          .attr("height", cellHeight - 1)
          .attr("fill", colorScale(value))
          .attr("opacity", progress)
          .attr("stroke", isHighlighted ? "hsl(var(--yellow))" : "none")
          .attr("stroke-width", isHighlighted ? 3 : 0);

        // Add text value
        if (progress > 0.5) {
          g.append("text")
            .attr("x", j * cellWidth + cellWidth / 2)
            .attr("y", i * cellHeight + cellHeight / 2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", value > (maxValue + minValue) / 2 ? "white" : "black")
            .attr("font-size", "12px")
            .attr("opacity", (progress - 0.5) * 2)
            .text(value.toFixed(2));
        }
      });
    });

    // Add labels if provided
    if (labels) {
      // Column labels (top)
      labels.forEach((label, i) => {
        g.append("text")
          .attr("x", i * cellWidth + cellWidth / 2)
          .attr("y", -10)
          .attr("text-anchor", "middle")
          .attr("fill", "hsl(var(--foreground))")
          .attr("font-size", "12px")
          .attr("opacity", progress)
          .text(label);
      });

      // Row labels (left)
      labels.forEach((label, i) => {
        g.append("text")
          .attr("x", -10)
          .attr("y", i * cellHeight + cellHeight / 2)
          .attr("text-anchor", "end")
          .attr("dominant-baseline", "middle")
          .attr("fill", "hsl(var(--foreground))")
          .attr("font-size", "12px")
          .attr("opacity", progress)
          .text(label);
      });
    }
  }, [data, labels, progress, highlightCell, colorScheme]);

  return (
    <div className={cn("w-full h-full", className)}>
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
};
