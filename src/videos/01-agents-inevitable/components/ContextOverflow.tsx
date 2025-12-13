import { useCurrentFrame, interpolate } from "remotion";
import { CodeBlock } from "../../../components/text/CodeBlock";
import { BrandLogo } from "../../../components/media/BrandLogo";

interface ContextOverflowProps {
    startFrame: number;
}

/**
 * Visualizes context window overflow with multiple tool calls:
 * - Left: Context window container filling with user, reasoning, tool calls, results
 * - Right: External API calls to Google, Booking.com, TripAdvisor with animated arrows
 * Extended duration with lighter colors and dark text
 */
export const ContextOverflow: React.FC<ContextOverflowProps> = ({
    startFrame,
}) => {
    const frame = useCurrentFrame();
    const relativeFrame = frame - startFrame;

    return (
        <div className="w-full max-w-[1600px] relative">
            {/* Overflow visualization - fades out at 1960 to sync with voiceover */}
            {relativeFrame < 2000 && (
                <div
                    style={{
                        opacity: interpolate(relativeFrame, [0, 30, 1920, 1960], [0, 1, 1, 0], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                    }}
                >
                    {/* Title */}
                    <div className="text-center mb-6">
                        <p className="text-3xl text-foreground">"Plan my Europe trip"</p>
                    </div>

                    <div className="flex gap-6 w-full max-w-7xl mx-auto">
                {/* LEFT: Context Window Container */}
                <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-2">
                        Context Window (8,000 token limit)
                    </div>

                    <div className="border-2 border-border rounded-xl p-4 h-[580px] overflow-hidden bg-background relative">
                        <div className="space-y-2">
                            {/* User message */}
                            <div
                                className="p-3 bg-blue-100 border border-blue-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [20, 60], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-blue-700 font-semibold">USER</div>
                                <div className="text-sm text-gray-900">Plan my Europe trip</div>
                            </div>

                            {/* Reasoning 1 */}
                            <div
                                className="p-3 bg-amber-100 border border-amber-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [80, 120], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-amber-700 font-semibold">
                                    REASONING
                                </div>
                                <div className="text-sm text-gray-900">
                                    Need to search flights first...
                                </div>
                            </div>

                            {/* Tool call 1 - Flights */}
                            <div
                                className="p-3 bg-purple-100 border border-purple-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [140, 180], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-purple-700 font-semibold">
                                    TOOL CALL #1
                                </div>
                                <div className="text-sm font-mono text-gray-900">
                                    search_flights("Paris", "Rome")
                                </div>
                            </div>

                            {/* Result 1 */}
                            <div
                                className="p-3 bg-green-100 border border-green-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [280, 320], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-green-700 font-semibold">
                                    RESULT #1
                                </div>
                                <div className="text-sm text-gray-900">
                                    [147 flights, 12,000 tokens]
                                </div>
                            </div>

                            {/* Reasoning 2 */}
                            <div
                                className="p-3 bg-amber-100 border border-amber-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [340, 380], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-amber-700 font-semibold">
                                    REASONING
                                </div>
                                <div className="text-sm text-gray-900">Now search hotels...</div>
                            </div>

                            {/* Tool call 2 - Hotels */}
                            <div
                                className="p-3 bg-purple-100 border border-purple-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [400, 440], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-purple-700 font-semibold">
                                    TOOL CALL #2
                                </div>
                                <div className="text-sm font-mono text-gray-900">
                                    search_hotels("Paris", "Rome")
                                </div>
                            </div>

                            {/* Result 2 */}
                            <div
                                className="p-3 bg-green-100 border border-green-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [540, 580], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-green-700 font-semibold">
                                    RESULT #2
                                </div>
                                <div className="text-sm text-gray-900">
                                    [283 hotels, 8,000 tokens]
                                </div>
                            </div>

                            {/* Tool call 3 - Attractions */}
                            <div
                                className="p-3 bg-purple-100 border border-purple-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [600, 640], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-purple-700 font-semibold">
                                    TOOL CALL #3
                                </div>
                                <div className="text-sm font-mono text-gray-900">
                                    search_attractions("Paris")
                                </div>
                            </div>

                            {/* Result 3 */}
                            <div
                                className="p-3 bg-green-100 border border-green-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [740, 780], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-green-700 font-semibold">
                                    RESULT #3
                                </div>
                                <div className="text-sm text-gray-900">
                                    [192 attractions, 4,500 tokens]
                                </div>
                            </div>

                            {/* Tool call 4 - Weather */}
                            <div
                                className="p-3 bg-purple-100 border border-purple-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [800, 840], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-purple-700 font-semibold">
                                    TOOL CALL #4
                                </div>
                                <div className="text-sm font-mono text-gray-900">
                                    get_weather("Paris")
                                </div>
                            </div>

                            {/* Result 4 */}
                            <div
                                className="p-3 bg-green-100 border border-green-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [940, 980], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-green-700 font-semibold">
                                    RESULT #4
                                </div>
                                <div className="text-sm text-gray-900">
                                    [Weather data, 500 tokens]
                                </div>
                            </div>

                            {/* Tool call 5 - Routes */}
                            <div
                                className="p-3 bg-purple-100 border border-purple-200 rounded-lg"
                                style={{
                                    opacity: interpolate(relativeFrame, [1000, 1040], [0, 1], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-xs text-purple-700 font-semibold">
                                    TOOL CALL #5
                                </div>
                                <div className="text-sm font-mono text-gray-900">
                                    optimize_route(...)
                                </div>
                            </div>

                            {/* More items continue to stack... */}
                            <div
                                className="p-3 bg-muted border border-border rounded-lg opacity-70"
                                style={{
                                    opacity: interpolate(relativeFrame, [1100, 1140], [0, 0.7], {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                <div className="text-sm text-muted-foreground">
                                    [more results...]
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Token count indicator below */}
                    <div
                        className="mt-2 text-sm text-center"
                        style={{
                            opacity: interpolate(relativeFrame, [1160, 1200], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <span className="text-muted-foreground">Total: </span>
                        <span className="text-foreground font-bold">~27,500 tokens</span>
                        <span className="text-muted-foreground"> / 8,000 limit</span>
                    </div>
                </div>

                {/* RIGHT: External API Calls */}
                <div className="flex-1 space-y-8 pt-12">
                    {/* Google Flights */}
                    <div
                        className="relative"
                        style={{
                            opacity: interpolate(relativeFrame, [190, 240], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="p-3 bg-card border border-border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <BrandLogo
                                    domain="google.com"
                                    size="sm"
                                    variant="icon"
                                    animateIn="none"
                                />
                                <span className="text-sm font-semibold">Google Flights</span>
                            </div>
                            <CodeBlock
                                code={`search_flights(...)
→ 147 results, 12K tokens`}
                                language="python"
                                startFrame={relativeFrame - 215}
                                lineDelay={10}
                                showLineNumbers={false}
                                className="text-xs"
                            />
                        </div>

                        {/* Animated arrow going out */}
                        <div
                            className="absolute -left-12 top-8"
                            style={{
                                opacity: interpolate(relativeFrame, [160, 210], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                                transform: `translateX(${interpolate(
                                    relativeFrame,
                                    [160, 210],
                                    [-10, 0],
                                    {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }
                                )}px)`,
                            }}
                        >
                            <svg width="40" height="20" viewBox="0 0 40 20">
                                <defs>
                                    <marker
                                        id="arrowhead-out-1"
                                        markerWidth="10"
                                        markerHeight="7"
                                        refX="9"
                                        refY="3.5"
                                        orient="auto"
                                    >
                                        <polygon
                                            points="0 0, 10 3.5, 0 7"
                                            fill="rgb(251, 146, 60)"
                                        />
                                    </marker>
                                </defs>
                                <line
                                    x1="0"
                                    y1="10"
                                    x2="35"
                                    y2="10"
                                    stroke="rgb(251, 146, 60)"
                                    strokeWidth="2"
                                    markerEnd="url(#arrowhead-out-1)"
                                />
                            </svg>
                        </div>

                        {/* Animated arrow coming back */}
                        <div
                            className="absolute -left-12 top-14"
                            style={{
                                opacity: interpolate(relativeFrame, [270, 320], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                                transform: `translateX(${interpolate(
                                    relativeFrame,
                                    [270, 320],
                                    [10, 0],
                                    {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }
                                )}px)`,
                            }}
                        >
                            <svg width="40" height="20" viewBox="0 0 40 20">
                                <defs>
                                    <marker
                                        id="arrowhead-in-1"
                                        markerWidth="10"
                                        markerHeight="7"
                                        refX="1"
                                        refY="3.5"
                                        orient="auto"
                                    >
                                        <polygon
                                            points="10 0, 0 3.5, 10 7"
                                            fill="rgb(34, 197, 94)"
                                        />
                                    </marker>
                                </defs>
                                <line
                                    x1="5"
                                    y1="10"
                                    x2="40"
                                    y2="10"
                                    stroke="rgb(34, 197, 94)"
                                    strokeWidth="2"
                                    markerStart="url(#arrowhead-in-1)"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Booking.com Hotels */}
                    <div
                        className="relative"
                        style={{
                            opacity: interpolate(relativeFrame, [450, 500], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="p-3 bg-card border border-border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <BrandLogo
                                    domain="booking.com"
                                    size="sm"
                                    variant="icon"
                                    animateIn="none"
                                />
                                <span className="text-sm font-semibold">Booking.com</span>
                            </div>
                            <CodeBlock
                                code={`search_hotels(...)
→ 283 results, 8K tokens`}
                                language="python"
                                startFrame={relativeFrame - 475}
                                lineDelay={10}
                                showLineNumbers={false}
                                className="text-xs"
                            />
                        </div>

                        <div
                            className="absolute -left-12 top-8"
                            style={{
                                opacity: interpolate(relativeFrame, [420, 470], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                                transform: `translateX(${interpolate(
                                    relativeFrame,
                                    [420, 470],
                                    [-10, 0],
                                    {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }
                                )}px)`,
                            }}
                        >
                            <svg width="40" height="20" viewBox="0 0 40 20">
                                <line
                                    x1="0"
                                    y1="10"
                                    x2="35"
                                    y2="10"
                                    stroke="rgb(251, 146, 60)"
                                    strokeWidth="2"
                                    markerEnd="url(#arrowhead-out-1)"
                                />
                            </svg>
                        </div>

                        <div
                            className="absolute -left-12 top-14"
                            style={{
                                opacity: interpolate(relativeFrame, [530, 580], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                                transform: `translateX(${interpolate(
                                    relativeFrame,
                                    [530, 580],
                                    [10, 0],
                                    {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }
                                )}px)`,
                            }}
                        >
                            <svg width="40" height="20" viewBox="0 0 40 20">
                                <line
                                    x1="5"
                                    y1="10"
                                    x2="40"
                                    y2="10"
                                    stroke="rgb(34, 197, 94)"
                                    strokeWidth="2"
                                    markerStart="url(#arrowhead-in-1)"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* TripAdvisor Attractions */}
                    <div
                        className="relative"
                        style={{
                            opacity: interpolate(relativeFrame, [650, 700], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="p-3 bg-card border border-border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <BrandLogo
                                    domain="tripadvisor.com"
                                    size="sm"
                                    variant="icon"
                                    animateIn="none"
                                />
                                <span className="text-sm font-semibold">TripAdvisor</span>
                            </div>
                            <CodeBlock
                                code={`search_attractions(...)
→ 192 results, 4.5K tokens`}
                                language="python"
                                startFrame={relativeFrame - 675}
                                lineDelay={10}
                                showLineNumbers={false}
                                className="text-xs"
                            />
                        </div>

                        <div
                            className="absolute -left-12 top-8"
                            style={{
                                opacity: interpolate(relativeFrame, [620, 670], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                                transform: `translateX(${interpolate(
                                    relativeFrame,
                                    [620, 670],
                                    [-10, 0],
                                    {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }
                                )}px)`,
                            }}
                        >
                            <svg width="40" height="20" viewBox="0 0 40 20">
                                <line
                                    x1="0"
                                    y1="10"
                                    x2="35"
                                    y2="10"
                                    stroke="rgb(251, 146, 60)"
                                    strokeWidth="2"
                                    markerEnd="url(#arrowhead-out-1)"
                                />
                            </svg>
                        </div>

                        <div
                            className="absolute -left-12 top-14"
                            style={{
                                opacity: interpolate(relativeFrame, [730, 780], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                                transform: `translateX(${interpolate(
                                    relativeFrame,
                                    [730, 780],
                                    [10, 0],
                                    {
                                        extrapolateLeft: "clamp",
                                        extrapolateRight: "clamp",
                                    }
                                )}px)`,
                            }}
                        >
                            <svg width="40" height="20" viewBox="0 0 40 20">
                                <line
                                    x1="5"
                                    y1="10"
                                    x2="40"
                                    y2="10"
                                    stroke="rgb(34, 197, 94)"
                                    strokeWidth="2"
                                    markerStart="url(#arrowhead-in-1)"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

                    {/* Bottom note - shows earlier to give more time before fadeout */}
                    <p
                        className="text-center text-foreground mt-6 text-lg"
                        style={{
                            opacity: interpolate(relativeFrame, [1220, 1260, 1920, 1960], [0, 1, 1, 0], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        And the model still needs room to{" "}
                        <span className="font-bold text-primary">REASON</span> about all this
                    </p>
                </div>
            )}

            {/* Limitation screen - appears after overflow visualization at 1960 to sync with voiceover (667.54s) */}
            {relativeFrame >= 1960 && (
                <div
                    className="fixed inset-0 flex items-center justify-center"
                    style={{
                        opacity: interpolate(relativeFrame, [1960, 2000], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                    }}
                >
                    <div className="text-center max-w-3xl px-16 space-y-8">
                        <div className="space-y-4">
                            <p className="text-3xl text-destructive font-semibold">
                                Limitation #3
                            </p>
                            <p className="text-5xl font-bold text-foreground">
                                Context overflow on complex tasks
                            </p>
                        </div>
                        <p className="text-2xl text-muted-foreground">
                            Multi-step tasks overflow the context window
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};