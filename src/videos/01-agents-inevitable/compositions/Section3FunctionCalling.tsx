import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Title } from "../../../components/text/Title";
import { TitleWithBackground } from "../../../components/text/TitleWithBackground";
import { BackgroundMedia } from "../../../components/media/BackgroundMedia";
import { FadeIn } from "../../../components/animation/FadeIn";
import {
  ContextWindowMechanics,
  ContextOverflow,
} from "../components";

/**
 * Section 3: Giving Models Hands - Function Calling
 * Extended duration to ~3100 frames to show full overflow sequence
 */
export const Section3FunctionCalling: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-background p-16">
      {/* Title screen with context window diagram background (0-120) */}
      {frame < 120 && (
        <TitleWithBackground
          title="Giving Models Hands"
          backgroundType="image"
          backgroundSrc="assets/diagrams/s3-diagram-context-window.png"
          titleVariant="main"
          titleAnimation="slideUp"
          startFrame={0}
          durationInFrames={120}
          kenBurns={{ enabled: true, from: 1.0, to: 1.05 }}
          overlayOpacity={0.3}
        />
      )}

      {/* B-roll: Code typing - Function calling introduction (120-220 frames) */}
      {frame >= 120 && frame < 220 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <BackgroundMedia
            type="video"
            src="assets/b-roll/code-typing.mp4"
            startFrame={120}
            durationInFrames={100}
            overlay={{ enabled: true, opacity: 0.2 }}
            kenBurns={{ enabled: true, from: 1.0, to: 1.1 }}
            video={{ loop: true, muted: true, startFrom: 0 }}
          />
          <div className="relative z-10 text-center px-16">
            <FadeIn startFrame={120} duration={20}>
              <p className="text-5xl text-white font-bold drop-shadow-lg mb-6">
                Function Calling
              </p>
              <p className="text-3xl text-white drop-shadow-lg">
                This is where things start getting <span className="text-yellow-300">wild</span>
              </p>
            </FadeIn>
          </div>
        </div>
      )}

      {/* Part 1: The Mechanics - Split View (220-1770 frames) */}
      {frame >= 220 && frame < 1770 && (
        <div className="absolute inset-0 p-16">
          <ContextWindowMechanics startFrame={220} />
        </div>
      )}

      {/* Part 3: Context Overflow Redesigned (1770-3939) */}
      {frame >= 1770 && frame < 3939 && (
        <div className="absolute inset-0 p-12">
          <ContextOverflow startFrame={1770} />
        </div>
      )}
    </AbsoluteFill>
  );
};
