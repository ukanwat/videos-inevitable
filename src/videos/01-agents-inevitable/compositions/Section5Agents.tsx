import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Title } from "../../../components/text/Title";
import { TitleWithBackground } from "../../../components/text/TitleWithBackground";
import { BackgroundMedia } from "../../../components/media/BackgroundMedia";
import { FadeIn } from "../../../components/animation/FadeIn";
import { SlideIn } from "../../../components/animation/SlideIn";
import {
  ReActCycleDiagram,
  WorkflowVsAgentComparison,
  AgentIterationDisplay,
} from "../components";
import { XCircle } from "lucide-react";

/**
 * Section 5: When Systems Start Thinking - Agents
 * (13:30.17-17:01.90, 6352 frames / 211.7 seconds)
 *
 * Timeline (synced to voiceover 810.18s-1021.28s):
 * - Part 1 (0-1278): Introduction to agents + ReAct loop explanation (810.18s-852.80s)
 * - Part 2 (1278-4437): Agent solving London stopover demonstration (852.80s-958.08s)
 * - Part 3 (4437-6352): Key insights about agents + conclusion (958.44s-1021.28s)
 */
export const Section5Agents: React.FC = () => {
  const frame = useCurrentFrame();

  // Agent iterations for London stopover problem
  const londonIterations = [
    {
      thought: "User wants Paris via London stopover for 2 days. I need to split this into: Home→London, 2-day London stay, London→Paris.",
      action: 'search_multi_city_flights(["SFO→LHR", "LHR→CDG"])',
      observation: "Found 12 multi-city options, £450-890",
      contextTokens: 800,
      toolIcon: "plane" as const,
    },
    {
      thought: "Good flight options. Now find London hotels for 2 nights.",
      action: 'search_hotels("London", nights=2, check_in="2024-06-15")',
      observation: "Found 8 hotels near city center, £120-350/night",
      contextTokens: 1600,
      toolIcon: "hotel" as const,
    },
    {
      thought: "Need to verify total cost fits budget before booking.",
      action: 'calculate("890 + (2 * 180) + 150")',
      observation: "Total: £1,400 (under £2,000 budget ✓)",
      contextTokens: 2200,
      toolIcon: "calculator" as const,
    },
    {
      thought: "Budget approved. Book flights and hotel together.",
      action: 'book_multi_city(flight_id="MC892", hotel_id="LDN4421")',
      observation: "Bookings confirmed. Confirmation #TR-48291",
      contextTokens: 3000,
      toolIcon: "check" as const,
    },
  ];

  return (
    <AbsoluteFill className="bg-background">
      {/* ========== PART 1: Introduction to Agents (0-1278 frames) ========== */}

      {/* Title screen with multi-agent diagram background (0-120) */}
      {frame < 120 && (
        <TitleWithBackground
          title="When Systems Start Thinking"
          backgroundType="image"
          backgroundSrc="assets/diagrams/s4-diagram-multi-agent.png"
          titleVariant="main"
          titleAnimation="slideUp"
          startFrame={0}
          durationInFrames={120}
          kenBurns={{ enabled: true, from: 1.0, to: 1.1 }}
          overlayOpacity={0.3}
        />
      )}

      {/* Recall the Section 4 problem (120-340) - "Remember that request?" */}
      {frame >= 120 && frame < 340 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-16">
          {/* User request */}
          <SlideIn startFrame={120} direction="up" duration={30}>
            <div className="max-w-3xl mb-8">
              <div className="bg-accent/20 border-2 border-accent rounded-2xl p-8">
                <div className="text-sm text-accent-foreground font-semibold mb-3 uppercase tracking-wide">
                  User Request
                </div>
                <p className="text-2xl text-foreground leading-relaxed">
                  "I want to stop in London for 2 days on the way to Paris"
                </p>
              </div>
            </div>
          </SlideIn>

          {/* Workflow failure */}
          {frame >= 180 && (
            <FadeIn startFrame={180} duration={30}>
              <div className="flex items-center gap-4 mb-8">
                <XCircle size={48} className="text-destructive" strokeWidth={2} />
                <p className="text-xl text-destructive font-semibold">
                  Workflow shattered - can't handle this
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      )}

      {/* "Agents" transition (340-466) - "Agents don't execute, they reason" */}
      {frame >= 340 && frame < 466 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <BackgroundMedia
            type="video"
            src="assets/b-roll/abstract-neural-network.mp4"
            startFrame={340}
            durationInFrames={126}
            overlay={{ enabled: true, opacity: 0.2 }}
            kenBurns={{ enabled: true, from: 1.0, to: 1.1 }}
            video={{ loop: true, muted: true, startFrom: 0 }}
          />
          <div className="relative z-10 text-center px-16">
            <FadeIn startFrame={340} duration={20}>
              <p className="text-6xl text-white font-bold drop-shadow-lg mb-6">
                Agents
              </p>
              <p className="text-3xl text-white drop-shadow-lg">
                Don't execute predefined steps.
              </p>
              <p
                className="text-4xl text-yellow-300 font-bold drop-shadow-lg mt-4"
                style={{
                  opacity: interpolate(frame, [400, 430], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                They reason.
              </p>
            </FadeIn>
          </div>
        </div>
      )}

      {/* ReAct loop explanation (466-850) - "They use a loop. Think. Act. Observe. Repeat." */}
      {frame >= 466 && frame < 850 && (
        <div className="absolute inset-0">
          <ReActCycleDiagram
            startFrame={466}
            showLabels={true}
            animateLoop={true}
          />
        </div>
      )}

      {/* Transition to demonstration (850-1278) */}
      {frame >= 850 && frame < 1278 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-16">
          <FadeIn startFrame={850} duration={40}>
            <div className="text-center space-y-8">
              <p className="text-3xl text-muted-foreground">
                No flow chart. No hard-coded paths.
              </p>
              <p className="text-4xl font-bold text-foreground">
                Just tools and a format.
              </p>
            </div>
          </FadeIn>
        </div>
      )}

      {/* ========== PART 2: Agent Demonstration (1278-4437 frames) ========== */}

      {/* Agent solving London problem (1278-4437) - "User asks... Iteration 1..." */}
      {frame >= 1278 && frame < 4437 && (
        <div className="absolute inset-0 flex flex-col px-16">
          {/* Agent iterations - extended duration */}
          <div className="flex-1 flex items-center justify-center">
            <AgentIterationDisplay
              iterations={londonIterations}
              maxTokens={8000}
              startFrame={1278}
              iterationDuration={750}
              showFinalAnswer={true}
              finalAnswer="Booked! Your trip: June 15-17 London (Hotel Strand), then June 17-24 Paris."
            />
          </div>
        </div>
      )}

      {/* ========== PART 3: Key Insights & Conclusion (4437-6352 frames) ========== */}

      {/* Main insight - "Agents don't just execute, they think" (4437-5400) */}
      {frame >= 4437 && frame < 5400 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-16">
          <FadeIn startFrame={4437} duration={50}>
            <div className="text-center space-y-12 max-w-5xl">
              {/* Main insight */}
              <div className="space-y-6">
                <p className="text-5xl font-bold text-foreground leading-tight">
                  Agents don't just execute.
                </p>
                <p
                  className="text-5xl font-bold text-[hsl(var(--chart-1))] leading-tight"
                  style={{
                    opacity: interpolate(frame, [4500, 4560], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  They <span className="italic">think</span>.
                </p>
              </div>

              {/* Supporting text */}
              {frame >= 4650 && (
                <FadeIn startFrame={4650} duration={50}>
                  <div className="space-y-4 text-2xl text-muted-foreground max-w-3xl mx-auto">
                    <p>The same reasoning loop handles simple requests and complex planning.</p>
                    <p>Agents adapt, learn, and make decisions autonomously.</p>
                  </div>
                </FadeIn>
              )}
            </div>
          </FadeIn>
        </div>
      )}

      {/* Trade-offs comparison - "Workflows are predictable, Agents are flexible" (5400-5900) */}
      {frame >= 5400 && frame < 5900 && (
        <div className="absolute inset-0 flex items-center justify-center px-16">
          <WorkflowVsAgentComparison startFrame={5400} />
        </div>
      )}

      {/* Final fade out (5900-6352) */}
      {frame >= 5900 && (
        <div
          className="absolute inset-0 flex items-center justify-center px-16"
          style={{
            opacity: interpolate(frame, [6250, 6352], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <FadeIn startFrame={5900} duration={40}>
            <div className="text-center space-y-6 max-w-4xl">
              <p className="text-4xl font-bold text-foreground">
                This is the frontier.
              </p>
              <p className="text-2xl text-muted-foreground">
                Agents unlock adaptive reasoning, but they're less reliable.
              </p>
            </div>
          </FadeIn>
        </div>
      )}
    </AbsoluteFill>
  );
};
