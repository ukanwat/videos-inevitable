import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "../../../lib/utils";

interface TemperatureComparisonProps {
    startFrame?: number;
    className?: string;
}

/**
 * Shows three temperature settings side-by-side with their probability distributions
 * Script requirements (lines 70-79):
 * - T=0.1: mat 95%, floor 3%, table 1%, rug 1% (deterministic)
 * - T=1.0: mat 60%, floor 25%, table 10%, rug 5% (proportional)
 * - T=2.0: mat 35%, floor 30%, table 20%, rug 15% (flattened)
 */
export const TemperatureComparison: React.FC<TemperatureComparisonProps> = ({
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const relativeFrame = frame - startFrame;

    // Temperature configurations with exact probabilities from script
    const temperatures = [
        {
            value: 0.1,
            label: "Temperature 0.1",
            description: "Deterministic",
            probabilities: [
                { token: "mat", value: 0.95, color: "hsl(var(--primary))" },
                { token: "floor", value: 0.03, color: "hsl(var(--chart-1))" },
                { token: "table", value: 0.01, color: "hsl(var(--chart-2))" },
                { token: "rug", value: 0.01, color: "hsl(var(--chart-3))" },
            ],
        },
        {
            value: 1.0,
            label: "Temperature 1.0",
            description: "Proportional",
            probabilities: [
                { token: "mat", value: 0.60, color: "hsl(var(--primary))" },
                { token: "floor", value: 0.25, color: "hsl(var(--chart-1))" },
                { token: "table", value: 0.10, color: "hsl(var(--chart-2))" },
                { token: "rug", value: 0.05, color: "hsl(var(--chart-3))" },
            ],
        },
        {
            value: 2.0,
            label: "Temperature 2.0",
            description: "Flattened",
            probabilities: [
                { token: "mat", value: 0.35, color: "hsl(var(--primary))" },
                { token: "floor", value: 0.30, color: "hsl(var(--chart-1))" },
                { token: "table", value: 0.20, color: "hsl(var(--chart-2))" },
                { token: "rug", value: 0.15, color: "hsl(var(--chart-3))" },
            ],
        },
    ];

    return (
        <div className={cn("w-full px-16", className)}>
            {/* Title */}
            <div className="text-center mb-10">
                <h3 className="text-3xl font-semibold text-foreground mb-3">
                    Temperature Reshapes Probability Distributions
                </h3>
                <p className="text-lg text-muted-foreground">
                    Same prompt, different sampling behavior
                </p>
            </div>

            {/* Three columns - much wider */}
            <div className="grid grid-cols-3 gap-16 w-[1400px]">
                {temperatures.map((temp, tempIndex) => (
                    <div
                        key={temp.value}
                        className="flex flex-col"
                        style={{
                            opacity: interpolate(
                                relativeFrame,
                                [tempIndex * 60, tempIndex * 60 + 40],
                                [0, 1],
                                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                            ),
                        }}
                    >
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="inline-block px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg mb-3">
                                <span className="text-2xl font-bold text-primary">
                                    T = {temp.value}
                                </span>
                            </div>
                            <p className="text-base text-muted-foreground font-medium">{temp.description}</p>
                        </div>

                        {/* Probability bars */}
                        <div className="flex-1 space-y-4">
                            {temp.probabilities.map((prob, probIndex) => (
                                <div key={prob.token} className="space-y-2">
                                    {/* Token label and percentage */}
                                    <div className="flex items-center justify-between text-base">
                                        <span className="font-mono font-bold text-foreground text-lg">
                                            "{prob.token}"
                                        </span>
                                        <span
                                            className="font-mono font-bold text-lg"
                                            style={{ color: prob.color }}
                                        >
                                            {(prob.value * 100).toFixed(0)}%
                                        </span>
                                    </div>

                                    {/* Progress bar - taller */}
                                    <div className="h-10 bg-muted/30 rounded-lg overflow-hidden relative border border-border">
                                        <div
                                            className="h-full transition-all duration-700 ease-out"
                                            style={{
                                                backgroundColor: prob.color,
                                                width: `${interpolate(
                                                    relativeFrame,
                                                    [
                                                        tempIndex * 60 + 40 + probIndex * 15,
                                                        tempIndex * 60 + 40 + probIndex * 15 + 30,
                                                    ],
                                                    [0, prob.value * 100],
                                                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                                )}%`,
                                                opacity: 0.8,
                                            }}
                                        />
                                        {/* Subtle shine effect */}
                                        <div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            style={{
                                                transform: `translateX(${interpolate(
                                                    relativeFrame,
                                                    [tempIndex * 60 + 80, tempIndex * 60 + 140],
                                                    [-100, 200],
                                                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                                )}%)`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom note */}
                        <div
                            className="mt-8 p-4 bg-accent/10 border border-accent/30 rounded-lg"
                            style={{
                                opacity: interpolate(
                                    relativeFrame,
                                    [tempIndex * 60 + 100, tempIndex * 60 + 130],
                                    [0, 1],
                                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                ),
                            }}
                        >
                            <p className="text-sm text-center text-accent font-semibold">
                                {temp.value === 0.1 && "Always picks 'mat'"}
                                {temp.value === 1.0 && "'mat' 60% of the time"}
                                {temp.value === 2.0 && "'mat' only 35% of the time"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Key insight */}
            <div
                className="mt-16 p-8 bg-primary/5 border-2 border-primary/20 rounded-xl"
                style={{
                    opacity: interpolate(relativeFrame, [200, 240], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                <p className="text-center text-2xl text-foreground font-bold">
                    This happens at <span className="text-primary">EVERY token</span>
                </p>
                <p className="text-center text-lg text-muted-foreground mt-3">
                    Temperature fundamentally changes the path through probability space
                </p>
            </div>
        </div>
    );
};
