import { AbsoluteFill, useCurrentFrame, interpolate, OffthreadVideo, staticFile, Img } from "remotion";
import { Timeline } from "../../../components/diagram/Timeline";
import { AnimatedText } from "../../../components/text/AnimatedText";

/**
 * Opening sequence (0:00-0:57.76, 1733 frames)
 *
 * Frame 0-60 (0-2s): Background fade in with gradient
 * Frame 60-240 (2-8s): Main title + subtitle centered
 * Frame 163-252: Attention paper appears
 * Frame 270-420 (9-14s): Timeline appears and displays
 * Frame 420-1700: Timeline stays visible (domino effect narration)
 * Frame 1700-1733: Timeline fades out to Section 1
 */
export const Opening: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline events
  const timelineEvents = [
    {
      marker: <span className="text-7xl font-bold text-primary">2017</span>,
      title: <h3 className="text-5xl font-bold text-foreground">Transformers</h3>,
      content: <p className="text-2xl text-muted-foreground leading-relaxed">Attention is All You Need</p>,
    },
    {
      marker: <span className="text-7xl font-bold text-primary">2020</span>,
      title: <h3 className="text-5xl font-bold text-foreground">RLHF</h3>,
      content: <p className="text-2xl text-muted-foreground leading-relaxed">Alignment through human feedback</p>,
    },
    {
      marker: <span className="text-7xl font-bold text-primary">2022</span>,
      title: <h3 className="text-5xl font-bold text-foreground">Function Calling</h3>,
      content: <p className="text-2xl text-muted-foreground leading-relaxed">Models interact with tools</p>,
    },
    {
      marker: <span className="text-7xl font-bold text-primary">2023</span>,
      title: <h3 className="text-5xl font-bold text-foreground">Workflows</h3>,
      content: <p className="text-2xl text-muted-foreground leading-relaxed">Multi-step orchestration</p>,
    },
    {
      marker: <span className="text-7xl font-bold text-primary">2024</span>,
      title: <h3 className="text-5xl font-bold text-foreground">Agents</h3>,
      content: <p className="text-2xl text-muted-foreground leading-relaxed">Autonomous reasoning systems</p>,
    },
  ];

  // Background fade in
  const bgOpacity = interpolate(
    frame,
    [0, 40],
    [0, 1],
    {
      extrapolateRight: "clamp",
    }
  );

  // Background gradient animation - pulsing effect
  const gradientOpacity = interpolate(
    frame,
    [0, 60, 120, 240],
    [0, 0.2, 0.25, 0.2],
    {
      extrapolateRight: "clamp",
    }
  );

  // Gradient scale for subtle zoom
  const gradientScale = interpolate(
    frame,
    [0, 240],
    [1.2, 1.5],
    {
      extrapolateRight: "clamp",
    }
  );

  // Title fade in and slight zoom, fades out for paper (163-180), then back in (252-270)
  const titleOpacity = interpolate(
    frame,
    [60, 100, 163, 180, 252, 270],
    [0, 1, 1, 0, 0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const titleScale = interpolate(
    frame,
    [60, 140],
    [0.9, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtitle fade in (delayed)
  const subtitleOpacity = interpolate(
    frame,
    [120, 160],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Title glow effect - pulsing
  const glowOpacity = interpolate(
    frame,
    [80, 140, 200, 240],
    [0, 0.5, 0.5, 0.3],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Title section fade out
  const titleSectionFadeOut = interpolate(
    frame,
    [240, 270],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Timeline fade in with slight scale
  const timelineFadeIn = interpolate(
    frame,
    [270, 320],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const timelineScale = interpolate(
    frame,
    [270, 320],
    [0.9, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Timeline fade out - extended to match new duration
  const timelineFadeOut = interpolate(
    frame,
    [1700, 1733],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // White background fade in after title
  const whiteBgOpacity = interpolate(
    frame,
    [270, 300],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Attention paper animations (frames 163-252)
  const paperOpacity = interpolate(
    frame,
    [163, 183, 232, 252],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const paperScale = interpolate(
    frame,
    [163, 203, 232, 252],
    [0.7, 1, 1, 0.95],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const paperY = interpolate(
    frame,
    [163, 203],
    [30, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const paperRotation = interpolate(
    frame,
    [163, 203],
    [-2, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const paperGlow = interpolate(
    frame,
    [183, 203, 232, 252],
    [0, 0.6, 0.6, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ opacity: bgOpacity }}>
      {/* Black background for title section */}
      {frame < 270 && (
        <div className="absolute inset-0 bg-black" />
      )}

      {/* White background for timeline section */}
      {frame >= 270 && (
        <div
          className="absolute inset-0 bg-background"
          style={{ opacity: whiteBgOpacity }}
        />
      )}

      {/* Video Background */}
      {frame < 270 && (
        <div className="absolute inset-0">
          <OffthreadVideo
            src={staticFile("assets/b-roll/data-flowing.mp4")}
            startFrom={0}
            muted
            loop
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${gradientScale})`,
            }}
          />
          {/* Dark overlay for better text visibility */}
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: 0.5 }}
          />
        </div>
      )}

      {/* Title section */}
      {frame < 270 && (
        <div
          className="absolute inset-0 flex items-center justify-center p-16 z-10"
          style={{ opacity: titleSectionFadeOut }}
        >
          {/* Main Title - centered and elegant */}
          {frame >= 60 && (
            <div className="flex flex-col items-center justify-center space-y-8">
              <div
                className="relative"
                style={{
                  opacity: titleOpacity,
                  transform: `scale(${titleScale})`,
                }}
              >
                {/* Glow layer behind text */}
                <div
                  className="absolute inset-0 blur-3xl"
                  style={{
                    opacity: glowOpacity * 0.3,
                    background:
                      "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%)",
                    transform: "scale(1.3)",
                  }}
                />

                {/* Main title text */}
                <div className="relative max-w-6xl px-8">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-center tracking-tight leading-tight text-white drop-shadow-2xl">
                    Why AI Agents Were Inevitable
                  </h1>
                </div>
              </div>

              {/* Subtitle - delayed entrance */}
              {frame >= 120 && (
                <div
                  className="space-y-2"
                  style={{
                    opacity: subtitleOpacity,
                  }}
                >
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/40" />
                    <p className="text-2xl md:text-3xl text-white/90 font-light tracking-wide">
                      Explained by AI Agent
                    </p>
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/40" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Attention Paper (frames 163-252) - appears when voiceover mentions it */}
      {frame >= 163 && frame < 252 && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="relative">
            {/* Glow effect behind paper */}
            <div
              className="absolute inset-0 blur-3xl"
              style={{
                opacity: paperGlow,
                background:
                  "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5) 0%, transparent 70%)",
                transform: "scale(1.4)",
              }}
            />

            {/* The paper image */}
            <div
              style={{
                opacity: paperOpacity,
                transform: `scale(${paperScale}) translateY(${paperY}px) rotate(${paperRotation}deg)`,
              }}
            >
              <Img
                src={staticFile("assets/attention-paper.png")}
                className="rounded-lg shadow-2xl border-4 border-white/20"
                style={{ width: "700px", height: "auto" }}
              />
            </div>

            {/* Text overlay on paper */}
            {frame >= 212 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: interpolate(frame, [212, 232], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <div className="bg-black/70 backdrop-blur-sm px-8 py-4 rounded-xl border border-white/20">
                  <p className="text-4xl font-bold text-white drop-shadow-lg">
                    "Attention is All You Need"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Timeline section - appears after title fades out */}
      {frame >= 270 && (
        <div
          className="absolute inset-0 flex items-center justify-center overflow-y-auto"
          style={{
            opacity: timelineFadeIn * timelineFadeOut,
            transform: `scale(${timelineScale})`,
          }}
        >
          <Timeline
            events={timelineEvents}
            startFrame={270}
            eventDelay={15}
            className="py-12"
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
