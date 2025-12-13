import { useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { TIMING } from "../../lib/timing";
import { cn } from "../../lib/utils";

interface TemperatureSliderProps {
  startFrame?: number;
  className?: string;
}

// Probability distributions for "mat", "floor", "table", "rug" at different temperatures
const distributions = {
  0.1: [
    { label: "mat", value: 0.95 },
    { label: "floor", value: 0.03 },
    { label: "table", value: 0.01 },
    { label: "rug", value: 0.01 },
  ],
  1.0: [
    { label: "mat", value: 0.6 },
    { label: "floor", value: 0.25 },
    { label: "table", value: 0.1 },
    { label: "rug", value: 0.05 },
  ],
  2.0: [
    { label: "mat", value: 0.35 },
    { label: "floor", value: 0.3 },
    { label: "table", value: 0.2 },
    { label: "rug", value: 0.15 },
  ],
};

export const TemperatureSlider: React.FC<TemperatureSliderProps> = ({
  startFrame = 0,
  className = "",
}) => {
  const absoluteFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate frame relative to when this component should start animating
  const frame = absoluteFrame - startFrame;

  // More dynamic animation: show temp 0.1 (3s), transition to 1.0 (3s), show 1.0 (3s), transition to 2.0 (3s), show 2.0 (3s)
  const phase1End = 3 * fps; // Show 0.1 for 3 seconds
  const phase1TransitionEnd = phase1End + 3 * fps; // Transition to 1.0 over 3 seconds
  const phase2End = phase1TransitionEnd + 3 * fps; // Show 1.0 for 3 seconds
  const phase2TransitionEnd = phase2End + 3 * fps; // Transition to 2.0 over 3 seconds

  // Determine current temperature
  let currentTemp = 0.1;
  let currentDist = distributions[0.1];
  let transitionProgress = 0;

  if (frame < phase1End) {
    // Show temperature 0.1
    currentTemp = 0.1;
    currentDist = distributions[0.1];
  } else if (frame < phase1TransitionEnd) {
    // Smooth transition from 0.1 to 1.0
    transitionProgress = interpolate(
      frame,
      [phase1End, phase1TransitionEnd],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
    currentTemp = 0.1 + (1.0 - 0.1) * transitionProgress;
    // Interpolate between distributions
    currentDist = distributions[0.1].map((item, i) => ({
      label: item.label,
      value:
        item.value +
        (distributions[1.0][i].value - item.value) * transitionProgress,
    }));
  } else if (frame < phase2End) {
    // Show temperature 1.0
    currentTemp = 1.0;
    currentDist = distributions[1.0];
  } else if (frame < phase2TransitionEnd) {
    // Smooth transition from 1.0 to 2.0
    transitionProgress = interpolate(
      frame,
      [phase2End, phase2TransitionEnd],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
    currentTemp = 1.0 + (2.0 - 1.0) * transitionProgress;
    currentDist = distributions[1.0].map((item, i) => ({
      label: item.label,
      value:
        item.value +
        (distributions[2.0][i].value - item.value) * transitionProgress,
    }));
  } else {
    // Show temperature 2.0
    currentTemp = 2.0;
    currentDist = distributions[2.0];
  }

  // Fade in
  const opacity = interpolate(
    frame,
    [0, TIMING.NORMAL],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)} style={{ opacity }}>
      {/* Temperature Display */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          Temperature = {currentTemp.toFixed(1)}
        </h3>
        <p className="text-sm text-muted-foreground">
          Next token probabilities
        </p>
      </div>

      {/* Probability Bars */}
      <div className="space-y-3">
        {currentDist.map((item, index) => {
          const barOpacity = interpolate(
            frame,
            [index * 5, index * 5 + TIMING.QUICK],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          return (
            <div key={item.label} className="flex items-center gap-3">
              {/* Label */}
              <div className="w-20 text-right">
                <span className="text-sm font-mono font-medium text-foreground">
                  {item.label}
                </span>
              </div>

              {/* Bar */}
              <div className="flex-1 h-8 bg-muted rounded overflow-hidden relative">
                <div
                  className="h-full bg-primary flex items-center justify-end px-3"
                  style={{
                    width: `${item.value * 100}%`,
                    opacity: barOpacity,
                  }}
                >
                  <span className="text-xs font-semibold text-primary-foreground">
                    {Math.round(item.value * 100)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider Visual (non-functional, just decorative) */}
      <div className="mt-8 px-4">
        <div className="relative h-2 bg-muted rounded-full">
          {/* Filled track */}
          <div
            className="absolute h-2 bg-primary rounded-full"
            style={{
              width: `${((currentTemp - 0.1) / (2.0 - 0.1)) * 100}%`,
            }}
          />
          {/* Thumb */}
          <div
            className="absolute w-5 h-5 bg-primary rounded-full border-2 border-background shadow-lg"
            style={{
              left: `${((currentTemp - 0.1) / (2.0 - 0.1)) * 100}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        {/* Labels */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>0.1</span>
          <span>1.0</span>
          <span>2.0</span>
        </div>
      </div>
    </div>
  );
};
