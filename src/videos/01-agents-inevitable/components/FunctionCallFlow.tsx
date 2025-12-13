import { cn } from "../../../lib/utils";
import { SequentialReveal } from "../../../components/animation/SequentialReveal";
import { TIMING } from "../../../lib/timing";
import { CodeBlock } from "../../../components/text/CodeBlock";

interface FunctionCallFlowProps {
  userMessage: string;
  functionCall: object;
  apiResponse: object;
  modelResponse: string;
  startFrame?: number;
  className?: string;
}

export const FunctionCallFlow: React.FC<FunctionCallFlowProps> = ({
  userMessage,
  functionCall,
  apiResponse,
  modelResponse,
  startFrame = 0,
  className = "",
}) => {
  const steps = [
    {
      label: "1. User Message",
      content: userMessage,
      type: "text" as const,
      color: "bg-primary/10 border-primary",
    },
    {
      label: "2. Model Generates Function Call",
      content: JSON.stringify(functionCall, null, 2),
      type: "code" as const,
      color: "bg-accent/10 border-accent",
    },
    {
      label: "3. System Executes API",
      content: JSON.stringify(apiResponse, null, 2),
      type: "code" as const,
      color: "bg-chart-1/10 border-chart-1",
    },
    {
      label: "4. Model Response",
      content: modelResponse,
      type: "text" as const,
      color: "bg-chart-2/10 border-chart-2",
    },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <SequentialReveal
        startFrame={startFrame}
        itemDelay={TIMING.NORMAL}
        animationType="slide"
        slideDirection="up"
      >
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Step box */}
            <div
              className={cn(
                "p-4 rounded-lg border-2",
                step.color
              )}
            >
              <div className="text-sm font-semibold text-primary mb-2">
                {step.label}
              </div>
              {step.type === "code" ? (
                <CodeBlock
                  code={step.content}
                  language="json"
                  startFrame={startFrame + (index + 1) * TIMING.NORMAL + TIMING.QUICK}
                  lineDelay={5}
                  showLineNumbers={false}
                  className="text-xs"
                />
              ) : (
                <p className="text-sm leading-relaxed text-foreground">
                  {step.content}
                </p>
              )}
            </div>

            {/* Arrow to next step */}
            {index < steps.length - 1 && (
              <div className="flex justify-center my-4">
                <svg width="48" height="48" viewBox="0 0 24 24">
                  <path
                    d="M12 4 L12 20 M12 20 L8 16 M12 20 L16 16"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </SequentialReveal>
    </div>
  );
};
