import { staticFile, Sequence, Audio } from "remotion";

/**
 * Sound Effect Component
 *
 * Plays a sound effect at a specific frame.
 * Uses the 4 sound effects in public/audio/
 */

type SFXType = "error" | "success" | "notification" | "swoosh";

interface SoundEffectProps {
  type: SFXType;
  startFrame: number;
  volume?: number;
}

export const SoundEffect: React.FC<SoundEffectProps> = ({
  type,
  startFrame,
  volume
}) => {
  const sounds: Record<SFXType, string> = {
    error: "audio/error_buzz.mp3",
    success: "audio/success_ding.mp3",
    notification: "audio/notification_pop.mp3",
    swoosh: "audio/swoosh_cinematic.mp3",
  };

  const defaultVolumes: Record<SFXType, number> = {
    error: 0.4,
    success: 0.35,
    notification: 0.25,
    swoosh: 0.3,
  };

  // Duration for sound effects (in frames at 30fps)
  // Most sound effects are 1-2 seconds, so 60 frames (2 seconds) is safe
  const duration = 60;

  const targetVolume = volume ?? defaultVolumes[type];

  return (
    <Sequence from={startFrame} durationInFrames={duration}>
      <Audio
        src={staticFile(sounds[type])}
        volume={targetVolume}
      />
    </Sequence>
  );
};
