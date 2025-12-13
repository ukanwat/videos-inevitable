import { useCurrentFrame, interpolate } from "remotion";
import { CodeBlock } from "../../../components/text/CodeBlock";
import { BrandLogo } from "../../../components/media/BrandLogo";

interface ContextWindowMechanicsProps {
    startFrame: number;
}

/**
 * Shows the mechanics of function calling with split view:
 * - Left: Context window loading with schema, model generation, result
 * - Right: External system execution with API call
 */
export const ContextWindowMechanics: React.FC<ContextWindowMechanicsProps> = ({
    startFrame,
}) => {
    const frame = useCurrentFrame();
    const relativeFrame = frame - startFrame;

    return (
        <div className="flex gap-12 w-full max-w-7xl mx-auto">
            {/* LEFT: Context Window */}
            <div className="flex-1">
                <div
                    className="mb-4 text-sm text-muted-foreground"
                    style={{
                        opacity: interpolate(relativeFrame, [0, 30], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                    }}
                >
                    Model's Context Window
                </div>

                <div className="space-y-4">
                    {/* User message */}
                    <div
                        style={{
                            opacity: interpolate(relativeFrame, [40, 80], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="text-xs text-blue-400 mb-2">USER</div>
                        <p className="text-lg text-foreground">
                            What's the weather in Tokyo?
                        </p>
                    </div>

                    {/* Function schema loads into context */}
                    <div
                        style={{
                            opacity: interpolate(relativeFrame, [120, 160], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="text-xs text-muted-foreground mb-2">
                            Available Functions:
                        </div>
                        <CodeBlock
                            code={`{
  "name": "get_weather",
  "description": "Get current weather for a location",
  "parameters": {
    "location": {"type": "string"},
    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
  }
}`}
                            language="json"
                            startFrame={relativeFrame - 140}
                            lineDelay={3}
                            showLineNumbers={false}
                            className="text-sm"
                        />
                    </div>

                    {/* Model generates function call */}
                    <div
                        style={{
                            opacity: interpolate(relativeFrame, [300, 340], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="text-xs text-purple-400 mb-2">MODEL GENERATES</div>
                        <CodeBlock
                            code={`{
  "function": "get_weather",
  "arguments": {
    "location": "Tokyo",
    "unit": "celsius"
  }
}`}
                            language="json"
                            startFrame={relativeFrame - 320}
                            lineDelay={4}
                            showLineNumbers={false}
                            className="text-sm"
                        />
                    </div>

                    {/* Function result comes back to context */}
                    <div
                        style={{
                            opacity: interpolate(relativeFrame, [640, 680], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="text-xs text-green-400 mb-2">FUNCTION RESULT</div>
                        <CodeBlock
                            code={`{
  "temp": 22,
  "condition": "sunny",
  "humidity": 65
}`}
                            language="json"
                            startFrame={relativeFrame - 660}
                            lineDelay={4}
                            showLineNumbers={false}
                            className="text-sm"
                        />
                    </div>

                    {/* Model's final response */}
                    <div
                        style={{
                            opacity: interpolate(relativeFrame, [740, 780], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="text-xs text-chart-2 mb-2">ASSISTANT</div>
                        <p className="text-lg text-foreground">
                            It's currently 22°C and sunny in Tokyo, with 65% humidity.
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT: System Execution (happens OUTSIDE context) */}
            <div className="flex-1 flex items-center justify-center">
                <div
                    className="w-full"
                    style={{
                        opacity: interpolate(relativeFrame, [500, 540], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                    }}
                >
                    <div className="text-sm text-muted-foreground mb-4">
                        System Execution (outside context)
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                        <BrandLogo
                            domain="openweathermap.org"
                            size="sm"
                            variant="icon"
                            animateIn="none"
                        />
                        <div className="text-xs text-orange-400">API CALL</div>
                    </div>

                    <CodeBlock
                        code={`GET /current?city=Tokyo

Response:
{
  "temp": 22,
  "condition": "sunny",
  "humidity": 65
}`}
                        language="http"
                        startFrame={relativeFrame - 520}
                        lineDelay={6}
                        showLineNumbers={false}
                        className="text-sm"
                    />

                    {/* Arrow showing result going back to context */}
                    <div
                        className="mt-6 flex items-center gap-2 text-green-400"
                        style={{
                            opacity: interpolate(relativeFrame, [620, 660], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                        }}
                    >
                        <div className="text-3xl">←</div>
                        <div className="text-sm">Result goes to context</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
