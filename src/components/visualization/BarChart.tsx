import { useCurrentFrame, interpolate } from "remotion";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts";
import { TIMING } from "../../lib/timing";
import { getChartColor } from "../../theme/colors";
import { cn } from "../../lib/utils";

interface BarChartData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartData[];
  maxValue?: number;
  startFrame?: number;
  animationDuration?: number;
  showValues?: boolean;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  maxValue,
  startFrame = 0,
  animationDuration = TIMING.SLOW,
  showValues = true,
  orientation = "vertical",
  className = "",
}) => {
  const frame = useCurrentFrame();

  // Animate bars growing from 0 to full height
  const progress = interpolate(
    frame,
    [startFrame, startFrame + animationDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: (t) => {
        // Ease out cubic
        return 1 - Math.pow(1 - t, 3);
      },
    }
  );

  const animatedData = data.map((item) => ({
    ...item,
    animatedValue: item.value * progress,
  }));

  const max = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={animatedData}
          layout={orientation === "horizontal" ? "horizontal" : "vertical"}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey={orientation === "vertical" ? "label" : "animatedValue"}
            stroke="hsl(var(--muted-foreground))"
            type={orientation === "vertical" ? "category" : "number"}
            domain={orientation === "horizontal" ? [0, max] : undefined}
          />
          <YAxis
            dataKey={orientation === "vertical" ? "animatedValue" : "label"}
            stroke="hsl(var(--muted-foreground))"
            type={orientation === "vertical" ? "number" : "category"}
            domain={orientation === "vertical" ? [0, max] : undefined}
          />
          <Bar
            dataKey="animatedValue"
            radius={[4, 4, 0, 0]}
            label={showValues ? { position: "top", fill: "hsl(var(--foreground))" } : undefined}
          >
            {animatedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || getChartColor(index + 1)}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
