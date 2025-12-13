import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "../../../lib/utils";

interface SequentialGenerationProps {
    startFrame?: number;
    className?: string;
}

/**
 * Shows 3 parallel token generation sequences with different temperatures
 * Demonstrates how temperature changes the path at EVERY token
 * 
 * Script requirement (line 80): "This happens at EVERY token. So temperature 
 * doesn't just make output random—it fundamentally changes the path through probability space."
 */
export const SequentialGeneration: React.FC<SequentialGenerationProps> = ({
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const relativeFrame = frame - startFrame;

    // Three different generation paths based on temperature
    const sequences = [
        {
            temperature: 0.1,
            color: "hsl(var(--primary))",
            prompt: "The cat sat on the",
            generated: ["mat", "because", "it", "was", "soft"],
            description: "Deterministic path",
        },
        {
            temperature: 1.0,
            color: "hsl(var(--chart-2))",
            prompt: "The cat sat on the",
            generated: ["mat", "and", "relaxed", "peacefully", ""],
            description: "Moderate variety",
        },
        {
            temperature: 2.0,
            color: "hsl(var(--chart-3))",
            prompt: "The cat sat on the",
            generated: ["floor", "dancing", "wildly", "yesterday", ""],
            description: "High variety",
        },
    ];

    // Calculate how many tokens to show (reveal progressively)
    const maxTokens = 5;
    const tokensVisible = Math.floor(
        interpolate(relativeFrame, [0, 180], [0, maxTokens], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    return (
        <div className={cn("w-full max-w-5xl mx-auto", className)}>
            {/* Title */}
            <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Temperature Changes the Path at Every Token
                </h3>
                <p className="text-muted-foreground">
                    Same starting prompt → Three different continuations
                </p>
            </div>

            {/* Three generation streams */}
            <div className="space-y-6 w-[1000px] mx-auto">
                {sequences.map((seq, seqIndex) => (
                    <div
                        key={seq.temperature}
                        className="relative"
                        style={{
                            opacity: interpolate(
                                relativeFrame,
                                [seqIndex * 30, seqIndex * 30 + 20],
                                [0, 1],
                                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                            ),
                        }}
                    >
                        {/* Temperature label */}
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="px-3 py-1 rounded-lg border-2 font-mono font-bold text-sm"
                                style={{
                                    backgroundColor: `${seq.color}20`,
                                    borderColor: seq.color,
                                    color: seq.color,
                                }}
                            >
                                T = {seq.temperature}
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {seq.description}
                            </span>
                        </div>

                        {/* Token sequence */}
                        <div className="p-4 bg-card border-2 border-border rounded-xl">
                            <div className="flex flex-wrap items-center gap-2">
                                {/* Prompt (always visible) */}
                                {seq.prompt.split(" ").map((word, i) => (
                                    <span
                                        key={`prompt-${i}`}
                                        className="text-muted-foreground font-mono"
                                    >
                                        {word}
                                    </span>
                                ))}

                                <div className="w-1" />

                                {/* Generated tokens */}
                                {seq.generated.slice(0, tokensVisible).map((token, tokenIndex) => (
                                    <div
                                        key={tokenIndex}
                                        className="relative"
                                        style={{
                                            opacity: interpolate(
                                                relativeFrame,
                                                [
                                                    seqIndex * 30 + 60 + tokenIndex * 30,
                                                    seqIndex * 30 + 60 + tokenIndex * 30 + 20,
                                                ],
                                                [0, 1],
                                                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                            ),
                                            transform: `translateX(${interpolate(
                                                relativeFrame,
                                                [
                                                    seqIndex * 30 + 60 + tokenIndex * 30,
                                                    seqIndex * 30 + 60 + tokenIndex * 30 + 20,
                                                ],
                                                [20, 0],
                                                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                            )}px)`,
                                        }}
                                    >
                                        <span
                                            className="px-3 py-1.5 rounded-lg font-mono font-semibold text-sm inline-block"
                                            style={{
                                                backgroundColor: `${seq.color}30`,
                                                border: `2px solid ${seq.color}`,
                                                color: "hsl(var(--foreground))",
                                            }}
                                        >
                                            {token || "..."}
                                        </span>

                                        {/* Branching indicator on first token */}
                                        {tokenIndex === 0 && (
                                            <div
                                                className="absolute -left-3 top-1/2 -translate-y-1/2"
                                                style={{
                                                    opacity: interpolate(
                                                        relativeFrame,
                                                        [
                                                            seqIndex * 30 + 60 + tokenIndex * 30 + 10,
                                                            seqIndex * 30 + 60 + tokenIndex * 30 + 20,
                                                        ],
                                                        [0, 1],
                                                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                                    ),
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16">
                                                    <path
                                                        d="M2 8 L8 8 M8 2 L8 14"
                                                        stroke={seq.color}
                                                        strokeWidth="2"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Cursor */}
                                {tokensVisible < maxTokens && (
                                    <div
                                        className="w-0.5 h-5 bg-primary animate-pulse"
                                        style={{
                                            opacity: interpolate(relativeFrame, [60, 80], [0, 1], {
                                                extrapolateLeft: "clamp",
                                                extrapolateRight: "clamp",
                                            }),
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simple text insight */}
            <div
                className="mt-12 text-center max-w-2xl mx-auto"
                style={{
                    opacity: interpolate(relativeFrame, [220, 260], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                <p className="text-lg text-foreground leading-relaxed mb-4">
                    At T=0.1, the model confidently picks <span className="font-mono font-semibold text-primary">"mat"</span> (deterministic).
                    <br />
                    At T=1.0, it still favors <span className="font-mono font-semibold text-chart-2">"mat"</span> but sometimes picks "floor".
                    <br />
                    At T=2.0, it chose <span className="font-mono font-semibold text-chart-3">"floor"</span> entirely, leading to a completely different sentence.
                </p>
                <p className="text-base text-foreground font-semibold">
                    This branching happens at <em>every single token</em>, compounding exponentially.
                </p>
            </div>
        </div>
    );
};
