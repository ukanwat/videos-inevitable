import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "../../../lib/utils";

interface QKVComputationProps {
    token: string; // The token we're computing attention for (e.g., "mat")
    previousTokens: string[]; // Previous tokens in sequence
    startFrame?: number;
    className?: string;
}

/**
 * Visualizes the step-by-step Q, K, V attention computation
 * Shows 6 steps:
 * 1. Generate Query vector from target token
 * 2. Generate Key vectors from all tokens
 * 3. Compute Q · K^T (dot products)
 * 4. Scale by 1/√d_k
 * 5. Apply softmax
 * 6. Weighted sum with Values
 */
export const QKVComputation: React.FC<QKVComputationProps> = ({
    token,
    previousTokens,
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const relativeFrame = frame - startFrame;

    // Example values for visualization (simplified for clarity)
    const d_k = 64; // Dimension
    const sqrt_d_k = Math.sqrt(d_k);

    // Example scores for "mat" attending to previous tokens
    const rawScores = {
        "the": 4.8,
        "on": 2.0,
        "sat": 0.8,
        "cat": 0.4,
    };

    const scaledScores = {
        "the": (rawScores["the"] / sqrt_d_k).toFixed(2),
        "on": (rawScores["on"] / sqrt_d_k).toFixed(2),
        "sat": (rawScores["sat"] / sqrt_d_k).toFixed(2),
        "cat": (rawScores["cat"] / sqrt_d_k).toFixed(2),
    };

    const attentionWeights = {
        "the": 0.60,
        "on": 0.25,
        "sat": 0.10,
        "cat": 0.05,
    };

    // Step timing (each step gets ~150 frames = 5 seconds)
    const stepDuration = 150;
    const getCurrentStep = () => {
        if (relativeFrame < stepDuration) return 1;
        if (relativeFrame < stepDuration * 2) return 2;
        if (relativeFrame < stepDuration * 3) return 3;
        if (relativeFrame < stepDuration * 4) return 4;
        if (relativeFrame < stepDuration * 5) return 5;
        return 6;
    };

    const currentStep = getCurrentStep();

    // Animation progress within current step
    const getStepProgress = (step: number) => {
        const stepStart = (step - 1) * stepDuration;
        const stepEnd = step * stepDuration;
        return interpolate(relativeFrame, [stepStart, stepEnd], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
    };

    return (
        <div className={cn("w-full h-full flex flex-col items-center justify-center px-8", className)}>
            {/* Title */}


            <div className="w-full grid grid-cols-2 gap-16" style={{ maxWidth: "95%" }}>
                {/* Left column: Steps 1-3 */}
                <div className="space-y-6">
                    {/* Step 1: Query */}
                    <StepCard
                        stepNumber={1}
                        title="Generate Query (Q)"
                        active={currentStep >= 1}
                        progress={getStepProgress(1)}
                    >
                        <div className="flex items-center gap-4">
                            <div className="px-5 py-3 bg-primary/20 border border-primary rounded-lg font-mono text-primary font-semibold text-base">
                                {token}
                            </div>
                            <span className="text-muted-foreground text-lg">→</span>
                            <VectorVisualization
                                label="Q"
                                values={[0.8, -0.3, 0.5, 0.2]}
                                color="hsl(var(--primary))"
                                progress={getStepProgress(1)}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                            "What am I looking for?"
                        </p>
                    </StepCard>

                    {/* Step 2: Keys */}
                    <StepCard
                        stepNumber={2}
                        title="Generate Keys (K)"
                        active={currentStep >= 2}
                        progress={getStepProgress(2)}
                    >
                        <div className="space-y-2">
                            {previousTokens.map((tok, i) => (
                                <div key={i} className="flex items-center gap-4"
                                    style={{
                                        opacity: interpolate(
                                            getStepProgress(2),
                                            [i * 0.2, i * 0.2 + 0.3],
                                            [0, 1],
                                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                        ),
                                    }}
                                >
                                    <div className="px-3 py-1 bg-card border rounded text-sm font-mono w-16 text-center">
                                        {tok}
                                    </div>
                                    <span className="text-muted-foreground text-xs">→</span>
                                    <VectorVisualization
                                        label={`K${i}`}
                                        values={[0.3, 0.6, -0.2, 0.1]}
                                        color="hsl(var(--chart-1))"
                                        progress={getStepProgress(2)}
                                        size="sm"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            "What does each token offer?"
                        </p>
                    </StepCard>

                    {/* Step 3: Dot Product */}
                    <StepCard
                        stepNumber={3}
                        title="Compute Q · K^T"
                        active={currentStep >= 3}
                        progress={getStepProgress(3)}
                    >
                        <div className="space-y-2">
                            {previousTokens.map((tok) => (
                                <div key={tok} className="flex items-center justify-between">
                                    <span className="text-sm font-mono">{tok}</span>
                                    <div
                                        className="px-3 py-1 bg-accent/20 border border-accent rounded font-mono text-sm font-semibold"
                                        style={{
                                            opacity: interpolate(
                                                getStepProgress(3),
                                                [0.3, 0.7],
                                                [0, 1],
                                                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                            ),
                                        }}
                                    >
                                        {rawScores[tok as keyof typeof rawScores]}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Raw similarity scores
                        </p>
                    </StepCard>
                </div>

                {/* Right column: Steps 4-6 */}
                <div className="space-y-6">
                    {/* Step 4: Scale */}
                    <StepCard
                        stepNumber={4}
                        title="Scale by 1/√d_k"
                        active={currentStep >= 4}
                        progress={getStepProgress(4)}
                    >
                        <div className="space-y-3">
                            {previousTokens.map((tok) => (
                                <div key={tok} className="flex items-center justify-between gap-2">
                                    <span className="text-base font-mono whitespace-nowrap">{tok}</span>
                                    <div
                                        className="px-4 py-2 bg-chart-2/20 border border-chart-2 rounded font-mono text-base font-semibold whitespace-nowrap"
                                        style={{
                                            opacity: interpolate(
                                                getStepProgress(4),
                                                [0.3, 0.7],
                                                [0, 1],
                                                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                            ),
                                        }}
                                    >
                                        {scaledScores[tok as keyof typeof scaledScores]}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                            Scaled scores
                        </p>
                    </StepCard>

                    {/* Step 5: Softmax */}
                    <StepCard
                        stepNumber={5}
                        title="Apply Softmax"
                        active={currentStep >= 5}
                        progress={getStepProgress(5)}
                    >
                        <div className="space-y-2">
                            {previousTokens.map((tok) => (
                                <div key={tok} className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-mono">{tok}</span>
                                        <div
                                            className="px-3 py-1 bg-primary/20 border border-primary rounded font-mono text-sm font-semibold"
                                            style={{
                                                opacity: interpolate(
                                                    getStepProgress(5),
                                                    [0.3, 0.7],
                                                    [0, 1],
                                                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                                ),
                                            }}
                                        >
                                            {attentionWeights[tok as keyof typeof attentionWeights].toFixed(2)}
                                        </div>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-500"
                                            style={{
                                                width: `${attentionWeights[tok as keyof typeof attentionWeights] * 100}%`,
                                                opacity: interpolate(
                                                    getStepProgress(5),
                                                    [0.5, 1],
                                                    [0, 1],
                                                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                                ),
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Normalized weights (sum = 1.0)
                        </p>
                    </StepCard>

                    {/* Step 6: Weighted Sum */}
                    <StepCard
                        stepNumber={6}
                        title="Weighted Sum with Values (V)"
                        active={currentStep >= 6}
                        progress={getStepProgress(6)}
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-sm text-center text-muted-foreground">
                                Output = Σ(weights · Values)
                            </div>
                            <VectorVisualization
                                label="Output"
                                values={[0.6, 0.4, -0.1, 0.3]}
                                color="hsl(var(--yellow))"
                                progress={getStepProgress(6)}
                            />
                            <p className="text-xs text-muted-foreground text-center">
                                Context-aware representation of "{token}"
                            </p>
                        </div>
                    </StepCard>
                </div>
            </div>
        </div>
    );
};

// Helper component for individual steps
const StepCard: React.FC<{
    stepNumber: number;
    title: string;
    active: boolean;
    progress: number;
    children: React.ReactNode;
}> = ({ stepNumber, title, active, progress, children }) => {
    return (
        <div
            className={cn(
                "p-4 rounded-lg border-2 transition-all duration-500 w-[500px]",
                active
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-muted bg-muted/30"
            )}
            style={{
                opacity: active ? 1 : 0.4,
            }}
        >
            <div className="flex items-center gap-3 mb-3">
                <div
                    className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                >
                    {stepNumber}
                </div>
                <h4 className="font-semibold text-sm text-foreground">{title}</h4>
            </div>
            <div
                style={{
                    opacity: interpolate(progress, [0, 0.3], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                {children}
            </div>
        </div>
    );
};

// Helper component for vector visualization
const VectorVisualization: React.FC<{
    label: string;
    values: number[];
    color: string;
    progress: number;
    size?: "sm" | "md";
}> = ({ label, values, color, progress, size = "md" }) => {
    const barHeight = size === "sm" ? "h-6" : "h-10";
    const barWidth = size === "sm" ? "w-8" : "w-12";

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">{label}:</span>
            <div className="flex items-end gap-1">
                {values.map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <div className={cn("relative", barWidth, barHeight, "bg-muted/30 rounded")}>
                            <div
                                className="absolute bottom-0 left-0 right-0 rounded transition-all duration-300"
                                style={{
                                    backgroundColor: color,
                                    height: `${Math.abs(val) * 100}%`,
                                    opacity: interpolate(
                                        progress,
                                        [i * 0.1, i * 0.1 + 0.3],
                                        [0, 0.8],
                                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                    ),
                                }}
                            />
                        </div>
                        {size !== "sm" && (
                            <span className="text-xs font-mono text-muted-foreground">
                                {val > 0 ? "+" : ""}{val.toFixed(1)}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
