import { useCurrentFrame, interpolate } from "remotion";
import { BackgroundMedia } from "../media/BackgroundMedia";
import { Title } from "./Title";

interface KenBurnsConfig {
  enabled: boolean;
  from: number;
  to: number;
}

interface TitleWithBackgroundProps {
  title: string;
  backgroundType: 'image' | 'video';
  backgroundSrc: string;
  titleVariant?: "main" | "section" | "inline" | "vibrant";
  titleAnimation?: "fade" | "slideUp" | "slideLeft";
  startFrame?: number;
  durationInFrames?: number;
  kenBurns?: KenBurnsConfig;
  overlayOpacity?: number;
  className?: string;
}

/**
 * TitleWithBackground Component
 *
 * Combines BackgroundMedia with Title component for cinematic title screens.
 * Used for section introductions with background imagery.
 *
 * @param title - Title text to display
 * @param backgroundType - 'image' or 'video'
 * @param backgroundSrc - Path to background asset
 * @param titleVariant - Title style variant (default: 'main')
 * @param titleAnimation - Title animation type (default: 'slideUp')
 * @param overlayOpacity - Background overlay opacity (default: 0.3)
 * @param kenBurns - Ken Burns zoom config (default: 1.0 to 1.1)
 */
export const TitleWithBackground: React.FC<TitleWithBackgroundProps> = ({
  title,
  backgroundType,
  backgroundSrc,
  titleVariant = "main",
  titleAnimation = "slideUp",
  startFrame = 0,
  durationInFrames = 120,
  kenBurns = { enabled: true, from: 1.0, to: 1.1 },
  overlayOpacity = 0.3,
  className = "",
}) => {
  const frame = useCurrentFrame();

  // Calculate fade out timing - fade out in the last 30 frames
  const fadeOutStart = startFrame + durationInFrames - 30;
  const fadeOutEnd = startFrame + durationInFrames;

  const titleOpacity = interpolate(
    frame,
    [fadeOutStart, fadeOutEnd],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Background Layer (z-0) */}
      <BackgroundMedia
        type={backgroundType}
        src={backgroundSrc}
        startFrame={startFrame}
        durationInFrames={durationInFrames}
        kenBurns={kenBurns}
        overlay={{
          enabled: true,
          opacity: overlayOpacity,
          color: 'black',
        }}
      />

      {/* Title Layer (z-10) with fade out */}
      <div className="relative z-10" style={{ opacity: titleOpacity }}>
        <Title
          text={title}
          variant={titleVariant}
          animationType={titleAnimation}
          duration={30}
          startFrame={startFrame}
          className="text-white"
        />
      </div>
    </div>
  );
};
