import { useCurrentFrame, interpolate } from "remotion";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Label } from "recharts";
import { TIMING } from "../../lib/timing";
import { cn } from "../../lib/utils";

interface TradeoffPlotProps {
  startFrame?: number;
  className?: string;
}

const dataPoints = [
  { x: 85, y: 25, name: "Workflows", color: "hsl(var(--chart-1))" },
  { x: 55, y: 60, name: "Hybrid Systems", color: "hsl(var(--chart-3))" },
  { x: 30, y: 90, name: "Agents", color: "hsl(var(--chart-2))" },
];

export const TradeoffPlot: React.FC<TradeoffPlotProps> = ({
  startFrame = 0,
  className = "",
}) => {
  const frame = useCurrentFrame();

  // Fade in axes
  const axisOpacity = interpolate(
    frame,
    [startFrame, startFrame + TIMING.NORMAL],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Sequential point appearance
  const visiblePoints = dataPoints.map((point, index) => {
    const pointStartFrame = startFrame + TIMING.NORMAL + index * 30;
    const opacity = interpolate(
      frame,
      [pointStartFrame, pointStartFrame + TIMING.QUICK],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    const scale = interpolate(
      frame,
      [pointStartFrame, pointStartFrame + TIMING.QUICK],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: (t) => {
          // Ease out back (slight overshoot)
          const c1 = 1.70158;
          const c3 = c1 + 1;
          return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
        },
      }
    );

    return {
      ...point,
      opacity,
      scale,
      visible: frame >= pointStartFrame,
    };
  });

  return (
    <div className={cn("w-full h-full", className)}>
      <div style={{ opacity: axisOpacity }}>
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart margin={{ top: 20, right: 100, bottom: 60, left: 60 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis
              type="number"
              dataKey="x"
              name="Reliability"
              domain={[0, 100]}
              tick={false}
              stroke="hsl(var(--border))"
            >
              <Label
                value="Reliability →"
                position="bottom"
                offset={20}
                style={{ fill: "hsl(var(--foreground))", fontSize: 16, fontWeight: 600 }}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              name="Adaptability"
              domain={[0, 100]}
              tick={false}
              stroke="hsl(var(--border))"
            >
              <Label
                value="Adaptability →"
                angle={-90}
                position="left"
                offset={10}
                style={{ fill: "hsl(var(--foreground))", fontSize: 16, fontWeight: 600 }}
              />
            </YAxis>

            {/* Scatter points */}
            <Scatter data={visiblePoints.filter((p) => p.visible)} fill="hsl(var(--primary))">
              {visiblePoints
                .filter((p) => p.visible)
                .map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={entry.opacity}
                    r={12 * entry.scale}
                  />
                ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {/* Labels for each point */}
        <div className="relative w-full" style={{ marginTop: "-440px", height: "500px" }}>
          {visiblePoints.map((point) => {
            if (!point.visible) return null;

            // Convert data coordinates to screen position
            // Chart has margins: left: 60, right: 100, top: 20, bottom: 60
            // Account for the chart margins in our calculation
            const chartAreaWidth = 70; // approximate percentage of container width that's the actual chart
            const chartAreaTop = 4; // top margin as percentage
            const chartAreaHeight = 82; // approximate percentage of container height that's the actual chart

            const xPercent = (point.x / 100) * chartAreaWidth + 8;
            const yPercent = chartAreaTop + (100 - point.y) / 100 * chartAreaHeight;

            return (
              <div
                key={point.name}
                className="absolute flex items-center gap-2"
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`,
                  opacity: point.opacity,
                  transform: `translate(-50%, -150%) scale(${point.scale})`,
                }}
              >
                <div
                  className="px-3 py-1 rounded-md font-semibold text-sm whitespace-nowrap border-2"
                  style={{
                    backgroundColor: point.color,
                    color: "hsl(var(--background))",
                    borderColor: point.color,
                  }}
                >
                  {point.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
