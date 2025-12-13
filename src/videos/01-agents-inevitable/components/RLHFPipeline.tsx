import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "../../../lib/utils";
import { User, Network, Repeat, ArrowDown } from "lucide-react";

interface RLHFPipelineCleanProps {
    startFrame?: number;
    className?: string;
}

/**
 * Animated RLHF visualization - Veritasium/3Blue1Brown quality
 * Shows the storytelling: HOW and WHAT happens at each step
 * 639 frames total (~21 seconds) - Synchronized with voiceover (431.10-452.40s)
 */
export const RLHFPipelineClean: React.FC<RLHFPipelineCleanProps> = ({
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const relativeFrame = frame - startFrame;

    return (
        <div className={cn("w-full max-w-7xl mx-auto p-8", className)}>
            {/* Main title */}
            <div
                className="text-center mb-12"
                style={{
                    opacity: interpolate(relativeFrame, [0, 15], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                <h2 className="text-3xl font-semibold text-foreground">
                    The Three-Stage RLHF Process
                </h2>
            </div>

            <div className="grid grid-cols-3 gap-12">

                {/* ===== STEP 1: Supervised Fine-Tuning ===== */}
                <div className="space-y-4">
                    {/* Step header */}
                    <div
                        style={{
                            opacity: interpolate(relativeFrame, [20, 35], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <p className="text-xs text-muted-foreground mb-1">Step 1</p>
                        <h3 className="text-base font-semibold text-foreground leading-tight">
                            Collect demonstrations and train supervised policy
                        </h3>
                    </div>

                    {/* 1. Prompt appears */}
                    <div
                        className="p-3 bg-primary/5 border border-primary/20 rounded-lg"
                        style={{
                            opacity: interpolate(relativeFrame, [50, 65], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                            transform: `translateY(${interpolate(relativeFrame, [50, 65], [10, 0], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            })}px)`,
                        }}
                    >
                        <p className="text-xs text-muted-foreground mb-2">Prompt from dataset:</p>
                        <p className="text-xs font-mono text-foreground">
                            "Explain the moon landing to a 6 year old"
                        </p>
                    </div>

                    {/* Arrow down */}
                    <div className="flex justify-center py-2">
                        <ArrowDown
                            className="w-5 h-5 text-muted-foreground"
                            style={{
                                opacity: interpolate(relativeFrame, [70, 80], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        />
                    </div>

                    {/* 2. Human labeler writes response */}
                    <div
                        className="p-4 bg-card border-2 border-primary rounded-lg"
                        style={{
                            opacity: interpolate(relativeFrame, [85, 100], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <User className="w-5 h-5 text-primary" />
                            <p className="text-xs font-semibold text-foreground">Human labeler demonstrates</p>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                            <p
                                style={{
                                    opacity: interpolate(relativeFrame, [105, 120], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                "Some people went to the moon..."
                            </p>
                            <p
                                style={{
                                    opacity: interpolate(relativeFrame, [125, 140], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                "They rode in a big rocket ship..."
                            </p>
                        </div>
                    </div>

                    {/* Arrow down with "x10,000" */}
                    <div className="flex flex-col items-center py-2">
                        <ArrowDown
                            className="w-5 h-5 text-muted-foreground"
                            style={{
                                opacity: interpolate(relativeFrame, [145, 155], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        />
                        <p
                            className="text-xs text-primary font-semibold mt-1"
                            style={{
                                opacity: interpolate(relativeFrame, [155, 165], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        >
                            ×10,000 examples
                        </p>
                    </div>

                    {/* 3. Training into SFT model */}
                    <div
                        className="p-4 bg-primary/10 border-2 border-primary rounded-lg relative"
                        style={{
                            opacity: interpolate(relativeFrame, [170, 185], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Network className="w-6 h-6 text-primary" />
                            <p className="text-xs font-semibold text-primary">SFT Model</p>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                            Fine-tuned on demonstrations
                        </p>
                        {/* Progress bar showing training */}
                        <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary"
                                style={{
                                    width: `${interpolate(relativeFrame, [190, 225], [0, 50], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    })}%`,
                                }}
                            />
                        </div>
                        <p
                            className="text-xs text-primary font-semibold mt-2 text-center"
                            style={{
                                opacity: interpolate(relativeFrame, [225, 235], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        >
                            80% improvement!
                        </p>
                    </div>
                </div>

                {/* ===== STEP 2: Reward Model Training ===== */}
                <div className="space-y-4">
                    {/* Step header */}
                    <div
                        style={{
                            opacity: interpolate(relativeFrame, [240, 255], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <p className="text-xs text-muted-foreground mb-1">Step 2</p>
                        <h3 className="text-base font-semibold text-foreground leading-tight">
                            Collect comparisons and train reward model
                        </h3>
                    </div>

                    {/* 1. Prompt with multiple outputs */}
                    <div
                        className="p-3 bg-chart-2/5 border border-chart-2/20 rounded-lg"
                        style={{
                            opacity: interpolate(relativeFrame, [265, 280], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <p className="text-xs text-muted-foreground mb-2">Same prompt, different outputs:</p>
                        <div className="grid grid-cols-2 gap-2">
                            {["A", "B", "C", "D"].map((label, i) => (
                                <div
                                    key={label}
                                    className={`p-2 rounded text-center text-xs font-mono ${label === "D" ? "bg-chart-2/30 border border-chart-2" : "bg-muted/30"
                                        }`}
                                    style={{
                                        opacity: interpolate(relativeFrame, [285 + i * 7, 292 + i * 7], [0, 1], {
                                            extrapolateLeft: "clamp",
                                            extrapolateRight: "clamp",
                                        }),
                                    }}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Arrow down */}
                    <div className="flex justify-center py-2">
                        <ArrowDown
                            className="w-5 h-5 text-muted-foreground"
                            style={{
                                opacity: interpolate(relativeFrame, [315, 325], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        />
                    </div>

                    {/* 2. Human ranks outputs */}
                    <div
                        className="p-4 bg-card border-2 border-chart-2 rounded-lg"
                        style={{
                            opacity: interpolate(relativeFrame, [330, 345], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <User className="w-5 h-5 text-chart-2" />
                            <p className="text-xs font-semibold text-foreground">Human ranks responses</p>
                        </div>
                        <div className="flex items-center justify-around">
                            {["D", "C", "A", "B"].map((label, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center"
                                    style={{
                                        opacity: interpolate(relativeFrame, [350 + i * 10, 357 + i * 10], [0, 1], {
                                            extrapolateLeft: "clamp",
                                            extrapolateRight: "clamp"
                                        }),
                                        transform: `translateY(${interpolate(
                                            relativeFrame,
                                            [350 + i * 10, 360 + i * 10],
                                            [7, 0],
                                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                        )}px)`,
                                    }}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 0 ? "bg-chart-2 text-white" : "bg-muted text-foreground"
                                        }`}>
                                        <span className="text-xs font-bold">{label}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground mt-1">{i + 1}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-center text-muted-foreground mt-3">Best → Worst</p>
                    </div>

                    {/* Arrow with count */}
                    <div className="flex flex-col items-center py-2">
                        <ArrowDown
                            className="w-5 h-5 text-muted-foreground"
                            style={{
                                opacity: interpolate(relativeFrame, [390, 400], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        />
                        <p
                            className="text-xs text-chart-2 font-semibold mt-1"
                            style={{
                                opacity: interpolate(relativeFrame, [400, 410], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        >
                            ×50,000 comparisons
                        </p>
                    </div>

                    {/* 3. Reward model learns */}
                    <div
                        className="p-4 bg-chart-2/10 border-2 border-chart-2 rounded-lg"
                        style={{
                            opacity: interpolate(relativeFrame, [415, 430], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Network className="w-6 h-6 text-chart-2" />
                            <p className="text-xs font-semibold text-chart-2">Reward Model (6B)</p>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                            Learns to predict human preferences
                        </p>
                        {/* Training progress */}
                        <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-chart-2"
                                style={{
                                    width: `${interpolate(relativeFrame, [435, 465], [0, 50], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    })}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* ===== STEP 3: PPO Optimization ===== */}
                <div className="space-y-4 relative">
                    {/* Step header */}
                    <div
                        style={{
                            opacity: interpolate(relativeFrame, [470, 485], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <p className="text-xs text-muted-foreground mb-1">Step 3</p>
                        <h3 className="text-base font-semibold text-foreground leading-tight">
                            Optimize policy with reinforcement learning
                        </h3>
                    </div>

                    {/* 1. New prompt */}
                    <div
                        className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                        style={{
                            opacity: interpolate(relativeFrame, [495, 510], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <p className="text-xs text-muted-foreground mb-2">New prompt:</p>
                        <p className="text-xs font-mono text-foreground">
                            "Write a story about frogs"
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center py-2">
                        <ArrowDown className="w-5 h-5 text-muted-foreground"
                            style={{
                                opacity: interpolate(relativeFrame, [515, 525], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        />
                    </div>

                    {/* 2. Policy generates */}
                    <div
                        className="p-4 bg-primary/10 border-2 border-primary rounded-lg"
                        style={{
                            opacity: interpolate(relativeFrame, [530, 545], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Repeat className="w-5 h-5 text-primary" />
                            <p className="text-xs font-semibold text-primary">Policy (PPO)</p>
                        </div>
                        <p className="text-xs text-muted-foreground italic">
                            "Once upon a time..."
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center py-2">
                        <ArrowDown className="w-5 h-5 text-muted-foreground"
                            style={{
                                opacity: interpolate(relativeFrame, [550, 560], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        />
                    </div>

                    {/* 3. Reward model scores */}
                    <div
                        className="p-4 bg-chart-2/10 border-2 border-chart-2 rounded-lg"
                        style={{
                            opacity: interpolate(relativeFrame, [565, 580], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Network className="w-5 h-5 text-chart-2" />
                                <p className="text-xs font-semibold text-chart-2">Reward Model</p>
                            </div>
                            <span
                                className="text-lg font-mono font-bold text-chart-2"
                                style={{
                                    opacity: interpolate(relativeFrame, [585, 595], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                {interpolate(relativeFrame, [585, 600], [0.5, 0.92], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }).toFixed(2)}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Score improves over iterations</p>
                    </div>

                    {/* Feedback loop arrow - curved back to top */}
                    <svg
                        className="absolute -right-8 top-32 text-primary"
                        width="80"
                        height="280"
                        style={{
                            opacity: interpolate(relativeFrame, [535, 550], [0, 0.5], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <path
                            d="M 10 220 Q 60 180, 60 100 Q 60 20, 20 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="5 5"
                            markerEnd="url(#arrow)"
                        />
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <polygon points="0 0, 10 5, 0 10" fill="currentColor" />
                            </marker>
                        </defs>
                        <text
                            x="72"
                            y="130"
                            fontSize="10"
                            fill="currentColor"
                            fontWeight="bold"
                        >
                            PPO Update
                        </text>
                    </svg>
                </div>

            </div>

            {/* Bottom summary */}
            <div
                className="mt-12 text-center"
                style={{
                    opacity: interpolate(relativeFrame, [560, 580], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                <p className="text-sm text-muted-foreground">
                    Each stage builds on the last: demonstrations → preferences → optimization
                </p>
            </div>
        </div>
    );
};
