import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "../../../lib/utils";
import { BrandLogo } from "../../../components/media/BrandLogo";

interface SplitContextViewProps {
    userMessage: string;
    functionCall: object;
    apiResponse: object;
    modelResponse: string;
    startFrame?: number;
    className?: string;
}

/**
 * Split-screen view showing model's context window vs real-world API execution
 * Left: What the model sees in its context
 * Right: What actually happens in the real world
 */
export const SplitContextView: React.FC<SplitContextViewProps> = ({
    userMessage,
    functionCall,
    apiResponse,
    modelResponse,
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const relativeFrame = frame - startFrame;

    // Animation timing for each step
    const step1 = 150; // User message appears
    const step2 = 450; // Model generates JSON
    const step3 = 600; // JSON moves to right side
    const step4 = 750; // API executes
    const step5 = 900; // Result returns
    const step6 = 1050; // Model generates response

    const jsonString = JSON.stringify(functionCall, null, 2);
    const apiString = JSON.stringify(apiResponse, null, 2);

    return (
        <div className={cn("w-full h-full flex gap-8 p-12", className)}>
            {/* LEFT SIDE: Model's Context Window */}
            <div className="flex-1 flex flex-col">
                <div
                    className="mb-6 text-center"
                    style={{
                        opacity: interpolate(relativeFrame, [0, 30], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                    }}
                >
                    <h3 className="text-2xl font-bold text-primary mb-2">
                        Model's Context Window
                    </h3>
                    <p className="text-sm text-muted-foreground">What the model sees</p>
                </div>

                <div className="flex-1 bg-muted/20 border-2 border-primary/30 rounded-xl p-6 relative overflow-hidden">
                    {/* Glow effect when active */}
                    <div
                        className="absolute inset-0 bg-primary/5 pointer-events-none"
                        style={{
                            opacity: interpolate(
                                relativeFrame,
                                [step1, step2, step5, step6],
                                [0, 1, 0, 1],
                                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                            ),
                        }}
                    />

                    <div className="relative space-y-4">
                        {/* Header */}
                        <div className="text-xs text-muted-foreground mb-4">
                            Available Functions: get_weather(), ...
                        </div>

                        {/* User message */}
                        <div
                            className="p-3 bg-blue-500/10 border-2 border-blue-500 rounded-lg"
                            style={{
                                opacity: interpolate(relativeFrame, [step1, step1 + 30], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        >
                            <div className="text-xs text-blue-400 mb-1">USER</div>
                            <p className="text-foreground">{userMessage}</p>
                        </div>

                        {/* Model generates JSON */}
                        <div
                            className="p-3 bg-purple-500/10 border-2 border-purple-500 rounded-lg font-mono text-sm"
                            style={{
                                opacity: interpolate(relativeFrame, [step2, step2 + 40], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                                transform: `translateX(${interpolate(
                                    relativeFrame,
                                    [step3, step3 + 60],
                                    [0, 400],
                                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                )}px)`,
                            }}
                        >
                            <div className="text-xs text-purple-400 mb-2">MODEL GENERATES</div>
                            <pre className="text-purple-300 whitespace-pre-wrap">
                                {jsonString.substring(
                                    0,
                                    Math.floor(
                                        interpolate(
                                            relativeFrame,
                                            [step2 + 40, step2 + 120],
                                            [0, jsonString.length],
                                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                        )
                                    )
                                )}
                            </pre>
                        </div>

                        {/* Function result returns */}
                        <div
                            className="p-3 bg-green-500/10 border-2 border-green-500 rounded-lg font-mono text-sm"
                            style={{
                                opacity: interpolate(relativeFrame, [step5, step5 + 40], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        >
                            <div className="text-xs text-green-400 mb-2">FUNCTION RESULT</div>
                            <pre className="text-green-300">{apiString}</pre>
                        </div>

                        {/* Model response */}
                        <div
                            className="p-3 bg-chart-2/10 border-2 border-chart-2 rounded-lg"
                            style={{
                                opacity: interpolate(relativeFrame, [step6, step6 + 40], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        >
                            <div className="text-xs text-chart-2 mb-1">ASSISTANT</div>
                            <p className="text-foreground">
                                {modelResponse.substring(
                                    0,
                                    Math.floor(
                                        interpolate(
                                            relativeFrame,
                                            [step6 + 40, step6 + 100],
                                            [0, modelResponse.length],
                                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                        )
                                    )
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Real World */}
            <div className="flex-1 flex flex-col">
                <div
                    className="mb-6 text-center"
                    style={{
                        opacity: interpolate(relativeFrame, [0, 30], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                    }}
                >
                    <h3 className="text-2xl font-bold text-chart-1 mb-2">
                        Real World
                    </h3>
                    <p className="text-sm text-muted-foreground">System execution</p>
                </div>

                <div className="flex-1 bg-muted/20 border-2 border-chart-1/30 rounded-xl p-6 flex flex-col items-center justify-center relative">
                    {/* API receives call */}
                    <div
                        className="w-full max-w-md"
                        style={{
                            opacity: interpolate(relativeFrame, [step3 + 60, step3 + 90], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <BrandLogo
                                domain="openweathermap.org"
                                size="md"
                                variant="logo"
                                animateIn="none"
                            />
                        </div>

                        <div className="p-4 bg-orange-500/10 border-2 border-orange-500 rounded-lg font-mono text-sm mb-6">
                            <div className="text-xs text-orange-400 mb-2">API REQUEST</div>
                            <div className="text-orange-300">
                                GET api.weather.com/current?city=Tokyo
                            </div>
                        </div>

                        {/* Network pulse animation */}
                        <div
                            className="flex justify-center my-6"
                            style={{
                                opacity: interpolate(relativeFrame, [step4, step4 + 40], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        >
                            <div className="flex gap-2">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="w-3 h-3 bg-orange-500 rounded-full"
                                        style={{
                                            opacity: Math.sin(
                                                ((relativeFrame - step4) / 10 + i) * 0.5
                                            ),
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* API response */}
                        <div
                            className="p-4 bg-green-500/10 border-2 border-green-500 rounded-lg"
                            style={{
                                opacity: interpolate(relativeFrame, [step4 + 60, step4 + 90], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                }),
                            }}
                        >
                            <div className="text-xs text-green-400 mb-3">API RESPONSE</div>
                            <div className="flex items-center gap-4 text-foreground">
                                <span className="text-5xl">☀️</span>
                                <div>
                                    <div className="text-3xl font-bold">22°C</div>
                                    <div className="text-muted-foreground">Sunny, 65% humidity</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data flow beam */}
                    <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        width="100"
                        height="200"
                        style={{
                            opacity: interpolate(
                                relativeFrame,
                                [step5, step5 + 40],
                                [0, 0.6],
                                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                            ),
                        }}
                    >
                        <line
                            x1="0"
                            y1="100"
                            x2="-300"
                            y2="100"
                            stroke="hsl(var(--chart-2))"
                            strokeWidth="3"
                            strokeDasharray="10 5"
                        />
                        <polygon
                            points="-300,100 -290,95 -290,105"
                            fill="hsl(var(--chart-2))"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};
