import { useCurrentFrame, useVideoConfig, interpolate, OffthreadVideo, Img, staticFile } from "remotion";
import { cn } from "../../lib/utils";

interface KenBurnsConfig {
  enabled: boolean;
  from: number;
  to: number;
  duration?: number;
}

interface OverlayConfig {
  enabled: boolean;
  opacity: number;
  color?: string;
}

interface VideoConfig {
  startFrom?: number;
  playbackRate?: number;
  loop?: boolean;
  muted?: boolean;
}

interface BackgroundMediaProps {
  type: 'image' | 'video';
  src: string;
  startFrame?: number;
  durationInFrames?: number;
  kenBurns?: KenBurnsConfig;
  overlay?: OverlayConfig;
  video?: VideoConfig;
  className?: string;
}

/**
 * BackgroundMedia Component
 *
 * Renders image or video backgrounds with Ken Burns zoom effect and overlay.
 * Designed for b-roll footage and title screen backgrounds.
 *
 * @param type - 'image' or 'video'
 * @param src - Path to asset in public folder (e.g., 'assets/b-roll/neural-network.mp4')
 * @param kenBurns - Ken Burns zoom configuration (default: 1.0 to 1.1 scale)
 * @param overlay - Overlay configuration (default: 0.25 opacity black)
 * @param video - Video-specific settings (loop, mute, etc.)
 */
export const BackgroundMedia: React.FC<BackgroundMediaProps> = ({
  type,
  src,
  startFrame = 0,
  durationInFrames,
  kenBurns = { enabled: true, from: 1.0, to: 1.1 },
  overlay = { enabled: true, opacity: 0.25, color: 'black' },
  video = { startFrom: 0, playbackRate: 1, loop: true, muted: true },
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ken Burns zoom effect - smooth ease-in-out
  const scale = kenBurns.enabled
    ? interpolate(
        frame,
        [startFrame, startFrame + (kenBurns.duration || durationInFrames || 120)],
        [kenBurns.from, kenBurns.to],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: (t) => t * t * (3 - 2 * t), // smooth ease-in-out
        }
      )
    : 1;

  const mediaStyle: React.CSSProperties = {
    transform: `scale(${scale})`,
    transformOrigin: "center center",
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Background Media */}
      {type === 'video' ? (
        <OffthreadVideo
          src={staticFile(src)}
          startFrom={video.startFrom}
          playbackRate={video.playbackRate}
          muted={video.muted}
          loop={video.loop}
          style={mediaStyle}
        />
      ) : (
        <Img
          src={staticFile(src)}
          style={mediaStyle}
        />
      )}

      {/* Overlay */}
      {overlay.enabled && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlay.color || 'black',
            opacity: overlay.opacity,
          }}
        />
      )}
    </div>
  );
};
