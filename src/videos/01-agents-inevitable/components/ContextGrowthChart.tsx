import { useCurrentFrame, interpolate } from "remotion";
import { FadeIn } from "../../../components/animation/FadeIn";
import { SlideIn } from "../../../components/animation/SlideIn";
import { cn } from "../../../lib/utils";
import { RefreshCw } from "lucide-react";

interface ContextScenario {
  label: string;
  description: string;
  contextTokens: number;
  color: string;
}

interface ContextGrowthChartProps {
  startFrame?: number;
  maxTokens?: number;
  scenarios?: ContextScenario[];
  showReActLoop?: boolean;
  className?: string;
}

/**
 * Visualizes how context grows from simple to complex requests,
 * while the ReAct pattern remains constant
 */
export const ContextGrowthChart: React.FC<ContextGrowthChartProps> = ({
  startFrame = 0,
  maxTokens = 200000,
  scenarios = [
    {
      label: "Simple Trip",
      description: "Direct flight + hotel",
      contextTokens: 8000,
      color: "hsl(var(--chart-2))",
    },
    {
      label: "Multi-City",
      description: "London stopover",
      contextTokens: 45000,
      color: "hsl(var(--electric-blue))",
    },
    {
      label: "Complex Planning",
      description: "5 cities, preferences, constraints",
      contextTokens: 180000,
      color: "hsl(var(--purple))",
    },
  ],
  showReActLoop = true,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);

  // Chart dimensions (viewBox coordinates for responsive scaling)
  const chartWidth = 1000;
  const chartHeight = 500;
  const paddingLeft = 120;
  const paddingRight = 80;
  const paddingTop = 50;
  const paddingBottom = 100;

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  // Calculate bar positions
  const barWidth = (plotWidth / scenarios.length) * 0.6;
  const sectionWidth = plotWidth / scenarios.length;

  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <div className="w-full max-w-6xl">
        {/* Title */}
        <FadeIn startFrame={startFrame} duration={30}>
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-foreground mb-3">
              Context Scales. Pattern Stays.
            </h2>
            <p className="text-xl text-muted-foreground">
              The ReAct loop handles any complexity
            </p>
          </div>
        </FadeIn>

        <div className="flex items-center justify-center gap-12">
          {/* Chart */}
          <div className="flex-1 max-w-4xl">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Y-axis */}
              <SlideIn startFrame={startFrame + 20} direction="down" duration={30} distance={30}>
                <g>
                  {/* Y-axis line */}
                  <line
                    x1={paddingLeft}
                    y1={paddingTop}
                    x2={paddingLeft}
                    y2={chartHeight - paddingBottom}
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                  />

                  {/* Y-axis label */}
                  <text
                    x={paddingLeft - 80}
                    y={paddingTop + plotHeight / 2}
                    fill="hsl(var(--muted-foreground))"
                    fontSize="16"
                    fontWeight="500"
                    textAnchor="middle"
                    transform={`rotate(-90, ${paddingLeft - 80}, ${paddingTop + plotHeight / 2})`}
                  >
                    Context Tokens
                  </text>

                  {/* Y-axis ticks */}
                  {[0, 50000, 100000, 150000, 200000].map((value, index) => {
                    const y = chartHeight - paddingBottom - (value / maxTokens) * plotHeight;
                    return (
                      <g key={value}>
                        <line
                          x1={paddingLeft - 5}
                          y1={y}
                          x2={paddingLeft}
                          y2={y}
                          stroke="hsl(var(--border))"
                          strokeWidth="1"
                        />
                        <text
                          x={paddingLeft - 10}
                          y={y + 4}
                          fill="hsl(var(--muted-foreground))"
                          fontSize="12"
                          textAnchor="end"
                        >
                          {value / 1000}K
                        </text>
                        {/* Grid line */}
                        <line
                          x1={paddingLeft}
                          y1={y}
                          x2={chartWidth - paddingRight}
                          y2={y}
                          stroke="hsl(var(--border))"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                          opacity="0.2"
                        />
                      </g>
                    );
                  })}
                </g>
              </SlideIn>

              {/* X-axis */}
              <SlideIn startFrame={startFrame + 30} direction="left" duration={30} distance={30}>
                <g>
                  {/* X-axis line */}
                  <line
                    x1={paddingLeft}
                    y1={chartHeight - paddingBottom}
                    x2={chartWidth - paddingRight}
                    y2={chartHeight - paddingBottom}
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                  />

                  {/* X-axis label */}
                  <text
                    x={paddingLeft + plotWidth / 2}
                    y={chartHeight - paddingBottom + 70}
                    fill="hsl(var(--muted-foreground))"
                    fontSize="16"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    Query Complexity
                  </text>
                </g>
              </SlideIn>

              {/* Bars */}
              {scenarios.map((scenario, index) => {
                const barStartFrame = 50 + index * 30;
                const x = paddingLeft + sectionWidth * index + sectionWidth / 2;
                const barHeight = (scenario.contextTokens / maxTokens) * plotHeight;
                const y = chartHeight - paddingBottom - barHeight;

                const barOpacity = interpolate(
                  relativeFrame,
                  [barStartFrame, barStartFrame + 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                const animatedHeight = interpolate(
                  relativeFrame,
                  [barStartFrame, barStartFrame + 30],
                  [0, barHeight],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
                  }
                );

                return (
                  <g key={index} style={{ opacity: barOpacity }}>
                    {/* Bar */}
                    <rect
                      x={x - barWidth / 2}
                      y={chartHeight - paddingBottom - animatedHeight}
                      width={barWidth}
                      height={animatedHeight}
                      fill={scenario.color}
                      opacity="0.8"
                      rx="6"
                    />

                    {/* Value label on top of bar */}
                    {relativeFrame > barStartFrame + 20 && (
                      <text
                        x={x}
                        y={y - 10}
                        fill={scenario.color}
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {(scenario.contextTokens / 1000).toFixed(0)}K
                      </text>
                    )}

                    {/* X-axis labels */}
                    <text
                      x={x}
                      y={chartHeight - paddingBottom + 24}
                      fill="hsl(var(--foreground))"
                      fontSize="16"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {scenario.label}
                    </text>
                    <text
                      x={x}
                      y={chartHeight - paddingBottom + 44}
                      fill="hsl(var(--muted-foreground))"
                      fontSize="14"
                      textAnchor="middle"
                    >
                      {scenario.description}
                    </text>
                  </g>
                );
              })}

              {/* 200K limit line */}
              {relativeFrame > 140 && (
                <g
                  style={{
                    opacity: interpolate(
                      relativeFrame,
                      [140, 160],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    ),
                  }}
                >
                  <line
                    x1={paddingLeft}
                    y1={paddingTop}
                    x2={chartWidth - paddingRight}
                    y2={paddingTop}
                    stroke="hsl(var(--destructive))"
                    strokeWidth="3"
                    strokeDasharray="10 5"
                  />
                  <text
                    x={chartWidth - paddingRight - 10}
                    y={paddingTop - 8}
                    fill="hsl(var(--destructive))"
                    fontSize="14"
                    fontWeight="700"
                    textAnchor="end"
                  >
                    200K limit
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* ReAct loop visualization (constant size) */}
          {showReActLoop && (
            <div className="flex-shrink-0">
              <FadeIn startFrame={startFrame + 180} duration={30}>
                <div className="flex flex-col items-center">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      Same Pattern
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      ReAct Loop
                    </p>
                  </div>

                  {/* Circular ReAct diagram */}
                  <div className="relative w-48 h-48 flex-shrink-0">
                    <svg viewBox="0 0 192 192" className="w-full h-full">
                      {/* Circle with arrows */}
                      <circle
                        cx="96"
                        cy="96"
                        r="70"
                        fill="none"
                        stroke="hsl(var(--electric-blue))"
                        strokeWidth="3"
                        strokeDasharray="8 4"
                      />

                      {/* Rotating icon */}
                      <g
                        transform={`translate(96, 96) rotate(${relativeFrame * 2})`}
                      >
                        <foreignObject x="-16" y="-16" width="32" height="32">
                          <RefreshCw size={32} className="text-[hsl(var(--electric-blue))]" />
                        </foreignObject>
                      </g>

                      {/* Labels */}
                      <text
                        x="96"
                        y="20"
                        fill="hsl(var(--purple))"
                        fontSize="12"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Think
                      </text>
                      <text
                        x="156"
                        y="120"
                        fill="hsl(var(--electric-blue))"
                        fontSize="12"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Act
                      </text>
                      <text
                        x="36"
                        y="120"
                        fill="hsl(var(--green))"
                        fontSize="12"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Observe
                      </text>
                    </svg>
                  </div>

                  <p className="text-sm text-muted-foreground text-center mt-4 max-w-xs">
                    Complexity grows,<br />but the loop stays the same
                  </p>
                </div>
              </FadeIn>
            </div>
          )}
        </div>

        {/* Key insight */}
        {relativeFrame > 200 && (
          <FadeIn startFrame={startFrame + 200} duration={30}>
            <div className="text-center mt-12">
              <p className="text-3xl font-bold text-foreground">
                Agents <span className="text-[hsl(var(--electric-blue))]">scale</span> gracefully
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};
