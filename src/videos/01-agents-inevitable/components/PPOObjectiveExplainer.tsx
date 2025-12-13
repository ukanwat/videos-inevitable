import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "../../../lib/utils";

interface PPOObjectiveExplainerProps {
    startFrame?: number;
    className?: string;
}

/**
 * PPO Objective visualization with geometric storytelling
 * Shows the formula and demonstrates beta parameter effects
 * Uses existing theme colors and styling
 */
export const PPOObjectiveExplainer: React.FC<PPOObjectiveExplainerProps> = ({
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const relativeFrame = frame - startFrame;

    // Beta value changes over time: 0.001 → 0.02 → 0.1 → 1.0
    const betaStage = interpolate(
        relativeFrame,
        [350, 400, 450, 500],
        [0, 1, 2, 3],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const betaValues = [0.001, 0.02, 0.1, 1.0];
    const currentBetaIndex = Math.min(Math.floor(betaStage), 3);
    const beta = betaValues[currentBetaIndex];

    // Reward and KL values for each beta
    const rewardValues = [0.3, 0.92, 0.75, 0.45]; // Peak at beta=0.02
    const klValues = [0.85, 0.12, 0.08, 0.02]; // High KL at low beta

    const currentReward = rewardValues[currentBetaIndex];
    const currentKL = klValues[currentBetaIndex];

    // Example text for each beta value
    const exampleTexts = [
        "asdjf qpwer zxmc vbnk", // Chaos at beta=0.001
        "Paris is the capital of France.", // Good at beta=0.02
        "The capital city of France is Paris.", // Still good at beta=0.1
        "I'm not sure about that.", // Frozen/no learning at beta=1.0
    ];

    const exampleText = exampleTexts[currentBetaIndex];

    // Status colors
    const statusColors = [
        { bg: "bg-destructive/10", border: "border-destructive", text: "text-destructive" }, // Red - chaos
        { bg: "bg-chart-2/10", border: "border-chart-2", text: "text-chart-2" }, // Green - optimal
        { bg: "bg-primary/10", border: "border-primary", text: "text-primary" }, // Blue - good
        { bg: "bg-muted/30", border: "border-muted", text: "text-muted-foreground" }, // Gray - frozen
    ];

    const currentColors = statusColors[currentBetaIndex];

    return (
        <div className={cn("w-full h-full flex flex-col items-center justify-center p-12 bg-background", className)}>
            {/* Title */}
            <div
                className="text-center mb-12"
                style={{
                    opacity: interpolate(relativeFrame, [0, 30], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                <h2 className="text-4xl font-bold text-foreground mb-3">
                    The PPO Objective
                </h2>
                <p className="text-lg text-muted-foreground">
                    Balancing reward and stability
                </p>
            </div>

            {/* Main formula - builds character by character */}
            <div
                className="mb-16 text-center"
                style={{
                    opacity: interpolate(relativeFrame, [40, 80], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                <div className="text-3xl font-semibold text-foreground space-x-2">
                    <span
                        className="inline-block"
                        style={{
                            opacity: interpolate(relativeFrame, [50, 80], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        maximize:
                    </span>
                    <span
                        className="inline-block text-primary"
                        style={{
                            opacity: interpolate(relativeFrame, [70, 100], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        E[reward]
                    </span>
                    <span
                        className="inline-block"
                        style={{
                            opacity: interpolate(relativeFrame, [90, 120], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        -
                    </span>
                    <span
                        className="inline-block text-chart-2"
                        style={{
                            opacity: interpolate(relativeFrame, [110, 140], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        β·KL(π||π<sub className="text-sm">old</sub>)
                    </span>
                </div>
            </div>

            {/* Two forces visualization - side by side */}
            <div
                className="w-full max-w-5xl grid grid-cols-2 gap-12 mb-16"
                style={{
                    opacity: interpolate(relativeFrame, [150, 200], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                {/* Left: Reward term */}
                <div className="flex flex-col items-center">
                    <div
                        className="mb-6"
                        style={{
                            opacity: interpolate(relativeFrame, [200, 240], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <h3 className="text-2xl font-semibold text-primary mb-2 text-center">
                            Reward Term
                        </h3>
                        <p className="text-sm text-muted-foreground text-center italic">
                            "Make the reward model happy"
                        </p>
                    </div>

                    {/* Reward bar visualization */}
                    <div className="w-full max-w-xs">
                        <div className="h-64 bg-muted/20 rounded-lg border-2 border-muted relative overflow-hidden">
                            {/* Animated bar growing up */}
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/60 transition-all duration-1000"
                                style={{
                                    height: `${currentReward * 100}%`,
                                    opacity: interpolate(relativeFrame, [240, 280], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            />
                            {/* Value label */}
                            <div
                                className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-mono font-bold text-primary"
                                style={{
                                    opacity: interpolate(relativeFrame, [280, 310], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                {currentReward.toFixed(2)}
                            </div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground mt-2">Reward Score</p>
                    </div>
                </div>

                {/* Right: KL penalty term */}
                <div className="flex flex-col items-center">
                    <div
                        className="mb-6"
                        style={{
                            opacity: interpolate(relativeFrame, [220, 260], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <h3 className="text-2xl font-semibold text-chart-2 mb-2 text-center">
                            KL Penalty
                        </h3>
                        <p className="text-sm text-muted-foreground text-center italic">
                            "Don't drift too far from original"
                        </p>
                    </div>

                    {/* KL divergence bar */}
                    <div className="w-full max-w-xs">
                        <div className="h-64 bg-muted/20 rounded-lg border-2 border-muted relative overflow-hidden">
                            {/* Animated bar */}
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-chart-2 to-chart-2/60 transition-all duration-1000"
                                style={{
                                    height: `${currentKL * 100}%`,
                                    opacity: interpolate(relativeFrame, [260, 300], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            />
                            {/* Value label */}
                            <div
                                className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-mono font-bold text-chart-2"
                                style={{
                                    opacity: interpolate(relativeFrame, [300, 330], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                {currentKL.toFixed(2)}
                            </div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground mt-2">KL Divergence</p>
                    </div>
                </div>
            </div>

            {/* Beta parameter control */}
            <div
                className="w-full max-w-4xl mb-12"
                style={{
                    opacity: interpolate(relativeFrame, [320, 360], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                <h3 className="text-xl font-semibold text-foreground text-center mb-6">
                    The β Parameter Controls the Balance
                </h3>

                {/* Beta slider visualization */}
                <div className="relative px-8">
                    {/* Track */}
                    <div className="h-2 bg-muted rounded-full relative">
                        {/* Current position marker */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-accent bg-background shadow-lg transition-all duration-500"
                            style={{
                                left: `${(currentBetaIndex / 3) * 100}%`,
                            }}
                        />
                    </div>

                    {/* Labels */}
                    <div className="flex justify-between mt-4">
                        {betaValues.map((val, idx) => (
                            <div
                                key={val}
                                className={cn(
                                    "flex flex-col items-center transition-all duration-500",
                                    idx === currentBetaIndex ? "scale-110" : "opacity-50"
                                )}
                            >
                                <span className="text-lg font-mono font-bold text-foreground mb-1">
                                    {val}
                                </span>
                                <span className="text-xs text-muted-foreground text-center">
                                    {idx === 0 && "Too low"}
                                    {idx === 1 && "Sweet spot"}
                                    {idx === 2 && "Good"}
                                    {idx === 3 && "Too high"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Example output */}
            <div
                className="w-full max-w-2xl"
                style={{
                    opacity: interpolate(relativeFrame, [380, 420], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                <h4 className="text-lg font-semibold text-foreground text-center mb-4">
                    Model Output at β = {beta}
                </h4>
                <div
                    className={cn(
                        "p-6 rounded-xl border-2 transition-all duration-500",
                        currentColors.bg,
                        currentColors.border
                    )}
                >
                    <p className={cn("text-lg font-mono text-center", currentColors.text)}>
                        "{exampleText}"
                    </p>
                </div>

                {/* Status explanation */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        {currentBetaIndex === 0 && "❌ Model has drifted too far - output is gibberish"}
                        {currentBetaIndex === 1 && "✅ Optimal balance - high reward, controlled drift"}
                        {currentBetaIndex === 2 && "✓ Still good, slightly conservative"}
                        {currentBetaIndex === 3 && "⚠️ Too constrained - model barely learns"}
                    </p>
                </div>
            </div>
        </div>
    );
};
