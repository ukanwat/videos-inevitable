import { useCurrentFrame, interpolate } from "remotion";
import { WorkflowGraph } from "../../../components/diagram/WorkflowGraph";
import { FadeIn } from "../../../components/animation/FadeIn";
import { SlideIn } from "../../../components/animation/SlideIn";
import { RefreshCw, GitBranch } from "lucide-react";
import { cn } from "../../../lib/utils";
import { NodeStatus } from "../../types/workflow";

interface WorkflowVsAgentComparisonProps {
  startFrame?: number;
  className?: string;
}

/**
 * Split-screen comparison showing fixed workflow vs adaptive agent
 */
export const WorkflowVsAgentComparison: React.FC<WorkflowVsAgentComparisonProps> = ({
  startFrame = 0,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);

  // Simple workflow example
  const workflowNodes = [
    {
      id: "start",
      title: "Start",
      icon: "Circle",
      shape: "circle" as const,
      data: {},
      status: (relativeFrame > 40 ? "complete" : relativeFrame > 20 ? "active" : "pending") as NodeStatus,
    },
    {
      id: "step1",
      title: "Step 1",
      icon: "Box",
      shape: "rounded" as const,
      data: {},
      status: (relativeFrame > 60 ? "complete" : relativeFrame > 40 ? "active" : "pending") as NodeStatus,
    },
    {
      id: "step2",
      title: "Step 2",
      icon: "Box",
      shape: "rounded" as const,
      data: {},
      status: (relativeFrame > 80 ? "complete" : relativeFrame > 60 ? "active" : "pending") as NodeStatus,
    },
    {
      id: "end",
      title: "End",
      icon: "CheckCircle",
      shape: "circle" as const,
      data: {},
      status: (relativeFrame > 100 ? "complete" : relativeFrame > 80 ? "active" : "pending") as NodeStatus,
    },
  ];

  const workflowEdges = [
    { id: "e1", source: "start", target: "step1", type: "bezier" as const, animated: true },
    { id: "e2", source: "step1", target: "step2", type: "bezier" as const, animated: true },
    { id: "e3", source: "step2", target: "end", type: "bezier" as const, animated: true },
  ];

  // Agent loop nodes (circular pattern)
  const agentNodes = [
    {
      id: "think",
      title: "Think",
      icon: "Brain",
      shape: "rounded" as const,
      data: {},
      status: (relativeFrame > 60 ? "complete" : relativeFrame > 40 ? "active" : "pending") as NodeStatus,
    },
    {
      id: "act",
      title: "Act",
      icon: "Wrench",
      shape: "rounded" as const,
      data: {},
      status: (relativeFrame > 80 ? "complete" : relativeFrame > 60 ? "active" : "pending") as NodeStatus,
    },
    {
      id: "observe",
      title: "Observe",
      icon: "Eye",
      shape: "rounded" as const,
      data: {},
      status: (relativeFrame > 100 ? "complete" : relativeFrame > 80 ? "active" : "pending") as NodeStatus,
    },
  ];

  const agentEdges = [
    { id: "e1", source: "think", target: "act", type: "bezier" as const, animated: true },
    { id: "e2", source: "act", target: "observe", type: "bezier" as const, animated: true },
    { id: "e3", source: "observe", target: "think", type: "straight" as const, animated: true, flowAnimation: "dots" as const },
  ];

  // Divider line animation
  const dividerHeight = interpolate(
    relativeFrame,
    [0, 30],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div className={cn("w-full h-full flex items-center justify-center py-8", className)}>
      <div className="w-full max-w-7xl flex">
        {/* Left side: Workflow */}
        <div className="flex-1 flex flex-col items-center justify-start px-8 pr-20">
          <SlideIn startFrame={startFrame} direction="right" duration={30} distance={50}>
            <div className="w-full flex flex-col items-start max-w-md ml-0">
              {/* Header */}
              <div className="mb-10 text-left w-full">
                <div className="flex items-center gap-3 mb-3">
                  <GitBranch size={36} className="text-muted-foreground" />
                  <h3 className="text-4xl font-bold text-foreground">Workflow</h3>
                </div>
                <p className="text-xl text-muted-foreground">Fixed execution path</p>
              </div>

              {/* Workflow diagram */}
              <div className="w-full max-w-xs -ml-36">
                <WorkflowGraph
                  nodes={workflowNodes}
                  edges={workflowEdges}
                  layout={{ type: "dag", direction: "horizontal", nodeSpacing: 60, levelSpacing: 100 }}
                  startFrame={startFrame + 20}
                  viewBox={{ width: 380, height: 180 }}
                />
              </div>

              {/* Description */}
              {relativeFrame > 60 && (
                <FadeIn startFrame={startFrame + 60} duration={20}>
                  <div className="mt-10 text-left w-full">
                    <div className="text-base text-muted-foreground mb-2">
                      • Pre-defined steps
                    </div>
                    <div className="text-base text-muted-foreground mb-2">
                      • No adaptation
                    </div>
                    <div className="text-base text-muted-foreground">
                      • Executes plans
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>
          </SlideIn>
        </div>

        {/* Vertical divider */}
        <div className="relative flex items-center justify-center px-12">
        <div
          className="w-0.5 bg-gradient-to-b from-transparent via-border to-transparent"
          style={{ height: `${dividerHeight}%` }}
        />

        {/* VS badge */}
        {relativeFrame > 30 && (
          <FadeIn startFrame={startFrame + 30} duration={20}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-border rounded-full px-4 py-2">
              <span className="text-lg font-bold text-muted-foreground">VS</span>
            </div>
          </FadeIn>
        )}
      </div>

        {/* Right side: Agent */}
        <div className="flex-1 flex flex-col items-center justify-center px-12 pl-16 relative">
          <SlideIn startFrame={startFrame + 15} direction="left" duration={30} distance={50}>
            <div className="w-full flex flex-col items-center max-w-lg">
              {/* Header */}
              <div className="mb-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <RefreshCw size={36} className="text-[hsl(var(--chart-1))]" />
                  <h3 className="text-4xl font-bold text-[hsl(var(--chart-1))]">Agent</h3>
                </div>
                <p className="text-xl text-muted-foreground">Dynamic reasoning loop</p>
              </div>

              {/* Agent diagram */}
              <div className="w-full max-w-sm">
                <WorkflowGraph
                  nodes={agentNodes}
                  edges={agentEdges}
                  layout={{ type: "dag", direction: "horizontal", nodeSpacing: 70, levelSpacing: 110 }}
                  startFrame={startFrame + 35}
                  viewBox={{ width: 400, height: 180 }}
                />
              </div>

              {/* Description */}
              {relativeFrame > 75 && (
                <FadeIn startFrame={startFrame + 75} duration={20}>
                  <div className="mt-10 text-center">
                    <div className="text-base text-[hsl(var(--chart-1))] mb-2">
                      • Adaptive reasoning
                    </div>
                    <div className="text-base text-[hsl(var(--chart-1))] mb-2">
                      • Continuous feedback
                    </div>
                    <div className="text-base text-[hsl(var(--chart-1))]">
                      • Makes plans
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>
          </SlideIn>

          {/* Loop indicator arrow */}
          {relativeFrame > 100 && (
            <FadeIn startFrame={startFrame + 100} duration={20}>
              <div className="absolute bottom-4 right-0 flex items-center gap-2 text-[hsl(var(--chart-1))]">
                <RefreshCw size={24} className="animate-spin-slow" />
                <span className="text-base font-semibold">Repeats until solved</span>
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      {/* Bottom insight */}
      {relativeFrame > 120 && (
        <FadeIn startFrame={startFrame + 120} duration={30}>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <p className="text-2xl text-foreground font-bold">
              Workflows execute. Agents <span className="text-[hsl(var(--chart-1))]">think</span>.
            </p>
          </div>
        </FadeIn>
      )}
    </div>
  );
};
