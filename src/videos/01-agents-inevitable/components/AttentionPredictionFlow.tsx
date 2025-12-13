import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "../../../lib/utils";

interface TokenPredictionFlowProps {
    startFrame?: number;
    className?: string;
}

/**
 * Proper transformer-style architecture diagram
 * Shows: Attention weights → Attention Layer → Feed-Forward Layer → Predictions
 */
export const TokenPredictionFlow: React.FC<TokenPredictionFlowProps> = ({
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const relativeFrame = frame - startFrame;

    return (
        <div className={cn("w-full h-full flex items-center justify-center px-12", className)}>
            <div className="relative w-full max-w-[85%]" style={{ height: "850px" }}>
                {/* Title */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 text-center"
                    style={{
                        opacity: interpolate(relativeFrame, [0, 20], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                    }}
                >

                    <p className="text-lg text-muted-foreground w-96">
                        "The cat sat on the <span className="text-primary font-semibold">___</span>"
                    </p>
                </div>

                {/* Main architecture flow - vertical - WIDER */}
                <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "40px", width: "700px" }}>

                    {/* INPUT: Attention-weighted context */}
                    <div
                        className="mb-6"
                        style={{
                            opacity: interpolate(relativeFrame, [30, 60], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="flex items-center justify-center gap-6 mb-3">
                            {["the", "on", "sat", "cat"].map((token, i) => {
                                const weights = [0.6, 0.25, 0.1, 0.05];
                                return (
                                    <div
                                        key={token}
                                        className="relative"
                                        style={{
                                            opacity: interpolate(relativeFrame, [30 + i * 8, 45 + i * 8], [0, 1], {
                                                extrapolateLeft: "clamp",
                                                extrapolateRight: "clamp",
                                            }),
                                        }}
                                    >
                                        <div
                                            className="px-6 py-3 rounded-lg border-2 backdrop-blur-sm inline-flex flex-col items-center"
                                            style={{
                                                backgroundColor: `hsl(var(--primary) / ${weights[i] * 0.3})`,
                                                borderColor: `hsl(var(--primary) / ${weights[i]})`,
                                                boxShadow: `0 0 ${weights[i] * 20}px hsl(var(--primary) / ${weights[i] * 0.4})`,
                                                minWidth: "100px"
                                            }}
                                        >
                                            <span className="text-lg font-mono font-semibold text-foreground whitespace-nowrap">{token}</span>
                                            <div className="text-base text-center mt-1">
                                                <span className="text-primary font-bold whitespace-nowrap">{Math.round(weights[i] * 100)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-base text-center text-muted-foreground">Attention Weights</p>
                    </div>

                    {/* Flowing arrow down */}
                    <div className="flex justify-center mb-4">
                        <svg width="2" height="30" style={{
                            opacity: interpolate(relativeFrame, [70, 90], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}>
                            <line x1="1" y1="0" x2="1" y2="30" stroke="hsl(var(--primary))" strokeWidth="2" />
                            <polygon points="1,30 5,22 -3,22" fill="hsl(var(--primary))" transform="translate(0, 0)" />
                        </svg>
                    </div>

                    {/* LAYER 1: Attention Layer */}
                    <div
                        className="mb-4"
                        style={{
                            opacity: interpolate(relativeFrame, [100, 130], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-foreground">Attention Layer</h4>
                                <div
                                    className="w-2 h-2 rounded-full bg-primary animate-pulse"
                                    style={{
                                        boxShadow: "0 0 10px hsl(var(--primary))",
                                    }}
                                />
                            </div>
                            <p className="text-base text-foreground leading-relaxed mb-4">
                                Combines context based on weights
                            </p>
                            <div className="flex items-center gap-2 text-base justify-center">
                                <span className="text-muted-foreground whitespace-nowrap">Q · K → scores</span>
                                <span className="text-muted-foreground">→</span>
                                <span className="text-muted-foreground whitespace-nowrap">softmax → weights</span>
                                <span className="text-muted-foreground">→</span>
                                <span className="text-muted-foreground whitespace-nowrap">weighted V</span>
                            </div>
                        </div>
                    </div>

                    {/* Flowing arrow down */}
                    <div className="flex justify-center mb-4">
                        <svg width="2" height="30" style={{
                            opacity: interpolate(relativeFrame, [140, 160], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}>
                            <line x1="1" y1="0" x2="1" y2="30" stroke="hsl(var(--chart-2))" strokeWidth="2" />
                            <polygon points="1,30 5,22 -3,22" fill="hsl(var(--chart-2))" transform="translate(0, 0)" />
                        </svg>
                    </div>

                    {/* LAYER 2: Feed-Forward Layer */}
                    <div
                        className="mb-4"
                        style={{
                            opacity: interpolate(relativeFrame, [170, 200], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="p-6 bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-2 border-chart-2 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-foreground">Feed-Forward Layer</h4>
                                <div
                                    className="w-2 h-2 rounded-full bg-chart-2 animate-pulse"
                                    style={{
                                        boxShadow: "0 0 10px hsl(var(--chart-2))",
                                    }}
                                />
                            </div>
                            <p className="text-base text-foreground leading-relaxed mb-4">
                                Processes patterns from training data
                            </p>
                            <div className="space-y-2 text-base">
                                <p className="text-foreground whitespace-nowrap">
                                    "the ___" → <span className="font-semibold">noun</span>
                                </p>
                                <p className="text-foreground whitespace-nowrap">
                                    "on the ___" → <span className="font-semibold">surface</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Flowing arrow down */}
                    <div className="flex justify-center mb-4">
                        <svg width="2" height="30" style={{
                            opacity: interpolate(relativeFrame, [210, 230], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}>
                            <line x1="1" y1="0" x2="1" y2="30" stroke="hsl(var(--yellow-500))" strokeWidth="2" />
                            <polygon points="1,30 5,22 -3,22" fill="hsl(var(--yellow-500))" transform="translate(0, 0)" />
                        </svg>
                    </div>

                    {/* OUTPUT: Predictions */}
                    <div
                        style={{
                            opacity: interpolate(relativeFrame, [240, 270], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border-2 border-yellow-500/50 rounded-xl">
                            <h4 className="font-semibold text-foreground mb-3 text-center">Probability Distribution</h4>
                            <div className="space-y-2">
                                {[
                                    { word: "mat", prob: 0.42 },
                                    { word: "floor", prob: 0.18 },
                                    { word: "rug", prob: 0.12 },
                                ].map((pred, i) => (
                                    <div key={pred.word} className="flex items-center gap-3">
                                        <span className="text-xs font-mono w-14">{pred.word}</span>
                                        <div className="flex-1 h-6 bg-muted/30 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-500 transition-all duration-700"
                                                style={{
                                                    width: `${interpolate(
                                                        relativeFrame,
                                                        [250 + i * 15, 280 + i * 15],
                                                        [0, pred.prob * 100],
                                                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs font-mono w-10 text-right font-semibold">
                                            {Math.round(pred.prob * 100)}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom explanation */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center"
                    style={{
                        opacity: interpolate(relativeFrame, [310, 340], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                    }}
                >

                </div>

            </div>
        </div>
    );
};
