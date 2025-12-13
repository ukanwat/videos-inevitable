import { useCurrentFrame, interpolate } from "remotion";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TIMING } from "../../lib/timing";
import { cn } from "../../lib/utils";

interface LineChartData {
  x: number | string;
  y: number;
}

interface LineChartProps {
  data: LineChartData[];
  xLabel?: string;
  yLabel?: string;
  startFrame?: number;
  drawDuration?: number;
  color?: string;
  strokeWidth?: number;
  showDots?: boolean;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xLabel,
  yLabel,
  startFrame = 0,
  drawDuration = TIMING.SLOW,
  color = "hsl(var(--chart-1))",
  strokeWidth = 2,
  showDots = true,
  className = "",
}) => {
  const frame = useCurrentFrame();

  // Progressive reveal - show data points based on progress
  const progress = interpolate(
    frame,
    [startFrame, startFrame + drawDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: (t) => t, // Linear for smooth line drawing
    }
  );

  const pointsToShow = Math.floor(data.length * progress);
  const visibleData = data.slice(0, Math.max(1, pointsToShow));

  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={visibleData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="x"
            stroke="hsl(var(--muted-foreground))"
            label={xLabel ? { value: xLabel, position: "insideBottom", offset: -10 } : undefined}
          />
          <YAxis
            dataKey="y"
            stroke="hsl(var(--muted-foreground))"
            label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft" } : undefined}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke={color}
            strokeWidth={strokeWidth}
            dot={showDots}
            animationDuration={0}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
