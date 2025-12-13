import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Timeline } from "../../../components/diagram/Timeline";
import { BrandLogo } from "../../../components/media/BrandLogo";

/**
 * Closing: The Chain + Credits + Thanks
 * Duration: 2469 frames (82.3 seconds / 1:22.3)
 *
 * Timeline (synced to voiceover):
 * - Part 1 (0-1498): Timeline recap with voiceover (1021.90s-1071.84s, ~50s)
 * - Part 2 (1498-2448): Scrolling credits during reflection (1073.34s-1103.50s, ~30s)
 * - Part 3 (2448-2469): Final thanks message (1103.50s-1104.20s, ~0.7s)
 */
export const Closing: React.FC = () => {
  const frame = useCurrentFrame();

  // Credits scroll animation - moves from bottom to top
  const creditsStartFrame = 1498;
  const creditsEndFrame = 2448;

  // Scroll the credits from bottom (starting below viewport) to top (ending above viewport)
  const scrollY = interpolate(
    frame,
    [creditsStartFrame, creditsEndFrame],
    [1080, -2800], // Start below screen, end above screen
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: (t) => t, // Linear scroll
    }
  );

  // Fade in credits at start
  const creditsFadeIn = interpolate(
    frame,
    [creditsStartFrame, creditsStartFrame + 30],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Fade out credits at end
  const creditsFadeOut = interpolate(
    frame,
    [creditsEndFrame - 60, creditsEndFrame],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const creditsOpacity = creditsFadeIn * creditsFadeOut;

  return (
    <AbsoluteFill className="bg-background">
      {/* Timeline: The Chain (0-1498 frames, synced with voiceover) */}
      {frame < 1498 && (
        <>
          {/* Timeline */}
          <Timeline
            events={[
              {
                marker: <BrandLogo domain="google.com" size="lg" animateIn="scale" startFrame={60} />,
                title: (
                  <div>
                    <span className="text-2xl text-muted-foreground">2017</span>
                    <h3 className="text-5xl font-bold text-foreground">Transformers</h3>
                  </div>
                ),
                content: <p className="text-2xl text-muted-foreground leading-relaxed">Enabled: Generated text. Limited by: Unhelpful</p>,
              },
              {
                marker: <BrandLogo domain="openai.com" size="lg" animateIn="scale" startFrame={360} />,
                title: (
                  <div>
                    <span className="text-2xl text-muted-foreground">2020</span>
                    <h3 className="text-5xl font-bold text-foreground">RLHF</h3>
                  </div>
                ),
                content: <p className="text-2xl text-muted-foreground leading-relaxed">Enabled: Aligned to prefs. Limited by: Just text</p>,
              },
              {
                marker: <BrandLogo domain="openai.com" size="lg" animateIn="scale" startFrame={640} />,
                title: (
                  <div>
                    <span className="text-2xl text-muted-foreground">2022</span>
                    <h3 className="text-5xl font-bold text-foreground">Function Calling</h3>
                  </div>
                ),
                content: <p className="text-2xl text-muted-foreground leading-relaxed">Enabled: Tool use. Limited by: Single-step</p>,
              },
              {
                marker: <BrandLogo domain="langchain.com" size="lg" animateIn="scale" startFrame={920} />,
                title: (
                  <div>
                    <span className="text-2xl text-muted-foreground">2023</span>
                    <h3 className="text-5xl font-bold text-foreground">Workflows</h3>
                  </div>
                ),
                content: <p className="text-2xl text-muted-foreground leading-relaxed">Enabled: Multi-step. Limited by: Can't adapt</p>,
              },
              {
                marker: <BrandLogo domain="anthropic.com" size="lg" animateIn="scale" startFrame={1200} />,
                title: (
                  <div>
                    <span className="text-2xl text-muted-foreground">2024</span>
                    <h3 className="text-5xl font-bold text-foreground">Agents</h3>
                  </div>
                ),
                content: <p className="text-2xl text-muted-foreground leading-relaxed">Enabled: Reasoning. Trade-off: Less reliable</p>,
              },
            ]}
            startFrame={60}
            eventDelay={280}
          />
        </>
      )}

      {/* Scrolling Credits (1498-2448, during reflection voiceover) */}
      {frame >= creditsStartFrame && frame < creditsEndFrame && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Top fade gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

          {/* Bottom fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

          {/* Credits container */}
          <div
            className="absolute inset-x-0 flex justify-center"
            style={{
              transform: `translateY(${scrollY}px)`,
              opacity: creditsOpacity,
            }}
          >
            <div className="w-full max-w-4xl text-center space-y-16 px-16">
              {/* Main Title */}
              <div className="space-y-5">
                <div className="relative">
                  {/* Subtle glow effect */}
                  <div
                    className="absolute inset-0 blur-3xl opacity-25"
                    style={{
                      background: "radial-gradient(ellipse at center, hsl(var(--primary)) 0%, transparent 70%)",
                    }}
                  />
                  <h1 className="relative text-6xl font-bold text-foreground leading-tight tracking-tight">
                    WHY AI AGENTS WERE INEVITABLE
                  </h1>
                </div>
                <p className="text-3xl text-primary font-semibold italic">
                  (Explained by AI Agent)
                </p>
                <div className="pt-6 space-y-4">
                  <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border-2 border-primary/40">
                    <p className="text-xl text-foreground font-medium">
                      A Human-AI Collaboration
                    </p>
                  </div>
                  <div className="max-w-3xl mx-auto space-y-2">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Created using autonomous AI agents
                    </p>
                   
                  </div>
                </div>
              </div>

              {/* Decorative separator */}
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-foreground/40" />
                <div className="w-2 h-2 rounded-full bg-foreground/60" />
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-foreground/40" />
              </div>

              {/* Director */}
              <div className="space-y-4">
                <h3 className="text-2xl uppercase tracking-[0.4em] text-foreground/70 font-bold">
                  Instructed by
                </h3>
                <p className="text-5xl font-bold text-foreground tracking-wide">
                  UTKARSH KANWAT
                </p>
              </div>

              {/* Spacer */}
              <div className="h-12" />

              {/* Writing Credits */}
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-[0.4em] text-foreground/70 font-bold">
                    Written by
                  </h3>
                  <p className="text-4xl font-bold text-foreground">
                    CLAUDE OPUS 4.5
                  </p>
                </div>



                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-[0.4em] text-foreground/70 font-bold">
                    Script Refinement
                  </h3>
                  <p className="text-4xl font-bold text-foreground">
                    GPT-5
                  </p>
                  <p className="text-4xl font-bold text-foreground">
                    GEMINI 3 PRO
                  </p>
                </div>
              </div>

              {/* Spacer */}
              <div className="h-12" />

              {/* Production Credits */}
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-[0.4em] text-foreground/70 font-bold">
                    Motion Graphics & Animation
                  </h3>
                  <p className="text-4xl font-bold text-foreground">
                    CLAUDE SONNET 4.5
                  </p>
                </div>





                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-[0.4em] text-foreground/70 font-bold">
                    Visual Research
                  </h3>
                  <p className="text-4xl font-bold text-foreground">
                    GEMINI 3 PRO
                  </p>
                  <p className="text-4xl font-bold text-foreground">
                    GPT-5
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-[0.4em] text-foreground/70 font-bold">
                    Media Sourcing
                  </h3>
                  <p className="text-4xl font-bold text-foreground">
                    CLAUDE SONNET 4.5
                  </p>
                  <p className="text-4xl font-bold text-foreground">
                    GEMINI 3 PRO
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-[0.4em] text-foreground/70 font-bold">
                    Technical Diagrams
                  </h3>
                  <p className="text-4xl font-bold text-foreground">
                    CLAUDE SONNET 4.5
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-[0.4em] text-foreground/70 font-bold">
                    Cinematography (B-Roll Selection)
                  </h3>
                  <p className="text-4xl font-bold text-foreground">
                    CLAUDE SONNET 4.5
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-[0.4em] text-foreground/70 font-bold">
                    Editing
                  </h3>
                  <p className="text-4xl font-bold text-foreground">
                    CLAUDE SONNET 4.5
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl uppercase tracking-[0.4em] text-foreground/70 font-bold">
                    Voiceover
                  </h3>
                  <p className="text-4xl font-bold text-foreground">
                    ELEVEN MULTILINGUAL V2
                  </p>
                </div>
              </div>


         
              {/* Spacer before Thanks */}
              <div className="h-20" />

              {/* Thanks for watching - integrated into credits */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px w-32 bg-gradient-to-r from-transparent to-foreground/40" />
                  <div className="w-2 h-2 rounded-full bg-foreground/60" />
                  <div className="h-px w-32 bg-gradient-to-l from-transparent to-foreground/40" />
                </div>
              
              </div>

              {/* Bottom spacer */}
              <div className="h-20" />
            </div>
          </div>
        </div>
      )}

      {/* Final Thanks Message (2448-2469) */}
      {frame >= 2448 && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: interpolate(frame, [2448, 2469], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div className="text-center space-y-8">
            <h2 className="text-7xl font-bold text-foreground">
              Thanks for watching
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-32 bg-gradient-to-r from-transparent to-foreground/40" />
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="h-px w-32 bg-gradient-to-l from-transparent to-foreground/40" />
            </div>
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
