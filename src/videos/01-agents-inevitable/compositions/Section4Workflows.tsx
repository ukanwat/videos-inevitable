import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Title } from "../../../components/text/Title";
import { TitleWithBackground } from "../../../components/text/TitleWithBackground";
import { BackgroundMedia } from "../../../components/media/BackgroundMedia";
import { WorkflowGraph } from "../../../components/diagram/WorkflowGraph";
import { WorkflowNodeConfig, WorkflowEdgeConfig } from "../../../types/workflow";
import { FadeIn } from "../../../components/animation/FadeIn";

/**
 * Section 4: Breaking Down Complexity - Workflows
 * (11:13.40-13:31.12, 4,102 frames total) - WITH VOICEOVER
 *
 * Voiceover breakdown (from transcription.csv lines 282-343):
 * 674.52-697.48s (0-689f): Introduction (graph concept)
 * 698.38-754.56s (689-2374f): Europe trip workflow walkthrough
 * 754.66-771.18s (2374-2870f): Pattern mentions + visual examples
 * 772.22-811.24s (2870-4102f): Limitation
 *
 * Structure:
 * 0-120: Title screen
 * 120-220: B-roll intro
 * 220-1660: Main complex workflow with branching
 * 1660-2116: Pattern 1 - Human Approval Gates
 * 2116-2572: Pattern 2 - Error Handling & Retry
 * 2572-3028: Pattern 3 - Conditional Variations
 * 3028-4102: Limitation sequence
 */
export const Section4Workflows: React.FC = () => {
  const frame = useCurrentFrame();

  // Complex branching workflow for Europe trip
  const complexWorkflow: { nodes: WorkflowNodeConfig[]; edges: WorkflowEdgeConfig[] } = {
    nodes: [
      // Entry point
      {
        id: "start",
        label: "User Query",
        icon: "MapPin",
        title: "Plan Europe Trip",
        shape: "rounded",
        data: { display: "200 tok", contextPercent: 2.5 },
        status: frame > 380 ? "complete" : frame > 340 ? "active" : "pending",
      },

      // Parallel search branches
      {
        id: "search_flights",
        label: "Search Flights",
        icon: "Plane",
        title: "Search Flights",
        shape: "rounded",
        data: { display: "50 options\n10K → 600 tok", contextPercent: 7.5 },
        status: frame > 520 ? "complete" : frame > 420 ? "active" : "pending",
      },
      {
        id: "search_hotels",
        label: "Search Hotels",
        icon: "Hotel",
        title: "Search Hotels",
        shape: "rounded",
        data: { display: "30 hotels\n8K → 400 tok", contextPercent: 5 },
        status: frame > 520 ? "complete" : frame > 420 ? "active" : "pending",
      },
      {
        id: "search_transport",
        label: "Search Transport",
        icon: "Car",
        title: "Local Transport",
        shape: "rounded",
        data: { display: "20 options\n5K → 300 tok", contextPercent: 3.75 },
        status: frame > 520 ? "complete" : frame > 420 ? "active" : "pending",
      },

      // Price check decision
      {
        id: "check_budget",
        label: "Check Budget",
        icon: "DollarSign",
        title: "Budget Check",
        shape: "diamond",
        data: { display: "1.8K tok", contextPercent: 22.5 },
        status: frame > 680 ? "complete" : frame > 580 ? "active" : "pending",
      },

      // Conditional branches
      {
        id: "optimize_route",
        label: "Optimize",
        icon: "Route",
        title: "Optimize Route",
        shape: "rounded",
        data: { display: "Under budget\n1.2K tok", contextPercent: 15 },
        status: frame > 840 ? "complete" : frame > 740 ? "active" : "pending",
      },
      {
        id: "find_alternatives",
        label: "Alternatives",
        icon: "Search",
        title: "Find Cheaper",
        shape: "rounded",
        data: { display: "Over budget\n1.5K tok", contextPercent: 18.75 },
        status: frame > 840 ? "complete" : frame > 740 ? "active" : "pending",
      },

      // Parallel booking operations
      {
        id: "book_flight",
        label: "Book Flight",
        icon: "Plane",
        title: "Book Flight",
        shape: "rounded",
        data: { display: "API call\n900 tok", contextPercent: 11.25 },
        status: frame > 1040 ? "complete" : frame > 940 ? "active" : "pending",
      },
      {
        id: "book_hotel",
        label: "Book Hotel",
        icon: "Hotel",
        title: "Book Hotel",
        shape: "rounded",
        data: { display: "API call\n700 tok", contextPercent: 8.75 },
        status: frame > 1040 ? "complete" : frame > 940 ? "active" : "pending",
      },
      {
        id: "book_transport",
        label: "Book Transport",
        icon: "Car",
        title: "Book Transport",
        shape: "rounded",
        data: { display: "API call\n500 tok", contextPercent: 6.25 },
        status: frame > 1040 ? "complete" : frame > 940 ? "active" : "pending",
      },

      // Error handling
      {
        id: "retry_handler",
        label: "Retry Logic",
        icon: "RefreshCw",
        title: "Handle Errors",
        shape: "rounded",
        data: { display: "Exponential\nbackoff", contextPercent: 12 },
        status: frame > 1180 ? "complete" : frame > 1100 ? "active" : "pending",
      },

      // Merge and confirm
      {
        id: "merge_results",
        label: "Merge",
        icon: "Merge",
        title: "Merge Results",
        shape: "rounded",
        data: { display: "1.3K tok\nvs 23K", contextPercent: 16.25 },
        status: frame > 1340 ? "complete" : frame > 1260 ? "active" : "pending",
      },
      {
        id: "send_confirmation",
        label: "Confirm",
        icon: "Mail",
        title: "Send Confirmation",
        shape: "rounded",
        data: { display: "Final\n1.3K tok", contextPercent: 16.25 },
        status: frame > 1500 ? "complete" : frame > 1420 ? "active" : "pending",
      },
    ],
    edges: [
      // Start splits to parallel searches
      { id: "e1", source: "start", target: "search_flights", type: "bezier", animated: true, flowAnimation: "pulse" },
      { id: "e2", source: "start", target: "search_hotels", type: "bezier", animated: true, flowAnimation: "pulse" },
      { id: "e3", source: "start", target: "search_transport", type: "bezier", animated: true, flowAnimation: "pulse" },

      // Searches converge to budget check
      { id: "e4", source: "search_flights", target: "check_budget", type: "bezier", animated: true },
      { id: "e5", source: "search_hotels", target: "check_budget", type: "bezier", animated: true },
      { id: "e6", source: "search_transport", target: "check_budget", type: "bezier", animated: true },

      // Budget check branches
      { id: "e7", source: "check_budget", target: "optimize_route", type: "bezier", animated: true, label: "✓ OK" },
      { id: "e8", source: "check_budget", target: "find_alternatives", type: "bezier", animated: true, label: "⚠ Over" },

      // Both paths to parallel bookings
      { id: "e9", source: "optimize_route", target: "book_flight", type: "bezier", animated: true },
      { id: "e10", source: "optimize_route", target: "book_hotel", type: "bezier", animated: true },
      { id: "e11", source: "optimize_route", target: "book_transport", type: "bezier", animated: true },

      { id: "e12", source: "find_alternatives", target: "book_flight", type: "bezier", animated: true },
      { id: "e13", source: "find_alternatives", target: "book_hotel", type: "bezier", animated: true },
      { id: "e14", source: "find_alternatives", target: "book_transport", type: "bezier", animated: true },

      // Bookings to retry handler
      { id: "e15", source: "book_flight", target: "retry_handler", type: "bezier", animated: true },
      { id: "e16", source: "book_hotel", target: "retry_handler", type: "bezier", animated: true },
      { id: "e17", source: "book_transport", target: "retry_handler", type: "bezier", animated: true },

      // Retry to merge
      { id: "e18", source: "retry_handler", target: "merge_results", type: "bezier", animated: true, flowAnimation: "dots" },

      // Merge to confirm
      { id: "e19", source: "merge_results", target: "send_confirmation", type: "bezier", animated: true, flowAnimation: "dots" },
    ],
  };

  // Context tracking for main workflow
  const getCurrentContext = () => {
    if (frame < 340) return 800;
    if (frame < 520) return 1600;
    if (frame < 680) return 1000;
    if (frame < 1040) return 1300;
    if (frame < 1340) return 1300;
    if (frame < 1500) return 1300;
    return 1300;
  };

  const currentContext = getCurrentContext();
  const maxContext = 8000;
  const percentage = (currentContext / maxContext) * 100;

  // Horizontal scroll animation for main workflow
  // Stay at start during narrator description (340-2300)
  // Slowly scroll to end after descriptions (2300-2520)
  const translateX = interpolate(
    frame,
    [340, 2300, 2520, 2770],
    [0, 0, -100, -100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill className="bg-background">
      {/* Title screen with n8n workflow screenshot background (0-120) */}
      {frame < 120 && (
        <TitleWithBackground
          title="Breaking Down Complexity"
          backgroundType="image"
          backgroundSrc="assets/screenshots/s4-screenshot-n8n-ai.png"
          titleVariant="main"
          titleAnimation="slideUp"
          startFrame={0}
          durationInFrames={120}
          kenBurns={{ enabled: true, from: 1.0, to: 1.1 }}
          overlayOpacity={0.2}
        />
      )}

      {/* B-roll: Domino effect - Workflow introduction (120-220 frames) */}
      {frame >= 120 && frame < 220 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <BackgroundMedia
            type="video"
            src="assets/b-roll/domino-effect.mp4"
            startFrame={120}
            durationInFrames={100}
            overlay={{ enabled: true, opacity: 0.2 }}
            kenBurns={{ enabled: true, from: 1.0, to: 1.1 }}
            video={{ loop: true, muted: true, startFrom: 0 }}
          />
          <div className="relative z-10 text-center px-16">
            <FadeIn startFrame={120} duration={20}>
              <p className="text-5xl text-white font-bold drop-shadow-lg mb-6">
                Workflows
              </p>
              <p className="text-3xl text-white drop-shadow-lg">
                Don't accumulate everything. <br/>
                Just pass forward <span className="text-yellow-300">what you actually need</span>
              </p>
            </FadeIn>
          </div>
        </div>
      )}

      {/* Graph concept intro (220-340) */}
      {frame >= 220 && frame < 340 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeIn startFrame={220} duration={30}>
            <div className="text-center max-w-4xl space-y-8">
              <p className="text-4xl font-bold text-foreground">
                Think of it like a graph
              </p>
              <p className="text-3xl text-muted-foreground">
                Nodes and arrows
              </p>
              <p className="text-2xl text-muted-foreground mt-8">
                Each node does one thing, passes outputs to the next node
              </p>
            </div>
          </FadeIn>
        </div>
      )}

      {/* Main workflow visualization (340-2520 frames) */}
      {frame >= 340 && frame < 2520 && (
        <div className="absolute inset-0">
          {/* Intro text - removed, going straight to workflow */}

          {/* Context indicator - top right corner, minimal */}
          {frame >= 360 && (
            <div className="absolute top-8 right-8 z-20">
              <FadeIn startFrame={360} duration={20}>
                <div className="space-y-2">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Context Window
                    </div>
                    <div className="text-3xl font-mono font-bold text-foreground">
                      {currentContext.toLocaleString()}
                      <span className="text-lg text-muted-foreground"> / {maxContext.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      tokens ({Math.round(percentage)}%)
                    </div>
                  </div>

                  {/* Minimal progress bar */}
                  <div className="w-48 h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor:
                          percentage < 50 ? "hsl(var(--chart-2))" :
                          percentage < 80 ? "#f59e0b" :
                          "hsl(var(--destructive))"
                      }}
                    />
                  </div>

                  {/* Status badge */}
                  <div className="text-right text-xs">
                    <span className={`px-2 py-1 rounded ${
                      percentage < 50 ? "bg-chart-2/20 text-chart-2" :
                      percentage < 80 ? "bg-yellow-500/20 text-yellow-600" :
                      "bg-destructive/20 text-destructive"
                    }`}>
                      {percentage < 50 ? "✓ Efficient" :
                       percentage < 80 ? "⚠ Moderate" :
                       "🚨 High"}
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
          )}

          {/* Main workflow graph - scrolling horizontally */}
          <div className="absolute inset-0 overflow-hidden flex items-center">
            <div
              style={{
                transform: `translateX(${translateX}vw)`,
                minWidth: "100vw",
                transition: "transform 1s ease-in-out",
              }}
            >
              <WorkflowGraph
                nodes={complexWorkflow.nodes}
                edges={complexWorkflow.edges}
                layout={{ type: "dag", direction: "horizontal", nodeSpacing: 100, levelSpacing: 280 }}
                startFrame={340}
                viewBox={{ width: 1600, height: 700 }}
              />
            </div>
          </div>

          {/* Live annotation - follows the active node */}
          {frame >= 420 && frame < 580 && (
            <FadeIn startFrame={420} duration={15}>
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">
                    Flights: 10K tok → 600 tok (94% reduction)
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {frame >= 580 && frame < 740 && (
            <FadeIn startFrame={580} duration={15}>
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">
                    Hotels: 8K tok → 400 tok
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {frame >= 740 && frame < 940 && (
            <FadeIn startFrame={740} duration={15}>
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">
                    Transport: 5K tok → 300 tok
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {frame >= 1260 && (
            <FadeIn startFrame={1260} duration={15}>
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                <div className="text-center">
                  <div className="text-lg font-semibold text-chart-2">
                    Total: 1,300 tokens (vs 23,000)
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      )}

      {/* Pattern 1: Decision Nodes / Conditionals (2526-2578) */}
      {frame >= 2526 && frame < 2578 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/95">
          <FadeIn startFrame={2526} duration={15}>
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="absolute top-16 text-center">
                <p className="text-3xl font-bold text-foreground">Decision Nodes</p>
              </div>

              <div className="flex items-center justify-center" style={{ marginLeft: "-200%", marginTop: "-200%" }}>
                <WorkflowGraph
                  nodes={[
                    {
                      id: "input",
                      title: "Check Input",
                      icon: "FileInput",
                      shape: "rounded",
                      data: { display: "Validate" },
                      status: frame > 2540 ? "complete" : "active",
                    },
                    {
                      id: "validate",
                      title: "Validation",
                      icon: "GitBranch",
                      shape: "diamond",
                      data: { display: "3 paths" },
                      status: frame > 2552 ? "complete" : frame > 2540 ? "active" : "pending",
                    },
                    {
                      id: "valid",
                      title: "Process",
                      icon: "CheckCircle",
                      shape: "rounded",
                      data: { display: "Valid" },
                      status: frame > 2564 ? "complete" : frame > 2552 ? "active" : "pending",
                    },
                    {
                      id: "fixable",
                      title: "Correct",
                      icon: "Wrench",
                      shape: "rounded",
                      data: { display: "Auto-fix" },
                      status: frame > 2564 ? "complete" : frame > 2552 ? "active" : "pending",
                    },
                    {
                      id: "invalid",
                      title: "Reject",
                      icon: "Ban",
                      shape: "rounded",
                      data: { display: "Invalid" },
                      status: frame > 2564 ? "error" : frame > 2552 ? "active" : "pending",
                    },
                  ]}
                  edges={[
                    { id: "e1", source: "input", target: "validate", type: "bezier", animated: false },
                    { id: "e2", source: "validate", target: "valid", type: "bezier", animated: false, label: "✓", flowAnimation: "pulse" },
                    { id: "e3", source: "validate", target: "fixable", type: "bezier", animated: false, label: "~", flowAnimation: "pulse" },
                    { id: "e4", source: "validate", target: "invalid", type: "bezier", animated: false, label: "✗", flowAnimation: "pulse" },
                  ]}
                  layout={{ type: "dag", direction: "horizontal", nodeSpacing: 180, levelSpacing: 160 }}
                  startFrame={2526}
                  viewBox={{ width: 280, height: 240 }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      )}

      {/* Pattern 2: Parallel Execution (2578-2641) */}
      {frame >= 2578 && frame < 2641 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/95">
          <FadeIn startFrame={2578} duration={15}>
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="absolute top-16 text-center">
                <p className="text-3xl font-bold text-foreground">Parallel Execution</p>
              </div>

              <div className="flex items-center justify-center" style={{ marginLeft: "-200%", marginTop: "-150%" }}>
                <WorkflowGraph
                  nodes={[
                    {
                      id: "start",
                      title: "Start",
                      icon: "Play",
                      shape: "circle",
                      data: { display: "" },
                      status: frame > 2590 ? "complete" : "active",
                    },
                    {
                      id: "task1",
                      title: "Task 1",
                      icon: "Plane",
                      shape: "rounded",
                      data: { display: "API call" },
                      status: frame > 2610 ? "complete" : frame > 2590 ? "active" : "pending",
                    },
                    {
                      id: "task2",
                      title: "Task 2",
                      icon: "Hotel",
                      shape: "rounded",
                      data: { display: "API call" },
                      status: frame > 2610 ? "complete" : frame > 2590 ? "active" : "pending",
                    },
                    {
                      id: "task3",
                      title: "Task 3",
                      icon: "Car",
                      shape: "rounded",
                      data: { display: "API call" },
                      status: frame > 2610 ? "complete" : frame > 2590 ? "active" : "pending",
                    },
                    {
                      id: "merge",
                      title: "Merge",
                      icon: "Merge",
                      shape: "circle",
                      data: { display: "" },
                      status: frame > 2625 ? "complete" : frame > 2610 ? "active" : "pending",
                    },
                  ]}
                  edges={[
                    { id: "e1", source: "start", target: "task1", type: "bezier", animated: false, flowAnimation: "pulse" },
                    { id: "e2", source: "start", target: "task2", type: "bezier", animated: false, flowAnimation: "pulse" },
                    { id: "e3", source: "start", target: "task3", type: "bezier", animated: false, flowAnimation: "pulse" },
                    { id: "e4", source: "task1", target: "merge", type: "bezier", animated: false },
                    { id: "e5", source: "task2", target: "merge", type: "bezier", animated: false },
                    { id: "e6", source: "task3", target: "merge", type: "bezier", animated: false },
                  ]}
                  layout={{ type: "dag", direction: "horizontal", nodeSpacing: 180, levelSpacing: 160 }}
                  startFrame={2578}
                  viewBox={{ width: 280, height: 240 }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      )}

      {/* Pattern 3: Error Handling (2641-2770) */}
      {frame >= 2641 && frame < 2770 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/95">
          <FadeIn startFrame={2641} duration={15}>
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="absolute top-16 text-center">
                <p className="text-3xl font-bold text-foreground">Error Handling</p>
                <p className="text-lg text-muted-foreground mt-2">Exponential backoff</p>
              </div>

              <div className="flex items-center justify-center" style={{ marginLeft: "-250%", marginTop: "-50%" }}>
                <WorkflowGraph
                  nodes={[
                    {
                      id: "api",
                      title: "API Call",
                      icon: "Send",
                      shape: "rounded",
                      data: { display: "Request" },
                      status: frame > 2660 ? "complete" : frame > 2650 ? "active" : "pending",
                    },
                    {
                      id: "failed",
                      title: "Failed",
                      icon: "XCircle",
                      shape: "circle",
                      data: { display: "Timeout" },
                      status: frame > 2680 ? "complete" : frame > 2660 ? "error" : "pending",
                    },
                    {
                      id: "retry",
                      title: "Retry",
                      icon: "RefreshCw",
                      shape: "rounded",
                      data: { display: "Wait 2s" },
                      status: frame > 2700 ? "complete" : frame > 2680 ? "active" : "pending",
                    },
                    {
                      id: "escalate",
                      title: "Escalate",
                      icon: "AlertTriangle",
                      shape: "pill",
                      data: { display: "Alert" },
                      status: frame > 2730 ? "active" : "pending",
                    },
                  ]}
                  edges={[
                    { id: "e1", source: "api", target: "failed", type: "bezier", animated: false, flowAnimation: "pulse" },
                    { id: "e2", source: "failed", target: "retry", type: "bezier", animated: false, label: "Retry", flowAnimation: "pulse" },
                    { id: "e3", source: "retry", target: "escalate", type: "bezier", animated: false, label: "Failed", flowAnimation: "dots" },
                  ]}
                  layout={{ type: "dag", direction: "horizontal", nodeSpacing: 180, levelSpacing: 160 }}
                  startFrame={2641}
                  viewBox={{ width: 300, height: 160 }}
                />
              </div>

              {frame >= 2700 && (
                <FadeIn startFrame={2700} duration={15}>
                  <div className="absolute bottom-20 left-0 right-0 text-center">
                    <p className="text-sm text-muted-foreground font-mono">
                      1s → 2s → 4s → 8s
                    </p>
                  </div>
                </FadeIn>
              )}
            </div>
          </FadeIn>
        </div>
      )}

      {/* Limitation (2770-4102) - Starts after pattern workflows */}
      {frame >= 2770 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeIn startFrame={2770} duration={40}>
            <div className="text-center max-w-4xl space-y-12">
              {/* User request */}
              {frame >= 2770 && frame < 3200 && (
                <div
                  style={{
                    opacity: interpolate(frame, [2770, 2820], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <p className="text-3xl text-muted-foreground mb-4">
                    "I want to stop in London for 2 days on the way"
                  </p>
                  <p
                    className="text-2xl text-destructive font-semibold"
                    style={{
                      opacity: interpolate(frame, [2970, 3020], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    Workflow shatters
                  </p>
                </div>
              )}

              {/* Core limitation */}
              {frame >= 3200 && (
                <div className="space-y-8">
                  <p className="text-5xl font-bold text-foreground">
                    Workflows execute plans.
                  </p>
                  <p
                    className="text-5xl font-bold text-muted-foreground"
                    style={{
                      opacity: interpolate(frame, [3300, 3350], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    They don't make plans.
                  </p>

                  {frame >= 3550 && (
                    <FadeIn startFrame={3550} duration={30}>
                      <p className="text-2xl text-muted-foreground mt-8">
                        Brittle. Rigid.
                      </p>
                    </FadeIn>
                  )}
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      )}
    </AbsoluteFill>
  );
};
